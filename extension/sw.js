const default_options = {
  open_tab_in_background: false,
};

async function open(url, tabId) {
  console.log(`vlc://${url}`);

  // Open a new tab to start the prompt
  const options = await chrome.storage.sync.get(default_options);
  const newtab = await chrome.tabs.create({ url: `vlc://${url}` });

  // Focus the old tab
  if (options.open_tab_in_background) {
    chrome.tabs.update(tabId, { active: true });
  }

  // You have 10 seconds to click the button
  // If the tab is closed too soon then the button no longer works :(
  // This will throw an error if the tab is closed before this, but that's ok. Catch it so it doesn't show up in chrome://extensions.
  setTimeout(() => chrome.tabs.remove(newtab.id).catch(() => {}), 10000);
}

chrome.runtime.onMessage.addListener(message => {
  if (message.action === 'open-vlc') {
    const tab = message.tab;
    open(tab.url, tab.id);
  }
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'open-vlc') {
    open(tab.url, tab.id);
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'open-vlc') {
    const url = [info.linkUrl, info.frameUrl, info.srcUrl, info.pageUrl].find(
      url => url && url.startsWith('http'),
    );
    if (url) {
      open(url, tab.id);
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'open-vlc',
    title: 'Open with VLC',
    contexts: ['link', 'frame', 'video', 'audio'],
  });
});
