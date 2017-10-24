chrome.storage.sync.get(default_options, function(items) {
  if (items.open_immediately) {
    chrome.runtime.sendMessage("open-vlc");
    window.close();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#open").addEventListener("click", function() {
    chrome.runtime.sendMessage("open-vlc");
  });
});
