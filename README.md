# copy-thin-book

## Description
Feel tired to copy and paste every single attribute of a thin book manually 
when making requests to shopping agent service or recording what you've bought?

**copy-thin-book** is a Chrome Extension which finds out the title, auther name, circle name, genre, 
price after tax, and URL under the page of a certain Doujinshi on Toranoana and Melonbooks. 
It then separates these attributes with tabs and copies to clipboard. 
You can then paste the attributes to any spreadsheet.

Currently this tool only supports:
* Item type: Doujinshi only. This does NOT include Doujin CD/Game/Goods.
* Website:
 [Toranoana](https://www.toranoana.jp/),
 [Melonbooks](https://www.melonbooks.co.jp/)

## How to use?

Install the extension on
[Chrome Web Store](https://chrome.google.com/webstore/detail/copy-thin-book/lpioakbgahcliooefppgddhbdgiapcak)

Under a page of a certain book, click the extension icon and then click the popup copy icon. 
It will dispaly a success message once the copy is done.

## For Developers

To install unpacked extension, you do:
1. Download and extract the project
2. Under the root of `react-copy-thin`, execute `npm install`
3. Execute `npm run build`
4. On Chrome, access `chrome://extensions` and turn on Developer mode.
5. Drag & drop the `build` folder into `chrome://extensions.
6. Click refresh icon to reload the extension once the source code is modified.

To see any change of the code, you have to build and reload the extension every time. Please let me know if there is anyway to avoid this heavy process and can preview the changes of React.

The option page is in `public/OptionPage`. I have no idea how to let Chrome read option page if it's a React App instead of a HTML file. So the option page is written seperately without React.
