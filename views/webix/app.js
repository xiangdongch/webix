(function(System, SystemJS) {
        "bundle";
        System.registerDynamic("libs/webix-jet/routie/lib/routie.js", [], !1, function(a, b, c) {
                var d = System.get("@@global-helpers").prepareGlobal(c.id, null , null );
                return function(a) {
                    !function(a) {
                        var b = []
                            , c = {}
                            , d = "routie"
                            , e = a[d]
                            , f = function(a, b) {
                                this.name = b,
                                    this.path = a,
                                    this.keys = [],
                                    this.fns = [],
                                    this.params = {},
                                    this.regex = g(this.path, this.keys, !1, !1)
                            }
                        ;
                        f.prototype.addHandler = function(a) {
                            this.fns.push(a)
                        }
                            ,
                            f.prototype.removeHandler = function(a) {
                                for (var b = 0, c = this.fns.length; b < c; b++) {
                                    var d = this.fns[b];
                                    if (a == d)
                                        return void this.fns.splice(b, 1)
                                }
                            }
                            ,
                            f.prototype.run = function(a) {
                                for (var b = 0, c = this.fns.length; b < c; b++)
                                    this.fns[b].apply(this, a)
                            }
                            ,
                            f.prototype.match = function(a, b) {
                                var c = this.regex.exec(a);
                                if (!c)
                                    return !1;
                                for (var d = 1, e = c.length; d < e; ++d) {
                                    var f = this.keys[d - 1]
                                        , g = "string" == typeof c[d] ? decodeURIComponent(c[d]) : c[d];
                                    f && (this.params[f.name] = g),
                                        b.push(g)
                                }
                                return !0
                            }
                            ,
                            f.prototype.toURL = function(a) {
                                var b = this.path;
                                for (var c in a)
                                    b = b.replace("/:" + c, "/" + a[c]);
                                if (b = b.replace(/\/:.*\?/g, "/").replace(/\?/g, ""),
                                    b.indexOf(":") != -1)
                                    throw new Error("missing parameters for url: " + b);
                                return b
                            }
                        ;
                        var g = function(a, b, c, d) {
                                return a instanceof RegExp ? a : (a instanceof Array && (a = "(" + a.join("|") + ")"),
                                    a = a.concat(d ? "" : "/?").replace(/\/\(/g, "(?:/").replace(/\+/g, "__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(a, c, d, e, f, g) {
                                            return b.push({
                                                name: e,
                                                optional: !!g
                                            }),
                                                c = c || "",
                                            "" + (g ? "" : c) + "(?:" + (g ? c : "") + (d || "") + (f || d && "([^/.]+?)" || "([^/]+?)") + ")" + (g || "")
                                        }
                                    ).replace(/([\/.])/g, "\\$1").replace(/__plus__/g, "(.+)").replace(/\*/g, "(.*)"),
                                    new RegExp("^" + a + "$",c ? "" : "i"))
                            }
                            , h = function(a, d) {
                                var e = a.split(" ")
                                    , g = 2 == e.length ? e[0] : null ;
                                a = 2 == e.length ? e[1] : e[0],
                                c[a] || (c[a] = new f(a,g),
                                    b.push(c[a])),
                                    c[a].addHandler(d)
                            }
                            , i = function(a, b) {
                                if ("function" == typeof b)
                                    h(a, b),
                                        i.reload();
                                else if ("object" == typeof a) {
                                    for (var c in a)
                                        h(c, a[c]);
                                    i.reload()
                                } else
                                    "undefined" == typeof b && i.navigate(a)
                            }
                        ;
                        i.lookup = function(a, c) {
                            for (var d = 0, e = b.length; d < e; d++) {
                                var f = b[d];
                                if (f.name == a)
                                    return f.toURL(c)
                            }
                        }
                            ,
                            i.remove = function(a, b) {
                                var d = c[a];
                                d && d.removeHandler(b)
                            }
                            ,
                            i.removeAll = function() {
                                c = {},
                                    b = []
                            }
                            ,
                            i.navigate = function(a, b) {
                                b = b || {};
                                var c = b.silent || !1;
                                c && n(),
                                    setTimeout(function() {
                                            window.location.hash = a,
                                            c && setTimeout(function() {
                                                    m()
                                                }
                                                , 1)
                                        }
                                        , 1)
                            }
                            ,
                            i.noConflict = function() {
                                return a[d] = e,
                                    i
                            }
                        ;
                        var j = function() {
                                return window.location.hash.substring(1)
                            }
                            , k = function(a, b) {
                                var c = [];
                                return !!b.match(a, c) && (b.run(c),
                                    !0)
                            }
                            , l = i.reload = function() {
                                for (var a = j(), c = 0, d = b.length; c < d; c++) {
                                    var e = b[c];
                                    if (k(a, e))
                                        return
                                }
                            }
                            , m = function() {
                                a.addEventListener ? a.addEventListener("hashchange", l, !1) : a.attachEvent("onhashchange", l)
                            }
                            , n = function() {
                                a.removeEventListener ? a.removeEventListener("hashchange", l) : a.detachEvent("onhashchange", l)
                            }
                        ;
                        m(),
                            a[d] = i
                    }
                    (window)
                }
                (this),
                    d()
            }
        ),
            System.register("libs/webix-jet/jet-core/core.ts", ["../routie/lib/routie", "lodash"], function(a, b) {
                    "use strict";
                    function c(a, b) {
                        if (b == -1)
                            return j(this, a);
                        if (this._subs[a])
                            return j(this._subs[a], b);
                        var c = d(this)
                            , f = this.index;
                        if ("string" == typeof a) {
                            0 === a.indexOf("./") && (f++,
                                a = a.substr(2));
                            var g = h(a);
                            c.path = c.path.slice(0, f).concat(g)
                        } else
                            webix.extend(c.path[f].params, a, !0);
                        c.show(e(c.path), -1)
                    }
                    function d(a) {
                        for (; a; ) {
                            if (a.app)
                                return a;
                            a = a.parent
                        }
                        return x
                    }
                    function e(a) {
                        for (var b = [], c = x.config.layout ? 1 : 0; c < a.length; c++) {
                            b.push("/" + a[c].page);
                            var d = f(a[c].params);
                            d && b.push(":" + d)
                        }
                        return b.join("")
                    }
                    function f(a) {
                        var b = [];
                        for (var c in a)
                            b.length && b.push(":"),
                                b.push(c + "=" + a[c]);
                        return b.join("")
                    }
                    function g(a, b, d) {
                        if (m(v, a, b, d, this) !== !1) {
                            if (b.page != this.name) {
                                this.name = b.page,
                                    this.ui = r,
                                    this.on = n,
                                    this.show = c,
                                    this.module = a,
                                    p.call(this),
                                    this._init = [],
                                    this._destroy = [],
                                    this._windows = [],
                                    this._events = [],
                                    this._subs = {},
                                    this.$layout = !1;
                                var e = i(a, this);
                                e.$scope = this,
                                    s.call(this, e),
                                this.$layout && (this.$layout = {
                                    root: (this._ui.$$ || webix.$$)(this.name + ":subview"),
                                    sub: g,
                                    parent: this,
                                    index: this.index + 1
                                })
                            }
                            return m(u, a, b, d, this),
                                a.$onurlchange && a.$onurlchange.call(a, b.params, d, this) === !1 ? void 0 : this.$layout
                        }
                    }
                    function h(a) {
                        var b = a.split("/");
                        b[0] || (x.config.layout ? b[0] = x.config.layout : b.shift());
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c]
                                , e = {}
                                , f = d.indexOf(":");
                            if (f !== -1) {
                                var g = d.substr(f + 1).split(":")
                                    , h = g[0].indexOf("=") !== -1;
                                if (h)
                                    for (var i = 0; i < g.length; i++) {
                                        var j = g[i].split("=");
                                        e[j[0]] = j[1]
                                    }
                                else
                                    e = g
                            }
                            b[c] = {
                                page: f > -1 ? d.substr(0, f) : d,
                                params: e
                            }
                        }
                        return b
                    }
                    function i(a, b) {
                        if (a.$oninit && b._init.push(a.$oninit.bind(a)),
                            a.$ondestroy && b._destroy.push(a.$ondestroy.bind(a)),
                                a.$onevent)
                            for (var c in a.$onevent)
                                b._events.push(c, a.$onevent[c].bind(a));
                        if (a.$windows && b._windows.push.apply(b._windows, a.$windows),
                                a.$subview)
                            if ("string" == typeof a.$subview) {
                                var d = b.name + ":subview:" + a.$subview;
                                b._subs[a.$subview] = {
                                    parent: this,
                                    root: d,
                                    sub: g,
                                    index: 0,
                                    app: !0
                                };
                                a.id = d
                            } else
                                a = {
                                    id: b.name + ":subview"
                                },
                                    b.$layout = !0;
                        var e = a.$ui;
                        if (e && (a = "function" == typeof e ? a.$ui() : e),
                                a.$init)
                            return a;
                        var f = webix.isArray(a) ? [] : {};
                        return t.forEach(a, function(a, c) {
                                !t.isObject(a) || webix.isDate(a) || t.isFunction(a) || a instanceof RegExp ? f[c] = a : f[c] = i(a, b)
                            }
                        ),
                            f
                    }
                    function j(a, b) {
                        a.root && (a.root = webix.$$(a.root));
                        var c = h(b);
                        a.path = [].concat(c),
                            k(a, c)
                    }
                    function k(a, b) {
                        var c = b[0];
                        if (c) {
                            var d = c.page
                                , e = 0 === d.indexOf(".");
                            if (e && (d = (a.fullname || "") + d),
                                    d = d.replace(/\./g, "/"),
                                m(w, d, c, b, a) === !1)
                                return;
                            var f = function(d) {
                                "function" == typeof d && (d = d()),
                                    b.shift();
                                var f = a.sub(d, c, b);
                                f ? (f.fullname = (e ? a.fullname || "" : "") + c.page,
                                    k(f, b)) : (webix.ui.$freeze = !1,
                                    webix.ui.resize())
                            }
                                , g = "views/" + d;
                            x.trigger("webixjet:core:ui:beforeLoad"),
                                System.import(g).then(function(a) {
                                        x.trigger("webixjet:core:ui:afterLoad");
                                        var b = a.default || a;
                                        "function" == typeof b && b.prototype && "$view" in b.prototype && (b = new b),
                                            b.then ? b.then(f) : f(b)
                                    }
                                    , function(a) {
                                        x.trigger("webixjet:core:ui:error"),
                                            console.error(a),
                                            System.normalize(g).then(function(b) {
                                                    System.delete(b),
                                                        l(a).then(f)
                                                }
                                            )
                                    }
                                )
                        } else
                            webix.ui.$freeze = !1,
                                webix.ui.resize()
                    }
                    function l(a) {
                        return Promise.all([]).then(function() {
                                var b = a.message;
                                if (b.indexOf("404") > -1) {
                                    var c = navigator.language;
                                    c = c.toLowerCase().indexOf("zh") > -1 ? "zh" : "en",
                                        b = "http->modules/common/404_" + c + ".html"
                                }
                                return {
                                    $ui: {
                                        template: b
                                    }
                                }
                            }
                        )
                    }
                    function m(a, b, c, d, e) {
                        for (var f = 0; f < a.length; f++)
                            if (a[f](b, c, d, e) === !1)
                                return !1;
                        return !0
                    }
                    function n(a, b, c) {
                        var d = a.attachEvent(b, c);
                        return this._handlers.push({
                            obj: a,
                            id: d
                        }),
                            d
                    }
                    function o(a, b, c) {
                        if (a)
                            for (var d = 0; d < a.length; d++)
                                a[d](b, c)
                    }
                    function p() {
                        if (this._ui) {
                            this.$layout && p.call(this.$layout);
                            for (var a = this._handlers, b = a.length - 1; b >= 0; b--)
                                a[b].obj.detachEvent(a[b].id);
                            this._handlers = [];
                            for (var c = this._uis, b = c.length - 1; b >= 0; b--)
                                c[b] && c[b].destructor && c[b].destructor();
                            this._uis = [],
                                o(this._destroy, this._ui, this),
                            !this.parent && this._ui && this._ui.destructor()
                        }
                    }
                    function q(a) {
                        delete webix.ui.views[a.config.id],
                            a.config.id = "";
                        for (var b = a.getChildViews(), c = b.length - 1; c >= 0; c--)
                            q(b[c])
                    }
                    function r(a, b) {
                        var c, d = {
                            _init: [],
                            _destroy: [],
                            _windows: [],
                            _events: []
                        }, e = i(a, d);
                        if (e.$scope = this,
                            e.id && (c = $$(e.id)),
                                !c) {
                            for (var f = 0; f < d._windows.length; f++)
                                this.ui(d._windows[f]);
                            c = webix.ui(e, b),
                                this._uis.push(c);
                            for (var f = 0; f < d._events.length; f += 2)
                                n.call(this, x, d._events[f], d._events[f + 1]);
                            o(d._init, c, this)
                        }
                        return c
                    }
                    function s(a) {
                        this._uis = [],
                            this._handlers = [],
                        this.root && this.root.config && q(this.root);
                        for (var b = 0; b < this._windows.length; b++)
                            this.ui(this._windows[b]);
                        this._ui = webix.ui(a, this.root),
                        this.parent && (this.root = this._ui);
                        for (var b = 0; b < this._events.length; b += 2)
                            this.on(x, this._events[b], this._events[b + 1]);
                        o(this._init, this._ui, this)
                    }
                    var t, u, v, w, x;
                    b && b.id;
                    return {
                        setters: [function(a) {}
                            , function(a) {
                                t = a
                            }
                        ],
                        execute: function() {
                            u = [],
                                v = [],
                                w = [],
                                x = {
                                    config: {
                                        name: "App",
                                        version: "1.0",
                                        container: document.body,
                                        start: "/home"
                                    },
                                    debug: !1,
                                    $layout: {
                                        sub: g,
                                        index: 0,
                                        add: !0,
                                        root: document.body
                                    },
                                    create: function(a) {
                                        webix.extend(x.config, a, !0),
                                            x.debug = a.debug,
                                            x.$layout.root = x.config.container,
                                            webix.extend(x, webix.EventSystem),
                                            webix.attachEvent("onClick", function(a) {
                                                    if (a) {
                                                        var b = a.target || a.srcElement;
                                                        if (b && b.getAttribute) {
                                                            var c = b.getAttribute("trigger");
                                                            c && x.trigger(c)
                                                        }
                                                    }
                                                }
                                            ),
                                            setTimeout(function() {
                                                    x.start()
                                                }
                                                , 1);
                                        var b = document.getElementsByTagName("title")[0];
                                        b && (b.innerHTML = x.config.name);
                                        var c = x.config.container;
                                        return webix.html.addCss(c, "webixappstart"),
                                            setTimeout(function() {
                                                    webix.html.removeCss(c, "webixappstart"),
                                                        webix.html.addCss(c, "webixapp")
                                                }
                                                , 10),
                                            setTimeout(function() {
                                                    webix.html.remove(document.getElementById("iscp-app-loading"))
                                                }
                                                , 2e3),
                                            x
                                    },
                                    ui: r,
                                    router: function(a) {
                                        var b = h(a);
                                        x.path = [].concat(b),
                                            webix.ui.$freeze = !0,
                                            k(x.$layout, b)
                                    },
                                    show: function(a, b) {
                                        window.location.hash != "#!" + a ? routie.navigate("!" + a, b) : x.router(a)
                                    },
                                    start: function() {
                                        routie("!*", x.router),
                                            window.location.hash ? (webix.ui.$freeze = !1,
                                                webix.ui.resize()) : x.show(x.config.start)
                                    },
                                    use: function(a, b) {
                                        a.$oninit && a.$oninit(this, b || {}),
                                        a.$onurlchange && v.push(a.$onurlchange),
                                        a.$onurl && w.push(a.$onurl),
                                        a.$onui && u.push(a.$onui)
                                    },
                                    trigger: function(a) {
                                        x.apply(a, [].splice.call(arguments, 1))
                                    },
                                    apply: function(a, b) {
                                        x.callEvent(a, b)
                                    },
                                    action: function(a) {
                                        return function() {
                                            x.apply(a, arguments)
                                        }
                                    },
                                    on: function(a, b) {
                                        this.attachEvent(a, b)
                                    },
                                    _uis: [],
                                    _handlers: []
                                },
                                a("default", x),
                                a("params_string", f)
                        }
                    }
                }
            ),
            System.register("libs/webix-jet/jet-core/plugins/locale.ts", [], function(a, b) {
                    "use strict";
                    var c, d;
                    b && b.id;
                    return {
                        setters: [],
                        execute: function() {
                            c = "en",
                                d = "--:app:lang",
                                a("default", {
                                    $oninit: function(a, b) {
                                        d = (a || "") + d,
                                            c = b || c
                                    },
                                    setLang: function(a, b) {
                                        a = a.split("_")[0],
                                        a !== this.getLang() && (webix.storage.local.put(d, a),
                                        b || document.location.reload())
                                    },
                                    getLang: function() {
                                        return webix.storage.local.get(d) || c
                                    }
                                })
                        }
                    }
                }
            ),
            System.register("blacklist.ts", [], function(a, b) {
                    "use strict";
                    var c;
                    b && b.id;
                    return {
                        setters: [],
                        execute: function() {
                            a("HDSF_BLACKLIST", c = [])
                        }
                    }
                }
            ),
            System.register("modules/common/extra/session/jalor5session.ts", ["app", "lodash"], function(a, b) {
                    "use strict";
                    function c(a, b) {
                        return a ? function() {
                                b.apply(this, arguments);
                                var c = a.apply(this, arguments);
                                return c
                            }
                            : b
                    }
                    function d(a) {
                        var b = "success";
                        return j.has(a, b) ? j.isFunction(a[b]) : !!j.isArray(a) && d(j.head(a))
                    }
                    function e(a) {
                        var b = a.shift();
                        return b._send.apply(b, a)
                    }
                    function f() {
                        webix.callEvent("onLoginConfirmed")
                    }
                    function g() {
                        $$(k) || webix.ui({
                            view: "window",
                            id: k,
                            width: 600,
                            height: 450,
                            modal: !0,
                            position: "center",
                            move: !0,
                            zIndex: 1e4,
                            head: {
                                view: "toolbar",
                                cols: [{
                                    view: "label",
                                    label: "Please Login"
                                }, {}, {
                                    view: "icon",
                                    icon: "times",
                                    click: function() {
                                        this.getTopParentView().close(),
                                            webix.callEvent("onLoginCancelled", [])
                                    }
                                }]
                            },
                            body: {
                                view: "iframe",
                                src: i.workspace.jalorContextPath + "servlet/rebuildSession"
                            }
                        }).show()
                    }
                    function h() {
                        g()
                    }
                    var i, j, k, l, m;
                    b && b.id;
                    return {
                        setters: [function(a) {
                            i = a
                        }
                            , function(a) {
                                j = a
                            }
                        ],
                        execute: function() {
                            window.Jalor = {
                                Component: {
                                    Session: {
                                        rebuiltCallback: f
                                    }
                                }
                            },
                                k = "HwSsoLoginWindow",
                                l = [],
                                m = webix.ajax.$callback,
                                webix.attachEvent("onLoginConfirmed", function() {
                                        $$(k) && $$(k).close();
                                        for (var a, b = []; a = l.shift(); )
                                            b.push(e(a));
                                        webix.promise.all(b).then(function() {}
                                        )
                                    }
                                ),
                                webix.attachEvent("onLoginCancelled", function() {
                                        l = [],
                                            window.location.reload()
                                    }
                                ),
                                webix.ajax.prototype._send = c(webix.ajax.prototype._send, function(a, b, c, e) {
                                        var f = this.master || (c && d(b) && !d(c) ? c : this);
                                        f.xhrConfig = [this, a, b, c, e]
                                    }
                                ),
                                webix.ajax.$callback = function(a, b, c, d, e, f) {
                                    if (f) {
                                        var g = e.status;
                                        if (401 === g) {
                                            var j = webix.callEvent("framework:ajax:401", [a, b, c, d, e, f]);
                                            if (j === !1)
                                                return void (f = !1)
                                        } else if (403 === g)
                                            return void setTimeout(function() {
                                                    var b = a.xhrConfig;
                                                    b && l.push(b);
                                                    var c = b[1].indexOf("/iscp/upc/services/jbs/environment/base") > -1
                                                        , d = b[1].indexOf("/iscp/upc/services/jbs/environment/user") > -1;
                                                    c || d ? window.location.href = i.workspace.jalorContextPath + "servlet/redirectSession?url=" + encodeURIComponent(window.location.href) : h()
                                                }
                                            )
                                    }
                                    m(a, b, c, d, e, f)
                                }
                        }
                    }
                }
            ),
            System.register("env.ts", ["lodash", "libs/webix-jet/jet-core/plugins/locale", "blacklist", "modules/common/extra/session/jalor5session"], function(a, b) {
                    "use strict";
                    function c(a) {
                        if ("object" == typeof a) {
                            var b = [];
                            for (var c in a) {
                                var d = a[c];
                                (null  === d || j.isUndefined(d)) && (d = ""),
                                "object" == typeof d && (d = JSON.stringify(d)),
                                    b.push(c + "=" + encodeURIComponent(d))
                            }
                            return b.join("&")
                        }
                        return a
                    }
                    function d(a) {
                        (window.execScript || eval)(a)
                    }
                    function e() {
                        return /^\?.+@.+/.test(location.search)
                    }
                    function f(a) {
                        return a.indexOf("app.huawei.com") > -1 || a.indexOf("w3.huawei.com") > -1
                    }
                    function g() {
                        var a, b = (location.search || "?dev").substr(1);
                        if (b.indexOf("@") >= 0 && (a = b.split("@")[0]),
                                !a) {
                            var c = location.pathname.split("/");
                            if (a = c.slice(0, c.indexOf("portal")).join("/") + "/",
                                    j.endsWith(a, ".html"))
                                return ""
                        }
                        return a
                    }
                    function h() {
                        var a = (location.search || "?dev").substr(1);
                        return "/" + (a.split("@")[1] || a)
                    }
                    function i() {
                        return e() ? h() + " / " + g() + " / " : "" + g()
                    }
                    var j, k, l, m, n;
                    b && b.id;
                    return {
                        setters: [function(a) {
                            j = a
                        }
                            , function(a) {
                                k = a
                            }
                            , function(a) {
                                l = a
                            }
                            , function(a) {}
                        ],
                        execute: function() {
                            m = function() {
                                function a(a) {
                                    this._workspaceVO = a,
                                        this.jalorContextPath = "",
                                    "?local" !== location.search && (location.search.indexOf("?locale=") > -1 && this.switchLang(location.search.split("?locale=")[1]),
                                        this.getEnv())
                                }
                                return a.prototype.setWorkspaceVO = function(a) {
                                    a.user && a.user.currentRole && (window.hwPermissions = a.user.currentRole.personalPermissions),
                                        window.workspaceVO = this._workspaceVO = a,
                                        k.default.setLang(this.lang)
                                }
                                    ,
                                    Object.defineProperty(a.prototype, "appName", {
                                        get: function() {
                                            return g()
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    Object.defineProperty(a.prototype, "isLocal", {
                                        get: function() {
                                            return e()
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    a.prototype.judgeHdsf = function(a) {
                                        var b = j.trim(a, "/");
                                        return !(l.HDSF_BLACKLIST.indexOf(b) > -1)
                                    }
                                    ,
                                    Object.defineProperty(a.prototype, "isHdsf", {
                                        get: function() {
                                            return this.judgeHdsf(this.appName)
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    Object.defineProperty(a.prototype, "isProduction", {
                                        get: function() {
                                            return f(this._workspaceVO.envBean.w3Url)
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    Object.defineProperty(a.prototype, "serviceAddress", {
                                        get: function() {
                                            return h()
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    Object.defineProperty(a.prototype, "contextPath", {
                                        get: function() {
                                            return this.isLocal ? this.serviceAddress + "/" + this.appName + "/" : this._workspaceVO.contextPath
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    a.prototype.getContextPath = function(a) {
                                        var b = j.endsWith(a, "/") ? a : a + "/";
                                        return j.startsWith(b, "/") ? b : this.isLocal ? this.serviceAddress + "/" + b : "/" + b
                                    }
                                    ,
                                    Object.defineProperty(a.prototype, "menu", {
                                        get: function() {
                                            return this._workspaceVO.leftMenuNode
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    Object.defineProperty(a.prototype, "user", {
                                        get: function() {
                                            return this._workspaceVO.user
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    Object.defineProperty(a.prototype, "role", {
                                        get: function() {
                                            var a = this._workspaceVO.user.currentRole;
                                            return {
                                                id: a.roleId,
                                                value: a.roleName
                                            }
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    Object.defineProperty(a.prototype, "roleList", {
                                        get: function() {
                                            return j.map(this._workspaceVO.user.validRoles, function(a) {
                                                    return {
                                                        id: a.roleId,
                                                        value: a.roleName
                                                    }
                                                }
                                            )
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    Object.defineProperty(a.prototype, "lang", {
                                        get: function() {
                                            return this._workspaceVO.currentLanguage || "en_US"
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    Object.defineProperty(a.prototype, "globalSetting", {
                                        get: function() {
                                            var a = {
                                                common: {
                                                    timeZone: ""
                                                }
                                            }
                                                , b = this._workspaceVO.userSettingList;
                                            if (!j.isArray(b)) {
                                                var c = this;
                                                webix.ajax().sync().get(this.jalorContextPath + "services/jbs/environment/personal", {}, {
                                                    success: function(a, d) {
                                                        var e = d.json();
                                                        b = c._workspaceVO.userSettingList = e.userSettingList
                                                    }
                                                })
                                            }
                                            return j.each(b, function(b) {
                                                    "global" === b.settingKey && b.settingContent && (a = JSON.parse(b.settingContent))
                                                }
                                            ),
                                                a
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    Object.defineProperty(a.prototype, "timeZone", {
                                        get: function() {
                                            if (this.userTimeZone)
                                                return this.userTimeZone;
                                            var a = ""
                                                , b = this.globalSetting;
                                            if (b && (a = b.common.timeZone),
                                                    !a) {
                                                a = -((new Date).getTimezoneOffset() / 60),
                                                    a = a > 0 ? "+".concat(a) : "".concat(a);
                                                var c = this.jalorContextPath;
                                                webix.ajax().sync().get(c + "services/jalor/lookup/itemquery/list/lang/LOOKUP_TIMEZONE", function(d) {
                                                        d = JSON.parse(d);
                                                        var e = !1;
                                                        j.each(d, function(d) {
                                                                j.endsWith(d.itemCode, a) && !e && (e = !0,
                                                                    a = d.itemCode,
                                                                    b.common.timeZone = a,
                                                                    webix.ajax().headers({
                                                                        "Content-Type": "application/json"
                                                                    }).post(c + "services/jalor/personalized/setting/createSingle", JSON.stringify({
                                                                        settingKey: "global",
                                                                        settingContent: JSON.stringify(b)
                                                                    })))
                                                            }
                                                        )
                                                    }
                                                ),
                                                    this.userTimeZone = a
                                            }
                                            return a
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    Object.defineProperty(a.prototype, "w3Url", {
                                        get: function() {
                                            return this._workspaceVO.envBean.w3Url
                                        },
                                        enumerable: !0,
                                        configurable: !0
                                    }),
                                    a.prototype.loginDev = function() {
                                        var a = "dev-" + this.appName + "-login-key"
                                            , b = JSON.parse(window.localStorage.getItem(a) || "{}");
                                        b.account || (b.account = window.prompt("W3 Account:", "test1"),
                                            b.password = null ,
                                            window.localStorage.setItem(a, JSON.stringify(b)));
                                        var d = new XMLHttpRequest;
                                        d.open("GET", "/sso/rest/user/" + b.account, !1),
                                            d.send();
                                        var e = j.assign({
                                            redirectURL: location.href,
                                            handler: "getuserinfo",
                                            loaduser: "false"
                                        }, JSON.parse(d.responseText));
                                        d = new XMLHttpRequest,
                                            d.open("POST", "/sso/getuser2.do", !1),
                                            e = c(e),
                                            d.send(e)
                                    }
                                    ,
                                    a.prototype.switchLang = function(a) {
                                        var b = this.contextPath;
                                        this.isHdsf && (b = "/iscp/upc/",
                                        this.isLocal && (b = this.serviceAddress + "/iscp/upc/"));
                                        var c = b + "servlet/switchLanguage?backUrl=" + encodeURIComponent(window.location.href) + "&switchTo=" + a;
                                        webix.ajax().post(c)
                                    }
                                    ,
                                    a.prototype.getEnv = function() {
                                        var a = this
                                            , b = function(b) {
                                                if (403 !== b.status) {
                                                    var c = "";
                                                    try {
                                                        c = b.json ? b.json().message : JSON.parse(b.responseText).message
                                                    } catch (a) {
                                                        c = "Server Internal Error! Please contact with the environment administrator."
                                                    }
                                                    webix.alert({
                                                        title: "Error",
                                                        ok: "Return",
                                                        text: c,
                                                        callback: function(b) {
                                                            webix.storage.local.clear(),
                                                                window.location.href = a.jalorContextPath + "servlet/logout?redirect=" + encodeURIComponent(window.location.href)
                                                        }
                                                    })
                                                }
                                            }
                                        ;
                                        new XMLHttpRequest;
                                        if (this.isHdsf) {
                                            var c = "/iscp/upc/";
                                            this.isLocal && (c = this.serviceAddress + "/iscp/upc/"),
                                                this.jalorContextPath = c;
                                            var e = webix.promise.defer()
                                                , f = {
                                                success: function(b, c, d) {
                                                    a.setWorkspaceVO(c.json()),
                                                        e.resolve(c)
                                                },
                                                error: function(a, b, c) {
                                                    e.reject(c)
                                                }
                                            };
                                            this.waitEnv = e,
                                                webix.ajax().timeout(6e4).get(c + "services/jbs/environment/base", f)
                                        } else {
                                            this.jalorContextPath = this.contextPath;
                                            var g = new XMLHttpRequest;
                                            g.open("GET", this.contextPath + "servlet/environment", !1),
                                                g.send(),
                                                200 === g.status ? (d(g.responseText),
                                                    a.setWorkspaceVO(window.workspaceVO)) : b(g)
                                        }
                                    }
                                    ,
                                    a
                            }
                            (),
                                n = new m({
                                    network: "intranet",
                                    contextPath: i(),
                                    envBean: {
                                        w3Url: "http://w3-beta.huawei.com"
                                    },
                                    user: {
                                        currentRole: {
                                            personalPermissions: []
                                        },
                                        userAccount: "test001"
                                    },
                                    leftMenuNode: {},
                                    currentLanguage: "zh_CN"
                                }),
                                a("workspace", n)
                        }
                    }
                }
            ),
            System.register("app.ts", ["libs/webix-jet/jet-core/core", "libs/webix-jet/jet-core/plugins/locale", "lodash", "env"], function(a, b) {
                    "use strict";
                    var c, d, e, f, g, h;
                    b && b.id;
                    return {
                        setters: [function(a) {
                            c = a
                        }
                            , function(a) {
                                d = a
                            }
                            , function(a) {
                                e = a
                            }
                            , function(b) {
                                a({
                                    workspace: b.workspace
                                })
                            }
                        ],
                        execute: function() {
                            f = "iscp-portal",
                                g = "zh",
                                d.default.$oninit(f, g),
                                webix.codebase = "libs/webix-extra/components",
                                webix.cdn = "",
                                webix.ProgressBar.showProgress = e.wrap(webix.ProgressBar.showProgress, function(a, b) {
                                        b || (b = {
                                            icon: ""
                                        }),
                                            a.call(this, b)
                                    }
                                ),
                                webix.i18n.parseFormat = "%Y-%m-%d",
                                webix.i18n.setLocale(d.default.getLang()),
                                h = c.default.create({
                                    id: f,
                                    name: "ISC",
                                    container: document.body,
                                    debug: !1,
                                    start: "/portal/iscp.esupplier.index/iscp.esupplier.spbase.home.index"
                                }),
                                a("default", h)
                        }
                    }
                }
            ),
            System.register("libs/webix-extra/helpers/validator.ts", ["lodash"], function(a, b) {
                    "use strict";
                    function c(a, b) {
                        var c = d.assign({}, a);
                        return Object.getOwnPropertyNames(Math).map(function(a) {
                                return c[a.toUpperCase()] = Math[a]
                            }
                        ),
                            Object.getOwnPropertyNames(webix.rules).map(function(a) {
                                    return c[a.toUpperCase()] = webix.rules[a]
                                }
                            ),
                            new Function("scope","with(scope){ return " + b + "; }")(c)
                    }
                    var d;
                    b && b.id;
                    return a("validate", c),
                        {
                            setters: [function(a) {
                                d = a
                            }
                            ],
                            execute: function() {}
                        }
                }
            ),
            System.register("libs/webix-extra/UIExtension.ts", ["lodash", "./helpers/validator"], function(a, b) {
                    "use strict";
                    var c, d;
                    b && b.id;
                    return {
                        setters: [function(a) {
                            c = a
                        }
                            , function(a) {
                                d = a
                            }
                        ],
                        execute: function() {
                            window.webix_view = {
                                $init: function(a) {
                                    var b = this;
                                    this.load && this.$ready.push(function() {
                                            this.attachEvent("onAfterLoad", function() {
                                                    this._hwload_flag = !1
                                                }
                                            )
                                        }
                                    ),
                                        this.show = c.wrap(this.show, function(a) {
                                                for (var b = [], c = 1; c < arguments.length; c++)
                                                    b[c - 1] = arguments[c];
                                                return !(!b[2] && !this.hwCheckPermission()) && a.apply(this, b)
                                            }
                                        ),
                                        this.enable = c.wrap(this.enable, function(a) {
                                                for (var b = [], c = 1; c < arguments.length; c++)
                                                    b[c - 1] = arguments[c];
                                                if (this.hwCheckPermission())
                                                    return a.apply(this, b)
                                            }
                                        ),
                                        this.disable = c.wrap(this.disable, function(a, b) {
                                                var c = this;
                                                a.call(this, b),
                                                    webix.delay(function() {
                                                            c._disable_cover && (c._disable_cover.title = b || "")
                                                        }
                                                    )
                                            }
                                        ),
                                        c.forEach(a.hwPlugins, function(c) {
                                                b.hwLoadPlugin(c, a)
                                            }
                                        )
                                },
                                hwLoadPlugin: function(a, b) {
                                    var d = this;
                                    a.$init && a.$init.call(this, b || this.config),
                                        c.forEach(a.on, function(a, b) {
                                                d.attachEvent(b, a)
                                            }
                                        )
                                },
                                getPermissions: function() {
                                    return window.hwPermissions || []
                                },
                                _hasPermission: function(a) {
                                    return "undefined" == typeof window.hwPermissionsMode && (window.hwPermissionsMode = !0),
                                    !window.hwPermissionsMode || this.getPermissions().indexOf(a) !== -1
                                },
                                _isHasMode: function(a) {
                                    return "hasPermission" === a
                                },
                                _permission_check: function(a, b) {
                                    var c = b || "hasPermission";
                                    return a.indexOf("|") >= 0 && a.indexOf(",") >= 0 ? (webix.log("permission 权限点标注错误，不能同时使用逻辑与“$”与逻辑或“,”来控制元素显示:" + a),
                                        !1) : a.indexOf("|") >= 0 ? this._permission_checkAnyOne(a.split("|"), c) : a.indexOf(",") >= 0 ? this._permission_checkAll(a.split(","), c) : this._permission_checkOthers(a, c)
                                },
                                _permission_checkAnyOne: function(a, b) {
                                    var d = this
                                        , e = this._isHasMode(b)
                                        , f = !1;
                                    return c.forEach(a, function(a) {
                                            return f = e === d._hasPermission(a),
                                                !f
                                        }
                                    ),
                                        f
                                },
                                _permission_checkAll: function(a, b) {
                                    var d = this
                                        , e = this._isHasMode(b)
                                        , f = !0;
                                    return c.forEach(a, function(a) {
                                            return f = e === d._hasPermission(a)
                                        }
                                    ),
                                        f
                                },
                                _permission_checkOthers: function(a, b) {
                                    var c = this._hasPermission(a);
                                    return this._isHasMode(b) ? c : !c
                                },
                                permission_setter: function(a) {
                                    var b = a;
                                    return b && ("string" == typeof b && (b = [b, "hasPermission", window.hwPermissionsMode || !1]),
                                    this._permission_check.apply(this, b) || (webix.isArray(b) && 3 === b.length && b[2] === !0 ? this.disable("No permission") : this.hide())),
                                        b
                                },
                                hwCheckPermission: function() {
                                    return !this.config.permission || this._permission_check.apply(this, this.config.permission)
                                },
                                hwValue_setter: function(a) {
                                    var b = this.config;
                                    return b.value = b.hwValue = a
                                },
                                hwUrl_setter: function(a) {
                                    if (a && (a.url && a.autoload !== !1 && this.define("url", a.url),
                                        a.dataFeed && this.define("dataFeed", a.dataFeed),
                                            a.datatype)) {
                                        if ("object" == typeof a.datatype) {
                                            var b = "temp_" + webix.uid();
                                            webix.DataDriver[b] = a.datatype,
                                                a.datatype = b,
                                                this.attachEvent("onDestruct", function() {
                                                        a.datatype = webix.copy(webix.DataDriver[b]),
                                                            delete webix.DataDriver[b]
                                                    }
                                                )
                                        }
                                        this.define("datatype", a.datatype),
                                        this.data && (this.data.driver = webix.DataDriver[a.datatype])
                                    }
                                    return a
                                },
                                hwSetUrlParams: function(a, b) {
                                    void 0 === b && (b = !1);
                                    var c = function(c) {
                                        b && (c.params = {}),
                                            webix.extend(c.params, a, !0)
                                    }
                                        , d = this.config.hwUrl;
                                    if (d && d.params)
                                        return c(d),
                                            this;
                                    var e = this.data.url;
                                    return !e && d && (e = d.url),
                                    e && (e.params ? c(e) : e.source.params && e.source.params.params && c(e.source.params)),
                                        this
                                },
                                hwRestoreUrl: function() {
                                    var a = this.config
                                        , b = a.url || a.hwUrl.url;
                                    if (webix.assert(b, "You need to set url for hwload"),
                                        c.isString(b) && b.indexOf("->") !== -1) {
                                        var d = b.split("->");
                                        b = webix.proxy(d[0], d[1])
                                    }
                                    var e = this.data;
                                    e && (e.url = b);
                                    var f = a.datatype || a.hwUrl.datatype || this.data.driver;
                                    return webix.assert(f, "You need to set driver"),
                                        c.isString(f) ? e && (e.driver = webix.DataDriver[f]) : this.define("hwUrl", {
                                            datatype: f
                                        }),
                                        b
                                },
                                hwload: function(a) {
                                    var b = this;
                                    void 0 === a && (a = 0),
                                        !this.config.hwUncheck && this.hwIsDirty && this.hwIsDirty() ? webix.hwMessageDialog({
                                                type: "info",
                                                message: webix.i18n["common.save.notice"],
                                                autofocus: !0
                                            }, function(c) {
                                                c && b._hwload(a)
                                            }
                                        ) : this._hwload(a)
                                },
                                _hwload: function(a) {
                                    if (void 0 === a && (a = 0),
                                            !this._hwload_flag) {
                                        if (c.isFunction(this.getState)) {
                                            var b = this.getState();
                                            b && this.scrollTo(b.scroll.x - 1e-6, 0)
                                        }
                                        this._hwload_flag = !0,
                                        this.editStop && this.editStop();
                                        var d = this.config
                                            , e = d.tooltip;
                                        e && e.hide && e.hide(),
                                            this.clearAll();
                                        var f = this.hwGetDP ? this.hwGetDP() : null ;
                                        f && f.reset(),
                                        this.getPager && this.getPager() && (d.datafetch = this.getPager().config.size);
                                        var g = this.hwRestoreUrl()
                                            , h = {
                                            before: function() {
                                                this.setPage && this.setPage(a)
                                            }
                                        }
                                            , i = {
                                            start: d.datafetch * a,
                                            count: d.datafetch
                                        };
                                        if (this.getState) {
                                            var b = this.getState();
                                            i.sort = b.sort,
                                            d.hwSort && i.sort && (i.sort.type = d.hwSort),
                                                i.filter = b.filter
                                        }
                                        i.abilityFilter = this.abilityFilterQueryParams,
                                            this.load(g, h, i),
                                            this.hwloadPage = a
                                    }
                                },
                                _get_input_selection: function(a) {
                                    var b, d, e, f, g, h = 0, i = 0;
                                    return c.isNumber(a.selectionStart) && c.isNumber(a.selectionEnd) ? (h = a.selectionStart,
                                        i = a.selectionEnd) : (d = document.selection.createRange(),
                                    d && d.parentElement() == a && (f = a.value.length,
                                        b = a.value.replace(/\r\n/g, "\n"),
                                        e = a.createTextRange(),
                                        e.moveToBookmark(d.getBookmark()),
                                        g = a.createTextRange(),
                                        g.collapse(!1),
                                        e.compareEndPoints("StartToEnd", g) > -1 ? h = i = f : (h = -e.moveStart("character", -f),
                                            h += b.slice(0, h).split("\n").length - 1,
                                            e.compareEndPoints("EndToEnd", g) > -1 ? i = f : (i = -e.moveEnd("character", -f),
                                                i += b.slice(0, i).split("\n").length - 1)))),
                                        {
                                            start: h,
                                            end: i
                                        }
                                },
                                _navigation_helper: function(a) {
                                    return function(b, c) {
                                        var d = c.srcElement || c.target
                                            , e = d.tagName.toUpperCase();
                                        if (b._in_edit_mode) {
                                            if (!c.shiftKey && !d.getAttribute("webixignore")) {
                                                if ("INPUT" === e) {
                                                    var f = b._get_input_selection(d)
                                                        , g = d.value.length;
                                                    return ("left" === a && 0 === f.start || "right" === a && g === f.end || "up" === a || "down" === a) && (b.editStop(),
                                                        b.moveSelection(a, c.shiftKey)),
                                                        !0
                                                }
                                                if ("TEXTAREA" === e || "SELECT" === e)
                                                    return !0
                                            }
                                        } else {
                                            if (!d.getAttribute("webixignore") && ("INPUT" === e || "TEXTAREA" === e || "SELECT" === e))
                                                return !0;
                                            if (b && b.moveSelection && b.config.navigation && !b._in_edit_mode)
                                                return b.moveSelection(a, c.shiftKey)
                                        }
                                        return !0
                                    }
                                },
                                hwValidators_setter: function(a) {
                                    var b = c.mapValues(a, function(a) {
                                            return c.isString(a) ? a : function(b, e, f) {
                                                var g = this
                                                    , h = [];
                                                return [].concat(a).forEach(function(a) {
                                                        c.isString(a) ? webix.rules[a] && !webix.rules[a].call(g, b, e, f) && h.push(g.elements[f].config.invalidMessage) : "custom" === a.type && (d.validate(e, a.expression) || h.push(a.invalidMessage))
                                                    }
                                                ),
                                                !(h.length > 0) || (this.elements[f].config.invalidMessage = h.join("; "),
                                                    !1)
                                            }
                                        }
                                    );
                                    return this.define("rules", b),
                                        a
                                },
                                hwGetTopView: function() {
                                    var a = this.getParentView();
                                    return a ? a.hwGetTopView() : this
                                },
                                isInDesigner: function() {
                                    var a = $$("EDITOR_CONTEXT");
                                    return a && a.isVisible()
                                }
                            }
                        }
                    }
                }
            ),
            System.registerDynamic("github:frankwallis/plugin-typescript@5.3.0.json", [], !1, function() {
                    return {
                        main: "plugin",
                        format: "register"
                    }
                }
            ),
            function() {
                var a = System.amdDefine;
                !function(b, c) {
                    "function" == typeof a && a.amd ? a("libs/webix-jet/polyglot/build/polyglot.js", [], function() {
                            return c(b)
                        }
                    ) : "object" == typeof exports ? module.exports = c(b) : b.Polyglot = c(b)
                }
                (this, function(a) {
                        "use strict";
                        function b(a) {
                            a = a || {},
                                this.phrases = {},
                                this.extend(a.phrases || {}),
                                this.currentLocale = a.locale || "en",
                                this.allowMissing = !!a.allowMissing,
                                this.warn = a.warn || i
                        }
                        function c(a) {
                            var b, c, d, e = {};
                            for (b in a)
                                if (a.hasOwnProperty(b)) {
                                    c = a[b];
                                    for (d in c)
                                        e[c[d]] = b
                                }
                            return e
                        }
                        function d(a) {
                            var b = /^\s+|\s+$/g;
                            return a.replace(b, "")
                        }
                        function e(a, b, c) {
                            var e, f, h;
                            return null  != c && a ? (f = a.split(k),
                                h = f[g(b, c)] || f[0],
                                e = d(h)) : e = a,
                                e
                        }
                        function f(a) {
                            var b = c(m);
                            return b[a] || b.en
                        }
                        function g(a, b) {
                            return l[f(a)](b)
                        }
                        function h(a, b) {
                            for (var c in b)
                                "_" !== c && b.hasOwnProperty(c) && (a = a.replace(new RegExp("%\\{" + c + "\\}","g"), b[c]));
                            return a
                        }
                        function i(b) {
                            a.console && a.console.warn && a.console.warn("WARNING: " + b)
                        }
                        function j(a) {
                            var b = {};
                            for (var c in a)
                                b[c] = a[c];
                            return b
                        }
                        b.VERSION = "0.4.3",
                            b.prototype.locale = function(a) {
                                return a && (this.currentLocale = a),
                                    this.currentLocale
                            }
                            ,
                            b.prototype.extend = function(a, b) {
                                var c;
                                for (var d in a)
                                    a.hasOwnProperty(d) && (c = a[d],
                                    b && (d = b + "." + d),
                                        "object" == typeof c ? this.extend(c, d) : this.phrases[d] = c)
                            }
                            ,
                            b.prototype.clear = function() {
                                this.phrases = {}
                            }
                            ,
                            b.prototype.replace = function(a) {
                                this.clear(),
                                    this.extend(a)
                            }
                            ,
                            b.prototype.t = function(a, b) {
                                var c, d;
                                return b = null  == b ? {} : b,
                                "number" == typeof b && (b = {
                                    smart_count: b
                                }),
                                    "string" == typeof this.phrases[a] ? c = this.phrases[a] : "string" == typeof b._ ? c = b._ : this.allowMissing ? c = a : (this.warn('Missing translation for key: "' + a + '"'),
                                        d = a),
                                "string" == typeof c && (b = j(b),
                                    d = e(c, this.currentLocale, b.smart_count),
                                    d = h(d, b)),
                                    d
                            }
                            ,
                            b.prototype.has = function(a) {
                                return a in this.phrases
                            }
                        ;
                        var k = "||||"
                            , l = {
                            chinese: function(a) {
                                return 0
                            },
                            german: function(a) {
                                return 1 !== a ? 1 : 0
                            },
                            french: function(a) {
                                return a > 1 ? 1 : 0
                            },
                            russian: function(a) {
                                return a % 10 === 1 && a % 100 !== 11 ? 0 : a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20) ? 1 : 2
                            },
                            czech: function(a) {
                                return 1 === a ? 0 : a >= 2 && a <= 4 ? 1 : 2
                            },
                            polish: function(a) {
                                return 1 === a ? 0 : a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20) ? 1 : 2
                            },
                            icelandic: function(a) {
                                return a % 10 !== 1 || a % 100 === 11 ? 1 : 0
                            }
                        }
                            , m = {
                            chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                            german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
                            french: ["fr", "tl", "pt-br"],
                            russian: ["hr", "ru"],
                            czech: ["cs"],
                            polish: ["pl"],
                            icelandic: ["is"]
                        };
                        return b
                    }
                )
            }
            (),
            System.register("locale.ts", ["polyglot"], function(a, b) {
                    "use strict";
                    var c, d;
                    b && b.id;
                    return {
                        setters: [function(a) {
                            c = a
                        }
                        ],
                        execute: function() {
                            a("poly", d = new c.default),
                                a("default", function(a, b) {
                                        return d.t(a, b) || d.t(webix.i18n[a], b) || a
                                    }
                                )
                        }
                    }
                }
            );
        //# sourceMappingURL=app-cd1e8d0bc5.bundle.ts.map
    }
)(System, System);
