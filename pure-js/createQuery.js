
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
        queryStrTitle = "document.querySelector(\"meta[property='og:title']\").getAttribute(\"content\");";
        queryStrAuthor = "document.querySelector(\"div.sub-name span.sub-p\").innerText;";
        queryStrCircle = "document.querySelector(\"div.sub-circle span.sub-p \").innerText;";
        queryStrPrice = "document.querySelectorAll(\"li.pricearea__price.pricearea__price--normal\")[0].innerText;";
        queryStrGenre = "document.querySelectorAll(\"table.detail4-spec span.infoorder-p span:not(.ico-tim)\")[1].innerText;";
        //queryStrDate = "document.querySelectorAll(\"table.detail4-spec span.infoorder-p a\")[0].innerText;";
        break;
  
  
      case "melonbooks":
        queryStrTitle = "document.querySelectorAll(\"table.stripe tr.odd td\")[0].innerText;";
        queryStrAuthor = "document.querySelectorAll(\"table.stripe tr.odd td\")[2].innerText;";
        queryStrCircle = "document.querySelectorAll(\"table.stripe tr.odd td\")[1].innerText;";
        queryStrPrice = "document.querySelector(\"td.price.txt_left\").innerText";
        queryStrGenre = "document.querySelectorAll(\"table.stripe tr.odd td\")[3].innerText;";
        //queryStrDate = "document.querySelectorAll(\"table.stripe tr.odd td\")[4].innerText;";
        break;
    }
  
    var queryList = {
      "queryTitle": queryStrTitle,
      "queryAuthor": queryStrAuthor,
      "queryCircle": queryStrCircle,
      "queryPrice": queryStrPrice,
      "queryGenre": queryStrGenre
      //"queryDate": queryStrDate
    }
  
    return queryList;
  }