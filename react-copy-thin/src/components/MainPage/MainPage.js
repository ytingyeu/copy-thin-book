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

function MainPage() {
  const [shopName, setShopName] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [tab, setTab] = useState(null);

  useEffect(() => {
    getCurrentTab().then((tab) => {
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

  const handleCopy = async () => {
    let promiseList = createQueryPromises(tab, shopName);

    try {
      const [bookTitle, authorName, circle, dirtyPrice, genre] =
        await Promise.all(promiseList);

      const price = await clearPriceInfo(dirtyPrice, shopName);

      // console.log([bookTitle, authorName, circle, price, genre, url]);

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
