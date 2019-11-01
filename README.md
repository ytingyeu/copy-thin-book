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

**Notice: this extension is unlisted on Chrome Web Store since it hasn't been fully tested yet.**

## For Developers
There are two project folder on this repository.
`pure-js` is developed without any framework, while `react-copy-thin` is using React.

**The depolyed build on Chrome Web Store is based on `react-copy-thin`.**

To install unpacked extension, you can:
1. Download and extract the project
2. On Chrome, access `chrome://extensions` and turn on Developer mode.
3. 
    - For `pure-js`, drag & drop `pure-js` folder into the browser.
    - For `react-copy-thin`, under the root of `react-copy-thin`, execute `npm run build` to build the applicaiotn. Then drag & drop the `build` folder into `chrome://extensions.

Click refresh icon to reload the extension once the source code is modified.
