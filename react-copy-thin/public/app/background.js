/* global chrome */


chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      // only enable extension under an item page 
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          // Toranoana all age
          pageUrl: { hostContains: "ec.toranoana.shop", pathContains: "tora/ec/item" }
        }),
        new chrome.declarativeContent.PageStateMatcher({
          // Toranoana R18
          pageUrl: { hostContains: "ec.toranoana.jp", pathContains: "tora_r/ec/item" }
        }),
        new chrome.declarativeContent.PageStateMatcher({
          // Melonbooks
          pageUrl: { hostContains: "melonbooks.co.jp", pathContains: "detail/detail.php?product_id=" }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

