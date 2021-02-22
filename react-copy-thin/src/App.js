/* global chrome */
import React from "react";
import { MDBBtn, MDBIcon } from "mdbreact";

import MainPage from "components/MainPage/MainPage";

import "./App.css";

const bg = chrome.extension.getBackgroundPage();

function App() {
    const openOptions = () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL("options.html"));
        }

        bg.console.log(chrome.runtime.openOptionsPage);
    };

    return (
        <div className="app-container">
            <div className="toobar">
                <a>
                    <MDBIcon
                        icon="cog"
                        size="2x"
                        onClick={openOptions}
                        className="icon-config"
                    />
                </a>
            </div>
            <div className="page-container">
                <MainPage />
            </div>
        </div>
    );
}

export default App;
