/* global chrome */
import React from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";
import { getCurrentTab, copyToClipboard } from "commons/Utils";
import { createQueryStr, createQueryPromises } from "commons/QueryFuncs";

const bg = chrome.extension.getBackgroundPage();

class MainPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shopName: null
    }
  }

  componentDidMount() {
    getCurrentTab((tab) => {
      bg.console.log(tab);

      if (tab.url.includes("toranoana")) {
        this.setState({ shopName: "tora" });
      } else {
        this.setState({ shopName: "melon" });
      }
    })
  }

  handleCopy = () => {
    let queryList = createQueryStr(this.state.shopName);
    let promiseList = createQueryPromises(queryList);

    try {

      const [bookTitle, authorName, circleName, priceStr, genre] = await Promise.all(promiseList);
      // let book_title = await promiseList.getTitle;
      // let author_name = await promiseList.getAuthorName
      // let circle_name = await promiseList.getCircleName;
      // let priceStr = await promiseList.getPrice;
      // let genre = await promiseList.getGenre;

      console.log([bookTitle, authorName, circleName, priceStr, genre]);

    }
    catch(err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div>
        <MDBBtn gradient="blue" >
          <MDBIcon icon="copy" size="5x" onClick={() => { this.handleCopy() }} />
        </MDBBtn>
      </div>);
  }

}

export default MainPage;
