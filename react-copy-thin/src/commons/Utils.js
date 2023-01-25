/* global chrome */

//const bg = chrome.extension.getBackgroundPage();

export async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export function copyToClipboard(data) {
  //bg.console.log("copyToClipboard");

  chrome.storage.sync.get(["orderSetting"], (options) => {
    let { orderSetting } = options;
    let strBuilder = "";
    // bg.console.log(orderSetting);
    // bg.console.log(data);

    if (!orderSetting) {
      orderSetting = [...Array(data.length).keys()];
    }

    orderSetting.forEach((val, idx) => {
      strBuilder = strBuilder + data[val];

      if (idx !== orderSetting.length - 1) {
        strBuilder = strBuilder + "\t";
      }
    });

    // create a new element and append it to DOM
    const copyDummyEl = document.createElement("textarea");
    copyDummyEl.value = strBuilder;
    //document.body.appendChild(el);
    copyDummyEl.select();
    navigator.clipboard.writeText(copyDummyEl.value);

    // select and execute copy
    //el.select();
    //document.execCommand("copy");

    // remove useless element
    document.body.removeChild(copyDummyEl);
  });
}
