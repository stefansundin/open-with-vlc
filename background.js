function open() {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function(tabs) {
    var tab = tabs[0];
    console.log(`vlc://${tab.url}`);

    // Open a new tab to start the prompt
    chrome.tabs.create({url: `vlc://${tab.url}`}, function(newtab) {
      // Focus the old tab
      chrome.tabs.update(tab.id, {active: true});
      // You have 10 seconds to click the button
      // If the tab is closed too soon, the button no longer works :(
      setTimeout(function(){
        chrome.tabs.remove([newtab.id]);
      }, 10000);
    });
  });
}

function listener(message) {
  if (message == "open-vlc") {
    open();
  }
}

chrome.runtime.onMessage.addListener(listener);
chrome.commands.onCommand.addListener(listener);
