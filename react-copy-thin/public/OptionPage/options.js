$("#sortable").sortable({
  placeholder: "drop-placeholder",
});

const defaultOrder = ["0", "1", "2", "3", "4", "5"];
const defaultTaxRate = 10;

const defaultHtml =
  '<li class="list-group-item ui-sortable-handle" id="a">title</li>' +
  '<li class="list-group-item ui-sortable-handle" id="b">author</li>' +
  '<li class="list-group-item ui-sortable-handle" id="c">circle</li>' +
  '<li class="list-group-item ui-sortable-handle" id="d">price</li>' +
  '<li class="list-group-item ui-sortable-handle" id="e">genre</li>' +
  '<li class="list-group-item ui-sortable-handle" id="f">url</li>';

const numToName = {
  0: "title",
  1: "author",
  2: "circle",
  3: "price",
  4: "genre",
  5: "url",
};

const nameToNum = {
  title: "0",
  author: "1",
  circle: "2",
  price: "3",
  genre: "4",
  url: "5",
};

// Saves options to chrome.storage
function saveOptions() {
  let newOrder = $("#sortable").sortable("toArray");
  let temp = [];

  temp.push(nameToNum[document.getElementById(newOrder[0]).textContent]);
  temp.push(nameToNum[document.getElementById(newOrder[1]).textContent]);
  temp.push(nameToNum[document.getElementById(newOrder[2]).textContent]);
  temp.push(nameToNum[document.getElementById(newOrder[3]).textContent]);
  temp.push(nameToNum[document.getElementById(newOrder[4]).textContent]);
  temp.push(nameToNum[document.getElementById(newOrder[5]).textContent]);
  // console.log(temp)

  const taxRate = Number(document.getElementById("tax-rate").value);

  chrome.storage.sync.set({ orderSetting: temp, taxRate: taxRate }, () => {
    // Update status to let user know options were saved.
    let status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function () {
      status.textContent = "";
    }, 2000);
  });
}

function resetDefault() {
  // console.log($.parseHTML(defaultHtml))
  $("#sortable").html(defaultHtml).sortable("refresh");
  document.getElementById("tax-rate").value = 10;
}

function restoreOptions() {
  chrome.storage.sync.get(
    { orderSetting: defaultOrder, taxRate: defaultTaxRate },
    (items) => {
      document.getElementById("a").textContent =
        numToName[items.orderSetting[0]];
      document.getElementById("b").textContent =
        numToName[items.orderSetting[1]];
      document.getElementById("c").textContent =
        numToName[items.orderSetting[2]];
      document.getElementById("d").textContent =
        numToName[items.orderSetting[3]];
      document.getElementById("e").textContent =
        numToName[items.orderSetting[4]];
      document.getElementById("f").textContent =
        numToName[items.orderSetting[5]];

      document.getElementById("tax-rate").value = items.taxRate;
    }
  );
}

const manifestData = chrome.runtime.getManifest();
document.getElementById("app-version").innerText = manifestData.version;

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
document.getElementById("reset").addEventListener("click", resetDefault);
