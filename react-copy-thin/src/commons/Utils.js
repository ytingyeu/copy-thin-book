/* global chrome */
export function getCurrentTab(callback) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    },
        (tabs) => {
            callback(tabs[0]);
        });
}


export function copyToClipboard(str) {
    //bg.console.log('copyToClipboard');
    //bg.console.log(str);

    // create a new element and append it to DOM
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);

    // select and execute copy
    el.select();
    document.execCommand('copy');

    // remove useless element
    document.body.removeChild(el);
}


