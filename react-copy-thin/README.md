This is a React verion of copy-thin-book.

To lauch the app in dev mode, under the root execute `npm run build`, and then drag & drop the build folder into `chrome://extensions/`. To see any change of the code, you have to build and reload the extension every time. Please let me know if there is anyway to avoid this heavy process and can preview the change of React.

The option page is set in `manifest.json`. I have no idea how to let Chrome read option page if it's a React JS file instead of a HTML file. So the option page is written with HTML DOM and jQury.
