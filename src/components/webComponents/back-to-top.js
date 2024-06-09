(()=>{
    var J = s=>{
        throw TypeError(s)
    }
    ;
    var Z = (s,o,e)=>o.has(s) || J("Cannot " + e);
    var m = (s,o,e)=>(Z(s, o, "read from private field"),
    e ? e.call(s) : o.get(s))
      , B = (s,o,e)=>o.has(s) ? J("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(s) : o.set(s, e);
    (function() {
        function s() {
            return j.Date.now()
        }
        function o() {}
        function e(t, n, l) {
            function p(i) {
                var h = T
                  , N = C;
                return T = C = a,
                k = i,
                S = t.apply(N, h)
            }
            function d(i) {
                var h = i - f;
                return i -= k,
                f === a || h >= n || 0 > h || E && i >= L
            }
            function v() {
                var i = s();
                if (d(i))
                    return A(i);
                var h, N = setTimeout;
                h = i - k,
                i = n - (i - f),
                h = E ? X(i, L - h) : i,
                u = N(v, h)
            }
            function A(i) {
                return u = a,
                M && T ? p(i) : (T = C = a,
                S)
            }
            function R() {
                var i = s()
                  , h = d(i);
                if (T = arguments,
                C = this,
                f = i,
                h) {
                    if (u === a)
                        return k = i = f,
                        u = setTimeout(v, n),
                        H ? p(i) : S;
                    if (E)
                        return u = setTimeout(v, n),
                        p(f)
                }
                return u === a && (u = setTimeout(v, n)),
                S
            }
            var T, C, L, S, u, f, k = 0, H = !1, E = !1, M = !0;
            if (typeof t != "function")
                throw new TypeError("Expected a function");
            return n = c(n) || 0,
            r(l) && (H = !!l.leading,
            L = (E = "maxWait"in l) ? Q(c(l.maxWait) || 0, n) : L,
            M = "trailing"in l ? !!l.trailing : M),
            R.cancel = function() {
                u !== a && clearTimeout(u),
                k = 0,
                T = f = C = u = a
            }
            ,
            R.flush = function() {
                return u === a ? S : A(s())
            }
            ,
            R
        }
        function r(t) {
            var n = typeof t;
            return t != null && (n == "object" || n == "function")
        }
        function y(t) {
            return t != null && typeof t == "object"
        }
        function P(t) {
            var n;
            if (!(n = typeof t == "symbol") && (n = y(t))) {
                if (t == null)
                    t = t === a ? "[object Undefined]" : "[object Null]";
                else if (b && b in Object(t)) {
                    n = U.call(t, b);
                    var l = t[b];
                    try {
                        t[b] = a;
                        var p = !0
                    } catch {}
                    var d = q.call(t);
                    p && (n ? t[b] = l : delete t[b]),
                    t = d
                } else
                    t = q.call(t);
                n = t == "[object Symbol]"
            }
            return n
        }
        function c(t) {
            if (typeof t == "number")
                return t;
            if (P(t))
                return D;
            if (r(t) && (t = typeof t.valueOf == "function" ? t.valueOf() : t,
            t = r(t) ? t + "" : t),
            typeof t != "string")
                return t === 0 ? t : +t;
            t = t.replace(W, "");
            var n = K.test(t);
            return n || Y.test(t) ? z(t.slice(2), n ? 2 : 8) : G.test(t) ? D : +t
        }
        var a, D = NaN, W = /^\s+|\s+$/g, G = /^[-+]0x[0-9a-f]+$/i, K = /^0b[01]+$/i, Y = /^0o[0-7]+$/i, z = parseInt, F = typeof self == "object" && self && self.Object === Object && self, j = typeof global == "object" && global && global.Object === Object && global || F || Function("return this")(), I = (F = typeof exports == "object" && exports && !exports.nodeType && exports) && typeof module == "object" && module && !module.nodeType && module, x = Object.prototype, U = x.hasOwnProperty, q = x.toString, b = (x = j.Symbol) ? x.toStringTag : a, Q = Math.max, X = Math.min;
        o.debounce = e,
        o.throttle = function(t, n, l) {
            var p = !0
              , d = !0;
            if (typeof t != "function")
                throw new TypeError("Expected a function");
            return r(l) && (p = "leading"in l ? !!l.leading : p,
            d = "trailing"in l ? !!l.trailing : d),
            e(t, n, {
                leading: p,
                maxWait: n,
                trailing: d
            })
        }
        ,
        o.isObject = r,
        o.isObjectLike = y,
        o.isSymbol = P,
        o.now = s,
        o.toNumber = c,
        o.VERSION = "4.17.5",
        typeof define == "function" && typeof define.amd == "object" && define.amd ? (j._ = o,
        define(function() {
            return o
        })) : I ? ((I.exports = o)._ = o,
        F._ = o) : j._ = o
    }
    ).call(void 0);
    console.log(_.throttle);
    var w, g, O, $ = class $ extends HTMLElement {
        constructor() {
            super();
            B(this, w, {
                position: "fixed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            });
            B(this, g, this.getCSSFromJSDeclaration({
                ...m(this, w),
                opacity: 0,
                visibility: "hidden"
            }));
            B(this, O, this.getCSSFromJSDeclaration({
                ...m(this, w),
                opacity: 1,
                visibility: "visible"
            }));
            this.currentScrollPos = 0,
            this.throttleRate = 400,
            this.buttonContent = `
            <template>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
            </template>
        `
        }
        static get observedAttributes() {
            return ["throttle"]
        }
        static register(e) {
            "customElements"in window && customElements.define(e || "back-to-top", $)
        }
        getCSSFromJSDeclaration(e) {
            return Object.keys(e).map(r=>`${r.split("").some(c=>c.toLowerCase() !== c) ? r.split("").splice(r.split("").findIndex(c=>c.toLowerCase() !== c)).join("").toLowerCase().concat("-").concat(r.split("").splice(0, r.split("").findIndex(c=>c.toLowerCase() !== c)).join("").toLowerCase()).split("-").reverse().join("-") : r}: ${e[r]}`).join(";").concat(";")
        }
        get svg() {
            return this.backToTopButton.querySelector("svg")
        }
        get getThrottleRate() {
            return this.throttleRate
        }
        set setThrottleRate(e) {
            this.throttleRate = Number(e)
        }
        get getButtonContent() {
            return this.buttonContent
        }
        set setButtonContent(e) {
            this.buttonContent = e
        }
        backToTopChildElement(e) {
            return this.querySelector(e)
        }
        get backToTopLink() {
            return this.backToTopChildElement(".back-to-top-fallback") ?? this.backToTopChildElement("a")
        }
        get backToTopButton() {
            return this.backToTopChildElement("button")
        }
        parseHTMLFromString(e) {
            return new DOMParser().parseFromString(e, "text/html")
        }
        templateContent(e) {
            return e.querySelector("template")?.content.cloneNode(!0)
        }
        getComputedStyles(e) {
            return window.getComputedStyle(e, null)
        }
        handleClick() {
            document.body.scrollTop = document.documentElement.scrollTop = 0
        }
        throttledFunction(e) {
            return _.throttle(()=>{
                let r = document.documentElement.scrollTop || window.scrollY || document.body.scrollTop;
                this.currentScrollPos <= r ? this.backToTopButton.style = m(this, g) : this.backToTopButton.style = m(this, O),
                this.currentScrollPos = r,
                this.currentScrollPos === 0 && (this.backToTopButton.style = m(this, g))
            }
            , e)
        }
        connectedCallback() {
            this.backToTopLink && this.backToTopLink.setAttribute("hidden", !0),
            this.backToTopLink && (this.backToTopLink.style.display = "none"),
            this.append(document.createElement("button")),
            this.backToTopButton.classList.add("back-to-top"),
            this.backToTopButton.style = m(this, g),
            this.backToTopButton.removeAttribute("hidden"),
            this.setButtonContent = this.templateContent(this.parseHTMLFromString(this.buttonContent));
            let e = this.templateContent(this);
            e && (this.setButtonContent = e),
            this.backToTopButton.append(this.buttonContent),
            this.currentScrollPos = document.documentElement.scrollTop || window.scrollY || document.body.scrollTop,
            this.handleThrottle = this.throttledFunction(this.getThrottleRate),
            window.addEventListener("scroll", this.handleThrottle),
            this.backToTopButton.addEventListener("click", this.handleClick),
            this.svg && this.getComputedStyles(this.svg).getPropertyValue("display") === "inline" && (this.svg.style.display = "block")
        }
        attributeChangedCallback(e, r, y) {
            e === "throttle" && (this.setThrottleRate = y) && (this.handleThrottle = this.throttledFunction(this.getThrottleRate))
        }
        disconnectedCallback() {
            window.removeEventListener("scroll", this.handleThrottle),
            this.backToTopButton.removeEventListener("click", this.handleClick)
        }
    }
    ;
    w = new WeakMap,
    g = new WeakMap,
    O = new WeakMap;
    var V = $;
    V.register();
}
)();
/**
 * @license
 * Lodash (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash include="throttle" -p`
 */
/**
 * @license
 * This component uses a custom loash build which includes only the 'throttle' module
 */
