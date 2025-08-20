import ae, { useState as $, useRef as Q, useEffect as oe } from "react";
var J = { exports: {} }, W = {};
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
function se() {
  if (K) return W;
  K = 1;
  var n = Symbol.for("react.transitional.element"), x = Symbol.for("react.fragment");
  function m(d, i, u) {
    var f = null;
    if (u !== void 0 && (f = "" + u), i.key !== void 0 && (f = "" + i.key), "key" in i) {
      u = {};
      for (var t in i)
        t !== "key" && (u[t] = i[t]);
    } else u = i;
    return i = u.ref, {
      $$typeof: n,
      type: d,
      key: f,
      ref: i !== void 0 ? i : null,
      props: u
    };
  }
  return W.Fragment = x, W.jsx = m, W.jsxs = m, W;
}
var q = {};
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
function ie() {
  return ee || (ee = 1, process.env.NODE_ENV !== "production" && function() {
    function n(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === y ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case o:
          return "Fragment";
        case w:
          return "Profiler";
        case T:
          return "StrictMode";
        case M:
          return "Suspense";
        case X:
          return "SuspenseList";
        case v:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case s:
            return "Portal";
          case P:
            return (e.displayName || "Context") + ".Provider";
          case R:
            return (e._context.displayName || "Context") + ".Consumer";
          case j:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case z:
            return r = e.displayName || null, r !== null ? r : n(e.type) || "Memo";
          case C:
            r = e._payload, e = e._init;
            try {
              return n(e(r));
            } catch {
            }
        }
      return null;
    }
    function x(e) {
      return "" + e;
    }
    function m(e) {
      try {
        x(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var l = r.error, g = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return l.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          g
        ), x(e);
      }
    }
    function d(e) {
      if (e === o) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === C)
        return "<...>";
      try {
        var r = n(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function i() {
      var e = O.A;
      return e === null ? null : e.getOwner();
    }
    function u() {
      return Error("react-stack-top-frame");
    }
    function f(e) {
      if (F.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function t(e, r) {
      function l() {
        Y || (Y = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      l.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: l,
        configurable: !0
      });
    }
    function a() {
      var e = n(this.type);
      return A[e] || (A[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function h(e, r, l, g, N, _, V, B) {
      return l = _.ref, e = {
        $$typeof: D,
        type: e,
        key: r,
        props: _,
        _owner: N
      }, (l !== void 0 ? l : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: a
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
        value: B
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function b(e, r, l, g, N, _, V, B) {
      var p = r.children;
      if (p !== void 0)
        if (g)
          if (G(p)) {
            for (g = 0; g < p.length; g++)
              E(p[g]);
            Object.freeze && Object.freeze(p);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else E(p);
      if (F.call(r, "key")) {
        p = n(e);
        var L = Object.keys(r).filter(function(ne) {
          return ne !== "key";
        });
        g = 0 < L.length ? "{key: someKey, " + L.join(": ..., ") + ": ...}" : "{key: someKey}", Z[p + g] || (L = 0 < L.length ? "{" + L.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          g,
          p,
          L,
          p
        ), Z[p + g] = !0);
      }
      if (p = null, l !== void 0 && (m(l), p = "" + l), f(r) && (m(r.key), p = "" + r.key), "key" in r) {
        l = {};
        for (var H in r)
          H !== "key" && (l[H] = r[H]);
      } else l = r;
      return p && t(
        l,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), h(
        e,
        p,
        _,
        N,
        i(),
        l,
        V,
        B
      );
    }
    function E(e) {
      typeof e == "object" && e !== null && e.$$typeof === D && e._store && (e._store.validated = 1);
    }
    var c = ae, D = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), T = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), P = Symbol.for("react.context"), j = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), X = Symbol.for("react.suspense_list"), z = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), y = Symbol.for("react.client.reference"), O = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = Object.prototype.hasOwnProperty, G = Array.isArray, I = console.createTask ? console.createTask : function() {
      return null;
    };
    c = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var Y, A = {}, S = c["react-stack-bottom-frame"].bind(
      c,
      u
    )(), U = I(d(u)), Z = {};
    q.Fragment = o, q.jsx = function(e, r, l, g, N) {
      var _ = 1e4 > O.recentlyCreatedOwnerStacks++;
      return b(
        e,
        r,
        l,
        !1,
        g,
        N,
        _ ? Error("react-stack-top-frame") : S,
        _ ? I(d(e)) : U
      );
    }, q.jsxs = function(e, r, l, g, N) {
      var _ = 1e4 > O.recentlyCreatedOwnerStacks++;
      return b(
        e,
        r,
        l,
        !0,
        g,
        N,
        _ ? Error("react-stack-top-frame") : S,
        _ ? I(d(e)) : U
      );
    };
  }()), q;
}
var te;
function le() {
  return te || (te = 1, process.env.NODE_ENV === "production" ? J.exports = se() : J.exports = ie()), J.exports;
}
var k = le();
const ue = ({
  position: n,
  rects: x,
  horizontal: m,
  flexWrap: d
}) => {
  if (x.length === 0) return -1;
  let i = -1, u = 1 / 0;
  const f = x.reduce(
    (t, a) => (t.top = Math.min(t.top, a.top), t.left = Math.min(t.left, a.left), t.right = Math.max(t.right, a.right), t.bottom = Math.max(t.bottom, a.bottom), t),
    {
      top: 1 / 0,
      left: 1 / 0,
      right: -1 / 0,
      bottom: -1 / 0
    }
  );
  return x.forEach((t, a) => {
    let h;
    if (d)
      if (n.x >= f.left && n.x <= f.right && n.y >= f.top && n.y <= f.bottom) {
        const b = t.left + t.width / 2, E = t.top + t.height / 2;
        h = Math.sqrt(
          Math.pow(n.x - b, 2) + Math.pow(n.y - E, 2)
        );
      } else {
        const b = Math.max(t.left - n.x, 0, n.x - t.right), E = Math.max(t.top - n.y, 0, n.y - t.bottom);
        h = Math.sqrt(Math.pow(b, 2) + Math.pow(E, 2));
      }
    else {
      const b = m ? t.left + t.width / 2 : t.top + t.height / 2;
      h = Math.abs(m ? n.x - b : n.y - b);
    }
    h < u && (u = h, i = a);
  }), i;
}, re = ({
  initialData: n,
  horizontal: x,
  flexWrap: m,
  staticMove: d = !1,
  draggable: i,
  onDragStart: u,
  onDragMove: f,
  onDragEnd: t
}) => {
  const [a, h] = $(n), [b, E] = $(null), [c, D] = $(
    null
  ), [s, o] = $(null), [T, w] = $({ width: 0, height: 0 }), [R, P] = $(null), j = Q(n), M = Q(null), X = (v, y) => {
    if (i === !1) {
      v.preventDefault();
      const O = v.currentTarget.getBoundingClientRect();
      D(y), o(a[y]), w({ width: O.width, height: O.height }), E({
        x: v.clientX,
        y: v.clientY
      }), j.current = a, u?.(a, y);
    }
  }, z = (v) => {
    if (c === null || !M.current) return;
    const y = { x: v.clientX, y: v.clientY };
    E(y);
    const F = Array.from(M.current.children).map((A) => A.getBoundingClientRect()), G = d || c === -1 ? F : F.filter((A, S) => S !== c), I = ue({
      position: y,
      rects: G,
      horizontal: x,
      flexWrap: m
    });
    if (I === -1 || I === null)
      return;
    let Y = I;
    if (I >= c && (Y = I + 1), d)
      P(I);
    else {
      const A = a.findIndex((S) => S === s);
      if (A !== -1 && Y !== A) {
        const S = [...a], [U] = S.splice(A, 1);
        S.splice(Y, 0, U), h(S);
      }
    }
    f?.(a, c);
  }, C = () => {
    if (c === null) return;
    let v = -1;
    if (d)
      if (R !== null && R !== c) {
        const y = [...j.current], [O] = y.splice(c, 1);
        y.splice(R, 0, O), h(y), v = R;
      } else
        h(j.current), v = c;
    else
      v = a.findIndex((y) => y === s);
    t?.(a, v), D(null), o(null), E(null), P(null);
  };
  return oe(() => {
    if (s && i === !1)
      return window.addEventListener("mousemove", z), window.addEventListener("mouseup", C), () => {
        window.removeEventListener("mousemove", z), window.removeEventListener("mouseup", C);
      };
  }, [
    c,
    s,
    R,
    a,
    d,
    i
  ]), {
    list: a,
    listRef: M,
    draggingItem: c,
    draggingItemData: s,
    position: b,
    dragItemSize: T,
    dropTargetIndex: d ? R : null,
    itemDrag: X,
    itemMove: z,
    itemDrop: C
  };
}, fe = (n) => {
  const {
    items: x,
    renderItem: m,
    getKey: d,
    horizontal: i = !1,
    flexWrap: u = !1,
    uniformSize: f,
    staticMove: t = !1,
    draggable: a = !1,
    onDragStart: h,
    onDragMove: b,
    onDragEnd: E,
    containerStyle: c,
    itemStyle: D,
    targetItemStyle: s
  } = n, o = re({
    initialData: x,
    horizontal: i,
    flexWrap: u,
    staticMove: t,
    draggable: a,
    onDragStart: h,
    onDragMove: b,
    onDragEnd: E
  });
  return /* @__PURE__ */ k.jsxs(k.Fragment, { children: [
    /* @__PURE__ */ k.jsx(
      "ul",
      {
        ref: o.listRef,
        className: "dynamic-list-container",
        style: {
          position: "relative",
          listStyle: "none",
          padding: "0",
          margin: "0",
          display: "flex",
          flexWrap: u ? "wrap" : void 0,
          flexDirection: i ? "row" : "column",
          ...c
        },
        children: o.list.map((T, w) => {
          const R = !t && T === o.draggingItemData, P = R && o.position ? {
            display: "none",
            cursor: a ? "default" : "grab"
          } : {
            transition: "transform 0.2s ease",
            cursor: a ? "default" : "grab",
            flex: f ? 1 : void 0
          }, j = t && w === o.dropTargetIndex;
          return /* @__PURE__ */ k.jsx(
            "li",
            {
              onMouseDown: (M) => o.itemDrag(M, w),
              className: `dynamic-list-item ${R ? "grabbed" : "not-grabbed"} ${j ? "drop-target" : ""}`,
              style: { ...P, ...D },
              children: m(T)
            },
            d?.(T) || w
          );
        })
      }
    ),
    o.draggingItemData && o.position && /* @__PURE__ */ k.jsx(
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
          background: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transform: "scale(0.95)",
          transition: "transform 0.2s ease",
          cursor: a ? "default" : "grab",
          ...s
        },
        children: m(o.draggingItemData)
      }
    )
  ] });
}, de = (n) => {
  const {
    items: x,
    renderItem: m,
    getKey: d,
    cols: i = 4,
    rows: u,
    staticMove: f = !1,
    draggable: t = !1,
    onDragStart: a,
    onDragMove: h,
    onDragEnd: b,
    containerStyle: E,
    itemStyle: c,
    targetItemStyle: D
  } = n, s = re({
    initialData: x,
    flexWrap: !0,
    staticMove: f,
    draggable: t,
    onDragStart: a,
    onDragMove: h,
    onDragEnd: b
  });
  return /* @__PURE__ */ k.jsxs(k.Fragment, { children: [
    /* @__PURE__ */ k.jsx(
      "ul",
      {
        ref: s.listRef,
        className: "dynamic-list-container",
        style: {
          position: "relative",
          listStyle: "none",
          padding: "0",
          margin: "0",
          display: "grid",
          gridTemplateColumns: i ? `repeat(${i}, minmax(0, 1fr))` : void 0,
          gridTemplateRows: u ? `repeat(${u}, minmax(0, 1fr))` : void 0,
          ...E
        },
        children: s.list.map((o, T) => {
          const w = !f && o === s.draggingItemData, R = w && s.position ? {
            display: "none",
            cursor: t ? "default" : "grab"
          } : {
            transition: "transform 0.2s ease",
            cursor: t ? "default" : "grab"
          }, P = f && T === s.dropTargetIndex;
          return /* @__PURE__ */ k.jsx(
            "li",
            {
              onMouseDown: (j) => s.itemDrag(j, T),
              className: `dynamic-list-item ${w ? "grabbed" : "not-grabbed"} ${P ? "drop-target" : ""}`,
              style: { ...R, ...c },
              children: m(o)
            },
            d?.(o) || T
          );
        })
      }
    ),
    s.draggingItemData && s.position && /* @__PURE__ */ k.jsx(
      "div",
      {
        className: "dynamic-list-item grabbed",
        style: {
          position: "absolute",
          zIndex: 1e3,
          left: s.position.x - s.dragItemSize.width / 2,
          top: s.position.y - s.dragItemSize.height / 2,
          width: s.dragItemSize.width,
          height: s.dragItemSize.height,
          background: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transform: "scale(0.95)",
          transition: "transform 0.2s ease",
          cursor: t ? "default" : "grab",
          ...D
        },
        children: m(s.draggingItemData)
      }
    )
  ] });
};
export {
  fe as DynamicList,
  de as GridList
};
