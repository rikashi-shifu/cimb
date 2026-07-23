(function () {
  const D = document.createElement("link").relList;
  if (D && D.supports && D.supports("modulepreload")) return;
  for (const j of document.querySelectorAll('link[rel="modulepreload"]')) r(j);
  new MutationObserver((j) => {
    for (const H of j)
      if (H.type === "childList")
        for (const J of H.addedNodes)
          J.tagName === "LINK" && J.rel === "modulepreload" && r(J);
  }).observe(document, { childList: !0, subtree: !0 });
  function R(j) {
    const H = {};
    return (
      j.integrity && (H.integrity = j.integrity),
      j.referrerPolicy && (H.referrerPolicy = j.referrerPolicy),
      j.crossOrigin === "use-credentials"
        ? (H.credentials = "include")
        : j.crossOrigin === "anonymous"
          ? (H.credentials = "omit")
          : (H.credentials = "same-origin"),
      H
    );
  }
  function r(j) {
    if (j.ep) return;
    j.ep = !0;
    const H = R(j);
    fetch(j.href, H);
  }
})();
var df = { exports: {} },
  Au = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var x0;
function ey() {
  if (x0) return Au;
  x0 = 1;
  var x = Symbol.for("react.transitional.element"),
    D = Symbol.for("react.fragment");
  function R(r, j, H) {
    var J = null;
    if (
      (H !== void 0 && (J = "" + H),
      j.key !== void 0 && (J = "" + j.key),
      "key" in j)
    ) {
      H = {};
      for (var F in j) F !== "key" && (H[F] = j[F]);
    } else H = j;
    return (
      (j = H.ref),
      { $$typeof: x, type: r, key: J, ref: j !== void 0 ? j : null, props: H }
    );
  }
  return ((Au.Fragment = D), (Au.jsx = R), (Au.jsxs = R), Au);
}
var E0;
function ay() {
  return (E0 || ((E0 = 1), (df.exports = ey())), df.exports);
}
var f = ay(),
  of = { exports: {} },
  Q = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var T0;
function uy() {
  if (T0) return Q;
  T0 = 1;
  var x = Symbol.for("react.transitional.element"),
    D = Symbol.for("react.portal"),
    R = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    j = Symbol.for("react.profiler"),
    H = Symbol.for("react.consumer"),
    J = Symbol.for("react.context"),
    F = Symbol.for("react.forward_ref"),
    O = Symbol.for("react.suspense"),
    S = Symbol.for("react.memo"),
    V = Symbol.for("react.lazy"),
    C = Symbol.for("react.activity"),
    Y = Symbol.iterator;
  function xl(o) {
    return o === null || typeof o != "object"
      ? null
      : ((o = (Y && o[Y]) || o["@@iterator"]),
        typeof o == "function" ? o : null);
  }
  var gl = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Sl = Object.assign,
    Ul = {};
  function ul(o, A, N) {
    ((this.props = o),
      (this.context = A),
      (this.refs = Ul),
      (this.updater = N || gl));
  }
  ((ul.prototype.isReactComponent = {}),
    (ul.prototype.setState = function (o, A) {
      if (typeof o != "object" && typeof o != "function" && o != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, o, A, "setState");
    }),
    (ul.prototype.forceUpdate = function (o) {
      this.updater.enqueueForceUpdate(this, o, "forceUpdate");
    }));
  function I() {}
  I.prototype = ul.prototype;
  function Nl(o, A, N) {
    ((this.props = o),
      (this.context = A),
      (this.refs = Ul),
      (this.updater = N || gl));
  }
  var ql = (Nl.prototype = new I());
  ((ql.constructor = Nl), Sl(ql, ul.prototype), (ql.isPureReactComponent = !0));
  var Rl = Array.isArray;
  function Vl() {}
  var q = { H: null, A: null, T: null, S: null },
    Bl = Object.prototype.hasOwnProperty;
  function Wl(o, A, N) {
    var _ = N.ref;
    return {
      $$typeof: x,
      type: o,
      key: A,
      ref: _ !== void 0 ? _ : null,
      props: N,
    };
  }
  function Je(o, A) {
    return Wl(o.type, A, o.props);
  }
  function Mt(o) {
    return typeof o == "object" && o !== null && o.$$typeof === x;
  }
  function kl(o) {
    var A = { "=": "=0", ":": "=2" };
    return (
      "$" +
      o.replace(/[=:]/g, function (N) {
        return A[N];
      })
    );
  }
  var Ne = /\/+/g;
  function Ht(o, A) {
    return typeof o == "object" && o !== null && o.key != null
      ? kl("" + o.key)
      : A.toString(36);
  }
  function zt(o) {
    switch (o.status) {
      case "fulfilled":
        return o.value;
      case "rejected":
        throw o.reason;
      default:
        switch (
          (typeof o.status == "string"
            ? o.then(Vl, Vl)
            : ((o.status = "pending"),
              o.then(
                function (A) {
                  o.status === "pending" &&
                    ((o.status = "fulfilled"), (o.value = A));
                },
                function (A) {
                  o.status === "pending" &&
                    ((o.status = "rejected"), (o.reason = A));
                },
              )),
          o.status)
        ) {
          case "fulfilled":
            return o.value;
          case "rejected":
            throw o.reason;
        }
    }
    throw o;
  }
  function E(o, A, N, _, L) {
    var W = typeof o;
    (W === "undefined" || W === "boolean") && (o = null);
    var cl = !1;
    if (o === null) cl = !0;
    else
      switch (W) {
        case "bigint":
        case "string":
        case "number":
          cl = !0;
          break;
        case "object":
          switch (o.$$typeof) {
            case x:
            case D:
              cl = !0;
              break;
            case V:
              return ((cl = o._init), E(cl(o._payload), A, N, _, L));
          }
      }
    if (cl)
      return (
        (L = L(o)),
        (cl = _ === "" ? "." + Ht(o, 0) : _),
        Rl(L)
          ? ((N = ""),
            cl != null && (N = cl.replace(Ne, "$&/") + "/"),
            E(L, A, N, "", function (Da) {
              return Da;
            }))
          : L != null &&
            (Mt(L) &&
              (L = Je(
                L,
                N +
                  (L.key == null || (o && o.key === L.key)
                    ? ""
                    : ("" + L.key).replace(Ne, "$&/") + "/") +
                  cl,
              )),
            A.push(L)),
        1
      );
    cl = 0;
    var Jl = _ === "" ? "." : _ + ":";
    if (Rl(o))
      for (var zl = 0; zl < o.length; zl++)
        ((_ = o[zl]), (W = Jl + Ht(_, zl)), (cl += E(_, A, N, W, L)));
    else if (((zl = xl(o)), typeof zl == "function"))
      for (o = zl.call(o), zl = 0; !(_ = o.next()).done; )
        ((_ = _.value), (W = Jl + Ht(_, zl++)), (cl += E(_, A, N, W, L)));
    else if (W === "object") {
      if (typeof o.then == "function") return E(zt(o), A, N, _, L);
      throw (
        (A = String(o)),
        Error(
          "Objects are not valid as a React child (found: " +
            (A === "[object Object]"
              ? "object with keys {" + Object.keys(o).join(", ") + "}"
              : A) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return cl;
  }
  function p(o, A, N) {
    if (o == null) return o;
    var _ = [],
      L = 0;
    return (
      E(o, _, "", "", function (W) {
        return A.call(N, W, L++);
      }),
      _
    );
  }
  function X(o) {
    if (o._status === -1) {
      var A = o._result;
      ((A = A()),
        A.then(
          function (N) {
            (o._status === 0 || o._status === -1) &&
              ((o._status = 1), (o._result = N));
          },
          function (N) {
            (o._status === 0 || o._status === -1) &&
              ((o._status = 2), (o._result = N));
          },
        ),
        o._status === -1 && ((o._status = 0), (o._result = A)));
    }
    if (o._status === 1) return o._result.default;
    throw o._result;
  }
  var sl =
      typeof reportError == "function"
        ? reportError
        : function (o) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var A = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof o == "object" &&
                  o !== null &&
                  typeof o.message == "string"
                    ? String(o.message)
                    : String(o),
                error: o,
              });
              if (!window.dispatchEvent(A)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", o);
              return;
            }
            console.error(o);
          },
    rl = {
      map: p,
      forEach: function (o, A, N) {
        p(
          o,
          function () {
            A.apply(this, arguments);
          },
          N,
        );
      },
      count: function (o) {
        var A = 0;
        return (
          p(o, function () {
            A++;
          }),
          A
        );
      },
      toArray: function (o) {
        return (
          p(o, function (A) {
            return A;
          }) || []
        );
      },
      only: function (o) {
        if (!Mt(o))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return o;
      },
    };
  return (
    (Q.Activity = C),
    (Q.Children = rl),
    (Q.Component = ul),
    (Q.Fragment = R),
    (Q.Profiler = j),
    (Q.PureComponent = Nl),
    (Q.StrictMode = r),
    (Q.Suspense = O),
    (Q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = q),
    (Q.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (o) {
        return q.H.useMemoCache(o);
      },
    }),
    (Q.cache = function (o) {
      return function () {
        return o.apply(null, arguments);
      };
    }),
    (Q.cacheSignal = function () {
      return null;
    }),
    (Q.cloneElement = function (o, A, N) {
      if (o == null)
        throw Error(
          "The argument must be a React element, but you passed " + o + ".",
        );
      var _ = Sl({}, o.props),
        L = o.key;
      if (A != null)
        for (W in (A.key !== void 0 && (L = "" + A.key), A))
          !Bl.call(A, W) ||
            W === "key" ||
            W === "__self" ||
            W === "__source" ||
            (W === "ref" && A.ref === void 0) ||
            (_[W] = A[W]);
      var W = arguments.length - 2;
      if (W === 1) _.children = N;
      else if (1 < W) {
        for (var cl = Array(W), Jl = 0; Jl < W; Jl++)
          cl[Jl] = arguments[Jl + 2];
        _.children = cl;
      }
      return Wl(o.type, L, _);
    }),
    (Q.createContext = function (o) {
      return (
        (o = {
          $$typeof: J,
          _currentValue: o,
          _currentValue2: o,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (o.Provider = o),
        (o.Consumer = { $$typeof: H, _context: o }),
        o
      );
    }),
    (Q.createElement = function (o, A, N) {
      var _,
        L = {},
        W = null;
      if (A != null)
        for (_ in (A.key !== void 0 && (W = "" + A.key), A))
          Bl.call(A, _) &&
            _ !== "key" &&
            _ !== "__self" &&
            _ !== "__source" &&
            (L[_] = A[_]);
      var cl = arguments.length - 2;
      if (cl === 1) L.children = N;
      else if (1 < cl) {
        for (var Jl = Array(cl), zl = 0; zl < cl; zl++)
          Jl[zl] = arguments[zl + 2];
        L.children = Jl;
      }
      if (o && o.defaultProps)
        for (_ in ((cl = o.defaultProps), cl))
          L[_] === void 0 && (L[_] = cl[_]);
      return Wl(o, W, L);
    }),
    (Q.createRef = function () {
      return { current: null };
    }),
    (Q.forwardRef = function (o) {
      return { $$typeof: F, render: o };
    }),
    (Q.isValidElement = Mt),
    (Q.lazy = function (o) {
      return { $$typeof: V, _payload: { _status: -1, _result: o }, _init: X };
    }),
    (Q.memo = function (o, A) {
      return { $$typeof: S, type: o, compare: A === void 0 ? null : A };
    }),
    (Q.startTransition = function (o) {
      var A = q.T,
        N = {};
      q.T = N;
      try {
        var _ = o(),
          L = q.S;
        (L !== null && L(N, _),
          typeof _ == "object" &&
            _ !== null &&
            typeof _.then == "function" &&
            _.then(Vl, sl));
      } catch (W) {
        sl(W);
      } finally {
        (A !== null && N.types !== null && (A.types = N.types), (q.T = A));
      }
    }),
    (Q.unstable_useCacheRefresh = function () {
      return q.H.useCacheRefresh();
    }),
    (Q.use = function (o) {
      return q.H.use(o);
    }),
    (Q.useActionState = function (o, A, N) {
      return q.H.useActionState(o, A, N);
    }),
    (Q.useCallback = function (o, A) {
      return q.H.useCallback(o, A);
    }),
    (Q.useContext = function (o) {
      return q.H.useContext(o);
    }),
    (Q.useDebugValue = function () {}),
    (Q.useDeferredValue = function (o, A) {
      return q.H.useDeferredValue(o, A);
    }),
    (Q.useEffect = function (o, A) {
      return q.H.useEffect(o, A);
    }),
    (Q.useEffectEvent = function (o) {
      return q.H.useEffectEvent(o);
    }),
    (Q.useId = function () {
      return q.H.useId();
    }),
    (Q.useImperativeHandle = function (o, A, N) {
      return q.H.useImperativeHandle(o, A, N);
    }),
    (Q.useInsertionEffect = function (o, A) {
      return q.H.useInsertionEffect(o, A);
    }),
    (Q.useLayoutEffect = function (o, A) {
      return q.H.useLayoutEffect(o, A);
    }),
    (Q.useMemo = function (o, A) {
      return q.H.useMemo(o, A);
    }),
    (Q.useOptimistic = function (o, A) {
      return q.H.useOptimistic(o, A);
    }),
    (Q.useReducer = function (o, A, N) {
      return q.H.useReducer(o, A, N);
    }),
    (Q.useRef = function (o) {
      return q.H.useRef(o);
    }),
    (Q.useState = function (o) {
      return q.H.useState(o);
    }),
    (Q.useSyncExternalStore = function (o, A, N) {
      return q.H.useSyncExternalStore(o, A, N);
    }),
    (Q.useTransition = function () {
      return q.H.useTransition();
    }),
    (Q.version = "19.2.7"),
    Q
  );
}
var z0;
function gf() {
  return (z0 || ((z0 = 1), (of.exports = uy())), of.exports);
}
var Z = gf(),
  mf = { exports: {} },
  pu = {},
  rf = { exports: {} },
  yf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var A0;
function ny() {
  return (
    A0 ||
      ((A0 = 1),
      (function (x) {
        function D(E, p) {
          var X = E.length;
          E.push(p);
          l: for (; 0 < X; ) {
            var sl = (X - 1) >>> 1,
              rl = E[sl];
            if (0 < j(rl, p)) ((E[sl] = p), (E[X] = rl), (X = sl));
            else break l;
          }
        }
        function R(E) {
          return E.length === 0 ? null : E[0];
        }
        function r(E) {
          if (E.length === 0) return null;
          var p = E[0],
            X = E.pop();
          if (X !== p) {
            E[0] = X;
            l: for (var sl = 0, rl = E.length, o = rl >>> 1; sl < o; ) {
              var A = 2 * (sl + 1) - 1,
                N = E[A],
                _ = A + 1,
                L = E[_];
              if (0 > j(N, X))
                _ < rl && 0 > j(L, N)
                  ? ((E[sl] = L), (E[_] = X), (sl = _))
                  : ((E[sl] = N), (E[A] = X), (sl = A));
              else if (_ < rl && 0 > j(L, X))
                ((E[sl] = L), (E[_] = X), (sl = _));
              else break l;
            }
          }
          return p;
        }
        function j(E, p) {
          var X = E.sortIndex - p.sortIndex;
          return X !== 0 ? X : E.id - p.id;
        }
        if (
          ((x.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var H = performance;
          x.unstable_now = function () {
            return H.now();
          };
        } else {
          var J = Date,
            F = J.now();
          x.unstable_now = function () {
            return J.now() - F;
          };
        }
        var O = [],
          S = [],
          V = 1,
          C = null,
          Y = 3,
          xl = !1,
          gl = !1,
          Sl = !1,
          Ul = !1,
          ul = typeof setTimeout == "function" ? setTimeout : null,
          I = typeof clearTimeout == "function" ? clearTimeout : null,
          Nl = typeof setImmediate < "u" ? setImmediate : null;
        function ql(E) {
          for (var p = R(S); p !== null; ) {
            if (p.callback === null) r(S);
            else if (p.startTime <= E)
              (r(S), (p.sortIndex = p.expirationTime), D(O, p));
            else break;
            p = R(S);
          }
        }
        function Rl(E) {
          if (((Sl = !1), ql(E), !gl))
            if (R(O) !== null) ((gl = !0), Vl || ((Vl = !0), kl()));
            else {
              var p = R(S);
              p !== null && zt(Rl, p.startTime - E);
            }
        }
        var Vl = !1,
          q = -1,
          Bl = 5,
          Wl = -1;
        function Je() {
          return Ul ? !0 : !(x.unstable_now() - Wl < Bl);
        }
        function Mt() {
          if (((Ul = !1), Vl)) {
            var E = x.unstable_now();
            Wl = E;
            var p = !0;
            try {
              l: {
                ((gl = !1), Sl && ((Sl = !1), I(q), (q = -1)), (xl = !0));
                var X = Y;
                try {
                  t: {
                    for (
                      ql(E), C = R(O);
                      C !== null && !(C.expirationTime > E && Je());
                    ) {
                      var sl = C.callback;
                      if (typeof sl == "function") {
                        ((C.callback = null), (Y = C.priorityLevel));
                        var rl = sl(C.expirationTime <= E);
                        if (((E = x.unstable_now()), typeof rl == "function")) {
                          ((C.callback = rl), ql(E), (p = !0));
                          break t;
                        }
                        (C === R(O) && r(O), ql(E));
                      } else r(O);
                      C = R(O);
                    }
                    if (C !== null) p = !0;
                    else {
                      var o = R(S);
                      (o !== null && zt(Rl, o.startTime - E), (p = !1));
                    }
                  }
                  break l;
                } finally {
                  ((C = null), (Y = X), (xl = !1));
                }
                p = void 0;
              }
            } finally {
              p ? kl() : (Vl = !1);
            }
          }
        }
        var kl;
        if (typeof Nl == "function")
          kl = function () {
            Nl(Mt);
          };
        else if (typeof MessageChannel < "u") {
          var Ne = new MessageChannel(),
            Ht = Ne.port2;
          ((Ne.port1.onmessage = Mt),
            (kl = function () {
              Ht.postMessage(null);
            }));
        } else
          kl = function () {
            ul(Mt, 0);
          };
        function zt(E, p) {
          q = ul(function () {
            E(x.unstable_now());
          }, p);
        }
        ((x.unstable_IdlePriority = 5),
          (x.unstable_ImmediatePriority = 1),
          (x.unstable_LowPriority = 4),
          (x.unstable_NormalPriority = 3),
          (x.unstable_Profiling = null),
          (x.unstable_UserBlockingPriority = 2),
          (x.unstable_cancelCallback = function (E) {
            E.callback = null;
          }),
          (x.unstable_forceFrameRate = function (E) {
            0 > E || 125 < E
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Bl = 0 < E ? Math.floor(1e3 / E) : 5);
          }),
          (x.unstable_getCurrentPriorityLevel = function () {
            return Y;
          }),
          (x.unstable_next = function (E) {
            switch (Y) {
              case 1:
              case 2:
              case 3:
                var p = 3;
                break;
              default:
                p = Y;
            }
            var X = Y;
            Y = p;
            try {
              return E();
            } finally {
              Y = X;
            }
          }),
          (x.unstable_requestPaint = function () {
            Ul = !0;
          }),
          (x.unstable_runWithPriority = function (E, p) {
            switch (E) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                E = 3;
            }
            var X = Y;
            Y = E;
            try {
              return p();
            } finally {
              Y = X;
            }
          }),
          (x.unstable_scheduleCallback = function (E, p, X) {
            var sl = x.unstable_now();
            switch (
              (typeof X == "object" && X !== null
                ? ((X = X.delay),
                  (X = typeof X == "number" && 0 < X ? sl + X : sl))
                : (X = sl),
              E)
            ) {
              case 1:
                var rl = -1;
                break;
              case 2:
                rl = 250;
                break;
              case 5:
                rl = 1073741823;
                break;
              case 4:
                rl = 1e4;
                break;
              default:
                rl = 5e3;
            }
            return (
              (rl = X + rl),
              (E = {
                id: V++,
                callback: p,
                priorityLevel: E,
                startTime: X,
                expirationTime: rl,
                sortIndex: -1,
              }),
              X > sl
                ? ((E.sortIndex = X),
                  D(S, E),
                  R(O) === null &&
                    E === R(S) &&
                    (Sl ? (I(q), (q = -1)) : (Sl = !0), zt(Rl, X - sl)))
                : ((E.sortIndex = rl),
                  D(O, E),
                  gl || xl || ((gl = !0), Vl || ((Vl = !0), kl()))),
              E
            );
          }),
          (x.unstable_shouldYield = Je),
          (x.unstable_wrapCallback = function (E) {
            var p = Y;
            return function () {
              var X = Y;
              Y = p;
              try {
                return E.apply(this, arguments);
              } finally {
                Y = X;
              }
            };
          }));
      })(yf)),
    yf
  );
}
var p0;
function cy() {
  return (p0 || ((p0 = 1), (rf.exports = ny())), rf.exports);
}
var hf = { exports: {} },
  Ll = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var N0;
function iy() {
  if (N0) return Ll;
  N0 = 1;
  var x = gf();
  function D(O) {
    var S = "https://react.dev/errors/" + O;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var V = 2; V < arguments.length; V++)
        S += "&args[]=" + encodeURIComponent(arguments[V]);
    }
    return (
      "Minified React error #" +
      O +
      "; visit " +
      S +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function R() {}
  var r = {
      d: {
        f: R,
        r: function () {
          throw Error(D(522));
        },
        D: R,
        C: R,
        L: R,
        m: R,
        X: R,
        S: R,
        M: R,
      },
      p: 0,
      findDOMNode: null,
    },
    j = Symbol.for("react.portal");
  function H(O, S, V) {
    var C =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: j,
      key: C == null ? null : "" + C,
      children: O,
      containerInfo: S,
      implementation: V,
    };
  }
  var J = x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function F(O, S) {
    if (O === "font") return "";
    if (typeof S == "string") return S === "use-credentials" ? S : "";
  }
  return (
    (Ll.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (Ll.createPortal = function (O, S) {
      var V =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!S || (S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11))
        throw Error(D(299));
      return H(O, S, null, V);
    }),
    (Ll.flushSync = function (O) {
      var S = J.T,
        V = r.p;
      try {
        if (((J.T = null), (r.p = 2), O)) return O();
      } finally {
        ((J.T = S), (r.p = V), r.d.f());
      }
    }),
    (Ll.preconnect = function (O, S) {
      typeof O == "string" &&
        (S
          ? ((S = S.crossOrigin),
            (S =
              typeof S == "string"
                ? S === "use-credentials"
                  ? S
                  : ""
                : void 0))
          : (S = null),
        r.d.C(O, S));
    }),
    (Ll.prefetchDNS = function (O) {
      typeof O == "string" && r.d.D(O);
    }),
    (Ll.preinit = function (O, S) {
      if (typeof O == "string" && S && typeof S.as == "string") {
        var V = S.as,
          C = F(V, S.crossOrigin),
          Y = typeof S.integrity == "string" ? S.integrity : void 0,
          xl = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
        V === "style"
          ? r.d.S(O, typeof S.precedence == "string" ? S.precedence : void 0, {
              crossOrigin: C,
              integrity: Y,
              fetchPriority: xl,
            })
          : V === "script" &&
            r.d.X(O, {
              crossOrigin: C,
              integrity: Y,
              fetchPriority: xl,
              nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            });
      }
    }),
    (Ll.preinitModule = function (O, S) {
      if (typeof O == "string")
        if (typeof S == "object" && S !== null) {
          if (S.as == null || S.as === "script") {
            var V = F(S.as, S.crossOrigin);
            r.d.M(O, {
              crossOrigin: V,
              integrity: typeof S.integrity == "string" ? S.integrity : void 0,
              nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            });
          }
        } else S == null && r.d.M(O);
    }),
    (Ll.preload = function (O, S) {
      if (
        typeof O == "string" &&
        typeof S == "object" &&
        S !== null &&
        typeof S.as == "string"
      ) {
        var V = S.as,
          C = F(V, S.crossOrigin);
        r.d.L(O, V, {
          crossOrigin: C,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0,
          nonce: typeof S.nonce == "string" ? S.nonce : void 0,
          type: typeof S.type == "string" ? S.type : void 0,
          fetchPriority:
            typeof S.fetchPriority == "string" ? S.fetchPriority : void 0,
          referrerPolicy:
            typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0,
          imageSrcSet:
            typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0,
          imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0,
          media: typeof S.media == "string" ? S.media : void 0,
        });
      }
    }),
    (Ll.preloadModule = function (O, S) {
      if (typeof O == "string")
        if (S) {
          var V = F(S.as, S.crossOrigin);
          r.d.m(O, {
            as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
            crossOrigin: V,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
          });
        } else r.d.m(O);
    }),
    (Ll.requestFormReset = function (O) {
      r.d.r(O);
    }),
    (Ll.unstable_batchedUpdates = function (O, S) {
      return O(S);
    }),
    (Ll.useFormState = function (O, S, V) {
      return J.H.useFormState(O, S, V);
    }),
    (Ll.useFormStatus = function () {
      return J.H.useHostTransitionStatus();
    }),
    (Ll.version = "19.2.7"),
    Ll
  );
}
var j0;
function fy() {
  if (j0) return hf.exports;
  j0 = 1;
  function x() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(x);
      } catch (D) {
        console.error(D);
      }
  }
  return (x(), (hf.exports = iy()), hf.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var O0;
function sy() {
  if (O0) return pu;
  O0 = 1;
  var x = cy(),
    D = gf(),
    R = fy();
  function r(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return (
      "Minified React error #" +
      l +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function j(l) {
    return !(!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11));
  }
  function H(l) {
    var t = l,
      e = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do ((t = l), (t.flags & 4098) !== 0 && (e = t.return), (l = t.return));
      while (l);
    }
    return t.tag === 3 ? e : null;
  }
  function J(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function F(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function O(l) {
    if (H(l) !== l) throw Error(r(188));
  }
  function S(l) {
    var t = l.alternate;
    if (!t) {
      if (((t = H(l)), t === null)) throw Error(r(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (((a = u.return), a !== null)) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return (O(u), l);
          if (n === a) return (O(u), t);
          n = n.sibling;
        }
        throw Error(r(188));
      }
      if (e.return !== a.return) ((e = u), (a = n));
      else {
        for (var c = !1, i = u.child; i; ) {
          if (i === e) {
            ((c = !0), (e = u), (a = n));
            break;
          }
          if (i === a) {
            ((c = !0), (a = u), (e = n));
            break;
          }
          i = i.sibling;
        }
        if (!c) {
          for (i = n.child; i; ) {
            if (i === e) {
              ((c = !0), (e = n), (a = u));
              break;
            }
            if (i === a) {
              ((c = !0), (a = n), (e = u));
              break;
            }
            i = i.sibling;
          }
          if (!c) throw Error(r(189));
        }
      }
      if (e.alternate !== a) throw Error(r(190));
    }
    if (e.tag !== 3) throw Error(r(188));
    return e.stateNode.current === e ? l : t;
  }
  function V(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (((t = V(l)), t !== null)) return t;
      l = l.sibling;
    }
    return null;
  }
  var C = Object.assign,
    Y = Symbol.for("react.element"),
    xl = Symbol.for("react.transitional.element"),
    gl = Symbol.for("react.portal"),
    Sl = Symbol.for("react.fragment"),
    Ul = Symbol.for("react.strict_mode"),
    ul = Symbol.for("react.profiler"),
    I = Symbol.for("react.consumer"),
    Nl = Symbol.for("react.context"),
    ql = Symbol.for("react.forward_ref"),
    Rl = Symbol.for("react.suspense"),
    Vl = Symbol.for("react.suspense_list"),
    q = Symbol.for("react.memo"),
    Bl = Symbol.for("react.lazy"),
    Wl = Symbol.for("react.activity"),
    Je = Symbol.for("react.memo_cache_sentinel"),
    Mt = Symbol.iterator;
  function kl(l) {
    return l === null || typeof l != "object"
      ? null
      : ((l = (Mt && l[Mt]) || l["@@iterator"]),
        typeof l == "function" ? l : null);
  }
  var Ne = Symbol.for("react.client.reference");
  function Ht(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Ne ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Sl:
        return "Fragment";
      case ul:
        return "Profiler";
      case Ul:
        return "StrictMode";
      case Rl:
        return "Suspense";
      case Vl:
        return "SuspenseList";
      case Wl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case gl:
          return "Portal";
        case Nl:
          return l.displayName || "Context";
        case I:
          return (l._context.displayName || "Context") + ".Consumer";
        case ql:
          var t = l.render;
          return (
            (l = l.displayName),
            l ||
              ((l = t.displayName || t.name || ""),
              (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
            l
          );
        case q:
          return (
            (t = l.displayName || null),
            t !== null ? t : Ht(l.type) || "Memo"
          );
        case Bl:
          ((t = l._payload), (l = l._init));
          try {
            return Ht(l(t));
          } catch {}
      }
    return null;
  }
  var zt = Array.isArray,
    E = D.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    p = R.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    X = { pending: !1, data: null, method: null, action: null },
    sl = [],
    rl = -1;
  function o(l) {
    return { current: l };
  }
  function A(l) {
    0 > rl || ((l.current = sl[rl]), (sl[rl] = null), rl--);
  }
  function N(l, t) {
    (rl++, (sl[rl] = l.current), (l.current = t));
  }
  var _ = o(null),
    L = o(null),
    W = o(null),
    cl = o(null);
  function Jl(l, t) {
    switch ((N(W, t), N(L, l), N(_, null), t.nodeType)) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Vo(l) : 0;
        break;
      default:
        if (((l = t.tagName), (t = t.namespaceURI)))
          ((t = Vo(t)), (l = Lo(t, l)));
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    (A(_), N(_, l));
  }
  function zl() {
    (A(_), A(L), A(W));
  }
  function Da(l) {
    l.memoizedState !== null && N(cl, l);
    var t = _.current,
      e = Lo(t, l.type);
    t !== e && (N(L, l), N(_, e));
  }
  function Nu(l) {
    (L.current === l && (A(_), A(L)),
      cl.current === l && (A(cl), (xu._currentValue = X)));
  }
  var Kn, Sf;
  function je(l) {
    if (Kn === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        ((Kn = (t && t[1]) || ""),
          (Sf =
            -1 <
            e.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < e.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Kn +
      l +
      Sf
    );
  }
  var Jn = !1;
  function wn(l, t) {
    if (!l || Jn) return "";
    Jn = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var z = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(z.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(z, []);
                } catch (g) {
                  var v = g;
                }
                Reflect.construct(l, [], z);
              } else {
                try {
                  z.call();
                } catch (g) {
                  v = g;
                }
                l.call(z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (g) {
                v = g;
              }
              (z = l()) &&
                typeof z.catch == "function" &&
                z.catch(function () {});
            }
          } catch (g) {
            if (g && v && typeof g.stack == "string") return [g.stack, v.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name",
      );
      u &&
        u.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var n = a.DetermineComponentFrameRoot(),
        c = n[0],
        i = n[1];
      if (c && i) {
        var s = c.split(`
`),
          h = i.split(`
`);
        for (
          u = a = 0;
          a < s.length && !s[a].includes("DetermineComponentFrameRoot");
        )
          a++;
        for (; u < h.length && !h[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (a === s.length || u === h.length)
          for (
            a = s.length - 1, u = h.length - 1;
            1 <= a && 0 <= u && s[a] !== h[u];
          )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (s[a] !== h[u]) {
            if (a !== 1 || u !== 1)
              do
                if ((a--, u--, 0 > u || s[a] !== h[u])) {
                  var b =
                    `
` + s[a].replace(" at new ", " at ");
                  return (
                    l.displayName &&
                      b.includes("<anonymous>") &&
                      (b = b.replace("<anonymous>", l.displayName)),
                    b
                  );
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ((Jn = !1), (Error.prepareStackTrace = e));
    }
    return (e = l ? l.displayName || l.name : "") ? je(e) : "";
  }
  function R0(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return je(l.type);
      case 16:
        return je("Lazy");
      case 13:
        return l.child !== t && t !== null
          ? je("Suspense Fallback")
          : je("Suspense");
      case 19:
        return je("SuspenseList");
      case 0:
      case 15:
        return wn(l.type, !1);
      case 11:
        return wn(l.type.render, !1);
      case 1:
        return wn(l.type, !0);
      case 31:
        return je("Activity");
      default:
        return "";
    }
  }
  function bf(l) {
    try {
      var t = "",
        e = null;
      do ((t += R0(l, e)), (e = l), (l = l.return));
      while (l);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var Wn = Object.prototype.hasOwnProperty,
    kn = x.unstable_scheduleCallback,
    $n = x.unstable_cancelCallback,
    C0 = x.unstable_shouldYield,
    H0 = x.unstable_requestPaint,
    at = x.unstable_now,
    q0 = x.unstable_getCurrentPriorityLevel,
    xf = x.unstable_ImmediatePriority,
    Ef = x.unstable_UserBlockingPriority,
    ju = x.unstable_NormalPriority,
    B0 = x.unstable_LowPriority,
    Tf = x.unstable_IdlePriority,
    Y0 = x.log,
    G0 = x.unstable_setDisableYieldValue,
    Ua = null,
    ut = null;
  function te(l) {
    if (
      (typeof Y0 == "function" && G0(l),
      ut && typeof ut.setStrictMode == "function")
    )
      try {
        ut.setStrictMode(Ua, l);
      } catch {}
  }
  var nt = Math.clz32 ? Math.clz32 : Z0,
    X0 = Math.log,
    Q0 = Math.LN2;
  function Z0(l) {
    return ((l >>>= 0), l === 0 ? 32 : (31 - ((X0(l) / Q0) | 0)) | 0);
  }
  var Ou = 256,
    Mu = 262144,
    _u = 4194304;
  function Oe(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function Du(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0,
      n = l.suspendedLanes,
      c = l.pingedLanes;
    l = l.warmLanes;
    var i = a & 134217727;
    return (
      i !== 0
        ? ((a = i & ~n),
          a !== 0
            ? (u = Oe(a))
            : ((c &= i),
              c !== 0
                ? (u = Oe(c))
                : e || ((e = i & ~l), e !== 0 && (u = Oe(e)))))
        : ((i = a & ~n),
          i !== 0
            ? (u = Oe(i))
            : c !== 0
              ? (u = Oe(c))
              : e || ((e = a & ~l), e !== 0 && (u = Oe(e)))),
      u === 0
        ? 0
        : t !== 0 &&
            t !== u &&
            (t & n) === 0 &&
            ((n = u & -u),
            (e = t & -t),
            n >= e || (n === 32 && (e & 4194048) !== 0))
          ? t
          : u
    );
  }
  function Ra(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function V0(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function zf() {
    var l = _u;
    return ((_u <<= 1), (_u & 62914560) === 0 && (_u = 4194304), l);
  }
  function Fn(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function Ca(l, t) {
    ((l.pendingLanes |= t),
      t !== 268435456 &&
        ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0)));
  }
  function L0(l, t, e, a, u, n) {
    var c = l.pendingLanes;
    ((l.pendingLanes = e),
      (l.suspendedLanes = 0),
      (l.pingedLanes = 0),
      (l.warmLanes = 0),
      (l.expiredLanes &= e),
      (l.entangledLanes &= e),
      (l.errorRecoveryDisabledLanes &= e),
      (l.shellSuspendCounter = 0));
    var i = l.entanglements,
      s = l.expirationTimes,
      h = l.hiddenUpdates;
    for (e = c & ~e; 0 < e; ) {
      var b = 31 - nt(e),
        z = 1 << b;
      ((i[b] = 0), (s[b] = -1));
      var v = h[b];
      if (v !== null)
        for (h[b] = null, b = 0; b < v.length; b++) {
          var g = v[b];
          g !== null && (g.lane &= -536870913);
        }
      e &= ~z;
    }
    (a !== 0 && Af(l, a, 0),
      n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(c & ~t)));
  }
  function Af(l, t, e) {
    ((l.pendingLanes |= t), (l.suspendedLanes &= ~t));
    var a = 31 - nt(t);
    ((l.entangledLanes |= t),
      (l.entanglements[a] = l.entanglements[a] | 1073741824 | (e & 261930)));
  }
  function pf(l, t) {
    var e = (l.entangledLanes |= t);
    for (l = l.entanglements; e; ) {
      var a = 31 - nt(e),
        u = 1 << a;
      ((u & t) | (l[a] & t) && (l[a] |= t), (e &= ~u));
    }
  }
  function Nf(l, t) {
    var e = t & -t;
    return (
      (e = (e & 42) !== 0 ? 1 : In(e)),
      (e & (l.suspendedLanes | t)) !== 0 ? 0 : e
    );
  }
  function In(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Pn(l) {
    return (
      (l &= -l),
      2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function jf() {
    var l = p.p;
    return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : r0(l.type));
  }
  function Of(l, t) {
    var e = p.p;
    try {
      return ((p.p = l), t());
    } finally {
      p.p = e;
    }
  }
  var ee = Math.random().toString(36).slice(2),
    Yl = "__reactFiber$" + ee,
    $l = "__reactProps$" + ee,
    we = "__reactContainer$" + ee,
    lc = "__reactEvents$" + ee,
    K0 = "__reactListeners$" + ee,
    J0 = "__reactHandles$" + ee,
    Mf = "__reactResources$" + ee,
    Ha = "__reactMarker$" + ee;
  function tc(l) {
    (delete l[Yl], delete l[$l], delete l[lc], delete l[K0], delete l[J0]);
  }
  function We(l) {
    var t = l[Yl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if ((t = e[we] || e[Yl])) {
        if (
          ((e = t.alternate),
          t.child !== null || (e !== null && e.child !== null))
        )
          for (l = Fo(l); l !== null; ) {
            if ((e = l[Yl])) return e;
            l = Fo(l);
          }
        return t;
      }
      ((l = e), (e = l.parentNode));
    }
    return null;
  }
  function ke(l) {
    if ((l = l[Yl] || l[we])) {
      var t = l.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return l;
    }
    return null;
  }
  function qa(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(r(33));
  }
  function $e(l) {
    var t = l[Mf];
    return (
      t ||
        (t = l[Mf] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Cl(l) {
    l[Ha] = !0;
  }
  var _f = new Set(),
    Df = {};
  function Me(l, t) {
    (Fe(l, t), Fe(l + "Capture", t));
  }
  function Fe(l, t) {
    for (Df[l] = t, l = 0; l < t.length; l++) _f.add(t[l]);
  }
  var w0 = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Uf = {},
    Rf = {};
  function W0(l) {
    return Wn.call(Rf, l)
      ? !0
      : Wn.call(Uf, l)
        ? !1
        : w0.test(l)
          ? (Rf[l] = !0)
          : ((Uf[l] = !0), !1);
  }
  function Uu(l, t, e) {
    if (W0(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + e);
      }
  }
  function Ru(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + e);
    }
  }
  function qt(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, "" + a);
    }
  }
  function rt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Cf(l) {
    var t = l.type;
    return (
      (l = l.nodeName) &&
      l.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function k0(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (
      !l.hasOwnProperty(t) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var u = a.get,
        n = a.set;
      return (
        Object.defineProperty(l, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (c) {
            ((e = "" + c), n.call(this, c));
          },
        }),
        Object.defineProperty(l, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return e;
          },
          setValue: function (c) {
            e = "" + c;
          },
          stopTracking: function () {
            ((l._valueTracker = null), delete l[t]);
          },
        }
      );
    }
  }
  function ec(l) {
    if (!l._valueTracker) {
      var t = Cf(l) ? "checked" : "value";
      l._valueTracker = k0(l, t, "" + l[t]);
    }
  }
  function Hf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(),
      a = "";
    return (
      l && (a = Cf(l) ? (l.checked ? "true" : "false") : l.value),
      (l = a),
      l !== e ? (t.setValue(l), !0) : !1
    );
  }
  function Cu(l) {
    if (
      ((l = l || (typeof document < "u" ? document : void 0)), typeof l > "u")
    )
      return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var $0 = /[\n"\\]/g;
  function yt(l) {
    return l.replace($0, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function ac(l, t, e, a, u, n, c, i) {
    ((l.name = ""),
      c != null &&
      typeof c != "function" &&
      typeof c != "symbol" &&
      typeof c != "boolean"
        ? (l.type = c)
        : l.removeAttribute("type"),
      t != null
        ? c === "number"
          ? ((t === 0 && l.value === "") || l.value != t) &&
            (l.value = "" + rt(t))
          : l.value !== "" + rt(t) && (l.value = "" + rt(t))
        : (c !== "submit" && c !== "reset") || l.removeAttribute("value"),
      t != null
        ? uc(l, c, rt(t))
        : e != null
          ? uc(l, c, rt(e))
          : a != null && l.removeAttribute("value"),
      u == null && n != null && (l.defaultChecked = !!n),
      u != null &&
        (l.checked = u && typeof u != "function" && typeof u != "symbol"),
      i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean"
        ? (l.name = "" + rt(i))
        : l.removeAttribute("name"));
  }
  function qf(l, t, e, a, u, n, c, i) {
    if (
      (n != null &&
        typeof n != "function" &&
        typeof n != "symbol" &&
        typeof n != "boolean" &&
        (l.type = n),
      t != null || e != null)
    ) {
      if (!((n !== "submit" && n !== "reset") || t != null)) {
        ec(l);
        return;
      }
      ((e = e != null ? "" + rt(e) : ""),
        (t = t != null ? "" + rt(t) : e),
        i || t === l.value || (l.value = t),
        (l.defaultValue = t));
    }
    ((a = a ?? u),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (l.checked = i ? l.checked : !!a),
      (l.defaultChecked = !!a),
      c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (l.name = c),
      ec(l));
  }
  function uc(l, t, e) {
    (t === "number" && Cu(l.ownerDocument) === l) ||
      l.defaultValue === "" + e ||
      (l.defaultValue = "" + e);
  }
  function Ie(l, t, e, a) {
    if (((l = l.options), t)) {
      t = {};
      for (var u = 0; u < e.length; u++) t["$" + e[u]] = !0;
      for (e = 0; e < l.length; e++)
        ((u = t.hasOwnProperty("$" + l[e].value)),
          l[e].selected !== u && (l[e].selected = u),
          u && a && (l[e].defaultSelected = !0));
    } else {
      for (e = "" + rt(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          ((l[u].selected = !0), a && (l[u].defaultSelected = !0));
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Bf(l, t, e) {
    if (
      t != null &&
      ((t = "" + rt(t)), t !== l.value && (l.value = t), e == null)
    ) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + rt(e) : "";
  }
  function Yf(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(r(92));
        if (zt(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        e = a;
      }
      (e == null && (e = ""), (t = e));
    }
    ((e = rt(t)),
      (l.defaultValue = e),
      (a = l.textContent),
      a === e && a !== "" && a !== null && (l.value = a),
      ec(l));
  }
  function Pe(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var F0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Gf(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === ""
      ? a
        ? l.setProperty(t, "")
        : t === "float"
          ? (l.cssFloat = "")
          : (l[t] = "")
      : a
        ? l.setProperty(t, e)
        : typeof e != "number" || e === 0 || F0.has(t)
          ? t === "float"
            ? (l.cssFloat = e)
            : (l[t] = ("" + e).trim())
          : (l[t] = e + "px");
  }
  function Xf(l, t, e) {
    if (t != null && typeof t != "object") throw Error(r(62));
    if (((l = l.style), e != null)) {
      for (var a in e)
        !e.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? l.setProperty(a, "")
            : a === "float"
              ? (l.cssFloat = "")
              : (l[a] = ""));
      for (var u in t)
        ((a = t[u]), t.hasOwnProperty(u) && e[u] !== a && Gf(l, u, a));
    } else for (var n in t) t.hasOwnProperty(n) && Gf(l, n, t[n]);
  }
  function nc(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var I0 = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    P0 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Hu(l) {
    return P0.test("" + l)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : l;
  }
  function Bt() {}
  var cc = null;
  function ic(l) {
    return (
      (l = l.target || l.srcElement || window),
      l.correspondingUseElement && (l = l.correspondingUseElement),
      l.nodeType === 3 ? l.parentNode : l
    );
  }
  var la = null,
    ta = null;
  function Qf(l) {
    var t = ke(l);
    if (t && (l = t.stateNode)) {
      var e = l[$l] || null;
      l: switch (((l = t.stateNode), t.type)) {
        case "input":
          if (
            (ac(
              l,
              e.value,
              e.defaultValue,
              e.defaultValue,
              e.checked,
              e.defaultChecked,
              e.type,
              e.name,
            ),
            (t = e.name),
            e.type === "radio" && t != null)
          ) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (
              e = e.querySelectorAll(
                'input[name="' + yt("" + t) + '"][type="radio"]',
              ),
                t = 0;
              t < e.length;
              t++
            ) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[$l] || null;
                if (!u) throw Error(r(90));
                ac(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name,
                );
              }
            }
            for (t = 0; t < e.length; t++)
              ((a = e[t]), a.form === l.form && Hf(a));
          }
          break l;
        case "textarea":
          Bf(l, e.value, e.defaultValue);
          break l;
        case "select":
          ((t = e.value), t != null && Ie(l, !!e.multiple, t, !1));
      }
    }
  }
  var fc = !1;
  function Zf(l, t, e) {
    if (fc) return l(t, e);
    fc = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (
        ((fc = !1),
        (la !== null || ta !== null) &&
          (zn(), la && ((t = la), (l = ta), (ta = la = null), Qf(t), l)))
      )
        for (t = 0; t < l.length; t++) Qf(l[t]);
    }
  }
  function Ba(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[$l] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((a = !a.disabled) ||
          ((l = l.type),
          (a = !(
            l === "button" ||
            l === "input" ||
            l === "select" ||
            l === "textarea"
          ))),
          (l = !a));
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != "function") throw Error(r(231, t, typeof e));
    return e;
  }
  var Yt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    sc = !1;
  if (Yt)
    try {
      var Ya = {};
      (Object.defineProperty(Ya, "passive", {
        get: function () {
          sc = !0;
        },
      }),
        window.addEventListener("test", Ya, Ya),
        window.removeEventListener("test", Ya, Ya));
    } catch {
      sc = !1;
    }
  var ae = null,
    dc = null,
    qu = null;
  function Vf() {
    if (qu) return qu;
    var l,
      t = dc,
      e = t.length,
      a,
      u = "value" in ae ? ae.value : ae.textContent,
      n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++);
    var c = e - l;
    for (a = 1; a <= c && t[e - a] === u[n - a]; a++);
    return (qu = u.slice(l, 1 < a ? 1 - a : void 0));
  }
  function Bu(l) {
    var t = l.keyCode;
    return (
      "charCode" in l
        ? ((l = l.charCode), l === 0 && t === 13 && (l = 13))
        : (l = t),
      l === 10 && (l = 13),
      32 <= l || l === 13 ? l : 0
    );
  }
  function Yu() {
    return !0;
  }
  function Lf() {
    return !1;
  }
  function Fl(l) {
    function t(e, a, u, n, c) {
      ((this._reactName = e),
        (this._targetInst = u),
        (this.type = a),
        (this.nativeEvent = n),
        (this.target = c),
        (this.currentTarget = null));
      for (var i in l)
        l.hasOwnProperty(i) && ((e = l[i]), (this[i] = e ? e(n) : n[i]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? Yu
          : Lf),
        (this.isPropagationStopped = Lf),
        this
      );
    }
    return (
      C(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault
              ? e.preventDefault()
              : typeof e.returnValue != "unknown" && (e.returnValue = !1),
            (this.isDefaultPrevented = Yu));
        },
        stopPropagation: function () {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation
              ? e.stopPropagation()
              : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0),
            (this.isPropagationStopped = Yu));
        },
        persist: function () {},
        isPersistent: Yu,
      }),
      t
    );
  }
  var _e = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (l) {
        return l.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Gu = Fl(_e),
    Ga = C({}, _e, { view: 0, detail: 0 }),
    lm = Fl(Ga),
    oc,
    mc,
    Xa,
    Xu = C({}, Ga, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: yc,
      button: 0,
      buttons: 0,
      relatedTarget: function (l) {
        return l.relatedTarget === void 0
          ? l.fromElement === l.srcElement
            ? l.toElement
            : l.fromElement
          : l.relatedTarget;
      },
      movementX: function (l) {
        return "movementX" in l
          ? l.movementX
          : (l !== Xa &&
              (Xa && l.type === "mousemove"
                ? ((oc = l.screenX - Xa.screenX), (mc = l.screenY - Xa.screenY))
                : (mc = oc = 0),
              (Xa = l)),
            oc);
      },
      movementY: function (l) {
        return "movementY" in l ? l.movementY : mc;
      },
    }),
    Kf = Fl(Xu),
    tm = C({}, Xu, { dataTransfer: 0 }),
    em = Fl(tm),
    am = C({}, Ga, { relatedTarget: 0 }),
    rc = Fl(am),
    um = C({}, _e, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    nm = Fl(um),
    cm = C({}, _e, {
      clipboardData: function (l) {
        return "clipboardData" in l ? l.clipboardData : window.clipboardData;
      },
    }),
    im = Fl(cm),
    fm = C({}, _e, { data: 0 }),
    Jf = Fl(fm),
    sm = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    dm = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    om = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function mm(l) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(l)
      : (l = om[l])
        ? !!t[l]
        : !1;
  }
  function yc() {
    return mm;
  }
  var rm = C({}, Ga, {
      key: function (l) {
        if (l.key) {
          var t = sm[l.key] || l.key;
          if (t !== "Unidentified") return t;
        }
        return l.type === "keypress"
          ? ((l = Bu(l)), l === 13 ? "Enter" : String.fromCharCode(l))
          : l.type === "keydown" || l.type === "keyup"
            ? dm[l.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: yc,
      charCode: function (l) {
        return l.type === "keypress" ? Bu(l) : 0;
      },
      keyCode: function (l) {
        return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
      },
      which: function (l) {
        return l.type === "keypress"
          ? Bu(l)
          : l.type === "keydown" || l.type === "keyup"
            ? l.keyCode
            : 0;
      },
    }),
    ym = Fl(rm),
    hm = C({}, Xu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    wf = Fl(hm),
    vm = C({}, Ga, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: yc,
    }),
    gm = Fl(vm),
    Sm = C({}, _e, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    bm = Fl(Sm),
    xm = C({}, Xu, {
      deltaX: function (l) {
        return "deltaX" in l
          ? l.deltaX
          : "wheelDeltaX" in l
            ? -l.wheelDeltaX
            : 0;
      },
      deltaY: function (l) {
        return "deltaY" in l
          ? l.deltaY
          : "wheelDeltaY" in l
            ? -l.wheelDeltaY
            : "wheelDelta" in l
              ? -l.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Em = Fl(xm),
    Tm = C({}, _e, { newState: 0, oldState: 0 }),
    zm = Fl(Tm),
    Am = [9, 13, 27, 32],
    hc = Yt && "CompositionEvent" in window,
    Qa = null;
  Yt && "documentMode" in document && (Qa = document.documentMode);
  var pm = Yt && "TextEvent" in window && !Qa,
    Wf = Yt && (!hc || (Qa && 8 < Qa && 11 >= Qa)),
    kf = " ",
    $f = !1;
  function Ff(l, t) {
    switch (l) {
      case "keyup":
        return Am.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function If(l) {
    return (
      (l = l.detail),
      typeof l == "object" && "data" in l ? l.data : null
    );
  }
  var ea = !1;
  function Nm(l, t) {
    switch (l) {
      case "compositionend":
        return If(t);
      case "keypress":
        return t.which !== 32 ? null : (($f = !0), kf);
      case "textInput":
        return ((l = t.data), l === kf && $f ? null : l);
      default:
        return null;
    }
  }
  function jm(l, t) {
    if (ea)
      return l === "compositionend" || (!hc && Ff(l, t))
        ? ((l = Vf()), (qu = dc = ae = null), (ea = !1), l)
        : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Wf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Om = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Pf(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Om[l.type] : t === "textarea";
  }
  function ls(l, t, e, a) {
    (la ? (ta ? ta.push(a) : (ta = [a])) : (la = a),
      (t = _n(t, "onChange")),
      0 < t.length &&
        ((e = new Gu("onChange", "change", null, e, a)),
        l.push({ event: e, listeners: t })));
  }
  var Za = null,
    Va = null;
  function Mm(l) {
    Bo(l, 0);
  }
  function Qu(l) {
    var t = qa(l);
    if (Hf(t)) return l;
  }
  function ts(l, t) {
    if (l === "change") return t;
  }
  var es = !1;
  if (Yt) {
    var vc;
    if (Yt) {
      var gc = "oninput" in document;
      if (!gc) {
        var as = document.createElement("div");
        (as.setAttribute("oninput", "return;"),
          (gc = typeof as.oninput == "function"));
      }
      vc = gc;
    } else vc = !1;
    es = vc && (!document.documentMode || 9 < document.documentMode);
  }
  function us() {
    Za && (Za.detachEvent("onpropertychange", ns), (Va = Za = null));
  }
  function ns(l) {
    if (l.propertyName === "value" && Qu(Va)) {
      var t = [];
      (ls(t, Va, l, ic(l)), Zf(Mm, t));
    }
  }
  function _m(l, t, e) {
    l === "focusin"
      ? (us(), (Za = t), (Va = e), Za.attachEvent("onpropertychange", ns))
      : l === "focusout" && us();
  }
  function Dm(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Qu(Va);
  }
  function Um(l, t) {
    if (l === "click") return Qu(t);
  }
  function Rm(l, t) {
    if (l === "input" || l === "change") return Qu(t);
  }
  function Cm(l, t) {
    return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
  }
  var ct = typeof Object.is == "function" ? Object.is : Cm;
  function La(l, t) {
    if (ct(l, t)) return !0;
    if (
      typeof l != "object" ||
      l === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var e = Object.keys(l),
      a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!Wn.call(t, u) || !ct(l[u], t[u])) return !1;
    }
    return !0;
  }
  function cs(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function is(l, t) {
    var e = cs(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (((a = l + e.textContent.length), l <= t && a >= t))
          return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = cs(e);
    }
  }
  function fs(l, t) {
    return l && t
      ? l === t
        ? !0
        : l && l.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? fs(l, t.parentNode)
            : "contains" in l
              ? l.contains(t)
              : l.compareDocumentPosition
                ? !!(l.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function ss(l) {
    l =
      l != null &&
      l.ownerDocument != null &&
      l.ownerDocument.defaultView != null
        ? l.ownerDocument.defaultView
        : window;
    for (var t = Cu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = Cu(l.document);
    }
    return t;
  }
  function Sc(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (l.type === "text" ||
          l.type === "search" ||
          l.type === "tel" ||
          l.type === "url" ||
          l.type === "password")) ||
        t === "textarea" ||
        l.contentEditable === "true")
    );
  }
  var Hm = Yt && "documentMode" in document && 11 >= document.documentMode,
    aa = null,
    bc = null,
    Ka = null,
    xc = !1;
  function ds(l, t, e) {
    var a =
      e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    xc ||
      aa == null ||
      aa !== Cu(a) ||
      ((a = aa),
      "selectionStart" in a && Sc(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Ka && La(Ka, a)) ||
        ((Ka = a),
        (a = _n(bc, "onSelect")),
        0 < a.length &&
          ((t = new Gu("onSelect", "select", null, t, e)),
          l.push({ event: t, listeners: a }),
          (t.target = aa))));
  }
  function De(l, t) {
    var e = {};
    return (
      (e[l.toLowerCase()] = t.toLowerCase()),
      (e["Webkit" + l] = "webkit" + t),
      (e["Moz" + l] = "moz" + t),
      e
    );
  }
  var ua = {
      animationend: De("Animation", "AnimationEnd"),
      animationiteration: De("Animation", "AnimationIteration"),
      animationstart: De("Animation", "AnimationStart"),
      transitionrun: De("Transition", "TransitionRun"),
      transitionstart: De("Transition", "TransitionStart"),
      transitioncancel: De("Transition", "TransitionCancel"),
      transitionend: De("Transition", "TransitionEnd"),
    },
    Ec = {},
    os = {};
  Yt &&
    ((os = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete ua.animationend.animation,
      delete ua.animationiteration.animation,
      delete ua.animationstart.animation),
    "TransitionEvent" in window || delete ua.transitionend.transition);
  function Ue(l) {
    if (Ec[l]) return Ec[l];
    if (!ua[l]) return l;
    var t = ua[l],
      e;
    for (e in t) if (t.hasOwnProperty(e) && e in os) return (Ec[l] = t[e]);
    return l;
  }
  var ms = Ue("animationend"),
    rs = Ue("animationiteration"),
    ys = Ue("animationstart"),
    qm = Ue("transitionrun"),
    Bm = Ue("transitionstart"),
    Ym = Ue("transitioncancel"),
    hs = Ue("transitionend"),
    vs = new Map(),
    Tc =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Tc.push("scrollEnd");
  function At(l, t) {
    (vs.set(l, t), Me(t, [l]));
  }
  var Zu =
      typeof reportError == "function"
        ? reportError
        : function (l) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof l == "object" &&
                  l !== null &&
                  typeof l.message == "string"
                    ? String(l.message)
                    : String(l),
                error: l,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", l);
              return;
            }
            console.error(l);
          },
    ht = [],
    na = 0,
    zc = 0;
  function Vu() {
    for (var l = na, t = (zc = na = 0); t < l; ) {
      var e = ht[t];
      ht[t++] = null;
      var a = ht[t];
      ht[t++] = null;
      var u = ht[t];
      ht[t++] = null;
      var n = ht[t];
      if (((ht[t++] = null), a !== null && u !== null)) {
        var c = a.pending;
        (c === null ? (u.next = u) : ((u.next = c.next), (c.next = u)),
          (a.pending = u));
      }
      n !== 0 && gs(e, u, n);
    }
  }
  function Lu(l, t, e, a) {
    ((ht[na++] = l),
      (ht[na++] = t),
      (ht[na++] = e),
      (ht[na++] = a),
      (zc |= a),
      (l.lanes |= a),
      (l = l.alternate),
      l !== null && (l.lanes |= a));
  }
  function Ac(l, t, e, a) {
    return (Lu(l, t, e, a), Ku(l));
  }
  function Re(l, t) {
    return (Lu(l, null, null, t), Ku(l));
  }
  function gs(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      ((n.childLanes |= e),
        (a = n.alternate),
        a !== null && (a.childLanes |= e),
        n.tag === 22 &&
          ((l = n.stateNode), l === null || l._visibility & 1 || (u = !0)),
        (l = n),
        (n = n.return));
    return l.tag === 3
      ? ((n = l.stateNode),
        u &&
          t !== null &&
          ((u = 31 - nt(e)),
          (l = n.hiddenUpdates),
          (a = l[u]),
          a === null ? (l[u] = [t]) : a.push(t),
          (t.lane = e | 536870912)),
        n)
      : null;
  }
  function Ku(l) {
    if (50 < ru) throw ((ru = 0), (Ri = null), Error(r(185)));
    for (var t = l.return; t !== null; ) ((l = t), (t = l.return));
    return l.tag === 3 ? l.stateNode : null;
  }
  var ca = {};
  function Gm(l, t, e, a) {
    ((this.tag = l),
      (this.key = e),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function it(l, t, e, a) {
    return new Gm(l, t, e, a);
  }
  function pc(l) {
    return ((l = l.prototype), !(!l || !l.isReactComponent));
  }
  function Gt(l, t) {
    var e = l.alternate;
    return (
      e === null
        ? ((e = it(l.tag, t, l.key, l.mode)),
          (e.elementType = l.elementType),
          (e.type = l.type),
          (e.stateNode = l.stateNode),
          (e.alternate = l),
          (l.alternate = e))
        : ((e.pendingProps = t),
          (e.type = l.type),
          (e.flags = 0),
          (e.subtreeFlags = 0),
          (e.deletions = null)),
      (e.flags = l.flags & 65011712),
      (e.childLanes = l.childLanes),
      (e.lanes = l.lanes),
      (e.child = l.child),
      (e.memoizedProps = l.memoizedProps),
      (e.memoizedState = l.memoizedState),
      (e.updateQueue = l.updateQueue),
      (t = l.dependencies),
      (e.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (e.sibling = l.sibling),
      (e.index = l.index),
      (e.ref = l.ref),
      (e.refCleanup = l.refCleanup),
      e
    );
  }
  function Ss(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return (
      e === null
        ? ((l.childLanes = 0),
          (l.lanes = t),
          (l.child = null),
          (l.subtreeFlags = 0),
          (l.memoizedProps = null),
          (l.memoizedState = null),
          (l.updateQueue = null),
          (l.dependencies = null),
          (l.stateNode = null))
        : ((l.childLanes = e.childLanes),
          (l.lanes = e.lanes),
          (l.child = e.child),
          (l.subtreeFlags = 0),
          (l.deletions = null),
          (l.memoizedProps = e.memoizedProps),
          (l.memoizedState = e.memoizedState),
          (l.updateQueue = e.updateQueue),
          (l.type = e.type),
          (t = e.dependencies),
          (l.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      l
    );
  }
  function Ju(l, t, e, a, u, n) {
    var c = 0;
    if (((a = l), typeof l == "function")) pc(l) && (c = 1);
    else if (typeof l == "string")
      c = Lr(l, e, _.current)
        ? 26
        : l === "html" || l === "head" || l === "body"
          ? 27
          : 5;
    else
      l: switch (l) {
        case Wl:
          return (
            (l = it(31, e, t, u)),
            (l.elementType = Wl),
            (l.lanes = n),
            l
          );
        case Sl:
          return Ce(e.children, u, n, t);
        case Ul:
          ((c = 8), (u |= 24));
          break;
        case ul:
          return (
            (l = it(12, e, t, u | 2)),
            (l.elementType = ul),
            (l.lanes = n),
            l
          );
        case Rl:
          return (
            (l = it(13, e, t, u)),
            (l.elementType = Rl),
            (l.lanes = n),
            l
          );
        case Vl:
          return (
            (l = it(19, e, t, u)),
            (l.elementType = Vl),
            (l.lanes = n),
            l
          );
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Nl:
                c = 10;
                break l;
              case I:
                c = 9;
                break l;
              case ql:
                c = 11;
                break l;
              case q:
                c = 14;
                break l;
              case Bl:
                ((c = 16), (a = null));
                break l;
            }
          ((c = 29),
            (e = Error(r(130, l === null ? "null" : typeof l, ""))),
            (a = null));
      }
    return (
      (t = it(c, e, t, u)),
      (t.elementType = l),
      (t.type = a),
      (t.lanes = n),
      t
    );
  }
  function Ce(l, t, e, a) {
    return ((l = it(7, l, a, t)), (l.lanes = e), l);
  }
  function Nc(l, t, e) {
    return ((l = it(6, l, null, t)), (l.lanes = e), l);
  }
  function bs(l) {
    var t = it(18, null, null, 0);
    return ((t.stateNode = l), t);
  }
  function jc(l, t, e) {
    return (
      (t = it(4, l.children !== null ? l.children : [], l.key, t)),
      (t.lanes = e),
      (t.stateNode = {
        containerInfo: l.containerInfo,
        pendingChildren: null,
        implementation: l.implementation,
      }),
      t
    );
  }
  var xs = new WeakMap();
  function vt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = xs.get(l);
      return e !== void 0
        ? e
        : ((t = { value: l, source: t, stack: bf(t) }), xs.set(l, t), t);
    }
    return { value: l, source: t, stack: bf(t) };
  }
  var ia = [],
    fa = 0,
    wu = null,
    Ja = 0,
    gt = [],
    St = 0,
    ue = null,
    _t = 1,
    Dt = "";
  function Xt(l, t) {
    ((ia[fa++] = Ja), (ia[fa++] = wu), (wu = l), (Ja = t));
  }
  function Es(l, t, e) {
    ((gt[St++] = _t), (gt[St++] = Dt), (gt[St++] = ue), (ue = l));
    var a = _t;
    l = Dt;
    var u = 32 - nt(a) - 1;
    ((a &= ~(1 << u)), (e += 1));
    var n = 32 - nt(t) + u;
    if (30 < n) {
      var c = u - (u % 5);
      ((n = (a & ((1 << c) - 1)).toString(32)),
        (a >>= c),
        (u -= c),
        (_t = (1 << (32 - nt(t) + u)) | (e << u) | a),
        (Dt = n + l));
    } else ((_t = (1 << n) | (e << u) | a), (Dt = l));
  }
  function Oc(l) {
    l.return !== null && (Xt(l, 1), Es(l, 1, 0));
  }
  function Mc(l) {
    for (; l === wu; )
      ((wu = ia[--fa]), (ia[fa] = null), (Ja = ia[--fa]), (ia[fa] = null));
    for (; l === ue; )
      ((ue = gt[--St]),
        (gt[St] = null),
        (Dt = gt[--St]),
        (gt[St] = null),
        (_t = gt[--St]),
        (gt[St] = null));
  }
  function Ts(l, t) {
    ((gt[St++] = _t),
      (gt[St++] = Dt),
      (gt[St++] = ue),
      (_t = t.id),
      (Dt = t.overflow),
      (ue = l));
  }
  var Gl = null,
    hl = null,
    tl = !1,
    ne = null,
    bt = !1,
    _c = Error(r(519));
  function ce(l) {
    var t = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (wa(vt(t, l)), _c);
  }
  function zs(l) {
    var t = l.stateNode,
      e = l.type,
      a = l.memoizedProps;
    switch (((t[Yl] = l), (t[$l] = a), e)) {
      case "dialog":
        ($("cancel", t), $("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        $("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < hu.length; e++) $(hu[e], t);
        break;
      case "source":
        $("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ($("error", t), $("load", t));
        break;
      case "details":
        $("toggle", t);
        break;
      case "input":
        ($("invalid", t),
          qf(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0,
          ));
        break;
      case "select":
        $("invalid", t);
        break;
      case "textarea":
        ($("invalid", t), Yf(t, a.value, a.defaultValue, a.children));
    }
    ((e = a.children),
      (typeof e != "string" && typeof e != "number" && typeof e != "bigint") ||
      t.textContent === "" + e ||
      a.suppressHydrationWarning === !0 ||
      Qo(t.textContent, e)
        ? (a.popover != null && ($("beforetoggle", t), $("toggle", t)),
          a.onScroll != null && $("scroll", t),
          a.onScrollEnd != null && $("scrollend", t),
          a.onClick != null && (t.onclick = Bt),
          (t = !0))
        : (t = !1),
      t || ce(l, !0));
  }
  function As(l) {
    for (Gl = l.return; Gl; )
      switch (Gl.tag) {
        case 5:
        case 31:
        case 13:
          bt = !1;
          return;
        case 27:
        case 3:
          bt = !0;
          return;
        default:
          Gl = Gl.return;
      }
  }
  function sa(l) {
    if (l !== Gl) return !1;
    if (!tl) return (As(l), (tl = !0), !1);
    var t = l.tag,
      e;
    if (
      ((e = t !== 3 && t !== 27) &&
        ((e = t === 5) &&
          ((e = l.type),
          (e =
            !(e !== "form" && e !== "button") || Wi(l.type, l.memoizedProps))),
        (e = !e)),
      e && hl && ce(l),
      As(l),
      t === 13)
    ) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(r(317));
      hl = $o(l);
    } else if (t === 31) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(r(317));
      hl = $o(l);
    } else
      t === 27
        ? ((t = hl), xe(l.type) ? ((l = Pi), (Pi = null), (hl = l)) : (hl = t))
        : (hl = Gl ? Et(l.stateNode.nextSibling) : null);
    return !0;
  }
  function He() {
    ((hl = Gl = null), (tl = !1));
  }
  function Dc() {
    var l = ne;
    return (
      l !== null &&
        (tt === null ? (tt = l) : tt.push.apply(tt, l), (ne = null)),
      l
    );
  }
  function wa(l) {
    ne === null ? (ne = [l]) : ne.push(l);
  }
  var Uc = o(null),
    qe = null,
    Qt = null;
  function ie(l, t, e) {
    (N(Uc, t._currentValue), (t._currentValue = e));
  }
  function Zt(l) {
    ((l._currentValue = Uc.current), A(Uc));
  }
  function Rc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if (
        ((l.childLanes & t) !== t
          ? ((l.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        l === e)
      )
        break;
      l = l.return;
    }
  }
  function Cc(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var c = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var i = n;
          n = u;
          for (var s = 0; s < t.length; s++)
            if (i.context === t[s]) {
              ((n.lanes |= e),
                (i = n.alternate),
                i !== null && (i.lanes |= e),
                Rc(n.return, e, l),
                a || (c = null));
              break l;
            }
          n = i.next;
        }
      } else if (u.tag === 18) {
        if (((c = u.return), c === null)) throw Error(r(341));
        ((c.lanes |= e),
          (n = c.alternate),
          n !== null && (n.lanes |= e),
          Rc(c, e, l),
          (c = null));
      } else c = u.child;
      if (c !== null) c.return = u;
      else
        for (c = u; c !== null; ) {
          if (c === l) {
            c = null;
            break;
          }
          if (((u = c.sibling), u !== null)) {
            ((u.return = c.return), (c = u));
            break;
          }
          c = c.return;
        }
      u = c;
    }
  }
  function da(l, t, e, a) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var c = u.alternate;
        if (c === null) throw Error(r(387));
        if (((c = c.memoizedProps), c !== null)) {
          var i = u.type;
          ct(u.pendingProps.value, c.value) ||
            (l !== null ? l.push(i) : (l = [i]));
        }
      } else if (u === cl.current) {
        if (((c = u.alternate), c === null)) throw Error(r(387));
        c.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (l !== null ? l.push(xu) : (l = [xu]));
      }
      u = u.return;
    }
    (l !== null && Cc(t, l, e, a), (t.flags |= 262144));
  }
  function Wu(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!ct(l.context._currentValue, l.memoizedValue)) return !0;
      l = l.next;
    }
    return !1;
  }
  function Be(l) {
    ((qe = l),
      (Qt = null),
      (l = l.dependencies),
      l !== null && (l.firstContext = null));
  }
  function Xl(l) {
    return ps(qe, l);
  }
  function ku(l, t) {
    return (qe === null && Be(l), ps(l, t));
  }
  function ps(l, t) {
    var e = t._currentValue;
    if (((t = { context: t, memoizedValue: e, next: null }), Qt === null)) {
      if (l === null) throw Error(r(308));
      ((Qt = t),
        (l.dependencies = { lanes: 0, firstContext: t }),
        (l.flags |= 524288));
    } else Qt = Qt.next = t;
    return e;
  }
  var Xm =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var l = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (e, a) {
                  l.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                l.forEach(function (e) {
                  return e();
                }));
            };
          },
    Qm = x.unstable_scheduleCallback,
    Zm = x.unstable_NormalPriority,
    jl = {
      $$typeof: Nl,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Hc() {
    return { controller: new Xm(), data: new Map(), refCount: 0 };
  }
  function Wa(l) {
    (l.refCount--,
      l.refCount === 0 &&
        Qm(Zm, function () {
          l.controller.abort();
        }));
  }
  var ka = null,
    qc = 0,
    oa = 0,
    ma = null;
  function Vm(l, t) {
    if (ka === null) {
      var e = (ka = []);
      ((qc = 0),
        (oa = Gi()),
        (ma = {
          status: "pending",
          value: void 0,
          then: function (a) {
            e.push(a);
          },
        }));
    }
    return (qc++, t.then(Ns, Ns), t);
  }
  function Ns() {
    if (--qc === 0 && ka !== null) {
      ma !== null && (ma.status = "fulfilled");
      var l = ka;
      ((ka = null), (oa = 0), (ma = null));
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Lm(l, t) {
    var e = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          e.push(u);
        },
      };
    return (
      l.then(
        function () {
          ((a.status = "fulfilled"), (a.value = t));
          for (var u = 0; u < e.length; u++) (0, e[u])(t);
        },
        function (u) {
          for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
            (0, e[u])(void 0);
        },
      ),
      a
    );
  }
  var js = E.S;
  E.S = function (l, t) {
    ((oo = at()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        Vm(l, t),
      js !== null && js(l, t));
  };
  var Ye = o(null);
  function Bc() {
    var l = Ye.current;
    return l !== null ? l : yl.pooledCache;
  }
  function $u(l, t) {
    t === null ? N(Ye, Ye.current) : N(Ye, t.pool);
  }
  function Os() {
    var l = Bc();
    return l === null ? null : { parent: jl._currentValue, pool: l };
  }
  var ra = Error(r(460)),
    Yc = Error(r(474)),
    Fu = Error(r(542)),
    Iu = { then: function () {} };
  function Ms(l) {
    return ((l = l.status), l === "fulfilled" || l === "rejected");
  }
  function _s(l, t, e) {
    switch (
      ((e = l[e]),
      e === void 0 ? l.push(t) : e !== t && (t.then(Bt, Bt), (t = e)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((l = t.reason), Us(l), l);
      default:
        if (typeof t.status == "string") t.then(Bt, Bt);
        else {
          if (((l = yl), l !== null && 100 < l.shellSuspendCounter))
            throw Error(r(482));
          ((l = t),
            (l.status = "pending"),
            l.then(
              function (a) {
                if (t.status === "pending") {
                  var u = t;
                  ((u.status = "fulfilled"), (u.value = a));
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var u = t;
                  ((u.status = "rejected"), (u.reason = a));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((l = t.reason), Us(l), l);
        }
        throw ((Xe = t), ra);
    }
  }
  function Ge(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function"
        ? ((Xe = e), ra)
        : e;
    }
  }
  var Xe = null;
  function Ds() {
    if (Xe === null) throw Error(r(459));
    var l = Xe;
    return ((Xe = null), l);
  }
  function Us(l) {
    if (l === ra || l === Fu) throw Error(r(483));
  }
  var ya = null,
    $a = 0;
  function Pu(l) {
    var t = $a;
    return (($a += 1), ya === null && (ya = []), _s(ya, l, t));
  }
  function Fa(l, t) {
    ((t = t.props.ref), (l.ref = t !== void 0 ? t : null));
  }
  function ln(l, t) {
    throw t.$$typeof === Y
      ? Error(r(525))
      : ((l = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            l === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : l,
          ),
        ));
  }
  function Rs(l) {
    function t(m, d) {
      if (l) {
        var y = m.deletions;
        y === null ? ((m.deletions = [d]), (m.flags |= 16)) : y.push(d);
      }
    }
    function e(m, d) {
      if (!l) return null;
      for (; d !== null; ) (t(m, d), (d = d.sibling));
      return null;
    }
    function a(m) {
      for (var d = new Map(); m !== null; )
        (m.key !== null ? d.set(m.key, m) : d.set(m.index, m), (m = m.sibling));
      return d;
    }
    function u(m, d) {
      return ((m = Gt(m, d)), (m.index = 0), (m.sibling = null), m);
    }
    function n(m, d, y) {
      return (
        (m.index = y),
        l
          ? ((y = m.alternate),
            y !== null
              ? ((y = y.index), y < d ? ((m.flags |= 67108866), d) : y)
              : ((m.flags |= 67108866), d))
          : ((m.flags |= 1048576), d)
      );
    }
    function c(m) {
      return (l && m.alternate === null && (m.flags |= 67108866), m);
    }
    function i(m, d, y, T) {
      return d === null || d.tag !== 6
        ? ((d = Nc(y, m.mode, T)), (d.return = m), d)
        : ((d = u(d, y)), (d.return = m), d);
    }
    function s(m, d, y, T) {
      var B = y.type;
      return B === Sl
        ? b(m, d, y.props.children, T, y.key)
        : d !== null &&
            (d.elementType === B ||
              (typeof B == "object" &&
                B !== null &&
                B.$$typeof === Bl &&
                Ge(B) === d.type))
          ? ((d = u(d, y.props)), Fa(d, y), (d.return = m), d)
          : ((d = Ju(y.type, y.key, y.props, null, m.mode, T)),
            Fa(d, y),
            (d.return = m),
            d);
    }
    function h(m, d, y, T) {
      return d === null ||
        d.tag !== 4 ||
        d.stateNode.containerInfo !== y.containerInfo ||
        d.stateNode.implementation !== y.implementation
        ? ((d = jc(y, m.mode, T)), (d.return = m), d)
        : ((d = u(d, y.children || [])), (d.return = m), d);
    }
    function b(m, d, y, T, B) {
      return d === null || d.tag !== 7
        ? ((d = Ce(y, m.mode, T, B)), (d.return = m), d)
        : ((d = u(d, y)), (d.return = m), d);
    }
    function z(m, d, y) {
      if (
        (typeof d == "string" && d !== "") ||
        typeof d == "number" ||
        typeof d == "bigint"
      )
        return ((d = Nc("" + d, m.mode, y)), (d.return = m), d);
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case xl:
            return (
              (y = Ju(d.type, d.key, d.props, null, m.mode, y)),
              Fa(y, d),
              (y.return = m),
              y
            );
          case gl:
            return ((d = jc(d, m.mode, y)), (d.return = m), d);
          case Bl:
            return ((d = Ge(d)), z(m, d, y));
        }
        if (zt(d) || kl(d))
          return ((d = Ce(d, m.mode, y, null)), (d.return = m), d);
        if (typeof d.then == "function") return z(m, Pu(d), y);
        if (d.$$typeof === Nl) return z(m, ku(m, d), y);
        ln(m, d);
      }
      return null;
    }
    function v(m, d, y, T) {
      var B = d !== null ? d.key : null;
      if (
        (typeof y == "string" && y !== "") ||
        typeof y == "number" ||
        typeof y == "bigint"
      )
        return B !== null ? null : i(m, d, "" + y, T);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case xl:
            return y.key === B ? s(m, d, y, T) : null;
          case gl:
            return y.key === B ? h(m, d, y, T) : null;
          case Bl:
            return ((y = Ge(y)), v(m, d, y, T));
        }
        if (zt(y) || kl(y)) return B !== null ? null : b(m, d, y, T, null);
        if (typeof y.then == "function") return v(m, d, Pu(y), T);
        if (y.$$typeof === Nl) return v(m, d, ku(m, y), T);
        ln(m, y);
      }
      return null;
    }
    function g(m, d, y, T, B) {
      if (
        (typeof T == "string" && T !== "") ||
        typeof T == "number" ||
        typeof T == "bigint"
      )
        return ((m = m.get(y) || null), i(d, m, "" + T, B));
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case xl:
            return (
              (m = m.get(T.key === null ? y : T.key) || null),
              s(d, m, T, B)
            );
          case gl:
            return (
              (m = m.get(T.key === null ? y : T.key) || null),
              h(d, m, T, B)
            );
          case Bl:
            return ((T = Ge(T)), g(m, d, y, T, B));
        }
        if (zt(T) || kl(T))
          return ((m = m.get(y) || null), b(d, m, T, B, null));
        if (typeof T.then == "function") return g(m, d, y, Pu(T), B);
        if (T.$$typeof === Nl) return g(m, d, y, ku(d, T), B);
        ln(d, T);
      }
      return null;
    }
    function M(m, d, y, T) {
      for (
        var B = null, el = null, U = d, w = (d = 0), ll = null;
        U !== null && w < y.length;
        w++
      ) {
        U.index > w ? ((ll = U), (U = null)) : (ll = U.sibling);
        var al = v(m, U, y[w], T);
        if (al === null) {
          U === null && (U = ll);
          break;
        }
        (l && U && al.alternate === null && t(m, U),
          (d = n(al, d, w)),
          el === null ? (B = al) : (el.sibling = al),
          (el = al),
          (U = ll));
      }
      if (w === y.length) return (e(m, U), tl && Xt(m, w), B);
      if (U === null) {
        for (; w < y.length; w++)
          ((U = z(m, y[w], T)),
            U !== null &&
              ((d = n(U, d, w)),
              el === null ? (B = U) : (el.sibling = U),
              (el = U)));
        return (tl && Xt(m, w), B);
      }
      for (U = a(U); w < y.length; w++)
        ((ll = g(U, m, w, y[w], T)),
          ll !== null &&
            (l &&
              ll.alternate !== null &&
              U.delete(ll.key === null ? w : ll.key),
            (d = n(ll, d, w)),
            el === null ? (B = ll) : (el.sibling = ll),
            (el = ll)));
      return (
        l &&
          U.forEach(function (pe) {
            return t(m, pe);
          }),
        tl && Xt(m, w),
        B
      );
    }
    function G(m, d, y, T) {
      if (y == null) throw Error(r(151));
      for (
        var B = null, el = null, U = d, w = (d = 0), ll = null, al = y.next();
        U !== null && !al.done;
        w++, al = y.next()
      ) {
        U.index > w ? ((ll = U), (U = null)) : (ll = U.sibling);
        var pe = v(m, U, al.value, T);
        if (pe === null) {
          U === null && (U = ll);
          break;
        }
        (l && U && pe.alternate === null && t(m, U),
          (d = n(pe, d, w)),
          el === null ? (B = pe) : (el.sibling = pe),
          (el = pe),
          (U = ll));
      }
      if (al.done) return (e(m, U), tl && Xt(m, w), B);
      if (U === null) {
        for (; !al.done; w++, al = y.next())
          ((al = z(m, al.value, T)),
            al !== null &&
              ((d = n(al, d, w)),
              el === null ? (B = al) : (el.sibling = al),
              (el = al)));
        return (tl && Xt(m, w), B);
      }
      for (U = a(U); !al.done; w++, al = y.next())
        ((al = g(U, m, w, al.value, T)),
          al !== null &&
            (l &&
              al.alternate !== null &&
              U.delete(al.key === null ? w : al.key),
            (d = n(al, d, w)),
            el === null ? (B = al) : (el.sibling = al),
            (el = al)));
      return (
        l &&
          U.forEach(function (ty) {
            return t(m, ty);
          }),
        tl && Xt(m, w),
        B
      );
    }
    function ml(m, d, y, T) {
      if (
        (typeof y == "object" &&
          y !== null &&
          y.type === Sl &&
          y.key === null &&
          (y = y.props.children),
        typeof y == "object" && y !== null)
      ) {
        switch (y.$$typeof) {
          case xl:
            l: {
              for (var B = y.key; d !== null; ) {
                if (d.key === B) {
                  if (((B = y.type), B === Sl)) {
                    if (d.tag === 7) {
                      (e(m, d.sibling),
                        (T = u(d, y.props.children)),
                        (T.return = m),
                        (m = T));
                      break l;
                    }
                  } else if (
                    d.elementType === B ||
                    (typeof B == "object" &&
                      B !== null &&
                      B.$$typeof === Bl &&
                      Ge(B) === d.type)
                  ) {
                    (e(m, d.sibling),
                      (T = u(d, y.props)),
                      Fa(T, y),
                      (T.return = m),
                      (m = T));
                    break l;
                  }
                  e(m, d);
                  break;
                } else t(m, d);
                d = d.sibling;
              }
              y.type === Sl
                ? ((T = Ce(y.props.children, m.mode, T, y.key)),
                  (T.return = m),
                  (m = T))
                : ((T = Ju(y.type, y.key, y.props, null, m.mode, T)),
                  Fa(T, y),
                  (T.return = m),
                  (m = T));
            }
            return c(m);
          case gl:
            l: {
              for (B = y.key; d !== null; ) {
                if (d.key === B)
                  if (
                    d.tag === 4 &&
                    d.stateNode.containerInfo === y.containerInfo &&
                    d.stateNode.implementation === y.implementation
                  ) {
                    (e(m, d.sibling),
                      (T = u(d, y.children || [])),
                      (T.return = m),
                      (m = T));
                    break l;
                  } else {
                    e(m, d);
                    break;
                  }
                else t(m, d);
                d = d.sibling;
              }
              ((T = jc(y, m.mode, T)), (T.return = m), (m = T));
            }
            return c(m);
          case Bl:
            return ((y = Ge(y)), ml(m, d, y, T));
        }
        if (zt(y)) return M(m, d, y, T);
        if (kl(y)) {
          if (((B = kl(y)), typeof B != "function")) throw Error(r(150));
          return ((y = B.call(y)), G(m, d, y, T));
        }
        if (typeof y.then == "function") return ml(m, d, Pu(y), T);
        if (y.$$typeof === Nl) return ml(m, d, ku(m, y), T);
        ln(m, y);
      }
      return (typeof y == "string" && y !== "") ||
        typeof y == "number" ||
        typeof y == "bigint"
        ? ((y = "" + y),
          d !== null && d.tag === 6
            ? (e(m, d.sibling), (T = u(d, y)), (T.return = m), (m = T))
            : (e(m, d), (T = Nc(y, m.mode, T)), (T.return = m), (m = T)),
          c(m))
        : e(m, d);
    }
    return function (m, d, y, T) {
      try {
        $a = 0;
        var B = ml(m, d, y, T);
        return ((ya = null), B);
      } catch (U) {
        if (U === ra || U === Fu) throw U;
        var el = it(29, U, null, m.mode);
        return ((el.lanes = T), (el.return = m), el);
      } finally {
      }
    };
  }
  var Qe = Rs(!0),
    Cs = Rs(!1),
    fe = !1;
  function Gc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Xc(l, t) {
    ((l = l.updateQueue),
      t.updateQueue === l &&
        (t.updateQueue = {
          baseState: l.baseState,
          firstBaseUpdate: l.firstBaseUpdate,
          lastBaseUpdate: l.lastBaseUpdate,
          shared: l.shared,
          callbacks: null,
        }));
  }
  function se(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function de(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (nl & 2) !== 0)) {
      var u = a.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (a.pending = t),
        (t = Ku(l)),
        gs(l, null, e),
        t
      );
    }
    return (Lu(l, a, t, e), Ku(l));
  }
  function Ia(l, t, e) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (e & 4194048) !== 0))
    ) {
      var a = t.lanes;
      ((a &= l.pendingLanes), (e |= a), (t.lanes = e), pf(l, e));
    }
  }
  function Qc(l, t) {
    var e = l.updateQueue,
      a = l.alternate;
    if (a !== null && ((a = a.updateQueue), e === a)) {
      var u = null,
        n = null;
      if (((e = e.firstBaseUpdate), e !== null)) {
        do {
          var c = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null,
          };
          (n === null ? (u = n = c) : (n = n.next = c), (e = e.next));
        } while (e !== null);
        n === null ? (u = n = t) : (n = n.next = t);
      } else u = n = t;
      ((e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (l.updateQueue = e));
      return;
    }
    ((l = e.lastBaseUpdate),
      l === null ? (e.firstBaseUpdate = t) : (l.next = t),
      (e.lastBaseUpdate = t));
  }
  var Zc = !1;
  function Pa() {
    if (Zc) {
      var l = ma;
      if (l !== null) throw l;
    }
  }
  function lu(l, t, e, a) {
    Zc = !1;
    var u = l.updateQueue;
    fe = !1;
    var n = u.firstBaseUpdate,
      c = u.lastBaseUpdate,
      i = u.shared.pending;
    if (i !== null) {
      u.shared.pending = null;
      var s = i,
        h = s.next;
      ((s.next = null), c === null ? (n = h) : (c.next = h), (c = s));
      var b = l.alternate;
      b !== null &&
        ((b = b.updateQueue),
        (i = b.lastBaseUpdate),
        i !== c &&
          (i === null ? (b.firstBaseUpdate = h) : (i.next = h),
          (b.lastBaseUpdate = s)));
    }
    if (n !== null) {
      var z = u.baseState;
      ((c = 0), (b = h = s = null), (i = n));
      do {
        var v = i.lane & -536870913,
          g = v !== i.lane;
        if (g ? (P & v) === v : (a & v) === v) {
          (v !== 0 && v === oa && (Zc = !0),
            b !== null &&
              (b = b.next =
                {
                  lane: 0,
                  tag: i.tag,
                  payload: i.payload,
                  callback: null,
                  next: null,
                }));
          l: {
            var M = l,
              G = i;
            v = t;
            var ml = e;
            switch (G.tag) {
              case 1:
                if (((M = G.payload), typeof M == "function")) {
                  z = M.call(ml, z, v);
                  break l;
                }
                z = M;
                break l;
              case 3:
                M.flags = (M.flags & -65537) | 128;
              case 0:
                if (
                  ((M = G.payload),
                  (v = typeof M == "function" ? M.call(ml, z, v) : M),
                  v == null)
                )
                  break l;
                z = C({}, z, v);
                break l;
              case 2:
                fe = !0;
            }
          }
          ((v = i.callback),
            v !== null &&
              ((l.flags |= 64),
              g && (l.flags |= 8192),
              (g = u.callbacks),
              g === null ? (u.callbacks = [v]) : g.push(v)));
        } else
          ((g = {
            lane: v,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null,
          }),
            b === null ? ((h = b = g), (s = z)) : (b = b.next = g),
            (c |= v));
        if (((i = i.next), i === null)) {
          if (((i = u.shared.pending), i === null)) break;
          ((g = i),
            (i = g.next),
            (g.next = null),
            (u.lastBaseUpdate = g),
            (u.shared.pending = null));
        }
      } while (!0);
      (b === null && (s = z),
        (u.baseState = s),
        (u.firstBaseUpdate = h),
        (u.lastBaseUpdate = b),
        n === null && (u.shared.lanes = 0),
        (he |= c),
        (l.lanes = c),
        (l.memoizedState = z));
    }
  }
  function Hs(l, t) {
    if (typeof l != "function") throw Error(r(191, l));
    l.call(t);
  }
  function qs(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++) Hs(e[l], t);
  }
  var ha = o(null),
    tn = o(0);
  function Bs(l, t) {
    ((l = Ft), N(tn, l), N(ha, t), (Ft = l | t.baseLanes));
  }
  function Vc() {
    (N(tn, Ft), N(ha, ha.current));
  }
  function Lc() {
    ((Ft = tn.current), A(ha), A(tn));
  }
  var ft = o(null),
    xt = null;
  function oe(l) {
    var t = l.alternate;
    (N(Al, Al.current & 1),
      N(ft, l),
      xt === null &&
        (t === null || ha.current !== null || t.memoizedState !== null) &&
        (xt = l));
  }
  function Kc(l) {
    (N(Al, Al.current), N(ft, l), xt === null && (xt = l));
  }
  function Ys(l) {
    l.tag === 22
      ? (N(Al, Al.current), N(ft, l), xt === null && (xt = l))
      : me();
  }
  function me() {
    (N(Al, Al.current), N(ft, ft.current));
  }
  function st(l) {
    (A(ft), xt === l && (xt = null), A(Al));
  }
  var Al = o(0);
  function en(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && ((e = e.dehydrated), e === null || Fi(e) || Ii(e)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Vt = 0,
    K = null,
    dl = null,
    Ol = null,
    an = !1,
    va = !1,
    Ze = !1,
    un = 0,
    tu = 0,
    ga = null,
    Km = 0;
  function El() {
    throw Error(r(321));
  }
  function Jc(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!ct(l[e], t[e])) return !1;
    return !0;
  }
  function wc(l, t, e, a, u, n) {
    return (
      (Vt = n),
      (K = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (E.H = l === null || l.memoizedState === null ? Ed : fi),
      (Ze = !1),
      (n = e(a, u)),
      (Ze = !1),
      va && (n = Xs(t, e, a, u)),
      Gs(l),
      n
    );
  }
  function Gs(l) {
    E.H = uu;
    var t = dl !== null && dl.next !== null;
    if (((Vt = 0), (Ol = dl = K = null), (an = !1), (tu = 0), (ga = null), t))
      throw Error(r(300));
    l === null ||
      Ml ||
      ((l = l.dependencies), l !== null && Wu(l) && (Ml = !0));
  }
  function Xs(l, t, e, a) {
    K = l;
    var u = 0;
    do {
      if ((va && (ga = null), (tu = 0), (va = !1), 25 <= u))
        throw Error(r(301));
      if (((u += 1), (Ol = dl = null), l.updateQueue != null)) {
        var n = l.updateQueue;
        ((n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0));
      }
      ((E.H = Td), (n = t(e, a)));
    } while (va);
    return n;
  }
  function Jm() {
    var l = E.H,
      t = l.useState()[0];
    return (
      (t = typeof t.then == "function" ? eu(t) : t),
      (l = l.useState()[0]),
      (dl !== null ? dl.memoizedState : null) !== l && (K.flags |= 1024),
      t
    );
  }
  function Wc() {
    var l = un !== 0;
    return ((un = 0), l);
  }
  function kc(l, t, e) {
    ((t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~e));
  }
  function $c(l) {
    if (an) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        (t !== null && (t.pending = null), (l = l.next));
      }
      an = !1;
    }
    ((Vt = 0), (Ol = dl = K = null), (va = !1), (tu = un = 0), (ga = null));
  }
  function wl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Ol === null ? (K.memoizedState = Ol = l) : (Ol = Ol.next = l), Ol);
  }
  function pl() {
    if (dl === null) {
      var l = K.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = dl.next;
    var t = Ol === null ? K.memoizedState : Ol.next;
    if (t !== null) ((Ol = t), (dl = l));
    else {
      if (l === null)
        throw K.alternate === null ? Error(r(467)) : Error(r(310));
      ((dl = l),
        (l = {
          memoizedState: dl.memoizedState,
          baseState: dl.baseState,
          baseQueue: dl.baseQueue,
          queue: dl.queue,
          next: null,
        }),
        Ol === null ? (K.memoizedState = Ol = l) : (Ol = Ol.next = l));
    }
    return Ol;
  }
  function nn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function eu(l) {
    var t = tu;
    return (
      (tu += 1),
      ga === null && (ga = []),
      (l = _s(ga, l, t)),
      (t = K),
      (Ol === null ? t.memoizedState : Ol.next) === null &&
        ((t = t.alternate),
        (E.H = t === null || t.memoizedState === null ? Ed : fi)),
      l
    );
  }
  function cn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return eu(l);
      if (l.$$typeof === Nl) return Xl(l);
    }
    throw Error(r(438, String(l)));
  }
  function Fc(l) {
    var t = null,
      e = K.updateQueue;
    if ((e !== null && (t = e.memoCache), t == null)) {
      var a = K.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      e === null && ((e = nn()), (K.updateQueue = e)),
      (e.memoCache = t),
      (e = t.data[t.index]),
      e === void 0)
    )
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = Je;
    return (t.index++, e);
  }
  function Lt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function fn(l) {
    var t = pl();
    return Ic(t, dl, l);
  }
  function Ic(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var u = l.baseQueue,
      n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var c = u.next;
        ((u.next = n.next), (n.next = c));
      }
      ((t.baseQueue = u = n), (a.pending = null));
    }
    if (((n = l.baseState), u === null)) l.memoizedState = n;
    else {
      t = u.next;
      var i = (c = null),
        s = null,
        h = t,
        b = !1;
      do {
        var z = h.lane & -536870913;
        if (z !== h.lane ? (P & z) === z : (Vt & z) === z) {
          var v = h.revertLane;
          if (v === 0)
            (s !== null &&
              (s = s.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: h.action,
                  hasEagerState: h.hasEagerState,
                  eagerState: h.eagerState,
                  next: null,
                }),
              z === oa && (b = !0));
          else if ((Vt & v) === v) {
            ((h = h.next), v === oa && (b = !0));
            continue;
          } else
            ((z = {
              lane: 0,
              revertLane: h.revertLane,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null,
            }),
              s === null ? ((i = s = z), (c = n)) : (s = s.next = z),
              (K.lanes |= v),
              (he |= v));
          ((z = h.action),
            Ze && e(n, z),
            (n = h.hasEagerState ? h.eagerState : e(n, z)));
        } else
          ((v = {
            lane: z,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null,
          }),
            s === null ? ((i = s = v), (c = n)) : (s = s.next = v),
            (K.lanes |= z),
            (he |= z));
        h = h.next;
      } while (h !== null && h !== t);
      if (
        (s === null ? (c = n) : (s.next = i),
        !ct(n, l.memoizedState) && ((Ml = !0), b && ((e = ma), e !== null)))
      )
        throw e;
      ((l.memoizedState = n),
        (l.baseState = c),
        (l.baseQueue = s),
        (a.lastRenderedState = n));
    }
    return (u === null && (a.lanes = 0), [l.memoizedState, a.dispatch]);
  }
  function Pc(l) {
    var t = pl(),
      e = t.queue;
    if (e === null) throw Error(r(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch,
      u = e.pending,
      n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var c = (u = u.next);
      do ((n = l(n, c.action)), (c = c.next));
      while (c !== u);
      (ct(n, t.memoizedState) || (Ml = !0),
        (t.memoizedState = n),
        t.baseQueue === null && (t.baseState = n),
        (e.lastRenderedState = n));
    }
    return [n, a];
  }
  function Qs(l, t, e) {
    var a = K,
      u = pl(),
      n = tl;
    if (n) {
      if (e === void 0) throw Error(r(407));
      e = e();
    } else e = t();
    var c = !ct((dl || u).memoizedState, e);
    if (
      (c && ((u.memoizedState = e), (Ml = !0)),
      (u = u.queue),
      ei(Ls.bind(null, a, u, l), [l]),
      u.getSnapshot !== t || c || (Ol !== null && Ol.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        Sa(9, { destroy: void 0 }, Vs.bind(null, a, u, e, t), null),
        yl === null)
      )
        throw Error(r(349));
      n || (Vt & 127) !== 0 || Zs(a, t, e);
    }
    return e;
  }
  function Zs(l, t, e) {
    ((l.flags |= 16384),
      (l = { getSnapshot: t, value: e }),
      (t = K.updateQueue),
      t === null
        ? ((t = nn()), (K.updateQueue = t), (t.stores = [l]))
        : ((e = t.stores), e === null ? (t.stores = [l]) : e.push(l)));
  }
  function Vs(l, t, e, a) {
    ((t.value = e), (t.getSnapshot = a), Ks(t) && Js(l));
  }
  function Ls(l, t, e) {
    return e(function () {
      Ks(t) && Js(l);
    });
  }
  function Ks(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !ct(l, e);
    } catch {
      return !0;
    }
  }
  function Js(l) {
    var t = Re(l, 2);
    t !== null && et(t, l, 2);
  }
  function li(l) {
    var t = wl();
    if (typeof l == "function") {
      var e = l;
      if (((l = e()), Ze)) {
        te(!0);
        try {
          e();
        } finally {
          te(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = l),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lt,
        lastRenderedState: l,
      }),
      t
    );
  }
  function ws(l, t, e, a) {
    return ((l.baseState = e), Ic(l, dl, typeof a == "function" ? a : Lt));
  }
  function wm(l, t, e, a, u) {
    if (on(l)) throw Error(r(485));
    if (((l = t.action), l !== null)) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (c) {
          n.listeners.push(c);
        },
      };
      (E.T !== null ? e(!0) : (n.isTransition = !1),
        a(n),
        (e = t.pending),
        e === null
          ? ((n.next = t.pending = n), Ws(t, n))
          : ((n.next = e.next), (t.pending = e.next = n)));
    }
  }
  function Ws(l, t) {
    var e = t.action,
      a = t.payload,
      u = l.state;
    if (t.isTransition) {
      var n = E.T,
        c = {};
      E.T = c;
      try {
        var i = e(u, a),
          s = E.S;
        (s !== null && s(c, i), ks(l, t, i));
      } catch (h) {
        ti(l, t, h);
      } finally {
        (n !== null && c.types !== null && (n.types = c.types), (E.T = n));
      }
    } else
      try {
        ((n = e(u, a)), ks(l, t, n));
      } catch (h) {
        ti(l, t, h);
      }
  }
  function ks(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function"
      ? e.then(
          function (a) {
            $s(l, t, a);
          },
          function (a) {
            return ti(l, t, a);
          },
        )
      : $s(l, t, e);
  }
  function $s(l, t, e) {
    ((t.status = "fulfilled"),
      (t.value = e),
      Fs(t),
      (l.state = e),
      (t = l.pending),
      t !== null &&
        ((e = t.next),
        e === t ? (l.pending = null) : ((e = e.next), (t.next = e), Ws(l, e))));
  }
  function ti(l, t, e) {
    var a = l.pending;
    if (((l.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = "rejected"), (t.reason = e), Fs(t), (t = t.next));
      while (t !== a);
    }
    l.action = null;
  }
  function Fs(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Is(l, t) {
    return t;
  }
  function Ps(l, t) {
    if (tl) {
      var e = yl.formState;
      if (e !== null) {
        l: {
          var a = K;
          if (tl) {
            if (hl) {
              t: {
                for (var u = hl, n = bt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (((u = Et(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                ((n = u.data), (u = n === "F!" || n === "F" ? u : null));
              }
              if (u) {
                ((hl = Et(u.nextSibling)), (a = u.data === "F!"));
                break l;
              }
            }
            ce(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return (
      (e = wl()),
      (e.memoizedState = e.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Is,
        lastRenderedState: t,
      }),
      (e.queue = a),
      (e = Sd.bind(null, K, a)),
      (a.dispatch = e),
      (a = li(!1)),
      (n = ii.bind(null, K, !1, a.queue)),
      (a = wl()),
      (u = { state: t, dispatch: null, action: l, pending: null }),
      (a.queue = u),
      (e = wm.bind(null, K, u, n, e)),
      (u.dispatch = e),
      (a.memoizedState = l),
      [t, e, !1]
    );
  }
  function ld(l) {
    var t = pl();
    return td(t, dl, l);
  }
  function td(l, t, e) {
    if (
      ((t = Ic(l, t, Is)[0]),
      (l = fn(Lt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = eu(t);
      } catch (c) {
        throw c === ra ? Fu : c;
      }
    else a = t;
    t = pl();
    var u = t.queue,
      n = u.dispatch;
    return (
      e !== t.memoizedState &&
        ((K.flags |= 2048),
        Sa(9, { destroy: void 0 }, Wm.bind(null, u, e), null)),
      [a, n, l]
    );
  }
  function Wm(l, t) {
    l.action = t;
  }
  function ed(l) {
    var t = pl(),
      e = dl;
    if (e !== null) return td(t, e, l);
    (pl(), (t = t.memoizedState), (e = pl()));
    var a = e.queue.dispatch;
    return ((e.memoizedState = l), [t, a, !1]);
  }
  function Sa(l, t, e, a) {
    return (
      (l = { tag: l, create: e, deps: a, inst: t, next: null }),
      (t = K.updateQueue),
      t === null && ((t = nn()), (K.updateQueue = t)),
      (e = t.lastEffect),
      e === null
        ? (t.lastEffect = l.next = l)
        : ((a = e.next), (e.next = l), (l.next = a), (t.lastEffect = l)),
      l
    );
  }
  function ad() {
    return pl().memoizedState;
  }
  function sn(l, t, e, a) {
    var u = wl();
    ((K.flags |= l),
      (u.memoizedState = Sa(
        1 | t,
        { destroy: void 0 },
        e,
        a === void 0 ? null : a,
      )));
  }
  function dn(l, t, e, a) {
    var u = pl();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    dl !== null && a !== null && Jc(a, dl.memoizedState.deps)
      ? (u.memoizedState = Sa(t, n, e, a))
      : ((K.flags |= l), (u.memoizedState = Sa(1 | t, n, e, a)));
  }
  function ud(l, t) {
    sn(8390656, 8, l, t);
  }
  function ei(l, t) {
    dn(2048, 8, l, t);
  }
  function km(l) {
    K.flags |= 4;
    var t = K.updateQueue;
    if (t === null) ((t = nn()), (K.updateQueue = t), (t.events = [l]));
    else {
      var e = t.events;
      e === null ? (t.events = [l]) : e.push(l);
    }
  }
  function nd(l) {
    var t = pl().memoizedState;
    return (
      km({ ref: t, nextImpl: l }),
      function () {
        if ((nl & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function cd(l, t) {
    return dn(4, 2, l, t);
  }
  function id(l, t) {
    return dn(4, 4, l, t);
  }
  function fd(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function () {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null)
      return (
        (l = l()),
        (t.current = l),
        function () {
          t.current = null;
        }
      );
  }
  function sd(l, t, e) {
    ((e = e != null ? e.concat([l]) : null), dn(4, 4, fd.bind(null, t, l), e));
  }
  function ai() {}
  function dd(l, t) {
    var e = pl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Jc(t, a[1]) ? a[0] : ((e.memoizedState = [l, t]), l);
  }
  function od(l, t) {
    var e = pl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Jc(t, a[1])) return a[0];
    if (((a = l()), Ze)) {
      te(!0);
      try {
        l();
      } finally {
        te(!1);
      }
    }
    return ((e.memoizedState = [a, t]), a);
  }
  function ui(l, t, e) {
    return e === void 0 || ((Vt & 1073741824) !== 0 && (P & 261930) === 0)
      ? (l.memoizedState = t)
      : ((l.memoizedState = e), (l = ro()), (K.lanes |= l), (he |= l), e);
  }
  function md(l, t, e, a) {
    return ct(e, t)
      ? e
      : ha.current !== null
        ? ((l = ui(l, e, a)), ct(l, t) || (Ml = !0), l)
        : (Vt & 42) === 0 || ((Vt & 1073741824) !== 0 && (P & 261930) === 0)
          ? ((Ml = !0), (l.memoizedState = e))
          : ((l = ro()), (K.lanes |= l), (he |= l), t);
  }
  function rd(l, t, e, a, u) {
    var n = p.p;
    p.p = n !== 0 && 8 > n ? n : 8;
    var c = E.T,
      i = {};
    ((E.T = i), ii(l, !1, t, e));
    try {
      var s = u(),
        h = E.S;
      if (
        (h !== null && h(i, s),
        s !== null && typeof s == "object" && typeof s.then == "function")
      ) {
        var b = Lm(s, a);
        au(l, t, b, mt(l));
      } else au(l, t, a, mt(l));
    } catch (z) {
      au(l, t, { then: function () {}, status: "rejected", reason: z }, mt());
    } finally {
      ((p.p = n),
        c !== null && i.types !== null && (c.types = i.types),
        (E.T = c));
    }
  }
  function $m() {}
  function ni(l, t, e, a) {
    if (l.tag !== 5) throw Error(r(476));
    var u = yd(l).queue;
    rd(
      l,
      u,
      t,
      X,
      e === null
        ? $m
        : function () {
            return (hd(l), e(a));
          },
    );
  }
  function yd(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: X,
      baseState: X,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lt,
        lastRenderedState: X,
      },
      next: null,
    };
    var e = {};
    return (
      (t.next = {
        memoizedState: e,
        baseState: e,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Lt,
          lastRenderedState: e,
        },
        next: null,
      }),
      (l.memoizedState = t),
      (l = l.alternate),
      l !== null && (l.memoizedState = t),
      t
    );
  }
  function hd(l) {
    var t = yd(l);
    (t.next === null && (t = l.alternate.memoizedState),
      au(l, t.next.queue, {}, mt()));
  }
  function ci() {
    return Xl(xu);
  }
  function vd() {
    return pl().memoizedState;
  }
  function gd() {
    return pl().memoizedState;
  }
  function Fm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = mt();
          l = se(e);
          var a = de(t, l, e);
          (a !== null && (et(a, t, e), Ia(a, t, e)),
            (t = { cache: Hc() }),
            (l.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Im(l, t, e) {
    var a = mt();
    ((e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      on(l)
        ? bd(t, e)
        : ((e = Ac(l, t, e, a)), e !== null && (et(e, l, a), xd(e, t, a))));
  }
  function Sd(l, t, e) {
    var a = mt();
    au(l, t, e, a);
  }
  function au(l, t, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (on(l)) bd(t, u);
    else {
      var n = l.alternate;
      if (
        l.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = t.lastRenderedReducer), n !== null)
      )
        try {
          var c = t.lastRenderedState,
            i = n(c, e);
          if (((u.hasEagerState = !0), (u.eagerState = i), ct(i, c)))
            return (Lu(l, t, u, 0), yl === null && Vu(), !1);
        } catch {
        } finally {
        }
      if (((e = Ac(l, t, u, a)), e !== null))
        return (et(e, l, a), xd(e, t, a), !0);
    }
    return !1;
  }
  function ii(l, t, e, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Gi(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      on(l))
    ) {
      if (t) throw Error(r(479));
    } else ((t = Ac(l, e, a, 2)), t !== null && et(t, l, 2));
  }
  function on(l) {
    var t = l.alternate;
    return l === K || (t !== null && t === K);
  }
  function bd(l, t) {
    va = an = !0;
    var e = l.pending;
    (e === null ? (t.next = t) : ((t.next = e.next), (e.next = t)),
      (l.pending = t));
  }
  function xd(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= l.pendingLanes), (e |= a), (t.lanes = e), pf(l, e));
    }
  }
  var uu = {
    readContext: Xl,
    use: cn,
    useCallback: El,
    useContext: El,
    useEffect: El,
    useImperativeHandle: El,
    useLayoutEffect: El,
    useInsertionEffect: El,
    useMemo: El,
    useReducer: El,
    useRef: El,
    useState: El,
    useDebugValue: El,
    useDeferredValue: El,
    useTransition: El,
    useSyncExternalStore: El,
    useId: El,
    useHostTransitionStatus: El,
    useFormState: El,
    useActionState: El,
    useOptimistic: El,
    useMemoCache: El,
    useCacheRefresh: El,
  };
  uu.useEffectEvent = El;
  var Ed = {
      readContext: Xl,
      use: cn,
      useCallback: function (l, t) {
        return ((wl().memoizedState = [l, t === void 0 ? null : t]), l);
      },
      useContext: Xl,
      useEffect: ud,
      useImperativeHandle: function (l, t, e) {
        ((e = e != null ? e.concat([l]) : null),
          sn(4194308, 4, fd.bind(null, t, l), e));
      },
      useLayoutEffect: function (l, t) {
        return sn(4194308, 4, l, t);
      },
      useInsertionEffect: function (l, t) {
        sn(4, 2, l, t);
      },
      useMemo: function (l, t) {
        var e = wl();
        t = t === void 0 ? null : t;
        var a = l();
        if (Ze) {
          te(!0);
          try {
            l();
          } finally {
            te(!1);
          }
        }
        return ((e.memoizedState = [a, t]), a);
      },
      useReducer: function (l, t, e) {
        var a = wl();
        if (e !== void 0) {
          var u = e(t);
          if (Ze) {
            te(!0);
            try {
              e(t);
            } finally {
              te(!1);
            }
          }
        } else u = t;
        return (
          (a.memoizedState = a.baseState = u),
          (l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: l,
            lastRenderedState: u,
          }),
          (a.queue = l),
          (l = l.dispatch = Im.bind(null, K, l)),
          [a.memoizedState, l]
        );
      },
      useRef: function (l) {
        var t = wl();
        return ((l = { current: l }), (t.memoizedState = l));
      },
      useState: function (l) {
        l = li(l);
        var t = l.queue,
          e = Sd.bind(null, K, t);
        return ((t.dispatch = e), [l.memoizedState, e]);
      },
      useDebugValue: ai,
      useDeferredValue: function (l, t) {
        var e = wl();
        return ui(e, l, t);
      },
      useTransition: function () {
        var l = li(!1);
        return (
          (l = rd.bind(null, K, l.queue, !0, !1)),
          (wl().memoizedState = l),
          [!1, l]
        );
      },
      useSyncExternalStore: function (l, t, e) {
        var a = K,
          u = wl();
        if (tl) {
          if (e === void 0) throw Error(r(407));
          e = e();
        } else {
          if (((e = t()), yl === null)) throw Error(r(349));
          (P & 127) !== 0 || Zs(a, t, e);
        }
        u.memoizedState = e;
        var n = { value: e, getSnapshot: t };
        return (
          (u.queue = n),
          ud(Ls.bind(null, a, n, l), [l]),
          (a.flags |= 2048),
          Sa(9, { destroy: void 0 }, Vs.bind(null, a, n, e, t), null),
          e
        );
      },
      useId: function () {
        var l = wl(),
          t = yl.identifierPrefix;
        if (tl) {
          var e = Dt,
            a = _t;
          ((e = (a & ~(1 << (32 - nt(a) - 1))).toString(32) + e),
            (t = "_" + t + "R_" + e),
            (e = un++),
            0 < e && (t += "H" + e.toString(32)),
            (t += "_"));
        } else ((e = Km++), (t = "_" + t + "r_" + e.toString(32) + "_"));
        return (l.memoizedState = t);
      },
      useHostTransitionStatus: ci,
      useFormState: Ps,
      useActionState: Ps,
      useOptimistic: function (l) {
        var t = wl();
        t.memoizedState = t.baseState = l;
        var e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = e),
          (t = ii.bind(null, K, !0, e)),
          (e.dispatch = t),
          [l, t]
        );
      },
      useMemoCache: Fc,
      useCacheRefresh: function () {
        return (wl().memoizedState = Fm.bind(null, K));
      },
      useEffectEvent: function (l) {
        var t = wl(),
          e = { impl: l };
        return (
          (t.memoizedState = e),
          function () {
            if ((nl & 2) !== 0) throw Error(r(440));
            return e.impl.apply(void 0, arguments);
          }
        );
      },
    },
    fi = {
      readContext: Xl,
      use: cn,
      useCallback: dd,
      useContext: Xl,
      useEffect: ei,
      useImperativeHandle: sd,
      useInsertionEffect: cd,
      useLayoutEffect: id,
      useMemo: od,
      useReducer: fn,
      useRef: ad,
      useState: function () {
        return fn(Lt);
      },
      useDebugValue: ai,
      useDeferredValue: function (l, t) {
        var e = pl();
        return md(e, dl.memoizedState, l, t);
      },
      useTransition: function () {
        var l = fn(Lt)[0],
          t = pl().memoizedState;
        return [typeof l == "boolean" ? l : eu(l), t];
      },
      useSyncExternalStore: Qs,
      useId: vd,
      useHostTransitionStatus: ci,
      useFormState: ld,
      useActionState: ld,
      useOptimistic: function (l, t) {
        var e = pl();
        return ws(e, dl, l, t);
      },
      useMemoCache: Fc,
      useCacheRefresh: gd,
    };
  fi.useEffectEvent = nd;
  var Td = {
    readContext: Xl,
    use: cn,
    useCallback: dd,
    useContext: Xl,
    useEffect: ei,
    useImperativeHandle: sd,
    useInsertionEffect: cd,
    useLayoutEffect: id,
    useMemo: od,
    useReducer: Pc,
    useRef: ad,
    useState: function () {
      return Pc(Lt);
    },
    useDebugValue: ai,
    useDeferredValue: function (l, t) {
      var e = pl();
      return dl === null ? ui(e, l, t) : md(e, dl.memoizedState, l, t);
    },
    useTransition: function () {
      var l = Pc(Lt)[0],
        t = pl().memoizedState;
      return [typeof l == "boolean" ? l : eu(l), t];
    },
    useSyncExternalStore: Qs,
    useId: vd,
    useHostTransitionStatus: ci,
    useFormState: ed,
    useActionState: ed,
    useOptimistic: function (l, t) {
      var e = pl();
      return dl !== null
        ? ws(e, dl, l, t)
        : ((e.baseState = l), [l, e.queue.dispatch]);
    },
    useMemoCache: Fc,
    useCacheRefresh: gd,
  };
  Td.useEffectEvent = nd;
  function si(l, t, e, a) {
    ((t = l.memoizedState),
      (e = e(a, t)),
      (e = e == null ? t : C({}, t, e)),
      (l.memoizedState = e),
      l.lanes === 0 && (l.updateQueue.baseState = e));
  }
  var di = {
    enqueueSetState: function (l, t, e) {
      l = l._reactInternals;
      var a = mt(),
        u = se(a);
      ((u.payload = t),
        e != null && (u.callback = e),
        (t = de(l, u, a)),
        t !== null && (et(t, l, a), Ia(t, l, a)));
    },
    enqueueReplaceState: function (l, t, e) {
      l = l._reactInternals;
      var a = mt(),
        u = se(a);
      ((u.tag = 1),
        (u.payload = t),
        e != null && (u.callback = e),
        (t = de(l, u, a)),
        t !== null && (et(t, l, a), Ia(t, l, a)));
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var e = mt(),
        a = se(e);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = de(l, a, e)),
        t !== null && (et(t, l, e), Ia(t, l, e)));
    },
  };
  function zd(l, t, e, a, u, n, c) {
    return (
      (l = l.stateNode),
      typeof l.shouldComponentUpdate == "function"
        ? l.shouldComponentUpdate(a, n, c)
        : t.prototype && t.prototype.isPureReactComponent
          ? !La(e, a) || !La(u, n)
          : !0
    );
  }
  function Ad(l, t, e, a) {
    ((l = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(e, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(e, a),
      t.state !== l && di.enqueueReplaceState(t, t.state, null));
  }
  function Ve(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t) a !== "ref" && (e[a] = t[a]);
    }
    if ((l = l.defaultProps)) {
      e === t && (e = C({}, e));
      for (var u in l) e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function pd(l) {
    Zu(l);
  }
  function Nd(l) {
    console.error(l);
  }
  function jd(l) {
    Zu(l);
  }
  function mn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Od(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function oi(l, t, e) {
    return (
      (e = se(e)),
      (e.tag = 3),
      (e.payload = { element: null }),
      (e.callback = function () {
        mn(l, t);
      }),
      e
    );
  }
  function Md(l) {
    return ((l = se(l)), (l.tag = 3), l);
  }
  function _d(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      ((l.payload = function () {
        return u(n);
      }),
        (l.callback = function () {
          Od(t, e, a);
        }));
    }
    var c = e.stateNode;
    c !== null &&
      typeof c.componentDidCatch == "function" &&
      (l.callback = function () {
        (Od(t, e, a),
          typeof u != "function" &&
            (ve === null ? (ve = new Set([this])) : ve.add(this)));
        var i = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: i !== null ? i : "",
        });
      });
  }
  function Pm(l, t, e, a, u) {
    if (
      ((e.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = e.alternate),
        t !== null && da(t, e, u, !0),
        (e = ft.current),
        e !== null)
      ) {
        switch (e.tag) {
          case 31:
          case 13:
            return (
              xt === null ? An() : e.alternate === null && Tl === 0 && (Tl = 3),
              (e.flags &= -257),
              (e.flags |= 65536),
              (e.lanes = u),
              a === Iu
                ? (e.flags |= 16384)
                : ((t = e.updateQueue),
                  t === null ? (e.updateQueue = new Set([a])) : t.add(a),
                  qi(l, a, u)),
              !1
            );
          case 22:
            return (
              (e.flags |= 65536),
              a === Iu
                ? (e.flags |= 16384)
                : ((t = e.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (e.updateQueue = t))
                    : ((e = t.retryQueue),
                      e === null ? (t.retryQueue = new Set([a])) : e.add(a)),
                  qi(l, a, u)),
              !1
            );
        }
        throw Error(r(435, e.tag));
      }
      return (qi(l, a, u), An(), !1);
    }
    if (tl)
      return (
        (t = ft.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            a !== _c && ((l = Error(r(422), { cause: a })), wa(vt(l, e))))
          : (a !== _c && ((t = Error(r(423), { cause: a })), wa(vt(t, e))),
            (l = l.current.alternate),
            (l.flags |= 65536),
            (u &= -u),
            (l.lanes |= u),
            (a = vt(a, e)),
            (u = oi(l.stateNode, a, u)),
            Qc(l, u),
            Tl !== 4 && (Tl = 2)),
        !1
      );
    var n = Error(r(520), { cause: a });
    if (
      ((n = vt(n, e)),
      mu === null ? (mu = [n]) : mu.push(n),
      Tl !== 4 && (Tl = 2),
      t === null)
    )
      return !0;
    ((a = vt(a, e)), (e = t));
    do {
      switch (e.tag) {
        case 3:
          return (
            (e.flags |= 65536),
            (l = u & -u),
            (e.lanes |= l),
            (l = oi(e.stateNode, a, l)),
            Qc(e, l),
            !1
          );
        case 1:
          if (
            ((t = e.type),
            (n = e.stateNode),
            (e.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (n !== null &&
                  typeof n.componentDidCatch == "function" &&
                  (ve === null || !ve.has(n)))))
          )
            return (
              (e.flags |= 65536),
              (u &= -u),
              (e.lanes |= u),
              (u = Md(u)),
              _d(u, l, e, a),
              Qc(e, u),
              !1
            );
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var mi = Error(r(461)),
    Ml = !1;
  function Ql(l, t, e, a) {
    t.child = l === null ? Cs(t, null, e, a) : Qe(t, l.child, e, a);
  }
  function Dd(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var i in a) i !== "ref" && (c[i] = a[i]);
    } else c = a;
    return (
      Be(t),
      (a = wc(l, t, e, c, n, u)),
      (i = Wc()),
      l !== null && !Ml
        ? (kc(l, t, u), Kt(l, t, u))
        : (tl && i && Oc(t), (t.flags |= 1), Ql(l, t, a, u), t.child)
    );
  }
  function Ud(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" &&
        !pc(n) &&
        n.defaultProps === void 0 &&
        e.compare === null
        ? ((t.tag = 15), (t.type = n), Rd(l, t, n, a, u))
        : ((l = Ju(e.type, null, a, t, t.mode, u)),
          (l.ref = t.ref),
          (l.return = t),
          (t.child = l));
    }
    if (((n = l.child), !xi(l, u))) {
      var c = n.memoizedProps;
      if (
        ((e = e.compare), (e = e !== null ? e : La), e(c, a) && l.ref === t.ref)
      )
        return Kt(l, t, u);
    }
    return (
      (t.flags |= 1),
      (l = Gt(n, a)),
      (l.ref = t.ref),
      (l.return = t),
      (t.child = l)
    );
  }
  function Rd(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (La(n, a) && l.ref === t.ref)
        if (((Ml = !1), (t.pendingProps = a = n), xi(l, u)))
          (l.flags & 131072) !== 0 && (Ml = !0);
        else return ((t.lanes = l.lanes), Kt(l, t, u));
    }
    return ri(l, t, e, a, u);
  }
  function Cd(l, t, e, a) {
    var u = a.children,
      n = l !== null ? l.memoizedState : null;
    if (
      (l === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((n = n !== null ? n.baseLanes | e : e), l !== null)) {
          for (a = t.child = l.child, u = 0; a !== null; )
            ((u = u | a.lanes | a.childLanes), (a = a.sibling));
          a = u & ~n;
        } else ((a = 0), (t.child = null));
        return Hd(l, t, n, e, a);
      }
      if ((e & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          l !== null && $u(t, n !== null ? n.cachePool : null),
          n !== null ? Bs(t, n) : Vc(),
          Ys(t));
      else
        return (
          (a = t.lanes = 536870912),
          Hd(l, t, n !== null ? n.baseLanes | e : e, e, a)
        );
    } else
      n !== null
        ? ($u(t, n.cachePool), Bs(t, n), me(), (t.memoizedState = null))
        : (l !== null && $u(t, null), Vc(), me());
    return (Ql(l, t, u, e), t.child);
  }
  function nu(l, t) {
    return (
      (l !== null && l.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function Hd(l, t, e, a, u) {
    var n = Bc();
    return (
      (n = n === null ? null : { parent: jl._currentValue, pool: n }),
      (t.memoizedState = { baseLanes: e, cachePool: n }),
      l !== null && $u(t, null),
      Vc(),
      Ys(t),
      l !== null && da(l, t, a, !0),
      (t.childLanes = u),
      null
    );
  }
  function rn(l, t) {
    return (
      (t = hn({ mode: t.mode, children: t.children }, l.mode)),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function qd(l, t, e) {
    return (
      Qe(t, l.child, null, e),
      (l = rn(t, t.pendingProps)),
      (l.flags |= 2),
      st(t),
      (t.memoizedState = null),
      l
    );
  }
  function lr(l, t, e) {
    var a = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), l === null)) {
      if (tl) {
        if (a.mode === "hidden")
          return ((l = rn(t, a)), (t.lanes = 536870912), nu(null, l));
        if (
          (Kc(t),
          (l = hl)
            ? ((l = ko(l, bt)),
              (l = l !== null && l.data === "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: ue !== null ? { id: _t, overflow: Dt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = bs(l)),
                (e.return = t),
                (t.child = e),
                (Gl = t),
                (hl = null)))
            : (l = null),
          l === null)
        )
          throw ce(t);
        return ((t.lanes = 536870912), null);
      }
      return rn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var c = n.dehydrated;
      if ((Kc(t), u))
        if (t.flags & 256) ((t.flags &= -257), (t = qd(l, t, e)));
        else if (t.memoizedState !== null)
          ((t.child = l.child), (t.flags |= 128), (t = null));
        else throw Error(r(558));
      else if (
        (Ml || da(l, t, e, !1), (u = (e & l.childLanes) !== 0), Ml || u)
      ) {
        if (
          ((a = yl),
          a !== null && ((c = Nf(a, e)), c !== 0 && c !== n.retryLane))
        )
          throw ((n.retryLane = c), Re(l, c), et(a, l, c), mi);
        (An(), (t = qd(l, t, e)));
      } else
        ((l = n.treeContext),
          (hl = Et(c.nextSibling)),
          (Gl = t),
          (tl = !0),
          (ne = null),
          (bt = !1),
          l !== null && Ts(t, l),
          (t = rn(t, a)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (l = Gt(l.child, { mode: a.mode, children: a.children })),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function yn(l, t) {
    var e = t.ref;
    if (e === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object") throw Error(r(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function ri(l, t, e, a, u) {
    return (
      Be(t),
      (e = wc(l, t, e, a, void 0, u)),
      (a = Wc()),
      l !== null && !Ml
        ? (kc(l, t, u), Kt(l, t, u))
        : (tl && a && Oc(t), (t.flags |= 1), Ql(l, t, e, u), t.child)
    );
  }
  function Bd(l, t, e, a, u, n) {
    return (
      Be(t),
      (t.updateQueue = null),
      (e = Xs(t, a, e, u)),
      Gs(l),
      (a = Wc()),
      l !== null && !Ml
        ? (kc(l, t, n), Kt(l, t, n))
        : (tl && a && Oc(t), (t.flags |= 1), Ql(l, t, e, n), t.child)
    );
  }
  function Yd(l, t, e, a, u) {
    if ((Be(t), t.stateNode === null)) {
      var n = ca,
        c = e.contextType;
      (typeof c == "object" && c !== null && (n = Xl(c)),
        (n = new e(a, n)),
        (t.memoizedState =
          n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = di),
        (t.stateNode = n),
        (n._reactInternals = t),
        (n = t.stateNode),
        (n.props = a),
        (n.state = t.memoizedState),
        (n.refs = {}),
        Gc(t),
        (c = e.contextType),
        (n.context = typeof c == "object" && c !== null ? Xl(c) : ca),
        (n.state = t.memoizedState),
        (c = e.getDerivedStateFromProps),
        typeof c == "function" && (si(t, e, c, a), (n.state = t.memoizedState)),
        typeof e.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((c = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" &&
            n.UNSAFE_componentWillMount(),
          c !== n.state && di.enqueueReplaceState(n, n.state, null),
          lu(t, a, n, u),
          Pa(),
          (n.state = t.memoizedState)),
        typeof n.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0));
    } else if (l === null) {
      n = t.stateNode;
      var i = t.memoizedProps,
        s = Ve(e, i);
      n.props = s;
      var h = n.context,
        b = e.contextType;
      ((c = ca), typeof b == "object" && b !== null && (c = Xl(b)));
      var z = e.getDerivedStateFromProps;
      ((b =
        typeof z == "function" ||
        typeof n.getSnapshotBeforeUpdate == "function"),
        (i = t.pendingProps !== i),
        b ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((i || h !== c) && Ad(t, n, a, c)),
        (fe = !1));
      var v = t.memoizedState;
      ((n.state = v),
        lu(t, a, n, u),
        Pa(),
        (h = t.memoizedState),
        i || v !== h || fe
          ? (typeof z == "function" && (si(t, e, z, a), (h = t.memoizedState)),
            (s = fe || zd(t, e, s, a, v, h, c))
              ? (b ||
                  (typeof n.UNSAFE_componentWillMount != "function" &&
                    typeof n.componentWillMount != "function") ||
                  (typeof n.componentWillMount == "function" &&
                    n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == "function" &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = h)),
            (n.props = a),
            (n.state = h),
            (n.context = c),
            (a = s))
          : (typeof n.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1)));
    } else {
      ((n = t.stateNode),
        Xc(l, t),
        (c = t.memoizedProps),
        (b = Ve(e, c)),
        (n.props = b),
        (z = t.pendingProps),
        (v = n.context),
        (h = e.contextType),
        (s = ca),
        typeof h == "object" && h !== null && (s = Xl(h)),
        (i = e.getDerivedStateFromProps),
        (h =
          typeof i == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((c !== z || v !== s) && Ad(t, n, a, s)),
        (fe = !1),
        (v = t.memoizedState),
        (n.state = v),
        lu(t, a, n, u),
        Pa());
      var g = t.memoizedState;
      c !== z ||
      v !== g ||
      fe ||
      (l !== null && l.dependencies !== null && Wu(l.dependencies))
        ? (typeof i == "function" && (si(t, e, i, a), (g = t.memoizedState)),
          (b =
            fe ||
            zd(t, e, b, a, v, g, s) ||
            (l !== null && l.dependencies !== null && Wu(l.dependencies)))
            ? (h ||
                (typeof n.UNSAFE_componentWillUpdate != "function" &&
                  typeof n.componentWillUpdate != "function") ||
                (typeof n.componentWillUpdate == "function" &&
                  n.componentWillUpdate(a, g, s),
                typeof n.UNSAFE_componentWillUpdate == "function" &&
                  n.UNSAFE_componentWillUpdate(a, g, s)),
              typeof n.componentDidUpdate == "function" && (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof n.componentDidUpdate != "function" ||
                (c === l.memoizedProps && v === l.memoizedState) ||
                (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != "function" ||
                (c === l.memoizedProps && v === l.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = g)),
          (n.props = a),
          (n.state = g),
          (n.context = s),
          (a = b))
        : (typeof n.componentDidUpdate != "function" ||
            (c === l.memoizedProps && v === l.memoizedState) ||
            (t.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != "function" ||
            (c === l.memoizedProps && v === l.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (n = a),
      yn(l, t),
      (a = (t.flags & 128) !== 0),
      n || a
        ? ((n = t.stateNode),
          (e =
            a && typeof e.getDerivedStateFromError != "function"
              ? null
              : n.render()),
          (t.flags |= 1),
          l !== null && a
            ? ((t.child = Qe(t, l.child, null, u)),
              (t.child = Qe(t, null, e, u)))
            : Ql(l, t, e, u),
          (t.memoizedState = n.state),
          (l = t.child))
        : (l = Kt(l, t, u)),
      l
    );
  }
  function Gd(l, t, e, a) {
    return (He(), (t.flags |= 256), Ql(l, t, e, a), t.child);
  }
  var yi = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function hi(l) {
    return { baseLanes: l, cachePool: Os() };
  }
  function vi(l, t, e) {
    return ((l = l !== null ? l.childLanes & ~e : 0), t && (l |= ot), l);
  }
  function Xd(l, t, e) {
    var a = t.pendingProps,
      u = !1,
      n = (t.flags & 128) !== 0,
      c;
    if (
      ((c = n) ||
        (c =
          l !== null && l.memoizedState === null ? !1 : (Al.current & 2) !== 0),
      c && ((u = !0), (t.flags &= -129)),
      (c = (t.flags & 32) !== 0),
      (t.flags &= -33),
      l === null)
    ) {
      if (tl) {
        if (
          (u ? oe(t) : me(),
          (l = hl)
            ? ((l = ko(l, bt)),
              (l = l !== null && l.data !== "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: ue !== null ? { id: _t, overflow: Dt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = bs(l)),
                (e.return = t),
                (t.child = e),
                (Gl = t),
                (hl = null)))
            : (l = null),
          l === null)
        )
          throw ce(t);
        return (Ii(l) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var i = a.children;
      return (
        (a = a.fallback),
        u
          ? (me(),
            (u = t.mode),
            (i = hn({ mode: "hidden", children: i }, u)),
            (a = Ce(a, u, e, null)),
            (i.return = t),
            (a.return = t),
            (i.sibling = a),
            (t.child = i),
            (a = t.child),
            (a.memoizedState = hi(e)),
            (a.childLanes = vi(l, c, e)),
            (t.memoizedState = yi),
            nu(null, a))
          : (oe(t), gi(t, i))
      );
    }
    var s = l.memoizedState;
    if (s !== null && ((i = s.dehydrated), i !== null)) {
      if (n)
        t.flags & 256
          ? (oe(t), (t.flags &= -257), (t = Si(l, t, e)))
          : t.memoizedState !== null
            ? (me(), (t.child = l.child), (t.flags |= 128), (t = null))
            : (me(),
              (i = a.fallback),
              (u = t.mode),
              (a = hn({ mode: "visible", children: a.children }, u)),
              (i = Ce(i, u, e, null)),
              (i.flags |= 2),
              (a.return = t),
              (i.return = t),
              (a.sibling = i),
              (t.child = a),
              Qe(t, l.child, null, e),
              (a = t.child),
              (a.memoizedState = hi(e)),
              (a.childLanes = vi(l, c, e)),
              (t.memoizedState = yi),
              (t = nu(null, a)));
      else if ((oe(t), Ii(i))) {
        if (((c = i.nextSibling && i.nextSibling.dataset), c)) var h = c.dgst;
        ((c = h),
          (a = Error(r(419))),
          (a.stack = ""),
          (a.digest = c),
          wa({ value: a, source: null, stack: null }),
          (t = Si(l, t, e)));
      } else if (
        (Ml || da(l, t, e, !1), (c = (e & l.childLanes) !== 0), Ml || c)
      ) {
        if (
          ((c = yl),
          c !== null && ((a = Nf(c, e)), a !== 0 && a !== s.retryLane))
        )
          throw ((s.retryLane = a), Re(l, a), et(c, l, a), mi);
        (Fi(i) || An(), (t = Si(l, t, e)));
      } else
        Fi(i)
          ? ((t.flags |= 192), (t.child = l.child), (t = null))
          : ((l = s.treeContext),
            (hl = Et(i.nextSibling)),
            (Gl = t),
            (tl = !0),
            (ne = null),
            (bt = !1),
            l !== null && Ts(t, l),
            (t = gi(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (me(),
        (i = a.fallback),
        (u = t.mode),
        (s = l.child),
        (h = s.sibling),
        (a = Gt(s, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = s.subtreeFlags & 65011712),
        h !== null ? (i = Gt(h, i)) : ((i = Ce(i, u, e, null)), (i.flags |= 2)),
        (i.return = t),
        (a.return = t),
        (a.sibling = i),
        (t.child = a),
        nu(null, a),
        (a = t.child),
        (i = l.child.memoizedState),
        i === null
          ? (i = hi(e))
          : ((u = i.cachePool),
            u !== null
              ? ((s = jl._currentValue),
                (u = u.parent !== s ? { parent: s, pool: s } : u))
              : (u = Os()),
            (i = { baseLanes: i.baseLanes | e, cachePool: u })),
        (a.memoizedState = i),
        (a.childLanes = vi(l, c, e)),
        (t.memoizedState = yi),
        nu(l.child, a))
      : (oe(t),
        (e = l.child),
        (l = e.sibling),
        (e = Gt(e, { mode: "visible", children: a.children })),
        (e.return = t),
        (e.sibling = null),
        l !== null &&
          ((c = t.deletions),
          c === null ? ((t.deletions = [l]), (t.flags |= 16)) : c.push(l)),
        (t.child = e),
        (t.memoizedState = null),
        e);
  }
  function gi(l, t) {
    return (
      (t = hn({ mode: "visible", children: t }, l.mode)),
      (t.return = l),
      (l.child = t)
    );
  }
  function hn(l, t) {
    return ((l = it(22, l, null, t)), (l.lanes = 0), l);
  }
  function Si(l, t, e) {
    return (
      Qe(t, l.child, null, e),
      (l = gi(t, t.pendingProps.children)),
      (l.flags |= 2),
      (t.memoizedState = null),
      l
    );
  }
  function Qd(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    (a !== null && (a.lanes |= t), Rc(l.return, t, e));
  }
  function bi(l, t, e, a, u, n) {
    var c = l.memoizedState;
    c === null
      ? (l.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: e,
          tailMode: u,
          treeForkCount: n,
        })
      : ((c.isBackwards = t),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = a),
        (c.tail = e),
        (c.tailMode = u),
        (c.treeForkCount = n));
  }
  function Zd(l, t, e) {
    var a = t.pendingProps,
      u = a.revealOrder,
      n = a.tail;
    a = a.children;
    var c = Al.current,
      i = (c & 2) !== 0;
    if (
      (i ? ((c = (c & 1) | 2), (t.flags |= 128)) : (c &= 1),
      N(Al, c),
      Ql(l, t, a, e),
      (a = tl ? Ja : 0),
      !i && l !== null && (l.flags & 128) !== 0)
    )
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13) l.memoizedState !== null && Qd(l, e, t);
        else if (l.tag === 19) Qd(l, e, t);
        else if (l.child !== null) {
          ((l.child.return = l), (l = l.child));
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) break l;
          l = l.return;
        }
        ((l.sibling.return = l.return), (l = l.sibling));
      }
    switch (u) {
      case "forwards":
        for (e = t.child, u = null; e !== null; )
          ((l = e.alternate),
            l !== null && en(l) === null && (u = e),
            (e = e.sibling));
        ((e = u),
          e === null
            ? ((u = t.child), (t.child = null))
            : ((u = e.sibling), (e.sibling = null)),
          bi(t, !1, u, e, n, a));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = t.child, t.child = null; u !== null; ) {
          if (((l = u.alternate), l !== null && en(l) === null)) {
            t.child = u;
            break;
          }
          ((l = u.sibling), (u.sibling = e), (e = u), (u = l));
        }
        bi(t, !0, e, null, n, a);
        break;
      case "together":
        bi(t, !1, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Kt(l, t, e) {
    if (
      (l !== null && (t.dependencies = l.dependencies),
      (he |= t.lanes),
      (e & t.childLanes) === 0)
    )
      if (l !== null) {
        if ((da(l, t, e, !1), (e & t.childLanes) === 0)) return null;
      } else return null;
    if (l !== null && t.child !== l.child) throw Error(r(153));
    if (t.child !== null) {
      for (
        l = t.child, e = Gt(l, l.pendingProps), t.child = e, e.return = t;
        l.sibling !== null;
      )
        ((l = l.sibling),
          (e = e.sibling = Gt(l, l.pendingProps)),
          (e.return = t));
      e.sibling = null;
    }
    return t.child;
  }
  function xi(l, t) {
    return (l.lanes & t) !== 0
      ? !0
      : ((l = l.dependencies), !!(l !== null && Wu(l)));
  }
  function tr(l, t, e) {
    switch (t.tag) {
      case 3:
        (Jl(t, t.stateNode.containerInfo),
          ie(t, jl, l.memoizedState.cache),
          He());
        break;
      case 27:
      case 5:
        Da(t);
        break;
      case 4:
        Jl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ie(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Kc(t), null);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (oe(t), (t.flags |= 128), null)
            : (e & t.child.childLanes) !== 0
              ? Xd(l, t, e)
              : (oe(t), (l = Kt(l, t, e)), l !== null ? l.sibling : null);
        oe(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (
          ((a = (e & t.childLanes) !== 0),
          a || (da(l, t, e, !1), (a = (e & t.childLanes) !== 0)),
          u)
        ) {
          if (a) return Zd(l, t, e);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          N(Al, Al.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Cd(l, t, e, t.pendingProps));
      case 24:
        ie(t, jl, l.memoizedState.cache);
    }
    return Kt(l, t, e);
  }
  function Vd(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps) Ml = !0;
      else {
        if (!xi(l, e) && (t.flags & 128) === 0) return ((Ml = !1), tr(l, t, e));
        Ml = (l.flags & 131072) !== 0;
      }
    else ((Ml = !1), tl && (t.flags & 1048576) !== 0 && Es(t, Ja, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (((l = Ge(t.elementType)), (t.type = l), typeof l == "function"))
            pc(l)
              ? ((a = Ve(l, a)), (t.tag = 1), (t = Yd(null, t, l, a, e)))
              : ((t.tag = 0), (t = ri(null, t, l, a, e)));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === ql) {
                ((t.tag = 11), (t = Dd(null, t, l, a, e)));
                break l;
              } else if (u === q) {
                ((t.tag = 14), (t = Ud(null, t, l, a, e)));
                break l;
              }
            }
            throw ((t = Ht(l) || l), Error(r(306, t, "")));
          }
        }
        return t;
      case 0:
        return ri(l, t, t.type, t.pendingProps, e);
      case 1:
        return ((a = t.type), (u = Ve(a, t.pendingProps)), Yd(l, t, a, u, e));
      case 3:
        l: {
          if ((Jl(t, t.stateNode.containerInfo), l === null))
            throw Error(r(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          ((u = n.element), Xc(l, t), lu(t, a, null, e));
          var c = t.memoizedState;
          if (
            ((a = c.cache),
            ie(t, jl, a),
            a !== n.cache && Cc(t, [jl], e, !0),
            Pa(),
            (a = c.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: a, isDehydrated: !1, cache: c.cache }),
              (t.updateQueue.baseState = n),
              (t.memoizedState = n),
              t.flags & 256)
            ) {
              t = Gd(l, t, a, e);
              break l;
            } else if (a !== u) {
              ((u = vt(Error(r(424)), t)), wa(u), (t = Gd(l, t, a, e)));
              break l;
            } else {
              switch (((l = t.stateNode.containerInfo), l.nodeType)) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (
                hl = Et(l.firstChild),
                  Gl = t,
                  tl = !0,
                  ne = null,
                  bt = !0,
                  e = Cs(t, null, a, e),
                  t.child = e;
                e;
              )
                ((e.flags = (e.flags & -3) | 4096), (e = e.sibling));
            }
          else {
            if ((He(), a === u)) {
              t = Kt(l, t, e);
              break l;
            }
            Ql(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          yn(l, t),
          l === null
            ? (e = t0(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = e)
              : tl ||
                ((e = t.type),
                (l = t.pendingProps),
                (a = Dn(W.current).createElement(e)),
                (a[Yl] = t),
                (a[$l] = l),
                Zl(a, e, l),
                Cl(a),
                (t.stateNode = a))
            : (t.memoizedState = t0(
                t.type,
                l.memoizedProps,
                t.pendingProps,
                l.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Da(t),
          l === null &&
            tl &&
            ((a = t.stateNode = Io(t.type, t.pendingProps, W.current)),
            (Gl = t),
            (bt = !0),
            (u = hl),
            xe(t.type) ? ((Pi = u), (hl = Et(a.firstChild))) : (hl = u)),
          Ql(l, t, t.pendingProps.children, e),
          yn(l, t),
          l === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          l === null &&
            tl &&
            ((u = a = hl) &&
              ((a = Dr(a, t.type, t.pendingProps, bt)),
              a !== null
                ? ((t.stateNode = a),
                  (Gl = t),
                  (hl = Et(a.firstChild)),
                  (bt = !1),
                  (u = !0))
                : (u = !1)),
            u || ce(t)),
          Da(t),
          (u = t.type),
          (n = t.pendingProps),
          (c = l !== null ? l.memoizedProps : null),
          (a = n.children),
          Wi(u, n) ? (a = null) : c !== null && Wi(u, c) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = wc(l, t, Jm, null, null, e)), (xu._currentValue = u)),
          yn(l, t),
          Ql(l, t, a, e),
          t.child
        );
      case 6:
        return (
          l === null &&
            tl &&
            ((l = e = hl) &&
              ((e = Ur(e, t.pendingProps, bt)),
              e !== null
                ? ((t.stateNode = e), (Gl = t), (hl = null), (l = !0))
                : (l = !1)),
            l || ce(t)),
          null
        );
      case 13:
        return Xd(l, t, e);
      case 4:
        return (
          Jl(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          l === null ? (t.child = Qe(t, null, a, e)) : Ql(l, t, a, e),
          t.child
        );
      case 11:
        return Dd(l, t, t.type, t.pendingProps, e);
      case 7:
        return (Ql(l, t, t.pendingProps, e), t.child);
      case 8:
        return (Ql(l, t, t.pendingProps.children, e), t.child);
      case 12:
        return (Ql(l, t, t.pendingProps.children, e), t.child);
      case 10:
        return (
          (a = t.pendingProps),
          ie(t, t.type, a.value),
          Ql(l, t, a.children, e),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (a = t.pendingProps.children),
          Be(t),
          (u = Xl(u)),
          (a = a(u)),
          (t.flags |= 1),
          Ql(l, t, a, e),
          t.child
        );
      case 14:
        return Ud(l, t, t.type, t.pendingProps, e);
      case 15:
        return Rd(l, t, t.type, t.pendingProps, e);
      case 19:
        return Zd(l, t, e);
      case 31:
        return lr(l, t, e);
      case 22:
        return Cd(l, t, e, t.pendingProps);
      case 24:
        return (
          Be(t),
          (a = Xl(jl)),
          l === null
            ? ((u = Bc()),
              u === null &&
                ((u = yl),
                (n = Hc()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= e),
                (u = n)),
              (t.memoizedState = { parent: a, cache: u }),
              Gc(t),
              ie(t, jl, u))
            : ((l.lanes & e) !== 0 && (Xc(l, t), lu(t, null, null, e), Pa()),
              (u = l.memoizedState),
              (n = t.memoizedState),
              u.parent !== a
                ? ((u = { parent: a, cache: a }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  ie(t, jl, a))
                : ((a = n.cache),
                  ie(t, jl, a),
                  a !== u.cache && Cc(t, [jl], e, !0))),
          Ql(l, t, t.pendingProps.children, e),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Jt(l) {
    l.flags |= 4;
  }
  function Ei(l, t, e, a, u) {
    if (((t = (l.mode & 32) !== 0) && (t = !1), t)) {
      if (((l.flags |= 16777216), (u & 335544128) === u))
        if (l.stateNode.complete) l.flags |= 8192;
        else if (go()) l.flags |= 8192;
        else throw ((Xe = Iu), Yc);
    } else l.flags &= -16777217;
  }
  function Ld(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (((l.flags |= 16777216), !c0(t)))
      if (go()) l.flags |= 8192;
      else throw ((Xe = Iu), Yc);
  }
  function vn(l, t) {
    (t !== null && (l.flags |= 4),
      l.flags & 16384 &&
        ((t = l.tag !== 22 ? zf() : 536870912), (l.lanes |= t), (Ta |= t)));
  }
  function cu(l, t) {
    if (!tl)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var e = null; t !== null; )
            (t.alternate !== null && (e = t), (t = t.sibling));
          e === null ? (l.tail = null) : (e.sibling = null);
          break;
        case "collapsed":
          e = l.tail;
          for (var a = null; e !== null; )
            (e.alternate !== null && (a = e), (e = e.sibling));
          a === null
            ? t || l.tail === null
              ? (l.tail = null)
              : (l.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function vl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child,
      e = 0,
      a = 0;
    if (t)
      for (var u = l.child; u !== null; )
        ((e |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags & 65011712),
          (a |= u.flags & 65011712),
          (u.return = l),
          (u = u.sibling));
    else
      for (u = l.child; u !== null; )
        ((e |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags),
          (a |= u.flags),
          (u.return = l),
          (u = u.sibling));
    return ((l.subtreeFlags |= a), (l.childLanes = e), t);
  }
  function er(l, t, e) {
    var a = t.pendingProps;
    switch ((Mc(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (vl(t), null);
      case 1:
        return (vl(t), null);
      case 3:
        return (
          (e = t.stateNode),
          (a = null),
          l !== null && (a = l.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Zt(jl),
          zl(),
          e.pendingContext &&
            ((e.context = e.pendingContext), (e.pendingContext = null)),
          (l === null || l.child === null) &&
            (sa(t)
              ? Jt(t)
              : l === null ||
                (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Dc())),
          vl(t),
          null
        );
      case 26:
        var u = t.type,
          n = t.memoizedState;
        return (
          l === null
            ? (Jt(t),
              n !== null ? (vl(t), Ld(t, n)) : (vl(t), Ei(t, u, null, a, e)))
            : n
              ? n !== l.memoizedState
                ? (Jt(t), vl(t), Ld(t, n))
                : (vl(t), (t.flags &= -16777217))
              : ((l = l.memoizedProps),
                l !== a && Jt(t),
                vl(t),
                Ei(t, u, l, a, e)),
          null
        );
      case 27:
        if (
          (Nu(t),
          (e = W.current),
          (u = t.type),
          l !== null && t.stateNode != null)
        )
          l.memoizedProps !== a && Jt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return (vl(t), null);
          }
          ((l = _.current),
            sa(t) ? zs(t) : ((l = Io(u, a, e)), (t.stateNode = l), Jt(t)));
        }
        return (vl(t), null);
      case 5:
        if ((Nu(t), (u = t.type), l !== null && t.stateNode != null))
          l.memoizedProps !== a && Jt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return (vl(t), null);
          }
          if (((n = _.current), sa(t))) zs(t);
          else {
            var c = Dn(W.current);
            switch (n) {
              case 1:
                n = c.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                n = c.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    n = c.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    n = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u,
                    );
                    break;
                  case "script":
                    ((n = c.createElement("div")),
                      (n.innerHTML = "<script><\/script>"),
                      (n = n.removeChild(n.firstChild)));
                    break;
                  case "select":
                    ((n =
                      typeof a.is == "string"
                        ? c.createElement("select", { is: a.is })
                        : c.createElement("select")),
                      a.multiple
                        ? (n.multiple = !0)
                        : a.size && (n.size = a.size));
                    break;
                  default:
                    n =
                      typeof a.is == "string"
                        ? c.createElement(u, { is: a.is })
                        : c.createElement(u);
                }
            }
            ((n[Yl] = t), (n[$l] = a));
            l: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6) n.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                ((c.child.return = c), (c = c.child));
                continue;
              }
              if (c === t) break l;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t) break l;
                c = c.return;
              }
              ((c.sibling.return = c.return), (c = c.sibling));
            }
            t.stateNode = n;
            l: switch ((Zl(n, u, a), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && Jt(t);
          }
        }
        return (
          vl(t),
          Ei(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, e),
          null
        );
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Jt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(r(166));
          if (((l = W.current), sa(t))) {
            if (
              ((l = t.stateNode),
              (e = t.memoizedProps),
              (a = null),
              (u = Gl),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            ((l[Yl] = t),
              (l = !!(
                l.nodeValue === e ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                Qo(l.nodeValue, e)
              )),
              l || ce(t, !0));
          } else
            ((l = Dn(l).createTextNode(a)), (l[Yl] = t), (t.stateNode = l));
        }
        return (vl(t), null);
      case 31:
        if (((e = t.memoizedState), l === null || l.memoizedState !== null)) {
          if (((a = sa(t)), e !== null)) {
            if (l === null) {
              if (!a) throw Error(r(318));
              if (
                ((l = t.memoizedState),
                (l = l !== null ? l.dehydrated : null),
                !l)
              )
                throw Error(r(557));
              l[Yl] = t;
            } else
              (He(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (vl(t), (l = !1));
          } else
            ((e = Dc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = e),
              (l = !0));
          if (!l) return t.flags & 256 ? (st(t), t) : (st(t), null);
          if ((t.flags & 128) !== 0) throw Error(r(558));
        }
        return (vl(t), null);
      case 13:
        if (
          ((a = t.memoizedState),
          l === null ||
            (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
        ) {
          if (((u = sa(t)), a !== null && a.dehydrated !== null)) {
            if (l === null) {
              if (!u) throw Error(r(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(r(317));
              u[Yl] = t;
            } else
              (He(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (vl(t), (u = !1));
          } else
            ((u = Dc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return t.flags & 256 ? (st(t), t) : (st(t), null);
        }
        return (
          st(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = e), t)
            : ((e = a !== null),
              (l = l !== null && l.memoizedState !== null),
              e &&
                ((a = t.child),
                (u = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (u = a.alternate.memoizedState.cachePool.pool),
                (n = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (n = a.memoizedState.cachePool.pool),
                n !== u && (a.flags |= 2048)),
              e !== l && e && (t.child.flags |= 8192),
              vn(t, t.updateQueue),
              vl(t),
              null)
        );
      case 4:
        return (zl(), l === null && Vi(t.stateNode.containerInfo), vl(t), null);
      case 10:
        return (Zt(t.type), vl(t), null);
      case 19:
        if ((A(Al), (a = t.memoizedState), a === null)) return (vl(t), null);
        if (((u = (t.flags & 128) !== 0), (n = a.rendering), n === null))
          if (u) cu(a, !1);
          else {
            if (Tl !== 0 || (l !== null && (l.flags & 128) !== 0))
              for (l = t.child; l !== null; ) {
                if (((n = en(l)), n !== null)) {
                  for (
                    t.flags |= 128,
                      cu(a, !1),
                      l = n.updateQueue,
                      t.updateQueue = l,
                      vn(t, l),
                      t.subtreeFlags = 0,
                      l = e,
                      e = t.child;
                    e !== null;
                  )
                    (Ss(e, l), (e = e.sibling));
                  return (
                    N(Al, (Al.current & 1) | 2),
                    tl && Xt(t, a.treeForkCount),
                    t.child
                  );
                }
                l = l.sibling;
              }
            a.tail !== null &&
              at() > En &&
              ((t.flags |= 128), (u = !0), cu(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!u)
            if (((l = en(n)), l !== null)) {
              if (
                ((t.flags |= 128),
                (u = !0),
                (l = l.updateQueue),
                (t.updateQueue = l),
                vn(t, l),
                cu(a, !0),
                a.tail === null &&
                  a.tailMode === "hidden" &&
                  !n.alternate &&
                  !tl)
              )
                return (vl(t), null);
            } else
              2 * at() - a.renderingStartTime > En &&
                e !== 536870912 &&
                ((t.flags |= 128), (u = !0), cu(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((n.sibling = t.child), (t.child = n))
            : ((l = a.last),
              l !== null ? (l.sibling = n) : (t.child = n),
              (a.last = n));
        }
        return a.tail !== null
          ? ((l = a.tail),
            (a.rendering = l),
            (a.tail = l.sibling),
            (a.renderingStartTime = at()),
            (l.sibling = null),
            (e = Al.current),
            N(Al, u ? (e & 1) | 2 : e & 1),
            tl && Xt(t, a.treeForkCount),
            l)
          : (vl(t), null);
      case 22:
      case 23:
        return (
          st(t),
          Lc(),
          (a = t.memoizedState !== null),
          l !== null
            ? (l.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (e & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (vl(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : vl(t),
          (e = t.updateQueue),
          e !== null && vn(t, e.retryQueue),
          (e = null),
          l !== null &&
            l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (e = l.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== e && (t.flags |= 2048),
          l !== null && A(Ye),
          null
        );
      case 24:
        return (
          (e = null),
          l !== null && (e = l.memoizedState.cache),
          t.memoizedState.cache !== e && (t.flags |= 2048),
          Zt(jl),
          vl(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function ar(l, t) {
    switch ((Mc(t), t.tag)) {
      case 1:
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 3:
        return (
          Zt(jl),
          zl(),
          (l = t.flags),
          (l & 65536) !== 0 && (l & 128) === 0
            ? ((t.flags = (l & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (Nu(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((st(t), t.alternate === null)) throw Error(r(340));
          He();
        }
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 13:
        if (
          (st(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340));
          He();
        }
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 19:
        return (A(Al), null);
      case 4:
        return (zl(), null);
      case 10:
        return (Zt(t.type), null);
      case 22:
      case 23:
        return (
          st(t),
          Lc(),
          l !== null && A(Ye),
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 24:
        return (Zt(jl), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Kd(l, t) {
    switch ((Mc(t), t.tag)) {
      case 3:
        (Zt(jl), zl());
        break;
      case 26:
      case 27:
      case 5:
        Nu(t);
        break;
      case 4:
        zl();
        break;
      case 31:
        t.memoizedState !== null && st(t);
        break;
      case 13:
        st(t);
        break;
      case 19:
        A(Al);
        break;
      case 10:
        Zt(t.type);
        break;
      case 22:
      case 23:
        (st(t), Lc(), l !== null && A(Ye));
        break;
      case 24:
        Zt(jl);
    }
  }
  function iu(l, t) {
    try {
      var e = t.updateQueue,
        a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var n = e.create,
              c = e.inst;
            ((a = n()), (c.destroy = a));
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (i) {
      fl(t, t.return, i);
    }
  }
  function re(l, t, e) {
    try {
      var a = t.updateQueue,
        u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var c = a.inst,
              i = c.destroy;
            if (i !== void 0) {
              ((c.destroy = void 0), (u = t));
              var s = e,
                h = i;
              try {
                h();
              } catch (b) {
                fl(u, s, b);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (b) {
      fl(t, t.return, b);
    }
  }
  function Jd(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        qs(t, e);
      } catch (a) {
        fl(l, l.return, a);
      }
    }
  }
  function wd(l, t, e) {
    ((e.props = Ve(l.type, l.memoizedProps)), (e.state = l.memoizedState));
    try {
      e.componentWillUnmount();
    } catch (a) {
      fl(l, t, a);
    }
  }
  function fu(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? (l.refCleanup = e(a)) : (e.current = a);
      }
    } catch (u) {
      fl(l, t, u);
    }
  }
  function Ut(l, t) {
    var e = l.ref,
      a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          fl(l, t, u);
        } finally {
          ((l.refCleanup = null),
            (l = l.alternate),
            l != null && (l.refCleanup = null));
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          fl(l, t, u);
        }
      else e.current = null;
  }
  function Wd(l) {
    var t = l.type,
      e = l.memoizedProps,
      a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? (a.src = e.src) : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      fl(l, l.return, u);
    }
  }
  function Ti(l, t, e) {
    try {
      var a = l.stateNode;
      (pr(a, l.type, e, t), (a[$l] = t));
    } catch (u) {
      fl(l, l.return, u);
    }
  }
  function kd(l) {
    return (
      l.tag === 5 ||
      l.tag === 3 ||
      l.tag === 26 ||
      (l.tag === 27 && xe(l.type)) ||
      l.tag === 4
    );
  }
  function zi(l) {
    l: for (;;) {
      for (; l.sibling === null; ) {
        if (l.return === null || kd(l.return)) return null;
        l = l.return;
      }
      for (
        l.sibling.return = l.return, l = l.sibling;
        l.tag !== 5 && l.tag !== 6 && l.tag !== 18;
      ) {
        if (
          (l.tag === 27 && xe(l.type)) ||
          l.flags & 2 ||
          l.child === null ||
          l.tag === 4
        )
          continue l;
        ((l.child.return = l), (l = l.child));
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Ai(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      ((l = l.stateNode),
        t
          ? (e.nodeType === 9
              ? e.body
              : e.nodeName === "HTML"
                ? e.ownerDocument.body
                : e
            ).insertBefore(l, t)
          : ((t =
              e.nodeType === 9
                ? e.body
                : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e),
            t.appendChild(l),
            (e = e._reactRootContainer),
            e != null || t.onclick !== null || (t.onclick = Bt)));
    else if (
      a !== 4 &&
      (a === 27 && xe(l.type) && ((e = l.stateNode), (t = null)),
      (l = l.child),
      l !== null)
    )
      for (Ai(l, t, e), l = l.sibling; l !== null; )
        (Ai(l, t, e), (l = l.sibling));
  }
  function gn(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      ((l = l.stateNode), t ? e.insertBefore(l, t) : e.appendChild(l));
    else if (
      a !== 4 &&
      (a === 27 && xe(l.type) && (e = l.stateNode), (l = l.child), l !== null)
    )
      for (gn(l, t, e), l = l.sibling; l !== null; )
        (gn(l, t, e), (l = l.sibling));
  }
  function $d(l) {
    var t = l.stateNode,
      e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      (Zl(t, a, e), (t[Yl] = l), (t[$l] = e));
    } catch (n) {
      fl(l, l.return, n);
    }
  }
  var wt = !1,
    _l = !1,
    pi = !1,
    Fd = typeof WeakSet == "function" ? WeakSet : Set,
    Hl = null;
  function ur(l, t) {
    if (((l = l.containerInfo), (Ji = Yn), (l = ss(l)), Sc(l))) {
      if ("selectionStart" in l)
        var e = { start: l.selectionStart, end: l.selectionEnd };
      else
        l: {
          e = ((e = l.ownerDocument) && e.defaultView) || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var u = a.anchorOffset,
              n = a.focusNode;
            a = a.focusOffset;
            try {
              (e.nodeType, n.nodeType);
            } catch {
              e = null;
              break l;
            }
            var c = 0,
              i = -1,
              s = -1,
              h = 0,
              b = 0,
              z = l,
              v = null;
            t: for (;;) {
              for (
                var g;
                z !== e || (u !== 0 && z.nodeType !== 3) || (i = c + u),
                  z !== n || (a !== 0 && z.nodeType !== 3) || (s = c + a),
                  z.nodeType === 3 && (c += z.nodeValue.length),
                  (g = z.firstChild) !== null;
              )
                ((v = z), (z = g));
              for (;;) {
                if (z === l) break t;
                if (
                  (v === e && ++h === u && (i = c),
                  v === n && ++b === a && (s = c),
                  (g = z.nextSibling) !== null)
                )
                  break;
                ((z = v), (v = z.parentNode));
              }
              z = g;
            }
            e = i === -1 || s === -1 ? null : { start: i, end: s };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (
      wi = { focusedElem: l, selectionRange: e }, Yn = !1, Hl = t;
      Hl !== null;
    )
      if (
        ((t = Hl), (l = t.child), (t.subtreeFlags & 1028) !== 0 && l !== null)
      )
        ((l.return = t), (Hl = l));
      else
        for (; Hl !== null; ) {
          switch (((t = Hl), (n = t.alternate), (l = t.flags), t.tag)) {
            case 0:
              if (
                (l & 4) !== 0 &&
                ((l = t.updateQueue),
                (l = l !== null ? l.events : null),
                l !== null)
              )
                for (e = 0; e < l.length; e++)
                  ((u = l[e]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                ((l = void 0),
                  (e = t),
                  (u = n.memoizedProps),
                  (n = n.memoizedState),
                  (a = e.stateNode));
                try {
                  var M = Ve(e.type, u);
                  ((l = a.getSnapshotBeforeUpdate(M, n)),
                    (a.__reactInternalSnapshotBeforeUpdate = l));
                } catch (G) {
                  fl(e, e.return, G);
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (
                  ((l = t.stateNode.containerInfo), (e = l.nodeType), e === 9)
                )
                  $i(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      $i(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(r(163));
          }
          if (((l = t.sibling), l !== null)) {
            ((l.return = t.return), (Hl = l));
            break;
          }
          Hl = t.return;
        }
  }
  function Id(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (kt(l, e), a & 4 && iu(5, e));
        break;
      case 1:
        if ((kt(l, e), a & 4))
          if (((l = e.stateNode), t === null))
            try {
              l.componentDidMount();
            } catch (c) {
              fl(e, e.return, c);
            }
          else {
            var u = Ve(e.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              fl(e, e.return, c);
            }
          }
        (a & 64 && Jd(e), a & 512 && fu(e, e.return));
        break;
      case 3:
        if ((kt(l, e), a & 64 && ((l = e.updateQueue), l !== null))) {
          if (((t = null), e.child !== null))
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            qs(l, t);
          } catch (c) {
            fl(e, e.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && $d(e);
      case 26:
      case 5:
        (kt(l, e), t === null && a & 4 && Wd(e), a & 512 && fu(e, e.return));
        break;
      case 12:
        kt(l, e);
        break;
      case 31:
        (kt(l, e), a & 4 && to(l, e));
        break;
      case 13:
        (kt(l, e),
          a & 4 && eo(l, e),
          a & 64 &&
            ((l = e.memoizedState),
            l !== null &&
              ((l = l.dehydrated),
              l !== null && ((e = rr.bind(null, e)), Rr(l, e)))));
        break;
      case 22:
        if (((a = e.memoizedState !== null || wt), !a)) {
          ((t = (t !== null && t.memoizedState !== null) || _l), (u = wt));
          var n = _l;
          ((wt = a),
            (_l = t) && !n ? $t(l, e, (e.subtreeFlags & 8772) !== 0) : kt(l, e),
            (wt = u),
            (_l = n));
        }
        break;
      case 30:
        break;
      default:
        kt(l, e);
    }
  }
  function Pd(l) {
    var t = l.alternate;
    (t !== null && ((l.alternate = null), Pd(t)),
      (l.child = null),
      (l.deletions = null),
      (l.sibling = null),
      l.tag === 5 && ((t = l.stateNode), t !== null && tc(t)),
      (l.stateNode = null),
      (l.return = null),
      (l.dependencies = null),
      (l.memoizedProps = null),
      (l.memoizedState = null),
      (l.pendingProps = null),
      (l.stateNode = null),
      (l.updateQueue = null));
  }
  var bl = null,
    Il = !1;
  function Wt(l, t, e) {
    for (e = e.child; e !== null; ) (lo(l, t, e), (e = e.sibling));
  }
  function lo(l, t, e) {
    if (ut && typeof ut.onCommitFiberUnmount == "function")
      try {
        ut.onCommitFiberUnmount(Ua, e);
      } catch {}
    switch (e.tag) {
      case 26:
        (_l || Ut(e, t),
          Wt(l, t, e),
          e.memoizedState
            ? e.memoizedState.count--
            : e.stateNode && ((e = e.stateNode), e.parentNode.removeChild(e)));
        break;
      case 27:
        _l || Ut(e, t);
        var a = bl,
          u = Il;
        (xe(e.type) && ((bl = e.stateNode), (Il = !1)),
          Wt(l, t, e),
          gu(e.stateNode),
          (bl = a),
          (Il = u));
        break;
      case 5:
        _l || Ut(e, t);
      case 6:
        if (
          ((a = bl),
          (u = Il),
          (bl = null),
          Wt(l, t, e),
          (bl = a),
          (Il = u),
          bl !== null)
        )
          if (Il)
            try {
              (bl.nodeType === 9
                ? bl.body
                : bl.nodeName === "HTML"
                  ? bl.ownerDocument.body
                  : bl
              ).removeChild(e.stateNode);
            } catch (n) {
              fl(e, t, n);
            }
          else
            try {
              bl.removeChild(e.stateNode);
            } catch (n) {
              fl(e, t, n);
            }
        break;
      case 18:
        bl !== null &&
          (Il
            ? ((l = bl),
              wo(
                l.nodeType === 9
                  ? l.body
                  : l.nodeName === "HTML"
                    ? l.ownerDocument.body
                    : l,
                e.stateNode,
              ),
              _a(l))
            : wo(bl, e.stateNode));
        break;
      case 4:
        ((a = bl),
          (u = Il),
          (bl = e.stateNode.containerInfo),
          (Il = !0),
          Wt(l, t, e),
          (bl = a),
          (Il = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (re(2, e, t), _l || re(4, e, t), Wt(l, t, e));
        break;
      case 1:
        (_l ||
          (Ut(e, t),
          (a = e.stateNode),
          typeof a.componentWillUnmount == "function" && wd(e, t, a)),
          Wt(l, t, e));
        break;
      case 21:
        Wt(l, t, e);
        break;
      case 22:
        ((_l = (a = _l) || e.memoizedState !== null), Wt(l, t, e), (_l = a));
        break;
      default:
        Wt(l, t, e);
    }
  }
  function to(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null))
    ) {
      l = l.dehydrated;
      try {
        _a(l);
      } catch (e) {
        fl(t, t.return, e);
      }
    }
  }
  function eo(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate),
      l !== null &&
        ((l = l.memoizedState), l !== null && ((l = l.dehydrated), l !== null)))
    )
      try {
        _a(l);
      } catch (e) {
        fl(t, t.return, e);
      }
  }
  function nr(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return (t === null && (t = l.stateNode = new Fd()), t);
      case 22:
        return (
          (l = l.stateNode),
          (t = l._retryCache),
          t === null && (t = l._retryCache = new Fd()),
          t
        );
      default:
        throw Error(r(435, l.tag));
    }
  }
  function Sn(l, t) {
    var e = nr(l);
    t.forEach(function (a) {
      if (!e.has(a)) {
        e.add(a);
        var u = yr.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function Pl(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a],
          n = l,
          c = t,
          i = c;
        l: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (xe(i.type)) {
                ((bl = i.stateNode), (Il = !1));
                break l;
              }
              break;
            case 5:
              ((bl = i.stateNode), (Il = !1));
              break l;
            case 3:
            case 4:
              ((bl = i.stateNode.containerInfo), (Il = !0));
              break l;
          }
          i = i.return;
        }
        if (bl === null) throw Error(r(160));
        (lo(n, c, u),
          (bl = null),
          (Il = !1),
          (n = u.alternate),
          n !== null && (n.return = null),
          (u.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) (ao(t, l), (t = t.sibling));
  }
  var pt = null;
  function ao(l, t) {
    var e = l.alternate,
      a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Pl(t, l),
          lt(l),
          a & 4 && (re(3, l, l.return), iu(3, l), re(5, l, l.return)));
        break;
      case 1:
        (Pl(t, l),
          lt(l),
          a & 512 && (_l || e === null || Ut(e, e.return)),
          a & 64 &&
            wt &&
            ((l = l.updateQueue),
            l !== null &&
              ((a = l.callbacks),
              a !== null &&
                ((e = l.shared.hiddenCallbacks),
                (l.shared.hiddenCallbacks = e === null ? a : e.concat(a))))));
        break;
      case 26:
        var u = pt;
        if (
          (Pl(t, l),
          lt(l),
          a & 512 && (_l || e === null || Ut(e, e.return)),
          a & 4)
        ) {
          var n = e !== null ? e.memoizedState : null;
          if (((a = l.memoizedState), e === null))
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  ((a = l.type),
                    (e = l.memoizedProps),
                    (u = u.ownerDocument || u));
                  t: switch (a) {
                    case "title":
                      ((n = u.getElementsByTagName("title")[0]),
                        (!n ||
                          n[Ha] ||
                          n[Yl] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = u.createElement(a)),
                          u.head.insertBefore(
                            n,
                            u.querySelector("head > title"),
                          )),
                        Zl(n, a, e),
                        (n[Yl] = l),
                        Cl(n),
                        (a = n));
                      break l;
                    case "link":
                      var c = u0("link", "href", u).get(a + (e.href || ""));
                      if (c) {
                        for (var i = 0; i < c.length; i++)
                          if (
                            ((n = c[i]),
                            n.getAttribute("href") ===
                              (e.href == null || e.href === ""
                                ? null
                                : e.href) &&
                              n.getAttribute("rel") ===
                                (e.rel == null ? null : e.rel) &&
                              n.getAttribute("title") ===
                                (e.title == null ? null : e.title) &&
                              n.getAttribute("crossorigin") ===
                                (e.crossOrigin == null ? null : e.crossOrigin))
                          ) {
                            c.splice(i, 1);
                            break t;
                          }
                      }
                      ((n = u.createElement(a)),
                        Zl(n, a, e),
                        u.head.appendChild(n));
                      break;
                    case "meta":
                      if (
                        (c = u0("meta", "content", u).get(
                          a + (e.content || ""),
                        ))
                      ) {
                        for (i = 0; i < c.length; i++)
                          if (
                            ((n = c[i]),
                            n.getAttribute("content") ===
                              (e.content == null ? null : "" + e.content) &&
                              n.getAttribute("name") ===
                                (e.name == null ? null : e.name) &&
                              n.getAttribute("property") ===
                                (e.property == null ? null : e.property) &&
                              n.getAttribute("http-equiv") ===
                                (e.httpEquiv == null ? null : e.httpEquiv) &&
                              n.getAttribute("charset") ===
                                (e.charSet == null ? null : e.charSet))
                          ) {
                            c.splice(i, 1);
                            break t;
                          }
                      }
                      ((n = u.createElement(a)),
                        Zl(n, a, e),
                        u.head.appendChild(n));
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  ((n[Yl] = l), Cl(n), (a = n));
                }
                l.stateNode = a;
              } else n0(u, l.type, l.stateNode);
            else l.stateNode = a0(u, a, l.memoizedProps);
          else
            n !== a
              ? (n === null
                  ? e.stateNode !== null &&
                    ((e = e.stateNode), e.parentNode.removeChild(e))
                  : n.count--,
                a === null
                  ? n0(u, l.type, l.stateNode)
                  : a0(u, a, l.memoizedProps))
              : a === null &&
                l.stateNode !== null &&
                Ti(l, l.memoizedProps, e.memoizedProps);
        }
        break;
      case 27:
        (Pl(t, l),
          lt(l),
          a & 512 && (_l || e === null || Ut(e, e.return)),
          e !== null && a & 4 && Ti(l, l.memoizedProps, e.memoizedProps));
        break;
      case 5:
        if (
          (Pl(t, l),
          lt(l),
          a & 512 && (_l || e === null || Ut(e, e.return)),
          l.flags & 32)
        ) {
          u = l.stateNode;
          try {
            Pe(u, "");
          } catch (M) {
            fl(l, l.return, M);
          }
        }
        (a & 4 &&
          l.stateNode != null &&
          ((u = l.memoizedProps), Ti(l, u, e !== null ? e.memoizedProps : u)),
          a & 1024 && (pi = !0));
        break;
      case 6:
        if ((Pl(t, l), lt(l), a & 4)) {
          if (l.stateNode === null) throw Error(r(162));
          ((a = l.memoizedProps), (e = l.stateNode));
          try {
            e.nodeValue = a;
          } catch (M) {
            fl(l, l.return, M);
          }
        }
        break;
      case 3:
        if (
          ((Cn = null),
          (u = pt),
          (pt = Un(t.containerInfo)),
          Pl(t, l),
          (pt = u),
          lt(l),
          a & 4 && e !== null && e.memoizedState.isDehydrated)
        )
          try {
            _a(t.containerInfo);
          } catch (M) {
            fl(l, l.return, M);
          }
        pi && ((pi = !1), uo(l));
        break;
      case 4:
        ((a = pt),
          (pt = Un(l.stateNode.containerInfo)),
          Pl(t, l),
          lt(l),
          (pt = a));
        break;
      case 12:
        (Pl(t, l), lt(l));
        break;
      case 31:
        (Pl(t, l),
          lt(l),
          a & 4 &&
            ((a = l.updateQueue),
            a !== null && ((l.updateQueue = null), Sn(l, a))));
        break;
      case 13:
        (Pl(t, l),
          lt(l),
          l.child.flags & 8192 &&
            (l.memoizedState !== null) !=
              (e !== null && e.memoizedState !== null) &&
            (xn = at()),
          a & 4 &&
            ((a = l.updateQueue),
            a !== null && ((l.updateQueue = null), Sn(l, a))));
        break;
      case 22:
        u = l.memoizedState !== null;
        var s = e !== null && e.memoizedState !== null,
          h = wt,
          b = _l;
        if (
          ((wt = h || u),
          (_l = b || s),
          Pl(t, l),
          (_l = b),
          (wt = h),
          lt(l),
          a & 8192)
        )
          l: for (
            t = l.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (e === null || s || wt || _l || Le(l)),
              e = null,
              t = l;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                s = e = t;
                try {
                  if (((n = s.stateNode), u))
                    ((c = n.style),
                      typeof c.setProperty == "function"
                        ? c.setProperty("display", "none", "important")
                        : (c.display = "none"));
                  else {
                    i = s.stateNode;
                    var z = s.memoizedProps.style,
                      v =
                        z != null && z.hasOwnProperty("display")
                          ? z.display
                          : null;
                    i.style.display =
                      v == null || typeof v == "boolean" ? "" : ("" + v).trim();
                  }
                } catch (M) {
                  fl(s, s.return, M);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                s = t;
                try {
                  s.stateNode.nodeValue = u ? "" : s.memoizedProps;
                } catch (M) {
                  fl(s, s.return, M);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                s = t;
                try {
                  var g = s.stateNode;
                  u ? Wo(g, !0) : Wo(s.stateNode, !1);
                } catch (M) {
                  fl(s, s.return, M);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === l) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              (e === t && (e = null), (t = t.return));
            }
            (e === t && (e = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        a & 4 &&
          ((a = l.updateQueue),
          a !== null &&
            ((e = a.retryQueue),
            e !== null && ((a.retryQueue = null), Sn(l, e))));
        break;
      case 19:
        (Pl(t, l),
          lt(l),
          a & 4 &&
            ((a = l.updateQueue),
            a !== null && ((l.updateQueue = null), Sn(l, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Pl(t, l), lt(l));
    }
  }
  function lt(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (kd(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(r(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode,
              n = zi(l);
            gn(l, n, u);
            break;
          case 5:
            var c = e.stateNode;
            e.flags & 32 && (Pe(c, ""), (e.flags &= -33));
            var i = zi(l);
            gn(l, i, c);
            break;
          case 3:
          case 4:
            var s = e.stateNode.containerInfo,
              h = zi(l);
            Ai(l, h, s);
            break;
          default:
            throw Error(r(161));
        }
      } catch (b) {
        fl(l, l.return, b);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function uo(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        (uo(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (l = l.sibling));
      }
  }
  function kt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Id(l, t.alternate, t), (t = t.sibling));
  }
  function Le(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (re(4, t, t.return), Le(t));
          break;
        case 1:
          Ut(t, t.return);
          var e = t.stateNode;
          (typeof e.componentWillUnmount == "function" && wd(t, t.return, e),
            Le(t));
          break;
        case 27:
          gu(t.stateNode);
        case 26:
        case 5:
          (Ut(t, t.return), Le(t));
          break;
        case 22:
          t.memoizedState === null && Le(t);
          break;
        case 30:
          Le(t);
          break;
        default:
          Le(t);
      }
      l = l.sibling;
    }
  }
  function $t(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        u = l,
        n = t,
        c = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ($t(u, n, e), iu(4, n));
          break;
        case 1:
          if (
            ($t(u, n, e),
            (a = n),
            (u = a.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (h) {
              fl(a, a.return, h);
            }
          if (((a = n), (u = a.updateQueue), u !== null)) {
            var i = a.stateNode;
            try {
              var s = u.shared.hiddenCallbacks;
              if (s !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < s.length; u++)
                  Hs(s[u], i);
            } catch (h) {
              fl(a, a.return, h);
            }
          }
          (e && c & 64 && Jd(n), fu(n, n.return));
          break;
        case 27:
          $d(n);
        case 26:
        case 5:
          ($t(u, n, e), e && a === null && c & 4 && Wd(n), fu(n, n.return));
          break;
        case 12:
          $t(u, n, e);
          break;
        case 31:
          ($t(u, n, e), e && c & 4 && to(u, n));
          break;
        case 13:
          ($t(u, n, e), e && c & 4 && eo(u, n));
          break;
        case 22:
          (n.memoizedState === null && $t(u, n, e), fu(n, n.return));
          break;
        case 30:
          break;
        default:
          $t(u, n, e);
      }
      t = t.sibling;
    }
  }
  function Ni(l, t) {
    var e = null;
    (l !== null &&
      l.memoizedState !== null &&
      l.memoizedState.cachePool !== null &&
      (e = l.memoizedState.cachePool.pool),
      (l = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (l = t.memoizedState.cachePool.pool),
      l !== e && (l != null && l.refCount++, e != null && Wa(e)));
  }
  function ji(l, t) {
    ((l = null),
      t.alternate !== null && (l = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== l && (t.refCount++, l != null && Wa(l)));
  }
  function Nt(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (no(l, t, e, a), (t = t.sibling));
  }
  function no(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Nt(l, t, e, a), u & 2048 && iu(9, t));
        break;
      case 1:
        Nt(l, t, e, a);
        break;
      case 3:
        (Nt(l, t, e, a),
          u & 2048 &&
            ((l = null),
            t.alternate !== null && (l = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== l && (t.refCount++, l != null && Wa(l))));
        break;
      case 12:
        if (u & 2048) {
          (Nt(l, t, e, a), (l = t.stateNode));
          try {
            var n = t.memoizedProps,
              c = n.id,
              i = n.onPostCommit;
            typeof i == "function" &&
              i(
                c,
                t.alternate === null ? "mount" : "update",
                l.passiveEffectDuration,
                -0,
              );
          } catch (s) {
            fl(t, t.return, s);
          }
        } else Nt(l, t, e, a);
        break;
      case 31:
        Nt(l, t, e, a);
        break;
      case 13:
        Nt(l, t, e, a);
        break;
      case 23:
        break;
      case 22:
        ((n = t.stateNode),
          (c = t.alternate),
          t.memoizedState !== null
            ? n._visibility & 2
              ? Nt(l, t, e, a)
              : su(l, t)
            : n._visibility & 2
              ? Nt(l, t, e, a)
              : ((n._visibility |= 2),
                ba(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Ni(c, t));
        break;
      case 24:
        (Nt(l, t, e, a), u & 2048 && ji(t.alternate, t));
        break;
      default:
        Nt(l, t, e, a);
    }
  }
  function ba(l, t, e, a, u) {
    for (
      u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;
    ) {
      var n = l,
        c = t,
        i = e,
        s = a,
        h = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (ba(n, c, i, s, u), iu(8, c));
          break;
        case 23:
          break;
        case 22:
          var b = c.stateNode;
          (c.memoizedState !== null
            ? b._visibility & 2
              ? ba(n, c, i, s, u)
              : su(n, c)
            : ((b._visibility |= 2), ba(n, c, i, s, u)),
            u && h & 2048 && Ni(c.alternate, c));
          break;
        case 24:
          (ba(n, c, i, s, u), u && h & 2048 && ji(c.alternate, c));
          break;
        default:
          ba(n, c, i, s, u);
      }
      t = t.sibling;
    }
  }
  function su(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l,
          a = t,
          u = a.flags;
        switch (a.tag) {
          case 22:
            (su(e, a), u & 2048 && Ni(a.alternate, a));
            break;
          case 24:
            (su(e, a), u & 2048 && ji(a.alternate, a));
            break;
          default:
            su(e, a);
        }
        t = t.sibling;
      }
  }
  var du = 8192;
  function xa(l, t, e) {
    if (l.subtreeFlags & du)
      for (l = l.child; l !== null; ) (co(l, t, e), (l = l.sibling));
  }
  function co(l, t, e) {
    switch (l.tag) {
      case 26:
        (xa(l, t, e),
          l.flags & du &&
            l.memoizedState !== null &&
            Kr(e, pt, l.memoizedState, l.memoizedProps));
        break;
      case 5:
        xa(l, t, e);
        break;
      case 3:
      case 4:
        var a = pt;
        ((pt = Un(l.stateNode.containerInfo)), xa(l, t, e), (pt = a));
        break;
      case 22:
        l.memoizedState === null &&
          ((a = l.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = du), (du = 16777216), xa(l, t, e), (du = a))
            : xa(l, t, e));
        break;
      default:
        xa(l, t, e);
    }
  }
  function io(l) {
    var t = l.alternate;
    if (t !== null && ((l = t.child), l !== null)) {
      t.child = null;
      do ((t = l.sibling), (l.sibling = null), (l = t));
      while (l !== null);
    }
  }
  function ou(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          ((Hl = a), so(a, l));
        }
      io(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) (fo(l), (l = l.sibling));
  }
  function fo(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (ou(l), l.flags & 2048 && re(9, l, l.return));
        break;
      case 3:
        ou(l);
        break;
      case 12:
        ou(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null &&
        t._visibility & 2 &&
        (l.return === null || l.return.tag !== 13)
          ? ((t._visibility &= -3), bn(l))
          : ou(l);
        break;
      default:
        ou(l);
    }
  }
  function bn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          ((Hl = a), so(a, l));
        }
      io(l);
    }
    for (l = l.child; l !== null; ) {
      switch (((t = l), t.tag)) {
        case 0:
        case 11:
        case 15:
          (re(8, t, t.return), bn(t));
          break;
        case 22:
          ((e = t.stateNode),
            e._visibility & 2 && ((e._visibility &= -3), bn(t)));
          break;
        default:
          bn(t);
      }
      l = l.sibling;
    }
  }
  function so(l, t) {
    for (; Hl !== null; ) {
      var e = Hl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          re(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Wa(e.memoizedState.cache);
      }
      if (((a = e.child), a !== null)) ((a.return = e), (Hl = a));
      else
        l: for (e = l; Hl !== null; ) {
          a = Hl;
          var u = a.sibling,
            n = a.return;
          if ((Pd(a), a === e)) {
            Hl = null;
            break l;
          }
          if (u !== null) {
            ((u.return = n), (Hl = u));
            break l;
          }
          Hl = n;
        }
    }
  }
  var cr = {
      getCacheForType: function (l) {
        var t = Xl(jl),
          e = t.data.get(l);
        return (e === void 0 && ((e = l()), t.data.set(l, e)), e);
      },
      cacheSignal: function () {
        return Xl(jl).controller.signal;
      },
    },
    ir = typeof WeakMap == "function" ? WeakMap : Map,
    nl = 0,
    yl = null,
    k = null,
    P = 0,
    il = 0,
    dt = null,
    ye = !1,
    Ea = !1,
    Oi = !1,
    Ft = 0,
    Tl = 0,
    he = 0,
    Ke = 0,
    Mi = 0,
    ot = 0,
    Ta = 0,
    mu = null,
    tt = null,
    _i = !1,
    xn = 0,
    oo = 0,
    En = 1 / 0,
    Tn = null,
    ve = null,
    Dl = 0,
    ge = null,
    za = null,
    It = 0,
    Di = 0,
    Ui = null,
    mo = null,
    ru = 0,
    Ri = null;
  function mt() {
    return (nl & 2) !== 0 && P !== 0 ? P & -P : E.T !== null ? Gi() : jf();
  }
  function ro() {
    if (ot === 0)
      if ((P & 536870912) === 0 || tl) {
        var l = Mu;
        ((Mu <<= 1), (Mu & 3932160) === 0 && (Mu = 262144), (ot = l));
      } else ot = 536870912;
    return ((l = ft.current), l !== null && (l.flags |= 32), ot);
  }
  function et(l, t, e) {
    (((l === yl && (il === 2 || il === 9)) || l.cancelPendingCommit !== null) &&
      (Aa(l, 0), Se(l, P, ot, !1)),
      Ca(l, e),
      ((nl & 2) === 0 || l !== yl) &&
        (l === yl &&
          ((nl & 2) === 0 && (Ke |= e), Tl === 4 && Se(l, P, ot, !1)),
        Rt(l)));
  }
  function yo(l, t, e) {
    if ((nl & 6) !== 0) throw Error(r(327));
    var a = (!e && (t & 127) === 0 && (t & l.expiredLanes) === 0) || Ra(l, t),
      u = a ? dr(l, t) : Hi(l, t, !0),
      n = a;
    do {
      if (u === 0) {
        Ea && !a && Se(l, t, 0, !1);
        break;
      } else {
        if (((e = l.current.alternate), n && !fr(e))) {
          ((u = Hi(l, t, !1)), (n = !1));
          continue;
        }
        if (u === 2) {
          if (((n = t), l.errorRecoveryDisabledLanes & n)) var c = 0;
          else
            ((c = l.pendingLanes & -536870913),
              (c = c !== 0 ? c : c & 536870912 ? 536870912 : 0));
          if (c !== 0) {
            t = c;
            l: {
              var i = l;
              u = mu;
              var s = i.current.memoizedState.isDehydrated;
              if ((s && (Aa(i, c).flags |= 256), (c = Hi(i, c, !1)), c !== 2)) {
                if (Oi && !s) {
                  ((i.errorRecoveryDisabledLanes |= n), (Ke |= n), (u = 4));
                  break l;
                }
                ((n = tt),
                  (tt = u),
                  n !== null &&
                    (tt === null ? (tt = n) : tt.push.apply(tt, n)));
              }
              u = c;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (Aa(l, 0), Se(l, t, 0, !0));
          break;
        }
        l: {
          switch (((a = l), (n = u), n)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Se(a, t, ot, !ye);
              break l;
            case 2:
              tt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((u = xn + 300 - at()), 10 < u)) {
            if ((Se(a, t, ot, !ye), Du(a, 0, !0) !== 0)) break l;
            ((It = t),
              (a.timeoutHandle = Ko(
                ho.bind(
                  null,
                  a,
                  e,
                  tt,
                  Tn,
                  _i,
                  t,
                  ot,
                  Ke,
                  Ta,
                  ye,
                  n,
                  "Throttled",
                  -0,
                  0,
                ),
                u,
              )));
            break l;
          }
          ho(a, e, tt, Tn, _i, t, ot, Ke, Ta, ye, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Rt(l);
  }
  function ho(l, t, e, a, u, n, c, i, s, h, b, z, v, g) {
    if (
      ((l.timeoutHandle = -1),
      (z = t.subtreeFlags),
      z & 8192 || (z & 16785408) === 16785408)
    ) {
      ((z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Bt,
      }),
        co(t, n, z));
      var M =
        (n & 62914560) === n ? xn - at() : (n & 4194048) === n ? oo - at() : 0;
      if (((M = Jr(z, M)), M !== null)) {
        ((It = n),
          (l.cancelPendingCommit = M(
            zo.bind(null, l, t, n, e, a, u, c, i, s, b, z, null, v, g),
          )),
          Se(l, n, c, !h));
        return;
      }
    }
    zo(l, t, n, e, a, u, c, i, s);
  }
  function fr(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if (
        (e === 0 || e === 11 || e === 15) &&
        t.flags & 16384 &&
        ((e = t.updateQueue), e !== null && ((e = e.stores), e !== null))
      )
        for (var a = 0; a < e.length; a++) {
          var u = e[a],
            n = u.getSnapshot;
          u = u.value;
          try {
            if (!ct(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((e = t.child), t.subtreeFlags & 16384 && e !== null))
        ((e.return = t), (t = e));
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Se(l, t, e, a) {
    ((t &= ~Mi),
      (t &= ~Ke),
      (l.suspendedLanes |= t),
      (l.pingedLanes &= ~t),
      a && (l.warmLanes |= t),
      (a = l.expirationTimes));
    for (var u = t; 0 < u; ) {
      var n = 31 - nt(u),
        c = 1 << n;
      ((a[n] = -1), (u &= ~c));
    }
    e !== 0 && Af(l, e, t);
  }
  function zn() {
    return (nl & 6) === 0 ? (yu(0), !1) : !0;
  }
  function Ci() {
    if (k !== null) {
      if (il === 0) var l = k.return;
      else ((l = k), (Qt = qe = null), $c(l), (ya = null), ($a = 0), (l = k));
      for (; l !== null; ) (Kd(l.alternate, l), (l = l.return));
      k = null;
    }
  }
  function Aa(l, t) {
    var e = l.timeoutHandle;
    (e !== -1 && ((l.timeoutHandle = -1), Or(e)),
      (e = l.cancelPendingCommit),
      e !== null && ((l.cancelPendingCommit = null), e()),
      (It = 0),
      Ci(),
      (yl = l),
      (k = e = Gt(l.current, null)),
      (P = t),
      (il = 0),
      (dt = null),
      (ye = !1),
      (Ea = Ra(l, t)),
      (Oi = !1),
      (Ta = ot = Mi = Ke = he = Tl = 0),
      (tt = mu = null),
      (_i = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - nt(a),
          n = 1 << u;
        ((t |= l[u]), (a &= ~n));
      }
    return ((Ft = t), Vu(), e);
  }
  function vo(l, t) {
    ((K = null),
      (E.H = uu),
      t === ra || t === Fu
        ? ((t = Ds()), (il = 3))
        : t === Yc
          ? ((t = Ds()), (il = 4))
          : (il =
              t === mi
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (dt = t),
      k === null && ((Tl = 1), mn(l, vt(t, l.current))));
  }
  function go() {
    var l = ft.current;
    return l === null
      ? !0
      : (P & 4194048) === P
        ? xt === null
        : (P & 62914560) === P || (P & 536870912) !== 0
          ? l === xt
          : !1;
  }
  function So() {
    var l = E.H;
    return ((E.H = uu), l === null ? uu : l);
  }
  function bo() {
    var l = E.A;
    return ((E.A = cr), l);
  }
  function An() {
    ((Tl = 4),
      ye || ((P & 4194048) !== P && ft.current !== null) || (Ea = !0),
      ((he & 134217727) === 0 && (Ke & 134217727) === 0) ||
        yl === null ||
        Se(yl, P, ot, !1));
  }
  function Hi(l, t, e) {
    var a = nl;
    nl |= 2;
    var u = So(),
      n = bo();
    ((yl !== l || P !== t) && ((Tn = null), Aa(l, t)), (t = !1));
    var c = Tl;
    l: do
      try {
        if (il !== 0 && k !== null) {
          var i = k,
            s = dt;
          switch (il) {
            case 8:
              (Ci(), (c = 6));
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              ft.current === null && (t = !0);
              var h = il;
              if (((il = 0), (dt = null), pa(l, i, s, h), e && Ea)) {
                c = 0;
                break l;
              }
              break;
            default:
              ((h = il), (il = 0), (dt = null), pa(l, i, s, h));
          }
        }
        (sr(), (c = Tl));
        break;
      } catch (b) {
        vo(l, b);
      }
    while (!0);
    return (
      t && l.shellSuspendCounter++,
      (Qt = qe = null),
      (nl = a),
      (E.H = u),
      (E.A = n),
      k === null && ((yl = null), (P = 0), Vu()),
      c
    );
  }
  function sr() {
    for (; k !== null; ) xo(k);
  }
  function dr(l, t) {
    var e = nl;
    nl |= 2;
    var a = So(),
      u = bo();
    yl !== l || P !== t
      ? ((Tn = null), (En = at() + 500), Aa(l, t))
      : (Ea = Ra(l, t));
    l: do
      try {
        if (il !== 0 && k !== null) {
          t = k;
          var n = dt;
          t: switch (il) {
            case 1:
              ((il = 0), (dt = null), pa(l, t, n, 1));
              break;
            case 2:
            case 9:
              if (Ms(n)) {
                ((il = 0), (dt = null), Eo(t));
                break;
              }
              ((t = function () {
                ((il !== 2 && il !== 9) || yl !== l || (il = 7), Rt(l));
              }),
                n.then(t, t));
              break l;
            case 3:
              il = 7;
              break l;
            case 4:
              il = 5;
              break l;
            case 7:
              Ms(n)
                ? ((il = 0), (dt = null), Eo(t))
                : ((il = 0), (dt = null), pa(l, t, n, 7));
              break;
            case 5:
              var c = null;
              switch (k.tag) {
                case 26:
                  c = k.memoizedState;
                case 5:
                case 27:
                  var i = k;
                  if (c ? c0(c) : i.stateNode.complete) {
                    ((il = 0), (dt = null));
                    var s = i.sibling;
                    if (s !== null) k = s;
                    else {
                      var h = i.return;
                      h !== null ? ((k = h), pn(h)) : (k = null);
                    }
                    break t;
                  }
              }
              ((il = 0), (dt = null), pa(l, t, n, 5));
              break;
            case 6:
              ((il = 0), (dt = null), pa(l, t, n, 6));
              break;
            case 8:
              (Ci(), (Tl = 6));
              break l;
            default:
              throw Error(r(462));
          }
        }
        or();
        break;
      } catch (b) {
        vo(l, b);
      }
    while (!0);
    return (
      (Qt = qe = null),
      (E.H = a),
      (E.A = u),
      (nl = e),
      k !== null ? 0 : ((yl = null), (P = 0), Vu(), Tl)
    );
  }
  function or() {
    for (; k !== null && !C0(); ) xo(k);
  }
  function xo(l) {
    var t = Vd(l.alternate, l, Ft);
    ((l.memoizedProps = l.pendingProps), t === null ? pn(l) : (k = t));
  }
  function Eo(l) {
    var t = l,
      e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Bd(e, t, t.pendingProps, t.type, void 0, P);
        break;
      case 11:
        t = Bd(e, t, t.pendingProps, t.type.render, t.ref, P);
        break;
      case 5:
        $c(t);
      default:
        (Kd(e, t), (t = k = Ss(t, Ft)), (t = Vd(e, t, Ft)));
    }
    ((l.memoizedProps = l.pendingProps), t === null ? pn(l) : (k = t));
  }
  function pa(l, t, e, a) {
    ((Qt = qe = null), $c(t), (ya = null), ($a = 0));
    var u = t.return;
    try {
      if (Pm(l, u, t, e, P)) {
        ((Tl = 1), mn(l, vt(e, l.current)), (k = null));
        return;
      }
    } catch (n) {
      if (u !== null) throw ((k = u), n);
      ((Tl = 1), mn(l, vt(e, l.current)), (k = null));
      return;
    }
    t.flags & 32768
      ? (tl || a === 1
          ? (l = !0)
          : Ea || (P & 536870912) !== 0
            ? (l = !1)
            : ((ye = l = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = ft.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        To(t, l))
      : pn(t);
  }
  function pn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        To(t, ye);
        return;
      }
      l = t.return;
      var e = er(t.alternate, t, Ft);
      if (e !== null) {
        k = e;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        k = t;
        return;
      }
      k = t = l;
    } while (t !== null);
    Tl === 0 && (Tl = 5);
  }
  function To(l, t) {
    do {
      var e = ar(l.alternate, l);
      if (e !== null) {
        ((e.flags &= 32767), (k = e));
        return;
      }
      if (
        ((e = l.return),
        e !== null &&
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)),
        !t && ((l = l.sibling), l !== null))
      ) {
        k = l;
        return;
      }
      k = l = e;
    } while (l !== null);
    ((Tl = 6), (k = null));
  }
  function zo(l, t, e, a, u, n, c, i, s) {
    l.cancelPendingCommit = null;
    do Nn();
    while (Dl !== 0);
    if ((nl & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === l.current) throw Error(r(177));
      if (
        ((n = t.lanes | t.childLanes),
        (n |= zc),
        L0(l, e, n, c, i, s),
        l === yl && ((k = yl = null), (P = 0)),
        (za = t),
        (ge = l),
        (It = e),
        (Di = n),
        (Ui = u),
        (mo = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((l.callbackNode = null),
            (l.callbackPriority = 0),
            hr(ju, function () {
              return (Oo(), null);
            }))
          : ((l.callbackNode = null), (l.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = E.T), (E.T = null), (u = p.p), (p.p = 2), (c = nl), (nl |= 4));
        try {
          ur(l, t, e);
        } finally {
          ((nl = c), (p.p = u), (E.T = a));
        }
      }
      ((Dl = 1), Ao(), po(), No());
    }
  }
  function Ao() {
    if (Dl === 1) {
      Dl = 0;
      var l = ge,
        t = za,
        e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        ((e = E.T), (E.T = null));
        var a = p.p;
        p.p = 2;
        var u = nl;
        nl |= 4;
        try {
          ao(t, l);
          var n = wi,
            c = ss(l.containerInfo),
            i = n.focusedElem,
            s = n.selectionRange;
          if (
            c !== i &&
            i &&
            i.ownerDocument &&
            fs(i.ownerDocument.documentElement, i)
          ) {
            if (s !== null && Sc(i)) {
              var h = s.start,
                b = s.end;
              if ((b === void 0 && (b = h), "selectionStart" in i))
                ((i.selectionStart = h),
                  (i.selectionEnd = Math.min(b, i.value.length)));
              else {
                var z = i.ownerDocument || document,
                  v = (z && z.defaultView) || window;
                if (v.getSelection) {
                  var g = v.getSelection(),
                    M = i.textContent.length,
                    G = Math.min(s.start, M),
                    ml = s.end === void 0 ? G : Math.min(s.end, M);
                  !g.extend && G > ml && ((c = ml), (ml = G), (G = c));
                  var m = is(i, G),
                    d = is(i, ml);
                  if (
                    m &&
                    d &&
                    (g.rangeCount !== 1 ||
                      g.anchorNode !== m.node ||
                      g.anchorOffset !== m.offset ||
                      g.focusNode !== d.node ||
                      g.focusOffset !== d.offset)
                  ) {
                    var y = z.createRange();
                    (y.setStart(m.node, m.offset),
                      g.removeAllRanges(),
                      G > ml
                        ? (g.addRange(y), g.extend(d.node, d.offset))
                        : (y.setEnd(d.node, d.offset), g.addRange(y)));
                  }
                }
              }
            }
            for (z = [], g = i; (g = g.parentNode); )
              g.nodeType === 1 &&
                z.push({ element: g, left: g.scrollLeft, top: g.scrollTop });
            for (
              typeof i.focus == "function" && i.focus(), i = 0;
              i < z.length;
              i++
            ) {
              var T = z[i];
              ((T.element.scrollLeft = T.left), (T.element.scrollTop = T.top));
            }
          }
          ((Yn = !!Ji), (wi = Ji = null));
        } finally {
          ((nl = u), (p.p = a), (E.T = e));
        }
      }
      ((l.current = t), (Dl = 2));
    }
  }
  function po() {
    if (Dl === 2) {
      Dl = 0;
      var l = ge,
        t = za,
        e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        ((e = E.T), (E.T = null));
        var a = p.p;
        p.p = 2;
        var u = nl;
        nl |= 4;
        try {
          Id(l, t.alternate, t);
        } finally {
          ((nl = u), (p.p = a), (E.T = e));
        }
      }
      Dl = 3;
    }
  }
  function No() {
    if (Dl === 4 || Dl === 3) {
      ((Dl = 0), H0());
      var l = ge,
        t = za,
        e = It,
        a = mo;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Dl = 5)
        : ((Dl = 0), (za = ge = null), jo(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (
        (u === 0 && (ve = null),
        Pn(e),
        (t = t.stateNode),
        ut && typeof ut.onCommitFiberRoot == "function")
      )
        try {
          ut.onCommitFiberRoot(Ua, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((t = E.T), (u = p.p), (p.p = 2), (E.T = null));
        try {
          for (var n = l.onRecoverableError, c = 0; c < a.length; c++) {
            var i = a[c];
            n(i.value, { componentStack: i.stack });
          }
        } finally {
          ((E.T = t), (p.p = u));
        }
      }
      ((It & 3) !== 0 && Nn(),
        Rt(l),
        (u = l.pendingLanes),
        (e & 261930) !== 0 && (u & 42) !== 0
          ? l === Ri
            ? ru++
            : ((ru = 0), (Ri = l))
          : (ru = 0),
        yu(0));
    }
  }
  function jo(l, t) {
    (l.pooledCacheLanes &= t) === 0 &&
      ((t = l.pooledCache), t != null && ((l.pooledCache = null), Wa(t)));
  }
  function Nn() {
    return (Ao(), po(), No(), Oo());
  }
  function Oo() {
    if (Dl !== 5) return !1;
    var l = ge,
      t = Di;
    Di = 0;
    var e = Pn(It),
      a = E.T,
      u = p.p;
    try {
      ((p.p = 32 > e ? 32 : e), (E.T = null), (e = Ui), (Ui = null));
      var n = ge,
        c = It;
      if (((Dl = 0), (za = ge = null), (It = 0), (nl & 6) !== 0))
        throw Error(r(331));
      var i = nl;
      if (
        ((nl |= 4),
        fo(n.current),
        no(n, n.current, c, e),
        (nl = i),
        yu(0, !1),
        ut && typeof ut.onPostCommitFiberRoot == "function")
      )
        try {
          ut.onPostCommitFiberRoot(Ua, n);
        } catch {}
      return !0;
    } finally {
      ((p.p = u), (E.T = a), jo(l, t));
    }
  }
  function Mo(l, t, e) {
    ((t = vt(e, t)),
      (t = oi(l.stateNode, t, 2)),
      (l = de(l, t, 2)),
      l !== null && (Ca(l, 2), Rt(l)));
  }
  function fl(l, t, e) {
    if (l.tag === 3) Mo(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Mo(t, l, e);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (ve === null || !ve.has(a)))
          ) {
            ((l = vt(e, l)),
              (e = Md(2)),
              (a = de(t, e, 2)),
              a !== null && (_d(e, a, t, l), Ca(a, 2), Rt(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function qi(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new ir();
      var u = new Set();
      a.set(t, u);
    } else ((u = a.get(t)), u === void 0 && ((u = new Set()), a.set(t, u)));
    u.has(e) ||
      ((Oi = !0), u.add(e), (l = mr.bind(null, l, t, e)), t.then(l, l));
  }
  function mr(l, t, e) {
    var a = l.pingCache;
    (a !== null && a.delete(t),
      (l.pingedLanes |= l.suspendedLanes & e),
      (l.warmLanes &= ~e),
      yl === l &&
        (P & e) === e &&
        (Tl === 4 || (Tl === 3 && (P & 62914560) === P && 300 > at() - xn)
          ? (nl & 2) === 0 && Aa(l, 0)
          : (Mi |= e),
        Ta === P && (Ta = 0)),
      Rt(l));
  }
  function _o(l, t) {
    (t === 0 && (t = zf()), (l = Re(l, t)), l !== null && (Ca(l, t), Rt(l)));
  }
  function rr(l) {
    var t = l.memoizedState,
      e = 0;
    (t !== null && (e = t.retryLane), _o(l, e));
  }
  function yr(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode,
          u = l.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    (a !== null && a.delete(t), _o(l, e));
  }
  function hr(l, t) {
    return kn(l, t);
  }
  var jn = null,
    Na = null,
    Bi = !1,
    On = !1,
    Yi = !1,
    be = 0;
  function Rt(l) {
    (l !== Na &&
      l.next === null &&
      (Na === null ? (jn = Na = l) : (Na = Na.next = l)),
      (On = !0),
      Bi || ((Bi = !0), gr()));
  }
  function yu(l, t) {
    if (!Yi && On) {
      Yi = !0;
      do
        for (var e = !1, a = jn; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var c = a.suspendedLanes,
                i = a.pingedLanes;
              ((n = (1 << (31 - nt(42 | l) + 1)) - 1),
                (n &= u & ~(c & ~i)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0));
            }
            n !== 0 && ((e = !0), Co(a, n));
          } else
            ((n = P),
              (n = Du(
                a,
                a === yl ? n : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
              )),
              (n & 3) === 0 || Ra(a, n) || ((e = !0), Co(a, n)));
          a = a.next;
        }
      while (e);
      Yi = !1;
    }
  }
  function vr() {
    Do();
  }
  function Do() {
    On = Bi = !1;
    var l = 0;
    be !== 0 && jr() && (l = be);
    for (var t = at(), e = null, a = jn; a !== null; ) {
      var u = a.next,
        n = Uo(a, t);
      (n === 0
        ? ((a.next = null),
          e === null ? (jn = u) : (e.next = u),
          u === null && (Na = e))
        : ((e = a), (l !== 0 || (n & 3) !== 0) && (On = !0)),
        (a = u));
    }
    ((Dl !== 0 && Dl !== 5) || yu(l), be !== 0 && (be = 0));
  }
  function Uo(l, t) {
    for (
      var e = l.suspendedLanes,
        a = l.pingedLanes,
        u = l.expirationTimes,
        n = l.pendingLanes & -62914561;
      0 < n;
    ) {
      var c = 31 - nt(n),
        i = 1 << c,
        s = u[c];
      (s === -1
        ? ((i & e) === 0 || (i & a) !== 0) && (u[c] = V0(i, t))
        : s <= t && (l.expiredLanes |= i),
        (n &= ~i));
    }
    if (
      ((t = yl),
      (e = P),
      (e = Du(
        l,
        l === t ? e : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
      )),
      (a = l.callbackNode),
      e === 0 ||
        (l === t && (il === 2 || il === 9)) ||
        l.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && $n(a),
        (l.callbackNode = null),
        (l.callbackPriority = 0)
      );
    if ((e & 3) === 0 || Ra(l, e)) {
      if (((t = e & -e), t === l.callbackPriority)) return t;
      switch ((a !== null && $n(a), Pn(e))) {
        case 2:
        case 8:
          e = Ef;
          break;
        case 32:
          e = ju;
          break;
        case 268435456:
          e = Tf;
          break;
        default:
          e = ju;
      }
      return (
        (a = Ro.bind(null, l)),
        (e = kn(e, a)),
        (l.callbackPriority = t),
        (l.callbackNode = e),
        t
      );
    }
    return (
      a !== null && a !== null && $n(a),
      (l.callbackPriority = 2),
      (l.callbackNode = null),
      2
    );
  }
  function Ro(l, t) {
    if (Dl !== 0 && Dl !== 5)
      return ((l.callbackNode = null), (l.callbackPriority = 0), null);
    var e = l.callbackNode;
    if (Nn() && l.callbackNode !== e) return null;
    var a = P;
    return (
      (a = Du(
        l,
        l === yl ? a : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
      )),
      a === 0
        ? null
        : (yo(l, a, t),
          Uo(l, at()),
          l.callbackNode != null && l.callbackNode === e
            ? Ro.bind(null, l)
            : null)
    );
  }
  function Co(l, t) {
    if (Nn()) return null;
    yo(l, t, !0);
  }
  function gr() {
    Mr(function () {
      (nl & 6) !== 0 ? kn(xf, vr) : Do();
    });
  }
  function Gi() {
    if (be === 0) {
      var l = oa;
      (l === 0 && ((l = Ou), (Ou <<= 1), (Ou & 261888) === 0 && (Ou = 256)),
        (be = l));
    }
    return be;
  }
  function Ho(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean"
      ? null
      : typeof l == "function"
        ? l
        : Hu("" + l);
  }
  function qo(l, t) {
    var e = t.ownerDocument.createElement("input");
    return (
      (e.name = t.name),
      (e.value = t.value),
      l.id && e.setAttribute("form", l.id),
      t.parentNode.insertBefore(e, t),
      (l = new FormData(l)),
      e.parentNode.removeChild(e),
      l
    );
  }
  function Sr(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Ho((u[$l] || null).action),
        c = a.submitter;
      c &&
        ((t = (t = c[$l] || null)
          ? Ho(t.formAction)
          : c.getAttribute("formAction")),
        t !== null && ((n = t), (c = null)));
      var i = new Gu("action", "action", null, a, u);
      l.push({
        event: i,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (be !== 0) {
                  var s = c ? qo(u, c) : new FormData(u);
                  ni(
                    e,
                    { pending: !0, data: s, method: u.method, action: n },
                    null,
                    s,
                  );
                }
              } else
                typeof n == "function" &&
                  (i.preventDefault(),
                  (s = c ? qo(u, c) : new FormData(u)),
                  ni(
                    e,
                    { pending: !0, data: s, method: u.method, action: n },
                    n,
                    s,
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Xi = 0; Xi < Tc.length; Xi++) {
    var Qi = Tc[Xi],
      br = Qi.toLowerCase(),
      xr = Qi[0].toUpperCase() + Qi.slice(1);
    At(br, "on" + xr);
  }
  (At(ms, "onAnimationEnd"),
    At(rs, "onAnimationIteration"),
    At(ys, "onAnimationStart"),
    At("dblclick", "onDoubleClick"),
    At("focusin", "onFocus"),
    At("focusout", "onBlur"),
    At(qm, "onTransitionRun"),
    At(Bm, "onTransitionStart"),
    At(Ym, "onTransitionCancel"),
    At(hs, "onTransitionEnd"),
    Fe("onMouseEnter", ["mouseout", "mouseover"]),
    Fe("onMouseLeave", ["mouseout", "mouseover"]),
    Fe("onPointerEnter", ["pointerout", "pointerover"]),
    Fe("onPointerLeave", ["pointerout", "pointerover"]),
    Me(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Me(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Me("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Me(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Me(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Me(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var hu =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Er = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(hu),
    );
  function Bo(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e],
        u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var c = a.length - 1; 0 <= c; c--) {
            var i = a[c],
              s = i.instance,
              h = i.currentTarget;
            if (((i = i.listener), s !== n && u.isPropagationStopped()))
              break l;
            ((n = i), (u.currentTarget = h));
            try {
              n(u);
            } catch (b) {
              Zu(b);
            }
            ((u.currentTarget = null), (n = s));
          }
        else
          for (c = 0; c < a.length; c++) {
            if (
              ((i = a[c]),
              (s = i.instance),
              (h = i.currentTarget),
              (i = i.listener),
              s !== n && u.isPropagationStopped())
            )
              break l;
            ((n = i), (u.currentTarget = h));
            try {
              n(u);
            } catch (b) {
              Zu(b);
            }
            ((u.currentTarget = null), (n = s));
          }
      }
    }
  }
  function $(l, t) {
    var e = t[lc];
    e === void 0 && (e = t[lc] = new Set());
    var a = l + "__bubble";
    e.has(a) || (Yo(t, l, 2, !1), e.add(a));
  }
  function Zi(l, t, e) {
    var a = 0;
    (t && (a |= 4), Yo(e, l, a, t));
  }
  var Mn = "_reactListening" + Math.random().toString(36).slice(2);
  function Vi(l) {
    if (!l[Mn]) {
      ((l[Mn] = !0),
        _f.forEach(function (e) {
          e !== "selectionchange" && (Er.has(e) || Zi(e, !1, l), Zi(e, !0, l));
        }));
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Mn] || ((t[Mn] = !0), Zi("selectionchange", !1, t));
    }
  }
  function Yo(l, t, e, a) {
    switch (r0(t)) {
      case 2:
        var u = kr;
        break;
      case 8:
        u = $r;
        break;
      default:
        u = uf;
    }
    ((e = u.bind(null, t, e, l)),
      (u = void 0),
      !sc ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      a
        ? u !== void 0
          ? l.addEventListener(t, e, { capture: !0, passive: u })
          : l.addEventListener(t, e, !0)
        : u !== void 0
          ? l.addEventListener(t, e, { passive: u })
          : l.addEventListener(t, e, !1));
  }
  function Li(l, t, e, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (;;) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var i = a.stateNode.containerInfo;
          if (i === u) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var s = c.tag;
              if ((s === 3 || s === 4) && c.stateNode.containerInfo === u)
                return;
              c = c.return;
            }
          for (; i !== null; ) {
            if (((c = We(i)), c === null)) return;
            if (((s = c.tag), s === 5 || s === 6 || s === 26 || s === 27)) {
              a = n = c;
              continue l;
            }
            i = i.parentNode;
          }
        }
        a = a.return;
      }
    Zf(function () {
      var h = n,
        b = ic(e),
        z = [];
      l: {
        var v = vs.get(l);
        if (v !== void 0) {
          var g = Gu,
            M = l;
          switch (l) {
            case "keypress":
              if (Bu(e) === 0) break l;
            case "keydown":
            case "keyup":
              g = ym;
              break;
            case "focusin":
              ((M = "focus"), (g = rc));
              break;
            case "focusout":
              ((M = "blur"), (g = rc));
              break;
            case "beforeblur":
            case "afterblur":
              g = rc;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = Kf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = em;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = gm;
              break;
            case ms:
            case rs:
            case ys:
              g = nm;
              break;
            case hs:
              g = bm;
              break;
            case "scroll":
            case "scrollend":
              g = lm;
              break;
            case "wheel":
              g = Em;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = im;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = wf;
              break;
            case "toggle":
            case "beforetoggle":
              g = zm;
          }
          var G = (t & 4) !== 0,
            ml = !G && (l === "scroll" || l === "scrollend"),
            m = G ? (v !== null ? v + "Capture" : null) : v;
          G = [];
          for (var d = h, y; d !== null; ) {
            var T = d;
            if (
              ((y = T.stateNode),
              (T = T.tag),
              (T !== 5 && T !== 26 && T !== 27) ||
                y === null ||
                m === null ||
                ((T = Ba(d, m)), T != null && G.push(vu(d, T, y))),
              ml)
            )
              break;
            d = d.return;
          }
          0 < G.length &&
            ((v = new g(v, M, null, e, b)), z.push({ event: v, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (
            ((v = l === "mouseover" || l === "pointerover"),
            (g = l === "mouseout" || l === "pointerout"),
            v &&
              e !== cc &&
              (M = e.relatedTarget || e.fromElement) &&
              (We(M) || M[we]))
          )
            break l;
          if (
            (g || v) &&
            ((v =
              b.window === b
                ? b
                : (v = b.ownerDocument)
                  ? v.defaultView || v.parentWindow
                  : window),
            g
              ? ((M = e.relatedTarget || e.toElement),
                (g = h),
                (M = M ? We(M) : null),
                M !== null &&
                  ((ml = H(M)),
                  (G = M.tag),
                  M !== ml || (G !== 5 && G !== 27 && G !== 6)) &&
                  (M = null))
              : ((g = null), (M = h)),
            g !== M)
          ) {
            if (
              ((G = Kf),
              (T = "onMouseLeave"),
              (m = "onMouseEnter"),
              (d = "mouse"),
              (l === "pointerout" || l === "pointerover") &&
                ((G = wf),
                (T = "onPointerLeave"),
                (m = "onPointerEnter"),
                (d = "pointer")),
              (ml = g == null ? v : qa(g)),
              (y = M == null ? v : qa(M)),
              (v = new G(T, d + "leave", g, e, b)),
              (v.target = ml),
              (v.relatedTarget = y),
              (T = null),
              We(b) === h &&
                ((G = new G(m, d + "enter", M, e, b)),
                (G.target = y),
                (G.relatedTarget = ml),
                (T = G)),
              (ml = T),
              g && M)
            )
              t: {
                for (G = Tr, m = g, d = M, y = 0, T = m; T; T = G(T)) y++;
                T = 0;
                for (var B = d; B; B = G(B)) T++;
                for (; 0 < y - T; ) ((m = G(m)), y--);
                for (; 0 < T - y; ) ((d = G(d)), T--);
                for (; y--; ) {
                  if (m === d || (d !== null && m === d.alternate)) {
                    G = m;
                    break t;
                  }
                  ((m = G(m)), (d = G(d)));
                }
                G = null;
              }
            else G = null;
            (g !== null && Go(z, v, g, G, !1),
              M !== null && ml !== null && Go(z, ml, M, G, !0));
          }
        }
        l: {
          if (
            ((v = h ? qa(h) : window),
            (g = v.nodeName && v.nodeName.toLowerCase()),
            g === "select" || (g === "input" && v.type === "file"))
          )
            var el = ts;
          else if (Pf(v))
            if (es) el = Rm;
            else {
              el = Dm;
              var U = _m;
            }
          else
            ((g = v.nodeName),
              !g ||
              g.toLowerCase() !== "input" ||
              (v.type !== "checkbox" && v.type !== "radio")
                ? h && nc(h.elementType) && (el = ts)
                : (el = Um));
          if (el && (el = el(l, h))) {
            ls(z, el, e, b);
            break l;
          }
          (U && U(l, v, h),
            l === "focusout" &&
              h &&
              v.type === "number" &&
              h.memoizedProps.value != null &&
              uc(v, "number", v.value));
        }
        switch (((U = h ? qa(h) : window), l)) {
          case "focusin":
            (Pf(U) || U.contentEditable === "true") &&
              ((aa = U), (bc = h), (Ka = null));
            break;
          case "focusout":
            Ka = bc = aa = null;
            break;
          case "mousedown":
            xc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((xc = !1), ds(z, e, b));
            break;
          case "selectionchange":
            if (Hm) break;
          case "keydown":
          case "keyup":
            ds(z, e, b);
        }
        var w;
        if (hc)
          l: {
            switch (l) {
              case "compositionstart":
                var ll = "onCompositionStart";
                break l;
              case "compositionend":
                ll = "onCompositionEnd";
                break l;
              case "compositionupdate":
                ll = "onCompositionUpdate";
                break l;
            }
            ll = void 0;
          }
        else
          ea
            ? Ff(l, e) && (ll = "onCompositionEnd")
            : l === "keydown" &&
              e.keyCode === 229 &&
              (ll = "onCompositionStart");
        (ll &&
          (Wf &&
            e.locale !== "ko" &&
            (ea || ll !== "onCompositionStart"
              ? ll === "onCompositionEnd" && ea && (w = Vf())
              : ((ae = b),
                (dc = "value" in ae ? ae.value : ae.textContent),
                (ea = !0))),
          (U = _n(h, ll)),
          0 < U.length &&
            ((ll = new Jf(ll, l, null, e, b)),
            z.push({ event: ll, listeners: U }),
            w ? (ll.data = w) : ((w = If(e)), w !== null && (ll.data = w)))),
          (w = pm ? Nm(l, e) : jm(l, e)) &&
            ((ll = _n(h, "onBeforeInput")),
            0 < ll.length &&
              ((U = new Jf("onBeforeInput", "beforeinput", null, e, b)),
              z.push({ event: U, listeners: ll }),
              (U.data = w))),
          Sr(z, l, h, e, b));
      }
      Bo(z, t);
    });
  }
  function vu(l, t, e) {
    return { instance: l, listener: t, currentTarget: e };
  }
  function _n(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = Ba(l, e)),
          u != null && a.unshift(vu(l, u, n)),
          (u = Ba(l, t)),
          u != null && a.push(vu(l, u, n))),
        l.tag === 3)
      )
        return a;
      l = l.return;
    }
    return [];
  }
  function Tr(l) {
    if (l === null) return null;
    do l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Go(l, t, e, a, u) {
    for (var n = t._reactName, c = []; e !== null && e !== a; ) {
      var i = e,
        s = i.alternate,
        h = i.stateNode;
      if (((i = i.tag), s !== null && s === a)) break;
      ((i !== 5 && i !== 26 && i !== 27) ||
        h === null ||
        ((s = h),
        u
          ? ((h = Ba(e, n)), h != null && c.unshift(vu(e, h, s)))
          : u || ((h = Ba(e, n)), h != null && c.push(vu(e, h, s)))),
        (e = e.return));
    }
    c.length !== 0 && l.push({ event: t, listeners: c });
  }
  var zr = /\r\n?/g,
    Ar = /\u0000|\uFFFD/g;
  function Xo(l) {
    return (typeof l == "string" ? l : "" + l)
      .replace(
        zr,
        `
`,
      )
      .replace(Ar, "");
  }
  function Qo(l, t) {
    return ((t = Xo(t)), Xo(l) === t);
  }
  function ol(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || Pe(l, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            Pe(l, "" + a);
        break;
      case "className":
        Ru(l, "class", a);
        break;
      case "tabIndex":
        Ru(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ru(l, e, a);
        break;
      case "style":
        Xf(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          Ru(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          l.removeAttribute(e);
          break;
        }
        ((a = Hu("" + a)), l.setAttribute(e, a));
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof n == "function" &&
            (e === "formAction"
              ? (t !== "input" && ol(l, t, "name", u.name, u, null),
                ol(l, t, "formEncType", u.formEncType, u, null),
                ol(l, t, "formMethod", u.formMethod, u, null),
                ol(l, t, "formTarget", u.formTarget, u, null))
              : (ol(l, t, "encType", u.encType, u, null),
                ol(l, t, "method", u.method, u, null),
                ol(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        ((a = Hu("" + a)), l.setAttribute(e, a));
        break;
      case "onClick":
        a != null && (l.onclick = Bt);
        break;
      case "onScroll":
        a != null && $("scroll", l);
        break;
      case "onScrollEnd":
        a != null && $("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((e = a.__html), e != null)) {
            if (u.children != null) throw Error(r(60));
            l.innerHTML = e;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          l.removeAttribute("xlink:href");
          break;
        }
        ((e = Hu("" + a)),
          l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? l.setAttribute(e, "" + a)
          : l.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? l.setAttribute(e, "")
          : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0
          ? l.setAttribute(e, "")
          : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? l.setAttribute(e, a)
            : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? l.setAttribute(e, a)
          : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? l.removeAttribute(e)
          : l.setAttribute(e, a);
        break;
      case "popover":
        ($("beforetoggle", l), $("toggle", l), Uu(l, "popover", a));
        break;
      case "xlinkActuate":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        qt(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        qt(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        qt(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        qt(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Uu(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) ||
          (e[0] !== "o" && e[0] !== "O") ||
          (e[1] !== "n" && e[1] !== "N")) &&
          ((e = I0.get(e) || e), Uu(l, e, a));
    }
  }
  function Ki(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Xf(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((e = a.__html), e != null)) {
            if (u.children != null) throw Error(r(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? Pe(l, a)
          : (typeof a == "number" || typeof a == "bigint") && Pe(l, "" + a);
        break;
      case "onScroll":
        a != null && $("scroll", l);
        break;
      case "onScrollEnd":
        a != null && $("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Bt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Df.hasOwnProperty(e))
          l: {
            if (
              e[0] === "o" &&
              e[1] === "n" &&
              ((u = e.endsWith("Capture")),
              (t = e.slice(2, u ? e.length - 7 : void 0)),
              (n = l[$l] || null),
              (n = n != null ? n[e] : null),
              typeof n == "function" && l.removeEventListener(t, n, u),
              typeof a == "function")
            ) {
              (typeof n != "function" &&
                n !== null &&
                (e in l
                  ? (l[e] = null)
                  : l.hasAttribute(e) && l.removeAttribute(e)),
                l.addEventListener(t, a, u));
              break l;
            }
            e in l
              ? (l[e] = a)
              : a === !0
                ? l.setAttribute(e, "")
                : Uu(l, e, a);
          }
    }
  }
  function Zl(l, t, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ($("error", l), $("load", l));
        var a = !1,
          u = !1,
          n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var c = e[n];
            if (c != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  ol(l, t, n, c, e, null);
              }
          }
        (u && ol(l, t, "srcSet", e.srcSet, e, null),
          a && ol(l, t, "src", e.src, e, null));
        return;
      case "input":
        $("invalid", l);
        var i = (n = c = u = null),
          s = null,
          h = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var b = e[a];
            if (b != null)
              switch (a) {
                case "name":
                  u = b;
                  break;
                case "type":
                  c = b;
                  break;
                case "checked":
                  s = b;
                  break;
                case "defaultChecked":
                  h = b;
                  break;
                case "value":
                  n = b;
                  break;
                case "defaultValue":
                  i = b;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (b != null) throw Error(r(137, t));
                  break;
                default:
                  ol(l, t, a, b, e, null);
              }
          }
        qf(l, n, i, s, h, c, u, !1);
        return;
      case "select":
        ($("invalid", l), (a = c = n = null));
        for (u in e)
          if (e.hasOwnProperty(u) && ((i = e[u]), i != null))
            switch (u) {
              case "value":
                n = i;
                break;
              case "defaultValue":
                c = i;
                break;
              case "multiple":
                a = i;
              default:
                ol(l, t, u, i, e, null);
            }
        ((t = n),
          (e = c),
          (l.multiple = !!a),
          t != null ? Ie(l, !!a, t, !1) : e != null && Ie(l, !!a, e, !0));
        return;
      case "textarea":
        ($("invalid", l), (n = u = a = null));
        for (c in e)
          if (e.hasOwnProperty(c) && ((i = e[c]), i != null))
            switch (c) {
              case "value":
                a = i;
                break;
              case "defaultValue":
                u = i;
                break;
              case "children":
                n = i;
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(r(91));
                break;
              default:
                ol(l, t, c, i, e, null);
            }
        Yf(l, a, u, n);
        return;
      case "option":
        for (s in e)
          if (e.hasOwnProperty(s) && ((a = e[s]), a != null))
            switch (s) {
              case "selected":
                l.selected =
                  a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                ol(l, t, s, a, e, null);
            }
        return;
      case "dialog":
        ($("beforetoggle", l), $("toggle", l), $("cancel", l), $("close", l));
        break;
      case "iframe":
      case "object":
        $("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < hu.length; a++) $(hu[a], l);
        break;
      case "image":
        ($("error", l), $("load", l));
        break;
      case "details":
        $("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        ($("error", l), $("load", l));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (h in e)
          if (e.hasOwnProperty(h) && ((a = e[h]), a != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                ol(l, t, h, a, e, null);
            }
        return;
      default:
        if (nc(t)) {
          for (b in e)
            e.hasOwnProperty(b) &&
              ((a = e[b]), a !== void 0 && Ki(l, t, b, a, e, void 0));
          return;
        }
    }
    for (i in e)
      e.hasOwnProperty(i) && ((a = e[i]), a != null && ol(l, t, i, a, e, null));
  }
  function pr(l, t, e, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          n = null,
          c = null,
          i = null,
          s = null,
          h = null,
          b = null;
        for (g in e) {
          var z = e[g];
          if (e.hasOwnProperty(g) && z != null)
            switch (g) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                s = z;
              default:
                a.hasOwnProperty(g) || ol(l, t, g, null, a, z);
            }
        }
        for (var v in a) {
          var g = a[v];
          if (((z = e[v]), a.hasOwnProperty(v) && (g != null || z != null)))
            switch (v) {
              case "type":
                n = g;
                break;
              case "name":
                u = g;
                break;
              case "checked":
                h = g;
                break;
              case "defaultChecked":
                b = g;
                break;
              case "value":
                c = g;
                break;
              case "defaultValue":
                i = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null) throw Error(r(137, t));
                break;
              default:
                g !== z && ol(l, t, v, g, a, z);
            }
        }
        ac(l, c, i, s, h, b, n, u);
        return;
      case "select":
        g = c = i = v = null;
        for (n in e)
          if (((s = e[n]), e.hasOwnProperty(n) && s != null))
            switch (n) {
              case "value":
                break;
              case "multiple":
                g = s;
              default:
                a.hasOwnProperty(n) || ol(l, t, n, null, a, s);
            }
        for (u in a)
          if (
            ((n = a[u]),
            (s = e[u]),
            a.hasOwnProperty(u) && (n != null || s != null))
          )
            switch (u) {
              case "value":
                v = n;
                break;
              case "defaultValue":
                i = n;
                break;
              case "multiple":
                c = n;
              default:
                n !== s && ol(l, t, u, n, a, s);
            }
        ((t = i),
          (e = c),
          (a = g),
          v != null
            ? Ie(l, !!e, v, !1)
            : !!a != !!e &&
              (t != null ? Ie(l, !!e, t, !0) : Ie(l, !!e, e ? [] : "", !1)));
        return;
      case "textarea":
        g = v = null;
        for (i in e)
          if (
            ((u = e[i]),
            e.hasOwnProperty(i) && u != null && !a.hasOwnProperty(i))
          )
            switch (i) {
              case "value":
                break;
              case "children":
                break;
              default:
                ol(l, t, i, null, a, u);
            }
        for (c in a)
          if (
            ((u = a[c]),
            (n = e[c]),
            a.hasOwnProperty(c) && (u != null || n != null))
          )
            switch (c) {
              case "value":
                v = u;
                break;
              case "defaultValue":
                g = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== n && ol(l, t, c, u, a, n);
            }
        Bf(l, v, g);
        return;
      case "option":
        for (var M in e)
          if (
            ((v = e[M]),
            e.hasOwnProperty(M) && v != null && !a.hasOwnProperty(M))
          )
            switch (M) {
              case "selected":
                l.selected = !1;
                break;
              default:
                ol(l, t, M, null, a, v);
            }
        for (s in a)
          if (
            ((v = a[s]),
            (g = e[s]),
            a.hasOwnProperty(s) && v !== g && (v != null || g != null))
          )
            switch (s) {
              case "selected":
                l.selected =
                  v && typeof v != "function" && typeof v != "symbol";
                break;
              default:
                ol(l, t, s, v, a, g);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var G in e)
          ((v = e[G]),
            e.hasOwnProperty(G) &&
              v != null &&
              !a.hasOwnProperty(G) &&
              ol(l, t, G, null, a, v));
        for (h in a)
          if (
            ((v = a[h]),
            (g = e[h]),
            a.hasOwnProperty(h) && v !== g && (v != null || g != null))
          )
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(r(137, t));
                break;
              default:
                ol(l, t, h, v, a, g);
            }
        return;
      default:
        if (nc(t)) {
          for (var ml in e)
            ((v = e[ml]),
              e.hasOwnProperty(ml) &&
                v !== void 0 &&
                !a.hasOwnProperty(ml) &&
                Ki(l, t, ml, void 0, a, v));
          for (b in a)
            ((v = a[b]),
              (g = e[b]),
              !a.hasOwnProperty(b) ||
                v === g ||
                (v === void 0 && g === void 0) ||
                Ki(l, t, b, v, a, g));
          return;
        }
    }
    for (var m in e)
      ((v = e[m]),
        e.hasOwnProperty(m) &&
          v != null &&
          !a.hasOwnProperty(m) &&
          ol(l, t, m, null, a, v));
    for (z in a)
      ((v = a[z]),
        (g = e[z]),
        !a.hasOwnProperty(z) ||
          v === g ||
          (v == null && g == null) ||
          ol(l, t, z, v, a, g));
  }
  function Zo(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Nr() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0;
        a < e.length;
        a++
      ) {
        var u = e[a],
          n = u.transferSize,
          c = u.initiatorType,
          i = u.duration;
        if (n && i && Zo(c)) {
          for (c = 0, i = u.responseEnd, a += 1; a < e.length; a++) {
            var s = e[a],
              h = s.startTime;
            if (h > i) break;
            var b = s.transferSize,
              z = s.initiatorType;
            b &&
              Zo(z) &&
              ((s = s.responseEnd), (c += b * (s < i ? 1 : (i - h) / (s - h))));
          }
          if ((--a, (t += (8 * (n + c)) / (u.duration / 1e3)), l++, 10 < l))
            break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection &&
      ((l = navigator.connection.downlink), typeof l == "number")
      ? l
      : 5;
  }
  var Ji = null,
    wi = null;
  function Dn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Vo(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Lo(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Wi(l, t) {
    return (
      l === "textarea" ||
      l === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var ki = null;
  function jr() {
    var l = window.event;
    return l && l.type === "popstate"
      ? l === ki
        ? !1
        : ((ki = l), !0)
      : ((ki = null), !1);
  }
  var Ko = typeof setTimeout == "function" ? setTimeout : void 0,
    Or = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Jo = typeof Promise == "function" ? Promise : void 0,
    Mr =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Jo < "u"
          ? function (l) {
              return Jo.resolve(null).then(l).catch(_r);
            }
          : Ko;
  function _r(l) {
    setTimeout(function () {
      throw l;
    });
  }
  function xe(l) {
    return l === "head";
  }
  function wo(l, t) {
    var e = t,
      a = 0;
    do {
      var u = e.nextSibling;
      if ((l.removeChild(e), u && u.nodeType === 8))
        if (((e = u.data), e === "/$" || e === "/&")) {
          if (a === 0) {
            (l.removeChild(u), _a(t));
            return;
          }
          a--;
        } else if (
          e === "$" ||
          e === "$?" ||
          e === "$~" ||
          e === "$!" ||
          e === "&"
        )
          a++;
        else if (e === "html") gu(l.ownerDocument.documentElement);
        else if (e === "head") {
          ((e = l.ownerDocument.head), gu(e));
          for (var n = e.firstChild; n; ) {
            var c = n.nextSibling,
              i = n.nodeName;
            (n[Ha] ||
              i === "SCRIPT" ||
              i === "STYLE" ||
              (i === "LINK" && n.rel.toLowerCase() === "stylesheet") ||
              e.removeChild(n),
              (n = c));
          }
        } else e === "body" && gu(l.ownerDocument.body);
      e = u;
    } while (e);
    _a(t);
  }
  function Wo(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (
        (e.nodeType === 1
          ? t
            ? ((e._stashedDisplay = e.style.display),
              (e.style.display = "none"))
            : ((e.style.display = e._stashedDisplay || ""),
              e.getAttribute("style") === "" && e.removeAttribute("style"))
          : e.nodeType === 3 &&
            (t
              ? ((e._stashedText = e.nodeValue), (e.nodeValue = ""))
              : (e.nodeValue = e._stashedText || "")),
        a && a.nodeType === 8)
      )
        if (((e = a.data), e === "/$")) {
          if (l === 0) break;
          l--;
        } else (e !== "$" && e !== "$?" && e !== "$~" && e !== "$!") || l++;
      e = a;
    } while (e);
  }
  function $i(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (((t = t.nextSibling), e.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ($i(e), tc(e));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function Dr(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (a) {
        if (!l[Ha])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (
                ((n = l.getAttribute("rel")),
                n === "stylesheet" && l.hasAttribute("data-precedence"))
              )
                break;
              if (
                n !== u.rel ||
                l.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                l.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                l.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (
                ((n = l.getAttribute("src")),
                (n !== (u.src == null ? null : u.src) ||
                  l.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  l.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  n &&
                  l.hasAttribute("async") &&
                  !l.hasAttribute("itemprop"))
              )
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n) return l;
      } else return l;
      if (((l = Et(l.nextSibling)), l === null)) break;
    }
    return null;
  }
  function Ur(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !e) ||
        ((l = Et(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function ko(l, t) {
    for (; l.nodeType !== 8; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !t) ||
        ((l = Et(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function Fi(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Ii(l) {
    return (
      l.data === "$!" ||
      (l.data === "$?" && l.ownerDocument.readyState !== "loading")
    );
  }
  function Rr(l, t) {
    var e = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || e.readyState !== "loading") t();
    else {
      var a = function () {
        (t(), e.removeEventListener("DOMContentLoaded", a));
      };
      (e.addEventListener("DOMContentLoaded", a), (l._reactRetry = a));
    }
  }
  function Et(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = l.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var Pi = null;
  function $o(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0) return Et(l.nextSibling);
          t--;
        } else
          (e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&") ||
            t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Fo(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (t === 0) return l;
          t--;
        } else (e !== "/$" && e !== "/&") || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Io(l, t, e) {
    switch (((t = Dn(e)), l)) {
      case "html":
        if (((l = t.documentElement), !l)) throw Error(r(452));
        return l;
      case "head":
        if (((l = t.head), !l)) throw Error(r(453));
        return l;
      case "body":
        if (((l = t.body), !l)) throw Error(r(454));
        return l;
      default:
        throw Error(r(451));
    }
  }
  function gu(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    tc(l);
  }
  var Tt = new Map(),
    Po = new Set();
  function Un(l) {
    return typeof l.getRootNode == "function"
      ? l.getRootNode()
      : l.nodeType === 9
        ? l
        : l.ownerDocument;
  }
  var Pt = p.d;
  p.d = { f: Cr, r: Hr, D: qr, C: Br, L: Yr, m: Gr, X: Qr, S: Xr, M: Zr };
  function Cr() {
    var l = Pt.f(),
      t = zn();
    return l || t;
  }
  function Hr(l) {
    var t = ke(l);
    t !== null && t.tag === 5 && t.type === "form" ? hd(t) : Pt.r(l);
  }
  var ja = typeof document > "u" ? null : document;
  function l0(l, t, e) {
    var a = ja;
    if (a && typeof t == "string" && t) {
      var u = yt(t);
      ((u = 'link[rel="' + l + '"][href="' + u + '"]'),
        typeof e == "string" && (u += '[crossorigin="' + e + '"]'),
        Po.has(u) ||
          (Po.add(u),
          (l = { rel: l, crossOrigin: e, href: t }),
          a.querySelector(u) === null &&
            ((t = a.createElement("link")),
            Zl(t, "link", l),
            Cl(t),
            a.head.appendChild(t))));
    }
  }
  function qr(l) {
    (Pt.D(l), l0("dns-prefetch", l, null));
  }
  function Br(l, t) {
    (Pt.C(l, t), l0("preconnect", l, t));
  }
  function Yr(l, t, e) {
    Pt.L(l, t, e);
    var a = ja;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + yt(t) + '"]';
      t === "image" && e && e.imageSrcSet
        ? ((u += '[imagesrcset="' + yt(e.imageSrcSet) + '"]'),
          typeof e.imageSizes == "string" &&
            (u += '[imagesizes="' + yt(e.imageSizes) + '"]'))
        : (u += '[href="' + yt(l) + '"]');
      var n = u;
      switch (t) {
        case "style":
          n = Oa(l);
          break;
        case "script":
          n = Ma(l);
      }
      Tt.has(n) ||
        ((l = C(
          {
            rel: "preload",
            href: t === "image" && e && e.imageSrcSet ? void 0 : l,
            as: t,
          },
          e,
        )),
        Tt.set(n, l),
        a.querySelector(u) !== null ||
          (t === "style" && a.querySelector(Su(n))) ||
          (t === "script" && a.querySelector(bu(n))) ||
          ((t = a.createElement("link")),
          Zl(t, "link", l),
          Cl(t),
          a.head.appendChild(t)));
    }
  }
  function Gr(l, t) {
    Pt.m(l, t);
    var e = ja;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        u =
          'link[rel="modulepreload"][as="' + yt(a) + '"][href="' + yt(l) + '"]',
        n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Ma(l);
      }
      if (
        !Tt.has(n) &&
        ((l = C({ rel: "modulepreload", href: l }, t)),
        Tt.set(n, l),
        e.querySelector(u) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(bu(n))) return;
        }
        ((a = e.createElement("link")),
          Zl(a, "link", l),
          Cl(a),
          e.head.appendChild(a));
      }
    }
  }
  function Xr(l, t, e) {
    Pt.S(l, t, e);
    var a = ja;
    if (a && l) {
      var u = $e(a).hoistableStyles,
        n = Oa(l);
      t = t || "default";
      var c = u.get(n);
      if (!c) {
        var i = { loading: 0, preload: null };
        if ((c = a.querySelector(Su(n)))) i.loading = 5;
        else {
          ((l = C({ rel: "stylesheet", href: l, "data-precedence": t }, e)),
            (e = Tt.get(n)) && lf(l, e));
          var s = (c = a.createElement("link"));
          (Cl(s),
            Zl(s, "link", l),
            (s._p = new Promise(function (h, b) {
              ((s.onload = h), (s.onerror = b));
            })),
            s.addEventListener("load", function () {
              i.loading |= 1;
            }),
            s.addEventListener("error", function () {
              i.loading |= 2;
            }),
            (i.loading |= 4),
            Rn(c, t, a));
        }
        ((c = { type: "stylesheet", instance: c, count: 1, state: i }),
          u.set(n, c));
      }
    }
  }
  function Qr(l, t) {
    Pt.X(l, t);
    var e = ja;
    if (e && l) {
      var a = $e(e).hoistableScripts,
        u = Ma(l),
        n = a.get(u);
      n ||
        ((n = e.querySelector(bu(u))),
        n ||
          ((l = C({ src: l, async: !0 }, t)),
          (t = Tt.get(u)) && tf(l, t),
          (n = e.createElement("script")),
          Cl(n),
          Zl(n, "link", l),
          e.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function Zr(l, t) {
    Pt.M(l, t);
    var e = ja;
    if (e && l) {
      var a = $e(e).hoistableScripts,
        u = Ma(l),
        n = a.get(u);
      n ||
        ((n = e.querySelector(bu(u))),
        n ||
          ((l = C({ src: l, async: !0, type: "module" }, t)),
          (t = Tt.get(u)) && tf(l, t),
          (n = e.createElement("script")),
          Cl(n),
          Zl(n, "link", l),
          e.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function t0(l, t, e, a) {
    var u = (u = W.current) ? Un(u) : null;
    if (!u) throw Error(r(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string"
          ? ((t = Oa(e.href)),
            (e = $e(u).hoistableStyles),
            (a = e.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              e.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          e.rel === "stylesheet" &&
          typeof e.href == "string" &&
          typeof e.precedence == "string"
        ) {
          l = Oa(e.href);
          var n = $e(u).hoistableStyles,
            c = n.get(l);
          if (
            (c ||
              ((u = u.ownerDocument || u),
              (c = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(l, c),
              (n = u.querySelector(Su(l))) &&
                !n._p &&
                ((c.instance = n), (c.state.loading = 5)),
              Tt.has(l) ||
                ((e = {
                  rel: "preload",
                  as: "style",
                  href: e.href,
                  crossOrigin: e.crossOrigin,
                  integrity: e.integrity,
                  media: e.media,
                  hrefLang: e.hrefLang,
                  referrerPolicy: e.referrerPolicy,
                }),
                Tt.set(l, e),
                n || Vr(u, l, e, c.state))),
            t && a === null)
          )
            throw Error(r(528, ""));
          return c;
        }
        if (t && a !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (t = e.async),
          (e = e.src),
          typeof e == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Ma(e)),
              (e = $e(u).hoistableScripts),
              (a = e.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                e.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, l));
    }
  }
  function Oa(l) {
    return 'href="' + yt(l) + '"';
  }
  function Su(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function e0(l) {
    return C({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function Vr(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = l.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        Zl(t, "link", e),
        Cl(t),
        l.head.appendChild(t));
  }
  function Ma(l) {
    return '[src="' + yt(l) + '"]';
  }
  function bu(l) {
    return "script[async]" + l;
  }
  function a0(l, t, e) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = l.querySelector('style[data-href~="' + yt(e.href) + '"]');
          if (a) return ((t.instance = a), Cl(a), a);
          var u = C({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (l.ownerDocument || l).createElement("style")),
            Cl(a),
            Zl(a, "style", u),
            Rn(a, e.precedence, l),
            (t.instance = a)
          );
        case "stylesheet":
          u = Oa(e.href);
          var n = l.querySelector(Su(u));
          if (n) return ((t.state.loading |= 4), (t.instance = n), Cl(n), n);
          ((a = e0(e)),
            (u = Tt.get(u)) && lf(a, u),
            (n = (l.ownerDocument || l).createElement("link")),
            Cl(n));
          var c = n;
          return (
            (c._p = new Promise(function (i, s) {
              ((c.onload = i), (c.onerror = s));
            })),
            Zl(n, "link", a),
            (t.state.loading |= 4),
            Rn(n, e.precedence, l),
            (t.instance = n)
          );
        case "script":
          return (
            (n = Ma(e.src)),
            (u = l.querySelector(bu(n)))
              ? ((t.instance = u), Cl(u), u)
              : ((a = e),
                (u = Tt.get(n)) && ((a = C({}, e)), tf(a, u)),
                (l = l.ownerDocument || l),
                (u = l.createElement("script")),
                Cl(u),
                Zl(u, "link", a),
                l.head.appendChild(u),
                (t.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), Rn(a, e.precedence, l));
    return t.instance;
  }
  function Rn(l, t, e) {
    for (
      var a = e.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        u = a.length ? a[a.length - 1] : null,
        n = u,
        c = 0;
      c < a.length;
      c++
    ) {
      var i = a[c];
      if (i.dataset.precedence === t) n = i;
      else if (n !== u) break;
    }
    n
      ? n.parentNode.insertBefore(l, n.nextSibling)
      : ((t = e.nodeType === 9 ? e.head : e), t.insertBefore(l, t.firstChild));
  }
  function lf(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.title == null && (l.title = t.title));
  }
  function tf(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.integrity == null && (l.integrity = t.integrity));
  }
  var Cn = null;
  function u0(l, t, e) {
    if (Cn === null) {
      var a = new Map(),
        u = (Cn = new Map());
      u.set(e, a);
    } else ((u = Cn), (a = u.get(e)), a || ((a = new Map()), u.set(e, a)));
    if (a.has(l)) return a;
    for (
      a.set(l, null), e = e.getElementsByTagName(l), u = 0;
      u < e.length;
      u++
    ) {
      var n = e[u];
      if (
        !(
          n[Ha] ||
          n[Yl] ||
          (l === "link" && n.getAttribute("rel") === "stylesheet")
        ) &&
        n.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var c = n.getAttribute(t) || "";
        c = l + c;
        var i = a.get(c);
        i ? i.push(n) : a.set(c, [n]);
      }
    }
    return a;
  }
  function n0(l, t, e) {
    ((l = l.ownerDocument || l),
      l.head.insertBefore(
        e,
        t === "title" ? l.querySelector("head > title") : null,
      ));
  }
  function Lr(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (l = t.disabled),
              typeof t.precedence == "string" && l == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function c0(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Kr(l, t, e, a) {
    if (
      e.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (e.state.loading & 4) === 0
    ) {
      if (e.instance === null) {
        var u = Oa(a.href),
          n = t.querySelector(Su(u));
        if (n) {
          ((t = n._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (l.count++, (l = Hn.bind(l)), t.then(l, l)),
            (e.state.loading |= 4),
            (e.instance = n),
            Cl(n));
          return;
        }
        ((n = t.ownerDocument || t),
          (a = e0(a)),
          (u = Tt.get(u)) && lf(a, u),
          (n = n.createElement("link")),
          Cl(n));
        var c = n;
        ((c._p = new Promise(function (i, s) {
          ((c.onload = i), (c.onerror = s));
        })),
          Zl(n, "link", a),
          (e.instance = n));
      }
      (l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(e, t),
        (t = e.state.preload) &&
          (e.state.loading & 3) === 0 &&
          (l.count++,
          (e = Hn.bind(l)),
          t.addEventListener("load", e),
          t.addEventListener("error", e)));
    }
  }
  var ef = 0;
  function Jr(l, t) {
    return (
      l.stylesheets && l.count === 0 && Bn(l, l.stylesheets),
      0 < l.count || 0 < l.imgCount
        ? function (e) {
            var a = setTimeout(function () {
              if ((l.stylesheets && Bn(l, l.stylesheets), l.unsuspend)) {
                var n = l.unsuspend;
                ((l.unsuspend = null), n());
              }
            }, 6e4 + t);
            0 < l.imgBytes && ef === 0 && (ef = 62500 * Nr());
            var u = setTimeout(
              function () {
                if (
                  ((l.waitingForImages = !1),
                  l.count === 0 &&
                    (l.stylesheets && Bn(l, l.stylesheets), l.unsuspend))
                ) {
                  var n = l.unsuspend;
                  ((l.unsuspend = null), n());
                }
              },
              (l.imgBytes > ef ? 50 : 800) + t,
            );
            return (
              (l.unsuspend = e),
              function () {
                ((l.unsuspend = null), clearTimeout(a), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function Hn() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) Bn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        ((this.unsuspend = null), l());
      }
    }
  }
  var qn = null;
  function Bn(l, t) {
    ((l.stylesheets = null),
      l.unsuspend !== null &&
        (l.count++,
        (qn = new Map()),
        t.forEach(wr, l),
        (qn = null),
        Hn.call(l)));
  }
  function wr(l, t) {
    if (!(t.state.loading & 4)) {
      var e = qn.get(l);
      if (e) var a = e.get(null);
      else {
        ((e = new Map()), qn.set(l, e));
        for (
          var u = l.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            n = 0;
          n < u.length;
          n++
        ) {
          var c = u[n];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") &&
            (e.set(c.dataset.precedence, c), (a = c));
        }
        a && e.set(null, a);
      }
      ((u = t.instance),
        (c = u.getAttribute("data-precedence")),
        (n = e.get(c) || a),
        n === a && e.set(null, u),
        e.set(c, u),
        this.count++,
        (a = Hn.bind(this)),
        u.addEventListener("load", a),
        u.addEventListener("error", a),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((l = l.nodeType === 9 ? l.head : l),
            l.insertBefore(u, l.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var xu = {
    $$typeof: Nl,
    Provider: null,
    Consumer: null,
    _currentValue: X,
    _currentValue2: X,
    _threadCount: 0,
  };
  function Wr(l, t, e, a, u, n, c, i, s) {
    ((this.tag = 1),
      (this.containerInfo = l),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Fn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Fn(0)),
      (this.hiddenUpdates = Fn(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = u),
      (this.onCaughtError = n),
      (this.onRecoverableError = c),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = s),
      (this.incompleteTransitions = new Map()));
  }
  function i0(l, t, e, a, u, n, c, i, s, h, b, z) {
    return (
      (l = new Wr(l, t, e, c, s, h, b, z, i)),
      (t = 1),
      n === !0 && (t |= 24),
      (n = it(3, null, null, t)),
      (l.current = n),
      (n.stateNode = l),
      (t = Hc()),
      t.refCount++,
      (l.pooledCache = t),
      t.refCount++,
      (n.memoizedState = { element: a, isDehydrated: e, cache: t }),
      Gc(n),
      l
    );
  }
  function f0(l) {
    return l ? ((l = ca), l) : ca;
  }
  function s0(l, t, e, a, u, n) {
    ((u = f0(u)),
      a.context === null ? (a.context = u) : (a.pendingContext = u),
      (a = se(t)),
      (a.payload = { element: e }),
      (n = n === void 0 ? null : n),
      n !== null && (a.callback = n),
      (e = de(l, a, t)),
      e !== null && (et(e, l, t), Ia(e, l, t)));
  }
  function d0(l, t) {
    if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function af(l, t) {
    (d0(l, t), (l = l.alternate) && d0(l, t));
  }
  function o0(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Re(l, 67108864);
      (t !== null && et(t, l, 67108864), af(l, 67108864));
    }
  }
  function m0(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = mt();
      t = In(t);
      var e = Re(l, t);
      (e !== null && et(e, l, t), af(l, t));
    }
  }
  var Yn = !0;
  function kr(l, t, e, a) {
    var u = E.T;
    E.T = null;
    var n = p.p;
    try {
      ((p.p = 2), uf(l, t, e, a));
    } finally {
      ((p.p = n), (E.T = u));
    }
  }
  function $r(l, t, e, a) {
    var u = E.T;
    E.T = null;
    var n = p.p;
    try {
      ((p.p = 8), uf(l, t, e, a));
    } finally {
      ((p.p = n), (E.T = u));
    }
  }
  function uf(l, t, e, a) {
    if (Yn) {
      var u = nf(a);
      if (u === null) (Li(l, t, a, Gn, e), y0(l, a));
      else if (Ir(u, l, t, e, a)) a.stopPropagation();
      else if ((y0(l, a), t & 4 && -1 < Fr.indexOf(l))) {
        for (; u !== null; ) {
          var n = ke(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var c = Oe(n.pendingLanes);
                  if (c !== 0) {
                    var i = n;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                      var s = 1 << (31 - nt(c));
                      ((i.entanglements[1] |= s), (c &= ~s));
                    }
                    (Rt(n), (nl & 6) === 0 && ((En = at() + 500), yu(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((i = Re(n, 2)), i !== null && et(i, n, 2), zn(), af(n, 2));
            }
          if (((n = nf(a)), n === null && Li(l, t, a, Gn, e), n === u)) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else Li(l, t, a, null, e);
    }
  }
  function nf(l) {
    return ((l = ic(l)), cf(l));
  }
  var Gn = null;
  function cf(l) {
    if (((Gn = null), (l = We(l)), l !== null)) {
      var t = H(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (((l = J(t)), l !== null)) return l;
          l = null;
        } else if (e === 31) {
          if (((l = F(t)), l !== null)) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return ((Gn = l), null);
  }
  function r0(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (q0()) {
          case xf:
            return 2;
          case Ef:
            return 8;
          case ju:
          case B0:
            return 32;
          case Tf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ff = !1,
    Ee = null,
    Te = null,
    ze = null,
    Eu = new Map(),
    Tu = new Map(),
    Ae = [],
    Fr =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function y0(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Ee = null;
        break;
      case "dragenter":
      case "dragleave":
        Te = null;
        break;
      case "mouseover":
      case "mouseout":
        ze = null;
        break;
      case "pointerover":
      case "pointerout":
        Eu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Tu.delete(t.pointerId);
    }
  }
  function zu(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n
      ? ((l = {
          blockedOn: t,
          domEventName: e,
          eventSystemFlags: a,
          nativeEvent: n,
          targetContainers: [u],
        }),
        t !== null && ((t = ke(t)), t !== null && o0(t)),
        l)
      : ((l.eventSystemFlags |= a),
        (t = l.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        l);
  }
  function Ir(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return ((Ee = zu(Ee, l, t, e, a, u)), !0);
      case "dragenter":
        return ((Te = zu(Te, l, t, e, a, u)), !0);
      case "mouseover":
        return ((ze = zu(ze, l, t, e, a, u)), !0);
      case "pointerover":
        var n = u.pointerId;
        return (Eu.set(n, zu(Eu.get(n) || null, l, t, e, a, u)), !0);
      case "gotpointercapture":
        return (
          (n = u.pointerId),
          Tu.set(n, zu(Tu.get(n) || null, l, t, e, a, u)),
          !0
        );
    }
    return !1;
  }
  function h0(l) {
    var t = We(l.target);
    if (t !== null) {
      var e = H(t);
      if (e !== null) {
        if (((t = e.tag), t === 13)) {
          if (((t = J(e)), t !== null)) {
            ((l.blockedOn = t),
              Of(l.priority, function () {
                m0(e);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = F(e)), t !== null)) {
            ((l.blockedOn = t),
              Of(l.priority, function () {
                m0(e);
              }));
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Xn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = nf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(e.type, e);
        ((cc = a), e.target.dispatchEvent(a), (cc = null));
      } else return ((t = ke(e)), t !== null && o0(t), (l.blockedOn = e), !1);
      t.shift();
    }
    return !0;
  }
  function v0(l, t, e) {
    Xn(l) && e.delete(t);
  }
  function Pr() {
    ((ff = !1),
      Ee !== null && Xn(Ee) && (Ee = null),
      Te !== null && Xn(Te) && (Te = null),
      ze !== null && Xn(ze) && (ze = null),
      Eu.forEach(v0),
      Tu.forEach(v0));
  }
  function Qn(l, t) {
    l.blockedOn === t &&
      ((l.blockedOn = null),
      ff ||
        ((ff = !0),
        x.unstable_scheduleCallback(x.unstable_NormalPriority, Pr)));
  }
  var Zn = null;
  function g0(l) {
    Zn !== l &&
      ((Zn = l),
      x.unstable_scheduleCallback(x.unstable_NormalPriority, function () {
        Zn === l && (Zn = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t],
            a = l[t + 1],
            u = l[t + 2];
          if (typeof a != "function") {
            if (cf(a || e) === null) continue;
            break;
          }
          var n = ke(e);
          n !== null &&
            (l.splice(t, 3),
            (t -= 3),
            ni(n, { pending: !0, data: u, method: e.method, action: a }, a, u));
        }
      }));
  }
  function _a(l) {
    function t(s) {
      return Qn(s, l);
    }
    (Ee !== null && Qn(Ee, l),
      Te !== null && Qn(Te, l),
      ze !== null && Qn(ze, l),
      Eu.forEach(t),
      Tu.forEach(t));
    for (var e = 0; e < Ae.length; e++) {
      var a = Ae[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ae.length && ((e = Ae[0]), e.blockedOn === null); )
      (h0(e), e.blockedOn === null && Ae.shift());
    if (((e = (l.ownerDocument || l).$$reactFormReplay), e != null))
      for (a = 0; a < e.length; a += 3) {
        var u = e[a],
          n = e[a + 1],
          c = u[$l] || null;
        if (typeof n == "function") c || g0(e);
        else if (c) {
          var i = null;
          if (n && n.hasAttribute("formAction")) {
            if (((u = n), (c = n[$l] || null))) i = c.formAction;
            else if (cf(u) !== null) continue;
          } else i = c.action;
          (typeof i == "function" ? (e[a + 1] = i) : (e.splice(a, 3), (a -= 3)),
            g0(e));
        }
      }
  }
  function S0() {
    function l(n) {
      n.canIntercept &&
        n.info === "react-transition" &&
        n.intercept({
          handler: function () {
            return new Promise(function (c) {
              return (u = c);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      (u !== null && (u(), (u = null)), a || setTimeout(e, 20));
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n &&
          n.url != null &&
          navigation.navigate(n.url, {
            state: n.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var a = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", l),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(e, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener("navigate", l),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function sf(l) {
    this._internalRoot = l;
  }
  ((Vn.prototype.render = sf.prototype.render =
    function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var e = t.current,
        a = mt();
      s0(e, a, l, t, null, null);
    }),
    (Vn.prototype.unmount = sf.prototype.unmount =
      function () {
        var l = this._internalRoot;
        if (l !== null) {
          this._internalRoot = null;
          var t = l.containerInfo;
          (s0(l.current, 2, null, l, null, null), zn(), (t[we] = null));
        }
      }));
  function Vn(l) {
    this._internalRoot = l;
  }
  Vn.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = jf();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ae.length && t !== 0 && t < Ae[e].priority; e++);
      (Ae.splice(e, 0, l), e === 0 && h0(l));
    }
  };
  var b0 = D.version;
  if (b0 !== "19.2.7") throw Error(r(527, b0, "19.2.7"));
  p.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function"
        ? Error(r(188))
        : ((l = Object.keys(l).join(",")), Error(r(268, l)));
    return (
      (l = S(t)),
      (l = l !== null ? V(l) : null),
      (l = l === null ? null : l.stateNode),
      l
    );
  };
  var ly = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: E,
    reconcilerVersion: "19.2.7",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ln = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ln.isDisabled && Ln.supportsFiber)
      try {
        ((Ua = Ln.inject(ly)), (ut = Ln));
      } catch {}
  }
  return (
    (pu.createRoot = function (l, t) {
      if (!j(l)) throw Error(r(299));
      var e = !1,
        a = "",
        u = pd,
        n = Nd,
        c = jd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (e = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (n = t.onCaughtError),
          t.onRecoverableError !== void 0 && (c = t.onRecoverableError)),
        (t = i0(l, 1, !1, null, null, e, a, null, u, n, c, S0)),
        (l[we] = t.current),
        Vi(l),
        new sf(t)
      );
    }),
    (pu.hydrateRoot = function (l, t, e) {
      if (!j(l)) throw Error(r(299));
      var a = !1,
        u = "",
        n = pd,
        c = Nd,
        i = jd,
        s = null;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (u = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (n = e.onUncaughtError),
          e.onCaughtError !== void 0 && (c = e.onCaughtError),
          e.onRecoverableError !== void 0 && (i = e.onRecoverableError),
          e.formState !== void 0 && (s = e.formState)),
        (t = i0(l, 1, !0, t, e ?? null, a, u, s, n, c, i, S0)),
        (t.context = f0(null)),
        (e = t.current),
        (a = mt()),
        (a = In(a)),
        (u = se(a)),
        (u.callback = null),
        de(e, u, a),
        (e = a),
        (t.current.lanes = e),
        Ca(t, e),
        Rt(t),
        (l[we] = t.current),
        Vi(l),
        new Vn(t)
      );
    }),
    (pu.version = "19.2.7"),
    pu
  );
}
var M0;
function dy() {
  if (M0) return mf.exports;
  M0 = 1;
  function x() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(x);
      } catch (D) {
        console.error(D);
      }
  }
  return (x(), (mf.exports = sy()), mf.exports);
}
var oy = dy();
let vf = null;
function _0(x) {
  vf = x;
}
async function D0(x, D, R) {
  const r = { "Content-Type": "application/json" };
  vf && (r["X-Session-Token"] = vf);
  const j = await fetch(D, {
      method: x,
      headers: r,
      body: R === void 0 ? void 0 : JSON.stringify(R),
    }),
    H = await j.text(),
    J = H ? JSON.parse(H) : {};
  if (!j.ok) {
    const F = J;
    throw new Error(F.error || `Request failed (${j.status})`);
  }
  return J;
}
const Kl = { get: (x) => D0("GET", x), post: (x, D) => D0("POST", x, D) };
function my(x) {
  const { user: D, secure: R } = x;
  return f.jsx("header", {
    className: "border-b-4 border-[var(--cimb-red)] bg-white",
    children: f.jsxs("div", {
      className:
        "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3",
      children: [
        f.jsxs("div", {
          className: "flex items-baseline gap-2",
          children: [
            f.jsx("span", {
              className: "text-2xl font-black italic text-[var(--cimb-red)]",
              children: "CIMB",
            }),
            f.jsx("span", {
              className: "text-2xl font-light italic text-gray-700",
              children: "Clicks",
            }),
            f.jsx("span", {
              className:
                "ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600",
              children: "Security Demo",
            }),
          ],
        }),
        f.jsxs("div", {
          className: "flex items-center gap-4",
          children: [
            f.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                f.jsx("span", {
                  className: `text-xs font-bold ${R ? "text-green-700" : "text-[var(--cimb-red)]"}`,
                  children: R
                    ? "SECURE MODE: ON (fixed)"
                    : "SECURE MODE: OFF (vulnerable)",
                }),
                f.jsx("button", {
                  role: "switch",
                  "aria-checked": R,
                  onClick: () => x.onToggleSecure(!R),
                  className: `relative h-6 w-12 rounded-full transition ${R ? "bg-green-600" : "bg-gray-400"}`,
                  title: "Toggle Secure Mode",
                  children: f.jsx("span", {
                    className: `absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${R ? "left-6" : "left-0.5"}`,
                  }),
                }),
              ],
            }),
            D &&
              f.jsxs("div", {
                className: "flex items-center gap-3",
                children: [
                  f.jsxs("div", {
                    className: "text-right",
                    children: [
                      f.jsx("div", {
                        className: "text-sm font-semibold text-gray-800",
                        children: D.displayName,
                      }),
                      f.jsxs("div", {
                        className: "text-xs text-gray-500",
                        children: [
                          "role: ",
                          f.jsx("span", {
                            className: "font-semibold",
                            children: D.role,
                          }),
                        ],
                      }),
                    ],
                  }),
                  f.jsx("button", {
                    onClick: x.onLogout,
                    className:
                      "rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50",
                    children: "Logout",
                  }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
function Ot(x) {
  return f.jsxs("section", {
    className: "rounded-lg border border-gray-200 bg-white shadow-sm",
    children: [
      f.jsxs("div", {
        className:
          "flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-4 py-3",
        children: [
          f.jsx("h2", {
            className: "text-base font-semibold text-gray-800",
            children: x.title,
          }),
          f.jsxs("div", {
            className: "flex gap-2",
            children: [
              x.cwe &&
                f.jsx("span", {
                  className:
                    "rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-[var(--cimb-red)]",
                  children: x.cwe,
                }),
              x.sr &&
                f.jsx("span", {
                  className:
                    "rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600",
                  children: x.sr,
                }),
            ],
          }),
        ],
      }),
      f.jsx("div", { className: "px-4 py-4", children: x.children }),
    ],
  });
}
function Ct(x) {
  const D =
      "rounded px-4 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed",
    R = {
      primary: "bg-[var(--cimb-red)] text-white hover:brightness-95",
      dark: "bg-gray-800 text-white hover:bg-gray-700",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    };
  return f.jsx("button", {
    type: x.type ?? "button",
    onClick: x.onClick,
    disabled: x.disabled,
    className: `${D} ${R[x.variant ?? "primary"]}`,
    children: x.children,
  });
}
function jt(x) {
  return f.jsxs("label", {
    className: "block",
    children: [
      f.jsx("span", {
        className: "mb-1 block text-xs font-medium text-gray-600",
        children: x.label,
      }),
      f.jsx("input", {
        type: x.type ?? "text",
        value: x.value,
        placeholder: x.placeholder,
        onChange: (D) => x.onChange(D.target.value),
        className:
          "w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[var(--cimb-red)]",
      }),
    ],
  });
}
function le(x) {
  const D = {
    ok: "bg-green-50 text-green-800 border-green-200",
    err: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };
  return f.jsx("div", {
    className: `rounded border px-3 py-2 text-sm ${D[x.kind]}`,
    children: x.children,
  });
}
function ry(x) {
  const [D, R] = Z.useState("user"),
    [r, j] = Z.useState("Password1!"),
    [H, J] = Z.useState(null),
    [F, O] = Z.useState(null),
    [S, V] = Z.useState(""),
    [C, Y] = Z.useState(null),
    [xl, gl] = Z.useState(!1);
  async function Sl() {
    (gl(!0), Y(null));
    try {
      const I = await Kl.post("/api/auth/login", { username: D, password: r });
      I.mfaRequired
        ? (J(I.challengeId),
          O(I.demoOtp ?? null),
          Y({
            kind: "info",
            text: "Password accepted. Enter the Secure2u OTP below.",
          }))
        : I.success && I.token && I.user && x.onLogin(I.user, I.token);
    } catch (I) {
      Y({ kind: "err", text: I.message });
    } finally {
      gl(!1);
    }
  }
  async function Ul() {
    (gl(!0), Y(null));
    try {
      const I = await Kl.post("/api/auth/verify-otp", {
        challengeId: H,
        code: S,
      });
      I.success && I.token && I.user && x.onLogin(I.user, I.token);
    } catch (I) {
      Y({ kind: "err", text: I.message });
    } finally {
      gl(!1);
    }
  }
  function ul() {
    j((I) => I + "IGNORED_EXTRA");
  }
  return f.jsx("div", {
    className: "mx-auto max-w-md",
    children: f.jsxs(Ot, {
      title: "Module 1 — Login (Authentication)",
      cwe: "CWE-303",
      sr: "SR2",
      children: [
        f.jsx("p", {
          className: "mb-3 text-sm text-gray-600",
          children: "Please enter your login credentials.",
        }),
        !H &&
          f.jsxs("div", {
            className: "space-y-3",
            children: [
              f.jsx(jt, { label: "User ID", value: D, onChange: R }),
              f.jsx(jt, {
                label: "Password",
                value: r,
                onChange: j,
                type: "text",
              }),
              f.jsxs("div", {
                className:
                  "rounded border border-dashed border-gray-300 bg-gray-50 p-2 text-xs text-gray-600",
                children: [
                  f.jsx("p", {
                    className: "font-semibold text-gray-700",
                    children: "CWE-303 attack demo",
                  }),
                  f.jsxs("p", {
                    children: [
                      "The seeded password is ",
                      f.jsx("code", {
                        className: "font-mono",
                        children: "Password1!",
                      }),
                      ". Append extra characters and log in:",
                    ],
                  }),
                  f.jsxs("ul", {
                    className: "ml-4 mt-1 list-disc",
                    children: [
                      f.jsxs("li", {
                        children: [
                          f.jsx("b", { children: "Secure OFF" }),
                          ": the correct password + junk still logs in (truncated match).",
                        ],
                      }),
                      f.jsxs("li", {
                        children: [
                          f.jsx("b", { children: "Secure ON" }),
                          ": the full password is compared exactly — junk is rejected.",
                        ],
                      }),
                    ],
                  }),
                  f.jsx("button", {
                    onClick: ul,
                    className: "mt-1 text-[var(--cimb-red)] underline",
                    children: 'Append "IGNORED_EXTRA" to password',
                  }),
                ],
              }),
              f.jsx(Ct, {
                type: "button",
                onClick: Sl,
                disabled: xl,
                children: "Login",
              }),
            ],
          }),
        H &&
          f.jsxs("div", {
            className: "space-y-3",
            children: [
              F &&
                f.jsxs(le, {
                  kind: "info",
                  children: [
                    "Secure2u (demo): your current OTP is",
                    " ",
                    f.jsx("span", {
                      className: "font-mono text-lg font-bold",
                      children: F,
                    }),
                  ],
                }),
              f.jsx(jt, {
                label: "Enter OTP",
                value: S,
                onChange: V,
                placeholder: "6-digit code",
              }),
              f.jsx(Ct, {
                type: "button",
                onClick: Ul,
                disabled: xl,
                children: "Verify OTP",
              }),
            ],
          }),
        C &&
          f.jsx("div", {
            className: "mt-3",
            children: f.jsx(le, { kind: C.kind, children: C.text }),
          }),
        f.jsxs("div", {
          className: "mt-4 text-xs text-gray-500",
          children: [
            "Demo accounts: ",
            f.jsx("b", { children: "user / Password1!" }),
            " (customer)  · ",
            " ",
            f.jsx("b", { children: "admin / Admin123!" }),
            " (admin)",
            f.jsx("br", {}),
            "Mode is currently",
            " ",
            f.jsx("b", {
              className: x.secure ? "text-green-700" : "text-[var(--cimb-red)]",
              children: x.secure ? "SECURE (ON)" : "VULNERABLE (OFF)",
            }),
            ".",
          ],
        }),
      ],
    }),
  });
}
function yy() {
  const [x, D] = Z.useState([]),
    [R, r] = Z.useState(null);
  return (
    Z.useEffect(() => {
      Kl.get("/api/accounts")
        .then((j) => D(j.accounts))
        .catch((j) => r(j.message));
    }, []),
    f.jsxs(Ot, {
      title: "My Accounts Overview",
      children: [
        R && f.jsx("p", { className: "text-sm text-red-700", children: R }),
        f.jsx("div", {
          className: "overflow-x-auto",
          children: f.jsxs("table", {
            className: "w-full text-sm",
            children: [
              f.jsx("thead", {
                children: f.jsxs("tr", {
                  className:
                    "border-b text-left text-xs uppercase text-gray-500",
                  children: [
                    f.jsx("th", { className: "py-2", children: "Account" }),
                    f.jsx("th", { children: "Number" }),
                    f.jsx("th", { children: "NRIC" }),
                    f.jsx("th", { children: "Card" }),
                    f.jsx("th", {
                      className: "text-right",
                      children: "Balance (MYR)",
                    }),
                  ],
                }),
              }),
              f.jsx("tbody", {
                children: x.map((j) =>
                  f.jsxs(
                    "tr",
                    {
                      className: "border-b last:border-0",
                      children: [
                        f.jsx("td", {
                          className: "py-2 font-medium",
                          children: j.accountName,
                        }),
                        f.jsx("td", {
                          className: "font-mono text-gray-600",
                          children: j.accountNumber,
                        }),
                        f.jsx("td", {
                          className: "font-mono text-gray-600",
                          children: j.nric,
                        }),
                        f.jsx("td", {
                          className: "font-mono text-gray-600",
                          children: j.cardNumber,
                        }),
                        f.jsx("td", {
                          className: "text-right font-semibold",
                          children: Number(j.balance).toFixed(2),
                        }),
                      ],
                    },
                    j.id,
                  ),
                ),
              }),
            ],
          }),
        }),
        f.jsxs("p", {
          className: "mt-3 text-xs text-gray-500",
          children: [
            "This is the application view (sensitive fields decrypted for the owner). To see how the same fields sit in storage, open the ",
            f.jsx("b", { children: "Encryption / Raw DB" }),
            " tab.",
          ],
        }),
      ],
    })
  );
}
function hy(x) {
  const [D, R] = Z.useState("Shopee MY"),
    [r, j] = Z.useState("250.00"),
    [H, J] = Z.useState("4111 1111 1111 1111"),
    [F, O] = Z.useState("12/28"),
    [S, V] = Z.useState("123"),
    [C, Y] = Z.useState(!1),
    [xl, gl] = Z.useState(!1),
    [Sl, Ul] = Z.useState(null),
    [ul, I] = Z.useState([]),
    [Nl, ql] = Z.useState(!1);
  async function Rl() {
    const q = await Kl.get("/api/payments");
    I(q.payments);
  }
  Z.useEffect(() => {
    Rl().catch(() => {});
  }, []);
  async function Vl() {
    (ql(!0), Ul(null));
    try {
      let q = { amount: r, merchant: D, cardNumber: H, expiry: F, cvv: S };
      if (x.secure) {
        const Wl = await Kl.post("/api/payments/prepare", {
          amount: r,
          merchant: D,
          cardNumber: H,
        });
        q = {
          ...q,
          paymentRef: Wl.paymentRef,
          signature: Wl.signature,
          amount: C ? (Number(r) + 100).toFixed(2) : r,
          otp: xl ? "000000" : Wl.demoOtp,
        };
      }
      const Bl = await Kl.post("/api/payments/pay", q);
      Ul({ kind: "ok", text: `${Bl.status} — ${Bl.note}` });
    } catch (q) {
      Ul({ kind: "err", text: q.message });
    } finally {
      (ql(!1), Rl().catch(() => {}));
    }
  }
  return f.jsxs("div", {
    className: "grid gap-4 lg:grid-cols-2",
    children: [
      f.jsxs(Ot, {
        title: "Module 2 — Card Payment",
        cwe: "CWE-345",
        sr: "SR3",
        children: [
          f.jsxs("div", {
            className: "grid grid-cols-2 gap-3",
            children: [
              f.jsx(jt, { label: "Merchant", value: D, onChange: R }),
              f.jsx(jt, { label: "Amount (MYR)", value: r, onChange: j }),
              f.jsx("div", {
                className: "col-span-2",
                children: f.jsx(jt, {
                  label: "Card Number",
                  value: H,
                  onChange: J,
                }),
              }),
              f.jsx(jt, { label: "Expiry", value: F, onChange: O }),
              f.jsx(jt, {
                label: "CVV",
                value: S,
                onChange: V,
                type: "password",
              }),
            ],
          }),
          x.secure &&
            f.jsxs("div", {
              className:
                "mt-3 space-y-1 rounded border border-dashed border-gray-300 bg-gray-50 p-2 text-xs text-gray-600",
              children: [
                f.jsx("p", {
                  className: "font-semibold text-gray-700",
                  children: "Secure-mode attack simulations",
                }),
                f.jsxs("label", {
                  className: "flex items-center gap-2",
                  children: [
                    f.jsx("input", {
                      type: "checkbox",
                      checked: C,
                      onChange: (q) => Y(q.target.checked),
                    }),
                    "Tamper amount after signing (should be rejected — altered instruction)",
                  ],
                }),
                f.jsxs("label", {
                  className: "flex items-center gap-2",
                  children: [
                    f.jsx("input", {
                      type: "checkbox",
                      checked: xl,
                      onChange: (q) => gl(q.target.checked),
                    }),
                    "Send wrong OTP (should be rejected)",
                  ],
                }),
              ],
            }),
          f.jsx("div", {
            className: "mt-3",
            children: f.jsx(Ct, {
              onClick: Vl,
              disabled: Nl,
              children: x.secure ? "Pay (3DS: OTP + signed)" : "Pay (non-3DS)",
            }),
          }),
          f.jsx("p", {
            className: "mt-3 text-xs text-gray-500",
            children: x.secure
              ? "Secure ON: the server verifies a signed payment instruction and a valid OTP; unsigned/altered requests are rejected."
              : "Secure OFF: the payment completes with only card details — no OTP, no server verification (non-3DS).",
          }),
          Sl &&
            f.jsx("div", {
              className: "mt-3",
              children: f.jsx(le, { kind: Sl.kind, children: Sl.text }),
            }),
        ],
      }),
      f.jsx(Ot, {
        title: "Recent Payments",
        children: f.jsx("div", {
          className: "max-h-80 overflow-auto",
          children: f.jsxs("table", {
            className: "w-full text-xs",
            children: [
              f.jsx("thead", {
                children: f.jsxs("tr", {
                  className: "border-b text-left uppercase text-gray-500",
                  children: [
                    f.jsx("th", { className: "py-1", children: "Merchant" }),
                    f.jsx("th", { children: "Amount" }),
                    f.jsx("th", { children: "Card" }),
                    f.jsx("th", { children: "Status" }),
                    f.jsx("th", { children: "Mode" }),
                  ],
                }),
              }),
              f.jsx("tbody", {
                children: ul.map((q) =>
                  f.jsxs(
                    "tr",
                    {
                      className: "border-b last:border-0 align-top",
                      children: [
                        f.jsx("td", {
                          className: "py-1",
                          children: q.merchant,
                        }),
                        f.jsx("td", { children: Number(q.amount).toFixed(2) }),
                        f.jsxs("td", {
                          className: "font-mono",
                          children: ["****", q.cardLast4],
                        }),
                        f.jsx("td", {
                          className:
                            q.status === "COMPLETED"
                              ? "font-semibold text-green-700"
                              : "font-semibold text-red-700",
                          children: q.status,
                        }),
                        f.jsx("td", {
                          children: q.secureMode ? "SECURE" : "VULN",
                        }),
                      ],
                    },
                    q.id,
                  ),
                ),
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
function U0() {
  return crypto.randomUUID();
}
function vy(x) {
  const [D, R] = Z.useState("7048123945"),
    [r, j] = Z.useState("8012345678"),
    [H, J] = Z.useState("100.00"),
    [F, O] = Z.useState(U0()),
    [S, V] = Z.useState([]),
    [C, Y] = Z.useState([]),
    [xl, gl] = Z.useState(!1);
  async function Sl() {
    const ul = await Kl.get("/api/transfers");
    Y(ul.transfers);
  }
  Z.useEffect(() => {
    Sl().catch(() => {});
  }, []);
  async function Ul(ul) {
    (gl(!0), V([]));
    const I = { fromAccount: D, toAccount: r, amount: H, idempotencyKey: F },
      Nl = Array.from({ length: ul }, () =>
        Kl.post("/api/transfers", I)
          .then((Rl) => ({
            kind: "ok",
            text: `${Rl.status} — new source balance MYR ${Number(Rl.newSourceBalance).toFixed(2)}`,
          }))
          .catch((Rl) => ({ kind: "err", text: Rl.message })),
      ),
      ql = await Promise.all(Nl);
    (V(ql), gl(!1), Sl().catch(() => {}));
  }
  return f.jsxs("div", {
    className: "grid gap-4 lg:grid-cols-2",
    children: [
      f.jsxs(Ot, {
        title: "Module 3 — Fund Transfer",
        cwe: "CWE-840",
        sr: "SR5",
        children: [
          f.jsxs("div", {
            className: "grid grid-cols-2 gap-3",
            children: [
              f.jsx(jt, { label: "From Account", value: D, onChange: R }),
              f.jsx(jt, { label: "To Account", value: r, onChange: j }),
              f.jsx(jt, { label: "Amount (MYR)", value: H, onChange: J }),
              f.jsx("div", {
                className: "flex items-end",
                children: f.jsx("button", {
                  onClick: () => O(U0()),
                  className: "text-xs text-[var(--cimb-red)] underline",
                  children: "regenerate idempotency key",
                }),
              }),
            ],
          }),
          f.jsxs("p", {
            className: "mt-2 break-all text-xs text-gray-500",
            children: [
              "idempotency key: ",
              f.jsx("span", { className: "font-mono", children: F }),
            ],
          }),
          f.jsxs("div", {
            className: "mt-3 flex flex-wrap gap-2",
            children: [
              f.jsx(Ct, {
                onClick: () => Ul(1),
                disabled: xl,
                children: "Submit once",
              }),
              f.jsx(Ct, {
                variant: "dark",
                onClick: () => Ul(2),
                disabled: xl,
                children: "Fire the SAME transfer twice",
              }),
            ],
          }),
          f.jsx("p", {
            className: "mt-3 text-xs text-gray-500",
            children: x.secure
              ? "Secure ON: the duplicate carries the same idempotency key and is rejected (409) — the account is debited only once."
              : "Secure OFF: the idempotency key is ignored — firing twice debits the account twice.",
          }),
          S.length > 0 &&
            f.jsx("div", {
              className: "mt-3 space-y-2",
              children: S.map((ul, I) =>
                f.jsxs(
                  le,
                  {
                    kind: ul.kind,
                    children: ["Request #", I + 1, ": ", ul.text],
                  },
                  I,
                ),
              ),
            }),
        ],
      }),
      f.jsx(Ot, {
        title: "Recent Transfers",
        children: f.jsx("div", {
          className: "max-h-80 overflow-auto",
          children: f.jsxs("table", {
            className: "w-full text-xs",
            children: [
              f.jsx("thead", {
                children: f.jsxs("tr", {
                  className: "border-b text-left uppercase text-gray-500",
                  children: [
                    f.jsx("th", { className: "py-1", children: "From" }),
                    f.jsx("th", { children: "To" }),
                    f.jsx("th", { children: "Amount" }),
                    f.jsx("th", { children: "Status" }),
                    f.jsx("th", { children: "Mode" }),
                  ],
                }),
              }),
              f.jsx("tbody", {
                children: C.map((ul) =>
                  f.jsxs(
                    "tr",
                    {
                      className: "border-b last:border-0",
                      children: [
                        f.jsx("td", {
                          className: "py-1 font-mono",
                          children: ul.fromAccount,
                        }),
                        f.jsx("td", {
                          className: "font-mono",
                          children: ul.toAccount,
                        }),
                        f.jsx("td", { children: Number(ul.amount).toFixed(2) }),
                        f.jsx("td", {
                          className: "font-semibold text-green-700",
                          children: ul.status,
                        }),
                        f.jsx("td", {
                          children: ul.secureMode ? "SECURE" : "VULN",
                        }),
                      ],
                    },
                    ul.id,
                  ),
                ),
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
function gy(x) {
  const [D, R] = Z.useState([]),
    [r, j] = Z.useState(null),
    [H, J] = Z.useState(null),
    [F, O] = Z.useState(null);
  async function S() {
    j(null);
    try {
      const Y = await Kl.get("/api/accounts/raw");
      R(Y.rows);
    } catch (Y) {
      j(Y.message);
    }
  }
  Z.useEffect(() => {
    S().catch(() => {});
  }, [x.secure]);
  async function V() {
    J(null);
    try {
      const Y = await Kl.post("/api/accounts/repersist");
      (J({ kind: "ok", text: Y.message }), S());
    } catch (Y) {
      J({ kind: "err", text: Y.message });
    }
  }
  async function C() {
    J(null);
    try {
      const Y = await Kl.post("/api/accounts/backup");
      (O(Y),
        J({
          kind: "ok",
          text: `Backup written to ${Y.path} (${Y.encrypted ? "AES-256 encrypted" : "PLAINTEXT"})`,
        }));
    } catch (Y) {
      J({ kind: "err", text: Y.message });
    }
  }
  return x.user.role !== "ADMIN"
    ? f.jsx(Ot, {
        title: "Module 4 — Raw Database View",
        cwe: "CWE-311",
        sr: "SR1 / SR6 / SR7",
        children: f.jsxs(le, {
          kind: "err",
          children: [
            "Access denied. The Raw Database View is restricted to the ",
            f.jsx("b", { children: "admin" }),
            " role (SR7). You are signed in as ",
            f.jsx("b", { children: x.user.role }),
            ". Log in as ",
            f.jsx("b", { children: "admin / Admin123!" }),
            " to view it.",
          ],
        }),
      })
    : f.jsxs("div", {
        className: "space-y-4",
        children: [
          f.jsxs(Ot, {
            title: "Module 4 — Raw Database View (reads straight from storage)",
            cwe: "CWE-311",
            sr: "SR1 / SR6",
            children: [
              f.jsxs("div", {
                className: "mb-3 flex flex-wrap items-center gap-2",
                children: [
                  f.jsx(Ct, {
                    variant: "dark",
                    onClick: V,
                    children: "Re-persist accounts in current mode",
                  }),
                  f.jsx(Ct, {
                    variant: "outline",
                    onClick: S,
                    children: "Refresh raw view",
                  }),
                  f.jsx(Ct, {
                    variant: "outline",
                    onClick: C,
                    children: "Export mock backup file",
                  }),
                  f.jsx("span", {
                    className: `text-xs font-bold ${x.secure ? "text-green-700" : "text-[var(--cimb-red)]"}`,
                    children: x.secure
                      ? "SECURE ON → new writes are AES-256 encrypted"
                      : "SECURE OFF → writes are plaintext",
                  }),
                ],
              }),
              H &&
                f.jsx("div", {
                  className: "mb-3",
                  children: f.jsx(le, { kind: H.kind, children: H.text }),
                }),
              r && f.jsx(le, { kind: "err", children: r }),
              f.jsx("div", {
                className: "overflow-x-auto",
                children: f.jsxs("table", {
                  className: "w-full text-xs",
                  children: [
                    f.jsx("thead", {
                      children: f.jsxs("tr", {
                        className: "border-b text-left uppercase text-gray-500",
                        children: [
                          f.jsx("th", {
                            className: "py-1",
                            children: "Account",
                          }),
                          f.jsx("th", { children: "NRIC (stored)" }),
                          f.jsx("th", { children: "Card Number (stored)" }),
                          f.jsx("th", { children: "At rest" }),
                        ],
                      }),
                    }),
                    f.jsx("tbody", {
                      children: D.map((Y) =>
                        f.jsxs(
                          "tr",
                          {
                            className: "border-b last:border-0 align-top",
                            children: [
                              f.jsx("td", {
                                className: "py-1 font-mono",
                                children: Y.accountNumber,
                              }),
                              f.jsx("td", {
                                className:
                                  "max-w-[220px] break-all font-mono text-gray-700",
                                children: Y.nric,
                              }),
                              f.jsx("td", {
                                className:
                                  "max-w-[220px] break-all font-mono text-gray-700",
                                children: Y.cardNumber,
                              }),
                              f.jsx("td", {
                                children: Y.encrypted
                                  ? f.jsx("span", {
                                      className: "font-semibold text-green-700",
                                      children: "encrypted",
                                    })
                                  : f.jsx("span", {
                                      className: "font-semibold text-red-700",
                                      children: "plaintext",
                                    }),
                              }),
                            ],
                          },
                          Y.id,
                        ),
                      ),
                    }),
                  ],
                }),
              }),
              f.jsxs("p", {
                className: "mt-3 text-xs text-gray-500",
                children: [
                  "This panel dumps the exact bytes on disk with no decryption. Flip Secure Mode, click",
                  " ",
                  f.jsx("b", { children: "Re-persist accounts" }),
                  ", and watch NRIC / card number change from readable plaintext to",
                  " ",
                  f.jsx("span", {
                    className: "font-mono",
                    children: "enc:v1:…",
                  }),
                  " ciphertext.",
                ],
              }),
            ],
          }),
          F &&
            f.jsxs(Ot, {
              title: "Mock Backup Export (on disk)",
              cwe: "CWE-311",
              sr: "SR6",
              children: [
                f.jsxs("p", {
                  className: "mb-2 text-xs text-gray-500",
                  children: [
                    "File: ",
                    f.jsx("span", { className: "font-mono", children: F.path }),
                    " —",
                    " ",
                    F.encrypted
                      ? f.jsx("span", {
                          className: "font-semibold text-green-700",
                          children: "AES-256 encrypted",
                        })
                      : f.jsx("span", {
                          className: "font-semibold text-red-700",
                          children: "PLAINTEXT (readable)",
                        }),
                  ],
                }),
                f.jsx("pre", {
                  className:
                    "max-h-64 overflow-auto rounded bg-gray-900 p-3 text-[11px] text-green-200",
                  children: F.preview,
                }),
              ],
            }),
        ],
      });
}
function Sy(x) {
  const [D, R] = Z.useState([]),
    [r, j] = Z.useState(null),
    [H, J] = Z.useState(null);
  async function F() {
    j(null);
    try {
      const S = await Kl.get("/api/audit");
      R(S.entries);
    } catch (S) {
      j(S.message);
    }
  }
  Z.useEffect(() => {
    F().catch(() => {});
  }, []);
  async function O() {
    try {
      const S = await Kl.get("/api/audit/verify");
      J(S);
    } catch (S) {
      j(S.message);
    }
  }
  return x.user.role !== "ADMIN"
    ? f.jsx(Ot, {
        title: "Audit Log (hash-chained)",
        sr: "SR5 / SR7",
        children: f.jsxs(le, {
          kind: "err",
          children: [
            "Access denied. The audit log is restricted to the ",
            f.jsx("b", { children: "admin" }),
            " role (SR7). You are signed in as ",
            f.jsx("b", { children: x.user.role }),
            ".",
          ],
        }),
      })
    : f.jsxs(Ot, {
        title: "Audit Log — append-only, SHA-256 hash chain",
        sr: "SR5",
        children: [
          f.jsxs("div", {
            className: "mb-3 flex items-center gap-2",
            children: [
              f.jsx(Ct, {
                variant: "outline",
                onClick: F,
                children: "Refresh",
              }),
              f.jsx(Ct, {
                variant: "dark",
                onClick: O,
                children: "Verify chain integrity",
              }),
              H &&
                f.jsx("span", {
                  className: `text-sm font-bold ${H.valid ? "text-green-700" : "text-red-700"}`,
                  children: H.valid
                    ? `Chain valid over ${H.entries} entries ✓`
                    : "Chain BROKEN — tampering detected ✗",
                }),
            ],
          }),
          r && f.jsx(le, { kind: "err", children: r }),
          f.jsx("div", {
            className: "max-h-96 overflow-auto",
            children: f.jsxs("table", {
              className: "w-full text-xs",
              children: [
                f.jsx("thead", {
                  children: f.jsxs("tr", {
                    className: "border-b text-left uppercase text-gray-500",
                    children: [
                      f.jsx("th", { className: "py-1", children: "#" }),
                      f.jsx("th", { children: "Time" }),
                      f.jsx("th", { children: "Actor" }),
                      f.jsx("th", { children: "Action" }),
                      f.jsx("th", { children: "Details" }),
                      f.jsx("th", { children: "Hash" }),
                    ],
                  }),
                }),
                f.jsx("tbody", {
                  children: D.map((S) =>
                    f.jsxs(
                      "tr",
                      {
                        className: "border-b last:border-0 align-top",
                        children: [
                          f.jsx("td", { className: "py-1", children: S.id }),
                          f.jsx("td", {
                            className: "whitespace-nowrap text-gray-500",
                            children: S.ts.replace("T", " ").slice(0, 19),
                          }),
                          f.jsx("td", { children: S.actor }),
                          f.jsx("td", {
                            className: "font-semibold",
                            children: S.action,
                          }),
                          f.jsx("td", {
                            className:
                              "max-w-[240px] break-words text-gray-600",
                            children: S.details,
                          }),
                          f.jsxs("td", {
                            className: "font-mono text-gray-400",
                            children: [S.entryHash.slice(0, 10), "…"],
                          }),
                        ],
                      },
                      S.id,
                    ),
                  ),
                }),
              ],
            }),
          }),
        ],
      });
}
const by = [
  { id: "accounts", label: "My Accounts" },
  { id: "payment", label: "Card Payment", tag: "CWE-345" },
  { id: "transfer", label: "Fund Transfer", tag: "CWE-840" },
  { id: "encryption", label: "Encryption / Raw DB", tag: "CWE-311" },
  { id: "audit", label: "Audit Log", tag: "SR5" },
];
function xy(x) {
  const [D, R] = Z.useState("accounts");
  return f.jsxs("div", {
    children: [
      f.jsx("div", {
        className: "mb-4 flex flex-wrap gap-2 border-b border-gray-200",
        children: by.map((r) =>
          f.jsxs(
            "button",
            {
              onClick: () => R(r.id),
              className: `-mb-px border-b-2 px-3 py-2 text-sm font-medium ${D === r.id ? "border-[var(--cimb-red)] text-[var(--cimb-red)]" : "border-transparent text-gray-500 hover:text-gray-700"}`,
              children: [
                r.label,
                r.tag &&
                  f.jsx("span", {
                    className:
                      "ml-1 rounded bg-gray-100 px-1 text-[10px] text-gray-500",
                    children: r.tag,
                  }),
              ],
            },
            r.id,
          ),
        ),
      }),
      D === "accounts" && f.jsx(yy, {}),
      D === "payment" && f.jsx(hy, { secure: x.secure }),
      D === "transfer" && f.jsx(vy, { secure: x.secure }),
      D === "encryption" && f.jsx(gy, { user: x.user, secure: x.secure }),
      D === "audit" && f.jsx(Sy, { user: x.user }),
    ],
  });
}
function Ey() {
  const [x, D] = Z.useState(null),
    [R, r] = Z.useState(!1),
    [j, H] = Z.useState(!1);
  Z.useEffect(() => {
    Kl.get("/api/secure-mode")
      .then((S) => r(S.secure))
      .catch(() => {})
      .finally(() => H(!0));
  }, []);
  async function J(S) {
    const V = await Kl.post("/api/secure-mode", { secure: S });
    r(V.secure);
  }
  function F(S, V) {
    (_0(V), D(S));
  }
  function O() {
    (Kl.post("/api/auth/logout").catch(() => {}), _0(null), D(null));
  }
  return j
    ? f.jsxs("div", {
        className: "min-h-screen",
        children: [
          f.jsx(my, { user: x, secure: R, onToggleSecure: J, onLogout: O }),
          f.jsx("main", {
            className: "mx-auto max-w-6xl px-4 py-6",
            children: x
              ? f.jsx(xy, { user: x, secure: R })
              : f.jsx(ry, { secure: R, onLogin: F }),
          }),
          f.jsx("footer", {
            className: "mx-auto max-w-6xl px-4 py-6 text-xs text-gray-500",
            children:
              "Academic prototype — CIMB Clicks Security Demonstration. Not a real bank.",
          }),
        ],
      })
    : null;
}
oy.createRoot(document.getElementById("root")).render(
  f.jsx(Z.StrictMode, { children: f.jsx(Ey, {}) }),
);
