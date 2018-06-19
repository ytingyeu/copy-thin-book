const taxRate = 1.08; // will increase to 1.1 on Oct, 2019
const bg = chrome.extension.getBackgroundPage();


/* Create qurey string for different attributes and shop */
function createQueryStr(shopName) {

  bg.console.log("createQueryStr");

  var queryStrTitle;
  var queryStrAuthor;
  var queryStrCircle;
  var queryStrPrice;
  var queryStrGenre;

  switch (shopName) {
    case "toranoana":
      queryStrTitle = "document.querySelector(\"meta[property='og:title']\").getAttribute(\"content\");"
      queryStrAuthor = "document.querySelector(\"div.sub-name span.sub-p\").textContent;";
      queryStrCircle = "document.querySelector(\"div.sub-circle span.sub-p\").textContent;";
      queryStrPrice = "document.querySelector(\"div.price div.normal\").textContent;";
      queryStrGenre = "document.querySelectorAll(\"table.detail4-spec span.infoorder-p\")[1].textContent;";
      break;


    case "melonbooks":
      break;
  }

  var queryList = {
    "queryTitle": queryStrTitle,
    "queryAuthor": queryStrAuthor,
    "queryCircle": queryStrCircle,
    "queryPrice": queryStrPrice,
    "queryGenre": queryStrGenre
  }

  return queryList;
}

function copyToClipboard(str) {
  bg.console.log('copyToClipboard');
  bg.console.log(str);

  // create a new element and append it to DOM
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);

  // select and execute copy
  el.select();
  document.execCommand('copy');

  // remove useless element
  document.body.removeChild(el);
}


btn_copy.onclick = function () {

  bg.console.log('copy clicked');

  var shopName = "toranoana";
  var queryList = createQueryStr(shopName);

  // get current tab
  chrome.tabs.query({ active: true }, async function (tabs) {
    var tab = tabs[0];
    var queryStr;

    /*=========== create promises for different fields ===========*/
    var getTitle = new Promise(function (resolve, reject) {
      bg.console.log('getTitle');

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

    var getAuthorName = new Promise(function (resolve) {
      bg.console.log('getAuthorName');

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

    var getCircleName = new Promise(function (resolve) {
      bg.console.log('getCircleName');

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

    var getPrice = new Promise(function (resolve) {
      bg.console.log('getPrice');
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

    var getGenre = new Promise(function (resolve) {
      bg.console.log('getGenre');
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
    /*=================== End of promise area ===================*/

    // async process
    try {
      var book_title = await getTitle;
      //var author_name = await getAuthorName;
      var circle_name = await getCircleName;
      var priceStr = await getPrice;
      var genre = await getGenre;
    } catch (err) {
      bg.console.log(err);
    }


    // clear price info, add tax
    var price;
    if (priceStr !== "price_not_found") {
      price = parseInt(priceStr.match(/[0-9 , \.]+/g)[0].replace(",", ""));

      if (shopName === "toranoana") {
        price = Math.round(price * taxRate);
      }
    } else {
      price = priceStr;
    }

    // create copied string and pass to copy func
    var copyStr = book_title + '\t' + circle_name + '\t' + price + '\t' + genre + '\t' + tab.url;
    copyToClipboard(copyStr);

    // close popup
    window.close();

  });

};
