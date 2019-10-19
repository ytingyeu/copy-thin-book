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
      shopName: "",
      tab: null,
      status: ""
    }
  }

  componentDidMount() {
    getCurrentTab((tab) => {
      bg.console.log(tab);

      this.setState({tab: tab});

      if (tab.url.includes("toranoana")) {
        this.setState({ shopName: "toranoana" });
      } else {
        this.setState({ shopName: "melonbooks" });
      }
    })
  }

  handleCopy = async () => {

    bg.console.log("handleCopy()");

    let queryList = createQueryStr(this.state.shopName);
    let promiseList = createQueryPromises(this.state.tab, queryList);

    try {

      const [bookTitle, authorName, circleName, priceStr, genre] = await Promise.all(promiseList);
      // let book_title = await promiseList.getTitle;
      // let author_name = await promiseList.getAuthorName
      // let circle_name = await promiseList.getCircleName;
      // let priceStr = await promiseList.getPrice;
      // let genre = await promiseList.getGenre;

      bg.console.log([bookTitle, authorName, circleName, priceStr, genre]);

      this.setState({status: "Success!"})

      setTimeout(() => {
        this.setState({ status: "" });
      }, 2000);

    }
    catch(err) {
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
