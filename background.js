var enabled = 1;

function updateIcon(toggle) {
  if (toggle == "on") {
    chrome.browserAction.setIcon({path:"32.png"});
  }
  else if (toggle == "off") {
    chrome.browserAction.setIcon({path:"off.png"});
  }
}

chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({title: "Testia Tarantula"}, function(tabs) {
    if (enabled == 1) {
      chrome.tabs.sendMessage(tabs[0].id, {message: "disable"});
      updateIcon("off");
      enabled = 0;
    }
    else if (enabled == 0) {
      chrome.tabs.sendMessage(tabs[0].id, {message: "enable"});
      updateIcon("on");
      enabled = 1;
    }
  });
});
