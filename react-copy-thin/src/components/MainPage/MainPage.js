/* global chrome */
import React, { useEffect, useState } from "react";
import { MDBBtn, MDBIcon } from "mdbreact";
import {
  getCurrentTab,
  copyToClipboard,
  clearCircleInfo,
  clearPriceInfo,
} from "commons/Utils";
import { createQueryPromises } from "commons/QueryFuncs";
import { ShopName } from "commons/ConstantStrings";

function MainPage() {
  const [shopName, setShopName] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [tab, setTab] = useState(null);

  useEffect(() => {
    getCurrentTab().then((tab) => {
      setTab(tab);

      if (tab.url.includes(ShopName.toranoana)) {
        setShopName(ShopName.toranoana);
        setUrl(tab.url);
      } else if (tab.url.includes(ShopName.melonbooks)) {
        setShopName(ShopName.melonbooks);
        setUrl(tab.url);
      } else if (tab.url.includes(ShopName.dlsite)) {
        setShopName(ShopName.dlsite);
        setUrl(tab.url);
      }
    });
  }, []);

  const handleCopy = async () => {
    let promiseList = createQueryPromises(tab, shopName);

    try {
      const [bookTitle, authorName, dirtyCircle, dirtyPrice, genre] =
        await Promise.all(promiseList);

      const circle = clearCircleInfo(dirtyCircle, shopName);
      const price = await clearPriceInfo(dirtyPrice, shopName);

      console.log([bookTitle, authorName, circle, price, genre, url]);

      copyToClipboard([bookTitle, authorName, circle, price, genre, url]);

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
