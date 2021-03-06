/* global chrome */

const bg = chrome.extension.getBackgroundPage();

export function getCurrentTab(callback) {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        tabs => {
            callback(tabs[0]);
        }
    );
}

export function copyToClipboard(data) {
    bg.console.log("copyToClipboard");    

    chrome.storage.sync.get(["orderSetting"], options => {
                
        let { orderSetting } = options;
        let strBuilder = "";
        // bg.console.log(orderSetting);
        // bg.console.log(data);


        if(!orderSetting) {
            orderSetting = [...Array(data.length).keys()]
        }

        orderSetting.forEach((val, idx) => {
            
            strBuilder = strBuilder + data[val];

            if (idx !== orderSetting.length - 1) {
                strBuilder = strBuilder + "\t";
            }
        });

        // create a new element and append it to DOM
        const el = document.createElement("textarea");
        el.value = strBuilder;
        document.body.appendChild(el);

        // select and execute copy
        el.select();
        document.execCommand("copy");

        // remove useless element
        document.body.removeChild(el);
    });
}
