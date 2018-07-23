
/* Create qurey string for different attributes and shop */
function createQueryStr(shopName) {

    //bg.console.log("createQueryStr");
  
    var queryStrTitle;
    var queryStrAuthor;
    var queryStrCircle;
    var queryStrPrice;
    var queryStrGenre;
  
    switch (shopName) {
      case "toranoana":
        queryStrTitle = "document.querySelector(\"meta[property='og:title']\").getAttribute(\"content\");"
        queryStrAuthor = "document.querySelector(\"div.sub-name span.sub-p\").innerText;";
        queryStrCircle = "document.querySelector(\"div.sub-circle span.sub-p\").innerText;";
        queryStrPrice = "document.querySelector(\"div.price div.normal\").innerText;";
        queryStrGenre = "document.querySelectorAll(\"table.detail4-spec span.infoorder-p\")[1].innerText;";
        break;
  
  
      case "melonbooks":
        queryStrTitle = "document.querySelectorAll(\"table.stripe tr.odd td\")[0].innerText;"
        queryStrAuthor = "document.querySelectorAll(\"table.stripe tr.odd td\")[2].innerText;"
        queryStrCircle = "document.querySelectorAll(\"table.stripe tr.odd td\")[1].innerText;"
        queryStrPrice = "document.querySelector(\"td.price.txt_left\").innerText";
        queryStrGenre = "document.querySelectorAll(\"table.stripe tr.odd td\")[3].innerText;"
        break;
    }
  
    var queryList = {
      "queryTitle": queryStrTitle,
      "queryAuthor": queryStrAuthor,
      "queryCircle": queryStrCircle,
      "queryPrice": queryStrPrice,
      "queryGenre": queryStrGenre
    }
  
    return queryList;
  }