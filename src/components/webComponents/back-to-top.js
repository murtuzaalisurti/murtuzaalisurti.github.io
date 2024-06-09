(() => {
    var __typeError = (msg) => {
      throw TypeError(msg);
    };
    var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
    var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
    var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  
    // modularize/isObject.js
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    var isObject_default = isObject;
  
    // modularize/_freeGlobal.js
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeGlobal_default = freeGlobal;
  
    // modularize/_root.js
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal_default || freeSelf || Function("return this")();
    var root_default = root;
  
    // modularize/now.js
    var now = function() {
      return root_default.Date.now();
    };
    var now_default = now;
  
    // modularize/_Symbol.js
    var Symbol2 = root_default.Symbol;
    var Symbol_default = Symbol2;
  
    // modularize/_getRawTag.js
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    var getRawTag_default = getRawTag;
  
    // modularize/_objectToString.js
    var objectProto2 = Object.prototype;
    var nativeObjectToString2 = objectProto2.toString;
    function objectToString(value) {
      return nativeObjectToString2.call(value);
    }
    var objectToString_default = objectToString;
  
    // modularize/_baseGetTag.js
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
    }
    var baseGetTag_default = baseGetTag;
  
    // modularize/isObjectLike.js
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    var isObjectLike_default = isObjectLike;
  
    // modularize/isSymbol.js
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
    }
    var isSymbol_default = isSymbol;
  
    // modularize/toNumber.js
    var NAN = 0 / 0;
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol_default(value)) {
        return NAN;
      }
      if (isObject_default(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject_default(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    var toNumber_default = toNumber;
  
    // modularize/debounce.js
    var FUNC_ERROR_TEXT = "Expected a function";
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    function debounce(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber_default(wait) || 0;
      if (isObject_default(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber_default(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now_default();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now_default());
      }
      function debounced() {
        var time = now_default(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    var debounce_default = debounce;
  
    // modularize/throttle.js
    var FUNC_ERROR_TEXT2 = "Expected a function";
    function throttle(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT2);
      }
      if (isObject_default(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce_default(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
      });
    }
    var throttle_default = throttle;
  
    // main.js
    console.log(throttle_default);
    var _defaultStyles, _hidden, _show;
    var _BackToTop = class _BackToTop extends HTMLElement {
      constructor() {
        super();
        __privateAdd(this, _defaultStyles, {
          position: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        });
        __privateAdd(this, _hidden, this.getCSSFromJSDeclaration({
          ...__privateGet(this, _defaultStyles),
          opacity: 0,
          visibility: "hidden"
        }));
        __privateAdd(this, _show, this.getCSSFromJSDeclaration({
          ...__privateGet(this, _defaultStyles),
          opacity: 1,
          visibility: "visible"
        }));
        this.currentScrollPos = 0;
        this.throttleRate = 400;
        this.buttonContent = `
              <template>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
              </template>
          `;
      }
      static get observedAttributes() {
        return ["throttle"];
      }
      static register(tagName) {
        if ("customElements" in window) {
          customElements.define(tagName || "back-to-top", _BackToTop);
        }
      }
      /**
       * @explain
       * Converting camelCase CSS properties defined in JS objects to kebab case
       * and returning the CSS block
       */
      getCSSFromJSDeclaration(obj) {
        return Object.keys(obj).map((key) => {
          const camelCaseProperty = key.split("").some((letter) => letter.toLowerCase() !== letter);
          const parsedKey = camelCaseProperty ? key.split("").splice(
            key.split("").findIndex((letter) => letter.toLowerCase() !== letter)
          ).join("").toLowerCase().concat("-").concat(
            key.split("").splice(
              0,
              key.split("").findIndex((letter) => letter.toLowerCase() !== letter)
            ).join("").toLowerCase()
          ).split("-").reverse().join("-") : key;
          return `${parsedKey}: ${obj[key]}`;
        }).join(";").concat(";");
      }
      get svg() {
        return this.backToTopButton.querySelector("svg");
      }
      get getThrottleRate() {
        return this.throttleRate;
      }
      set setThrottleRate(value) {
        this.throttleRate = Number(value);
      }
      get getButtonContent() {
        return this.buttonContent;
      }
      set setButtonContent(value) {
        this.buttonContent = value;
      }
      backToTopChildElement(selector) {
        return this.querySelector(selector);
      }
      get backToTopLink() {
        return this.backToTopChildElement(".back-to-top-fallback") ?? this.backToTopChildElement("a");
      }
      get backToTopButton() {
        return this.backToTopChildElement("button");
      }
      parseHTMLFromString(htmlAsString) {
        return new DOMParser().parseFromString(htmlAsString, "text/html");
      }
      templateContent(element) {
        return element.querySelector("template")?.content.cloneNode(true);
      }
      getComputedStyles(e) {
        return window.getComputedStyle(e, null);
      }
      handleClick() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
      throttledFunction(rate) {
        return throttle_default(() => {
          let prevScrollPos = document.documentElement.scrollTop || window.scrollY || document.body.scrollTop;
          this.currentScrollPos <= prevScrollPos ? this.backToTopButton.style = __privateGet(this, _hidden) : this.backToTopButton.style = __privateGet(this, _show);
          this.currentScrollPos = prevScrollPos;
          this.currentScrollPos === 0 && (this.backToTopButton.style = __privateGet(this, _hidden));
        }, rate);
      }
      connectedCallback() {
        this.backToTopLink && this.backToTopLink.setAttribute("hidden", true);
        this.backToTopLink && (this.backToTopLink.style.display = "none");
        this.append(document.createElement("button"));
        this.backToTopButton.classList.add("back-to-top");
        this.backToTopButton.style = __privateGet(this, _hidden);
        this.backToTopButton.removeAttribute("hidden");
        this.setButtonContent = this.templateContent(this.parseHTMLFromString(this.buttonContent));
        const buttonContent = this.templateContent(this);
        if (buttonContent) this.setButtonContent = buttonContent;
        this.backToTopButton.append(this.buttonContent);
        this.currentScrollPos = document.documentElement.scrollTop || window.scrollY || document.body.scrollTop;
        this.handleThrottle = this.throttledFunction(this.getThrottleRate);
        window.addEventListener("scroll", this.handleThrottle);
        this.backToTopButton.addEventListener("click", this.handleClick);
        if (this.svg) {
          const currentSVGStyles = this.getComputedStyles(this.svg);
          if (currentSVGStyles.getPropertyValue("display") === "inline") {
            this.svg.style.display = "block";
          }
        }
      }
      // observing the "throttle" attribute
      attributeChangedCallback(name, oldVal, newVal) {
        name === "throttle" && (this.setThrottleRate = newVal) && (this.handleThrottle = this.throttledFunction(this.getThrottleRate));
      }
      // when the component is removed from the document, removing the listeners
      disconnectedCallback() {
        window.removeEventListener("scroll", this.handleThrottle);
        this.backToTopButton.removeEventListener("click", this.handleClick);
      }
    };
    _defaultStyles = new WeakMap();
    _hidden = new WeakMap();
    _show = new WeakMap();
    var BackToTop = _BackToTop;
    BackToTop.register();
  })();
  /**
   * @license
   * This component uses a custom loash build which includes only the 'throttle' module
   */
  