document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#extension_version").textContent = `v${chrome.runtime.getManifest().version}`;

  document.querySelector("#open").addEventListener("click", function() {
    chrome.runtime.sendMessage("open-vlc");
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
