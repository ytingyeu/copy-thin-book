$("#sortable").sortable({
    placeholder: 'drop-placeholder'
});

const defaultOrder = ["0","1","2","3","4","5"];

let defaultHtml = 
'<li class="list-group-item ui-sortable-handle" id="0">title</li>' +
'<li class="list-group-item ui-sortable-handle" id="1">author</li>' +
'<li class="list-group-item ui-sortable-handle" id="2">circle</li>' +
'<li class="list-group-item ui-sortable-handle" id="3">price</li>' +
'<li class="list-group-item ui-sortable-handle" id="4">genre</li>' +
'<li class="list-group-item ui-sortable-handle" id="5">url</li>'

const numToName = {
    "0": "title",
    "1": "author",
    "2": "circle",
    "3": "price",
    "4": "genre",
    "5": "url"
}

const nameToNum = {
    "title": "0",
    "author": "1",
    "circle": "2",
    "price": "3",
    "genre": "4",
    "url": "5"
}

// Saves options to chrome.storage
function saveOptions() {
    // var color = document.getElementById('color').value;
    // var likesColor = document.getElementById('like').checked;

    let newOrder = $("#sortable").sortable("toArray");
    let temp = [];
    
    temp.push(nameToNum[document.getElementById(newOrder[0]).textContent]);
    temp.push(nameToNum[document.getElementById(newOrder[1]).textContent]);
    temp.push(nameToNum[document.getElementById(newOrder[2]).textContent]);
    temp.push(nameToNum[document.getElementById(newOrder[3]).textContent]);
    temp.push(nameToNum[document.getElementById(newOrder[4]).textContent]);
    temp.push(nameToNum[document.getElementById(newOrder[5]).textContent]);
    console.log(temp)

    chrome.storage.sync.set({
        orderSetting: newOrder,
        // likesColor: likesColor
    }, function () {
        // Update status to let user know options were saved.
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 2000);
    });
}

function resetDefault() {
    // console.log($.parseHTML(defaultHtml))
    $("#sortable").html(defaultHtml).sortable("refresh");

}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        orderSetting: defaultOrder
    }, function (items) {
        console.log(items.orderSetting);
        document.getElementById("0").textContent = numToName[items.orderSetting[0]];
        document.getElementById("1").textContent = numToName[items.orderSetting[1]];
        document.getElementById("2").textContent = numToName[items.orderSetting[2]];
        document.getElementById("3").textContent = numToName[items.orderSetting[3]];
        document.getElementById("4").textContent = numToName[items.orderSetting[4]];
        document.getElementById("5").textContent = numToName[items.orderSetting[5]];
    });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('reset').addEventListener('click', resetDefault);
