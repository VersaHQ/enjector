// This will kick off the "show_options" function when someone clicks the browser action button
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {command: "show_options"}, function(response) {
      //console.log(response.farewell);
    });
  });
});