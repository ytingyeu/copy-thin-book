/* global chrome */
import React from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";

import MainPage from 'components/MainPage/MainPage';

import './App.css';

const bg = chrome.extension.getBackgroundPage();

class App extends React.Component {

  openOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }

    bg.console.log(chrome.runtime.openOptionsPage);
  }

  render() {
    return (
      <div className="app-container">
        <div className="toobar">
          <a><MDBIcon icon="cog" size="2x" onClick={() => this.openOptions()} className="icon-config" /></a>
        </div>
        <div className="page-container">
          <MainPage />
        </div>
      </div>
    );
  }
}

export default App;
