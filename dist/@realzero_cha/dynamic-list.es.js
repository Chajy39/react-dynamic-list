import oe, { useState as Y, useRef as Q, useEffect as ae } from "react";
var J = { exports: {} }, z = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var K;
function ie() {
  if (K) return z;
  K = 1;
  var n = Symbol.for("react.transitional.element"), b = Symbol.for("react.fragment");
  function R(f, l, i) {
    var d = null;
    if (i !== void 0 && (d = "" + i), l.key !== void 0 && (d = "" + l.key), "key" in l) {
      i = {};
      for (var t in l)
        t !== "key" && (i[t] = l[t]);
    } else i = l;
    return l = i.ref, {
      $$typeof: n,
      type: f,
      key: d,
      ref: l !== void 0 ? l : null,
      props: i
    };
  }
  return z.Fragment = b, z.jsx = R, z.jsxs = R, z;
}
var F = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ee;
function se() {
  return ee || (ee = 1, process.env.NODE_ENV !== "production" && function() {
    function n(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === j ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case p:
          return "Fragment";
        case x:
          return "Profiler";
        case v:
          return "StrictMode";
        case X:
          return "Suspense";
        case L:
          return "SuspenseList";
        case E:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case o:
            return "Portal";
          case A:
            return (e.displayName || "Context") + ".Provider";
          case N:
            return (e._context.displayName || "Context") + ".Consumer";
          case P:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case $:
            return r = e.displayName || null, r !== null ? r : n(e.type) || "Memo";
          case h:
            r = e._payload, e = e._init;
            try {
              return n(e(r));
            } catch {
            }
        }
      return null;
    }
    function b(e) {
      return "" + e;
    }
    function R(e) {
      try {
        b(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var a = r.error, u = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          u
        ), b(e);
      }
    }
    function f(e) {
      if (e === p) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === h)
        return "<...>";
      try {
        var r = n(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function l() {
      var e = C.A;
      return e === null ? null : e.getOwner();
    }
    function i() {
      return Error("react-stack-top-frame");
    }
    function d(e) {
      if (q.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function t(e, r) {
      function a() {
        I || (I = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      a.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: a,
        configurable: !0
      });
    }
    function m() {
      var e = n(this.type);
      return w[e] || (w[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function y(e, r, a, u, O, S, V, G) {
      return a = S.ref, e = {
        $$typeof: _,
        type: e,
        key: r,
        props: S,
        _owner: O
      }, (a !== void 0 ? a : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: m
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
        value: V
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: G
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function g(e, r, a, u, O, S, V, G) {
      var c = r.children;
      if (c !== void 0)
        if (u)
          if (k(c)) {
            for (u = 0; u < c.length; u++)
              s(c[u]);
            Object.freeze && Object.freeze(c);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else s(c);
      if (q.call(r, "key")) {
        c = n(e);
        var M = Object.keys(r).filter(function(ne) {
          return ne !== "key";
        });
        u = 0 < M.length ? "{key: someKey, " + M.join(": ..., ") + ": ...}" : "{key: someKey}", Z[c + u] || (M = 0 < M.length ? "{" + M.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          u,
          c,
          M,
          c
        ), Z[c + u] = !0);
      }
      if (c = null, a !== void 0 && (R(a), c = "" + a), d(r) && (R(r.key), c = "" + r.key), "key" in r) {
        a = {};
        for (var B in r)
          B !== "key" && (a[B] = r[B]);
      } else a = r;
      return c && t(
        a,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), y(
        e,
        c,
        S,
        O,
        l(),
        a,
        V,
        G
      );
    }
    function s(e) {
      typeof e == "object" && e !== null && e.$$typeof === _ && e._store && (e._store.validated = 1);
    }
    var T = oe, _ = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), N = Symbol.for("react.consumer"), A = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), X = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), E = Symbol.for("react.activity"), j = Symbol.for("react.client.reference"), C = T.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = Object.prototype.hasOwnProperty, k = Array.isArray, D = console.createTask ? console.createTask : function() {
      return null;
    };
    T = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var I, w = {}, U = T["react-stack-bottom-frame"].bind(
      T,
      i
    )(), H = D(f(i)), Z = {};
    F.Fragment = p, F.jsx = function(e, r, a, u, O) {
      var S = 1e4 > C.recentlyCreatedOwnerStacks++;
      return g(
        e,
        r,
        a,
        !1,
        u,
        O,
        S ? Error("react-stack-top-frame") : U,
        S ? D(f(e)) : H
      );
    }, F.jsxs = function(e, r, a, u, O) {
      var S = 1e4 > C.recentlyCreatedOwnerStacks++;
      return g(
        e,
        r,
        a,
        !0,
        u,
        O,
        S ? Error("react-stack-top-frame") : U,
        S ? D(f(e)) : H
      );
    };
  }()), F;
}
var te;
function le() {
  return te || (te = 1, process.env.NODE_ENV === "production" ? J.exports = ie() : J.exports = se()), J.exports;
}
var W = le();
const ue = ({
  position: n,
  rects: b,
  horizontal: R,
  flexWrap: f
}) => {
  if (b.length === 0) return -1;
  let l = -1, i = 1 / 0;
  const d = b.reduce(
    (t, m) => (t.top = Math.min(t.top, m.top), t.left = Math.min(t.left, m.left), t.right = Math.max(t.right, m.right), t.bottom = Math.max(t.bottom, m.bottom), t),
    {
      top: 1 / 0,
      left: 1 / 0,
      right: -1 / 0,
      bottom: -1 / 0
    }
  );
  return b.forEach((t, m) => {
    let y;
    if (f)
      if (n.x >= d.left && n.x <= d.right && n.y >= d.top && n.y <= d.bottom) {
        const g = t.left + t.width / 2, s = t.top + t.height / 2;
        y = Math.sqrt(
          Math.pow(n.x - g, 2) + Math.pow(n.y - s, 2)
        );
      } else {
        const g = Math.max(t.left - n.x, 0, n.x - t.right), s = Math.max(t.top - n.y, 0, n.y - t.bottom);
        y = Math.sqrt(Math.pow(g, 2) + Math.pow(s, 2));
      }
    else {
      const g = R ? t.left + t.width / 2 : t.top + t.height / 2;
      y = Math.abs(R ? n.x - g : n.y - g);
    }
    y < i && (i = y, l = m);
  }), l;
}, re = ({
  initialData: n,
  horizontal: b,
  flexWrap: R,
  staticMove: f = !1,
  onDragStart: l,
  onDragMove: i,
  onDragEnd: d
}) => {
  const [t, m] = Y(n), [y, g] = Y(null), [s, T] = Y(
    null
  ), [_, o] = Y(null), [p, v] = Y({ width: 0, height: 0 }), [x, N] = Y(null), A = Q(n), P = Q(null), X = (h, E) => {
    h.preventDefault();
    const j = h.currentTarget.getBoundingClientRect();
    T(E), o(t[E]), v({ width: j.width, height: j.height }), g({
      x: h.clientX,
      y: h.clientY
    }), A.current = t, l?.(t, E);
  }, L = (h) => {
    if (s === null || !P.current) return;
    const E = { x: h.clientX, y: h.clientY };
    g(E);
    const C = Array.from(P.current.children).map((I) => I.getBoundingClientRect()), q = f || s === -1 ? C : C.filter((I, w) => w !== s), k = ue({
      position: E,
      rects: q,
      horizontal: b,
      flexWrap: R
    });
    if (k === -1 || k === null)
      return;
    let D = k;
    if (k >= s && (D = k + 1), f)
      N(k);
    else {
      const I = t.findIndex((w) => w === _);
      if (I !== -1 && D !== I) {
        const w = [...t], [U] = w.splice(I, 1);
        w.splice(D, 0, U), m(w);
      }
    }
    i?.(t, s);
  }, $ = () => {
    if (s === null) return;
    let h = -1;
    if (f)
      if (x !== null && x !== s) {
        const E = [...A.current], [j] = E.splice(s, 1);
        E.splice(x, 0, j), m(E), h = x;
      } else
        m(A.current), h = s;
    else
      h = t.findIndex((E) => E === _);
    d?.(t, h), T(null), o(null), g(null), N(null);
  };
  return ae(() => (_ && (window.addEventListener("mousemove", L), window.addEventListener("mouseup", $)), () => {
    window.removeEventListener("mousemove", L), window.removeEventListener("mouseup", $);
  }), [s, _, x, t, f]), {
    list: t,
    listRef: P,
    draggingItem: s,
    draggingItemData: _,
    position: y,
    dragItemSize: p,
    dropTargetIndex: f ? x : null,
    itemDrag: X,
    itemMove: L,
    itemDrop: $
  };
}, fe = (n) => {
  const {
    items: b,
    renderItem: R,
    getKey: f,
    type: l,
    staticMove: i = !1,
    onDragStart: d,
    onDragMove: t,
    onDragEnd: m,
    containerStyle: y,
    itemStyle: g,
    targetItemStyle: s
  } = n;
  let T = null, _ = null, o = null;
  if (n.type === "grid") {
    const { cols: p, rows: v } = n;
    o = re({
      initialData: b,
      flexWrap: !0,
      staticMove: i,
      onDragStart: d,
      onDragMove: t,
      onDragEnd: m
    }), T = {
      display: "grid",
      gridTemplateColumns: p ? `repeat(${p}, minmax(0, 1fr))` : void 0,
      gridTemplateRows: v ? `repeat(${v}, minmax(0, 1fr))` : void 0
    };
  } else if (n.type === "flex") {
    const { horizontal: p = !1, flexWrap: v = !1, uniformSize: x } = n;
    o = re({
      initialData: b,
      horizontal: p,
      flexWrap: v,
      staticMove: i,
      onDragStart: d,
      onDragMove: t,
      onDragEnd: m
    }), T = {
      display: "flex",
      flexWrap: v ? "wrap" : void 0,
      flexDirection: p ? "row" : "column"
    }, _ = {
      flex: x ? 1 : void 0
    };
  }
  if (o)
    return /* @__PURE__ */ W.jsxs(W.Fragment, { children: [
      /* @__PURE__ */ W.jsx(
        "ul",
        {
          ref: o.listRef,
          className: "dynamic-list-container",
          style: {
            position: "relative",
            listStyle: "none",
            padding: "0",
            margin: "0",
            ...y,
            ...T
          },
          children: o.list.map((p, v) => {
            const x = !i && p === o.draggingItemData, N = x && o.position ? {
              display: "none"
            } : {
              transition: "transform 0.2s ease",
              ..._
            }, A = i && v === o.dropTargetIndex;
            return /* @__PURE__ */ W.jsx(
              "li",
              {
                onMouseDown: (P) => o.itemDrag(P, v),
                className: `dynamic-list-item ${x ? "grabbed" : "not-grabbed"} ${A ? "drop-target" : ""}`,
                style: { ...N, ...g },
                children: R(p)
              },
              f?.(p) || v
            );
          })
        }
      ),
      o.draggingItemData && o.position && /* @__PURE__ */ W.jsx(
        "div",
        {
          className: "dynamic-list-item grabbed",
          style: {
            position: "absolute",
            zIndex: 1e3,
            left: o.position.x - o.dragItemSize.width / 2,
            top: o.position.y - o.dragItemSize.height / 2,
            width: o.dragItemSize.width,
            height: o.dragItemSize.height,
            ...s
          },
          children: R(o.draggingItemData)
        }
      )
    ] });
};
export {
  fe as DynamicList
};
