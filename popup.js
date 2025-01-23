chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTabId = tabs[0].id;
  const url = tabs[0].url;

  if (url && url.includes("youtube.com/watch")) {
    chrome.tabs.sendMessage(
      activeTabId,
      { type: "GET_VIDEO_DETAILS" },
      (response) => {
        if (chrome.runtime.lastError || !response) {
          document.getElementById("video-info").textContent =
            "Error: Unable to retrieve video details.";
        } else {
          document.getElementById("video-info").innerHTML = `
          <div class="channel-container">
          <img class="profilepic" src=${
            response.profilePictureUrl
          } alt="channel picture">
            <p class="channel">${response.channel}</p>
          </div>
            <p class="title">${response.title}</p>
            <p>${response.views}</p>  
            <p>${response.links
              .map(
                (linkObj) => `
                  <li>
                    <div class="link-description">${linkObj.surrounding}</div>

                    <a href="${linkObj.link}" target="_blank">${linkObj.text}</a>
                  </li>`
              )
              .join("")}</p>
          `;
        }
      }
    );
  } else {
    document.getElementById("video-info").textContent =
      "Please open a YouTube video page to use this extension.";
  }
});
