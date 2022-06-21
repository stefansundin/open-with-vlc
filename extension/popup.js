let tab;

async function openVLC() {
  const options = await chrome.storage.sync.get(default_options);
  if (options.pause_media) {
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
        allFrames: true,
      },
      func: () => {
        const videos = document.querySelectorAll('audio,video');
        for (const media of videos) {
          if (!media.paused) {
            media.pause();
          }
        }
      },
    });
  }
  await chrome.runtime.sendMessage({
    action: 'open-vlc',
    tab: { id: tab.id, url: tab.url },
  });
  window.close();
}

document.addEventListener('DOMContentLoaded', async () => {
  document.querySelector('#extension_version').textContent = `v${
    chrome.runtime.getManifest().version
  }`;

  const open_btn = document.querySelector('#open');
  open_btn.addEventListener('click', openVLC);
  open_btn.focus();

  const tabs = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  tab = tabs[0];

  // do not open immediately if this is e.g. the New Tab page
  // this gives you an easy way to uncheck the checkbox
  if (!tab.url.startsWith('http')) {
    return;
  }

  const options = await chrome.storage.sync.get(default_options);
  if (options.open_immediately) {
    openVLC();
  }
});
