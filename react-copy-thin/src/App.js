/* global chrome */
import React from 'react';
import { MDBIcon } from "mdbreact";

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

      <div>
        <MDBIcon icon="cogs" onClick={() => this.pageSwitch()}/>
        {page}
      </div>
    );
  }

}

export default App;
