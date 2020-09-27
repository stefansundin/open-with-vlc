function openVLC() {
  chrome.storage.sync.get(default_options, function(options) {
    if (options.pause_media) {
      chrome.tabs.executeScript({
        code: `(function(){
          const videos = document.querySelectorAll("audio,video");
          for (let media of videos) {
            if (!media.paused) {
              media.pause();
            }
          }
        })()`
      });
    }
  });
  chrome.runtime.sendMessage("open-vlc");
  window.close();
}

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
      openVLC();
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const open_btn = document.querySelector("#open");
  open_btn.addEventListener("click", function() {
    openVLC();
  });
  open_btn.focus();
});
