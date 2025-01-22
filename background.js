chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "open-popup") {
    // Open the extension popup
    chrome.action.openPopup();
  }
});
