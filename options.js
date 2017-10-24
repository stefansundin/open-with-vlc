var version = `v${chrome.runtime.getManifest().version}`
var default_options = {
  open_immediately: false
};

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#extension_version").textContent = version;
  var open_immediately = document.getElementById("open_immediately");

  chrome.storage.sync.get(default_options, function(items) {
    open_immediately.checked = items.open_immediately;
  });

  open_immediately.addEventListener("change", function() {
    var new_options = {
      open_immediately: open_immediately.checked
    };
    chrome.storage.sync.set(new_options, function(){});
  });

  var shortcut = document.querySelector("#shortcut");
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
