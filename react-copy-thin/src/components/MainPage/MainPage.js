/* global chrome */
import React from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";
import { getCurrentTab } from "commons/Utils";

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

  render() {
    return (
      <div>
        <MDBBtn gradient="blue" >
          <MDBIcon icon="copy" size="5x" />
        </MDBBtn>
      </div>);
  }

}

export default MainPage;
