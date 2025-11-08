/* global chrome */

const DEFAULT_TAX_RATE = 10;

export const getStorageData = (key) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, (result) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );

export async function clearPriceInfo(dirtyPrice, shopName) {
  // clear price info, add tax

  let { taxRate } = await getStorageData("taxRate");

  if (!taxRate) {
    taxRate = DEFAULT_TAX_RATE;
  }

  let price;

  if (dirtyPrice !== "price_not_found") {
    price = parseInt(dirtyPrice.match(/[0-9 , \.]+/g)[0].replace(",", ""));

    // Toranoana shows price before tax
    if (shopName === "toranoana") {
      price = Math.round(price * (1 + taxRate / 100));
    }
  }
  return price;
}

export async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export async function copyToClipboard(dataArray) {
  let { orderSetting } = await getStorageData("orderSetting");

  if (!orderSetting) {
    orderSetting = [...Array(dataArray.length).keys()];
  }

  let strBuilder = "";

  orderSetting.forEach((val, idx) => {
    strBuilder = strBuilder + dataArray[val];

    if (idx !== orderSetting.length - 1) {
      strBuilder = strBuilder + "\t";
    }
  });

  // create a new element and append it to DOM
  const copyDummyEl = document.createElement("textarea");
  copyDummyEl.value = strBuilder;

  // select and copy to clipboard
  copyDummyEl.select();
  navigator.clipboard.writeText(copyDummyEl.value);

  // remove useless element
  copyDummyEl.remove();
}
