/* global chrome */
import React from 'react';
import { MDBBtn } from "mdbreact";

import MainPage from 'components/MainPage/MainPage';
import ConfigPage from 'components/MainPage/MainPage';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: "main"
    }
  }


  getConfigPage = () => {
    return (
      <div>
        <h1>config</h1>
      </div>
    );
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

    console.log("here");
    return (
      
      <div>
        <MDBBtn color="primary" onClick={() => this.setState({page: "config"})}>Primary</MDBBtn>
        {page}
      </div>
    );
  }

}

export default App;
