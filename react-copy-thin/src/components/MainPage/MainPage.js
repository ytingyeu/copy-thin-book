/* global chrome */
import React, { useEffect, useState } from "react";
import { MDBBtn, MDBIcon } from "mdbreact";
import { getCurrentTab, copyToClipboard } from "commons/Utils";
import { createQueryPromises } from "commons/QueryFuncs";

//const bg = chrome.extension.getBackgroundPage();

const taxRate = 1.1;

function MainPage() {
  const [shopName, setShopName] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [tab, setTab] = useState(null);

  useEffect(() => {
    getCurrentTab().then((tab) => {
      //bg.console.log(tab);

      setTab(tab);

      if (tab.url.includes("toranoana")) {
        setShopName("toranoana");
        setUrl(tab.url);
      } else if (tab.url.includes("melonbooks")) {
        setShopName("melonbooks");
        setUrl(tab.url);
      }
    });
  }, []);

  const clearInfo = (circleHtml, priceStr) => {
    let circleName, price;

    // clear circle info from Melonbooks
    if (shopName === "melonbooks") {
      if (circleHtml !== "price_not_found") {
        const regex = /(.*)(\&nbsp\;.*\:\d*\))/gm;
        let matches;

        while ((matches = regex.exec(circleHtml)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (matches.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          circleName = matches[1];
        }
      }
    } else {
      circleName = circleHtml;
    }

    // clear price info, add tax
    if (priceStr !== "price_not_found") {
      price = parseInt(priceStr.match(/[0-9 , \.]+/g)[0].replace(",", ""));

      // Toranoana shows price before tax
      if (shopName === "toranoana") {
        price = Math.round(price * taxRate);
      }
    } else {
      price = priceStr;
    }

    return [circleName, price];
  };

  const handleCopy = async () => {
    console.log("handleCopy()");

    let circleName;
    let price;
    //let queryList = createQueryStr(shopName);
    let promiseList = createQueryPromises(tab, shopName);

    try {
      const [bookTitle, authorName, circleHtml, priceStr, genre] =
        await Promise.all(promiseList);

      //[circleName, price] = clearInfo(circleHtml, priceStr);

      console.log([
          bookTitle,
          // authorName,
          // circleName,
          // price,
          // genre,
          // url,
      ]);

      copyToClipboard([bookTitle, authorName, circleName, price, genre, url]);

      setStatus("Success!");

      setTimeout(() => {
        setStatus("");
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <MDBBtn gradient="blue">
        <MDBIcon
          icon="copy"
          size="5x"
          onClick={() => {
            handleCopy();
          }}
        />
      </MDBBtn>
      <p id="status">{status}</p>
    </div>
  );
}

export default MainPage;
