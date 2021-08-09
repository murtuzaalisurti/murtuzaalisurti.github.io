// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 71
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var IsOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

if (isIOSChrome) {
   // is Google Chrome on IOS
} else if(
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  IsOpera === false &&
  isIEedge === false
) {
   // is Google Chrome
} else { 
   // not Google Chrome 
}

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

if(isSafari || isFirefox){
    var unobfus_script = document.createElement("script");
    unobfus_script.src = "./js/main1.js";
    document.body.appendChild(unobfus_script);
} else{
    var obfus_script = document.createElement("script");
    obfus_script.src = "./js/main.js";
    document.body.appendChild(obfus_script);
}
// if(isFirefox || isIE){
//     // document.querySelector("main").style = `display: none;`;
//     // document.querySelector(".header-contain").style = `display: none;`;
//     // document.querySelector(".temporary-blocking").style = `display: flex;`;
// }