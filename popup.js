const taxRate = 1.08; // will increase to 1.1 on Oct, 2019
const bg = chrome.extension.getBackgroundPage();

function copyToClipboard(str) {
  //bg.console.log('copyToClipboard');
  //bg.console.log(str);

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

  //bg.console.log('copy clicked');

  /* get current tab */
  chrome.tabs.query({ active: true }, async function (tabs) {

    /* Initialize query string */
    var tab = tabs[0];
    var shopName;
    var queryList;

    // get the type of the product
    var prodType = document.getElementsByName("prod-type");
    var prodTypeText;
    for (var i = 0; i < prodType.length; i++) {
      if (prodType[i].checked) {
        prodTypeText = prodType[i].value;
      }
    }
    //bg.console.log(prodTypeText);

    // get the shop name for differnet query strings
    if (tab.url.includes("toranoana")) {
      shopName = "toranoana"
    } else {
      shopName = "melonbooks"
    }
    queryList = createQueryStr(shopName);


    /*=========== create promises for different fields ===========*/

    var getTitle = new Promise(function (resolve, reject) {
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

    var getAuthorName = new Promise(function (resolve) {
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

    var getCircleName = new Promise(function (resolve) {
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

    var getPrice = new Promise(function (resolve) {
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

    var getGenre = new Promise(function (resolve) {
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

    /*=================== End of promise area ===================*/

    // async process
    try {
      var book_title = await getTitle;
      //var author_name = await getAuthorName;
      var circle_name = await getCircleName;
      var priceStr = await getPrice;
      var genre = await getGenre;
    } catch (err) {
      //bg.console.log(err);
    }

    // clear price info, add tax
    var price;
    if (priceStr !== "price_not_found") {
      price = parseInt(priceStr.match(/[0-9 , \.]+/g)[0].replace(",", ""));

      // Toranoana shows price before tax originally
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
