/* global chrome */

const DEFAULT_TAX_RATE = 10;

// Utility functions
const getStorageData = (key) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, (result) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );

async function clearPriceInfo(dirtyPrice, shopName) {
  let { taxRate } = await getStorageData("taxRate");

  if (!taxRate) {
    taxRate = DEFAULT_TAX_RATE;
  }

  let price;

  if (dirtyPrice !== "price_not_found") {
    price = parseInt(dirtyPrice.match(/[0-9 , \.]+/g)[0].replace(",", ""));

    if (shopName === "toranoana") {
      price = Math.round(price * (1 + taxRate / 100));
    }
  }
  return price;
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function copyToClipboard(dataArray) {
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

  const copyDummyEl = document.createElement("textarea");
  copyDummyEl.value = strBuilder;

  copyDummyEl.select();
  navigator.clipboard.writeText(copyDummyEl.value);

  copyDummyEl.remove();
}

// Query functions
const queryFuncDict = {
  toranoana: {
    queryTitle: () =>
      document
        .querySelector("meta[property='og:title']")
        .getAttribute("content"),

    queryAuthor: () =>
      document.querySelector("div.sub-name span.sub-p").innerText,

    queryCircle: () =>
      document.querySelector("div.sub-circle span.sub-p").innerText,

    queryPrice: () =>
      document.querySelector("li.pricearea__price.pricearea__price--normal")
        .innerText,

    queryGenre: () =>
      document.querySelector(".js-product-detail-spec-genre").innerText,
  },

  melonbooks: {
    queryTitle: () => document.querySelector(".page-header").innerText,

    queryAuthor: () => {      
      const authorCell = document.querySelectorAll(".table-wrapper th+td")[1];
      const authorLinks = authorCell.querySelectorAll("a:not(.favorite_author)");
      return Array.from(authorLinks).map(link => link.innerText.trim()).join(", ");
    },

    queryCircle: () => {
      const circleText = document.querySelectorAll(".table-wrapper th+td")[0].innerText;
      return circleText.replace(/\s*\(作品数:\d+\)/, '').replace(/&nbsp;/g, ' ').trim();
    },

    queryPrice: () => document.querySelector(".price--value").innerText.trim(),

    queryGenre: () =>
      document.querySelectorAll(".table-wrapper th+td")[2].innerText,
  },
};

function createQueryPromises(tab, shopName) {
  const getTitle = new Promise(function (resolve, reject) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: queryFuncDict[shopName].queryTitle,
      },
      function (results) {
        if (results[0] == null) {
          resolve("title_not_found");
        } else {
          resolve(results[0].result);
        }
      }
    );
  });

  const getAuthorName = new Promise(function (resolve) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: queryFuncDict[shopName].queryAuthor,
      },
      function (results) {
        if (results[0] == null) {
          resolve("author_not_found");
        } else {
          resolve(results[0].result);
        }
      }
    );
  });

  const getCircleName = new Promise(function (resolve) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: queryFuncDict[shopName].queryCircle,
      },
      function (results) {
        if (results[0] == null) {
          resolve("circle_not_found");
        } else {
          resolve(results[0].result);
        }
      }
    );
  });

  const getPrice = new Promise(function (resolve) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: queryFuncDict[shopName].queryPrice,
      },
      function (results) {
        if (results[0] == null) {
          resolve("price_not_found");
        } else {
          resolve(results[0].result);
        }
      }
    );
  });

  const getGenre = new Promise(function (resolve) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: queryFuncDict[shopName].queryGenre,
      },
      function (results) {
        if (results[0] == null) {
          resolve("genre_not_found");
        } else {
          resolve(results[0].result);
        }
      }
    );
  });

  const promiseList = [
    getTitle,
    getAuthorName,
    getCircleName,
    getPrice,
    getGenre,
  ];

  return promiseList;
}

class CopyThinBookApp {
  constructor() {
    this.shopName = "";
    this.url = "";
    this.tab = null;
    this.statusElement = document.getElementById('status');
    this.copyButton = document.getElementById('copy-btn');
    this.optionsButton = document.getElementById('options-btn');

    this.init();
  }

  async init() {
    // Set up event listeners
    this.copyButton.addEventListener('click', () => this.handleCopy());
    this.optionsButton.addEventListener('click', () => this.openOptions());

    // Initialize with current tab
    try {
      this.tab = await getCurrentTab();
      
      if (this.tab.url.includes("toranoana")) {
        this.shopName = "toranoana";
        this.url = this.tab.url;
      } else if (this.tab.url.includes("melonbooks")) {
        this.shopName = "melonbooks";
        this.url = this.tab.url;
      }
    } catch (error) {
      console.error('Error initializing app:', error);
      this.showStatus('Error: Could not access current tab');
    }
  }

  async handleCopy() {
    if (!this.tab || !this.shopName) {
      this.showStatus('Error: Unsupported website');
      return;
    }

    try {
      const promiseList = createQueryPromises(this.tab, this.shopName);
      
      const [bookTitle, authorName, circle, dirtyPrice, genre] = 
        await Promise.all(promiseList);

      const price = await clearPriceInfo(dirtyPrice, this.shopName);

      await copyToClipboard([bookTitle, authorName, circle, price, genre, this.url]);

      this.showStatus("Success!");

      setTimeout(() => {
        this.showStatus("");
      }, 2000);
    } catch (err) {
      console.error('Error during copy operation:', err);
      this.showStatus('Error: Copy failed');
    }
  }

  openOptions() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL("options.html"));
    }
  }

  showStatus(message) {
    this.statusElement.textContent = message;
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CopyThinBookApp();
});