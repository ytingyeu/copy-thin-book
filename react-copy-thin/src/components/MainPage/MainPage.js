/* global chrome */
import React from 'react';

import {getCurrentTab} from "commons/Utils";

import logo from 'images/copy_thin_book128.png';

const bg = chrome.extension.getBackgroundPage();

class MainPage extends React.Component {

  componentDidMount() {
    getCurrentTab((tab) => {
      bg.console.log(tab);
    })
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          </a>
      </header>
    </div>);
  }

}

export default MainPage;