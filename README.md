# Scramjet UV Example - Nebula OS

A modern, feature-rich proxy-based web browser with a desktop environment interface. Browse the web anonymously with support for Ultraviolet and Scramjet proxies.

## Features

### Nebula OS Desktop Environment
- **Custom Desktop OS Interface** - Experience a sleek, dark-themed desktop experience
- **Draggable Windows** - Move and manage applications freely
- **Window Management** - Minimize, maximize, and close applications
- **Taskbar** - Quick access to open applications
- **Settings** - Customize wallpapers, time format, and more
- **Calculator** - Built-in calculator app
- **Stealth Mode** - Disguise your browser tab as Google Drive, Classroom, Gmail, or Zoom

### Advanced Browser with Tab System
- **Multi-Tab Support** - Open multiple tabs and switch between them seamlessly
- **Modern Tab UI** - Close tabs, create new tabs, with visual indicators
- **Proxy Selection** - Choose between Ultraviolet and Scramjet proxies
- **URL Bar** - Search or enter URLs with automatic detection
- **About:Blank Mode** - Launch the browser in a stealth about:blank window

### Privacy & Proxy Features
- **Ultraviolet Proxy** - Fast and reliable web proxy
- **Scramjet Proxy** - Alternative proxy support
- **Service Workers** - Offline-capable architecture
- **WASM Support** - High-performance web proxy

### Credits
- **Credit to Gn-Math for games
- **Credit to alivehamster's scramjet UV example for proxy

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:3000` (or your configured port).

## Project Structure

```
├── public/
│   ├── index.html           # Main Nebula OS desktop interface
│   ├── browser.html         # Browser application with tab system
│   ├── arcade.html          # Arcade games application
│   ├── style.css            # Browser styling
│   ├── stuff.js             # Browser logic and tab management
│   ├── sw.js                # Service worker
│   └── uv/                  # Ultraviolet proxy files
├── scramjet/                # Scramjet proxy files
├── index.js                 # Server entry point
└── package.json             # Dependencies
```

## Usage

### Opening the Browser
1. Launch the application
2. Open the **Browser** app from the desktop
3. Enter a URL or search query in the address bar
4. Create new tabs with the `+` button
5. Switch between tabs by clicking them
6. Close tabs with the `✕` button

### Switching Proxies
Use the dropdown in the address bar to switch between:
- **Ultraviolet** - Default fast proxy
- **Scramjet** - Alternative proxy option

### Stealth Mode
1. Open **Settings** from the desktop
2. Choose a tab disguise (Google Drive, Classroom, Gmail, or Zoom)
3. Click "Launch in About:Blank" for maximum stealth

## Troubleshooting

**Scramjet having issues?**
- Open DevTools (Inspect)
- Go to Application → Storage
- Clear all site data
- Reload the page

## License

See [LICENSE](LICENSE) file for details.

## Notes

- This project is designed for educational purposes
- Ensure compliance with local laws and regulations when using proxy services
- Respect website terms of service when accessing content through proxies
