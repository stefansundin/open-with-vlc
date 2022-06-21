const default_options = {
  pause_media: false,
  open_tab_in_background: false,
  open_immediately: false,
};

document.addEventListener('DOMContentLoaded', async () => {
  const pause_media = document.getElementById('pause_media');
  const open_tab_in_background = document.getElementById(
    'open_tab_in_background',
  );
  const open_immediately = document.getElementById('open_immediately');

  const options = await chrome.storage.sync.get(default_options);
  pause_media.checked = options.pause_media;
  open_tab_in_background.checked = options.open_tab_in_background;
  open_immediately.checked = options.open_immediately;

  pause_media.addEventListener('change', () =>
    chrome.storage.sync.set({
      pause_media: pause_media.checked,
    }),
  );

  open_tab_in_background.addEventListener('change', () =>
    chrome.storage.sync.set({
      open_tab_in_background: open_tab_in_background.checked,
    }),
  );

  open_immediately.addEventListener('change', () =>
    chrome.storage.sync.set({
      open_immediately: open_immediately.checked,
    }),
  );

  const shortcut = document.querySelector('#shortcut');
  shortcut.addEventListener('click', function (e) {
    e.preventDefault();
    chrome.tabs.create({ url: this.href });
  });
  const commands = await chrome.commands.getAll();
  for (const command of commands) {
    if (command.name === 'open-vlc') {
      shortcut.textContent = command.shortcut || 'not set';
    }
  }
});
