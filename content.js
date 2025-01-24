const waitForElement = (selector, timeout = 5000) =>
  new Promise((resolve, reject) => {
    let interval = 100;
    const maxInterval = 500;
    let elapsedTime = 0;

    const timer = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(timer);
        resolve(element);
      } else if (elapsedTime >= timeout) {
        clearInterval(timer);
        reject(new Error("Timeout: Element not found"));
      }
      elapsedTime += interval;
      interval = Math.min(interval * 1.5, maxInterval);
    }, interval);
  });

const getVideoDetails = async () => {
  await waitForElement("#description");

  // Extract title
  const titleElement = document.querySelector(
    "h1.ytd-watch-metadata yt-formatted-string"
  );
  const title = titleElement?.innerText.trim() || "Title not found";

  const viewText =
    document.querySelector(
      "#teaser-carousel .ytVideoMetadataCarouselViewModelHost"
    ) !== null
      ? "Watching now"
      : "Views";

  // Extract views
  let viewsElement = document.querySelector("#view-count");
  let viewCount = viewsElement?.getAttribute("aria-label").trim();

  if (viewCount === "") {
    viewsElement = document.querySelector(
      "yt-formatted-string.ytd-watch-info-text span:nth-child(1)"
    );
    viewCount = `${viewsElement?.innerText.trim()}`;
  }

  const views = `${viewCount.split(" ")[0]} ${viewText}`;

  // Extract channel name
  const channelElement = document.querySelector(".ytd-channel-name a");
  const channel = channelElement?.innerText.trim() || "Channel not found";

  // Extract channel profile picture
  const profilePictureElement = document.querySelector("yt-img-shadow #img");
  const profilePictureUrl =
    profilePictureElement?.src || "Profile picture not found";

  // Process links in the description
  const uniqueLinks = new Map();
  const links = [...document.querySelectorAll("#description a")]
    .filter((a) => a.href.startsWith("https://www.youtube.com/redirect"))
    .map((a) => {
      const href = a.href;
      const urlParams = new URLSearchParams(new URL(href).search);
      const actualLink = urlParams.get("q") || href;

      // Extract link title and surrounding text
      const linkTitle = a.innerText.trim() || actualLink;
      const surroundingText =
        a.parentElement?.previousSibling?.nodeType === Node.TEXT_NODE
          ? a.parentElement.previousSibling.textContent.trim()
          : a.parentElement?.previousElementSibling?.innerText.trim() || "";

      // Add link to the Map, ensuring uniqueness based on the actual link
      uniqueLinks.set(actualLink, {
        link: actualLink,
        text: linkTitle,
        surrounding: surroundingText,
      });
    });

  // Convert the Map back to an array of unique links
  const uniqueLinksArray = Array.from(uniqueLinks.values());

  return { title, views, links: uniqueLinksArray, channel, profilePictureUrl };
};

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_VIDEO_DETAILS") {
    getVideoDetails()
      .then(sendResponse)
      .catch((err) => {
        console.error(err);
        sendResponse({ error: "Failed to retrieve video details." });
      });
    return true;
  }
});
