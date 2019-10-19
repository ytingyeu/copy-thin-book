/* global chrome */

/* Create qurey string for different attributes and shop */
export function createQueryStr(shopName) {

  // bg.console.log("createQueryStr");

  let queryStrTitle;
  let queryStrAuthor;
  let queryStrCircle;
  let queryStrPrice;
  let queryStrGenre;

  switch (shopName) {
    case "toranoana":
      queryStrTitle = "document.querySelector(\"meta[property='og:title']\").getAttribute(\"content\");";
      queryStrAuthor = "document.querySelector(\"div.sub-name span.sub-p\").innerText;";
      queryStrCircle = "document.querySelector(\"div.sub-circle span.sub-p \").innerText;";
      queryStrPrice = "document.querySelectorAll(\"li.pricearea__price.pricearea__price--normal\")[0].innerText;";
      queryStrGenre = "document.querySelectorAll(\"table.detail4-spec span.infoorder-p span:not(.ico-tim)\")[1].innerText;";
      break;


    case "melonbooks":
      queryStrTitle = "document.querySelectorAll(\"table.stripe tr.odd td\")[0].innerText;";
      queryStrAuthor = "document.querySelectorAll(\"table.stripe tr.odd td\")[2].innerText;";
      queryStrCircle = "document.querySelectorAll(\"table.stripe tr.odd td\")[1].innerText;";
      queryStrPrice = "document.querySelector(\"td.price.txt_left\").innerText";
      queryStrGenre = "document.querySelectorAll(\"table.stripe tr.odd td\")[3].innerText;";
      break;
  }

  let queryList = {
    "queryTitle": queryStrTitle,
    "queryAuthor": queryStrAuthor,
    "queryCircle": queryStrCircle,
    "queryPrice": queryStrPrice,
    "queryGenre": queryStrGenre
  }

  return queryList;
}


export function createQueryPromises(tab, queryList) {
  /*=========== create promises for different fields ===========*/

  const getTitle = new Promise(function (resolve, reject) {
    //bg.console.log('getTitle');

    chrome.tabs.executeScript(
      tab.id, { code: queryList["queryTitle"] },
      function (results) {
        if (results[0] == null) {
          resolve("title_not_found");
        } else {
          resolve(results[0]);
        }
      });
  });

  const getAuthorName = new Promise(function (resolve) {
    //bg.console.log('getAuthorName');

    chrome.tabs.executeScript(
      tab.id, { code: queryList["queryAuthor"] },
      function (results) {
        if (results[0] == null) {
          resolve("author_not_found");
        } else {
          resolve(results[0]);
        }
      });
  });

  const getCircleName = new Promise(function (resolve) {
    //bg.console.log('getCircleName');

    chrome.tabs.executeScript(
      tab.id, { code: queryList["queryCircle"] },
      function (results) {
        if (results[0] == null) {
          resolve("circle_not_found");
        } else {
          resolve(results[0]);
        }
      });
  });

  const getPrice = new Promise(function (resolve) {
    //bg.console.log('getPrice');
    chrome.tabs.executeScript(
      tab.id, { code: queryList["queryPrice"] },
      function (results) {
        if (results[0] == null) {
          resolve("price_not_found");
        } else {
          resolve(results[0]);
        }
      });
  });

  const getGenre = new Promise(function (resolve) {
    //bg.console.log('getGenre');
    chrome.tabs.executeScript(
      tab.id, { code: queryList["queryGenre"] },
      function (results) {
        if (results[0] == null) {
          resolve("genre_not_found");
        } else {
          resolve(results[0]);
        }
      });
  });

  // const promiseList = {
  //   "getTitle": getTitle, 
  //   "getAuthorName": getAuthorName, 
  //   "getCircleName": getCircleName,
  //   "getPrice": getPrice, 
  //   "getGenre": getGenre
  // }

  const promiseList = [getTitle, getAuthorName, getCircleName, getPrice, getGenre];

  return promiseList;
}