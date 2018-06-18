const taxRate = 1.08; // will increase to 1.1 on Oct, 2019
const bg = chrome.extension.getBackgroundPage();


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

  // get current tab
  chrome.tabs.query({ active: true }, async function (tabs) {    
    var tab = tabs[0];
    var queryStr;

    /*=========== create promises for different fields ===========*/
    var getTitle = new Promise(function (resolve, reject) {
      bg.console.log('getTitle');
      queryStr = 'document.querySelector("h1.mbpc-10.mbsp-10").textContent';
      chrome.tabs.executeScript(
        tab.id, { code: queryStr },
        function (results) {
          if (results[0] == null) {
            reject('Didn\'t find title');
          } else {
            resolve(results[0]);
          }
        });
    });

    var getAuthorName = new Promise(function (resolve) {
      bg.console.log('getAuthorName');
      queryStr = 'document.querySelector("div.sub-name span.sub-p").textContent';
      chrome.tabs.executeScript(
        tab.id, { code: queryStr },
        function (results) {
          if (results[0] == null) {
            reject('Didn\'t find author name');
          } else {
            resolve(results[0]);
          }
        });
    });

    var getCircleName = new Promise(function (resolve) {
      bg.console.log('getCircleName');
      queryStr = 'document.querySelector("div.sub-circle span.sub-p").textContent';
      chrome.tabs.executeScript(
        tab.id, { code: queryStr },
        function (results) {
          if (results[0] == null) {
            reject('Didn\'t find circle name');
          } else {
            resolve(results[0]);
          }
        });
    });

    var getPrice = new Promise(function (resolve) {
      bg.console.log('getPrice');
      queryStr = 'document.querySelector("div.price div.normal").textContent';
      chrome.tabs.executeScript(
        tab.id, { code: queryStr },
        function (results) {
          if (results[0] == null) {
            reject('Didn\'t find price');
          } else {
            resolve(results[0]);
          }
        });
    });

    var getGenre = new Promise(function (resolve) {
      bg.console.log('getGenre');
      queryStr = 'document.querySelectorAll("table.detail4-spec span.infoorder-p")[1].textContent';
      chrome.tabs.executeScript(
        tab.id, { code: queryStr },
        function (results) {          
          if (results[0] == null) {
            reject('Didn\'t find genre');
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
    var price = Math.round(parseInt(priceStr.match(/[0-9 , \.]+/g)[0].replace(",", "")) * taxRate);

    // create copied string and pass to copy func
    var copyStr = book_title + '\t' + circle_name + '\t' + price + '\t' + genre + '\t' + tab.url;
    copyToClipboard(copyStr);

    // close popup
    window.close();

  });

};
