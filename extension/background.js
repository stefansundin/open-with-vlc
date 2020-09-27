const default_options = {
  open_tab_in_background: false,
};

function open(url, tabId) {
  console.log(`vlc://${url}`);

  // Open a new tab to start the prompt
  chrome.storage.sync.get(default_options, function(options) {
    chrome.tabs.create({url: `vlc://${url}`}, function(newtab) {
      // Focus the old tab
      if (options.open_tab_in_background) {
        chrome.tabs.update(tabId, {active: true});
      }
      // You have 10 seconds to click the button
      // If the tab is closed too soon, the button no longer works :(
      setTimeout(function() {
        chrome.tabs.remove([newtab.id]);
      }, 10000);
    });
  });
}

function listener(message) {
  if (message == "open-vlc") {
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    }, function(tabs) {
      const tab = tabs[0];
      open(tab.url, tab.id);
    });
  }
}

chrome.runtime.onMessage.addListener(listener);
chrome.commands.onCommand.addListener(listener);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "open-vlc") {
    const url = [info.linkUrl, info.frameUrl, info.srcUrl, info.pageUrl].find(url => url?.startsWith("http"));
    console.log(url);
    if (url) {
      open(url, tab.id);
    }
  }
})

chrome.contextMenus.create({
  id: "open-vlc",
  title: "Open with VLC",
  contexts: ["link", "frame", "video", "audio"],
});
