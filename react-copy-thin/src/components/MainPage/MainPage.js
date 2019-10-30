/* global chrome */
import React from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";
import { getCurrentTab, copyToClipboard } from "commons/Utils";
import { createQueryStr, createQueryPromises } from "commons/QueryFuncs";

const bg = chrome.extension.getBackgroundPage();
const taxRate = 1.1;

class MainPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shopName: "",
      url: "",
      status: ""      
    }
  }

  componentDidMount() {
    getCurrentTab((tab) => {
      bg.console.log(tab);

      this.setState({ tab: tab });

      if (tab.url.includes("toranoana")) {
        this.setState({ shopName: "toranoana" });
      } else {
        this.setState({ shopName: "melonbooks" });
      }
    })
  }

  handleCopy = async () => {

    bg.console.log("handleCopy()");

    let price;
    let queryList = createQueryStr(this.state.shopName);
    let promiseList = createQueryPromises(this.state.tab, queryList);

    try {

      const [bookTitle, authorName, circleName, priceStr, genre] = await Promise.all(promiseList);

     
      // clear price info, add tax
      if (priceStr !== "price_not_found") {
        price = parseInt(priceStr.match(/[0-9 , \.]+/g)[0].replace(",", ""));

        // Toranoana shows price before tax
        if (this.state.shopName === "toranoana") {
          price = Math.round(price * taxRate);
        }

      } else {
        price = priceStr;
      }

      // bg.console.log([bookTitle, authorName, circleName, price, genre]);
      copyToClipboard([bookTitle, authorName, circleName, price, genre, this.state.tab.url]);

      this.setState({ status: "Success!" })

      setTimeout(() => {
        this.setState({ status: "" });
      }, 2000);

    }
    catch (err) {
      bg.console.error(err);
    }
  }

  render() {
    return (
      <div>
        <MDBBtn gradient="blue" >
          <MDBIcon icon="copy" size="5x" onClick={() => { this.handleCopy() }} />
        </MDBBtn>
        <p id="status">{this.state.status}</p>
      </div>);
  }

}

export default MainPage;
