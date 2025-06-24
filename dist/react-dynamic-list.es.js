import ne, { useState as U, useRef as H } from "react";
var $ = { exports: {} }, S = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Z;
function oe() {
  if (Z) return S;
  Z = 1;
  var l = Symbol.for("react.transitional.element"), R = Symbol.for("react.fragment");
  function c(f, n, s) {
    var v = null;
    if (s !== void 0 && (v = "" + s), n.key !== void 0 && (v = "" + n.key), "key" in n) {
      s = {};
      for (var m in n)
        m !== "key" && (s[m] = n[m]);
    } else s = n;
    return n = s.ref, {
      $$typeof: l,
      type: f,
      key: v,
      ref: n !== void 0 ? n : null,
      props: s
    };
  }
  return S.Fragment = R, S.jsx = c, S.jsxs = c, S;
}
var j = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Q;
function ae() {
  return Q || (Q = 1, process.env.NODE_ENV !== "production" && function() {
    function l(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === E ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case u:
          return "Fragment";
        case x:
          return "Profiler";
        case k:
          return "StrictMode";
        case h:
          return "Suspense";
        case z:
          return "SuspenseList";
        case X:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case D:
            return "Portal";
          case N:
            return (e.displayName || "Context") + ".Provider";
          case A:
            return (e._context.displayName || "Context") + ".Consumer";
          case C:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case y:
            return r = e.displayName || null, r !== null ? r : l(e.type) || "Memo";
          case Y:
            r = e._payload, e = e._init;
            try {
              return l(e(r));
            } catch {
            }
        }
      return null;
    }
    function R(e) {
      return "" + e;
    }
    function c(e) {
      try {
        R(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var t = r.error, o = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          o
        ), R(e);
      }
    }
    function f(e) {
      if (e === u) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === Y)
        return "<...>";
      try {
        var r = l(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var e = T.A;
      return e === null ? null : e.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function v(e) {
      if (I.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function m(e, r) {
      function t() {
        q || (q = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      t.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: t,
        configurable: !0
      });
    }
    function d() {
      var e = l(this.type);
      return J[e] || (J[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function O(e, r, t, o, g, b, L, M) {
      return t = b.ref, e = {
        $$typeof: w,
        type: e,
        key: r,
        props: b,
        _owner: g
      }, (t !== void 0 ? t : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: d
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: L
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: M
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function p(e, r, t, o, g, b, L, M) {
      var a = r.children;
      if (a !== void 0)
        if (o)
          if (re(a)) {
            for (o = 0; o < a.length; o++)
              i(a[o]);
            Object.freeze && Object.freeze(a);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else i(a);
      if (I.call(r, "key")) {
        a = l(e);
        var P = Object.keys(r).filter(function(te) {
          return te !== "key";
        });
        o = 0 < P.length ? "{key: someKey, " + P.join(": ..., ") + ": ...}" : "{key: someKey}", B[a + o] || (P = 0 < P.length ? "{" + P.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          o,
          a,
          P,
          a
        ), B[a + o] = !0);
      }
      if (a = null, t !== void 0 && (c(t), a = "" + t), v(r) && (c(r.key), a = "" + r.key), "key" in r) {
        t = {};
        for (var W in r)
          W !== "key" && (t[W] = r[W]);
      } else t = r;
      return a && m(
        t,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), O(
        e,
        a,
        b,
        g,
        n(),
        t,
        L,
        M
      );
    }
    function i(e) {
      typeof e == "object" && e !== null && e.$$typeof === w && e._store && (e._store.validated = 1);
    }
    var _ = ne, w = Symbol.for("react.transitional.element"), D = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), A = Symbol.for("react.consumer"), N = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), z = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), Y = Symbol.for("react.lazy"), X = Symbol.for("react.activity"), E = Symbol.for("react.client.reference"), T = _.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = Object.prototype.hasOwnProperty, re = Array.isArray, F = console.createTask ? console.createTask : function() {
      return null;
    };
    _ = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var q, J = {}, V = _["react-stack-bottom-frame"].bind(
      _,
      s
    )(), G = F(f(s)), B = {};
    j.Fragment = u, j.jsx = function(e, r, t, o, g) {
      var b = 1e4 > T.recentlyCreatedOwnerStacks++;
      return p(
        e,
        r,
        t,
        !1,
        o,
        g,
        b ? Error("react-stack-top-frame") : V,
        b ? F(f(e)) : G
      );
    }, j.jsxs = function(e, r, t, o, g) {
      var b = 1e4 > T.recentlyCreatedOwnerStacks++;
      return p(
        e,
        r,
        t,
        !0,
        o,
        g,
        b ? Error("react-stack-top-frame") : V,
        b ? F(f(e)) : G
      );
    };
  }()), j;
}
var K;
function se() {
  return K || (K = 1, process.env.NODE_ENV === "production" ? $.exports = oe() : $.exports = ae()), $.exports;
}
var ee = se();
const ce = ({
  initialData: l,
  onDragStart: R,
  onDragMove: c,
  onDragEnd: f
}) => {
  const [n, s] = U(l), [v, m] = U(null), [d, O] = U({ x: 0, y: 0 }), p = H(null), i = H(null), _ = (u, k) => {
    const x = u.currentTarget.getBoundingClientRect();
    O({ x: u.clientX - x.left, y: u.clientY - x.top }), m({ x: u.clientX, y: u.clientY }), i.current = k, R == null || R(n, k);
  }, w = () => {
    i.current && (f == null || f(n, i.current), i.current = null), m(null);
  }, D = (u) => {
    if (i.current === null || !p.current) return;
    const k = u.clientX, x = u.clientY;
    m({ x: k, y: x });
    const A = i.current, N = Array.from(p.current.children), C = getComputedStyle(p.current).flexDirection === "row";
    for (let h = 0; h < N.length; h++) {
      const y = N[h].getBoundingClientRect(), Y = C ? y.left + y.width / 2 : y.top + y.height / 2, E = (C ? k : x) < Y ? h : h + 1;
      if (E === A || E > n.length) continue;
      const T = [...n], [I] = T.splice(A, 1);
      T.splice(
        E > A ? E - 1 : E,
        0,
        I
      ), i.current = E > A ? E - 1 : E, s(T), c == null || c(T, i.current);
      break;
    }
  };
  return {
    list: n,
    listRef: p,
    draggingItem: i.current,
    position: v,
    itemDrag: _,
    itemMove: D,
    itemDrop: w
  };
}, le = ({
  items: l,
  renderItem: R,
  getKey: c,
  horizontal: f = !1,
  flexWrap: n = !1,
  onDragStart: s,
  onDragMove: v,
  onDragEnd: m
}) => {
  const d = ce({
    initialData: l,
    onDragStart: s,
    onDragMove: v,
    onDragEnd: m
  });
  return /* @__PURE__ */ ee.jsx(
    "ul",
    {
      ref: d.listRef,
      onMouseMove: d.itemMove,
      onMouseUp: d.itemDrop,
      style: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexWrap: n ? "wrap" : void 0,
        flexDirection: f ? "row" : "column",
        position: "relative"
      },
      children: l.map((O, p) => {
        const _ = d.draggingItem === p && d.position ? {
          position: "fixed",
          left: d.position.x,
          top: d.position.y,
          pointerEvent: "none",
          zIndex: 1e3,
          transform: "scale(1.05)",
          transition: "transform 0.1s ease"
        } : {
          transition: "transform 0.2s ease",
          cursor: "grab"
        };
        return /* @__PURE__ */ ee.jsx(
          "li",
          {
            onMouseDown: (w) => d.itemDrag(w, p),
            style: _,
            children: R(O)
          },
          (c == null ? void 0 : c(O)) || p
        );
      })
    }
  );
};
export {
  le as DynamicList
};
