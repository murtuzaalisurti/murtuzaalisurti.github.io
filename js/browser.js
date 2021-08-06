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

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

if (navigator.appVersion.indexOf("Mac")!=-1 || isSafari || isChrome){
    console.log(navigator.appVersion.indexOf("Mac")!=-1);
    let new_script = document.createElement("script");
    new_script.setAttribute("src", "./obfus_none/main1.js");
    document.body.appendChild(new_script);

    let original_script = document.querySelector(".old");
    document.body.removeChild(original_script);
};

// if(isFirefox || isIE){
//     // document.querySelector("main").style = `display: none;`;
//     // document.querySelector(".header-contain").style = `display: none;`;
//     // document.querySelector(".temporary-blocking").style = `display: flex;`;
// }