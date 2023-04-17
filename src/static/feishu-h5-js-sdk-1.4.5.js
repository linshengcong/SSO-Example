!(function (e) {
  function n(e) {
    delete installedChunks[e];
  }
  function t(e) {
    var n = document.getElementsByTagName('head')[0],
      t = document.createElement('script');
    (t.type = 'text/javascript'),
      (t.charset = 'utf-8'),
      (t.src = p.p + '' + e + '.' + w + '.hot-update.js'),
      n.appendChild(t);
  }
  function i(e) {
    return (
      (e = e || 1e4),
      new Promise(function (n, t) {
        if ('undefined' == typeof XMLHttpRequest)
          return t(new Error('No browser support'));
        try {
          var i = new XMLHttpRequest(),
            o = p.p + '' + w + '.hot-update.json';
          i.open('GET', o, !0), (i.timeout = e), i.send(null);
        } catch (e) {
          return t(e);
        }
        i.onreadystatechange = function () {
          if (4 === i.readyState)
            if (0 === i.status)
              t(new Error('Manifest request to ' + o + ' timed out.'));
            else if (404 === i.status) n();
            else if (200 !== i.status && 304 !== i.status)
              t(new Error('Manifest request to ' + o + ' failed.'));
            else {
              try {
                var e = JSON.parse(i.responseText);
              } catch (e) {
                return void t(e);
              }
              n(e);
            }
        };
      })
    );
  }
  function o(e) {
    var n = R[e];
    if (!n) return p;
    var t = function (t) {
      return (
        n.hot.active
          ? (R[t]
              ? R[t].parents.indexOf(e) < 0 && R[t].parents.push(e)
              : ((S = [e]), (h = t)),
            n.children.indexOf(t) < 0 && n.children.push(t))
          : (console.warn(
              '[HMR] unexpected require(' + t + ') from disposed module ' + e
            ),
            (S = [])),
        p(t)
      );
    };
    for (var i in p)
      Object.prototype.hasOwnProperty.call(p, i) &&
        'e' !== i &&
        Object.defineProperty(
          t,
          i,
          (function (e) {
            return {
              configurable: !0,
              enumerable: !0,
              get: function () {
                return p[e];
              },
              set: function (n) {
                p[e] = n;
              },
            };
          })(i)
        );
    return (
      (t.e = function (e) {
        function n() {
          x--, 'prepare' === E && (I[e] || d(e), 0 === x && 0 === P && l());
        }
        return (
          'ready' === E && a('prepare'),
          x++,
          p.e(e).then(n, function (e) {
            throw (n(), e);
          })
        );
      }),
      t
    );
  }
  function r(e) {
    var n = {
      _acceptedDependencies: {},
      _declinedDependencies: {},
      _selfAccepted: !1,
      _selfDeclined: !1,
      _disposeHandlers: [],
      _main: h !== e,
      active: !0,
      accept: function (e, t) {
        if (void 0 === e) n._selfAccepted = !0;
        else if ('function' == typeof e) n._selfAccepted = e;
        else if ('object' == typeof e)
          for (var i = 0; i < e.length; i++)
            n._acceptedDependencies[e[i]] = t || function () {};
        else n._acceptedDependencies[e] = t || function () {};
      },
      decline: function (e) {
        if (void 0 === e) n._selfDeclined = !0;
        else if ('object' == typeof e)
          for (var t = 0; t < e.length; t++) n._declinedDependencies[e[t]] = !0;
        else n._declinedDependencies[e] = !0;
      },
      dispose: function (e) {
        n._disposeHandlers.push(e);
      },
      addDisposeHandler: function (e) {
        n._disposeHandlers.push(e);
      },
      removeDisposeHandler: function (e) {
        var t = n._disposeHandlers.indexOf(e);
        t >= 0 && n._disposeHandlers.splice(t, 1);
      },
      check: c,
      apply: f,
      status: function (e) {
        if (!e) return E;
        z.push(e);
      },
      addStatusHandler: function (e) {
        z.push(e);
      },
      removeStatusHandler: function (e) {
        var n = z.indexOf(e);
        n >= 0 && z.splice(n, 1);
      },
      data: k[e],
    };
    return (h = void 0), n;
  }
  function a(e) {
    E = e;
    for (var n = 0; n < z.length; n++) z[n].call(null, e);
  }
  function s(e) {
    return +e + '' === e ? +e : e;
  }
  function c(e) {
    if ('idle' !== E) throw new Error('check() is only allowed in idle status');
    return (
      (y = e),
      a('check'),
      i(m).then(function (e) {
        if (!e) return a('idle'), null;
        (C = {}), (I = {}), (j = e.c), (_ = e.h), a('prepare');
        var n = new Promise(function (e, n) {
          g = { resolve: e, reject: n };
        });
        b = {};
        return d(0), 'prepare' === E && 0 === x && 0 === P && l(), n;
      })
    );
  }
  function u(e, n) {
    if (j[e] && C[e]) {
      C[e] = !1;
      for (var t in n)
        Object.prototype.hasOwnProperty.call(n, t) && (b[t] = n[t]);
      0 == --P && 0 === x && l();
    }
  }
  function d(e) {
    j[e] ? ((C[e] = !0), P++, t(e)) : (I[e] = !0);
  }
  function l() {
    a('ready');
    var e = g;
    if (((g = null), e))
      if (y)
        Promise.resolve()
          .then(function () {
            return f(y);
          })
          .then(
            function (n) {
              e.resolve(n);
            },
            function (n) {
              e.reject(n);
            }
          );
      else {
        var n = [];
        for (var t in b)
          Object.prototype.hasOwnProperty.call(b, t) && n.push(s(t));
        e.resolve(n);
      }
  }
  function f(t) {
    function i(e, n) {
      for (var t = 0; t < n.length; t++) {
        var i = n[t];
        e.indexOf(i) < 0 && e.push(i);
      }
    }
    if ('ready' !== E)
      throw new Error('apply() is only allowed in ready status');
    t = t || {};
    var o,
      r,
      c,
      u,
      d,
      l = {},
      f = [],
      v = {},
      h = function () {
        console.warn(
          '[HMR] unexpected require(' + y.moduleId + ') to disposed module'
        );
      };
    for (var g in b)
      if (Object.prototype.hasOwnProperty.call(b, g)) {
        d = s(g);
        var y;
        y = b[g]
          ? (function (e) {
              for (
                var n = [e],
                  t = {},
                  o = n.slice().map(function (e) {
                    return { chain: [e], id: e };
                  });
                o.length > 0;

              ) {
                var r = o.pop(),
                  a = r.id,
                  s = r.chain;
                if ((u = R[a]) && !u.hot._selfAccepted) {
                  if (u.hot._selfDeclined)
                    return { type: 'self-declined', chain: s, moduleId: a };
                  if (u.hot._main)
                    return { type: 'unaccepted', chain: s, moduleId: a };
                  for (var c = 0; c < u.parents.length; c++) {
                    var d = u.parents[c],
                      l = R[d];
                    if (l) {
                      if (l.hot._declinedDependencies[a])
                        return {
                          type: 'declined',
                          chain: s.concat([d]),
                          moduleId: a,
                          parentId: d,
                        };
                      n.indexOf(d) >= 0 ||
                        (l.hot._acceptedDependencies[a]
                          ? (t[d] || (t[d] = []), i(t[d], [a]))
                          : (delete t[d],
                            n.push(d),
                            o.push({ chain: s.concat([d]), id: d })));
                    }
                  }
                }
              }
              return {
                type: 'accepted',
                moduleId: e,
                outdatedModules: n,
                outdatedDependencies: t,
              };
            })(d)
          : { type: 'disposed', moduleId: g };
        var m = !1,
          O = !1,
          z = !1,
          P = '';
        switch (
          (y.chain && (P = '\nUpdate propagation: ' + y.chain.join(' -> ')),
          y.type)
        ) {
          case 'self-declined':
            t.onDeclined && t.onDeclined(y),
              t.ignoreDeclined ||
                (m = new Error(
                  'Aborted because of self decline: ' + y.moduleId + P
                ));
            break;
          case 'declined':
            t.onDeclined && t.onDeclined(y),
              t.ignoreDeclined ||
                (m = new Error(
                  'Aborted because of declined dependency: ' +
                    y.moduleId +
                    ' in ' +
                    y.parentId +
                    P
                ));
            break;
          case 'unaccepted':
            t.onUnaccepted && t.onUnaccepted(y),
              t.ignoreUnaccepted ||
                (m = new Error(
                  'Aborted because ' + d + ' is not accepted' + P
                ));
            break;
          case 'accepted':
            t.onAccepted && t.onAccepted(y), (O = !0);
            break;
          case 'disposed':
            t.onDisposed && t.onDisposed(y), (z = !0);
            break;
          default:
            throw new Error('Unexception type ' + y.type);
        }
        if (m) return a('abort'), Promise.reject(m);
        if (O) {
          (v[d] = b[d]), i(f, y.outdatedModules);
          for (d in y.outdatedDependencies)
            Object.prototype.hasOwnProperty.call(y.outdatedDependencies, d) &&
              (l[d] || (l[d] = []), i(l[d], y.outdatedDependencies[d]));
        }
        z && (i(f, [y.moduleId]), (v[d] = h));
      }
    var x = [];
    for (r = 0; r < f.length; r++)
      (d = f[r]),
        R[d] &&
          R[d].hot._selfAccepted &&
          x.push({ module: d, errorHandler: R[d].hot._selfAccepted });
    a('dispose'),
      Object.keys(j).forEach(function (e) {
        !1 === j[e] && n(e);
      });
    for (var I, C = f.slice(); C.length > 0; )
      if (((d = C.pop()), (u = R[d]))) {
        var T = {},
          L = u.hot._disposeHandlers;
        for (c = 0; c < L.length; c++) (o = L[c])(T);
        for (
          k[d] = T, u.hot.active = !1, delete R[d], delete l[d], c = 0;
          c < u.children.length;
          c++
        ) {
          var D = R[u.children[c]];
          D && (I = D.parents.indexOf(d)) >= 0 && D.parents.splice(I, 1);
        }
      }
    var A, M;
    for (d in l)
      if (Object.prototype.hasOwnProperty.call(l, d) && (u = R[d]))
        for (M = l[d], c = 0; c < M.length; c++)
          (A = M[c]),
            (I = u.children.indexOf(A)) >= 0 && u.children.splice(I, 1);
    a('apply'), (w = _);
    for (d in v) Object.prototype.hasOwnProperty.call(v, d) && (e[d] = v[d]);
    var B = null;
    for (d in l)
      if (Object.prototype.hasOwnProperty.call(l, d) && (u = R[d])) {
        M = l[d];
        var F = [];
        for (r = 0; r < M.length; r++)
          if (((A = M[r]), (o = u.hot._acceptedDependencies[A]))) {
            if (F.indexOf(o) >= 0) continue;
            F.push(o);
          }
        for (r = 0; r < F.length; r++) {
          o = F[r];
          try {
            o(M);
          } catch (e) {
            t.onErrored &&
              t.onErrored({
                type: 'accept-errored',
                moduleId: d,
                dependencyId: M[r],
                error: e,
              }),
              t.ignoreErrored || B || (B = e);
          }
        }
      }
    for (r = 0; r < x.length; r++) {
      var U = x[r];
      (d = U.module), (S = [d]);
      try {
        p(d);
      } catch (e) {
        if ('function' == typeof U.errorHandler)
          try {
            U.errorHandler(e);
          } catch (n) {
            t.onErrored &&
              t.onErrored({
                type: 'self-accept-error-handler-errored',
                moduleId: d,
                error: n,
                orginalError: e,
                originalError: e,
              }),
              t.ignoreErrored || B || (B = n),
              B || (B = e);
          }
        else
          t.onErrored &&
            t.onErrored({ type: 'self-accept-errored', moduleId: d, error: e }),
            t.ignoreErrored || B || (B = e);
      }
    }
    return B
      ? (a('fail'), Promise.reject(B))
      : (a('idle'),
        new Promise(function (e) {
          e(f);
        }));
  }
  function p(n) {
    if (R[n]) return R[n].exports;
    var t = (R[n] = {
      i: n,
      l: !1,
      exports: {},
      hot: r(n),
      parents: ((O = S), (S = []), O),
      children: [],
    });
    return e[n].call(t.exports, t, t.exports, o(n)), (t.l = !0), t.exports;
  }
  var v = window.webpackHotUpdate;
  window.webpackHotUpdate = function (e, n) {
    u(e, n), v && v(e, n);
  };
  var h,
    g,
    b,
    _,
    y = !0,
    w = '01ca8aff2291538dc5ce',
    m = 1e4,
    k = {},
    S = [],
    O = [],
    z = [],
    E = 'idle',
    P = 0,
    x = 0,
    I = {},
    C = {},
    j = {},
    R = {};
  (p.m = e),
    (p.c = R),
    (p.d = function (e, n, t) {
      p.o(e, n) ||
        Object.defineProperty(e, n, {
          configurable: !1,
          enumerable: !0,
          get: t,
        });
    }),
    (p.n = function (e) {
      var n =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return p.d(n, 'a', n), n;
    }),
    (p.o = function (e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (p.p = ''),
    (p.h = function () {
      return w;
    }),
    o(4)((p.s = 4));
})([
  function (e, n, t) {
    'use strict';
    function i() {
      return (
        s.parentElement || (document.body && document.body.appendChild(s)),
        !!s.parentElement &&
          (s.setAttribute(
            'src',
            'pageready://lark?timestamp=' + new Date().getTime()
          ),
          !0)
      );
    }
    function o() {
      if (n.browser.versions.ios) {
        window.addEventListener(
          'hashchange',
          function () {
            n.bridge.invoke('biz.util.routerChange', {});
          },
          !1
        );
        var e = window.history.pushState;
        window.history.pushState = function () {
          for (var t = [], i = 0; i < arguments.length; i++)
            t[i] = arguments[i];
          e.apply(window.history, t),
            n.bridge.invoke('biz.util.routerChange', {});
        };
        var t = window.history.replaceState;
        if (
          ((window.history.replaceState = function () {
            for (var e = [], i = 0; i < arguments.length; i++)
              e[i] = arguments[i];
            t.apply(window.history, e),
              n.bridge.invoke('biz.util.routerChange', {});
          }),
          (window.onpopstate = function () {
            n.bridge.invoke('biz.util.routerChange', {});
          }),
          !i())
        )
          return document.body
            ? void i()
            : void (document.onreadystatechange = function () {
                'interactive' === document.readyState && i();
              });
      }
    }
    function r() {
      return (f =
        f ||
        new Promise(function (e) {
          var t = 0,
            i = setInterval(function () {
              if (
                (n.browser.versions.ios || (e(), clearInterval(i)), 50 === ++t)
              )
                return e(), void clearInterval(i);
              window.webkit &&
              window.webkit.messageHandlers &&
              window.webkit.messageHandlers.invoke
                ? (e(), clearInterval(i))
                : window.WebViewJavascriptBridge && (e(), clearInterval(i));
            }, 10);
        }));
    }
    Object.defineProperty(n, '__esModule', { value: !0 });
    var a = t(1),
      s = document.createElement('iframe');
    (s.style.display = 'none'), document.body && document.body.appendChild(s);
    var c = function (e) {
      var n =
          e.indexOf('Electron') > -1 &&
          (e.indexOf('Lark') > -1 || e.indexOf('Feishu') > -1),
        t =
          -1 === e.indexOf('Electron') &&
          (e.indexOf('Lark') > -1 || e.indexOf('Feishu') > -1);
      if (n || t)
        return e.match(
          /(lark|feishu|lark-staging|feishu-staging|lark-prerelease|feishu-prerelease|lark-oversea)\/([\d\.]+)/i
        )[2];
    };
    n.browser = {
      versions: (function () {
        var e = navigator.userAgent,
          n = (navigator.appVersion, navigator.platform);
        return {
          trident: e.indexOf('Trident') > -1,
          presto: e.indexOf('Presto') > -1,
          webKit: e.indexOf('AppleWebKit') > -1,
          gecko: e.indexOf('Gecko') > -1 && -1 === e.indexOf('KHTML'),
          mobile:
            !!e.match(/AppleWebKit.*Mobile.*/) || !!e.match(/AppleWebKit/),
          ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
          android: e.indexOf('Android') > -1 || e.indexOf('Linux') > -1,
          iPhone: e.indexOf('iPhone') > -1 || e.indexOf('Mac') > -1,
          iPad: e.indexOf('iPad') > -1,
          webApp: -1 === e.indexOf('Safari'),
          PCFeishu:
            e.indexOf('Electron') > -1 &&
            (e.indexOf('Lark') > -1 || e.indexOf('Feishu') > -1),
          mobileFeishu:
            -1 === e.indexOf('Electron') &&
            (e.indexOf('Lark') > -1 || e.indexOf('Feishu') > -1),
          larkVersion: c(e),
          mac: n.indexOf('Mac') > -1,
          win: n.indexOf('Win') > -1,
        };
      })(),
    };
    var u = n.browser.versions.mobileFeishu
        ? t(9).bridge
        : window.__LarkPCSDK__
        ? window.__LarkPCSDK__.bridge
        : { invoke: function () {}, config: function () {} },
      d = {};
    (u.on = function (e, n, t) {
      (d[e] = d[e] || []),
        0 === d[e].length
          ? (d[e].push(t),
            u.invoke(
              n,
              {},
              {
                keep: !0,
                onSuccess: function () {
                  d[e].forEach(function (e) {
                    'function' == typeof e && e();
                  });
                },
              }
            ))
          : d[e].push(t);
    }),
      (u.off = function (e, n, t) {
        (d[e] = d[e] || []),
          (d[e] = d[e].filter(function (e) {
            return e !== t;
          })),
          0 === d[e].length && u.invoke(n, {}, {});
      });
    var l = u.invoke;
    (u.invoke = function () {
      for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
      return a.default('h5jssdk_call_api', { api_name: e[0] }), l.apply(u, e);
    }),
      (n.bridge = u),
      (n.pageReady = o);
    var f;
    n.iosWebkitReady = r;
  },
  function (e, n, t) {
    'use strict';
    function i() {
      (a = new s.default('tracker')),
        a.init({ app_id: 1271, channel: 'cn', log: !1 });
      var e = { cdn: 'h5-js-sdk-', npm: '@lark/js-sdk@' };
      a.config({
        evtParams: {
          url: location.origin + location.pathname,
          h5_jssdk_type: 'cdn',
          h5_jssdk_version: e.cdn + '1.4.5',
          app_id: '',
        },
      }),
        a.start();
    }
    function o(e, n) {
      void 0 === n && (n = {}),
        !1 ===
          /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(
            location.hostname
          ) &&
          'localhost' !== location.hostname &&
          (a || i(), a(e, r({ instance: 'tracker' }, n)));
    }
    var r =
      (this && this.__assign) ||
      Object.assign ||
      function (e) {
        for (var n, t = 1, i = arguments.length; t < i; t++) {
          n = arguments[t];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }
        return e;
      };
    Object.defineProperty(n, '__esModule', { value: !0 });
    var a,
      s = t(8);
    n.default = o;
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i = (function () {
      function e() {
        (this._configReady = !0),
          (this._configEvent = 'LarkConfigReady'),
          (this._invokeQueue = []),
          window.addEventListener(
            this._configEvent,
            this._onBridgeReady.bind(this),
            !1
          );
      }
      return (
        (e.prototype._fireEvent = function (e, n) {
          var t = new CustomEvent(e, n);
          window.dispatchEvent(t);
        }),
        (e.prototype._submitTask = function (e) {
          this._invokeQueue.push(e);
        }),
        (e.prototype._onBridgeReady = function () {
          this._invokeQueue.forEach(function (e) {
            e();
          });
        }),
        (e.prototype.register = function (e, n) {}),
        (e.prototype.connectLkWebViewJavascriptBridge = function (e) {}),
        (e.prototype.invoke = function (e, n, t) {}),
        (e.prototype.config = function (e, n, t) {
          var i = this;
          this.invoke(e, n, {
            onSuccess: function () {
              (i._configReady = !0),
                t.onSuccess && t.onSuccess(),
                i._fireEvent(i._configEvent, {});
            },
            onFail: function (e) {
              (i._configReady = !0),
                t.onFail && t.onFail(e),
                i._fireEvent(i._configEvent, {});
            },
          }),
            (this._configReady = !1);
        }),
        e
      );
    })();
    n.BaseBridgeImpl = i;
  },
  function (e, n, t) {
    function i(e) {
      return t(o(e));
    }
    function o(e) {
      var n = r[e];
      if (!(n + 1)) throw new Error("Cannot find module '" + e + "'.");
      return n;
    }
    var r = {
      './android.json': 25,
      './ios.json': 26,
      './mac.json': 27,
      './windows.json': 28,
    };
    (i.keys = function () {
      return Object.keys(r);
    }),
      (i.resolve = o),
      (e.exports = i),
      (i.id = 3);
  },
  function (e, n, t) {
    e.exports = t(5);
  },
  function (e, n, t) {
    'use strict';
    var i =
        (this && this.__awaiter) ||
        function (e, n, t, i) {
          return new (t || (t = Promise))(function (o, r) {
            function a(e) {
              try {
                c(i.next(e));
              } catch (e) {
                r(e);
              }
            }
            function s(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                r(e);
              }
            }
            function c(e) {
              e.done
                ? o(e.value)
                : new t(function (n) {
                    n(e.value);
                  }).then(a, s);
            }
            c((i = i.apply(e, n || [])).next());
          });
        },
      o =
        (this && this.__generator) ||
        function (e, n) {
          function t(e) {
            return function (n) {
              return i([e, n]);
            };
          }
          function i(t) {
            if (o) throw new TypeError('Generator is already executing.');
            for (; c; )
              try {
                if (
                  ((o = 1),
                  r &&
                    (a =
                      2 & t[0]
                        ? r.return
                        : t[0]
                        ? r.throw || ((a = r.return) && a.call(r), 0)
                        : r.next) &&
                    !(a = a.call(r, t[1])).done)
                )
                  return a;
                switch (((r = 0), a && (t = [2 & t[0], a.value]), t[0])) {
                  case 0:
                  case 1:
                    a = t;
                    break;
                  case 4:
                    return c.label++, { value: t[1], done: !1 };
                  case 5:
                    c.label++, (r = t[1]), (t = [0]);
                    continue;
                  case 7:
                    (t = c.ops.pop()), c.trys.pop();
                    continue;
                  default:
                    if (
                      ((a = c.trys),
                      !(a = a.length > 0 && a[a.length - 1]) &&
                        (6 === t[0] || 2 === t[0]))
                    ) {
                      c = 0;
                      continue;
                    }
                    if (3 === t[0] && (!a || (t[1] > a[0] && t[1] < a[3]))) {
                      c.label = t[1];
                      break;
                    }
                    if (6 === t[0] && c.label < a[1]) {
                      (c.label = a[1]), (a = t);
                      break;
                    }
                    if (a && c.label < a[2]) {
                      (c.label = a[2]), c.ops.push(t);
                      break;
                    }
                    a[2] && c.ops.pop(), c.trys.pop();
                    continue;
                }
                t = n.call(e, c);
              } catch (e) {
                (t = [6, e]), (r = 0);
              } finally {
                o = a = 0;
              }
            if (5 & t[0]) throw t[1];
            return { value: t[0] ? t[1] : void 0, done: !0 };
          }
          var o,
            r,
            a,
            s,
            c = {
              label: 0,
              sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (s = { next: t(0), throw: t(1), return: t(2) }),
            'function' == typeof Symbol &&
              (s[Symbol.iterator] = function () {
                return this;
              }),
            s
          );
        },
      r = this;
    Object.defineProperty(n, '__esModule', { value: !0 });
    var a = t(6),
      s = t(17),
      c = t(23),
      u = t(0),
      d = t(1),
      l = t(24);
    d.default('h5jssdk_enter'), u.pageReady();
    var f = { biz: a.biz, device: s.device, appCenter: c };
    if (u.browser.versions.mobileFeishu || u.browser.versions.PCFeishu) {
      var p = {
        ready: function (e) {
          return i(r, void 0, void 0, function () {
            var n;
            return o(this, function (t) {
              switch (t.label) {
                case 0:
                  return (
                    (n = u.iosWebkitReady()),
                    [
                      4,
                      l.setFeishuSDK({
                        api: f,
                        browser: u.browser,
                        BUILD: 'cdn',
                        SDK: p,
                      }),
                    ]
                  );
                case 1:
                  return t.sent(), [4, n];
                case 2:
                  return t.sent(), e(), [2];
              }
            });
          });
        },
        biz: { util: {}, navigation: {}, chat: {}, contact: {} },
        device: { geolocation: {}, notification: {}, base: {}, connection: {} },
        appCenter: {},
      };
      u.iosWebkitReady(),
        l.setFeishuSDK({ api: f, browser: u.browser, BUILD: 'cdn', SDK: p }),
        window.lark ? Object.assign(window.lark, p) : (window.lark = p),
        window.h5sdk ? Object.assign(window.h5sdk, p) : (window.h5sdk = p);
    }
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i = t(7),
      o = t(13),
      r = t(14),
      a = t(15),
      s = t(16);
    n.biz = {
      navigation: i.navigation,
      util: o.util,
      reporter: r.reporter,
      chat: a.chat,
      contact: s.contact,
    };
  },
  function (e, n, t) {
    'use strict';
    function i(e) {
      if ('string' == typeof e) {
        if (e.length < 814) throw new Error('非法的base64String');
        return ~~((e.length - 814) / 1.37);
      }
      return 0;
    }
    function o(e) {
      for (var n = 0, t = e; n < t.length; n++) {
        var o = t[n];
        if (i(o.imageBase64) > a) throw new Error('imageSize超过' + a);
        if (o.imageBase64 && o.text)
          throw new Error('text和imageBase64只能传一个');
      }
      return !0;
    }
    Object.defineProperty(n, '__esModule', { value: !0 });
    var r = t(0),
      a = 16e4,
      s = (function () {
        function e() {}
        return (
          (e.prototype.setTitle = function (e) {
            r.bridge.invoke('biz.navigation.setTitle', e);
          }),
          (e.prototype.setLeft = function (e) {
            r.bridge.invoke(
              'biz.navigation.setLeft',
              { control: e.control, text: e.text, isShowIcon: e.isShowIcon },
              { onSuccess: e.onSuccess, keep: !0 }
            );
          }),
          (e.prototype.setRight = function (e) {
            r.bridge.invoke('biz.navigation.setRight', e);
          }),
          (e.prototype.setMenu = function (e) {
            o(e.items) &&
              r.bridge.invoke(
                'biz.navigation.setMenu',
                { items: e.items },
                { onSuccess: e.onSuccess, keep: !0 }
              );
          }),
          (e.prototype.goBack = function (e) {
            r.bridge.invoke(
              'biz.navigation.goBack',
              {},
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.close = function (e) {
            r.bridge.invoke(
              'biz.navigation.close',
              {},
              { onSuccess: e.onSuccess }
            );
          }),
          e
        );
      })();
    (n.NavigationAPI = s), (n.navigation = new s());
  },
  function (e, n, t) {
    'use strict';
    function i(e, n) {
      if (!(e instanceof n))
        throw new TypeError('Cannot call a class as a function');
    }
    function o(e, n) {
      var t = e.exec(n);
      return t && t[1] ? t[1] : '';
    }
    function r(e, n) {
      if (!(e instanceof n))
        throw new TypeError('Cannot call a class as a function');
    }
    function a(e, n) {
      if (!(e instanceof n))
        throw new TypeError('Cannot call a class as a function');
    }
    function s(e, n) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
    }
    function c(e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError(
          'Super expression must either be null or a function, not ' + typeof n
        );
      (e.prototype = Object.create(n && n.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        n &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, n)
            : (e.__proto__ = n));
    }
    function u(e, n) {
      if (!(e instanceof n))
        throw new TypeError('Cannot call a class as a function');
    }
    function d(e, n, t) {
      if (
        'string' == typeof e &&
        'number' == typeof n &&
        'number' == typeof t
      ) {
        var i = [],
          o = [];
        t = t <= 25 ? t : t % 25;
        var r = String.fromCharCode(t + 97);
        i = e.split(r);
        for (var a = 0; a < i.length; a++) {
          var s = parseInt(i[a], t);
          s = (1 * s) ^ n;
          var c = String.fromCharCode(s);
          o.push(c);
        }
        return o.join('');
      }
    }
    function l(e) {
      return e
        ? (e ^ ((16 * Math.random()) >> (e / 4))).toString(10)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, l);
    }
    function f(e, n) {
      if (!(e instanceof n))
        throw new TypeError('Cannot call a class as a function');
    }
    function p(e, n) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
    }
    function v(e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError(
          'Super expression must either be null or a function, not ' + typeof n
        );
      (e.prototype = Object.create(n && n.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        n &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, n)
            : (e.__proto__ = n));
    }
    function h(e, n) {
      if (!(e instanceof n))
        throw new TypeError('Cannot call a class as a function');
    }
    function g(e, n) {
      if (!(e instanceof n))
        throw new TypeError('Cannot call a class as a function');
    }
    function b(e, n) {
      if (!(e instanceof n))
        throw new TypeError('Cannot call a class as a function');
    }
    function _(e, n) {
      if (!(e instanceof n))
        throw new TypeError('Cannot call a class as a function');
    }
    function y(e, n) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
    }
    function w(e, n) {
      if ('function' != typeof n && null !== n)
        throw new TypeError(
          'Super expression must either be null or a function, not ' + typeof n
        );
      (e.prototype = Object.create(n && n.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        n &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, n)
            : (e.__proto__ = n));
    }
    function m(e, n) {
      if (!(e instanceof n))
        throw new TypeError('Cannot call a class as a function');
    }
    function k(e, n) {
      if (!(e instanceof n))
        throw new TypeError('Cannot call a class as a function');
    }
    Object.defineProperty(n, '__esModule', { value: !0 });
    var S =
        Object.assign ||
        function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var i in t)
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          }
          return e;
        },
      O = void 0,
      z = function e() {
        var n = this;
        i(this, e),
          (this.set = function (e, t) {
            var i = e,
              o = t;
            if (null === o) return !1;
            var r = '';
            if (i.indexOf('.') > -1) {
              var a = i.split('.');
              (r = a[0]), (i = a[1]);
            }
            'os_version' === i && (o = '' + o),
              r
                ? 'user' === r || 'header' === r
                  ? (n.envInfo[r][i] = o)
                  : 'headers' === r
                  ? (n.envInfo.header.headers[i] = o)
                  : (n.envInfo.header.headers.custom[i] = o)
                : n.envInfo.user.hasOwnProperty(i)
                ? ['user_type', 'device_id', 'ip_addr_id'].indexOf(i) > -1
                  ? (n.envInfo.user[i] = Number(o))
                  : ['user_id', 'web_id', 'user_unique_id', 'ssid'].indexOf(i) >
                    -1
                  ? (n.envInfo.user[i] = String(o))
                  : ['user_is_auth', 'user_is_login'].indexOf(i) > -1 &&
                    (n.envInfo.user[i] = Boolean(o))
                : n.envInfo.header.hasOwnProperty(i)
                ? (n.envInfo.header[i] = o)
                : n.envInfo.header.headers.hasOwnProperty(i)
                ? (n.envInfo.header.headers[i] = o)
                : (n.envInfo.header.headers.custom[i] = o);
          }),
          (this.get = function () {
            for (
              var e = { user: {}, header: { headers: { custom: {} } } },
                t = n.envInfo,
                i = t.user,
                o = Object.keys(i),
                r = o,
                a = Array.isArray(r),
                s = 0,
                r = a ? r : r[Symbol.iterator]();
              ;

            ) {
              var c;
              if (a) {
                if (s >= r.length) break;
                c = r[s++];
              } else {
                if (((s = r.next()), s.done)) break;
                c = s.value;
              }
              var u = c;
              i[u] !== O && (e.user[u] = i[u]);
            }
            for (
              var d = t.header,
                l = Object.keys(d),
                f = l,
                p = Array.isArray(f),
                v = 0,
                f = p ? f : f[Symbol.iterator]();
              ;

            ) {
              var h;
              if (p) {
                if (v >= f.length) break;
                h = f[v++];
              } else {
                if (((v = f.next()), v.done)) break;
                h = v.value;
              }
              var g = h;
              d[g] !== O && 'headers' !== g && (e.header[g] = d[g]);
            }
            for (
              var b = t.header.headers,
                _ = Object.keys(b),
                y = _,
                w = Array.isArray(y),
                m = 0,
                y = w ? y : y[Symbol.iterator]();
              ;

            ) {
              var k;
              if (w) {
                if (m >= y.length) break;
                k = y[m++];
              } else {
                if (((m = y.next()), m.done)) break;
                k = m.value;
              }
              var z = k;
              'custom' !== z && b[z] !== O && (e.header.headers[z] = b[z]);
            }
            var E = t.header.headers.custom,
              P = Object.keys(E);
            if (P.length)
              for (
                var x = P,
                  I = Array.isArray(x),
                  C = 0,
                  x = I ? x : x[Symbol.iterator]();
                ;

              ) {
                var j;
                if (I) {
                  if (C >= x.length) break;
                  j = x[C++];
                } else {
                  if (((C = x.next()), C.done)) break;
                  j = C.value;
                }
                var R = j;
                e.header.headers.custom[R] = E[R];
              }
            return {
              user: e.user,
              header: S({}, e.header, { headers: e.header.headers }),
            };
          }),
          (this.envInfo = {
            user: {
              user_unique_id: O,
              user_type: O,
              user_id: O,
              user_is_auth: O,
              user_is_login: O,
              device_id: O,
              web_id: O,
              ip_addr_id: O,
              ssid: O,
            },
            header: {
              app_id: O,
              app_name: O,
              app_install_id: O,
              app_package: O,
              app_channel: O,
              app_version: O,
              os_name: O,
              os_version: O,
              device_model: O,
              ab_client: O,
              ab_version: O,
              traffic_type: O,
              utm_source: O,
              utm_medium: O,
              utm_campaign: O,
              client_ip: O,
              device_brand: O,
              os_api: O,
              access: O,
              language: O,
              region: O,
              app_language: O,
              app_region: O,
              creative_id: O,
              ad_id: O,
              campaign_id: O,
              log_type: O,
              rnd: O,
              platform: O,
              sdk_version: O,
              province: O,
              city: O,
              timezone: O,
              tz_offset: O,
              tz_name: O,
              sim_region: O,
              carrier: O,
              resolution: O,
              browser: O,
              browser_version: O,
              referrer: O,
              referrer_host: O,
              headers: { utm_term: O, utm_content: O, custom: {} },
            },
          });
      },
      E = function (e) {
        var n = document.createElement('a');
        return (n.href = e), n;
      },
      P = screen.width || 0,
      x = screen.height || 0,
      I = P + ' x ' + x,
      C = navigator.appVersion,
      j = navigator.userAgent,
      R = navigator.language,
      T = document.referrer,
      L = E(T).hostname,
      D = (function (e) {
        var n = E(e).search;
        n = n.slice(1);
        var t = {};
        return (
          n.split('&').forEach(function (e) {
            var n = e.split('='),
              i = n[0],
              o = n[1];
            t[i] = decodeURIComponent(void 0 === o ? '' : o);
          }),
          t
        );
      })(location.href),
      A = '',
      M = '',
      B = '',
      F = '' + parseFloat(C),
      U = void 0,
      N = void 0;
    -1 !== (U = j.indexOf('Opera')) &&
      ((B = 'Opera'),
      (F = j.substring(U + 6)),
      -1 !== (U = j.indexOf('Version')) && (F = j.substring(U + 8))),
      -1 !== (U = j.indexOf('Edge'))
        ? ((B = 'Microsoft Edge'), (F = j.substring(U + 5)))
        : -1 !== (U = j.indexOf('MSIE'))
        ? ((B = 'Microsoft Internet Explorer'), (F = j.substring(U + 5)))
        : -1 !== (U = j.indexOf('Chrome'))
        ? ((B = 'Chrome'), (F = j.substring(U + 7)))
        : -1 !== (U = j.indexOf('Safari'))
        ? ((B = 'Safari'),
          (F = j.substring(U + 7)),
          -1 !== (U = j.indexOf('Version')) && (F = j.substring(U + 8)))
        : -1 !== (U = j.indexOf('Firefox')) &&
          ((B = 'Firefox'), (F = j.substring(U + 8))),
      -1 !== (N = F.indexOf(';')) && (F = F.substring(0, N)),
      -1 !== (N = F.indexOf(' ')) && (F = F.substring(0, N)),
      -1 !== (N = F.indexOf(')')) && (F = F.substring(0, N));
    for (
      var q = /Mobile|htc|mini|Android|iP(ad|od|hone)/.test(C) ? 'wap' : 'web',
        W = [
          { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
          { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
          { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
          { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
          { s: 'Android', r: /Android/ },
          { s: 'Sun OS', r: /SunOS/ },
          { s: 'Linux', r: /(Linux|X11)/ },
          { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
          { s: 'Mac OS X', r: /Mac OS X/ },
          { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
        ],
        J = 0;
      J < W.length;
      J++
    ) {
      var H = W[J];
      if (H.r.test(j)) {
        A = H.s;
        break;
      }
    }
    switch (
      (/Windows/.test(A) && ((M = o(/Windows (.*)/, A)), (A = 'windows')), A)
    ) {
      case 'Mac OS X':
        (M = o(/Mac OS X (10[\.\_\d]+)/, j)), (A = 'mac');
        break;
      case 'Android':
        (M = (function (e) {
          var n = o(/Android ([\.\_\d]+)/, e);
          return n || (n = o(/Android\/([\.\_\d]+)/, e)), n;
        })(j)),
          (A = 'android');
        break;
      case 'iOS':
        (M = /OS (\d+)_(\d+)_?(\d+)?/.exec(C)),
          (M = M ? M[1] + '.' + M[2] + '.' + (0 | M[3]) : ''),
          (A = 'ios');
    }
    var K = {
        screen_size: I,
        browser: B,
        browser_version: F,
        platform: q,
        os_name: A,
        os_version: M,
        userAgent: j,
        screen_width: P,
        screen_height: x,
        device_model: A,
        language: R,
        referrer: T,
        referrer_host: L,
        utm_source: D.utm_source,
        utm_medium: D.utm_medium,
        utm_campaign: D.utm_campaign,
        utm_term: D.utm_term,
        utm_content: D.utm_content,
      },
      V = {
        get: function (e) {
          var n = localStorage.getItem(e),
            t = n;
          try {
            n && 'string' == typeof n && (t = JSON.parse(n));
          } catch (e) {}
          return t;
        },
        set: function (e, n) {
          try {
            var t = 'string' == typeof n ? n : JSON.stringify(n);
            localStorage.setItem(e, t);
          } catch (e) {}
        },
      },
      X = '__tea_cache_',
      Q = {
        NO_URL_PREFIX: 4001,
        IMG_ON_ERROR: 4e3,
        IMG_CATCH_ERROR: 4002,
        BEACON_STATUS_FALSE: 4003,
        XHR_ON_ERROR: 500,
        RESPONSE_DATA_ERROR: 5001,
      },
      G =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            },
      $ = function e() {
        var n = this,
          t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
        r(this, e),
          (this.init = function (e) {
            n.isLog = e;
          }),
          (this.info = function (e) {
            for (
              var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), o = 1;
              o < t;
              o++
            )
              i[o - 1] = arguments[o];
            if (n.isLog) {
              var r;
              (r = console).log.apply(r, [n.prefix + e].concat(i));
            }
          }),
          (this.warn = function (e) {
            for (
              var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), o = 1;
              o < t;
              o++
            )
              i[o - 1] = arguments[o];
            if (n.isLog) {
              var r;
              (r = console).warn.apply(r, [n.prefix + e].concat(i));
            }
          }),
          (this.error = function (e) {
            for (
              var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), o = 1;
              o < t;
              o++
            )
              i[o - 1] = arguments[o];
            if (n.isLog) {
              var r;
              (r = console).error.apply(r, [n.prefix + e].concat(i));
            }
          }),
          (this.dir = function () {
            if (n.isLog) {
              var e;
              (e = console).dir.apply(e, arguments);
            }
          }),
          (this.table = function (e) {
            n.isLog && console.table(e);
          }),
          (this.logJSON = function (e) {
            'object' === (void 0 === e ? 'undefined' : G(e)) &&
              n.isLog &&
              n.info('', JSON.stringify(e, null, 2));
          }),
          (this.deprecated = function (e) {
            for (
              var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), o = 1;
              o < t;
              o++
            )
              i[o - 1] = arguments[o];
            n.warn.apply(n, ['[DEPRECATED]' + e].concat(i));
          }),
          (this.throw = function (e) {
            throw (n.error(n.prefix), new Error(e));
          });
        var i = t ? '[' + t + ']' : '';
        this.prefix = '[tea-sdk]' + i;
      },
      Y = new $(),
      Z = function (e, n, t, i) {
        var o = new XMLHttpRequest();
        o.open('POST', e, !0),
          o.setRequestHeader('Content-Type', 'application/json; charset=utf-8'),
          (o.onload = function () {
            try {
              var e = JSON.parse(o.responseText);
              t && t(e);
            } catch (e) {
              i && i();
            }
          }),
          (o.onerror = function () {
            i && i();
          }),
          o.send(JSON.stringify(n));
      },
      ee = new Date(),
      ne = ee.getTimezoneOffset(),
      te = parseInt(-ne / 60, 10),
      ie = 60 * ne,
      oe = void 0;
    try {
      oe = '3.2.7';
    } catch (e) {
      oe = '2.x';
    }
    var re = (function (e) {
        function n() {
          a(this, n);
          var t = s(this, e.call(this));
          return (
            (t.initClientEnv = function () {
              t.set('os_name', K.os_name),
                t.set('os_version', K.os_version),
                t.set('device_model', K.device_model),
                t.set('platform', K.platform),
                t.set('sdk_version', oe),
                t.set('browser', K.browser),
                t.set('browser_version', K.browser_version),
                t.set('language', K.language),
                t.set('timezone', te),
                t.set('tz_offset', ie),
                t.set('resolution', K.screen_width + 'x' + K.screen_height),
                t.set('screen_width', K.screen_width),
                t.set('screen_height', K.screen_height),
                t.set('referrer', K.referrer),
                t.set('referrer_host', K.referrer_host),
                t.set('utm_source', K.utm_source),
                t.set('utm_medium', K.utm_medium),
                t.set('utm_campaign', K.utm_campaign),
                t.set('utm_term', K.utm_term),
                t.set('utm_content', K.utm_content);
            }),
            t.initClientEnv(),
            t
          );
        }
        return c(n, e), n;
      })(z),
      ae = new re(),
      se = (function () {
        function e() {
          u(this, e);
        }
        return (
          (e.prototype.isString = function (e) {
            return 'String' === Object.prototype.toString.call(e).slice(8, -1);
          }),
          (e.prototype.isNumber = function (e) {
            return 'Number' === Object.prototype.toString.call(e).slice(8, -1);
          }),
          (e.prototype.isBoolean = function (e) {
            return 'Boolean' === Object.prototype.toString.call(e).slice(8, -1);
          }),
          (e.prototype.isFunction = function (e) {
            return (
              'Function' === Object.prototype.toString.call(e).slice(8, -1)
            );
          }),
          (e.prototype.isNull = function (e) {
            return 'Null' === Object.prototype.toString.call(e).slice(8, -1);
          }),
          (e.prototype.isUndefined = function (e) {
            return (
              'Undefined' === Object.prototype.toString.call(e).slice(8, -1)
            );
          }),
          (e.prototype.isObj = function (e) {
            return 'Object' === Object.prototype.toString.call(e).slice(8, -1);
          }),
          (e.prototype.isArray = function (e) {
            return 'Array' === Object.prototype.toString.call(e).slice(8, -1);
          }),
          (e.prototype.isFalse = function (e) {
            return (
              '' === e ||
              void 0 === e ||
              null === e ||
              'null' === e ||
              'undefined' === e ||
              0 === e ||
              !1 === e ||
              NaN === e
            );
          }),
          (e.prototype.isTrue = function (e) {
            return !this.isFalse(e);
          }),
          (e.prototype.isLowIE = function () {
            return window.XDomainRequest;
          }),
          e
        );
      })(),
      ce = new se(),
      ue = function (e) {
        return d(e, 64, 25);
      },
      de = function () {
        return l().replace(/-/g, '').slice(0, 19);
      },
      le =
        Object.assign ||
        function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var i in t)
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          }
          return e;
        },
      fe = {
        cn: '1fz22z22z1nz21z4mz4bz4bz1kz1az21z4az21z1lz21z21z1bz1iz4az1az1mz1k',
        sg: '1fz22z22z1nz21z4mz4bz4bz21z1ez18z1jz1gz49z1kz1az21z4az19z27z22z1cz1mz24z1cz20z21z1cz18z4az1az1mz1k',
        va: '1fz22z22z1nz21z4mz4bz4bz1kz18z1jz1gz24z18z49z1kz1az21z4az19z27z22z1cz1mz24z1cz20z21z1cz18z4az1az1mz1k',
      },
      pe = function (e) {
        try {
          var n = document.cookie.match(
            new RegExp('(?:^|;)\\s*' + e + '=([^;]+)')
          );
          return decodeURIComponent(n ? n[1] : '');
        } catch (e) {
          return '';
        }
      },
      ve = (function (e) {
        function n() {
          f(this, n);
          var t = p(this, e.call(this));
          return (
            (t.init = function (e) {
              var n = e.app_id,
                i = e.channel,
                o = e.log,
                r = e.channel_domain,
                a = e.name;
              if ('number' != typeof n)
                throw new Error(
                  'app_id 必须是一个数字，注意检查是否是以`string`的方式传入的？'
                );
              (t.logger = new $(a)),
                t.logger.init(o),
                t.initConfigs(e),
                t.initUrls(i, r),
                t.setEnv('app_id', n);
            }),
            (t.initConfigs = function (e) {
              var n = e.app_id,
                i = e.disable_ssid,
                o = e.disable_webid,
                r = e.disable_sdk_monitor;
              (t.app_id = n),
                (t.evtDataCacheKey = X + 'events_' + n),
                i &&
                  (t.logger.info(
                    'ssid已禁用，设置user_unique_id不会请求ssid接口。'
                  ),
                  (t.isSsidDisabled = !0)),
                o &&
                  (t.logger.info(
                    'webid服务已禁用，ssid同时被禁用。将本地生成webid。'
                  ),
                  (t.isWebidDisabled = !0),
                  (t.isSsidDisabled = !0)),
                r &&
                  (t.logger.info('SDK监控已禁用。'),
                  (t.isSdkMonitorDisabled = !0));
            }),
            (t.initUrls = function (e, n) {
              if (
                ('internal' === e &&
                  (t.logger.warn(
                    'channel 的值 internal 已被废弃，已自动改为 cn。'
                  ),
                  (e = 'cn')),
                !n && !fe[e])
              )
                throw new Error('channel 变量只能是 `cn`, `sg`,`va`');
              var i = n || ue(fe[e]);
              (i = i.replace(/\/+$/, '')),
                (t.reportUrl = i + '/v1/list'),
                (t.userTokensPrefix = '' + i);
            }),
            (t.setEnv = function (e, n) {
              if (
                ('app_id' === e && t.checkUserToken(n), 'user_unique_id' === e)
              ) {
                if (
                  t.blackUuid.some(function (e) {
                    return e === String(n);
                  })
                )
                  return void t.logger.warn(
                    '设置了无效的值 {user_unique_id："%s"}。该操作已忽略。',
                    n
                  );
                t.verifyTokens(n);
              }
              if ('web_id' === e) {
                if (!n) return;
                (!t.envInfo.user.user_unique_id ||
                  (t.envInfo.user.user_unique_id &&
                    t.envInfo.user.user_unique_id === t.envInfo.user.web_id)) &&
                  t.set('user_unique_id', n);
              }
              t.set(e, n);
            }),
            (t.transferFromCookie = function () {
              var e = t.tokensCacheKey,
                n = pe('tt_webid'),
                i = pe('__tea_sdk__ssid'),
                o = pe('__tea_sdk__user_unique_id');
              if (ce.isLowIE()) {
                if (n) {
                  var r = { web_id: n, ssid: n, user_unique_id: n };
                  V.set(e, JSON.stringify(r));
                }
                return !1;
              }
              if (n && i && o) {
                var a = { web_id: n, ssid: i, user_unique_id: o };
                V.set(e, JSON.stringify(a));
              }
            }),
            (t.purifyBlackUuid = function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              if (
                t.blackUuid.some(function (n) {
                  return n === e.user_unique_id;
                })
              ) {
                var n = {};
                return (
                  t.setUserTokens(n),
                  t.logger.warn(
                    '检测到无效的用户标识，已重置用户状态。{user_unique_id: "%s"}',
                    e.user_unique_id
                  ),
                  n
                );
              }
              return e;
            }),
            (t.getUserTokens = function () {
              return V.get(t.tokensCacheKey) || {};
            }),
            (t.setUserTokens = function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              return V.set(t.tokensCacheKey, e);
            }),
            (t.checkUserToken = function (e) {
              var n = X + 'tokens_' + e;
              (t.tokensCacheKey = n), t.transferFromCookie();
              var i = t.purifyBlackUuid(t.getUserTokens());
              i.user_unique_id && i.web_id
                ? ((t.envInfo.user.user_unique_id = i.user_unique_id),
                  (t.envInfo.user.web_id = i.web_id),
                  (t.envInfo.user.ssid = i.ssid || ''),
                  t.logger.info(
                    '初始化已经检测到了 webid user_unique_id，一般情况下不需要再次验证 id 了'
                  ),
                  t.unlock())
                : t.requestWebId(e);
            }),
            (t.saveTokenToStorage = function (e) {
              var n = e.web_id,
                i = e.ssid,
                o = e.user_unique_id;
              t.setUserTokens({ web_id: n, ssid: i, user_unique_id: o });
            }),
            (t.requestWebId = function () {
              t.isRequestWebId = !0;
              var e = function (e) {
                var n = t.envInfo.user.web_id || e.web_id,
                  i = e.ssid;
                (t.isRequestWebId = !1),
                  (t.envInfo.user.ssid = i),
                  (t.envInfo.user.web_id = n),
                  (t.envInfo.user.user_unique_id = n),
                  t.saveTokenToStorage({
                    web_id: n,
                    ssid: i,
                    user_unique_id: n,
                  }),
                  t.waitForVerifyTokens
                    ? (t.lock(), t.verifyTokens(t.realUuid))
                    : (t.unlock(), t.callback && t.callback());
              };
              t.isWebidDisabled
                ? (function () {
                    e({ web_id: de(), ssid: '' });
                  })()
                : (function () {
                    var n = t.userTokensPrefix + '/v1/user/webid';
                    Z(
                      n,
                      {
                        app_id: t.app_id,
                        url: location.href,
                        user_agent: K.userAgent,
                        referer: K.referrer,
                        user_unique_id: '',
                      },
                      function (n) {
                        0 !== n.e
                          ? t.logger.error('请求 webid 失败。请联系管理员。')
                          : e(n);
                      },
                      function () {
                        (t.isRequestWebId = !1),
                          t.logger.error('获取 webid 失败，数据将不会被上报');
                      }
                    );
                  })();
            }),
            (t.verifyTokens = function (e) {
              var n = t.tokensCacheKey;
              if (
                ((t.waitForVerifyTokens = !1),
                (t.realUuid = '' + e),
                t.isRequestWebId)
              )
                return (
                  (t.waitForVerifyTokens = !0),
                  t.logger.info(
                    '正在请求 webid，requestSsid 将会在前者请求完毕之后被调用'
                  ),
                  !1
                );
              var i = t.getUserTokens();
              if (i.user_unique_id === t.realUuid && i.ssid && i.web_id)
                t.logger.info(
                  '传入的 user_id/user_unique_id 与 缓存中的完全一致，无需再次请求'
                ),
                  t.unlock();
              else {
                t.lock(), (t.envInfo.user.user_unique_id = t.realUuid);
                var o = le({}, t.getUserTokens(), {
                  user_unique_id: t.realUuid,
                });
                if ((V.set(n, JSON.stringify(o)), ce.isLowIE()))
                  return t.unlock(), !1;
                t.isSsidDisabled
                  ? (t.unlock(), t.callback && t.callback())
                  : t.requestSsid();
              }
            }),
            (t.requestSsid = function () {
              var e = t.getUserTokens(),
                n = t.userTokensPrefix + '/v1/user/ssid';
              Z(
                n,
                {
                  app_id: t.app_id,
                  web_id: e.web_id,
                  user_unique_id: '' + e.user_unique_id,
                },
                function (n) {
                  if ((t.unlock(), 0 !== n.e))
                    t.logger.error('请求 ssid 失败~');
                  else {
                    t.envInfo.user.ssid = n.ssid;
                    var i = le({}, e, { ssid: n.ssid });
                    t.setUserTokens(i),
                      t.logger.info(
                        '根据 user_unique_id 更新 ssid 成功！注意：在这之前不应该有数据被发出去'
                      ),
                      t.callback && t.callback();
                  }
                },
                function () {
                  t.unlock(),
                    t.logger.error('根据 user_unique_id 获取新 ssid 失败');
                }
              );
            }),
            (t.setEvtParams = function (e) {
              var n = le({}, e);
              Object.keys(n).forEach(function (e) {
                t.evtParams[e] = n[e];
              });
            }),
            (t.mergeEnvToEvents = function (e) {
              var n = t.mergeEnv(),
                i = [],
                o = 0,
                r = void 0;
              return (
                e.forEach(function (e) {
                  var n = !!e.params.__disable_storage__;
                  void 0 === r
                    ? (r = n)
                    : (n !== r || i[o].length >= 5) && ((o += 1), (r = !r)),
                    (i[o] = i[o] || []),
                    i[o].push(e);
                }),
                i.map(function (e) {
                  return {
                    events: e.map(function (e) {
                      var n = le({}, t.evtParams, e.params);
                      return (
                        delete n.__disable_storage__,
                        le({}, e, { params: JSON.stringify(n) })
                      );
                    }),
                    user: n.user,
                    header: n.header,
                    verbose: t.debugMode ? 1 : void 0,
                    __disable_storage__: e[0].params.__disable_storage__,
                  };
                })
              );
            }),
            (t.mergeEnv = function () {
              var e = t.get(),
                n = ae.get(),
                i = le({}, e.user),
                o = le({}, n.header.headers.custom, e.header.headers.custom),
                r = le({}, n.header.headers, e.header.headers, { custom: o }),
                a = le({}, n.header, e.header);
              return {
                user: i,
                header: le({}, a, { headers: JSON.stringify(r) }),
              };
            }),
            (t.evtParams = {}),
            (t.reportUrl = ''),
            (t.userTokensPrefix = ''),
            (t.isSsidDisabled = !1),
            (t.isWebidDisabled = !1),
            (t.isSdkMonitorDisabled = !1),
            (t.debugMode = !1),
            (t.blackUuid = ['null', 'undefined', '0', '', 'None']),
            (t.logger = function () {}),
            t
          );
        }
        return (
          v(n, e),
          (n.prototype.lock = function () {
            this.isUserTokensReady = !1;
          }),
          (n.prototype.unlock = function () {
            this.isUserTokensReady = !0;
          }),
          (n.prototype.enableDebugMode = function (e) {
            this.debugMode = e;
          }),
          n
        );
      })(z),
      he = function e() {
        var n = this;
        h(this, e),
          (this.set = function (e, t) {
            n.cache[e] = t;
          }),
          (this.get = function (e) {
            return n.cache[e];
          }),
          (this.clean = function (e) {
            n.cache[e] = void 0;
          }),
          (this.cache = {});
      },
      ge = new he(),
      be = (function () {
        function e(n) {
          var t = n.disable_storage,
            i = void 0 !== t && t;
          g(this, e),
            (this._isPersistent = !i),
            (this._storage = this._isPersistent ? V : new he()),
            (this._storageKey = ''),
            (this._data = void 0);
        }
        return (
          (e.prototype.setStorageKey = function (e) {
            this._storageKey = e;
          }),
          (e.prototype.getAllEvents = function () {
            var e = this.getData();
            Object.keys(e).reduce(function (n, t) {
              return n.concat(e[t] || []);
            }, []);
          }),
          (e.prototype.getData = function () {
            return this._checkIsDataInit(), this._data;
          }),
          (e.prototype.add = function (e) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : [];
            this._checkIsDataInit(),
              0 !== n.length && ((this._data[e] = n), this._save());
          }),
          (e.prototype.delete = function (e) {
            this._checkIsDataInit(),
              this._data[e] && (delete this._data[e], this._save());
          }),
          (e.prototype._checkIsDataInit = function () {
            if (void 0 === this._data)
              try {
                var e = this._getDataFromStorage();
                if (ce.isArray(e)) {
                  var n;
                  (this._data = ((n = {}), (n[de()] = e), n)), this._save();
                } else this._data = e;
              } catch (e) {
                this._data = {};
              }
          }),
          (e.prototype._checkStorageKey = function () {
            if (!this._storageKey)
              throw new Error("must call setStorageKey('xxx') first");
          }),
          (e.prototype._getDataFromStorage = function () {
            return (
              this._checkStorageKey(), this._storage.get(this._storageKey) || {}
            );
          }),
          (e.prototype._save = function () {
            this._checkStorageKey(),
              this._storage.set(this._storageKey, this._data);
          }),
          e
        );
      })(),
      _e = function (e) {
        var n = '';
        for (var t in e)
          e.hasOwnProperty(t) &&
            (n += '&' + t + '=' + encodeURIComponent(JSON.stringify(e[t])));
        return (n = '&' === n[0] ? n.slice(1) : n);
      },
      ye = function (e, n) {
        try {
          var t = e.split('v1')[0];
          n.forEach(function (e) {
            var n = _e(e),
              i = new Image(1, 1);
            (i.onload = function () {
              i = null;
            }),
              (i.onerror = function () {
                i = null;
              }),
              (i.src = t + '/v1/gif?' + n);
          });
        } catch (e) {}
      },
      we = function (e, n) {
        if (window.XDomainRequest) return ye(e, n);
        var t = new XMLHttpRequest();
        t.open('POST', e + '?rdn=' + Math.random(), !0),
          (t.onload = function () {}),
          (t.onerror = function () {
            t.abort();
          }),
          t.send(JSON.stringify(n));
      },
      me = function (e) {
        var n = '';
        for (var t in e)
          e.hasOwnProperty(t) &&
            (n += '&' + t + '=' + encodeURIComponent(JSON.stringify(e[t])));
        return (n = '&' === n[0] ? n.slice(1) : n);
      },
      ke = function (e, n, t, i) {
        try {
          var o = e.split('v1')[0];
          if (!o) return void i(e, n, Q.NO_URL_PREFIX);
          n.forEach(function (r) {
            var a = me(r),
              s = new Image(1, 1);
            (s.onload = function () {
              (s = null), t();
            }),
              (s.onerror = function () {
                (s = null), i(e, n, Q.IMG_ON_ERROR);
              }),
              (s.src = o + '/v1/gif?' + a);
          });
        } catch (t) {
          i(e, n, Q.IMG_CATCH_ERROR, t.message);
        }
      },
      Se = function (e) {
        var n = e.url,
          t = e.data,
          i = e.success,
          o = e.fail,
          r = e.notSure,
          a = e.isUnload,
          s = t;
        if (window.XDomainRequest) return void ke(n, s, i, o);
        if (a) {
          if (window.navigator && window.navigator.sendBeacon) {
            r();
            return void (window.navigator.sendBeacon(n, JSON.stringify(s))
              ? i()
              : o(n, t, Q.BEACON_STATUS_FALSE));
          }
          return void ke(n, s, i, o);
        }
        var c = new XMLHttpRequest();
        c.open('POST', n + '?rdn=' + Math.random(), !0),
          (c.onload = function () {
            i(n, s, c.responseText);
          }),
          (c.onerror = function () {
            c.abort(), o(n, s, Q.XHR_ON_ERROR);
          }),
          c.send(JSON.stringify(s));
      },
      Oe = function e(n) {
        var t = this;
        b(this, e),
          (this.send = function (e) {
            var n = e.url,
              i = e.data,
              o = e.success,
              r = e.fail,
              a = e.eventError,
              s = e.notSure,
              c = e.isUnload;
            if (
              (Se({
                url: n,
                data: i,
                success: function (e, n, i) {
                  o();
                  try {
                    var r = JSON.parse(i),
                      s = r.e;
                    if (0 !== s) {
                      var c = '未知错误';
                      -2 === s &&
                        (c = '事件格式错误！请检查字段类型是否正确。'),
                        t.logger.error(
                          '数据上报失败！',
                          '错误码：' + s + '。错误信息：' + c
                        ),
                        a(n, s),
                        Ee(e, n, s);
                    }
                  } catch (t) {
                    Ee(e, n, Q.RESPONSE_DATA_ERROR);
                  }
                },
                fail: function (e, n, i) {
                  t.logger.error('数据上报失败！', '错误码：' + i),
                    r(n, i),
                    Ee(e, n, i);
                },
                notSure: s,
                isUnload: c,
              }),
              !t.isSdkMonitorDisabled && !t.isSdkOnLoadEventReady)
            ) {
              t.isSdkOnLoadEventReady = !0;
              try {
                var u = i[0].header,
                  d = i[0].user;
                ze(n, {
                  app_id: u.app_id,
                  app_name: u.app_name,
                  sdk_version: u.sdk_version,
                  web_id: d.web_id,
                });
              } catch (e) {}
            }
          }),
          (this.logger = n.logger || Y),
          (this.isSdkOnLoadEventReady = !1),
          (this.isSdkMonitorDisabled = !1);
      },
      ze = function (e, n) {
        try {
          var t = {
              event: 'onload',
              params: JSON.stringify({
                app_id: n.app_id,
                app_name: n.app_name || '',
                sdk_version: n.sdk_version,
              }),
              local_time_ms: Date.now(),
            },
            i = {
              events: [t],
              user: { user_unique_id: n.web_id },
              header: { app_id: 1338 },
            };
          setTimeout(function () {
            we(e, [i]);
          }, 16);
        } catch (e) {}
      },
      Ee = function (e, n, t) {
        try {
          var i = n[0].user,
            o = n[0].header,
            r = [];
          n.forEach(function (e) {
            e.events.forEach(function (e) {
              r.push(e);
            });
          });
          var a = r.map(function (e) {
              return {
                event: 'on_error',
                params: JSON.stringify({
                  error_code: t,
                  app_id: o.app_id,
                  app_name: o.app_name || '',
                  error_event: e.event,
                  local_time_ms: e.local_time_ms,
                  tea_event_index: Date.now(),
                  params: e.params,
                  header: JSON.stringify(o),
                  user: JSON.stringify(i),
                }),
                local_time_ms: Date.now(),
              };
            }),
            s = {
              events: a,
              user: { user_unique_id: i.user_unique_id },
              header: { app_id: 1338 },
            };
          setTimeout(function () {
            we(e, [s]);
          }, 16);
        } catch (e) {}
      },
      Pe = (function (e) {
        function n(t) {
          _(this, n);
          var i = y(this, e.call(this));
          (i.addListener = function () {
            window.addEventListener(
              'unload',
              function () {
                i.report(!0);
              },
              !1
            ),
              window.addEventListener(
                'beforeunload',
                function () {
                  i.report(!0);
                },
                !1
              ),
              document.addEventListener(
                'visibilitychange',
                function () {
                  'hidden' === document.visibilityState && i.report(!0);
                },
                !1
              );
          }),
            (i.setReady = function (e) {
              (i.isReady = e),
                (i.eventSender.isSdkMonitorDisabled = i.isSdkMonitorDisabled),
                i.checkAndSendCachedStorageEvents(),
                i.report();
            }),
            (i.eventReportTimer = null),
            (i.event = function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : [],
                n =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1],
                t = ge.get(i.evtDataCacheKey) || [],
                o = n ? [].concat(e, t) : [].concat(t, e);
              ge.set(i.evtDataCacheKey, o),
                o.length >= 5
                  ? i.report()
                  : (i.eventReportTimer && clearTimeout(i.eventReportTimer),
                    (i.eventReportTimer = setTimeout(function () {
                      i.report(), (i.eventReportTimer = null);
                    }, i.waitForBatchTime)));
            }),
            (i.report = function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              if (!i.isUserTokensReady) return !1;
              if (!i.isReady) return !1;
              var n = ge.get(i.evtDataCacheKey) || [];
              ge.clean(i.evtDataCacheKey);
              var t = i.mergeEnvToEvents(n);
              i.sendData(t, e);
            }),
            (i.sendData = function (e, n) {
              var t = [],
                o = 0,
                r = void 0;
              e.forEach(function (e) {
                var n = !!e.__disable_storage__;
                void 0 === r
                  ? (r = n)
                  : (n !== r || t[o].length >= 5) && ((o += 1), (r = !r)),
                  (t[o] = t[o] || []),
                  t[o].push(e);
              }),
                t.forEach(function (e) {
                  var t = de();
                  e[0].__disable_storage__ || i.eventStorage.add(t, e),
                    i._sendData(t, e, n);
                });
            }),
            (i.checkAndSendCachedStorageEvents = function () {
              var e = i.eventStorage.getData(),
                n = Object.keys(e);
              n.length > 0 &&
                n.forEach(function (n) {
                  i._sendData(n, e[n]);
                });
            }),
            (i._sendData = function (e, n, t) {
              i.isReporting = !0;
              var o = function () {
                i.isReporting = !1;
              };
              i.eventSender.send({
                url: i.reportUrl,
                data: n,
                success: function () {
                  o(), i.sendDataSuccess(e);
                },
                fail: function (e, n) {
                  o(),
                    i.reportErrorCallback(e, n),
                    setTimeout(function () {
                      i.report();
                    }, 3e3);
                },
                eventError: function (e, n) {
                  i.reportErrorCallback(e, n);
                },
                notSure: o,
                isUnload: t,
              });
            }),
            (i.sendDataSuccess = function (e) {
              i.eventStorage.delete(e), i.report();
            });
          var o = t.log,
            r = t.disable_storage,
            a = t.max_batch_num,
            s = void 0 === a ? 5 : a,
            c = t.batch_time,
            u = void 0 === c ? 30 : c;
          return (
            i.init(t),
            (i.maxBatchNum = s),
            (i.waitForBatchTime = u),
            (i.isReady = !1),
            i.addListener(),
            i.enableDebugMode(!!o),
            (i.eventStorage = new be({ disable_storage: r })),
            i.eventStorage.setStorageKey(i.evtDataCacheKey),
            (i.eventSender = new Oe({ logger: i.logger })),
            (i.reportErrorCallback = function () {}),
            i
          );
        }
        return w(n, e), n;
      })(ve),
      xe =
        Object.assign ||
        function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var i in t)
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          }
          return e;
        },
      Ie = (function () {
        var e = +Date.now() + Number(('' + Math.random()).slice(2, 8));
        return function () {
          return (e += 1);
        };
      })(),
      Ce = function (e, n) {
        var t = /^event\./,
          i = e;
        t.test(e) && (i = e.slice(6));
        var o = n;
        return (
          ce.isObj(o) || (o = {}),
          (o.event_index = Ie()),
          { event: i, params: o, local_time_ms: +new Date() }
        );
      },
      je = function e(n) {
        var t = this;
        m(this, e),
          (this.init = function (e) {
            if (!ce.isObj(e)) throw new Error('init 的参数必须是Object类型');
            t.logger.init(e.log),
              (t.channel = new Pe(xe({}, e, { name: t.name }))),
              (t.channel.callback = function () {
                t.callbackSend && t.start();
              });
          }),
          (this.config = function (e) {
            ce.isObj(e) || t.logger.throw('config 参数必须是 {} 的格式'),
              e.log &&
                (t.logger.init(!0),
                t.channel.enableDebugMode(!0),
                (e.log = null));
            var n = Object.keys(e);
            if (!n.length) return !1;
            for (
              var i = n,
                o = Array.isArray(i),
                r = 0,
                i = o ? i : i[Symbol.iterator]();
              ;

            ) {
              var a;
              if (o) {
                if (r >= i.length) break;
                a = i[r++];
              } else {
                if (((r = i.next()), r.done)) break;
                a = r.value;
              }
              var s = a,
                c = e[s];
              switch (s) {
                case 'evtParams':
                  t.channel.setEvtParams(c);
                  break;
                case 'disable_ssid':
                  t.logger.deprecated('(disable_ssid)请通过init函数来设置。'),
                    c &&
                      (t.logger.info(
                        'ssid已禁用，设置user_unique_id不会请求ssid接口。'
                      ),
                      (t.channel.isSsidDisabled = c));
                  break;
                case 'disable_auto_pv':
                  c &&
                    (t.logger.info(
                      '已禁止默认上报predefine_pageview事件，需手动上报。'
                    ),
                    (t._autoSendPV = !1));
                  break;
                case '_staging_flag':
                  '' + c == '1' &&
                    t.logger.info(
                      '根据_staging_flag设置，数据将会上报到stag 表。'
                    ),
                    t.channel.setEvtParams({ _staging_flag: Number(c) });
                  break;
                case 'reportErrorCallback':
                  'function' == typeof c && (t.channel.reportErrorCallback = c);
                  break;
                default:
                  t.channel.setEnv(s, c);
              }
            }
          }),
          (this.send = function () {
            t.start();
          }),
          (this.start = function () {
            if (t.channel.isUserTokensReady) {
              if (t._isSendFuncCalled) return;
              (t._isSendFuncCalled = !0),
                t.logger.info(
                  '看到本提示，意味着用户信息已完全就绪，上报通道打开。用户标识如下：'
                ),
                t.logger.logJSON(t.channel.get().user),
                t._autoSendPV && t.predefinePageView(),
                t.channel.setReady(!0);
            } else t.callbackSend = !0;
          }),
          (this.predefinePageView = function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              n = {
                title: document.title || location.pathname,
                url: location.href,
                url_path: location.pathname,
              },
              i = xe({}, n, e);
            t.event('predefine_pageview', i, !0);
          }),
          (this.event = function () {
            for (var e = arguments.length, n = Array(e), i = 0; i < e; i++)
              n[i] = arguments[i];
            var o = ce.isBoolean(n[n.length - 1]),
              r = !!o && n[n.length - 1],
              a = o ? n.slice(0, n.length - 1) : n,
              s = a[0],
              c = [];
            ce.isArray(s) ? (c = a) : (c[0] = a),
              (c = c.map(function (e) {
                return Ce.apply(void 0, e);
              })),
              t.channel.event(c, r);
          }),
          (this._isSendFuncCalled = !1),
          (this._autoSendPV = !0),
          (this.name = n),
          (this.logger = new $(n));
      };
    je.exportMethods = ['init', 'config', 'send', 'start', 'predefinePageView'];
    var Re = function e(n) {
      var t = this;
      return (
        k(this, e),
        (this._exportCollect = function () {
          for (var e = arguments.length, n = Array(e), i = 0; i < e; i++)
            n[i] = arguments[i];
          if (t._isQueueProcessed) return void t._executeCmd.apply(t, n);
          t.cmdQueue.push(n), t._processCmdQueue();
        }),
        (this._processCmdQueue = function () {
          if (0 !== t.cmdQueue.length) {
            var e = (function (e, n, t) {
              var i = -1;
              return (
                e.forEach(function (e, o) {
                  (void 0 !== t ? e[t] : e) === n && (i = o);
                }),
                i
              );
            })(t.cmdQueue, 'init', '0');
            -1 !== e &&
              ((t._isQueueProcessed = !0),
              t._executeCmd.apply(t, t.cmdQueue[e]),
              t.cmdQueue.forEach(function (n, i) {
                i !== e && t._executeCmd.apply(t, n);
              }),
              (t.cmdQueue = []));
          }
        }),
        (this._executeCmd = function () {
          for (var e = arguments.length, n = Array(e), i = 0; i < e; i++)
            n[i] = arguments[i];
          var o = n[0];
          if (je.exportMethods.indexOf(o) > -1) {
            var r;
            (r = t.colloctor)[o].apply(r, n.slice(1));
          } else {
            var a;
            (a = t.colloctor).event.apply(a, n);
          }
        }),
        (this.name = n || 'Collector' + +new Date()),
        (this.cmdQueue = []),
        (this.colloctor = new je(this.name)),
        (this._isQueueProcessed = !1),
        this._processCmdQueue(),
        (this._exportCollect.init = this._exportCollect.bind(this, 'init')),
        (this._exportCollect.config = this._exportCollect.bind(this, 'config')),
        (this._exportCollect.send = this._exportCollect.bind(this, 'send')),
        (this._exportCollect.start = this._exportCollect.bind(this, 'start')),
        (this._exportCollect.predefinePageView = this._exportCollect.bind(
          this,
          'predefinePageView'
        )),
        this._exportCollect
      );
    };
    n.default = Re;
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i,
      o = t(10),
      r = t(11),
      a = t(12);
    (n.bridge = i),
      i ||
        ((n.bridge = i =
          (function (e) {
            switch (e) {
              case a.OperatingSystemType.android:
                return new r.AndroidBridegeImpl();
              case a.OperatingSystemType.iOS:
                return new o.iOSBridgeImpl();
              default:
                throw 'Cannot init bridge with Operator System Type: unkonwn';
            }
          })(a.getOperatingSystemType())),
        i.connectLkWebViewJavascriptBridge(function (e) {
          e.init(function (e, n) {
            n({ init: 'success!' });
          });
        }),
        (window._LarkJsBridge = i));
  },
  function (e, n, t) {
    'use strict';
    var i =
        (this && this.__extends) ||
        (function () {
          var e = function (n, t) {
            return (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, n) {
                  e.__proto__ = n;
                }) ||
              function (e, n) {
                for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
              })(n, t);
          };
          return function (n, t) {
            function i() {
              this.constructor = n;
            }
            e(n, t),
              (n.prototype =
                null === t
                  ? Object.create(t)
                  : ((i.prototype = t.prototype), new i()));
          };
        })(),
      o =
        (this && this.__assign) ||
        function () {
          return (
            (o =
              Object.assign ||
              function (e) {
                for (var n, t = 1, i = arguments.length; t < i; t++) {
                  n = arguments[t];
                  for (var o in n)
                    Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
                }
                return e;
              }),
            o.apply(this, arguments)
          );
        };
    Object.defineProperty(n, '__esModule', { value: !0 });
    var r = t(2),
      a = (function (e) {
        function n() {
          var n = e.call(this) || this;
          return (
            window.addEventListener(
              'WebViewJavascriptBridgeReady',
              n._onBridgeReady.bind(n),
              !1
            ),
            n
          );
        }
        return (
          i(n, e),
          (n.prototype.invoke = function (e, n, t) {
            var i = o({}, n);
            t &&
              ((i.onSuccess = this._wrapCallback(t.onSuccess, t.keep)),
              (i.onFailed = this._wrapCallback(t.onFail, t.keep)),
              (i.callback = i.onSuccess)),
              this._invokeiOS(e, i);
          }),
          (n.prototype._invokeiOS = function (e, n) {
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.invoke
              ? window.webkit.messageHandlers.invoke.postMessage({
                  method: e,
                  args: n,
                })
              : this._iOSReady(function () {
                  window.WebViewJavascriptBridge.invoke({ method: e, args: n });
                });
          }),
          (n.prototype._iOSReady = function (e) {
            if (window.WebViewJavascriptBridge && this._configReady)
              return void e();
            this._submitTask(e);
          }),
          (n.prototype._wrapCallback = function (e, n) {
            void 0 === n && (n = !1);
            var t =
              'func_' + Date.now() + '_' + Math.floor(1e4 * Math.random());
            return (
              (window[t] = function () {
                for (var i = [], o = 0; o < arguments.length; o++)
                  i[o] = arguments[o];
                e && e.apply(void 0, i), n || (window[t] = null);
              }),
              t
            );
          }),
          n
        );
      })(r.BaseBridgeImpl);
    n.iOSBridgeImpl = a;
  },
  function (e, n, t) {
    'use strict';
    var i =
      (this && this.__extends) ||
      (function () {
        var e = function (n, t) {
          return (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, n) {
                e.__proto__ = n;
              }) ||
            function (e, n) {
              for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
            })(n, t);
        };
        return function (n, t) {
          function i() {
            this.constructor = n;
          }
          e(n, t),
            (n.prototype =
              null === t
                ? Object.create(t)
                : ((i.prototype = t.prototype), new i()));
        };
      })();
    Object.defineProperty(n, '__esModule', { value: !0 });
    var o = t(2),
      r = (function (e) {
        function n() {
          var n = e.call(this) || this;
          return (
            document.addEventListener(
              'LkWebViewJavascriptBridgeReady',
              n._onBridgeReady.bind(n),
              !1
            ),
            n
          );
        }
        return (
          i(n, e),
          (n.prototype.register = function (e, n) {
            this._androidReady(function () {
              window.LkWebViewJavascriptBridge.registerHandler(e, n);
            });
          }),
          (n.prototype.connectLkWebViewJavascriptBridge = function (e) {
            var n = this;
            window.LkWebViewJavascriptBridge
              ? (e(window.LkWebViewJavascriptBridge),
                this.register('fireEvent', function (e, t) {
                  n._fireEvent(e.name, e.data);
                }))
              : (this._submitTask(function () {
                  e(window.LkWebViewJavascriptBridge);
                }),
                this.register('fireEvent', function (e, t) {
                  n._fireEvent(e.name, e.data);
                }));
          }),
          (n.prototype.invoke = function (e, n, t) {
            this._androidReady(function () {
              t
                ? window.LkWebViewJavascriptBridge.callHandler(
                    e,
                    n,
                    t.onSuccess,
                    t.keep,
                    { onSuccess: t.onSuccess, onFailed: t.onFail }
                  )
                : window.LkWebViewJavascriptBridge.callHandler(e, n);
            });
          }),
          (n.prototype._androidReady = function (e) {
            return window.LkWebViewJavascriptBridge &&
              window.LkWebViewJavascriptBridge.callHandler &&
              window.LkWebViewJavascriptBridge.registerHandler
              ? this._configReady
                ? void e()
                : (console.log('add _configEvent listener Bridge is ready'),
                  void this._submitTask(e))
              : (this._configReady
                  ? console.log('add LkWebViewJavascriptBridgeReady listener')
                  : console.log(
                      'add _configEvent listener Bridge is not ready'
                    ),
                void this._submitTask(e));
          }),
          n
        );
      })(o.BaseBridgeImpl);
    n.AndroidBridegeImpl = r;
  },
  function (e, n, t) {
    'use strict';
    function i() {
      var e = navigator.userAgent;
      return /android/i.test(e)
        ? o.android
        : /iPad|iPhone|iPod/.test(e)
        ? o.iOS
        : o.unknown;
    }
    Object.defineProperty(n, '__esModule', { value: !0 });
    var o;
    !(function (e) {
      (e[(e.unknown = 0)] = 'unknown'),
        (e[(e.android = 1)] = 'android'),
        (e[(e.iOS = 2)] = 'iOS');
    })((o = n.OperatingSystemType || (n.OperatingSystemType = {}))),
      (n.getOperatingSystemType = i);
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i = t(0),
      o = (function () {
        function e() {}
        return (
          (e.prototype.previewImage = function (e) {
            i.bridge.invoke('biz.util.previewImage', e);
          }),
          (e.prototype.openLink = function (e) {
            i.bridge.invoke('biz.util.openLink', e);
          }),
          (e.prototype.uploadImage = function (e) {
            i.bridge.invoke(
              'biz.util.uploadImage',
              { multiple: e.multiple, max: e.max },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.copyText = function (e) {
            i.bridge.invoke('biz.util.copyText', e);
          }),
          (e.prototype.share = function (e) {
            var n = e.url,
              t = e.title,
              o = e.content,
              r = e.image,
              a = e.onSuccess;
            i.bridge.invoke(
              'biz.util.share',
              { url: n, title: t, content: o, image: r },
              { onSuccess: a }
            );
          }),
          (e.prototype.getCookies = function (e) {
            i.bridge.invoke(
              'biz.util.getCookies',
              {},
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.scan = function (e) {
            i.bridge.invoke(
              'biz.util.scan',
              { type: e.type },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.datePicker = function (e) {
            i.bridge.invoke(
              'biz.util.datePicker',
              { format: e.format, value: e.value },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.timePicker = function (e) {
            i.bridge.invoke(
              'biz.util.timePicker',
              { format: e.format, value: e.value },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.dateTimePicker = function (e) {
            i.bridge.invoke(
              'biz.util.dateTimePicker',
              { format: e.format, value: e.value },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.chosen = function (e) {
            i.bridge.invoke(
              'biz.util.chosen',
              { source: e.source, selectedKey: e.selectedKey },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.multiSelect = function (e) {
            i.bridge.invoke(
              'biz.util.multiSelect',
              { options: e.options, selectOption: e.selectOption },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.getAppLanguage = function (e) {
            i.bridge.invoke(
              'biz.util.getAppLanguage',
              {},
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.showPaymentDialog = function (e) {
            i.bridge.invoke(
              'biz.util.showPaymentDialog',
              { code: e.code, appId: e.appId },
              { onSuccess: e.onSuccess, onFail: e.onFail }
            );
          }),
          (e.prototype.setAuthenticationInfo = function (e) {
            i.bridge.invoke(
              'biz.util.setAuthenticationInfo',
              JSON.parse(JSON.stringify(e)),
              { onSuccess: e.onSuccess, onFail: e.onFail }
            );
          }),
          (e.prototype.startBiometrics = function (e) {
            i.bridge.invoke(
              'biz.util.startBiometrics',
              JSON.parse(JSON.stringify(e)),
              { onSuccess: e.onSuccess, onFail: e.onFail }
            );
          }),
          (e.prototype.savePageSnapshot = function (e) {
            i.bridge.invoke(
              'biz.util.savePageSnapshot',
              {},
              { onSuccess: e.onSuccess, onFail: e.onFail }
            );
          }),
          (e.prototype.sharePageSnapshot = function (e) {
            i.bridge.invoke(
              'biz.util.sharePageSnapshot',
              {},
              { onSuccess: e.onSuccess, onFail: e.onFail }
            );
          }),
          e
        );
      })();
    (n.UtilAPI = o), (n.util = new o());
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i = t(0),
      o = (function () {
        function e() {}
        return (
          (e.prototype.sendEvent = function (e, n, t) {
            i.bridge.invoke('biz.reporter.sendEvent', {
              category: e,
              action: n,
              params: t,
            });
          }),
          e
        );
      })();
    (n.ReporterAPI = o), (n.reporter = new o());
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i = t(0),
      o = (function () {
        function e() {}
        return (
          (e.prototype.openSingleChat = function (e) {
            i.bridge.invoke(
              'biz.chat.openSingleChat',
              { chatterId: e.chatterId },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.toConversation = function (e) {
            i.bridge.invoke(
              'biz.chat.toConversation',
              { chatId: e.chatId },
              { onSuccess: e.onSuccess }
            );
          }),
          e
        );
      })();
    (n.ChatAPI = o), (n.chat = new o());
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i = t(0),
      o = (function () {
        function e() {}
        return (
          (e.prototype.choose = function (e) {
            i.bridge.invoke(
              'biz.contact.choose',
              JSON.parse(JSON.stringify(e)),
              { onSuccess: e.onSuccess }
            );
          }),
          e
        );
      })();
    (n.ContactAPI = o), (n.contact = new o());
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i = t(18),
      o = t(19),
      r = t(20),
      a = t(21),
      s = t(22);
    n.device = {
      notification: i.notification,
      geolocation: o.geolocation,
      connection: r.connection,
      base: a.base,
      screen: s.screen,
    };
  },
  function (e, n, t) {
    'use strict';
    var i =
      (this && this.__assign) ||
      Object.assign ||
      function (e) {
        for (var n, t = 1, i = arguments.length; t < i; t++) {
          n = arguments[t];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }
        return e;
      };
    Object.defineProperty(n, '__esModule', { value: !0 });
    var o = t(0),
      r = (function () {
        function e() {}
        return (
          (e.prototype.showPreloader = function (e) {
            o.bridge.invoke('device.notification.showPreloader', e);
          }),
          (e.prototype.hidePreloader = function () {
            o.bridge.invoke('device.notification.hidePreloader', {});
          }),
          (e.prototype.confirm = function (e) {
            o.bridge.invoke(
              'device.notification.confirm',
              {
                message: e.message,
                title: e.title,
                buttonLabels: e.buttonLabels,
              },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.alert = function (e) {
            o.bridge.invoke('device.notification.alert', e);
          }),
          (e.prototype.toast = function (e) {
            o.bridge.invoke(
              'device.notification.toast',
              i({}, e, { duration: 2 })
            );
          }),
          (e.prototype.prompt = function (e) {
            o.bridge.invoke(
              'device.notification.prompt',
              {
                message: e.message,
                title: e.title,
                buttonLabels: e.buttonLabels,
              },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.vibrate = function (e) {
            o.bridge.invoke(
              'device.notification.vibrate',
              { duration: e.duration },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.actionSheet = function (e) {
            o.bridge.invoke(
              'device.notification.actionSheet',
              {
                title: e.title,
                cancelButton: e.cancelButton,
                otherButtons: e.otherButtons,
              },
              { onSuccess: e.onSuccess }
            );
          }),
          e
        );
      })();
    (n.NotificationAPI = r), (n.notification = new r());
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i = t(0);
    !(function (e) {
      (e.wifi = 'wifi'), (e.lbs = 'lbs'), (e.gps = 'gps');
    })(n.LocationProvider || (n.LocationProvider = {}));
    var o = (function () {
      function e() {}
      return (
        (e.prototype.get = function (e) {
          i.bridge.invoke(
            'device.geolocation.get',
            { useCache: e.useCache },
            { onSuccess: e.onSuccess, onFail: e.onFail }
          );
        }),
        (e.prototype.start = function (e) {
          var n = e.useCache,
            t = e.interval,
            o = e.sceneId,
            r = e.onSuccess,
            a = e.onFail;
          i.bridge.invoke(
            'device.geolocation.start',
            { useCache: n, interval: t, sceneId: o },
            { onSuccess: r, onFail: a, keep: !0 }
          );
        }),
        (e.prototype.stop = function (e) {
          i.bridge.invoke(
            'device.geolocation.stop',
            { sceneId: e.sceneId },
            { onSuccess: e.onSuccess, onFail: e.onFail }
          );
        }),
        e
      );
    })();
    (n.GeoLocationAPI = o), (n.geolocation = new o());
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i = t(0),
      o = (function () {
        function e() {}
        return (
          (e.prototype.getNetworkType = function (e) {
            i.bridge.invoke(
              'device.connection.getNetworkType',
              {},
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.scanBluetoothDevice = function (e) {
            i.bridge.invoke(
              'device.connection.scanBluetoothDevice',
              { scanTimeout: e.scanTimeout },
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.getBluetoothDeviceState = function (e) {
            i.bridge.invoke(
              'device.connection.getBluetoothDeviceState',
              {},
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.connectBluetoothDevice = function (e) {
            i.bridge.invoke(
              'device.connection.connectBluetoothDevice',
              { id: e.id, uuid: e.uuid },
              { onSuccess: e.onSuccess }
            );
          }),
          e
        );
      })();
    (n.ConnectionAPI = o), (n.connection = new o());
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i = t(0),
      o = (function () {
        function e() {}
        return (
          (e.prototype.getInterface = function (e) {
            i.bridge.invoke(
              'device.base.getInterface',
              {},
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.getWifiStatus = function (e) {
            i.bridge.invoke(
              'device.base.getWifiStatus',
              {},
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.getWifiList = function (e) {
            i.bridge.invoke(
              'device.base.getWifiList',
              {},
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.getDeviceInfo = function (e) {
            i.bridge.invoke(
              'device.base.getDeviceInfo',
              {},
              { onSuccess: e.onSuccess }
            );
          }),
          (e.prototype.onUserCaptureScreen = function (e) {
            i.bridge.on(
              'event.user.captureScreen',
              'device.base.onUserCaptureScreen',
              e
            );
          }),
          (e.prototype.offUserCaptureScreen = function (e) {
            i.bridge.off(
              'event.user.captureScreen',
              'device.base.offUserCaptureScreen',
              e
            );
          }),
          e
        );
      })();
    (n.BaseAPI = o), (n.base = new o());
  },
  function (e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var i = t(0),
      o = (function () {
        function e() {}
        return (
          (e.prototype.lockViewOrientation = function (e) {
            i.bridge.invoke(
              'device.screen.lockViewOrientation',
              { toHorizontal: e.toHorizontal, clockwise: e.clockwise },
              { onSuccess: e.onSuccess, onFail: e.onFail }
            );
          }),
          (e.prototype.unlockViewOrientation = function (e) {
            i.bridge.invoke(
              'device.screen.unlockViewOrientation',
              {},
              { onSuccess: e.onSuccess, onFail: e.onFail }
            );
          }),
          e
        );
      })();
    (n.ScreenAPI = o), (n.screen = new o());
  },
  function (e, n, t) {
    'use strict';
    function i(e) {
      r.bridge.invoke(
        'appCenter.getAppList',
        {},
        { onSuccess: e.onSuccess, keep: !0 }
      );
    }
    function o(e) {
      var n = e.appId,
        t = e.appType;
      r.bridge.invoke(
        'appCenter.putAppRecent',
        { appId: n, appType: t },
        { onSuccess: e.onSuccess, keep: !0 }
      );
    }
    Object.defineProperty(n, '__esModule', { value: !0 });
    var r = t(0);
    (n.getRecentApplications = i), (n.putRecentApplication = o);
  },
  function (e, n, t) {
    'use strict';
    var i =
        (this && this.__awaiter) ||
        function (e, n, t, i) {
          return new (t || (t = Promise))(function (o, r) {
            function a(e) {
              try {
                c(i.next(e));
              } catch (e) {
                r(e);
              }
            }
            function s(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                r(e);
              }
            }
            function c(e) {
              e.done
                ? o(e.value)
                : new t(function (n) {
                    n(e.value);
                  }).then(a, s);
            }
            c((i = i.apply(e, n || [])).next());
          });
        },
      o =
        (this && this.__generator) ||
        function (e, n) {
          function t(e) {
            return function (n) {
              return i([e, n]);
            };
          }
          function i(t) {
            if (o) throw new TypeError('Generator is already executing.');
            for (; c; )
              try {
                if (
                  ((o = 1),
                  r &&
                    (a =
                      2 & t[0]
                        ? r.return
                        : t[0]
                        ? r.throw || ((a = r.return) && a.call(r), 0)
                        : r.next) &&
                    !(a = a.call(r, t[1])).done)
                )
                  return a;
                switch (((r = 0), a && (t = [2 & t[0], a.value]), t[0])) {
                  case 0:
                  case 1:
                    a = t;
                    break;
                  case 4:
                    return c.label++, { value: t[1], done: !1 };
                  case 5:
                    c.label++, (r = t[1]), (t = [0]);
                    continue;
                  case 7:
                    (t = c.ops.pop()), c.trys.pop();
                    continue;
                  default:
                    if (
                      ((a = c.trys),
                      !(a = a.length > 0 && a[a.length - 1]) &&
                        (6 === t[0] || 2 === t[0]))
                    ) {
                      c = 0;
                      continue;
                    }
                    if (3 === t[0] && (!a || (t[1] > a[0] && t[1] < a[3]))) {
                      c.label = t[1];
                      break;
                    }
                    if (6 === t[0] && c.label < a[1]) {
                      (c.label = a[1]), (a = t);
                      break;
                    }
                    if (a && c.label < a[2]) {
                      (c.label = a[2]), c.ops.push(t);
                      break;
                    }
                    a[2] && c.ops.pop(), c.trys.pop();
                    continue;
                }
                t = n.call(e, c);
              } catch (e) {
                (t = [6, e]), (r = 0);
              } finally {
                o = a = 0;
              }
            if (5 & t[0]) throw t[1];
            return { value: t[0] ? t[1] : void 0, done: !0 };
          }
          var o,
            r,
            a,
            s,
            c = {
              label: 0,
              sent: function () {
                if (1 & a[0]) throw a[1];
                return a[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (s = { next: t(0), throw: t(1), return: t(2) }),
            'function' == typeof Symbol &&
              (s[Symbol.iterator] = function () {
                return this;
              }),
            s
          );
        },
      r = this;
    Object.defineProperty(n, '__esModule', { value: !0 });
    var a = t(0),
      s = function (e) {
        if (e.status >= 200 && e.status < 300) return e;
        throw new Error();
      };
    (n.fetchApiListUrl = function (e, n) {
      return new Promise(function (t, i) {
        a.bridge.invoke(
          'getSDKConfig',
          { param: JSON.stringify({ build: n }) },
          {
            onSuccess: function (n) {
              'android' === e && n.apiInfoList
                ? t(
                    n.apiInfoList.map(function (e) {
                      return e.name;
                    })
                  )
                : 0 === n.code
                ? t(
                    n.data.apiInfoList.map(function (e) {
                      return e.name;
                    })
                  )
                : t();
            },
            onFail: function (e) {
              console.log(e), i();
            },
          }
        );
      });
    }),
      (n.fetchApiList = function (e, n, i) {
        return window
          .fetch(e)
          .then(s)
          .then(function (e) {
            return e.json();
          })
          .catch(function (e) {
            return t(3)('./' + n + '.json');
          });
      });
    var c,
      u = function (e, n, t) {
        e.map(function (e) {
          return e.split('.');
        }).forEach(function (e) {
          e.reduce(
            function (n, t, i) {
              if (null === n) return n;
              var o = n.feishu,
                r = n.api;
              return void 0 === r[t]
                ? null
                : e.length === i + 1
                ? ((o[t] = r[t]), null)
                : (void 0 === o[t] && (o[t] = {}), { feishu: o[t], api: r[t] });
            },
            { feishu: n, api: t }
          );
        });
      },
      d = function (e) {
        var n = e.versions,
          t = n.ios,
          i = n.android,
          o = n.mac,
          r = n.win;
        return t ? 'ios' : i ? 'android' : o ? 'mac' : r ? 'windows' : null;
      },
      l = function (e, s, c) {
        return i(r, void 0, void 0, function () {
          var i, r, u, d, l, f, p;
          return o(this, function (o) {
            switch (o.label) {
              case 0:
                if (
                  ((i = t(3)('./' + e + '.json')),
                  (r = s.split('.').map(function (e) {
                    return parseInt(e);
                  })),
                  !((u = 100 * r[0] + r[1]) >= 205))
                )
                  return [3, 6];
                o.label = 1;
              case 1:
                return o.trys.push([1, 4, , 5]), [4, a.iosWebkitReady()];
              case 2:
                return o.sent(), [4, n.fetchApiListUrl(e, c)];
              case 3:
                return (
                  (d = o.sent()),
                  d && (i = { openList: d, byteList: [] }),
                  [3, 5]
                );
              case 4:
                return (l = o.sent()), [3, 5];
              case 5:
                return [3, 7];
              case 6:
                u >= 119 && (i = t(29)('./' + e + '.json')), (o.label = 7);
              case 7:
                return (
                  (f = i.openList),
                  (p = i.byteList),
                  'cdn' === c ? [2, f] : [2, f.concat(p)]
                );
            }
          });
        });
      };
    n.setFeishuSDK = function (e) {
      var n = e.api,
        t = e.browser,
        i = e.SDK,
        o = e.BUILD;
      return (c =
        c ||
        new Promise(function (e, r) {
          if (t.versions.mobileFeishu || t.versions.PCFeishu)
            if ('dev' === o)
              Object.keys(n).forEach(function (e) {
                i[e] = n[e];
              }),
                e();
            else {
              var a = d(t),
                s = t.versions.larkVersion;
              if (!a || !s) return;
              l(a, s, o).then(function (t) {
                u(t, i, n), e();
              });
            }
        }));
    };
  },
  function (e, n) {
    e.exports = {
      openList: [
        'biz.navigation.setTitle',
        'biz.navigation.setRight',
        'biz.navigation.setMenu',
        'biz.navigation.goBack',
        'biz.navigation.close',
        'biz.util.previewImage',
        'biz.util.openLink',
        'biz.util.uploadImage',
        'biz.util.copyText',
        'biz.util.share',
        'biz.util.scan',
        'device.geolocation.get',
        'device.geolocation.start',
        'device.geolocation.stop',
        'device.notification.showPreloader',
        'device.notification.hidePreloader',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.toast',
        'device.notification.prompt',
        'device.notification.vibrate',
      ],
      byteList: [
        'appCenter.getRecentApplications',
        'appCenter.putRecentApplication',
      ],
    };
  },
  function (e, n) {
    e.exports = {
      openList: [
        'biz.navigation.setTitle',
        'biz.navigation.setRight',
        'biz.navigation.setMenu',
        'biz.navigation.goBack',
        'biz.navigation.close',
        'biz.util.previewImage',
        'biz.util.openLink',
        'biz.util.uploadImage',
        'biz.util.copyText',
        'biz.util.share',
        'biz.util.scan',
        'device.geolocation.get',
        'device.geolocation.start',
        'device.geolocation.stop',
        'device.notification.showPreloader',
        'device.notification.hidePreloader',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.toast',
        'device.notification.prompt',
        'device.notification.vibrate',
      ],
      byteList: [
        'appCenter.getRecentApplications',
        'appCenter.putRecentApplication',
      ],
    };
  },
  function (e, n) {
    e.exports = { openList: [], byteList: [] };
  },
  function (e, n) {
    e.exports = { openList: [], byteList: [] };
  },
  function (e, n, t) {
    function i(e) {
      return t(o(e));
    }
    function o(e) {
      var n = r[e];
      if (!(n + 1)) throw new Error("Cannot find module '" + e + "'.");
      return n;
    }
    var r = {
      './android.json': 30,
      './ios.json': 31,
      './mac.json': 32,
      './windows.json': 33,
    };
    (i.keys = function () {
      return Object.keys(r);
    }),
      (i.resolve = o),
      (e.exports = i),
      (i.id = 29);
  },
  function (e, n) {
    e.exports = {
      openList: [
        'biz.navigation.setTitle',
        'biz.navigation.setRight',
        'biz.navigation.setMenu',
        'biz.navigation.goBack',
        'biz.navigation.close',
        'biz.util.previewImage',
        'biz.util.openLink',
        'biz.util.uploadImage',
        'biz.util.copyText',
        'biz.util.share',
        'biz.util.scan',
        'device.geolocation.get',
        'device.geolocation.start',
        'device.geolocation.stop',
        'device.notification.showPreloader',
        'device.notification.hidePreloader',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.toast',
        'device.notification.prompt',
        'device.notification.vibrate',
      ],
      byteList: [
        'biz.util.getAppLanguage',
        'appCenter.getRecentApplications',
        'appCenter.putRecentApplication',
      ],
    };
  },
  function (e, n) {
    e.exports = {
      openList: [
        'biz.navigation.setTitle',
        'biz.navigation.setRight',
        'biz.navigation.setMenu',
        'biz.navigation.goBack',
        'biz.navigation.close',
        'biz.util.previewImage',
        'biz.util.openLink',
        'biz.util.uploadImage',
        'biz.util.copyText',
        'biz.util.share',
        'biz.util.scan',
        'device.geolocation.get',
        'device.geolocation.start',
        'device.geolocation.stop',
        'device.notification.showPreloader',
        'device.notification.hidePreloader',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.toast',
        'device.notification.prompt',
        'device.notification.vibrate',
      ],
      byteList: [
        'biz.util.getAppLanguage',
        'appCenter.getRecentApplications',
        'appCenter.putRecentApplication',
      ],
    };
  },
  function (e, n) {
    e.exports = {
      openList: [],
      byteList: [
        'biz.util.getAppLanguage',
        'device.notification.confirm',
        'device.notification.alert',
      ],
    };
  },
  function (e, n) {
    e.exports = {
      openList: [],
      byteList: [
        'biz.util.getAppLanguage',
        'device.notification.confirm',
        'device.notification.alert',
      ],
    };
  },
]);
