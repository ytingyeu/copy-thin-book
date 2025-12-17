# Copy Thin Book - Vanilla JavaScript Implementation

This is the vanilla JavaScript implementation of the Copy Thin Book Chrome extension, ported from the React version.

## Structure

```
src/
├── manifest.json          # Chrome extension manifest
├── popup.html            # Main popup interface
├── popup.js              # Main application logic (vanilla JS)
├── styles.css            # Popup styling
├── background.js         # Service worker
├── OptionPage/
│   ├── options.html      # Options page interface
│   ├── options.js        # Options page functionality
│   └── options.css       # Options page styling
├── assets/               # Bootstrap, MDB, and other assets
│   ├── css/             # CSS libraries
│   ├── js/              # JavaScript libraries
│   ├── img/             # Images and icons
│   └── font/            # Font files
└── icons/               # Extension icons
    ├── copy_thin_book16.png
    ├── copy_thin_book32.png
    ├── copy_thin_book48.png
    └── copy_thin_book128.png
```

## Features

- **No React Dependency**: Pure vanilla JavaScript implementation
- **Same Functionality**: All features from the React version are preserved
- **Chrome Extension Support**: Works with Manifest V3
- **Responsive UI**: Clean interface with Font Awesome icons
- **Options Page**: Configurable tax rates and copy/paste sequence

## Key Changes from React Version

1. **Removed React Dependencies**: No more React, ReactDOM, or mdbreact
2. **Bootstrap Integration**: Uses Bootstrap classes directly instead of mdbreact components
3. **Consolidated Code**: All utility functions are now in `popup.js`
4. **Native DOM Manipulation**: Direct DOM access instead of React components
5. **ES5 Compatible**: No ES modules to ensure Chrome extension compatibility
6. **Simplified Build**: No build process required, ready to load directly
7. **Asset Cleanup**: Removed unused libraries, reducing size by ~57% (5.21MB → 2.23MB)

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `src` folder
4. The extension should now be loaded and ready to use

## Usage

1. Navigate to a supported website (Toranoana or Melonbooks)
2. Go to a product page
3. Click the extension icon in the Chrome toolbar
4. Click the copy button to extract and copy book information
5. Use the gear icon to access options and configure settings

## Supported Websites

- **Toranoana**: Both all-age (ecs.toranoana.jp) and R18 (ec.toranoana.jp) versions
- **Melonbooks**: Product pages (www.melonbooks.co.jp)

## Files Overview

- **popup.js**: Contains all the main logic including utility functions, query functions, and the main app class
- **popup.html**: Bootstrap-based popup interface with responsive design
- **background.js**: Service worker that handles extension activation rules
- **options.html/js**: Bootstrap/MDB-styled options page with jQuery UI sortable functionality
- **styles.css**: Minimal custom styling that works with Bootstrap
- **assets/**: Streamlined assets (29 files, 2.23MB)
  - **css/**: Bootstrap, MDB, and jQuery UI (3 files)
  - **js/**: Core libraries only - jQuery, Bootstrap, MDB, Popper (5 files)  
  - **font/**: Roboto font family for MDB compatibility
  - **img/**: Chrome Web Store icon only

This implementation maintains full compatibility with the original React version while removing the React dependency and simplifying the codebase.