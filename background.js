// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      // only enable extension under an item page 
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          // Toranoana all age
          pageUrl: { urlContains: 'ec.toranoana.shop/tora/ec/item' }
        }),
        new chrome.declarativeContent.PageStateMatcher({
          // Toranoana R18
          pageUrl: { urlContains: 'ec.toranoana.jp/tora_r/ec/item' }
        }),
        new chrome.declarativeContent.PageStateMatcher({
          // Melonbooks
          pageUrl: { urlContains: 'www.melonbooks.co.jp/detail/detail.php?product_id=' }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});