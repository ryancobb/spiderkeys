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
  if (enabled == 1) {
    updateIcon("off");
    enabled = 0;
  }
  else if (enabled == 0) {
    updateIcon("on");
    enabled = 1;
  }
  //Send button state to any Testia Tarantula tab
  chrome.tabs.query({title: "Testia Tarantula"}, function(tabs) {
    for (var i=0; i<tabs.length; ++i) {
      chrome.tabs.sendMessage(tabs[i].id, {msg: enabled});
    }
  });
});

//Sends button state when requested from content script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.msg == "btn_state") {
      sendResponse({msg: enabled});
    }
  });
