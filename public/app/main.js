function addLess (href) {
  var link =  document.createElement("link");
      link.type = "text/css";
      link.rel  = "stylesheet/less";
      link.href = href;

  document.getElementsByTagName("head")[0].appendChild(link);

  less.relativeUrls=true;
  less.sheets.push(link);
  less.refresh();
}

addLess('/css/less/main.less');
var init = 'init';

require([init], function () {

});

