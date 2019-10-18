/* global chrome */
import React from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";

import MainPage from 'components/MainPage/MainPage';
import ConfigPage from 'components/ConfigPage/ConfigPage';

import './App.css';

const bg = chrome.extension.getBackgroundPage();

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "main"
    }
  }


  pageSwitch = () => {
    switch (this.state.page) {
      case "main":
        this.setState({ page: "config" })
        break;

      case "config":
        this.setState({ page: "main" })
        break;
    }
  }

  openOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }

    bg.console.log(chrome.runtime.openOptionsPage);
  }

  render() {

    let page = null;

    switch (this.state.page) {
      case "main":
        page = <MainPage />;
        break;

      case "config":
        page = <ConfigPage />;
        break;
    }


    return (

      <div className="app-container">
        <div className="toobar">
          {/* <MDBBtn size="sm" gradient="blue" onClick={() => this.openOptions()} className="btn-icon"> */}
            <a><MDBIcon icon="cog" size="2x" onClick={() => this.openOptions()} className="icon-config"/></a>
          {/* </MDBBtn> */}
        </div>
        <div className="page-container">
          {page}
        </div>
      </div>
    );
  }

}

export default App;
