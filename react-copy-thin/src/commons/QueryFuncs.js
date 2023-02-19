/* global chrome */
import { ShopName, InfoNotFound } from "commons/ConstantStrings";

const queryFuncDict = {
  [ShopName.toranoana]: {
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

  [ShopName.melonbooks]: {
    queryTitle: () => document.querySelector(".page-header").innerText,

    queryAuthor: () =>
      document.querySelectorAll(".product_info a")[2].innerText,

    queryCircle: () =>
      document.querySelectorAll(".product_info a")[0].innerText,

    queryPrice: () => document.querySelector(".yen.__discount").innerText,

    queryGenre: () =>
      document.querySelectorAll(".table-wrapper th+td")[2].innerText,
  },

  [ShopName.dlsite]: {
    queryTitle: () => document.querySelector("#work_name").innerText,

    // DLSite doesn't have this field
    queryAuthor: () => "",

    queryCircle: () => document.querySelector(".maker_name a").innerText,

    queryPrice: () => document.querySelector(".price").innerText,

    queryGenre: () => {
      const genreElements = document.querySelectorAll(".main_genre a");

      const genreList = [];

      genreElements.forEach((element) => {
        genreList.push(element.innerText);
      });

      return genreList.toString();
    },
  },
};

export function createQueryPromises(tab, shopName) {
  /*=========== create promises for different fields ===========*/

  const getTitle = new Promise(function (resolve, reject) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: queryFuncDict[shopName].queryTitle,
      },
      function (results) {
        //console.log(results);

        if (results[0] == null) {
          resolve(InfoNotFound.title);
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
        //console.log(results);

        if (results[0] == null) {
          resolve(InfoNotFound.author);
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
        //console.log(results);

        if (results[0] == null) {
          resolve(InfoNotFound.circle);
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
        //console.log(results);

        if (results[0] == null) {
          resolve(InfoNotFound.price);
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
        //console.log(results);

        if (results[0] == null) {
          resolve(InfoNotFound.genre);
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
