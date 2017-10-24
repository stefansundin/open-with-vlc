function open(url, tabId) {
  console.log(`vlc://${url}`);

  // Open a new tab to start the prompt
  chrome.tabs.create({url: `vlc://${url}`}, function(newtab) {
    // Focus the old tab
    chrome.tabs.update(tabId, {active: true});
    // You have 10 seconds to click the button
    // If the tab is closed too soon, the button no longer works :(
    setTimeout(function(){
      chrome.tabs.remove([newtab.id]);
    }, 10000);
  });
}

function listener(message) {
  if (message == "open-vlc") {
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function(tabs) {
      var tab = tabs[0];
      open(tab.url, tab.id);
    });
  }
}

chrome.runtime.onMessage.addListener(listener);
chrome.commands.onCommand.addListener(listener);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "open-vlc") {
    open(info.linkUrl || info.frameUrl, tab.id);
  }
})

chrome.contextMenus.create({
  id: "open-vlc",
  title: "Open with VLC",
  contexts: ["link", "frame"],
});
