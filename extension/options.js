const version = `v${chrome.runtime.getManifest().version}`;
const default_options = {
  open_tab_in_background: false,
  open_immediately: false,
};

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#extension_version").textContent = version;
  const open_tab_in_background = document.getElementById("open_tab_in_background");
  const open_immediately = document.getElementById("open_immediately");

  chrome.storage.sync.get(default_options, function(options) {
    open_tab_in_background.checked = options.open_tab_in_background;
    open_immediately.checked = options.open_immediately;
  });

  open_tab_in_background.addEventListener("change", function() {
    const new_options = {
      open_tab_in_background: open_tab_in_background.checked,
    };
    chrome.storage.sync.set(new_options, function(){});
  });

  open_immediately.addEventListener("change", function() {
    const new_options = {
      open_immediately: open_immediately.checked,
    };
    chrome.storage.sync.set(new_options, function(){});
  });

  const shortcut = document.querySelector("#shortcut");
  shortcut.addEventListener("click", function() {
    chrome.tabs.create({url: "chrome://extensions/configureCommands"});
  });
  chrome.commands.getAll(function(commands) {
    commands.forEach(function(command) {
      if (command.name == "open-vlc") {
        shortcut.textContent = command.shortcut || "not set";
      }
    });
  });
});
