var active = false;

function buster(info) {
  if (info.url.indexOf("cachebuster") > 0) {
      var url = info.url;
      return { redirectUrl : url.replace(/([?|&]cachebuster=)(\d*)(&?)/gi, "$1"+Date.now()+"$3" ) };
  }
  if (info.url.match(/[\w]*:\/\/[\w.\/]*\?[\w=&]+/)) {
      return { redirectUrl: info.url + "&cachebuster=" + Date.now() };
  }
  return { redirectUrl: info.url + "?cachebuster=" + Date.now() };
}

chrome.browserAction.setIcon({path:"inactive.png"});

chrome.browserAction.onClicked.addListener(function(tab) {
    active = !active;
    if (active) {
        chrome.browserAction.setIcon({path:"active.png"});
        chrome.webRequest.onBeforeRequest.addListener(
        buster,
          // filters
          {
            urls: [
            "<all_urls>"
            ],
            types: [
            "main_frame"
            ]

          },
          // extraInfoSpec
          ["blocking"]);
    }else{
        chrome.browserAction.setIcon({path:"inactive.png"});
        chrome.webRequest.onBeforeRequest.removeListener(
          buster
        );
    }

});
