/* global chrome */

// TODO: Inspect View always turns to inactive after the extension is closed.
// and cannot be open again until reload
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // only enable extension under an item page
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            // Toranoana all age
            pageUrl: {
              hostContains: "ecs.toranoana.jp",
              pathContains: "tora/ec/item",
            },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            // Toranoana R18
            pageUrl: {
              hostContains: "ec.toranoana.jp",
              pathContains: "tora_r/ec/item",
            },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            // Melonbooks
            pageUrl: {
              hostContains: ".melonbooks.co.jp",
              queryContains: "product_id=",
            },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowAction()],
      },
    ]);
  });
});

chrome.runtime.onMessage.addListener((message) => {
  console.log(message);
});
