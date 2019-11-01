/* global chrome */


chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      // only enable extension under an item page 
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          // Toranoana all age
          // pageUrl: { urlContains: 'ec.toranoana.shop/tora/ec/item' }
          pageUrl: { hostContains: ".toranoana.shop", pathContains: "tora/ec/item" }         
        }),
        new chrome.declarativeContent.PageStateMatcher({
          // Toranoana R18
          // pageUrl: { urlContains: 'ec.toranoana.jp/tora_r/ec/item' }
          pageUrl: { hostContains: ".toranoana.jp", pathContains: "tora_r/ec/item" }          
        }),
        new chrome.declarativeContent.PageStateMatcher({
          // Melonbooks
          // pageUrl: { urlContains: "melonbooks.co.jp" }
          // pageUrl: { hostContains: "melonbooks.co.jp", pathContains: "detail/detail.php?product_id=" }
          pageUrl: { hostContains: ".melonbooks.co.jp", queryContains: "product_id=" }
        })
      ],
      actions: [ new chrome.declarativeContent.ShowPageAction() ]
    }]);
  });
});

