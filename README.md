# YouTube Video Info Extractor

A Chrome extension that extracts and displays detailed information about YouTube videos, including the title, description, channel name, and redirection links found in the video description. You can easily access and view these details via the extension's popup.

## Features

- **Extract Video Details:** Retrieves the title, description, and channel name from the current YouTube video.
- **Show Redirect Links:** Detects YouTube redirect links and extracts the actual destination URLs.
- **Keyboard Shortcut Support:** Press `Ctrl + Shift + Y` to open the extension popup directly from YouTube without clicking the extension icon.
- **Unique Links:** Filters out duplicate redirection links, ensuring only unique links are displayed.

## How to Use

1. **Install the Extension:**

   - **Clone the repository** to your local machine using Git:

     ```bash
     git clone https://github.com/Z3R0R0Z3/ytlinks-extension.git
     ```

   - Navigate to `chrome://extensions/` in your Chrome browser.
   - Enable **Developer mode** in the top right corner.
   - Click **Load unpacked** and select the folder where the extension files are located.

2. **Using the Extension:**
   - Go to a **YouTube** video page.
   - Click on the extension icon in the top-right corner of the browser, or press `Ctrl + Shift + Y` to open the popup.
   - The popup will show the following details of the video:
     - **Title**
     - **Description**
     - **Channel Name**
     - **Redirection Links** (If any)
3. **Keyboard Shortcut:**
   - You can open the popup directly by pressing the shortcut `Ctrl + Shift + Y` while on a YouTube page.

## Keyboard Shortcuts

| Action     | Shortcut           |
| ---------- | ------------------ |
| Open Popup | `Ctrl + Shift + Y` |

## Permissions

The extension requires the following permissions:

- **Active Tab:** To interact with the active tab and extract the video details.
- **Scripting:** To execute scripts on the YouTube page.
- **Host Permissions:** To access YouTube video pages (`https://www.youtube.com/*`).

## Contributing

Feel free to fork the project and submit issues or pull requests with suggestions, improvements, or bug fixes.

## License

This project is open-source and available under the [MIT License](LICENSE).
