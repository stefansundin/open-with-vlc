chrome.tabs.query({
  active: true,
  lastFocusedWindow: true,
}, function(tabs) {
  // do not open immediately if this is e.g. the New Tab page
  // this gives you an easy way to uncheck the checkbox
  const url = tabs[0].url;
  if (!url.startsWith("http")) return;

  chrome.storage.sync.get(default_options, function(options) {
    if (options.open_immediately) {
      chrome.runtime.sendMessage("open-vlc");
      window.close();
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#open").addEventListener("click", function() {
    chrome.runtime.sendMessage("open-vlc");
    window.close();
  });
});
