/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.15 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

var requirejs, require, define;
(function (global) {
  function isFunction(e) {
    return ostring.call(e) === "[object Function]"
  }

  function isArray(e) {
    return ostring.call(e) === "[object Array]"
  }

  function each(e, t) {
    if (e) {
      var n;
      for (n = 0; n < e.length; n += 1)if (e[n] && t(e[n], n, e))break
    }
  }

  function eachReverse(e, t) {
    if (e) {
      var n;
      for (n = e.length - 1; n > -1; n -= 1)if (e[n] && t(e[n], n, e))break
    }
  }

  function hasProp(e, t) {
    return hasOwn.call(e, t)
  }

  function getOwn(e, t) {
    return hasProp(e, t) && e[t]
  }

  function eachProp(e, t) {
    var n;
    for (n in e)if (hasProp(e, n) && t(e[n], n))break
  }

  function mixin(e, t, n, r) {
    return t && eachProp(t, function (t, i) {
      if (n || !hasProp(e, i))r && typeof t == "object" && t && !isArray(t) && !isFunction(t) && !(t instanceof RegExp) ? (e[i] || (e[i] = {}), mixin(e[i], t, n, r)) : e[i] = t
    }), e
  }

  function bind(e, t) {
    return function () {
      return t.apply(e, arguments)
    }
  }

  function scripts() {
    return document.getElementsByTagName("script")
  }

  function defaultOnError(e) {
    throw e
  }

  function getGlobal(e) {
    if (!e)return e;
    var t = global;
    return each(e.split("."), function (e) {
      t = t[e]
    }), t
  }

  function makeError(e, t, n, r) {
    var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
    return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
  }

  function newContext(e) {
    function m(e) {
      var t, n;
      for (t = 0; t < e.length; t++) {
        n = e[t];
        if (n === ".")e.splice(t, 1), t -= 1; else if (n === "..") {
          if (t === 0 || t == 1 && e[2] === ".." || e[t - 1] === "..")continue;
          t > 0 && (e.splice(t - 1, 2), t -= 2)
        }
      }
    }

    function g(e, t, n) {
      var r, i, s, u, a, f, l, c, h, p, d, v, g = t && t.split("/"), y = o.map, b = y && y["*"];
      e && (e = e.split("/"), l = e.length - 1, o.nodeIdCompat && jsSuffixRegExp.test(e[l]) && (e[l] = e[l].replace(jsSuffixRegExp, "")), e[0].charAt(0) === "." && g && (v = g.slice(0, g.length - 1), e = v.concat(e)), m(e), e = e.join("/"));
      if (n && y && (g || b)) {
        s = e.split("/");
        e:for (u = s.length; u > 0; u -= 1) {
          f = s.slice(0, u).join("/");
          if (g)for (a = g.length; a > 0; a -= 1) {
            i = getOwn(y, g.slice(0, a).join("/"));
            if (i) {
              i = getOwn(i, f);
              if (i) {
                c = i, h = u;
                break e
              }
            }
          }
          !p && b && getOwn(b, f) && (p = getOwn(b, f), d = u)
        }
        !c && p && (c = p, h = d), c && (s.splice(0, h, c), e = s.join("/"))
      }
      return r = getOwn(o.pkgs, e), r ? r : e
    }

    function y(e) {
      isBrowser && each(scripts(), function (t) {
        if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === r.contextName)return t.parentNode.removeChild(t), !0
      })
    }

    function b(e) {
      var t = getOwn(o.paths, e);
      if (t && isArray(t) && t.length > 1)return t.shift(), r.require.undef(e), r.makeRequire(null, {skipMap: !0})([e]), !0
    }

    function w(e) {
      var t, n = e ? e.indexOf("!") : -1;
      return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
    }

    function E(e, t, n, i) {
      var s, o, u, a, f = null, l = t ? t.name : null, h = e, p = !0, m = "";
      return e || (p = !1, e = "_@r" + (d += 1)), a = w(e), f = a[0], e = a[1], f && (f = g(f, l, i), o = getOwn(c, f)), e && (f ? o && o.normalize ? m = o.normalize(e, function (e) {
        return g(e, l, i)
      }) : m = e.indexOf("!") === -1 ? g(e, l, i) : e : (m = g(e, l, i), a = w(m), f = a[0], m = a[1], n = !0, s = r.nameToUrl(m))), u = f && !o && !n ? "_unnormalized" + (v += 1) : "", {
        prefix: f,
        name: m,
        parentMap: t,
        unnormalized: !!u,
        url: s,
        originalName: h,
        isDefine: p,
        id: (f ? f + "!" + m : m) + u
      }
    }

    function S(e) {
      var t = e.id, n = getOwn(u, t);
      return n || (n = u[t] = new r.Module(e)), n
    }

    function x(e, t, n) {
      var r = e.id, i = getOwn(u, r);
      hasProp(c, r) && (!i || i.defineEmitComplete) ? t === "defined" && n(c[r]) : (i = S(e), i.error && t === "error" ? n(i.error) : i.on(t, n))
    }

    function T(e, t) {
      var n = e.requireModules, r = !1;
      t ? t(e) : (each(n, function (t) {
        var n = getOwn(u, t);
        n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
      }), r || req.onError(e))
    }

    function N() {
      globalDefQueue.length && (apsp.apply(l, [l.length, 0].concat(globalDefQueue)), globalDefQueue = [])
    }

    function C(e) {
      delete u[e], delete a[e]
    }

    function k(e, t, n) {
      var r = e.map.id;
      e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function (r, i) {
        var s = r.id, o = getOwn(u, s);
        o && !e.depMatched[i] && !n[s] && (getOwn(t, s) ? (e.defineDep(i, c[s]), e.check()) : k(o, t, n))
      }), n[r] = !0)
    }

    function L() {
      var e, n, i = o.waitSeconds * 1e3, u = i && r.startTime + i < (new Date).getTime(), f = [], l = [], c = !1, h = !0;
      if (t)return;
      t = !0, eachProp(a, function (e) {
        var t = e.map, r = t.id;
        if (!e.enabled)return;
        t.isDefine || l.push(e);
        if (!e.error)if (!e.inited && u)b(r) ? (n = !0, c = !0) : (f.push(r), y(r)); else if (!e.inited && e.fetched && t.isDefine) {
          c = !0;
          if (!t.prefix)return h = !1
        }
      });
      if (u && f.length)return e = makeError("timeout", "Load timeout for modules: " + f, null, f), e.contextName = r.contextName, T(e);
      h && each(l, function (e) {
        k(e, {}, {})
      }), (!u || n) && c && (isBrowser || isWebWorker) && !s && (s = setTimeout(function () {
        s = 0, L()
      }, 50)), t = !1
    }

    function A(e) {
      hasProp(c, e[0]) || S(E(e[0], null, !0)).init(e[1], e[2])
    }

    function O(e, t, n, r) {
      e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
    }

    function M(e) {
      var t = e.currentTarget || e.srcElement;
      return O(t, r.onScriptLoad, "load", "onreadystatechange"), O(t, r.onScriptError, "error"), {
        node: t,
        id: t && t.getAttribute("data-requiremodule")
      }
    }

    function _() {
      var e;
      N();
      while (l.length) {
        e = l.shift();
        if (e[0] === null)return T(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
        A(e)
      }
    }

    var t, n, r, i, s, o = {
      waitSeconds: 7,
      baseUrl: "./",
      paths: {},
      bundles: {},
      pkgs: {},
      shim: {},
      config: {}
    }, u = {}, a = {}, f = {}, l = [], c = {}, h = {}, p = {}, d = 1, v = 1;
    return i = {
      require: function (e) {
        return e.require ? e.require : e.require = r.makeRequire(e.map)
      }, exports: function (e) {
        e.usingExports = !0;
        if (e.map.isDefine)return e.exports ? c[e.map.id] = e.exports : e.exports = c[e.map.id] = {}
      }, module: function (e) {
        return e.module ? e.module : e.module = {
          id: e.map.id, uri: e.map.url, config: function () {
            return getOwn(o.config, e.map.id) || {}
          }, exports: e.exports || (e.exports = {})
        }
      }
    }, n = function (e) {
      this.events = getOwn(f, e.id) || {}, this.map = e, this.shim = getOwn(o.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
    }, n.prototype = {
      init: function (e, t, n, r) {
        r = r || {};
        if (this.inited)return;
        this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function (e) {
          this.emit("error", e)
        })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check()
      }, defineDep: function (e, t) {
        this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
      }, fetch: function () {
        if (this.fetched)return;
        this.fetched = !0, r.startTime = (new Date).getTime();
        var e = this.map;
        if (!this.shim)return e.prefix ? this.callPlugin() : this.load();
        r.makeRequire(this.map, {enableBuildCallback: !0})(this.shim.deps || [], bind(this, function () {
          return e.prefix ? this.callPlugin() : this.load()
        }))
      }, load: function () {
        var e = this.map.url;
        h[e] || (h[e] = !0, r.load(this.map.id, e))
      }, check: function () {
        if (!this.enabled || this.enabling)return;
        var e, t, n = this.map.id, i = this.depExports, s = this.exports, o = this.factory;
        if (!this.inited)this.fetch(); else if (this.error)this.emit("error", this.error); else if (!this.defining) {
          this.defining = !0;
          if (this.depCount < 1 && !this.defined) {
            if (isFunction(o)) {
              if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)try {
                s = r.execCb(n, o, i, s)
              } catch (u) {
                e = u
              } else s = r.execCb(n, o, i, s);
              this.map.isDefine && s === undefined && (t = this.module, t ? s = t.exports : this.usingExports && (s = this.exports));
              if (e)return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", T(this.error = e)
            } else s = o;
            this.exports = s, this.map.isDefine && !this.ignore && (c[n] = s, req.onResourceLoad && req.onResourceLoad(r, this.map, this.depMaps)), C(n), this.defined = !0
          }
          this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
        }
      }, callPlugin: function () {
        var e = this.map, t = e.id, n = E(e.prefix);
        this.depMaps.push(n), x(n, "defined", bind(this, function (n) {
          var i, s, a, f = getOwn(p, this.map.id), l = this.map.name, c = this.map.parentMap ? this.map.parentMap.name : null, h = r.makeRequire(e.parentMap, {enableBuildCallback: !0});
          if (this.map.unnormalized) {
            n.normalize && (l = n.normalize(l, function (e) {
              return g(e, c, !0)
            }) || ""), s = E(e.prefix + "!" + l, this.map.parentMap), x(s, "defined", bind(this, function (e) {
              this.init([], function () {
                return e
              }, null, {enabled: !0, ignore: !0})
            })), a = getOwn(u, s.id), a && (this.depMaps.push(s), this.events.error && a.on("error", bind(this, function (e) {
              this.emit("error", e)
            })), a.enable());
            return
          }
          if (f) {
            this.map.url = r.nameToUrl(f), this.load();
            return
          }
          i = bind(this, function (e) {
            this.init([], function () {
              return e
            }, null, {enabled: !0})
          }), i.error = bind(this, function (e) {
            this.inited = !0, this.error = e, e.requireModules = [t], eachProp(u, function (e) {
              e.map.id.indexOf(t + "_unnormalized") === 0 && C(e.map.id)
            }), T(e)
          }), i.fromText = bind(this, function (n, s) {
            var u = e.name, a = E(u), f = useInteractive;
            s && (n = s), f && (useInteractive = !1), S(a), hasProp(o.config, t) && (o.config[u] = o.config[t]);
            try {
              req.exec(n)
            } catch (l) {
              return T(makeError("fromtexteval", "fromText eval for " + t + " failed: " + l, l, [t]))
            }
            f && (useInteractive = !0), this.depMaps.push(a), r.completeLoad(u), h([u], i)
          }), n.load(e.name, h, i, o)
        })), r.enable(n, this), this.pluginMaps[n.id] = n
      }, enable: function () {
        a[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (e, t) {
          var n, s, o;
          if (typeof e == "string") {
            e = E(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, o = getOwn(i, e.id);
            if (o) {
              this.depExports[t] = o(this);
              return
            }
            this.depCount += 1, x(e, "defined", bind(this, function (e) {
              this.defineDep(t, e), this.check()
            })), this.errback && x(e, "error", bind(this, this.errback))
          }
          n = e.id, s = u[n], !hasProp(i, n) && s && !s.enabled && r.enable(e, this)
        })), eachProp(this.pluginMaps, bind(this, function (e) {
          var t = getOwn(u, e.id);
          t && !t.enabled && r.enable(e, this)
        })), this.enabling = !1, this.check()
      }, on: function (e, t) {
        var n = this.events[e];
        n || (n = this.events[e] = []), n.push(t)
      }, emit: function (e, t) {
        each(this.events[e], function (e) {
          e(t)
        }), e === "error" && delete this.events[e]
      }
    }, r = {
      config: o,
      contextName: e,
      registry: u,
      defined: c,
      urlFetched: h,
      defQueue: l,
      Module: n,
      makeModuleMap: E,
      nextTick: req.nextTick,
      onError: T,
      configure: function (e) {
        e.baseUrl && e.baseUrl.charAt(e.baseUrl.length - 1) !== "/" && (e.baseUrl += "/");
        var t = o.shim, n = {paths: !0, bundles: !0, config: !0, map: !0};
        eachProp(e, function (e, t) {
          n[t] ? (o[t] || (o[t] = {}), mixin(o[t], e, !0, !0)) : o[t] = e
        }), e.bundles && eachProp(e.bundles, function (e, t) {
          each(e, function (e) {
            e !== t && (p[e] = t)
          })
        }), e.shim && (eachProp(e.shim, function (e, n) {
          isArray(e) && (e = {deps: e}), (e.exports || e.init) && !e.exportsFn && (e.exportsFn = r.makeShimExports(e)), t[n] = e
        }), o.shim = t), e.packages && each(e.packages, function (e) {
          var t, n;
          e = typeof e == "string" ? {name: e} : e, n = e.name, t = e.location, t && (o.paths[n] = e.location), o.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
        }), eachProp(u, function (e, t) {
          !e.inited && !e.map.unnormalized && (e.map = E(t))
        }), (e.deps || e.callback) && r.require(e.deps || [], e.callback)
      },
      makeShimExports: function (e) {
        function t() {
          var t;
          return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
        }

        return t
      },
      makeRequire: function (t, n) {
        function s(o, a, f) {
          var l, h, p;
          return n.enableBuildCallback && a && isFunction(a) && (a.__requireJsBuild = !0), typeof o == "string" ? isFunction(a) ? T(makeError("requireargs", "Invalid require call"), f) : t && hasProp(i, o) ? i[o](u[t.id]) : req.get ? req.get(r, o, t, s) : (h = E(o, t, !1, !0), l = h.id, hasProp(c, l) ? c[l] : T(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (_(), r.nextTick(function () {
            _(), p = S(E(null, t)), p.skipMap = n.skipMap, p.init(o, a, f, {enabled: !0}), L()
          }), s)
        }

        return n = n || {}, mixin(s, {
          isBrowser: isBrowser, toUrl: function (e) {
            var n, i = e.lastIndexOf("."), s = e.split("/")[0], o = s === "." || s === "..";
            return i !== -1 && (!o || i > 1) && (n = e.substring(i, e.length), e = e.substring(0, i)), r.nameToUrl(g(e, t && t.id, !0), n, !0)
          }, defined: function (e) {
            return hasProp(c, E(e, t, !1, !0).id)
          }, specified: function (e) {
            return e = E(e, t, !1, !0).id, hasProp(c, e) || hasProp(u, e)
          }
        }), t || (s.undef = function (e) {
          N();
          var n = E(e, t, !0), r = getOwn(u, e);
          y(e), delete c[e], delete h[n.url], delete f[e], eachReverse(l, function (t, n) {
            t[0] === e && l.splice(n, 1)
          }), r && (r.events.defined && (f[e] = r.events), C(e))
        }), s
      },
      enable: function (e) {
        var t = getOwn(u, e.id);
        t && S(e).enable()
      },
      completeLoad: function (e) {
        var t, n, r, i = getOwn(o.shim, e) || {}, s = i.exports;
        N();
        while (l.length) {
          n = l.shift();
          if (n[0] === null) {
            n[0] = e;
            if (t)break;
            t = !0
          } else n[0] === e && (t = !0);
          A(n)
        }
        r = getOwn(u, e);
        if (!t && !hasProp(c, e) && r && !r.inited) {
          if (o.enforceDefine && (!s || !getGlobal(s))) {
            if (b(e))return;
            return T(makeError("nodefine", "No define call for " + e, null, [e]))
          }
          A([e, i.deps || [], i.exportsFn])
        }
        L()
      },
      nameToUrl: function (e, t, n) {
        var i, s, u, a, f, l, c, h = getOwn(o.pkgs, e);
        h && (e = h), c = getOwn(p, e);
        if (c)return r.nameToUrl(c, t, n);
        if (req.jsExtRegExp.test(e))f = e + (t || ""); else {
          i = o.paths, s = e.split("/");
          for (u = s.length; u > 0; u -= 1) {
            a = s.slice(0, u).join("/"), l = getOwn(i, a);
            if (l) {
              isArray(l) && (l = l[0]), s.splice(0, u, l);
              break
            }
          }
          f = s.join("/"), f += t || (/^data\:|\?/.test(f) || n ? "" : ".js"), f = (f.charAt(0) === "/" || f.match(/^[\w\+\.\-]+:/) ? "" : o.baseUrl) + f
        }
        return o.urlArgs ? f + ((f.indexOf("?") === -1 ? "?" : "&") + o.urlArgs) : f
      },
      load: function (e, t) {
        req.load(r, e, t)
      },
      execCb: function (e, t, n, r) {
        return t.apply(r, n)
      },
      onScriptLoad: function (e) {
        if (e.type === "load" || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
          interactiveScript = null;
          var t = M(e);
          r.completeLoad(t.id)
        }
      },
      onScriptError: function (e) {
        var t = M(e);
        if (!b(t.id))return T(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
      }
    }, r.require = r.makeRequire(), r
  }

  function getInteractiveScript() {
    return interactiveScript && interactiveScript.readyState === "interactive" ? interactiveScript : (eachReverse(scripts(), function (e) {
      if (e.readyState === "interactive")return interactiveScript = e
    }), interactiveScript)
  }

  var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.15", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = typeof window != "undefined" && typeof navigator != "undefined" && !!window.document, isWebWorker = !isBrowser && typeof importScripts != "undefined", readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = typeof opera != "undefined" && opera.toString() === "[object Opera]", contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
  if (typeof define != "undefined")return;
  if (typeof requirejs != "undefined") {
    if (isFunction(requirejs))return;
    cfg = requirejs, requirejs = undefined
  }
  typeof require != "undefined" && !isFunction(require) && (cfg = require, require = undefined), req = requirejs = function (e, t, n, r) {
    var i, s, o = defContextName;
    return !isArray(e) && typeof e != "string" && (s = e, isArray(t) ? (e = t, t = n, n = r) : e = []), s && s.context && (o = s.context), i = getOwn(contexts, o), i || (i = contexts[o] = req.s.newContext(o)), s && i.configure(s), i.require(e, t, n)
  }, req.config = function (e) {
    return req(e)
  }, req.nextTick = typeof setTimeout != "undefined" ? function (e) {
    setTimeout(e, 4)
  } : function (e) {
    e()
  }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
    contexts: contexts,
    newContext: newContext
  }, req({}), each(["toUrl", "undef", "defined", "specified"], function (e) {
    req[e] = function () {
      var t = contexts[defContextName];
      return t.require[e].apply(t, arguments)
    }
  }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (e, t, n) {
    var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
    return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r
  }, req.load = function (e, t, n) {
    var r = e && e.config || {}, i;
    if (isBrowser)return i = req.createNode(r, t, n), i.setAttribute("data-requirecontext", e.contextName), i.setAttribute("data-requiremodule", t), i.attachEvent && !(i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0) && !isOpera ? (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)) : (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)), i.src = n, currentlyAddingScript = i, baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i), currentlyAddingScript = null, i;
    if (isWebWorker)try {
      e.completeLoad(t)
    } catch (s) {
      e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, s, [t]))
    }
  }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (e) {
    head || (head = e.parentNode), dataMain = e.getAttribute("data-main");
    if (dataMain)return mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
  }), define = function (e, t, n) {
    var r, i;
    typeof e != "string" && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (e, n) {
      t.push(n)
    }), t = (n.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([e, t, n])
  }, define.amd = {jQuery: !0}, req.exec = function (text) {
    return eval(text)
  }, req(cfg)
})(this), define("requireLib", function () {
}), define("parser/xdot", [], function () {
  var e = function () {
    function e(e, t) {
      function n() {
        this.constructor = e
      }

      n.prototype = t.prototype, e.prototype = new n
    }

    function t(e, t, n, r, i, s) {
      this.message = e, this.expected = t, this.found = n, this.offset = r, this.line = i, this.column = s, this.name = "SyntaxError"
    }

    function n(e) {
      function lr() {
        return e.substring(rr, nr)
      }

      function cr() {
        return rr
      }

      function hr() {
        return mr(rr).line
      }

      function pr() {
        return mr(rr).column
      }

      function dr(e) {
        throw yr(null, [{type: "other", description: e}], rr)
      }

      function vr(e) {
        throw yr(e, null, rr)
      }

      function mr(t) {
        function n(t, n, r) {
          var i, s;
          for (i = n; i < r; i++)s = e.charAt(i), s === "\n" ? (t.seenCR || t.line++, t.column = 1, t.seenCR = !1) : s === "\r" || s === "\u2028" || s === "\u2029" ? (t.line++, t.column = 1, t.seenCR = !0) : (t.column++, t.seenCR = !1)
        }

        return ir !== t && (ir > t && (ir = 0, sr = {line: 1, column: 1, seenCR: !1}), n(sr, ir, t), ir = t), sr
      }

      function gr(e) {
        if (nr < or)return;
        nr > or && (or = nr, ur = []), ur.push(e)
      }

      function yr(n, r, i) {
        function s(e) {
          var t = 1;
          e.sort(function (e, t) {
            return e.description < t.description ? -1 : e.description > t.description ? 1 : 0
          });
          while (t < e.length)e[t - 1] === e[t] ? e.splice(t, 1) : t++
        }

        function o(e, t) {
          function n(e) {
            function t(e) {
              return e.charCodeAt(0).toString(16).toUpperCase()
            }

            return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (e) {
              return "\\x0" + t(e)
            }).replace(/[\x10-\x1F\x80-\xFF]/g, function (e) {
              return "\\x" + t(e)
            }).replace(/[\u0180-\u0FFF]/g, function (e) {
              return "\\u0" + t(e)
            }).replace(/[\u1080-\uFFFF]/g, function (e) {
              return "\\u" + t(e)
            })
          }

          var r = new Array(e.length), i, s, o;
          for (o = 0; o < e.length; o++)r[o] = e[o].description;
          return i = e.length > 1 ? r.slice(0, -1).join(", ") + " or " + r[e.length - 1] : r[0], s = t ? '"' + n(t) + '"' : "end of input", "Expected " + i + " but " + s + " found."
        }

        var u = mr(i), a = i < e.length ? e.charAt(i) : null;
        return r !== null && s(r), new t(n !== null ? n : o(r, a), r, a, i, u.line, u.column)
      }

      function br() {
        var t, n, i, s, c, h;
        return t = nr, n = wr(), n === r && (n = u), n !== r ? (e.substr(nr, 7) === a ? (i = a, nr += 7) : (i = r, ar === 0 && gr(f)), i !== r ? (s = nr, c = pi(), c !== r ? (h = ti(), h !== r ? (c = [c, h], s = c) : (nr = s, s = o)) : (nr = s, s = o), s === r && (s = u), s !== r ? (c = pi(), c !== r ? (h = Er(), h !== r ? (rr = t, n = l(i, s, h), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function wr() {
        var t, n, i, s, u, a;
        t = nr, n = [], i = nr, e.charCodeAt(nr) === 35 ? (s = h, nr++) : (s = r, ar === 0 && gr(p));
        if (s !== r) {
          u = [], d.test(e.charAt(nr)) ? (a = e.charAt(nr), nr++) : (a = r, ar === 0 && gr(v));
          while (a !== r)u.push(a), d.test(e.charAt(nr)) ? (a = e.charAt(nr), nr++) : (a = r, ar === 0 && gr(v));
          u !== r ? (a = ci(), a !== r ? (s = [s, u, a], i = s) : (nr = i, i = o)) : (nr = i, i = o)
        } else nr = i, i = o;
        if (i !== r)while (i !== r) {
          n.push(i), i = nr, e.charCodeAt(nr) === 35 ? (s = h, nr++) : (s = r, ar === 0 && gr(p));
          if (s !== r) {
            u = [], d.test(e.charAt(nr)) ? (a = e.charAt(nr), nr++) : (a = r, ar === 0 && gr(v));
            while (a !== r)u.push(a), d.test(e.charAt(nr)) ? (a = e.charAt(nr), nr++) : (a = r, ar === 0 && gr(v));
            u !== r ? (a = ci(), a !== r ? (s = [s, u, a], i = s) : (nr = i, i = o)) : (nr = i, i = o)
          } else nr = i, i = o
        } else n = o;
        return n !== r ? (i = ci(), i !== r ? (n = [n, i], t = n) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function Er() {
        var t, n, i, s, u, a;
        t = nr, e.charCodeAt(nr) === 123 ? (n = m, nr++) : (n = r, ar === 0 && gr(g));
        if (n !== r) {
          i = [], s = Sr();
          if (s !== r)while (s !== r)i.push(s), s = Sr(); else i = o;
          if (i !== r) {
            e.charCodeAt(nr) === 125 ? (s = y, nr++) : (s = r, ar === 0 && gr(b));
            if (s !== r) {
              u = [], a = hi();
              while (a !== r)u.push(a), a = hi();
              u !== r ? (rr = t, n = w(i), t = n) : (nr = t, t = o)
            } else nr = t, t = o
          } else nr = t, t = o
        } else nr = t, t = o;
        return t
      }

      function Sr() {
        var e, t, n;
        e = nr, t = [], n = hi();
        while (n !== r)t.push(n), n = hi();
        return t !== r ? (n = xr(), n === r && (n = Nr(), n === r && (n = Lr(), n === r && (n = kr(), n === r && (n = Cr(), n === r && (n = Tr()))))), n !== r ? (rr = e, t = E(n), e = t) : (nr = e, e = o)) : (nr = e, e = o), e
      }

      function xr() {
        var t, n, i, s, u, a;
        t = nr, e.substr(nr, 4) === S ? (n = S, nr += 4) : (n = r, ar === 0 && gr(x));
        if (n !== r) {
          i = Ar();
          if (i !== r) {
            e.charCodeAt(nr) === 59 ? (s = T, nr++) : (s = r, ar === 0 && gr(N));
            if (s !== r) {
              u = [], a = hi();
              if (a !== r)while (a !== r)u.push(a), a = hi(); else u = o;
              u !== r ? (rr = t, n = C(n, i), t = n) : (nr = t, t = o)
            } else nr = t, t = o
          } else nr = t, t = o
        } else nr = t, t = o;
        return t
      }

      function Tr() {
        var e, t;
        return e = nr, t = Er(), t !== r && (rr = e, t = k(t)), e = t, e
      }

      function Nr() {
        var t, n, i, s, u, a;
        t = nr, e.substr(nr, 5) === L ? (n = L, nr += 5) : (n = r, ar === 0 && gr(A));
        if (n !== r) {
          i = Ar();
          if (i !== r) {
            e.charCodeAt(nr) === 59 ? (s = T, nr++) : (s = r, ar === 0 && gr(N));
            if (s !== r) {
              u = [], a = hi();
              if (a !== r)while (a !== r)u.push(a), a = hi(); else u = o;
              u !== r ? (rr = t, n = O(n, i), t = n) : (nr = t, t = o)
            } else nr = t, t = o
          } else nr = t, t = o
        } else nr = t, t = o;
        return t
      }

      function Cr() {
        var t, n, i, s, u, a;
        return t = nr, e.substr(nr, 8) === M ? (n = M, nr += 8) : (n = r, ar === 0 && gr(_)), n !== r ? (i = pi(), i !== r ? (s = ti(), s !== r ? (u = pi(), u !== r ? (a = Er(), a !== r ? (rr = t, n = D(n, s, a), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function kr() {
        var t, n, i, s, u, a, f, l, c, h;
        t = nr, n = ti();
        if (n !== r) {
          i = pi();
          if (i !== r) {
            e.substr(nr, 2) === P ? (s = P, nr += 2) : (s = r, ar === 0 && gr(H));
            if (s !== r) {
              u = pi();
              if (u !== r) {
                a = ti();
                if (a !== r) {
                  f = Ar();
                  if (f !== r) {
                    e.charCodeAt(nr) === 59 ? (l = T, nr++) : (l = r, ar === 0 && gr(N));
                    if (l !== r) {
                      c = [], h = hi();
                      if (h !== r)while (h !== r)c.push(h), h = hi(); else c = o;
                      c !== r ? (rr = t, n = B(n, a, f), t = n) : (nr = t, t = o)
                    } else nr = t, t = o
                  } else nr = t, t = o
                } else nr = t, t = o
              } else nr = t, t = o
            } else nr = t, t = o
          } else nr = t, t = o
        } else nr = t, t = o;
        return t
      }

      function Lr() {
        var t, n, i, s, a, f;
        t = nr, n = ti();
        if (n !== r) {
          i = Ar(), i === r && (i = u);
          if (i !== r) {
            e.charCodeAt(nr) === 59 ? (s = T, nr++) : (s = r, ar === 0 && gr(N));
            if (s !== r) {
              a = [], f = hi();
              if (f !== r)while (f !== r)a.push(f), f = hi(); else a = o;
              a !== r ? (rr = t, n = j(n, i), t = n) : (nr = t, t = o)
            } else nr = t, t = o
          } else nr = t, t = o
        } else nr = t, t = o;
        return t
      }

      function Ar() {
        var t, n, i, s, u, a, f, l, c;
        t = nr, n = [], i = pi();
        if (i !== r)while (i !== r)n.push(i), i = pi(); else n = o;
        if (n !== r) {
          e.charCodeAt(nr) === 91 ? (i = F, nr++) : (i = r, ar === 0 && gr(I));
          if (i !== r) {
            s = Or();
            if (s !== r) {
              u = [], a = nr, e.charCodeAt(nr) === 44 ? (f = q, nr++) : (f = r, ar === 0 && gr(R));
              if (f !== r) {
                l = [], c = hi();
                if (c !== r)while (c !== r)l.push(c), c = hi(); else l = o;
                l !== r ? (c = Or(), c !== r ? (rr = a, f = U(c), a = f) : (nr = a, a = o)) : (nr = a, a = o)
              } else nr = a, a = o;
              while (a !== r) {
                u.push(a), a = nr, e.charCodeAt(nr) === 44 ? (f = q, nr++) : (f = r, ar === 0 && gr(R));
                if (f !== r) {
                  l = [], c = hi();
                  if (c !== r)while (c !== r)l.push(c), c = hi(); else l = o;
                  l !== r ? (c = Or(), c !== r ? (rr = a, f = U(c), a = f) : (nr = a, a = o)) : (nr = a, a = o)
                } else nr = a, a = o
              }
              if (u !== r) {
                a = [], f = pi();
                while (f !== r)a.push(f), f = pi();
                a !== r ? (e.charCodeAt(nr) === 93 ? (f = z, nr++) : (f = r, ar === 0 && gr(W)), f !== r ? (rr = t, n = X(s, u), t = n) : (nr = t, t = o)) : (nr = t, t = o)
              } else nr = t, t = o
            } else nr = t, t = o
          } else nr = t, t = o
        } else nr = t, t = o;
        return t
      }

      function Or() {
        var e, t;
        return e = Br(), e === r && (e = _r(), e === r && (e = Mr(), e === r && (e = nr, t = Dr(), t === r && (t = Pr(), t === r && (t = Hr())), t !== r && (rr = e, t = V(t)), e = t))), e
      }

      function Mr() {
        var t, n, i, s, u, a;
        return t = nr, e.substr(nr, 5) === $ ? (n = $, nr += 5) : (n = r, ar === 0 && gr(J)), n !== r ? (e.charCodeAt(nr) === 61 ? (i = K, nr++) : (i = r, ar === 0 && gr(Q)), i !== r ? (s = fi(), s !== r ? (u = ui(), u !== r ? (a = fi(), a !== r ? (rr = t, n = G(u), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function _r() {
        var t, n, i, s, u, a, f, l;
        return t = nr, e.substr(nr, 4) === Y ? (n = Y, nr += 4) : (n = r, ar === 0 && gr(Z)), n !== r ? (e.charCodeAt(nr) === 61 ? (i = K, nr++) : (i = r, ar === 0 && gr(Q)), i !== r ? (s = fi(), s !== r ? (u = ii(), u !== r ? (e.charCodeAt(nr) === 44 ? (a = q, nr++) : (a = r, ar === 0 && gr(R)), a !== r ? (f = ii(), f !== r ? (l = fi(), l !== r ? (rr = t, n = et(u, f), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function Dr() {
        var t, n, i, s;
        return t = nr, e.substr(nr, 5) === tt ? (n = tt, nr += 5) : (n = r, ar === 0 && gr(nt)), n === r && (e.substr(nr, 5) === rt ? (n = rt, nr += 5) : (n = r, ar === 0 && gr(it)), n === r && (e.substr(nr, 6) === st ? (n = st, nr += 6) : (n = r, ar === 0 && gr(ot)), n === r && (e.substr(nr, 2) === ut ? (n = ut, nr += 2) : (n = r, ar === 0 && gr(at)), n === r && (e.substr(nr, 3) === ft ? (n = ft, nr += 3) : (n = r, ar === 0 && gr(lt)), n === r && (e.substr(nr, 11) === ct ? (n = ct, nr += 11) : (n = r, ar === 0 && gr(ht))))))), n !== r ? (e.charCodeAt(nr) === 61 ? (i = K, nr++) : (i = r, ar === 0 && gr(Q)), i !== r ? (s = oi(), s !== r ? (rr = t, n = pt(n), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function Pr() {
        var t, n, i, s;
        return t = nr, e.substr(nr, 5) === dt ? (n = dt, nr += 5) : (n = r, ar === 0 && gr(vt)), n === r && (e.substr(nr, 5) === mt ? (n = mt, nr += 5) : (n = r, ar === 0 && gr(gt)), n === r && (e.substr(nr, 5) === yt ? (n = yt, nr += 5) : (n = r, ar === 0 && gr(bt)))), n !== r ? (e.charCodeAt(nr) === 61 ? (i = K, nr++) : (i = r, ar === 0 && gr(Q)), i !== r ? (s = si(), s !== r ? (rr = t, n = pt(n), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function Hr() {
        var t, n, i, s;
        return t = nr, n = ti(), n !== r ? (e.charCodeAt(nr) === 61 ? (i = K, nr++) : (i = r, ar === 0 && gr(Q)), i !== r ? (s = oi(), s !== r ? (rr = t, n = wt(n), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function Br() {
        var t, n, i, s, u, a, f;
        t = nr, e.charCodeAt(nr) === 95 ? (n = Et, nr++) : (n = r, ar === 0 && gr(St));
        if (n !== r) {
          e.substr(nr, 4) === xt ? (i = xt, nr += 4) : (i = r, ar === 0 && gr(Tt)), i === r && (e.substr(nr, 5) === Nt ? (i = Nt, nr += 5) : (i = r, ar === 0 && gr(Ct)), i === r && (e.substr(nr, 5) === kt ? (i = kt, nr += 5) : (i = r, ar === 0 && gr(Lt)), i === r && (e.substr(nr, 5) === At ? (i = At, nr += 5) : (i = r, ar === 0 && gr(Ot)), i === r && (e.substr(nr, 6) === Mt ? (i = Mt, nr += 6) : (i = r, ar === 0 && gr(_t)), i === r && (e.substr(nr, 6) === Dt ? (i = Dt, nr += 6) : (i = r, ar === 0 && gr(Pt)))))));
          if (i !== r) {
            e.substr(nr, 2) === Ht ? (s = Ht, nr += 2) : (s = r, ar === 0 && gr(Bt));
            if (s !== r) {
              u = fi();
              if (u !== r) {
                a = [], f = jr();
                if (f !== r)while (f !== r)a.push(f), f = jr(); else a = o;
                a !== r ? (f = fi(), f !== r ? (rr = t, n = jt(i, a), t = n) : (nr = t, t = o)) : (nr = t, t = o)
              } else nr = t, t = o
            } else nr = t, t = o
          } else nr = t, t = o
        } else nr = t, t = o;
        return t
      }

      function jr() {
        var e, t, n, i, s;
        return e = nr, t = Fr(), t === r && (t = u), t !== r ? (n = pi(), n !== r ? (i = qr(), i !== r ? (s = pi(), s !== r ? (rr = e, t = Ft(t, i), e = t) : (nr = e, e = o)) : (nr = e, e = o)) : (nr = e, e = o)) : (nr = e, e = o), e
      }

      function Fr() {
        var e, t, n, i, s, u;
        e = nr, t = Ir();
        if (t !== r) {
          n = [], i = nr, s = pi(), s !== r ? (u = Ir(), u !== r ? (rr = i, s = It(u), i = s) : (nr = i, i = o)) : (nr = i, i = o);
          while (i !== r)n.push(i), i = nr, s = pi(), s !== r ? (u = Ir(), u !== r ? (rr = i, s = It(u), i = s) : (nr = i, i = o)) : (nr = i, i = o);
          n !== r ? (rr = e, t = qt(t, n), e = t) : (nr = e, e = o)
        } else nr = e, e = o;
        return e
      }

      function Ir() {
        var e;
        return e = Vr(), e === r && (e = $r(), e === r && (e = Kr(), e === r && (e = Jr()))), e
      }

      function qr() {
        var e;
        return e = Ur(), e === r && (e = zr(), e === r && (e = Rr(), e === r && (e = Wr(), e === r && (e = Xr())))), e
      }

      function Rr() {
        var t, n, i, s, u, a, f;
        return t = nr, Rt.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(Ut)), n !== r ? (i = ei(), i !== r ? (s = pi(), s !== r ? (u = ri(), u !== r ? (a = pi(), a !== r ? (f = ri(), f !== r ? (rr = t, n = zt(i, u, f), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function Ur() {
        var t, n, i, s, u, a;
        t = nr, Wt.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(Xt));
        if (n !== r) {
          i = pi();
          if (i !== r) {
            s = ri();
            if (s !== r) {
              u = [], a = ei();
              if (a !== r)while (a !== r)u.push(a), a = ei(); else u = o;
              u !== r ? (rr = t, n = Vt(n, s, u), t = n) : (nr = t, t = o)
            } else nr = t, t = o
          } else nr = t, t = o
        } else nr = t, t = o;
        return t
      }

      function zr() {
        var t, n, i, s, u, a;
        t = nr, $t.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(Jt));
        if (n !== r) {
          i = pi();
          if (i !== r) {
            s = ri();
            if (s !== r) {
              u = [], a = ei();
              if (a !== r)while (a !== r)u.push(a), a = ei(); else u = o;
              u !== r ? (rr = t, n = Kt(u), t = n) : (nr = t, t = o)
            } else nr = t, t = o
          } else nr = t, t = o
        } else nr = t, t = o;
        return t
      }

      function Wr() {
        var t, n, i, s, u, a;
        t = nr, Qt.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(Gt));
        if (n !== r) {
          i = pi();
          if (i !== r) {
            s = ri();
            if (s !== r) {
              u = [], a = ei();
              if (a !== r)while (a !== r)u.push(a), a = ei(); else u = o;
              u !== r ? (rr = t, n = Yt(u), t = n) : (nr = t, t = o)
            } else nr = t, t = o
          } else nr = t, t = o
        } else nr = t, t = o;
        return t
      }

      function Xr() {
        var t, n, i, s, u, a, f, l, c;
        return t = nr, Zt.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(en)), n !== r ? (i = ei(), i !== r ? (s = pi(), s !== r ? (u = ri(), u !== r ? (a = pi(), a !== r ? (f = ri(), f !== r ? (l = pi(), l !== r ? (c = Qr(), c !== r ? (rr = t, n = tn(i, c), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function Vr() {
        var t, n, i, s;
        return t = nr, nn.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(rn)), n !== r ? (i = pi(), i !== r ? (s = Qr(), s !== r ? (rr = t, n = sn(n, s), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function $r() {
        var t, n, i, s, u, a;
        return t = nr, on.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(un)), n !== r ? (i = pi(), i !== r ? (s = ii(), s !== r ? (u = pi(), u !== r ? (a = Qr(), a !== r ? (rr = t, n = an(n, s, a), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function Jr() {
        var t, n, i, s;
        return t = nr, fn.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(ln)), n !== r ? (i = pi(), i !== r ? (s = ri(), s !== r ? (rr = t, n = cn(s), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function Kr() {
        var t, n, i, s;
        return t = nr, hn.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(pn)), n !== r ? (i = pi(), i !== r ? (s = Qr(), s !== r ? (rr = t, n = dn(s), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function Qr() {
        var t, n, i, s, u;
        return t = nr, n = Gr(), n !== r ? (i = pi(), i !== r ? (e.charCodeAt(nr) === 45 ? (s = vn, nr++) : (s = r, ar === 0 && gr(mn)), s !== r ? (u = Yr(), u !== r ? (rr = t, n = gn(n, u), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function Gr() {
        var e, t;
        return e = nr, t = ri(), t !== r && (rr = e, t = yn(t)), e = t, e
      }

      function Yr() {
        var e, t, n;
        return rr = nr, e = bn(), e ? e = wn : e = o, e === r && (e = nr, t = Zr(), t !== r ? (n = Yr(), n !== r ? (rr = e, t = En(t, n), e = t) : (nr = e, e = o)) : (nr = e, e = o)), e
      }

      function Zr() {
        var t, n, i;
        return t = nr, n = di(), n === r && (n = u), n !== r ? (e.length > nr ? (i = e.charAt(nr), nr++) : (i = r, ar === 0 && gr(Sn)), i !== r ? (rr = t, n = xn(i), t = n) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function ei() {
        var e, t, n, i, s;
        return e = nr, t = pi(), t !== r ? (n = ri(), n !== r ? (i = pi(), i !== r ? (s = ri(), s !== r ? (rr = e, t = Tn(n, s), e = t) : (nr = e, e = o)) : (nr = e, e = o)) : (nr = e, e = o)) : (nr = e, e = o), e
      }

      function ti() {
        var t, n, i, s;
        t = nr, n = nr, i = [], s = li();
        if (s !== r)while (s !== r)i.push(s), s = li(); else i = o;
        return i !== r && (i = e.substring(n, nr)), n = i, n !== r ? (i = ni(), i === r && (i = u), i !== r ? (rr = t, n = It(n), t = n) : (nr = t, t = o)) : (nr = t, t = o), t === r && (t = nr, e.charCodeAt(nr) === 34 ? (n = Nn, nr++) : (n = r, ar === 0 && gr(Cn)), n !== r ? (i = nr, s = ui(), s !== r && (s = e.substring(i, nr)), i = s, i !== r ? (e.charCodeAt(nr) === 34 ? (s = Nn, nr++) : (s = r, ar === 0 && gr(Cn)), s !== r ? (rr = t, n = It(i), t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o)), t
      }

      function ni() {
        var t, n, i;
        return t = nr, e.charCodeAt(nr) === 58 ? (n = kn, nr++) : (n = r, ar === 0 && gr(Ln)), n !== r ? (i = ti(), i !== r ? (n = [n, i], t = n) : (nr = t, t = o)) : (nr = t, t = o), t
      }

      function ri() {
        var t, n, i, s, a;
        t = nr, e.charCodeAt(nr) === 45 ? (n = vn, nr++) : (n = r, ar === 0 && gr(mn)), n === r && (n = u);
        if (n !== r) {
          i = nr, s = [], An.test(e.charAt(nr)) ? (a = e.charAt(nr), nr++) : (a = r, ar === 0 && gr(On));
          if (a !== r)while (a !== r)s.push(a), An.test(e.charAt(nr)) ? (a = e.charAt(nr), nr++) : (a = r, ar === 0 && gr(On)); else s = o;
          s !== r && (s = e.substring(i, nr)), i = s, i !== r ? (rr = t, n = Mn(i), t = n) : (nr = t, t = o)
        } else nr = t, t = o;
        return t
      }

      function ii() {
        var t, n, i, s, a, f, l, c;
        t = nr, e.charCodeAt(nr) === 45 ? (n = vn, nr++) : (n = r, ar === 0 && gr(mn)), n === r && (n = u);
        if (n !== r) {
          i = nr, s = [], An.test(e.charAt(nr)) ? (a = e.charAt(nr), nr++) : (a = r, ar === 0 && gr(On));
          if (a !== r)while (a !== r)s.push(a), An.test(e.charAt(nr)) ? (a = e.charAt(nr), nr++) : (a = r, ar === 0 && gr(On)); else s = o;
          s !== r && (s = e.substring(i, nr)), i = s;
          if (i !== r) {
            s = nr, e.charCodeAt(nr) === 46 ? (a = _n, nr++) : (a = r, ar === 0 && gr(Dn));
            if (a !== r) {
              f = nr, l = [], An.test(e.charAt(nr)) ? (c = e.charAt(nr), nr++) : (c = r, ar === 0 && gr(On));
              if (c !== r)while (c !== r)l.push(c), An.test(e.charAt(nr)) ? (c = e.charAt(nr), nr++) : (c = r, ar === 0 && gr(On)); else l = o;
              l !== r && (l = e.substring(f, nr)), f = l, f !== r ? (rr = s, a = Pn(f), s = a) : (nr = s, s = o)
            } else nr = s, s = o;
            s === r && (s = u), s !== r ? (rr = t, n = Hn(i, s), t = n) : (nr = t, t = o)
          } else nr = t, t = o
        } else nr = t, t = o;
        return t
      }

      function si() {
        var t, n;
        t = [], Bn.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(jn));
        if (n !== r)while (n !== r)t.push(n), Bn.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(jn)); else t = o;
        return t
      }

      function oi() {
        var t, n, i, s, u, a, f;
        t = nr, e.charCodeAt(nr) === 34 ? (n = Nn, nr++) : (n = r, ar === 0 && gr(Cn)), n !== r ? (i = ui(), i !== r ? (e.charCodeAt(nr) === 34 ? (s = Nn, nr++) : (s = r, ar === 0 && gr(Cn)), s !== r ? (n = [n, i, s], t = n) : (nr = t, t = o)) : (nr = t, t = o)) : (nr = t, t = o);
        if (t === r) {
          t = nr, e.substr(nr, 2) === Fn ? (n = Fn, nr += 2) : (n = r, ar === 0 && gr(In));
          if (n !== r) {
            i = [], s = nr, qn.test(e.charAt(nr)) ? (u = e.charAt(nr), nr++) : (u = r, ar === 0 && gr(Rn));
            if (u !== r) {
              a = [], qn.test(e.charAt(nr)) ? (f = e.charAt(nr), nr++) : (f = r, ar === 0 && gr(Rn));
              while (f !== r)a.push(f), qn.test(e.charAt(nr)) ? (f = e.charAt(nr), nr++) : (f = r, ar === 0 && gr(Rn));
              a !== r ? (e.charCodeAt(nr) === 62 ? (f = Un, nr++) : (f = r, ar === 0 && gr(zn)), f !== r ? (u = [u, a, f], s = u) : (nr = s, s = o)) : (nr = s, s = o)
            } else nr = s, s = o;
            while (s !== r) {
              i.push(s), s = nr, qn.test(e.charAt(nr)) ? (u = e.charAt(nr), nr++) : (u = r, ar === 0 && gr(Rn));
              if (u !== r) {
                a = [], qn.test(e.charAt(nr)) ? (f = e.charAt(nr), nr++) : (f = r, ar === 0 && gr(Rn));
                while (f !== r)a.push(f), qn.test(e.charAt(nr)) ? (f = e.charAt(nr), nr++) : (f = r, ar === 0 && gr(Rn));
                a !== r ? (e.charCodeAt(nr) === 62 ? (f = Un, nr++) : (f = r, ar === 0 && gr(zn)), f !== r ? (u = [u, a, f], s = u) : (nr = s, s = o)) : (nr = s, s = o)
              } else nr = s, s = o
            }
            i !== r ? (e.charCodeAt(nr) === 62 ? (s = Un, nr++) : (s = r, ar === 0 && gr(zn)), s !== r ? (n = [n, i, s], t = n) : (nr = t, t = o)) : (nr = t, t = o)
          } else nr = t, t = o;
          t === r && (t = si())
        }
        return t
      }

      function ui() {
        var t, n;
        t = [], Wn.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(Xn));
        while (n !== r)t.push(n), Wn.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(Xn));
        return t
      }

      function ai() {
        var t;
        return Vn.test(e.charAt(nr)) ? (t = e.charAt(nr), nr++) : (t = r, ar === 0 && gr($n)), t
      }

      function fi() {
        var t;
        return e.charCodeAt(nr) === 34 ? (t = Nn, nr++) : (t = r, ar === 0 && gr(Cn)), t
      }

      function li() {
        var t;
        return Jn.test(e.charAt(nr)) ? (t = e.charAt(nr), nr++) : (t = r, ar === 0 && gr(Kn)), t
      }

      function ci() {
        var t;
        return Qn.test(e.charAt(nr)) ? (t = e.charAt(nr), nr++) : (t = r, ar === 0 && gr(Gn)), t
      }

      function hi() {
        var t;
        return Yn.test(e.charAt(nr)) ? (t = e.charAt(nr), nr++) : (t = r, ar === 0 && gr(Zn)), t
      }

      function pi() {
        var e, t, n;
        return e = nr, t = hi(), t !== r ? (n = di(), n === r && (n = u), n !== r ? (t = [t, n], e = t) : (nr = e, e = o)) : (nr = e, e = o), e === r && (e = nr, t = di(), t === r && (t = u), t !== r ? (n = hi(), n !== r ? (t = [t, n], e = t) : (nr = e, e = o)) : (nr = e, e = o)), e
      }

      function di() {
        var t, n, i, s;
        t = nr, er.test(e.charAt(nr)) ? (n = e.charAt(nr), nr++) : (n = r, ar === 0 && gr(tr));
        if (n !== r) {
          i = [], s = ci();
          if (s !== r)while (s !== r)i.push(s), s = ci(); else i = o;
          i !== r ? (n = [n, i], t = n) : (nr = t, t = o)
        } else nr = t, t = o;
        return t
      }

      var n = arguments.length > 1 ? arguments[1] : {}, r = {}, i = {dot: br}, s = br, o = r, u = null, a = "digraph", f = {
        type: "literal",
        value: "digraph",
        description: '"digraph"'
      }, l = function (e, t, n) {
        return {type: e, id: t == null ? null : t[1], commands: n}
      }, c = [], h = "#", p = {type: "literal", value: "#", description: '"#"'}, d = /^[^\n]/, v = {
        type: "class",
        value: "[^\\n]",
        description: "[^\\n]"
      }, m = "{", g = {type: "literal", value: "{", description: '"{"'}, y = "}", b = {
        type: "literal",
        value: "}",
        description: '"}"'
      }, w = function (e) {
        return e
      }, E = function (e) {
        return e
      }, S = "node", x = {type: "literal", value: "node", description: '"node"'}, T = ";", N = {
        type: "literal",
        value: ";",
        description: '";"'
      }, C = function (e, t) {
        return {type: "skip", attributes: t}
      }, k = function (e) {
        return {type: "struct", commands: e}
      }, L = "graph", A = {type: "literal", value: "graph", description: '"graph"'}, O = function (e, t) {
        return {type: e, attributes: t}
      }, M = "subgraph", _ = {type: "literal", value: "subgraph", description: '"subgraph"'}, D = function (e, t, n) {
        return {type: e, id: t, commands: n}
      }, P = "->", H = {type: "literal", value: "->", description: '"->"'}, B = function (e, t, n) {
        return {type: "relation", id: [e, t].join("-"), from: e, to: t, attributes: n}
      }, j = function (e, t) {
        return {type: "node", id: e, attributes: t}
      }, F = "[", I = {type: "literal", value: "[", description: '"["'}, q = ",", R = {
        type: "literal",
        value: ",",
        description: '","'
      }, U = function (e) {
        return e
      }, z = "]", W = {type: "literal", value: "]", description: '"]"'}, X = function (e, t) {
        return t != null ? [e].concat(t) : [e]
      }, V = function (e) {
        return e.type = "skip", e
      }, $ = "image", J = {type: "literal", value: "image", description: '"image"'}, K = "=", Q = {
        type: "literal",
        value: "=",
        description: '"="'
      }, G = function (e) {
        return {type: "image", value: e.join("")}
      }, Y = "size", Z = {type: "literal", value: "size", description: '"size"'}, et = function (e, t) {
        return {type: "size", value: [e, t]}
      }, tt = "label", nt = {
        type: "literal",
        value: "label",
        description: '"label"'
      }, rt = "width", it = {
        type: "literal",
        value: "width",
        description: '"width"'
      }, st = "height", ot = {
        type: "literal",
        value: "height",
        description: '"height"'
      }, ut = "bb", at = {type: "literal", value: "bb", description: '"bb"'}, ft = "pos", lt = {
        type: "literal",
        value: "pos",
        description: '"pos"'
      }, ct = "xdotversion", ht = {
        type: "literal",
        value: "xdotversion",
        description: '"xdotversion"'
      }, pt = function (e) {
        return {name: e}
      }, dt = "style", vt = {
        type: "literal",
        value: "style",
        description: '"style"'
      }, mt = "shape", gt = {
        type: "literal",
        value: "shape",
        description: '"shape"'
      }, yt = "color", bt = {type: "literal", value: "color", description: '"color"'}, wt = function (e) {
        return {name: e}
      }, Et = "_", St = {type: "literal", value: "_", description: '"_"'}, xt = "draw", Tt = {
        type: "literal",
        value: "draw",
        description: '"draw"'
      }, Nt = "ldraw", Ct = {
        type: "literal",
        value: "ldraw",
        description: '"ldraw"'
      }, kt = "hdraw", Lt = {
        type: "literal",
        value: "hdraw",
        description: '"hdraw"'
      }, At = "tdraw", Ot = {
        type: "literal",
        value: "tdraw",
        description: '"tdraw"'
      }, Mt = "hldraw", _t = {
        type: "literal",
        value: "hldraw",
        description: '"hldraw"'
      }, Dt = "tldraw", Pt = {
        type: "literal",
        value: "tldraw",
        description: '"tldraw"'
      }, Ht = "_=", Bt = {type: "literal", value: "_=", description: '"_="'}, jt = function (e, t) {
        return {type: e, elements: t}
      }, Ft = function (e, t) {
        return t.style = e, t
      }, It = function (e) {
        return e
      }, qt = function (e, t) {
        return [].concat(e).concat(t)
      }, Rt = /^[eE]/, Ut = {type: "class", value: "[eE]", description: "[eE]"}, zt = function (e, t, n) {
        return {shape: "ellipse", cx: e[0], cy: e[1], rx: t, ry: n}
      }, Wt = /^[pP]/, Xt = {type: "class", value: "[pP]", description: "[pP]"}, Vt = function (e, t, n) {
        return {shape: "polygon", points: n}
      }, $t = /^[L]/, Jt = {type: "class", value: "[L]", description: "[L]"}, Kt = function (e) {
        return {shape: "polyline", points: e}
      }, Qt = /^[bB]/, Gt = {type: "class", value: "[bB]", description: "[bB]"}, Yt = function (e) {
        return {shape: "bspline", points: e}
      }, Zt = /^[T]/, en = {type: "class", value: "[T]", description: "[T]"}, tn = function (e, t) {
        return {x: e[0], y: e[1], text: t}
      }, nn = /^[Cc]/, rn = {type: "class", value: "[Cc]", description: "[Cc]"}, sn = function (e, t) {
        var n = [parseInt(t.substr(1, 2), 16), parseInt(t.substr(3, 2), 16), parseInt(t.substr(5, 2), 16), t.length == 8 ? parseInt(t.substr(7, 2), 16) / 255 : "1"], r = "rgba(" + n.join(",") + ")";
        return e == "C" ? {key: "fill", value: r} : {key: "stroke", value: r}
      }, on = /^[F]/, un = {type: "class", value: "[F]", description: "[F]"}, an = function (e, t, n) {
        return [{key: "font-family", value: "'" + n + "',serif"}, {key: "font-size", value: t}]
      }, fn = /^[t]/, ln = {type: "class", value: "[t]", description: "[t]"}, cn = function (e) {
        return {key: "text-decoration", value: e}
      }, hn = /^[S]/, pn = {type: "class", value: "[S]", description: "[S]"}, dn = function (e) {
        return {key: "style", value: e}
      }, vn = "-", mn = {type: "literal", value: "-", description: '"-"'}, gn = function (e, t) {
        return counter = e, t
      }, yn = function (e) {
        counter = e
      }, bn = function () {
        return counter == 0
      }, wn = void 0, En = function (e, t) {
        return e + (t || "")
      }, Sn = {type: "any", description: "any character"}, xn = function (e) {
        return counter--, e
      }, Tn = function (e, t) {
        return [e, t]
      }, Nn = '"', Cn = {type: "literal", value: '"', description: '"\\""'}, kn = ":", Ln = {
        type: "literal",
        value: ":",
        description: '":"'
      }, An = /^[0-9]/, On = {type: "class", value: "[0-9]", description: "[0-9]"}, Mn = function (e) {
        return parseInt(e)
      }, _n = ".", Dn = {type: "literal", value: ".", description: '"."'}, Pn = function (e) {
        return "." + e
      }, Hn = function (e, t) {
        return parseFloat(e + (t || ""))
      }, Bn = /^[^,\]]/, jn = {
        type: "class",
        value: "[^,\\]]",
        description: "[^,\\]]"
      }, Fn = "<<", In = {type: "literal", value: "<<", description: '"<<"'}, qn = /^[^>]/, Rn = {
        type: "class",
        value: "[^>]",
        description: "[^>]"
      }, Un = ">", zn = {type: "literal", value: ">", description: '">"'}, Wn = /^[^"]/, Xn = {
        type: "class",
        value: '[^"]',
        description: '[^"]'
      }, Vn = /^[,]/, $n = {
        type: "class",
        value: "[,]",
        description: "[,]"
      }, Jn = /^[a-zA-Z0-9_.\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, Kn = {
        type: "class",
        value: "[a-zA-Z0-9_.\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD]",
        description: "[a-zA-Z0-9_.\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD]"
      }, Qn = /^[\n\r]/, Gn = {
        type: "class",
        value: "[\\n\\r]",
        description: "[\\n\\r]"
      }, Yn = /^[\n\t\r ]/, Zn = {
        type: "class",
        value: "[\\n\\t\\r ]",
        description: "[\\n\\t\\r ]"
      }, er = /^[\\]/, tr = {
        type: "class",
        value: "[\\\\]",
        description: "[\\\\]"
      }, nr = 0, rr = 0, ir = 0, sr = {line: 1, column: 1, seenCR: !1}, or = 0, ur = [], ar = 0, fr;
      if ("startRule"in n) {
        if (!(n.startRule in i))throw new Error("Can't start parsing from rule \"" + n.startRule + '".');
        s = i[n.startRule]
      }
      fr = s();
      if (fr !== r && nr === e.length)return fr;
      throw fr !== r && nr < e.length && gr({type: "end", description: "end of input"}), yr(null, ur, or)
    }

    return e(t, Error), {SyntaxError: t, parse: n}
  }();
  return e
}), define("pegast", [], function () {
  return {
    nodeVisitor: function (e) {
      return function (t) {
        return e[t.type] !== undefined ? e[t.type].apply(null, arguments) : function () {
        }
      }
    }
  }
}), define("transformer", ["viz", "parser/xdot", "pegast"], function (e, t, n) {
  var r = [];
  return {
    generate: function (n) {
      var i;
      try {
        i = e(n, "xdot");
        var s = t.parse(i);
        r = this.shapeast(s)
      } catch (o) {
      }
      return r
    }, shapeast: function (e) {
      function r(e) {
        return function (t) {
          t[e].forEach(o)
        }
      }

      function i(e) {
        return function (n) {
          t.push({id: n.id, "class": n.type, shapes: [], labels: []}), n[e].forEach(o)
        }
      }

      function s(e) {
        return function (n) {
          var r = t[t.length - 1];
          r[e] = r[e].concat(n.elements)
        }
      }

      var t = [], o = n.nodeVisitor({
        digraph: i("commands"),
        graph: r("attributes"),
        subgraph: i("commands"),
        struct: r("commands"),
        node: i("attributes"),
        relation: i("attributes"),
        draw: s("shapes"),
        hdraw: s("shapes"),
        ldraw: s("labels"),
        size: function (e) {
          var n = t[t.length - 1];
          n.size = e.value.map(function (e) {
            return e * 72
          })
        }
      });
      return o(e), {main: t.shift(), groups: t}
    }
  }
}), require({baseUrl: "."}, ["transformer"], function (e) {
  onmessage = function (t) {
    var n = {type: "stage", body: e.generate(t.data)};
    postMessage(n)
  }, postMessage({type: "ready"})
}), define("layout-worker", function () {
});