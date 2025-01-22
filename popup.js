chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTabId = tabs[0].id;
  const url = tabs[0].url;

  if (url && url.includes("youtube.com/watch")) {
    // Send message to get video details from content script
    chrome.tabs.sendMessage(
      activeTabId,
      { type: "GET_VIDEO_DETAILS" },
      (response) => {
        if (chrome.runtime.lastError || !response) {
          document.getElementById("video-info").textContent =
            "Error: Unable to retrieve video details.";
        } else {
          // Display video info
          document.getElementById("video-info").innerHTML = `
            <p><strong>Channel:</strong> ${response.channel}</p>
            <p><strong>Title:</strong> ${response.title}</p>
            <p><strong>Description:</strong> ${response.description}</p>
            <p><strong>Links:</strong></p>
            <ul>${response.links
              .map(
                (linkObj) => `
                  <li>
                    <div class="link-description">${linkObj.surrounding}</div>

                    <a href="${linkObj.link}" target="_blank">${linkObj.text}</a>
                  </li>`
              )
              .join("")}</ul>
          `;
        }
      }
    );
  } else {
    document.getElementById("video-info").textContent =
      "Please open a YouTube video page to use this extension.";
  }
});
