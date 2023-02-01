/* global chrome */

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
    queryTitle: () =>
      document.querySelectorAll("table.stripe tr.odd td")[0].innerText,

    queryAuthor: () =>
      document.querySelectorAll("table.stripe tr.odd td a")[2].innerText,

    queryCircle: () =>
      document.querySelectorAll("table.stripe tr.odd td a")[0].innerHTML,

    queryPrice: () => document.querySelector(".price").innerText,

    queryGenre: () =>
      document.querySelectorAll("table.stripe tr.odd td")[3].innerText,
  },
};

// TODO: replace tabs.executeScript to scripting.executeScript
export function createQueryPromises(tab, shopName) {
  /*=========== create promises for different fields ===========*/

  const getTitle = new Promise(function (resolve, reject) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: queryFuncDict[shopName].queryTitle,
      },
      function (results) {
        console.log(results);

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
        console.log(results);

        if (results[0] == null) {
          resolve("author_not_found");
        } else {
          resolve(results[0]);
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
        console.log(results);

        if (results[0] == null) {
          resolve("circle_not_found");
        } else {
          resolve(results[0]);
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
        console.log(results);

        if (results[0] == null) {
          resolve("price_not_found");
        } else {
          resolve(results[0]);
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
        console.log(results);

        if (results[0] == null) {
          resolve("genre_not_found");
        } else {
          resolve(results[0]);
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
