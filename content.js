const waitForElement = (selector, timeout = 5000) =>
  new Promise((resolve, reject) => {
    const interval = 100; // Check every 100ms
    const timer = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(timer);
        resolve(element);
      }
    }, interval);

    setTimeout(() => {
      clearInterval(timer);
      reject(new Error("Timeout: Element not found"));
    }, timeout);
  });

const getVideoDetails = async () => {
  await waitForElement("#description"); // Wait for the description to load

  const titleElement = document.querySelector(
    "h1.ytd-watch-metadata yt-formatted-string"
  );
  const title = titleElement
    ? titleElement.innerText.trim()
    : "Title not found";

  const descriptionElement = document.querySelector(
    "#description yt-formatted-string span"
  );
  const description = descriptionElement
    ? descriptionElement.innerText.trim()
    : "Description not found";

  const channelElement = document.querySelector(".ytd-channel-name a");
  const channel = channelElement
    ? channelElement.innerText.trim()
    : "Channel not found";

  const links = [...document.querySelectorAll("#description a")].map((a) => {
    const href = a.href; // The raw link
    const isRedirect = href.startsWith("https://www.youtube.com/redirect");
    let actualLink = href;

    // Extract the actual link if it's a YouTube redirect
    if (isRedirect) {
      const urlParams = new URLSearchParams(new URL(href).search);
      actualLink = urlParams.get("q") || href;
    }

    // Get the link title
    const linkTitle = a.innerText.trim() || actualLink;
    const surroundingText = a.parentElement?.closest("span")
      ? a.parentElement?.closest("span").innerText.trim()
      : "No description available"; // Text in the surrounding span

    return { link: actualLink, text: linkTitle, surrounding: surroundingText };
  });

  return { title, description, links, channel };
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_VIDEO_DETAILS") {
    getVideoDetails().then(sendResponse);
    return true; // Keep the message channel open for async response
  }
});
