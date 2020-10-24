var active = false;

function buster(info) {
  if (info.requestId == localStorage.cacheBustertHandled) {
    return
  }  
  
  if (info.url.indexOf("cachebuster") > 0) {
      var url = info.url;
      localStorage.cacheBustertHandled = info.requestId
      return { redirectUrl : url.replace(/([?|&]cachebuster=)(\d*)(&?)/gi, "$1"+Date.now()+"$3" ) };
  }
  if (info.url.match(/[\w]*:\/\/[\w.\/]*\?[\w=&]+/)) {
      localStorage.cacheBustertHandled = info.requestId
      return { redirectUrl: info.url + "&cachebuster=" + Date.now() };
  }
  localStorage.cacheBustertHandled = info.requestId
  return { redirectUrl: info.url + "?cachebuster=" + Date.now() };
}

chrome.browserAction.setIcon({path:"inactive.png"});
if (!localStorage.cacheBuster) {
  localStorage.cacheBuster = JSON.stringify({
    'css': false,
    'js': false
  })
}

chrome.browserAction.onClicked.addListener((tab) => {
    active = !active;
    if (active) {
        chrome.browserAction.setIcon({path:"active.png"});
        var types = ["main_frame"];
        
        var cacheBuster = JSON.parse(localStorage.cacheBuster);
        if (cacheBuster.css) {
            types.push("stylesheet");
        }
        if (cacheBuster.js) {
            types.push("script");
        }
        chrome.webRequest.onBeforeRequest.addListener(
          buster,
          // filters
          {
            urls: [
            "<all_urls>"
            ],
            types: types
          },
          // extraInfoSpec
          ["blocking"]
        );
    }else{
        chrome.browserAction.setIcon({path:"inactive.png"});
        chrome.webRequest.onBeforeRequest.removeListener(
          buster
        );
    }

});
