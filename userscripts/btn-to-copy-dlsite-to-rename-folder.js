// ==UserScript==
// @name         btn-to-copy-dlsite-to-rename-folder
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Copy DLsite info to rename a folder
// @author       You
// @match        https://www.dlsite.com/maniax/work/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dlsite.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const queryDliste = () => {
    const title = document.querySelector("#work_name").innerText;
    const circle = document.querySelector(".maker_name a").innerText;
    const rawDate = document.querySelectorAll("#work_outline a")[0].innerText;

    const dateRegex = /(\d+)/gm;
    const date = rawDate.match(dateRegex).join("");

    const outputString = `[${circle}][${date}]${title}`;

    //console.log(outputString);
    copyToClipboard(outputString);
  };

  const copyToClipboard = (outputString) => {
    // create a new element and append it to DOM
    const copyDummyEl = document.createElement("textarea");
    copyDummyEl.value = outputString;

    // select and copy to clipboard
    copyDummyEl.select();
    navigator.clipboard.writeText(copyDummyEl.value);

    // remove useless element
    copyDummyEl.remove();
  };

  const titleEle = document.getElementById("work_name");

  const copyButton = document.createElement("button");
  copyButton.innerText = "Get info to rename folder";
  copyButton.onclick = queryDliste;

  titleEle.insertAdjacentElement("afterend", copyButton);
})();
