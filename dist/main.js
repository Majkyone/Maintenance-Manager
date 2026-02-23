/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Bs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const Z = {}, bt = [], Be = () => {
}, Yn = () => !1, cs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ws = (e) => e.startsWith("onUpdate:"), ae = Object.assign, Ks = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, nr = Object.prototype.hasOwnProperty, U = (e, t) => nr.call(e, t), F = Array.isArray, xt = (e) => us(e) === "[object Map]", Xn = (e) => us(e) === "[object Set]", j = (e) => typeof e == "function", ne = (e) => typeof e == "string", et = (e) => typeof e == "symbol", te = (e) => e !== null && typeof e == "object", Zn = (e) => (te(e) || j(e)) && j(e.then) && j(e.catch), Qn = Object.prototype.toString, us = (e) => Qn.call(e), or = (e) => us(e).slice(8, -1), fs = (e) => us(e) === "[object Object]", zs = (e) => ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $t = /* @__PURE__ */ Bs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ds = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, rr = /-\w/g, we = ds(
  (e) => e.replace(rr, (t) => t.slice(1).toUpperCase())
), ir = /\B([A-Z])/g, Ae = ds(
  (e) => e.replace(ir, "-$1").toLowerCase()
), ps = ds((e) => e.charAt(0).toUpperCase() + e.slice(1)), xs = ds(
  (e) => e ? `on${ps(e)}` : ""
), lt = (e, t) => !Object.is(e, t), ws = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, eo = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, lr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, gn = (e) => {
  const t = ne(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let _n;
const hs = () => _n || (_n = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Gs(e) {
  if (F(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], o = ne(n) ? fr(n) : Gs(n);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else if (ne(e) || te(e))
    return e;
}
const ar = /;(?![^(]*\))/g, cr = /:([^]+)/, ur = /\/\*[^]*?\*\//g;
function fr(e) {
  const t = {};
  return e.replace(ur, "").split(ar).forEach((s) => {
    if (s) {
      const n = s.split(cr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Bt(e) {
  let t = "";
  if (ne(e))
    t = e;
  else if (F(e))
    for (let s = 0; s < e.length; s++) {
      const n = Bt(e[s]);
      n && (t += n + " ");
    }
  else if (te(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const dr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", pr = /* @__PURE__ */ Bs(dr);
function to(e) {
  return !!e || e === "";
}
const so = (e) => !!(e && e.__v_isRef === !0), ee = (e) => ne(e) ? e : e == null ? "" : F(e) || te(e) && (e.toString === Qn || !j(e.toString)) ? so(e) ? ee(e.value) : JSON.stringify(e, no, 2) : String(e), no = (e, t) => so(t) ? no(e, t.value) : xt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, o], r) => (s[ys(n, r) + " =>"] = o, s),
    {}
  )
} : Xn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => ys(s))
} : et(t) ? ys(t) : te(t) && !F(t) && !fs(t) ? String(t) : t, ys = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    et(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Se;
class hr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Se, !t && Se && (this.index = (Se.scopes || (Se.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = Se;
      try {
        return Se = this, t();
      } finally {
        Se = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Se, Se = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Se = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function mr() {
  return Se;
}
let X;
const Cs = /* @__PURE__ */ new WeakSet();
class oo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Se && Se.active && Se.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Cs.has(this) && (Cs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || io(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, vn(this), lo(this);
    const t = X, s = De;
    X = this, De = !0;
    try {
      return this.fn();
    } finally {
      ao(this), X = t, De = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Xs(t);
      this.deps = this.depsTail = void 0, vn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Cs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    $s(this) && this.run();
  }
  get dirty() {
    return $s(this);
  }
}
let ro = 0, Rt, Dt;
function io(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Dt, Dt = e;
    return;
  }
  e.next = Rt, Rt = e;
}
function Js() {
  ro++;
}
function Ys() {
  if (--ro > 0)
    return;
  if (Dt) {
    let t = Dt;
    for (Dt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Rt; ) {
    let t = Rt;
    for (Rt = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function lo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ao(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const o = n.prevDep;
    n.version === -1 ? (n === s && (s = o), Xs(n), gr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = o;
  }
  e.deps = t, e.depsTail = s;
}
function $s(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (co(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function co(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === qt) || (e.globalVersion = qt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !$s(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = X, n = De;
  X = e, De = !0;
  try {
    lo(e);
    const o = e.fn(e._value);
    (t.version === 0 || lt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    X = s, De = n, ao(e), e.flags &= -3;
  }
}
function Xs(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: o } = e;
  if (n && (n.nextSub = o, e.prevSub = void 0), o && (o.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let r = s.computed.deps; r; r = r.nextDep)
      Xs(r, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function gr(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let De = !0;
const uo = [];
function Xe() {
  uo.push(De), De = !1;
}
function Ze() {
  const e = uo.pop();
  De = e === void 0 ? !0 : e;
}
function vn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = X;
    X = void 0;
    try {
      t();
    } finally {
      X = s;
    }
  }
}
let qt = 0;
class _r {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Zs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!X || !De || X === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== X)
      s = this.activeLink = new _r(X, this), X.deps ? (s.prevDep = X.depsTail, X.depsTail.nextDep = s, X.depsTail = s) : X.deps = X.depsTail = s, fo(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = X.depsTail, s.nextDep = void 0, X.depsTail.nextDep = s, X.depsTail = s, X.deps === s && (X.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, qt++, this.notify(t);
  }
  notify(t) {
    Js();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Ys();
    }
  }
}
function fo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        fo(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Rs = /* @__PURE__ */ new WeakMap(), gt = Symbol(
  ""
), Ds = Symbol(
  ""
), Ht = Symbol(
  ""
);
function he(e, t, s) {
  if (De && X) {
    let n = Rs.get(e);
    n || Rs.set(e, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new Zs()), o.map = n, o.key = s), o.track();
  }
}
function Ye(e, t, s, n, o, r) {
  const i = Rs.get(e);
  if (!i) {
    qt++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Js(), t === "clear")
    i.forEach(l);
  else {
    const a = F(e), d = a && zs(s);
    if (a && s === "length") {
      const u = Number(n);
      i.forEach((p, w) => {
        (w === "length" || w === Ht || !et(w) && w >= u) && l(p);
      });
    } else
      switch ((s !== void 0 || i.has(void 0)) && l(i.get(s)), d && l(i.get(Ht)), t) {
        case "add":
          a ? d && l(i.get("length")) : (l(i.get(gt)), xt(e) && l(i.get(Ds)));
          break;
        case "delete":
          a || (l(i.get(gt)), xt(e) && l(i.get(Ds)));
          break;
        case "set":
          xt(e) && l(i.get(gt));
          break;
      }
  }
  Ys();
}
function _t(e) {
  const t = B(e);
  return t === e ? t : (he(t, "iterate", Ht), Pe(e) ? t : t.map(de));
}
function ms(e) {
  return he(e = B(e), "iterate", Ht), e;
}
const vr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ss(this, Symbol.iterator, de);
  },
  concat(...e) {
    return _t(this).concat(
      ...e.map((t) => F(t) ? _t(t) : t)
    );
  },
  entries() {
    return Ss(this, "entries", (e) => (e[1] = de(e[1]), e));
  },
  every(e, t) {
    return Ge(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ge(this, "filter", e, t, (s) => s.map(de), arguments);
  },
  find(e, t) {
    return Ge(this, "find", e, t, de, arguments);
  },
  findIndex(e, t) {
    return Ge(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ge(this, "findLast", e, t, de, arguments);
  },
  findLastIndex(e, t) {
    return Ge(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ge(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ts(this, "includes", e);
  },
  indexOf(...e) {
    return Ts(this, "indexOf", e);
  },
  join(e) {
    return _t(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ts(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ge(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Mt(this, "pop");
  },
  push(...e) {
    return Mt(this, "push", e);
  },
  reduce(e, ...t) {
    return bn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return bn(this, "reduceRight", e, t);
  },
  shift() {
    return Mt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ge(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Mt(this, "splice", e);
  },
  toReversed() {
    return _t(this).toReversed();
  },
  toSorted(e) {
    return _t(this).toSorted(e);
  },
  toSpliced(...e) {
    return _t(this).toSpliced(...e);
  },
  unshift(...e) {
    return Mt(this, "unshift", e);
  },
  values() {
    return Ss(this, "values", de);
  }
};
function Ss(e, t, s) {
  const n = ms(e), o = n[t]();
  return n !== e && !Pe(e) && (o._next = o.next, o.next = () => {
    const r = o._next();
    return r.done || (r.value = s(r.value)), r;
  }), o;
}
const br = Array.prototype;
function Ge(e, t, s, n, o, r) {
  const i = ms(e), l = i !== e && !Pe(e), a = i[t];
  if (a !== br[t]) {
    const p = a.apply(e, r);
    return l ? de(p) : p;
  }
  let d = s;
  i !== e && (l ? d = function(p, w) {
    return s.call(this, de(p), w, e);
  } : s.length > 2 && (d = function(p, w) {
    return s.call(this, p, w, e);
  }));
  const u = a.call(i, d, n);
  return l && o ? o(u) : u;
}
function bn(e, t, s, n) {
  const o = ms(e);
  let r = s;
  return o !== e && (Pe(e) ? s.length > 3 && (r = function(i, l, a) {
    return s.call(this, i, l, a, e);
  }) : r = function(i, l, a) {
    return s.call(this, i, de(l), a, e);
  }), o[t](r, ...n);
}
function Ts(e, t, s) {
  const n = B(e);
  he(n, "iterate", Ht);
  const o = n[t](...s);
  return (o === -1 || o === !1) && sn(s[0]) ? (s[0] = B(s[0]), n[t](...s)) : o;
}
function Mt(e, t, s = []) {
  Xe(), Js();
  const n = B(e)[t].apply(e, s);
  return Ys(), Ze(), n;
}
const xr = /* @__PURE__ */ Bs("__proto__,__v_isRef,__isVue"), po = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(et)
);
function wr(e) {
  et(e) || (e = String(e));
  const t = B(this);
  return he(t, "has", e), t.hasOwnProperty(e);
}
class ho {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, r = this._isShallow;
    if (s === "__v_isReactive")
      return !o;
    if (s === "__v_isReadonly")
      return o;
    if (s === "__v_isShallow")
      return r;
    if (s === "__v_raw")
      return n === (o ? r ? Pr : vo : r ? _o : go).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const i = F(t);
    if (!o) {
      let a;
      if (i && (a = vr[s]))
        return a;
      if (s === "hasOwnProperty")
        return wr;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ge(t) ? t : n
    );
    if ((et(s) ? po.has(s) : xr(s)) || (o || he(t, "get", s), r))
      return l;
    if (ge(l)) {
      const a = i && zs(s) ? l : l.value;
      return o && te(a) ? Ns(a) : a;
    }
    return te(l) ? o ? Ns(l) : en(l) : l;
  }
}
class mo extends ho {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, o) {
    let r = t[s];
    if (!this._isShallow) {
      const a = at(r);
      if (!Pe(n) && !at(n) && (r = B(r), n = B(n)), !F(t) && ge(r) && !ge(n))
        return a || (r.value = n), !0;
    }
    const i = F(t) && zs(s) ? Number(s) < t.length : U(t, s), l = Reflect.set(
      t,
      s,
      n,
      ge(t) ? t : o
    );
    return t === B(o) && (i ? lt(n, r) && Ye(t, "set", s, n) : Ye(t, "add", s, n)), l;
  }
  deleteProperty(t, s) {
    const n = U(t, s);
    t[s];
    const o = Reflect.deleteProperty(t, s);
    return o && n && Ye(t, "delete", s, void 0), o;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!et(s) || !po.has(s)) && he(t, "has", s), n;
  }
  ownKeys(t) {
    return he(
      t,
      "iterate",
      F(t) ? "length" : gt
    ), Reflect.ownKeys(t);
  }
}
class yr extends ho {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Cr = /* @__PURE__ */ new mo(), Sr = /* @__PURE__ */ new yr(), Tr = /* @__PURE__ */ new mo(!0);
const Fs = (e) => e, Gt = (e) => Reflect.getPrototypeOf(e);
function Er(e, t, s) {
  return function(...n) {
    const o = this.__v_raw, r = B(o), i = xt(r), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, d = o[e](...n), u = s ? Fs : t ? ss : de;
    return !t && he(
      r,
      "iterate",
      a ? Ds : gt
    ), {
      // iterator protocol
      next() {
        const { value: p, done: w } = d.next();
        return w ? { value: p, done: w } : {
          value: l ? [u(p[0]), u(p[1])] : u(p),
          done: w
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Jt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Or(e, t) {
  const s = {
    get(o) {
      const r = this.__v_raw, i = B(r), l = B(o);
      e || (lt(o, l) && he(i, "get", o), he(i, "get", l));
      const { has: a } = Gt(i), d = t ? Fs : e ? ss : de;
      if (a.call(i, o))
        return d(r.get(o));
      if (a.call(i, l))
        return d(r.get(l));
      r !== i && r.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && he(B(o), "iterate", gt), o.size;
    },
    has(o) {
      const r = this.__v_raw, i = B(r), l = B(o);
      return e || (lt(o, l) && he(i, "has", o), he(i, "has", l)), o === l ? r.has(o) : r.has(o) || r.has(l);
    },
    forEach(o, r) {
      const i = this, l = i.__v_raw, a = B(l), d = t ? Fs : e ? ss : de;
      return !e && he(a, "iterate", gt), l.forEach((u, p) => o.call(r, d(u), d(p), i));
    }
  };
  return ae(
    s,
    e ? {
      add: Jt("add"),
      set: Jt("set"),
      delete: Jt("delete"),
      clear: Jt("clear")
    } : {
      add(o) {
        !t && !Pe(o) && !at(o) && (o = B(o));
        const r = B(this);
        return Gt(r).has.call(r, o) || (r.add(o), Ye(r, "add", o, o)), this;
      },
      set(o, r) {
        !t && !Pe(r) && !at(r) && (r = B(r));
        const i = B(this), { has: l, get: a } = Gt(i);
        let d = l.call(i, o);
        d || (o = B(o), d = l.call(i, o));
        const u = a.call(i, o);
        return i.set(o, r), d ? lt(r, u) && Ye(i, "set", o, r) : Ye(i, "add", o, r), this;
      },
      delete(o) {
        const r = B(this), { has: i, get: l } = Gt(r);
        let a = i.call(r, o);
        a || (o = B(o), a = i.call(r, o)), l && l.call(r, o);
        const d = r.delete(o);
        return a && Ye(r, "delete", o, void 0), d;
      },
      clear() {
        const o = B(this), r = o.size !== 0, i = o.clear();
        return r && Ye(
          o,
          "clear",
          void 0,
          void 0
        ), i;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    s[o] = Er(o, e, t);
  }), s;
}
function Qs(e, t) {
  const s = Or(e, t);
  return (n, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(
    U(s, o) && o in n ? s : n,
    o,
    r
  );
}
const kr = {
  get: /* @__PURE__ */ Qs(!1, !1)
}, Mr = {
  get: /* @__PURE__ */ Qs(!1, !0)
}, Ar = {
  get: /* @__PURE__ */ Qs(!0, !1)
};
const go = /* @__PURE__ */ new WeakMap(), _o = /* @__PURE__ */ new WeakMap(), vo = /* @__PURE__ */ new WeakMap(), Pr = /* @__PURE__ */ new WeakMap();
function Ir(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function $r(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ir(or(e));
}
function en(e) {
  return at(e) ? e : tn(
    e,
    !1,
    Cr,
    kr,
    go
  );
}
function Rr(e) {
  return tn(
    e,
    !1,
    Tr,
    Mr,
    _o
  );
}
function Ns(e) {
  return tn(
    e,
    !0,
    Sr,
    Ar,
    vo
  );
}
function tn(e, t, s, n, o) {
  if (!te(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = $r(e);
  if (r === 0)
    return e;
  const i = o.get(e);
  if (i)
    return i;
  const l = new Proxy(
    e,
    r === 2 ? n : s
  );
  return o.set(e, l), l;
}
function wt(e) {
  return at(e) ? wt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function at(e) {
  return !!(e && e.__v_isReadonly);
}
function Pe(e) {
  return !!(e && e.__v_isShallow);
}
function sn(e) {
  return e ? !!e.__v_raw : !1;
}
function B(e) {
  const t = e && e.__v_raw;
  return t ? B(t) : e;
}
function Dr(e) {
  return !U(e, "__v_skip") && Object.isExtensible(e) && eo(e, "__v_skip", !0), e;
}
const de = (e) => te(e) ? en(e) : e, ss = (e) => te(e) ? Ns(e) : e;
function ge(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function le(e) {
  return Fr(e, !1);
}
function Fr(e, t) {
  return ge(e) ? e : new Nr(e, t);
}
class Nr {
  constructor(t, s) {
    this.dep = new Zs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : B(t), this._value = s ? t : de(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || Pe(t) || at(t);
    t = n ? t : B(t), lt(t, s) && (this._rawValue = t, this._value = n ? t : de(t), this.dep.trigger());
  }
}
function mt(e) {
  return ge(e) ? e.value : e;
}
const jr = {
  get: (e, t, s) => t === "__v_raw" ? e : mt(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return ge(o) && !ge(s) ? (o.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function bo(e) {
  return wt(e) ? e : new Proxy(e, jr);
}
class qr {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new Zs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    X !== this)
      return io(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return co(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Hr(e, t, s = !1) {
  let n, o;
  return j(e) ? n = e : (n = e.get, o = e.set), new qr(n, o, s);
}
const Yt = {}, ns = /* @__PURE__ */ new WeakMap();
let ht;
function Lr(e, t = !1, s = ht) {
  if (s) {
    let n = ns.get(s);
    n || ns.set(s, n = []), n.push(e);
  }
}
function Vr(e, t, s = Z) {
  const { immediate: n, deep: o, once: r, scheduler: i, augmentJob: l, call: a } = s, d = (M) => o ? M : Pe(M) || o === !1 || o === 0 ? ot(M, 1) : ot(M);
  let u, p, w, E, $ = !1, R = !1;
  if (ge(e) ? (p = () => e.value, $ = Pe(e)) : wt(e) ? (p = () => d(e), $ = !0) : F(e) ? (R = !0, $ = e.some((M) => wt(M) || Pe(M)), p = () => e.map((M) => {
    if (ge(M))
      return M.value;
    if (wt(M))
      return d(M);
    if (j(M))
      return a ? a(M, 2) : M();
  })) : j(e) ? t ? p = a ? () => a(e, 2) : e : p = () => {
    if (w) {
      Xe();
      try {
        w();
      } finally {
        Ze();
      }
    }
    const M = ht;
    ht = u;
    try {
      return a ? a(e, 3, [E]) : e(E);
    } finally {
      ht = M;
    }
  } : p = Be, t && o) {
    const M = p, G = o === !0 ? 1 / 0 : o;
    p = () => ot(M(), G);
  }
  const oe = mr(), H = () => {
    u.stop(), oe && oe.active && Ks(oe.effects, u);
  };
  if (r && t) {
    const M = t;
    t = (...G) => {
      M(...G), H();
    };
  }
  let z = R ? new Array(e.length).fill(Yt) : Yt;
  const V = (M) => {
    if (!(!(u.flags & 1) || !u.dirty && !M))
      if (t) {
        const G = u.run();
        if (o || $ || (R ? G.some((ce, re) => lt(ce, z[re])) : lt(G, z))) {
          w && w();
          const ce = ht;
          ht = u;
          try {
            const re = [
              G,
              // pass undefined as the old value when it's changed for the first time
              z === Yt ? void 0 : R && z[0] === Yt ? [] : z,
              E
            ];
            z = G, a ? a(t, 3, re) : (
              // @ts-expect-error
              t(...re)
            );
          } finally {
            ht = ce;
          }
        }
      } else
        u.run();
  };
  return l && l(V), u = new oo(p), u.scheduler = i ? () => i(V, !1) : V, E = (M) => Lr(M, !1, u), w = u.onStop = () => {
    const M = ns.get(u);
    if (M) {
      if (a)
        a(M, 4);
      else
        for (const G of M) G();
      ns.delete(u);
    }
  }, t ? n ? V(!0) : z = u.run() : i ? i(V.bind(null, !0), !0) : u.run(), H.pause = u.pause.bind(u), H.resume = u.resume.bind(u), H.stop = H, H;
}
function ot(e, t = 1 / 0, s) {
  if (t <= 0 || !te(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, ge(e))
    ot(e.value, t, s);
  else if (F(e))
    for (let n = 0; n < e.length; n++)
      ot(e[n], t, s);
  else if (Xn(e) || xt(e))
    e.forEach((n) => {
      ot(n, t, s);
    });
  else if (fs(e)) {
    for (const n in e)
      ot(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && ot(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Wt(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (o) {
    gs(o, t, s);
  }
}
function We(e, t, s, n) {
  if (j(e)) {
    const o = Wt(e, t, s, n);
    return o && Zn(o) && o.catch((r) => {
      gs(r, t, s);
    }), o;
  }
  if (F(e)) {
    const o = [];
    for (let r = 0; r < e.length; r++)
      o.push(We(e[r], t, s, n));
    return o;
  }
}
function gs(e, t, s, n = !0) {
  const o = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: i } = t && t.appContext.config || Z;
  if (t) {
    let l = t.parent;
    const a = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let p = 0; p < u.length; p++)
          if (u[p](e, a, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      Xe(), Wt(r, null, 10, [
        e,
        a,
        d
      ]), Ze();
      return;
    }
  }
  Ur(e, s, o, n, i);
}
function Ur(e, t, s, n = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const be = [];
let Ve = -1;
const yt = [];
let st = null, vt = 0;
const xo = /* @__PURE__ */ Promise.resolve();
let os = null;
function wo(e) {
  const t = os || xo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Br(e) {
  let t = Ve + 1, s = be.length;
  for (; t < s; ) {
    const n = t + s >>> 1, o = be[n], r = Lt(o);
    r < e || r === e && o.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function nn(e) {
  if (!(e.flags & 1)) {
    const t = Lt(e), s = be[be.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Lt(s) ? be.push(e) : be.splice(Br(t), 0, e), e.flags |= 1, yo();
  }
}
function yo() {
  os || (os = xo.then(So));
}
function Wr(e) {
  F(e) ? yt.push(...e) : st && e.id === -1 ? st.splice(vt + 1, 0, e) : e.flags & 1 || (yt.push(e), e.flags |= 1), yo();
}
function xn(e, t, s = Ve + 1) {
  for (; s < be.length; s++) {
    const n = be[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      be.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function Co(e) {
  if (yt.length) {
    const t = [...new Set(yt)].sort(
      (s, n) => Lt(s) - Lt(n)
    );
    if (yt.length = 0, st) {
      st.push(...t);
      return;
    }
    for (st = t, vt = 0; vt < st.length; vt++) {
      const s = st[vt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    st = null, vt = 0;
  }
}
const Lt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function So(e) {
  try {
    for (Ve = 0; Ve < be.length; Ve++) {
      const t = be[Ve];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Wt(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ve < be.length; Ve++) {
      const t = be[Ve];
      t && (t.flags &= -2);
    }
    Ve = -1, be.length = 0, Co(), os = null, (be.length || yt.length) && So();
  }
}
let xe = null, To = null;
function rs(e) {
  const t = xe;
  return xe = e, To = e && e.type.__scopeId || null, t;
}
function N(e, t = xe, s) {
  if (!t || e._n)
    return e;
  const n = (...o) => {
    n._d && Pn(-1);
    const r = rs(t);
    let i;
    try {
      i = e(...o);
    } finally {
      rs(r), n._d && Pn(1);
    }
    return i;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function dt(e, t, s, n) {
  const o = e.dirs, r = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    r && (l.oldValue = r[i].value);
    let a = l.dir[n];
    a && (Xe(), We(a, s, 8, [
      e.el,
      l,
      e,
      t
    ]), Ze());
  }
}
const Kr = Symbol("_vte"), zr = (e) => e.__isTeleport, Gr = Symbol("_leaveCb");
function on(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, on(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Eo(e, t) {
  return j(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ae({ name: e.name }, t, { setup: e })
  ) : e;
}
function Oo(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const is = /* @__PURE__ */ new WeakMap();
function Ft(e, t, s, n, o = !1) {
  if (F(e)) {
    e.forEach(
      ($, R) => Ft(
        $,
        t && (F(t) ? t[R] : t),
        s,
        n,
        o
      )
    );
    return;
  }
  if (Ct(n) && !o) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Ft(e, t, s, n.component.subTree);
    return;
  }
  const r = n.shapeFlag & 4 ? un(n.component) : n.el, i = o ? null : r, { i: l, r: a } = e, d = t && t.r, u = l.refs === Z ? l.refs = {} : l.refs, p = l.setupState, w = B(p), E = p === Z ? Yn : ($) => U(w, $);
  if (d != null && d !== a) {
    if (wn(t), ne(d))
      u[d] = null, E(d) && (p[d] = null);
    else if (ge(d)) {
      d.value = null;
      const $ = t;
      $.k && (u[$.k] = null);
    }
  }
  if (j(a))
    Wt(a, l, 12, [i, u]);
  else {
    const $ = ne(a), R = ge(a);
    if ($ || R) {
      const oe = () => {
        if (e.f) {
          const H = $ ? E(a) ? p[a] : u[a] : a.value;
          if (o)
            F(H) && Ks(H, r);
          else if (F(H))
            H.includes(r) || H.push(r);
          else if ($)
            u[a] = [r], E(a) && (p[a] = u[a]);
          else {
            const z = [r];
            a.value = z, e.k && (u[e.k] = z);
          }
        } else $ ? (u[a] = i, E(a) && (p[a] = i)) : R && (a.value = i, e.k && (u[e.k] = i));
      };
      if (i) {
        const H = () => {
          oe(), is.delete(e);
        };
        H.id = -1, is.set(e, H), Oe(H, s);
      } else
        wn(e), oe();
    }
  }
}
function wn(e) {
  const t = is.get(e);
  t && (t.flags |= 8, is.delete(e));
}
hs().requestIdleCallback;
hs().cancelIdleCallback;
const Ct = (e) => !!e.type.__asyncLoader, ko = (e) => e.type.__isKeepAlive;
function Jr(e, t) {
  Mo(e, "a", t);
}
function Yr(e, t) {
  Mo(e, "da", t);
}
function Mo(e, t, s = me) {
  const n = e.__wdc || (e.__wdc = () => {
    let o = s;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (_s(t, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      ko(o.parent.vnode) && Xr(n, t, s, o), o = o.parent;
  }
}
function Xr(e, t, s, n) {
  const o = _s(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Ao(() => {
    Ks(n[t], o);
  }, s);
}
function _s(e, t, s = me, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []), r = t.__weh || (t.__weh = (...i) => {
      Xe();
      const l = Kt(s), a = We(t, s, e, i);
      return l(), Ze(), a;
    });
    return n ? o.unshift(r) : o.push(r), r;
  }
}
const tt = (e) => (t, s = me) => {
  (!Ut || e === "sp") && _s(e, (...n) => t(...n), s);
}, Zr = tt("bm"), Qr = tt("m"), ei = tt(
  "bu"
), ti = tt("u"), si = tt(
  "bum"
), Ao = tt("um"), ni = tt(
  "sp"
), oi = tt("rtg"), ri = tt("rtc");
function ii(e, t = me) {
  _s("ec", e, t);
}
const li = "components";
function ke(e, t) {
  return ci(li, e, !0, t) || e;
}
const ai = Symbol.for("v-ndc");
function ci(e, t, s = !0, n = !1) {
  const o = xe || me;
  if (o) {
    const r = o.type;
    {
      const l = Qi(
        r,
        !1
      );
      if (l && (l === t || l === we(t) || l === ps(we(t))))
        return r;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      yn(o[e] || r[e], t) || // global registration
      yn(o.appContext[e], t)
    );
    return !i && n ? r : i;
  }
}
function yn(e, t) {
  return e && (e[t] || e[we(t)] || e[ps(we(t))]);
}
function Xt(e, t, s, n) {
  let o;
  const r = s, i = F(e);
  if (i || ne(e)) {
    const l = i && wt(e);
    let a = !1, d = !1;
    l && (a = !Pe(e), d = at(e), e = ms(e)), o = new Array(e.length);
    for (let u = 0, p = e.length; u < p; u++)
      o[u] = t(
        a ? d ? ss(de(e[u])) : de(e[u]) : e[u],
        u,
        void 0,
        r
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, r);
  } else if (te(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, a) => t(l, a, void 0, r)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let a = 0, d = l.length; a < d; a++) {
        const u = l[a];
        o[a] = t(e[u], u, a, r);
      }
    }
  else
    o = [];
  return o;
}
function ui(e, t, s = {}, n, o) {
  if (xe.ce || xe.parent && Ct(xe.parent) && xe.parent.ce) {
    const d = Object.keys(s).length > 0;
    return Y(), ve(
      pe,
      null,
      [T("slot", s, n)],
      d ? -2 : 64
    );
  }
  let r = e[t];
  r && r._c && (r._d = !1), Y();
  const i = r && Po(r(s)), l = s.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, a = ve(
    pe,
    {
      key: (l && !et(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && n ? "_fb" : "")
    },
    i || [],
    i && e._ === 1 ? 64 : -2
  );
  return a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), r && r._c && (r._d = !0), a;
}
function Po(e) {
  return e.some((t) => an(t) ? !(t.type === Qe || t.type === pe && !Po(t.children)) : !0) ? e : null;
}
const js = (e) => e ? Xo(e) ? un(e) : js(e.parent) : null, Nt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ae(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => js(e.parent),
    $root: (e) => js(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => $o(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      nn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = wo.bind(e.proxy)),
    $watch: (e) => Ii.bind(e)
  })
), Es = (e, t) => e !== Z && !e.__isScriptSetup && U(e, t), fi = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: o, props: r, accessCache: i, type: l, appContext: a } = e;
    let d;
    if (t[0] !== "$") {
      const E = i[t];
      if (E !== void 0)
        switch (E) {
          case 1:
            return n[t];
          case 2:
            return o[t];
          case 4:
            return s[t];
          case 3:
            return r[t];
        }
      else {
        if (Es(n, t))
          return i[t] = 1, n[t];
        if (o !== Z && U(o, t))
          return i[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && U(d, t)
        )
          return i[t] = 3, r[t];
        if (s !== Z && U(s, t))
          return i[t] = 4, s[t];
        qs && (i[t] = 0);
      }
    }
    const u = Nt[t];
    let p, w;
    if (u)
      return t === "$attrs" && he(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (p = l.__cssModules) && (p = p[t])
    )
      return p;
    if (s !== Z && U(s, t))
      return i[t] = 4, s[t];
    if (
      // global properties
      w = a.config.globalProperties, U(w, t)
    )
      return w[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: o, ctx: r } = e;
    return Es(o, t) ? (o[t] = s, !0) : n !== Z && U(n, t) ? (n[t] = s, !0) : U(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, propsOptions: r, type: i }
  }, l) {
    let a, d;
    return !!(s[l] || e !== Z && l[0] !== "$" && U(e, l) || Es(t, l) || (a = r[0]) && U(a, l) || U(n, l) || U(Nt, l) || U(o.config.globalProperties, l) || (d = i.__cssModules) && d[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : U(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Cn(e) {
  return F(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let qs = !0;
function di(e) {
  const t = $o(e), s = e.proxy, n = e.ctx;
  qs = !1, t.beforeCreate && Sn(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: r,
    methods: i,
    watch: l,
    provide: a,
    inject: d,
    // lifecycle
    created: u,
    beforeMount: p,
    mounted: w,
    beforeUpdate: E,
    updated: $,
    activated: R,
    deactivated: oe,
    beforeDestroy: H,
    beforeUnmount: z,
    destroyed: V,
    unmounted: M,
    render: G,
    renderTracked: ce,
    renderTriggered: re,
    errorCaptured: Ie,
    serverPrefetch: ct,
    // public API
    expose: Ke,
    inheritAttrs: $e,
    // assets
    components: ut,
    directives: Fe,
    filters: Et
  } = t;
  if (d && pi(d, n, null), i)
    for (const Q in i) {
      const K = i[Q];
      j(K) && (n[Q] = K.bind(s));
    }
  if (o) {
    const Q = o.call(s, s);
    te(Q) && (e.data = en(Q));
  }
  if (qs = !0, r)
    for (const Q in r) {
      const K = r[Q], ze = j(K) ? K.bind(s, s) : j(K.get) ? K.get.bind(s, s) : Be, ft = !j(K) && j(K.set) ? K.set.bind(s) : Be, P = it({
        get: ze,
        set: ft
      });
      Object.defineProperty(n, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => P.value,
        set: (m) => P.value = m
      });
    }
  if (l)
    for (const Q in l)
      Io(l[Q], n, s, Q);
  if (a) {
    const Q = j(a) ? a.call(s) : a;
    Reflect.ownKeys(Q).forEach((K) => {
      bi(K, Q[K]);
    });
  }
  u && Sn(u, e, "c");
  function fe(Q, K) {
    F(K) ? K.forEach((ze) => Q(ze.bind(s))) : K && Q(K.bind(s));
  }
  if (fe(Zr, p), fe(Qr, w), fe(ei, E), fe(ti, $), fe(Jr, R), fe(Yr, oe), fe(ii, Ie), fe(ri, ce), fe(oi, re), fe(si, z), fe(Ao, M), fe(ni, ct), F(Ke))
    if (Ke.length) {
      const Q = e.exposed || (e.exposed = {});
      Ke.forEach((K) => {
        Object.defineProperty(Q, K, {
          get: () => s[K],
          set: (ze) => s[K] = ze,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  G && e.render === Be && (e.render = G), $e != null && (e.inheritAttrs = $e), ut && (e.components = ut), Fe && (e.directives = Fe), ct && Oo(e);
}
function pi(e, t, s = Be) {
  F(e) && (e = Hs(e));
  for (const n in e) {
    const o = e[n];
    let r;
    te(o) ? "default" in o ? r = Zt(
      o.from || n,
      o.default,
      !0
    ) : r = Zt(o.from || n) : r = Zt(o), ge(r) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (i) => r.value = i
    }) : t[n] = r;
  }
}
function Sn(e, t, s) {
  We(
    F(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function Io(e, t, s, n) {
  let o = n.includes(".") ? Ko(s, n) : () => s[n];
  if (ne(e)) {
    const r = t[e];
    j(r) && Qt(o, r);
  } else if (j(e))
    Qt(o, e.bind(s));
  else if (te(e))
    if (F(e))
      e.forEach((r) => Io(r, t, s, n));
    else {
      const r = j(e.handler) ? e.handler.bind(s) : t[e.handler];
      j(r) && Qt(o, r, e);
    }
}
function $o(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: o,
    optionsCache: r,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = r.get(t);
  let a;
  return l ? a = l : !o.length && !s && !n ? a = t : (a = {}, o.length && o.forEach(
    (d) => ls(a, d, i, !0)
  ), ls(a, t, i)), te(t) && r.set(t, a), a;
}
function ls(e, t, s, n = !1) {
  const { mixins: o, extends: r } = t;
  r && ls(e, r, s, !0), o && o.forEach(
    (i) => ls(e, i, s, !0)
  );
  for (const i in t)
    if (!(n && i === "expose")) {
      const l = hi[i] || s && s[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const hi = {
  data: Tn,
  props: En,
  emits: En,
  // objects
  methods: It,
  computed: It,
  // lifecycle
  beforeCreate: _e,
  created: _e,
  beforeMount: _e,
  mounted: _e,
  beforeUpdate: _e,
  updated: _e,
  beforeDestroy: _e,
  beforeUnmount: _e,
  destroyed: _e,
  unmounted: _e,
  activated: _e,
  deactivated: _e,
  errorCaptured: _e,
  serverPrefetch: _e,
  // assets
  components: It,
  directives: It,
  // watch
  watch: gi,
  // provide / inject
  provide: Tn,
  inject: mi
};
function Tn(e, t) {
  return t ? e ? function() {
    return ae(
      j(e) ? e.call(this, this) : e,
      j(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function mi(e, t) {
  return It(Hs(e), Hs(t));
}
function Hs(e) {
  if (F(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function _e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function It(e, t) {
  return e ? ae(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function En(e, t) {
  return e ? F(e) && F(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ae(
    /* @__PURE__ */ Object.create(null),
    Cn(e),
    Cn(t ?? {})
  ) : t;
}
function gi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = ae(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = _e(e[n], t[n]);
  return s;
}
function Ro() {
  return {
    app: null,
    config: {
      isNativeTag: Yn,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let _i = 0;
function vi(e, t) {
  return function(n, o = null) {
    j(n) || (n = ae({}, n)), o != null && !te(o) && (o = null);
    const r = Ro(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const d = r.app = {
      _uid: _i++,
      _component: n,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: tl,
      get config() {
        return r.config;
      },
      set config(u) {
      },
      use(u, ...p) {
        return i.has(u) || (u && j(u.install) ? (i.add(u), u.install(d, ...p)) : j(u) && (i.add(u), u(d, ...p))), d;
      },
      mixin(u) {
        return r.mixins.includes(u) || r.mixins.push(u), d;
      },
      component(u, p) {
        return p ? (r.components[u] = p, d) : r.components[u];
      },
      directive(u, p) {
        return p ? (r.directives[u] = p, d) : r.directives[u];
      },
      mount(u, p, w) {
        if (!a) {
          const E = d._ceVNode || T(n, o);
          return E.appContext = r, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(E, u, w), a = !0, d._container = u, u.__vue_app__ = d, un(E.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        a && (We(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(u, p) {
        return r.provides[u] = p, d;
      },
      runWithContext(u) {
        const p = St;
        St = d;
        try {
          return u();
        } finally {
          St = p;
        }
      }
    };
    return d;
  };
}
let St = null;
function bi(e, t) {
  if (me) {
    let s = me.provides;
    const n = me.parent && me.parent.provides;
    n === s && (s = me.provides = Object.create(n)), s[e] = t;
  }
}
function Zt(e, t, s = !1) {
  const n = Gi();
  if (n || St) {
    let o = St ? St._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return s && j(t) ? t.call(n && n.proxy) : t;
  }
}
const Do = {}, Fo = () => Object.create(Do), No = (e) => Object.getPrototypeOf(e) === Do;
function xi(e, t, s, n = !1) {
  const o = {}, r = Fo();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), jo(e, t, o, r);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  s ? e.props = n ? o : Rr(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function wi(e, t, s, n) {
  const {
    props: o,
    attrs: r,
    vnode: { patchFlag: i }
  } = e, l = B(o), [a] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        let w = u[p];
        if (vs(e.emitsOptions, w))
          continue;
        const E = t[w];
        if (a)
          if (U(r, w))
            E !== r[w] && (r[w] = E, d = !0);
          else {
            const $ = we(w);
            o[$] = Ls(
              a,
              l,
              $,
              E,
              e,
              !1
            );
          }
        else
          E !== r[w] && (r[w] = E, d = !0);
      }
    }
  } else {
    jo(e, t, o, r) && (d = !0);
    let u;
    for (const p in l)
      (!t || // for camelCase
      !U(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Ae(p)) === p || !U(t, u))) && (a ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[u] !== void 0) && (o[p] = Ls(
        a,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (r !== l)
      for (const p in r)
        (!t || !U(t, p)) && (delete r[p], d = !0);
  }
  d && Ye(e.attrs, "set", "");
}
function jo(e, t, s, n) {
  const [o, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if ($t(a))
        continue;
      const d = t[a];
      let u;
      o && U(o, u = we(a)) ? !r || !r.includes(u) ? s[u] = d : (l || (l = {}))[u] = d : vs(e.emitsOptions, a) || (!(a in n) || d !== n[a]) && (n[a] = d, i = !0);
    }
  if (r) {
    const a = B(s), d = l || Z;
    for (let u = 0; u < r.length; u++) {
      const p = r[u];
      s[p] = Ls(
        o,
        a,
        p,
        d[p],
        e,
        !U(d, p)
      );
    }
  }
  return i;
}
function Ls(e, t, s, n, o, r) {
  const i = e[s];
  if (i != null) {
    const l = U(i, "default");
    if (l && n === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && j(a)) {
        const { propsDefaults: d } = o;
        if (s in d)
          n = d[s];
        else {
          const u = Kt(o);
          n = d[s] = a.call(
            null,
            t
          ), u();
        }
      } else
        n = a;
      o.ce && o.ce._setProp(s, n);
    }
    i[
      0
      /* shouldCast */
    ] && (r && !l ? n = !1 : i[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Ae(s)) && (n = !0));
  }
  return n;
}
const yi = /* @__PURE__ */ new WeakMap();
function qo(e, t, s = !1) {
  const n = s ? yi : t.propsCache, o = n.get(e);
  if (o)
    return o;
  const r = e.props, i = {}, l = [];
  let a = !1;
  if (!j(e)) {
    const u = (p) => {
      a = !0;
      const [w, E] = qo(p, t, !0);
      ae(i, w), E && l.push(...E);
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!r && !a)
    return te(e) && n.set(e, bt), bt;
  if (F(r))
    for (let u = 0; u < r.length; u++) {
      const p = we(r[u]);
      On(p) && (i[p] = Z);
    }
  else if (r)
    for (const u in r) {
      const p = we(u);
      if (On(p)) {
        const w = r[u], E = i[p] = F(w) || j(w) ? { type: w } : ae({}, w), $ = E.type;
        let R = !1, oe = !0;
        if (F($))
          for (let H = 0; H < $.length; ++H) {
            const z = $[H], V = j(z) && z.name;
            if (V === "Boolean") {
              R = !0;
              break;
            } else V === "String" && (oe = !1);
          }
        else
          R = j($) && $.name === "Boolean";
        E[
          0
          /* shouldCast */
        ] = R, E[
          1
          /* shouldCastTrue */
        ] = oe, (R || U(E, "default")) && l.push(p);
      }
    }
  const d = [i, l];
  return te(e) && n.set(e, d), d;
}
function On(e) {
  return e[0] !== "$" && !$t(e);
}
const rn = (e) => e === "_" || e === "_ctx" || e === "$stable", ln = (e) => F(e) ? e.map(Ue) : [Ue(e)], Ci = (e, t, s) => {
  if (t._n)
    return t;
  const n = N((...o) => ln(t(...o)), s);
  return n._c = !1, n;
}, Ho = (e, t, s) => {
  const n = e._ctx;
  for (const o in e) {
    if (rn(o)) continue;
    const r = e[o];
    if (j(r))
      t[o] = Ci(o, r, n);
    else if (r != null) {
      const i = ln(r);
      t[o] = () => i;
    }
  }
}, Lo = (e, t) => {
  const s = ln(t);
  e.slots.default = () => s;
}, Vo = (e, t, s) => {
  for (const n in t)
    (s || !rn(n)) && (e[n] = t[n]);
}, Si = (e, t, s) => {
  const n = e.slots = Fo();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Vo(n, t, s), s && eo(n, "_", o, !0)) : Ho(t, n);
  } else t && Lo(e, t);
}, Ti = (e, t, s) => {
  const { vnode: n, slots: o } = e;
  let r = !0, i = Z;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? r = !1 : Vo(o, t, s) : (r = !t.$stable, Ho(t, o)), i = t;
  } else t && (Lo(e, t), i = { default: 1 });
  if (r)
    for (const l in o)
      !rn(l) && i[l] == null && delete o[l];
}, Oe = Hi;
function Ei(e) {
  return Oi(e);
}
function Oi(e, t) {
  const s = hs();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: r,
    createElement: i,
    createText: l,
    createComment: a,
    setText: d,
    setElementText: u,
    parentNode: p,
    nextSibling: w,
    setScopeId: E = Be,
    insertStaticContent: $
  } = e, R = (c, f, h, b = null, g = null, _ = null, S = void 0, C = null, y = !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !At(c, f) && (b = k(c), m(c, g, _, !0), c = null), f.patchFlag === -2 && (y = !1, f.dynamicChildren = null);
    const { type: x, ref: I, shapeFlag: O } = f;
    switch (x) {
      case bs:
        oe(c, f, h, b);
        break;
      case Qe:
        H(c, f, h, b);
        break;
      case ks:
        c == null && z(f, h, b, S);
        break;
      case pe:
        ut(
          c,
          f,
          h,
          b,
          g,
          _,
          S,
          C,
          y
        );
        break;
      default:
        O & 1 ? G(
          c,
          f,
          h,
          b,
          g,
          _,
          S,
          C,
          y
        ) : O & 6 ? Fe(
          c,
          f,
          h,
          b,
          g,
          _,
          S,
          C,
          y
        ) : (O & 64 || O & 128) && x.process(
          c,
          f,
          h,
          b,
          g,
          _,
          S,
          C,
          y,
          Ot
        );
    }
    I != null && g ? Ft(I, c && c.ref, _, f || c, !f) : I == null && c && c.ref != null && Ft(c.ref, null, _, c, !0);
  }, oe = (c, f, h, b) => {
    if (c == null)
      n(
        f.el = l(f.children),
        h,
        b
      );
    else {
      const g = f.el = c.el;
      f.children !== c.children && d(g, f.children);
    }
  }, H = (c, f, h, b) => {
    c == null ? n(
      f.el = a(f.children || ""),
      h,
      b
    ) : f.el = c.el;
  }, z = (c, f, h, b) => {
    [c.el, c.anchor] = $(
      c.children,
      f,
      h,
      b,
      c.el,
      c.anchor
    );
  }, V = ({ el: c, anchor: f }, h, b) => {
    let g;
    for (; c && c !== f; )
      g = w(c), n(c, h, b), c = g;
    n(f, h, b);
  }, M = ({ el: c, anchor: f }) => {
    let h;
    for (; c && c !== f; )
      h = w(c), o(c), c = h;
    o(f);
  }, G = (c, f, h, b, g, _, S, C, y) => {
    f.type === "svg" ? S = "svg" : f.type === "math" && (S = "mathml"), c == null ? ce(
      f,
      h,
      b,
      g,
      _,
      S,
      C,
      y
    ) : ct(
      c,
      f,
      g,
      _,
      S,
      C,
      y
    );
  }, ce = (c, f, h, b, g, _, S, C) => {
    let y, x;
    const { props: I, shapeFlag: O, transition: A, dirs: D } = c;
    if (y = c.el = i(
      c.type,
      _,
      I && I.is,
      I
    ), O & 8 ? u(y, c.children) : O & 16 && Ie(
      c.children,
      y,
      null,
      b,
      g,
      Os(c, _),
      S,
      C
    ), D && dt(c, null, b, "created"), re(y, c, c.scopeId, S, b), I) {
      for (const J in I)
        J !== "value" && !$t(J) && r(y, J, null, I[J], _, b);
      "value" in I && r(y, "value", null, I.value, _), (x = I.onVnodeBeforeMount) && Le(x, b, c);
    }
    D && dt(c, null, b, "beforeMount");
    const q = ki(g, A);
    q && A.beforeEnter(y), n(y, f, h), ((x = I && I.onVnodeMounted) || q || D) && Oe(() => {
      x && Le(x, b, c), q && A.enter(y), D && dt(c, null, b, "mounted");
    }, g);
  }, re = (c, f, h, b, g) => {
    if (h && E(c, h), b)
      for (let _ = 0; _ < b.length; _++)
        E(c, b[_]);
    if (g) {
      let _ = g.subTree;
      if (f === _ || Go(_.type) && (_.ssContent === f || _.ssFallback === f)) {
        const S = g.vnode;
        re(
          c,
          S,
          S.scopeId,
          S.slotScopeIds,
          g.parent
        );
      }
    }
  }, Ie = (c, f, h, b, g, _, S, C, y = 0) => {
    for (let x = y; x < c.length; x++) {
      const I = c[x] = C ? nt(c[x]) : Ue(c[x]);
      R(
        null,
        I,
        f,
        h,
        b,
        g,
        _,
        S,
        C
      );
    }
  }, ct = (c, f, h, b, g, _, S) => {
    const C = f.el = c.el;
    let { patchFlag: y, dynamicChildren: x, dirs: I } = f;
    y |= c.patchFlag & 16;
    const O = c.props || Z, A = f.props || Z;
    let D;
    if (h && pt(h, !1), (D = A.onVnodeBeforeUpdate) && Le(D, h, f, c), I && dt(f, c, h, "beforeUpdate"), h && pt(h, !0), (O.innerHTML && A.innerHTML == null || O.textContent && A.textContent == null) && u(C, ""), x ? Ke(
      c.dynamicChildren,
      x,
      C,
      h,
      b,
      Os(f, g),
      _
    ) : S || K(
      c,
      f,
      C,
      null,
      h,
      b,
      Os(f, g),
      _,
      !1
    ), y > 0) {
      if (y & 16)
        $e(C, O, A, h, g);
      else if (y & 2 && O.class !== A.class && r(C, "class", null, A.class, g), y & 4 && r(C, "style", O.style, A.style, g), y & 8) {
        const q = f.dynamicProps;
        for (let J = 0; J < q.length; J++) {
          const W = q[J], ye = O[W], Ce = A[W];
          (Ce !== ye || W === "value") && r(C, W, ye, Ce, g, h);
        }
      }
      y & 1 && c.children !== f.children && u(C, f.children);
    } else !S && x == null && $e(C, O, A, h, g);
    ((D = A.onVnodeUpdated) || I) && Oe(() => {
      D && Le(D, h, f, c), I && dt(f, c, h, "updated");
    }, b);
  }, Ke = (c, f, h, b, g, _, S) => {
    for (let C = 0; C < f.length; C++) {
      const y = c[C], x = f[C], I = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        y.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (y.type === pe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !At(y, x) || // - In the case of a component, it could contain anything.
        y.shapeFlag & 198) ? p(y.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      R(
        y,
        x,
        I,
        null,
        b,
        g,
        _,
        S,
        !0
      );
    }
  }, $e = (c, f, h, b, g) => {
    if (f !== h) {
      if (f !== Z)
        for (const _ in f)
          !$t(_) && !(_ in h) && r(
            c,
            _,
            f[_],
            null,
            g,
            b
          );
      for (const _ in h) {
        if ($t(_)) continue;
        const S = h[_], C = f[_];
        S !== C && _ !== "value" && r(c, _, C, S, g, b);
      }
      "value" in h && r(c, "value", f.value, h.value, g);
    }
  }, ut = (c, f, h, b, g, _, S, C, y) => {
    const x = f.el = c ? c.el : l(""), I = f.anchor = c ? c.anchor : l("");
    let { patchFlag: O, dynamicChildren: A, slotScopeIds: D } = f;
    D && (C = C ? C.concat(D) : D), c == null ? (n(x, h, b), n(I, h, b), Ie(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      h,
      I,
      g,
      _,
      S,
      C,
      y
    )) : O > 0 && O & 64 && A && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (Ke(
      c.dynamicChildren,
      A,
      h,
      g,
      _,
      S,
      C
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || g && f === g.subTree) && Uo(
      c,
      f,
      !0
      /* shallow */
    )) : K(
      c,
      f,
      h,
      I,
      g,
      _,
      S,
      C,
      y
    );
  }, Fe = (c, f, h, b, g, _, S, C, y) => {
    f.slotScopeIds = C, c == null ? f.shapeFlag & 512 ? g.ctx.activate(
      f,
      h,
      b,
      S,
      y
    ) : Et(
      f,
      h,
      b,
      g,
      _,
      S,
      y
    ) : zt(c, f, y);
  }, Et = (c, f, h, b, g, _, S) => {
    const C = c.component = zi(
      c,
      b,
      g
    );
    if (ko(c) && (C.ctx.renderer = Ot), Ji(C, !1, S), C.asyncDep) {
      if (g && g.registerDep(C, fe, S), !c.el) {
        const y = C.subTree = T(Qe);
        H(null, y, f, h), c.placeholder = y.el;
      }
    } else
      fe(
        C,
        c,
        f,
        h,
        g,
        _,
        S
      );
  }, zt = (c, f, h) => {
    const b = f.component = c.component;
    if (ji(c, f, h))
      if (b.asyncDep && !b.asyncResolved) {
        Q(b, f, h);
        return;
      } else
        b.next = f, b.update();
    else
      f.el = c.el, b.vnode = f;
  }, fe = (c, f, h, b, g, _, S) => {
    const C = () => {
      if (c.isMounted) {
        let { next: O, bu: A, u: D, parent: q, vnode: J } = c;
        {
          const qe = Bo(c);
          if (qe) {
            O && (O.el = J.el, Q(c, O, S)), qe.asyncDep.then(() => {
              c.isUnmounted || C();
            });
            return;
          }
        }
        let W = O, ye;
        pt(c, !1), O ? (O.el = J.el, Q(c, O, S)) : O = J, A && ws(A), (ye = O.props && O.props.onVnodeBeforeUpdate) && Le(ye, q, O, J), pt(c, !0);
        const Ce = Mn(c), je = c.subTree;
        c.subTree = Ce, R(
          je,
          Ce,
          // parent may have changed if it's in a teleport
          p(je.el),
          // anchor may have changed if it's in a fragment
          k(je),
          c,
          g,
          _
        ), O.el = Ce.el, W === null && qi(c, Ce.el), D && Oe(D, g), (ye = O.props && O.props.onVnodeUpdated) && Oe(
          () => Le(ye, q, O, J),
          g
        );
      } else {
        let O;
        const { el: A, props: D } = f, { bm: q, m: J, parent: W, root: ye, type: Ce } = c, je = Ct(f);
        pt(c, !1), q && ws(q), !je && (O = D && D.onVnodeBeforeMount) && Le(O, W, f), pt(c, !0);
        {
          ye.ce && // @ts-expect-error _def is private
          ye.ce._def.shadowRoot !== !1 && ye.ce._injectChildStyle(Ce);
          const qe = c.subTree = Mn(c);
          R(
            null,
            qe,
            h,
            b,
            c,
            g,
            _
          ), f.el = qe.el;
        }
        if (J && Oe(J, g), !je && (O = D && D.onVnodeMounted)) {
          const qe = f;
          Oe(
            () => Le(O, W, qe),
            g
          );
        }
        (f.shapeFlag & 256 || W && Ct(W.vnode) && W.vnode.shapeFlag & 256) && c.a && Oe(c.a, g), c.isMounted = !0, f = h = b = null;
      }
    };
    c.scope.on();
    const y = c.effect = new oo(C);
    c.scope.off();
    const x = c.update = y.run.bind(y), I = c.job = y.runIfDirty.bind(y);
    I.i = c, I.id = c.uid, y.scheduler = () => nn(I), pt(c, !0), x();
  }, Q = (c, f, h) => {
    f.component = c;
    const b = c.vnode.props;
    c.vnode = f, c.next = null, wi(c, f.props, b, h), Ti(c, f.children, h), Xe(), xn(c), Ze();
  }, K = (c, f, h, b, g, _, S, C, y = !1) => {
    const x = c && c.children, I = c ? c.shapeFlag : 0, O = f.children, { patchFlag: A, shapeFlag: D } = f;
    if (A > 0) {
      if (A & 128) {
        ft(
          x,
          O,
          h,
          b,
          g,
          _,
          S,
          C,
          y
        );
        return;
      } else if (A & 256) {
        ze(
          x,
          O,
          h,
          b,
          g,
          _,
          S,
          C,
          y
        );
        return;
      }
    }
    D & 8 ? (I & 16 && Te(x, g, _), O !== x && u(h, O)) : I & 16 ? D & 16 ? ft(
      x,
      O,
      h,
      b,
      g,
      _,
      S,
      C,
      y
    ) : Te(x, g, _, !0) : (I & 8 && u(h, ""), D & 16 && Ie(
      O,
      h,
      b,
      g,
      _,
      S,
      C,
      y
    ));
  }, ze = (c, f, h, b, g, _, S, C, y) => {
    c = c || bt, f = f || bt;
    const x = c.length, I = f.length, O = Math.min(x, I);
    let A;
    for (A = 0; A < O; A++) {
      const D = f[A] = y ? nt(f[A]) : Ue(f[A]);
      R(
        c[A],
        D,
        h,
        null,
        g,
        _,
        S,
        C,
        y
      );
    }
    x > I ? Te(
      c,
      g,
      _,
      !0,
      !1,
      O
    ) : Ie(
      f,
      h,
      b,
      g,
      _,
      S,
      C,
      y,
      O
    );
  }, ft = (c, f, h, b, g, _, S, C, y) => {
    let x = 0;
    const I = f.length;
    let O = c.length - 1, A = I - 1;
    for (; x <= O && x <= A; ) {
      const D = c[x], q = f[x] = y ? nt(f[x]) : Ue(f[x]);
      if (At(D, q))
        R(
          D,
          q,
          h,
          null,
          g,
          _,
          S,
          C,
          y
        );
      else
        break;
      x++;
    }
    for (; x <= O && x <= A; ) {
      const D = c[O], q = f[A] = y ? nt(f[A]) : Ue(f[A]);
      if (At(D, q))
        R(
          D,
          q,
          h,
          null,
          g,
          _,
          S,
          C,
          y
        );
      else
        break;
      O--, A--;
    }
    if (x > O) {
      if (x <= A) {
        const D = A + 1, q = D < I ? f[D].el : b;
        for (; x <= A; )
          R(
            null,
            f[x] = y ? nt(f[x]) : Ue(f[x]),
            h,
            q,
            g,
            _,
            S,
            C,
            y
          ), x++;
      }
    } else if (x > A)
      for (; x <= O; )
        m(c[x], g, _, !0), x++;
    else {
      const D = x, q = x, J = /* @__PURE__ */ new Map();
      for (x = q; x <= A; x++) {
        const Ee = f[x] = y ? nt(f[x]) : Ue(f[x]);
        Ee.key != null && J.set(Ee.key, x);
      }
      let W, ye = 0;
      const Ce = A - q + 1;
      let je = !1, qe = 0;
      const kt = new Array(Ce);
      for (x = 0; x < Ce; x++) kt[x] = 0;
      for (x = D; x <= O; x++) {
        const Ee = c[x];
        if (ye >= Ce) {
          m(Ee, g, _, !0);
          continue;
        }
        let He;
        if (Ee.key != null)
          He = J.get(Ee.key);
        else
          for (W = q; W <= A; W++)
            if (kt[W - q] === 0 && At(Ee, f[W])) {
              He = W;
              break;
            }
        He === void 0 ? m(Ee, g, _, !0) : (kt[He - q] = x + 1, He >= qe ? qe = He : je = !0, R(
          Ee,
          f[He],
          h,
          null,
          g,
          _,
          S,
          C,
          y
        ), ye++);
      }
      const pn = je ? Mi(kt) : bt;
      for (W = pn.length - 1, x = Ce - 1; x >= 0; x--) {
        const Ee = q + x, He = f[Ee], hn = f[Ee + 1], mn = Ee + 1 < I ? (
          // #13559, fallback to el placeholder for unresolved async component
          hn.el || hn.placeholder
        ) : b;
        kt[x] === 0 ? R(
          null,
          He,
          h,
          mn,
          g,
          _,
          S,
          C,
          y
        ) : je && (W < 0 || x !== pn[W] ? P(He, h, mn, 2) : W--);
      }
    }
  }, P = (c, f, h, b, g = null) => {
    const { el: _, type: S, transition: C, children: y, shapeFlag: x } = c;
    if (x & 6) {
      P(c.component.subTree, f, h, b);
      return;
    }
    if (x & 128) {
      c.suspense.move(f, h, b);
      return;
    }
    if (x & 64) {
      S.move(c, f, h, Ot);
      return;
    }
    if (S === pe) {
      n(_, f, h);
      for (let O = 0; O < y.length; O++)
        P(y[O], f, h, b);
      n(c.anchor, f, h);
      return;
    }
    if (S === ks) {
      V(c, f, h);
      return;
    }
    if (b !== 2 && x & 1 && C)
      if (b === 0)
        C.beforeEnter(_), n(_, f, h), Oe(() => C.enter(_), g);
      else {
        const { leave: O, delayLeave: A, afterLeave: D } = C, q = () => {
          c.ctx.isUnmounted ? o(_) : n(_, f, h);
        }, J = () => {
          _._isLeaving && _[Gr](
            !0
            /* cancelled */
          ), O(_, () => {
            q(), D && D();
          });
        };
        A ? A(_, q, J) : J();
      }
    else
      n(_, f, h);
  }, m = (c, f, h, b = !1, g = !1) => {
    const {
      type: _,
      props: S,
      ref: C,
      children: y,
      dynamicChildren: x,
      shapeFlag: I,
      patchFlag: O,
      dirs: A,
      cacheIndex: D
    } = c;
    if (O === -2 && (g = !1), C != null && (Xe(), Ft(C, null, h, c, !0), Ze()), D != null && (f.renderCache[D] = void 0), I & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const q = I & 1 && A, J = !Ct(c);
    let W;
    if (J && (W = S && S.onVnodeBeforeUnmount) && Le(W, f, c), I & 6)
      ue(c.component, h, b);
    else {
      if (I & 128) {
        c.suspense.unmount(h, b);
        return;
      }
      q && dt(c, null, f, "beforeUnmount"), I & 64 ? c.type.remove(
        c,
        f,
        h,
        Ot,
        b
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== pe || O > 0 && O & 64) ? Te(
        x,
        f,
        h,
        !1,
        !0
      ) : (_ === pe && O & 384 || !g && I & 16) && Te(y, f, h), b && ie(c);
    }
    (J && (W = S && S.onVnodeUnmounted) || q) && Oe(() => {
      W && Le(W, f, c), q && dt(c, null, f, "unmounted");
    }, h);
  }, ie = (c) => {
    const { type: f, el: h, anchor: b, transition: g } = c;
    if (f === pe) {
      L(h, b);
      return;
    }
    if (f === ks) {
      M(c);
      return;
    }
    const _ = () => {
      o(h), g && !g.persisted && g.afterLeave && g.afterLeave();
    };
    if (c.shapeFlag & 1 && g && !g.persisted) {
      const { leave: S, delayLeave: C } = g, y = () => S(h, _);
      C ? C(c.el, _, y) : y();
    } else
      _();
  }, L = (c, f) => {
    let h;
    for (; c !== f; )
      h = w(c), o(c), c = h;
    o(f);
  }, ue = (c, f, h) => {
    const { bum: b, scope: g, job: _, subTree: S, um: C, m: y, a: x } = c;
    kn(y), kn(x), b && ws(b), g.stop(), _ && (_.flags |= 8, m(S, c, f, h)), C && Oe(C, f), Oe(() => {
      c.isUnmounted = !0;
    }, f);
  }, Te = (c, f, h, b = !1, g = !1, _ = 0) => {
    for (let S = _; S < c.length; S++)
      m(c[S], f, h, b, g);
  }, k = (c) => {
    if (c.shapeFlag & 6)
      return k(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const f = w(c.anchor || c.el), h = f && f[Kr];
    return h ? w(h) : f;
  };
  let Ne = !1;
  const dn = (c, f, h) => {
    c == null ? f._vnode && m(f._vnode, null, null, !0) : R(
      f._vnode || null,
      c,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = c, Ne || (Ne = !0, xn(), Co(), Ne = !1);
  }, Ot = {
    p: R,
    um: m,
    m: P,
    r: ie,
    mt: Et,
    mc: Ie,
    pc: K,
    pbc: Ke,
    n: k,
    o: e
  };
  return {
    render: dn,
    hydrate: void 0,
    createApp: vi(dn)
  };
}
function Os({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function pt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ki(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Uo(e, t, s = !1) {
  const n = e.children, o = t.children;
  if (F(n) && F(o))
    for (let r = 0; r < n.length; r++) {
      const i = n[r];
      let l = o[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[r] = nt(o[r]), l.el = i.el), !s && l.patchFlag !== -2 && Uo(i, l)), l.type === bs && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = i.el), l.type === Qe && !l.el && (l.el = i.el);
    }
}
function Mi(e) {
  const t = e.slice(), s = [0];
  let n, o, r, i, l;
  const a = e.length;
  for (n = 0; n < a; n++) {
    const d = e[n];
    if (d !== 0) {
      if (o = s[s.length - 1], e[o] < d) {
        t[n] = o, s.push(n);
        continue;
      }
      for (r = 0, i = s.length - 1; r < i; )
        l = r + i >> 1, e[s[l]] < d ? r = l + 1 : i = l;
      d < e[s[r]] && (r > 0 && (t[n] = s[r - 1]), s[r] = n);
    }
  }
  for (r = s.length, i = s[r - 1]; r-- > 0; )
    s[r] = i, i = t[i];
  return s;
}
function Bo(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Bo(t);
}
function kn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Ai = Symbol.for("v-scx"), Pi = () => Zt(Ai);
function Qt(e, t, s) {
  return Wo(e, t, s);
}
function Wo(e, t, s = Z) {
  const { immediate: n, deep: o, flush: r, once: i } = s, l = ae({}, s), a = t && n || !t && r !== "post";
  let d;
  if (Ut) {
    if (r === "sync") {
      const E = Pi();
      d = E.__watcherHandles || (E.__watcherHandles = []);
    } else if (!a) {
      const E = () => {
      };
      return E.stop = Be, E.resume = Be, E.pause = Be, E;
    }
  }
  const u = me;
  l.call = (E, $, R) => We(E, u, $, R);
  let p = !1;
  r === "post" ? l.scheduler = (E) => {
    Oe(E, u && u.suspense);
  } : r !== "sync" && (p = !0, l.scheduler = (E, $) => {
    $ ? E() : nn(E);
  }), l.augmentJob = (E) => {
    t && (E.flags |= 4), p && (E.flags |= 2, u && (E.id = u.uid, E.i = u));
  };
  const w = Vr(e, t, l);
  return Ut && (d ? d.push(w) : a && w()), w;
}
function Ii(e, t, s) {
  const n = this.proxy, o = ne(e) ? e.includes(".") ? Ko(n, e) : () => n[e] : e.bind(n, n);
  let r;
  j(t) ? r = t : (r = t.handler, s = t);
  const i = Kt(this), l = Wo(o, r.bind(n), s);
  return i(), l;
}
function Ko(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let o = 0; o < s.length && n; o++)
      n = n[s[o]];
    return n;
  };
}
const $i = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${we(t)}Modifiers`] || e[`${Ae(t)}Modifiers`];
function Ri(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || Z;
  let o = s;
  const r = t.startsWith("update:"), i = r && $i(n, t.slice(7));
  i && (i.trim && (o = s.map((u) => ne(u) ? u.trim() : u)), i.number && (o = s.map(lr)));
  let l, a = n[l = xs(t)] || // also try camelCase event handler (#2249)
  n[l = xs(we(t))];
  !a && r && (a = n[l = xs(Ae(t))]), a && We(
    a,
    e,
    6,
    o
  );
  const d = n[l + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, We(
      d,
      e,
      6,
      o
    );
  }
}
const Di = /* @__PURE__ */ new WeakMap();
function zo(e, t, s = !1) {
  const n = s ? Di : t.emitsCache, o = n.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let i = {}, l = !1;
  if (!j(e)) {
    const a = (d) => {
      const u = zo(d, t, !0);
      u && (l = !0, ae(i, u));
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !r && !l ? (te(e) && n.set(e, null), null) : (F(r) ? r.forEach((a) => i[a] = null) : ae(i, r), te(e) && n.set(e, i), i);
}
function vs(e, t) {
  return !e || !cs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), U(e, t[0].toLowerCase() + t.slice(1)) || U(e, Ae(t)) || U(e, t));
}
function Mn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    propsOptions: [r],
    slots: i,
    attrs: l,
    emit: a,
    render: d,
    renderCache: u,
    props: p,
    data: w,
    setupState: E,
    ctx: $,
    inheritAttrs: R
  } = e, oe = rs(e);
  let H, z;
  try {
    if (s.shapeFlag & 4) {
      const M = o || n, G = M;
      H = Ue(
        d.call(
          G,
          M,
          u,
          p,
          E,
          w,
          $
        )
      ), z = l;
    } else {
      const M = t;
      H = Ue(
        M.length > 1 ? M(
          p,
          { attrs: l, slots: i, emit: a }
        ) : M(
          p,
          null
        )
      ), z = t.props ? l : Fi(l);
    }
  } catch (M) {
    jt.length = 0, gs(M, e, 1), H = T(Qe);
  }
  let V = H;
  if (z && R !== !1) {
    const M = Object.keys(z), { shapeFlag: G } = V;
    M.length && G & 7 && (r && M.some(Ws) && (z = Ni(
      z,
      r
    )), V = Tt(V, z, !1, !0));
  }
  return s.dirs && (V = Tt(V, null, !1, !0), V.dirs = V.dirs ? V.dirs.concat(s.dirs) : s.dirs), s.transition && on(V, s.transition), H = V, rs(oe), H;
}
const Fi = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || cs(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Ni = (e, t) => {
  const s = {};
  for (const n in e)
    (!Ws(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function ji(e, t, s) {
  const { props: n, children: o, component: r } = e, { props: i, children: l, patchFlag: a } = t, d = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return n ? An(n, i, d) : !!i;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        const w = u[p];
        if (i[w] !== n[w] && !vs(d, w))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : n === i ? !1 : n ? i ? An(n, i, d) : !0 : !!i;
  return !1;
}
function An(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    if (t[r] !== e[r] && !vs(s, r))
      return !0;
  }
  return !1;
}
function qi({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const Go = (e) => e.__isSuspense;
function Hi(e, t) {
  t && t.pendingBranch ? F(e) ? t.effects.push(...e) : t.effects.push(e) : Wr(e);
}
const pe = Symbol.for("v-fgt"), bs = Symbol.for("v-txt"), Qe = Symbol.for("v-cmt"), ks = Symbol.for("v-stc"), jt = [];
let Me = null;
function Y(e = !1) {
  jt.push(Me = e ? null : []);
}
function Li() {
  jt.pop(), Me = jt[jt.length - 1] || null;
}
let Vt = 1;
function Pn(e, t = !1) {
  Vt += e, e < 0 && Me && t && (Me.hasOnce = !0);
}
function Jo(e) {
  return e.dynamicChildren = Vt > 0 ? Me || bt : null, Li(), Vt > 0 && Me && Me.push(e), e;
}
function Re(e, t, s, n, o, r) {
  return Jo(
    v(
      e,
      t,
      s,
      n,
      o,
      r,
      !0
    )
  );
}
function ve(e, t, s, n, o) {
  return Jo(
    T(
      e,
      t,
      s,
      n,
      o,
      !0
    )
  );
}
function an(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function At(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Yo = ({ key: e }) => e ?? null, es = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? ne(e) || ge(e) || j(e) ? { i: xe, r: e, k: t, f: !!s } : e : null);
function v(e, t = null, s = null, n = 0, o = null, r = e === pe ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Yo(t),
    ref: t && es(t),
    scopeId: To,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: xe
  };
  return l ? (cn(a, s), r & 128 && e.normalize(a)) : s && (a.shapeFlag |= ne(s) ? 8 : 16), Vt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Me && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Me.push(a), a;
}
const T = Vi;
function Vi(e, t = null, s = null, n = 0, o = null, r = !1) {
  if ((!e || e === ai) && (e = Qe), an(e)) {
    const l = Tt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && cn(l, s), Vt > 0 && !r && Me && (l.shapeFlag & 6 ? Me[Me.indexOf(e)] = l : Me.push(l)), l.patchFlag = -2, l;
  }
  if (el(e) && (e = e.__vccOpts), t) {
    t = Ui(t);
    let { class: l, style: a } = t;
    l && !ne(l) && (t.class = Bt(l)), te(a) && (sn(a) && !F(a) && (a = ae({}, a)), t.style = Gs(a));
  }
  const i = ne(e) ? 1 : Go(e) ? 128 : zr(e) ? 64 : te(e) ? 4 : j(e) ? 2 : 0;
  return v(
    e,
    t,
    s,
    n,
    o,
    i,
    r,
    !0
  );
}
function Ui(e) {
  return e ? sn(e) || No(e) ? ae({}, e) : e : null;
}
function Tt(e, t, s = !1, n = !1) {
  const { props: o, ref: r, patchFlag: i, children: l, transition: a } = e, d = t ? Bi(o || {}, t) : o, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Yo(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? F(r) ? r.concat(es(t)) : [r, es(t)] : es(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== pe ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Tt(e.ssContent),
    ssFallback: e.ssFallback && Tt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && n && on(
    u,
    a.clone(u)
  ), u;
}
function se(e = " ", t = 0) {
  return T(bs, null, e, t);
}
function rt(e = "", t = !1) {
  return t ? (Y(), ve(Qe, null, e)) : T(Qe, null, e);
}
function Ue(e) {
  return e == null || typeof e == "boolean" ? T(Qe) : F(e) ? T(
    pe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : an(e) ? nt(e) : T(bs, null, String(e));
}
function nt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Tt(e);
}
function cn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (F(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), cn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !No(t) ? t._ctx = xe : o === 3 && xe && (xe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else j(t) ? (t = { default: t, _ctx: xe }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [se(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Bi(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = Bt([t.class, n.class]));
      else if (o === "style")
        t.style = Gs([t.style, n.style]);
      else if (cs(o)) {
        const r = t[o], i = n[o];
        i && r !== i && !(F(r) && r.includes(i)) && (t[o] = r ? [].concat(r, i) : i);
      } else o !== "" && (t[o] = n[o]);
  }
  return t;
}
function Le(e, t, s, n = null) {
  We(e, t, 7, [
    s,
    n
  ]);
}
const Wi = Ro();
let Ki = 0;
function zi(e, t, s) {
  const n = e.type, o = (t ? t.appContext : e.appContext) || Wi, r = {
    uid: Ki++,
    vnode: e,
    type: n,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new hr(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: qo(n, o),
    emitsOptions: zo(n, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Z,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: Z,
    data: Z,
    props: Z,
    attrs: Z,
    slots: Z,
    refs: Z,
    setupState: Z,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Ri.bind(null, r), e.ce && e.ce(r), r;
}
let me = null;
const Gi = () => me || xe;
let as, Vs;
{
  const e = hs(), t = (s, n) => {
    let o;
    return (o = e[s]) || (o = e[s] = []), o.push(n), (r) => {
      o.length > 1 ? o.forEach((i) => i(r)) : o[0](r);
    };
  };
  as = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => me = s
  ), Vs = t(
    "__VUE_SSR_SETTERS__",
    (s) => Ut = s
  );
}
const Kt = (e) => {
  const t = me;
  return as(e), e.scope.on(), () => {
    e.scope.off(), as(t);
  };
}, In = () => {
  me && me.scope.off(), as(null);
};
function Xo(e) {
  return e.vnode.shapeFlag & 4;
}
let Ut = !1;
function Ji(e, t = !1, s = !1) {
  t && Vs(t);
  const { props: n, children: o } = e.vnode, r = Xo(e);
  xi(e, n, r, t), Si(e, o, s || t);
  const i = r ? Yi(e, t) : void 0;
  return t && Vs(!1), i;
}
function Yi(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, fi);
  const { setup: n } = s;
  if (n) {
    Xe();
    const o = e.setupContext = n.length > 1 ? Zi(e) : null, r = Kt(e), i = Wt(
      n,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = Zn(i);
    if (Ze(), r(), (l || e.sp) && !Ct(e) && Oo(e), l) {
      if (i.then(In, In), t)
        return i.then((a) => {
          $n(e, a);
        }).catch((a) => {
          gs(a, e, 0);
        });
      e.asyncDep = i;
    } else
      $n(e, i);
  } else
    Zo(e);
}
function $n(e, t, s) {
  j(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : te(t) && (e.setupState = bo(t)), Zo(e);
}
function Zo(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Be);
  {
    const o = Kt(e);
    Xe();
    try {
      di(e);
    } finally {
      Ze(), o();
    }
  }
}
const Xi = {
  get(e, t) {
    return he(e, "get", ""), e[t];
  }
};
function Zi(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Xi),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function un(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(bo(Dr(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in Nt)
        return Nt[s](e);
    },
    has(t, s) {
      return s in t || s in Nt;
    }
  })) : e.proxy;
}
function Qi(e, t = !0) {
  return j(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function el(e) {
  return j(e) && "__vccOpts" in e;
}
const it = (e, t) => Hr(e, t, Ut), tl = "3.5.22";
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Us;
const Rn = typeof window < "u" && window.trustedTypes;
if (Rn)
  try {
    Us = /* @__PURE__ */ Rn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Qo = Us ? (e) => Us.createHTML(e) : (e) => e, sl = "http://www.w3.org/2000/svg", nl = "http://www.w3.org/1998/Math/MathML", Je = typeof document < "u" ? document : null, Dn = Je && /* @__PURE__ */ Je.createElement("template"), ol = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const o = t === "svg" ? Je.createElementNS(sl, e) : t === "mathml" ? Je.createElementNS(nl, e) : s ? Je.createElement(e, { is: s }) : Je.createElement(e);
    return e === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (e) => Je.createTextNode(e),
  createComment: (e) => Je.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Je.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, o, r) {
    const i = s ? s.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), s), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      Dn.innerHTML = Qo(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Dn.content;
      if (n === "svg" || n === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, s);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, rl = Symbol("_vtc");
function il(e, t, s) {
  const n = e[rl];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Fn = Symbol("_vod"), ll = Symbol("_vsh"), al = Symbol(""), cl = /(?:^|;)\s*display\s*:/;
function ul(e, t, s) {
  const n = e.style, o = ne(s);
  let r = !1;
  if (s && !o) {
    if (t)
      if (ne(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          s[l] == null && ts(n, l, "");
        }
      else
        for (const i in t)
          s[i] == null && ts(n, i, "");
    for (const i in s)
      i === "display" && (r = !0), ts(n, i, s[i]);
  } else if (o) {
    if (t !== s) {
      const i = n[al];
      i && (s += ";" + i), n.cssText = s, r = cl.test(s);
    }
  } else t && e.removeAttribute("style");
  Fn in e && (e[Fn] = r ? n.display : "", e[ll] && (n.display = "none"));
}
const Nn = /\s*!important$/;
function ts(e, t, s) {
  if (F(s))
    s.forEach((n) => ts(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = fl(e, t);
    Nn.test(s) ? e.setProperty(
      Ae(n),
      s.replace(Nn, ""),
      "important"
    ) : e[n] = s;
  }
}
const jn = ["Webkit", "Moz", "ms"], Ms = {};
function fl(e, t) {
  const s = Ms[t];
  if (s)
    return s;
  let n = we(t);
  if (n !== "filter" && n in e)
    return Ms[t] = n;
  n = ps(n);
  for (let o = 0; o < jn.length; o++) {
    const r = jn[o] + n;
    if (r in e)
      return Ms[t] = r;
  }
  return t;
}
const qn = "http://www.w3.org/1999/xlink";
function Hn(e, t, s, n, o, r = pr(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(qn, t.slice(6, t.length)) : e.setAttributeNS(qn, t, s) : s == null || r && !to(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : et(s) ? String(s) : s
  );
}
function Ln(e, t, s, n, o) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Qo(s) : s);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, a = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (l !== a || !("_value" in e)) && (e.value = a), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let i = !1;
  if (s === "" || s == null) {
    const l = typeof e[t];
    l === "boolean" ? s = to(s) : s == null && l === "string" ? (s = "", i = !0) : l === "number" && (s = 0, i = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  i && e.removeAttribute(o || t);
}
function dl(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function pl(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Vn = Symbol("_vei");
function hl(e, t, s, n, o = null) {
  const r = e[Vn] || (e[Vn] = {}), i = r[t];
  if (n && i)
    i.value = n;
  else {
    const [l, a] = ml(t);
    if (n) {
      const d = r[t] = vl(
        n,
        o
      );
      dl(e, l, d, a);
    } else i && (pl(e, l, i, a), r[t] = void 0);
  }
}
const Un = /(?:Once|Passive|Capture)$/;
function ml(e) {
  let t;
  if (Un.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Un); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ae(e.slice(2)), t];
}
let As = 0;
const gl = /* @__PURE__ */ Promise.resolve(), _l = () => As || (gl.then(() => As = 0), As = Date.now());
function vl(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    We(
      bl(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = _l(), s;
}
function bl(e, t) {
  if (F(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (o) => !o._stopped && n && n(o)
    );
  } else
    return t;
}
const Bn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, xl = (e, t, s, n, o, r) => {
  const i = o === "svg";
  t === "class" ? il(e, n, i) : t === "style" ? ul(e, s, n) : cs(t) ? Ws(t) || hl(e, t, s, n, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : wl(e, t, n, i)) ? (Ln(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Hn(e, t, n, i, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ne(n)) ? Ln(e, we(t), n, r, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Hn(e, t, n, i));
};
function wl(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Bn(t) && j(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Bn(t) && ne(s) ? !1 : t in e;
}
const Wn = {};
// @__NO_SIDE_EFFECTS__
function yl(e, t, s) {
  let n = /* @__PURE__ */ Eo(e, t);
  fs(n) && (n = ae({}, n, t));
  class o extends fn {
    constructor(i) {
      super(n, i, s);
    }
  }
  return o.def = n, o;
}
const Cl = typeof HTMLElement < "u" ? HTMLElement : class {
};
class fn extends Cl {
  constructor(t, s = {}, n = zn) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== zn ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      ae({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof fn) {
        this._parent = t;
        break;
      }
    this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._inheritParentContext(t));
  }
  _inheritParentContext(t = this._parent) {
    t && this._app && Object.setPrototypeOf(
      this._app._context.provides,
      t._instance.provides
    );
  }
  disconnectedCallback() {
    this._connected = !1, wo(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets && (this._teleportTargets.clear(), this._teleportTargets = void 0));
    });
  }
  _processMutations(t) {
    for (const s of t)
      this._setAttr(s.attributeName);
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
    const t = (n, o = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: r, styles: i } = n;
      let l;
      if (r && !F(r))
        for (const a in r) {
          const d = r[a];
          (d === Number || d && d.type === Number) && (a in this._props && (this._props[a] = gn(this._props[a])), (l || (l = /* @__PURE__ */ Object.create(null)))[we(a)] = !0);
        }
      this._numberProps = l, this._resolveProps(n), this.shadowRoot && this._applyStyles(i), this._mount(n);
    }, s = this._def.__asyncLoader;
    s ? this._pendingResolve = s().then((n) => {
      n.configureApp = this._def.configureApp, t(this._def = n, !0);
    }) : t(this._def);
  }
  _mount(t) {
    this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const s = this._instance && this._instance.exposed;
    if (s)
      for (const n in s)
        U(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => mt(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = F(s) ? s : Object.keys(s || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && n.includes(o) && this._setProp(o, this[o]);
    for (const o of n.map(we))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(r) {
          this._setProp(o, r, !0, !0);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const s = this.hasAttribute(t);
    let n = s ? this.getAttribute(t) : Wn;
    const o = we(t);
    s && this._numberProps && this._numberProps[o] && (n = gn(n)), this._setProp(o, n, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, s, n = !0, o = !1) {
    if (s !== this._props[t] && (s === Wn ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), o && this._instance && this._update(), n)) {
      const r = this._ob;
      r && (this._processMutations(r.takeRecords()), r.disconnect()), s === !0 ? this.setAttribute(Ae(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Ae(t), s + "") : s || this.removeAttribute(Ae(t)), r && r.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Ol(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = T(this._def, ae(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const o = (r, i) => {
        this.dispatchEvent(
          new CustomEvent(
            r,
            fs(i[0]) ? ae({ detail: i }, i[0]) : { detail: i }
          )
        );
      };
      n.emit = (r, ...i) => {
        o(r, i), Ae(r) !== r && o(Ae(r), i);
      }, this._setParent();
    }), s;
  }
  _applyStyles(t, s) {
    if (!t) return;
    if (s) {
      if (s === this._def || this._styleChildren.has(s))
        return;
      this._styleChildren.add(s);
    }
    const n = this._nonce;
    for (let o = t.length - 1; o >= 0; o--) {
      const r = document.createElement("style");
      n && r.setAttribute("nonce", n), r.textContent = t[o], this.shadowRoot.prepend(r);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let s;
    for (; s = this.firstChild; ) {
      const n = s.nodeType === 1 && s.getAttribute("slot") || "default";
      (t[n] || (t[n] = [])).push(s), this.removeChild(s);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = this._getSlots(), s = this._instance.type.__scopeId;
    for (let n = 0; n < t.length; n++) {
      const o = t[n], r = o.getAttribute("name") || "default", i = this._slots[r], l = o.parentNode;
      if (i)
        for (const a of i) {
          if (s && a.nodeType === 1) {
            const d = s + "-s", u = document.createTreeWalker(a, 1);
            a.setAttribute(d, "");
            let p;
            for (; p = u.nextNode(); )
              p.setAttribute(d, "");
          }
          l.insertBefore(a, o);
        }
      else
        for (; o.firstChild; ) l.insertBefore(o.firstChild, o);
      l.removeChild(o);
    }
  }
  /**
   * @internal
   */
  _getSlots() {
    const t = [this];
    return this._teleportTargets && t.push(...this._teleportTargets), t.reduce((s, n) => (s.push(...Array.from(n.querySelectorAll("slot"))), s), []);
  }
  /**
   * @internal
   */
  _injectChildStyle(t) {
    this._applyStyles(t.styles, t);
  }
  /**
   * @internal
   */
  _removeChildStyle(t) {
  }
}
const Sl = ["ctrl", "shift", "alt", "meta"], Tl = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Sl.some((s) => e[`${s}Key`] && !t.includes(s))
}, er = (e, t) => {
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((o, ...r) => {
    for (let i = 0; i < t.length; i++) {
      const l = Tl[t[i]];
      if (l && l(o, t)) return;
    }
    return e(o, ...r);
  }));
}, El = /* @__PURE__ */ ae({ patchProp: xl }, ol);
let Kn;
function tr() {
  return Kn || (Kn = Ei(El));
}
const Ol = ((...e) => {
  tr().render(...e);
}), zn = ((...e) => {
  const t = tr().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const o = Ml(n);
    if (!o) return;
    const r = t._component;
    !j(r) && !r.render && !r.template && (r.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const i = s(o, !1, kl(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
});
function kl(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ml(e) {
  return ne(e) ? document.querySelector(e) : e;
}
function Al(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var s = function n() {
      var o = !1;
      try {
        o = this instanceof n;
      } catch {
      }
      return o ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    s.prototype = t.prototype;
  } else s = {};
  return Object.defineProperty(s, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(s, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), s;
}
const Pl = {}, Il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pl
}, Symbol.toStringTag, { value: "Module" })), Ps = /* @__PURE__ */ Al(Il);
var Is, Gn;
function $l() {
  if (Gn) return Is;
  Gn = 1;
  let { existsSync: e, readFileSync: t } = Ps, { dirname: s, join: n } = Ps, { SourceMapConsumer: o, SourceMapGenerator: r } = Ps;
  function i(a) {
    return Buffer ? Buffer.from(a, "base64").toString() : window.atob(a);
  }
  class l {
    constructor(d, u) {
      if (u.map === !1) return;
      this.loadAnnotation(d), this.inline = this.startWith(this.annotation, "data:");
      let p = u.map ? u.map.prev : void 0, w = this.loadMap(u.from, p);
      !this.mapFile && u.from && (this.mapFile = u.from), this.mapFile && (this.root = s(this.mapFile)), w && (this.text = w);
    }
    consumer() {
      return this.consumerCache || (this.consumerCache = new o(this.text)), this.consumerCache;
    }
    decodeInline(d) {
      let u = /^data:application\/json;charset=utf-?8;base64,/, p = /^data:application\/json;base64,/, w = /^data:application\/json;charset=utf-?8,/, E = /^data:application\/json,/, $ = d.match(w) || d.match(E);
      if ($)
        return decodeURIComponent(d.substr($[0].length));
      let R = d.match(u) || d.match(p);
      if (R)
        return i(d.substr(R[0].length));
      let oe = d.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + oe);
    }
    getAnnotationURL(d) {
      return d.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
    isMap(d) {
      return typeof d != "object" ? !1 : typeof d.mappings == "string" || typeof d._mappings == "string" || Array.isArray(d.sections);
    }
    loadAnnotation(d) {
      let u = d.match(/\/\*\s*# sourceMappingURL=/g);
      if (!u) return;
      let p = d.lastIndexOf(u.pop()), w = d.indexOf("*/", p);
      p > -1 && w > -1 && (this.annotation = this.getAnnotationURL(d.substring(p, w)));
    }
    loadFile(d) {
      if (this.root = s(d), e(d))
        return this.mapFile = d, t(d, "utf-8").toString().trim();
    }
    loadMap(d, u) {
      if (u === !1) return !1;
      if (u) {
        if (typeof u == "string")
          return u;
        if (typeof u == "function") {
          let p = u(d);
          if (p) {
            let w = this.loadFile(p);
            if (!w)
              throw new Error(
                "Unable to load previous source map: " + p.toString()
              );
            return w;
          }
        } else {
          if (u instanceof o)
            return r.fromSourceMap(u).toString();
          if (u instanceof r)
            return u.toString();
          if (this.isMap(u))
            return JSON.stringify(u);
          throw new Error(
            "Unsupported previous source map format: " + u.toString()
          );
        }
      } else {
        if (this.inline)
          return this.decodeInline(this.annotation);
        if (this.annotation) {
          let p = this.annotation;
          return d && (p = n(s(d), p)), this.loadFile(p);
        }
      }
    }
    startWith(d, u) {
      return d ? d.substr(0, u.length) === u : !1;
    }
    withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  }
  return Is = l, l.default = l, Is;
}
$l();
const Rl = { class: "flex gap-8 flex-row" }, Dl = { class: "flex flex-col" }, Fl = { class: "text-2xl" }, Nl = { class: "flex-shrink-0" }, jl = { class: "flex flex-col" }, ql = { class: "text-2xl" }, Hl = { class: "flex-shrink-0" }, Ll = { class: "flex flex-col" }, Vl = { class: "text-2xl" }, Ul = { class: "flex-shrink-0" }, Bl = {
  __name: "InfoCards",
  props: {
    totalTasks: {
      type: Number,
      required: !0
    },
    upcomingTasks: {
      type: Number,
      required: !0
    },
    overdueTasks: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const t = e;
    return (s, n) => {
      const o = ke("ha-icon"), r = ke("ha-card");
      return Y(), Re("div", Rl, [
        T(r, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: N(() => [
            v("div", Dl, [
              n[0] || (n[0] = v("div", { class: "text-2xl" }, "Total tasks", -1)),
              v("div", Fl, ee(t.totalTasks), 1)
            ]),
            v("div", Nl, [
              T(o, {
                class: "text-blue-500",
                ".icon": "mdi:calendar-blank"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        T(r, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: N(() => [
            v("div", jl, [
              n[1] || (n[1] = v("div", { class: "text-2xl" }, "Upcoming Tasks", -1)),
              v("div", ql, ee(t.upcomingTasks), 1)
            ]),
            v("div", Hl, [
              T(o, {
                class: "text-yellow-500",
                ".icon": "mdi:bell"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        T(r, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: N(() => [
            v("div", Ll, [
              n[2] || (n[2] = v("div", { class: "text-2xl" }, "Overdue Tasks", -1)),
              v("div", Vl, ee(t.overdueTasks), 1)
            ]),
            v("div", Ul, [
              T(o, {
                class: "text-red-500",
                ".icon": "mdi:alert"
              }, null, 32)
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
}, Wl = (e) => e.callWS({
  type: "my_integration/get_tasks"
}), Kl = (e, t) => e.callWS({
  type: "my_integration/create_task",
  ...t
}), zl = (e, t) => e.callWS({
  type: "my_integration/delete_task",
  task_id: t
}), Gl = (e, t, s) => e.callWS({
  type: "my_integration/complete_task",
  task_id: t,
  ...s
}), Jl = (e) => e.callWS({
  type: "my_integration/get_history"
}), Jn = (e, t) => e.callWS({
  type: "my_integration/get_attributes",
  task_sensor: t
}), Yl = (e, t) => e.callWS({
  type: "my_integration/edit_task",
  ...t
}), Xl = ".header[data-v-6c43d017]{background-color:var(--app-header-background-color);color:var(--app-header-text-color, white);border-bottom:var(--app-header-border-bottom, none)}.toolbar[data-v-6c43d017]{height:var(--header-height);display:flex;align-items:center;font-size:20px;padding:0 16px;font-weight:400;box-sizing:border-box}.main-title[data-v-6c43d017]{margin:0 0 0 24px;line-height:20px;flex-grow:1}.version[data-v-6c43d017]{font-size:14px;font-weight:500;color:rgba(var(--rgb-text-primary-color),.9)}", sr = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, o] of t)
    s[n] = o;
  return s;
}, Zl = { class: "header" }, Ql = { class: "toolbar" }, ea = {
  __name: "Header",
  props: {
    hass: {
      type: Object,
      required: !1
    },
    narrow: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return console.log("Header props:", t), (s, n) => {
      const o = ke("ha-menu-button");
      return Y(), Re("div", Zl, [
        v("div", Ql, [
          T(o, {
            ".hass": t.hass,
            ".narrow": t.narrow
          }, null, 40, [".hass", ".narrow"]),
          n[0] || (n[0] = v("div", { class: "main-title" }, " Device Maintenance Manager ", -1)),
          n[1] || (n[1] = v("div", { class: "version" }, " 1.0.0 ", -1))
        ])
      ]);
    };
  }
}, ta = /* @__PURE__ */ sr(ea, [["styles", [Xl]], ["__scopeId", "data-v-6c43d017"]]), sa = { class: "flex items-start justify-between mb-2" }, na = { class: "text-2xl font-medium" }, oa = { class: "flex items-center gap-2 mr-5" }, ra = { class: "flex flex-col relative" }, ia = { class: "flex flex-col items-start w-full" }, la = { class: "flex items-center gap-2 justify-start w-full" }, aa = { class: "flex items-center gap-2 justify-start w-full" }, ca = { class: "text-xl font-light mb-6" }, ua = { class: "bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 text-lg" }, fa = { class: "mb-1" }, da = { class: "text-blue-600 ml-1" }, pa = { class: "text-blue-600 ml-1" }, ha = {
  __name: "ConditionalTaskCard",
  props: {
    id: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    location: {
      type: String,
      required: !0
    },
    description: {
      type: String,
      required: !1
    },
    sensor: {
      type: String,
      required: !0
    },
    operator: {
      type: String,
      required: !0
    },
    value: {
      type: Number,
      required: !0
    },
    overdue: {
      type: Boolean,
      required: !0
    }
  },
  emits: ["deleteTask", "completeTask"],
  setup(e, { emit: t }) {
    const s = e, n = le(!1), o = {
      below: "<",
      equal: "=",
      above: ">"
    }, r = t, i = () => {
      n.value = !1, r("deleteTask");
    }, l = () => {
      r("completeTask");
    }, a = () => {
      n.value = !1, r("editTask");
    }, d = () => {
      n.value = !n.value;
    };
    return (u, p) => {
      const w = ke("ha-icon"), E = ke("ha-button"), $ = ke("ha-card");
      return Y(), ve($, {
        class: Bt(["w-full", "p-6", { "border-red-700": s.overdue }])
      }, {
        default: N(() => [
          v("div", sa, [
            v("div", na, ee(s.name), 1),
            v("div", oa, [
              T(E, {
                onClick: l,
                appearance: "accent",
                variant: "success",
                class: "flex items-center gap-2"
              }, {
                default: N(() => [
                  T(w, { ".icon": "mdi:check-circle-outline" }, null, 32),
                  p[0] || (p[0] = se(" Complete ", -1))
                ]),
                _: 1
              }),
              v("div", ra, [
                T(E, {
                  onClick: er(d, ["stop"]),
                  variant: "neutral",
                  appearance: "plain"
                }, {
                  default: N(() => [
                    T(w, {
                      ".icon": "mdi:dots-vertical",
                      variant: "neutral",
                      appearance: "accent"
                    }, null, 32)
                  ]),
                  _: 1
                }),
                n.value ? (Y(), ve($, {
                  key: 0,
                  class: "p-1 absolute top-full"
                }, {
                  default: N(() => [
                    v("div", ia, [
                      T(E, {
                        onClick: a,
                        variant: "neutral",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: N(() => [
                          v("div", la, [
                            T(w, { ".icon": "mdi:pencil" }, null, 32),
                            p[1] || (p[1] = se(" Edit ", -1))
                          ])
                        ]),
                        _: 1
                      }),
                      T(E, {
                        onClick: i,
                        variant: "danger",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: N(() => [
                          v("div", aa, [
                            T(w, { ".icon": "mdi:delete" }, null, 32),
                            p[2] || (p[2] = se(" Delete ", -1))
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })) : rt("", !0)
              ])
            ])
          ]),
          v("div", ca, ee(s.location), 1),
          v("div", ua, [
            v("div", fa, [
              p[3] || (p[3] = v("span", { class: "text-blue-600 font-semibold" }, "Condition:", -1)),
              v("span", da, ee(s.sensor) + " " + ee(o[s.operator] ?? "=") + " " + ee(s.value), 1)
            ]),
            v("div", null, [
              p[4] || (p[4] = v("span", { class: "text-blue-600 font-semibold" }, "Action:", -1)),
              v("span", pa, ee(s.description), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
}, ma = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[8] p-4"
}, ga = { class: "flex justify-center w-full max-w-3xl" }, Pt = {
  __name: "Dialog",
  props: {
    show: {
      type: Boolean,
      required: !0
    }
  },
  setup(e) {
    return (t, s) => e.show ? (Y(), Re("div", ma, [
      v("div", ga, [
        ui(t.$slots, "default")
      ])
    ])) : rt("", !0);
  }
}, _a = { class: "flex items-start justify-between mb-2" }, va = { class: "text-2xl font-medium" }, ba = { class: "flex items-center gap-2 mr-5" }, xa = { class: "flex flex-col relative" }, wa = { class: "flex flex-col items-start w-full" }, ya = { class: "flex items-center gap-2 justify-start w-full" }, Ca = { class: "flex items-center gap-2 justify-start w-full" }, Sa = { class: "text-xl font-light mb-6" }, Ta = { class: "text-lg" }, Ea = { class: "mb-2" }, Oa = { class: "ml-2 mb" }, ka = { class: "mb-2" }, Ma = { class: "ml-2" }, Aa = { class: "mb-2" }, Pa = { class: "ml-2" }, Ia = { class: "ml-2" }, $a = {
  __name: "IntervalTaskCard",
  props: {
    id: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    location: {
      type: String,
      required: !0
    },
    description: {
      type: String,
      required: !1
    },
    value: {
      type: Number,
      required: !0
    },
    overdue: {
      type: Boolean,
      required: !0
    },
    next_due: {
      type: String,
      required: !0
    },
    last_completed: {
      type: String,
      required: !1
    },
    seasonal_type: {
      type: String,
      required: !0
    },
    warning: {
      type: Boolean,
      required: !0
    }
  },
  emits: ["deleteTask", "completeTask"],
  setup(e, { emit: t }) {
    const s = e, n = le(!1), o = t, r = () => {
      n.value = !1, o("deleteTask");
    }, i = () => {
      o("completeTask");
    }, l = () => {
      n.value = !1, o("editTask");
    }, a = () => {
      n.value = !n.value;
    };
    return (d, u) => {
      const p = ke("ha-icon"), w = ke("ha-button"), E = ke("ha-card");
      return Y(), ve(E, {
        class: Bt(["w-full", "p-6", {
          "border-red-500": s.overdue,
          "border-yellow-500": s.warning && !s.overdue
        }])
      }, {
        default: N(() => [
          v("div", _a, [
            v("div", va, ee(s.name), 1),
            v("div", ba, [
              T(w, {
                onClick: i,
                appearance: "accent",
                variant: "success",
                class: "flex items-center gap-2"
              }, {
                default: N(() => [
                  T(p, { ".icon": "mdi:check-circle-outline" }, null, 32),
                  u[0] || (u[0] = se(" Complete ", -1))
                ]),
                _: 1
              }),
              v("div", xa, [
                T(w, {
                  onClick: er(a, ["stop"]),
                  variant: "neutral",
                  appearance: "plain"
                }, {
                  default: N(() => [
                    T(p, {
                      ".icon": "mdi:dots-vertical",
                      variant: "neutral",
                      appearance: "accent"
                    }, null, 32)
                  ]),
                  _: 1
                }),
                n.value ? (Y(), ve(E, {
                  key: 0,
                  class: "p-1 absolute top-full"
                }, {
                  default: N(() => [
                    v("div", wa, [
                      T(w, {
                        onClick: l,
                        variant: "neutral",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: N(() => [
                          v("div", ya, [
                            T(p, { ".icon": "mdi:pencil" }, null, 32),
                            u[1] || (u[1] = se(" Edit ", -1))
                          ])
                        ]),
                        _: 1
                      }),
                      T(w, {
                        onClick: r,
                        variant: "danger",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: N(() => [
                          v("div", Ca, [
                            T(p, { ".icon": "mdi:delete" }, null, 32),
                            u[2] || (u[2] = se(" Delete ", -1))
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })) : rt("", !0)
              ])
            ])
          ]),
          v("div", Sa, ee(s.location), 1),
          v("div", Ta, [
            v("div", Ea, [
              u[3] || (u[3] = v("span", { class: "font-semibold" }, "Description:", -1)),
              v("span", Oa, ee(s.description), 1)
            ]),
            v("div", ka, [
              T(p, { ".icon": "mdi:calendar" }, null, 32),
              v("span", Ma, "Every " + ee(s.value) + " " + ee(s.seasonal_type == "runtime" ? "hours" : s.seasonal_type), 1)
            ]),
            v("div", Aa, [
              T(p, { ".icon": "mdi:clock-time-four-outline" }, null, 32),
              v("span", Pa, "Next due: " + ee(s.seasonal_type == "runtime" ? Math.ceil(Number(s.next_due) / 3600) <= 1 ? Math.ceil(Number(s.next_due) / 60) + " minutes remaining" : Math.ceil(Number(s.next_due) / 3600) + " hours remaining" : s.next_due), 1)
            ]),
            v("div", null, [
              T(p, { ".icon": "mdi:check-circle-outline" }, null, 32),
              v("span", Ia, "Last completed: " + ee(s.last_completed != "" ? s.last_completed : "Not completed before..."), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
};
function Ra() {
  return {
    schemaNotes: it(
      () => [
        {
          name: "Completion Notes",
          required: !1,
          selector: {
            text: {
              multiline: !0
            }
          }
        }
      ]
    )
  };
}
function Da(e, t, s, n) {
  return {
    schemaConditional: it(
      () => [
        {
          name: "Task Name",
          required: !0,
          selector: {
            text: {}
          }
        },
        {
          name: "Location",
          required: !1,
          selector: {
            area: {}
          }
        },
        {
          name: "Description",
          required: !1,
          selector: {
            text: {
              multiline: !0
            }
          }
        },
        {
          name: "Sensor",
          required: !0,
          selector: {
            entity: {
              // domain: ["sensor", "binary_sensor"]
            }
          }
        },
        ...e.value && e.value.length > 1 ? [
          {
            name: "Option",
            required: !0,
            selector: {
              select: {
                options: e.value.map((r) => r.option),
                mode: "dropdown"
              }
            }
          }
        ] : [],
        ...t.value?.control === "number" ? [
          {
            name: "Operator",
            required: !0,
            selector: {
              select: {
                options: [
                  { value: "below", label: "Below" },
                  { value: "above", label: "Above" },
                  { value: "equal", label: "Equal" }
                ],
                mode: "dropdown"
              }
            }
          },
          {
            name: "Value",
            required: !0,
            selector: {
              number: { mode: "box" }
            }
          }
        ] : [],
        ...t.value?.control === "select" ? [
          {
            name: "Value",
            required: !0,
            selector: {
              select: {
                options: t.value?.options,
                mode: "dropdown"
              }
            }
          }
        ] : [],
        ...t.value?.control === "text" ? [
          {
            name: "Value",
            required: !0,
            selector: {
              text: {}
            }
          }
        ] : [],
        {
          name: "Condition Duration",
          required: !1,
          selector: {
            boolean: {}
          }
        },
        ...s.value ? [
          {
            name: "Duration",
            required: s.value,
            selector: {
              number: { min: 1, mode: "box" }
            }
          },
          {
            name: "Duration Type",
            required: s.value,
            selector: {
              select: {
                options: [
                  { value: "seconds", label: "Seconds" },
                  { value: "minutes", label: "Minutes" },
                  { value: "hours", label: "hours" }
                ],
                mode: "dropdown"
              }
            }
          }
        ] : [],
        {
          name: "Seasonal Task",
          required: !1,
          selector: {
            boolean: {}
          }
        },
        ...n.value ? [
          {
            name: "Seasonal Interval",
            required: n.value,
            selector: {
              number: { min: 1, mode: "box" }
            }
          },
          {
            name: "Seasonal Type",
            required: n.value,
            selector: {
              select: {
                options: [
                  { value: "minutes", label: "Minutes" },
                  { value: "weeks", label: "Weeks" },
                  { value: "months", label: "Months" },
                  { value: "years", label: "Years" }
                ],
                mode: "dropdown"
              }
            }
          }
        ] : []
      ]
    )
  };
}
function Fa(e, t, s) {
  return {
    schemaInterval: it(
      () => [
        {
          name: "Task Name",
          required: !0,
          selector: {
            text: {}
          }
        },
        {
          name: "Location",
          required: !1,
          selector: {
            area: {}
          }
        },
        {
          name: "Description",
          required: !1,
          selector: {
            text: {
              multiline: !0
            }
          }
        },
        {
          name: "Last Completed",
          required: !1,
          selector: {
            date: {}
          }
        },
        {
          name: "Repeat Every",
          required: !0,
          selector: {
            number: { min: 1, mode: "box" }
          }
        },
        {
          name: "Interval Type",
          required: !0,
          selector: {
            select: {
              options: [
                { value: "days", label: "Days" },
                { value: "weeks", label: "Weeks" },
                { value: "months", label: "Months" },
                { value: "years", label: "Years" },
                { value: "runtime", label: "Runtime Based" }
              ],
              mode: "dropdown"
            }
          }
        },
        ...s.value ? [] : [
          {
            name: "Fixed Interval",
            required: !1,
            selector: {
              boolean: {}
            }
          }
        ],
        ...s.value ? [
          {
            name: "Sensor",
            required: !0,
            selector: {
              entity: {
                // domain: ["sensor", "binary_sensor"]
              }
            }
          }
        ] : [],
        ...e.value && e.value.length > 1 ? [
          {
            name: "Option",
            required: !0,
            selector: {
              select: {
                options: e.value.map((o) => o.option),
                mode: "dropdown"
              }
            }
          }
        ] : [],
        ...t.value?.control === "number" ? [
          {
            name: "Operator",
            required: !0,
            selector: {
              select: {
                options: [
                  { value: "below", label: "Below" },
                  { value: "above", label: "Above" },
                  { value: "equal", label: "Equal" }
                ],
                mode: "dropdown"
              }
            }
          },
          {
            name: "Value",
            required: !0,
            selector: {
              number: { mode: "box" }
            }
          }
        ] : [],
        ...t.value?.control === "select" ? [
          {
            name: "Value",
            required: !0,
            selector: {
              select: {
                options: t.value?.options,
                mode: "dropdown"
              }
            }
          }
        ] : [],
        ...t.value?.control === "text" ? [
          {
            name: "Value",
            required: !0,
            selector: {
              text: {}
            }
          }
        ] : []
      ]
    )
  };
}
const Na = { class: "flex flex-col gap-10 justify-center m-6" }, ja = { class: "flex items-center justify-between pb-5" }, qa = { class: "flex-shrink-0" }, Ha = {
  key: 0,
  class: "text-2xl font-medium"
}, La = { class: "w-full table-fixed border-spacing-y-3 text-[1.2em]" }, Va = ["onClick"], Ua = { class: "truncate" }, Ba = { class: "flex flex-col mb-5" }, Wa = { class: "flex gap-5 text-2xl items-center" }, Ka = { class: "flex flex-row w-full mt-4 gap-3" }, za = { class: "flex flex-col mb-5" }, Ga = { class: "flex gap-5 text-2xl items-center" }, Ja = { class: "flex flex-row w-full mt-4 gap-3" }, Ya = { class: "flex flex-row w-full mt-4 gap-3" }, Xa = { class: "flex flex-row w-full mt-4 gap-3" }, Za = { class: "flex flex-col" }, Qa = { class: "flex gap-3 text-2xl items-center mb-2" }, ec = { class: "text-2xl font-medium" }, tc = { class: "text-lg font-medium mb-5" }, sc = { class: "w-full table-fixed border-spacing-y-3 text-[1.2em]" }, nc = { class: "" }, oc = { class: "break-words" }, rc = /* @__PURE__ */ Eo({
  __name: "App",
  props: {
    hass: { type: Object },
    narrow: { type: Boolean }
  },
  setup(e) {
    const t = e, s = le({}), n = le({}), o = le([]), r = le([]), i = le(!1), l = le(!1), a = le(!1), d = le(!1), u = le("null"), p = le("null"), w = le(!1), E = le(!1), $ = le(!1), R = /* @__PURE__ */ new Set(["Task Name"]), oe = it(() => o.value.length), H = it(() => o.value.filter((P) => P.notified).length), z = it(() => o.value.filter((P) => P.warning && !P.notified).length), V = le("interval"), M = le(""), G = le("interval"), ce = le(null), re = le(null), { schemaConditional: Ie } = Da(ce, re, E, w), { schemaInterval: ct } = Fa(ce, re, $), { schemaNotes: Ke } = Ra();
    Qt(
      () => t.hass,
      async (P) => {
        if (P)
          try {
            const m = await Wl(P), ie = await Jl(P);
            r.value = ie, console.log("Fetched tasks before sort:", o.value), o.value = m.map((L) => {
              if (L.type == "interval") {
                if (L.seasonal_type === "runtime")
                  return { ...L, warning: L.next_due <= 3600 };
                const ue = new Date(L.next_due), Te = /* @__PURE__ */ new Date(), k = (ue.getTime() - Te.getTime()) / (1e3 * 60 * 60 * 24);
                return { ...L, warning: k <= 0.5 };
              } else
                return { ...L, warning: !1 };
            }).sort((L, ue) => ue.notified !== L.notified ? ue.notified - L.notified : ue.warning !== L.warning ? Number(ue.warning) - Number(L.warning) : 0), console.log("Fetched history:", r.value), console.log("Fetched tasks after sort:", o.value), console.log(o.value.map((L) => L.warning));
          } catch (m) {
            console.error("Failed to get devices:", m);
          }
      },
      { immediate: !0 }
    );
    const $e = () => {
      i.value = !1, d.value = !1, w.value = !1, E.value = !1, $.value = !1, ce.value = [], re.value = {}, s.value = {};
    }, ut = async () => {
      console.log("Creating maintenance task...", "Data: ", s.value), s.value["Condition Duration"] === !0 ? (R.add("Duration"), R.add("Duration Type")) : (R.delete("Duration"), R.delete("Duration Type"), s.value.Duration = 0, s.value["Duration Type"] = ""), s.value["Seasonal Task"] === !0 ? (R.add("Seasonal Interval"), R.add("Seasonal Type")) : (R.delete("Seasonal Interval"), R.delete("Seasonal Type"), s.value["Seasonal Interval"] = 0, s.value["Seasonal Type"] = "");
      for (const P of R)
        if (s.value[P] === void 0 || s.value[P] === null || s.value[P] === "") {
          console.error(`Required field '${P}' is missing`), alert(`Field '${P}' is required.`);
          return;
        }
      s.value.Type = G.value, s.value.Control = re.value?.control;
      try {
        d.value ? await Yl(t.hass, s.value) : await Kl(t.hass, s.value), $e();
      } catch (P) {
        console.error("Failed to create maintenance task:", P);
      }
    }, Fe = async (P) => {
      if (console.log("Form changed:", P.detail.value), P.detail.value.Sensor != s.value.Sensor)
        try {
          const m = await Jn(t.hass, P.detail.value.Sensor);
          ce.value = m, console.log("Attributes: ", m), re.value = ce.value.length > 1 ? {} : ce.value[0] ?? null, console.log("Attributes: ", re.value), P.detail.value.Operator = "", P.detail.value.Value = "", P.detail.value.Option = "";
        } catch (m) {
          console.error("Failed to get attributes:", m);
        }
      if (a.value) {
        n.value = P.detail.value;
        return;
      }
      P.detail.value.Option != s.value.Option && (P.detail.value.Value = "", P.detail.value.Operator = ""), console.log("Po akcii:", P.detail.value), console.log("Current attribute control:", re.value), s.value = P.detail.value, w.value = s.value["Seasonal Task"] ?? !1, E.value = s.value["Condition Duration"] ?? !1, $.value = s.value["Interval Type"] == "runtime", s.value.Option && ce.value.length > 1 && (re.value = ce.value?.find((m) => m.option === s.value.Option) ?? null);
    }, Et = async () => {
      if (t.hass)
        try {
          console.log("Deleting task with ID:", p);
          const P = await zl(t.hass, p.value);
          l.value = !1, p.value = "null", console.log("Updated tasks after deletion: ", P);
        } catch (P) {
          console.error("Failed to delete task: ", P);
        }
    }, zt = async () => {
      if (t.hass) {
        (n.value["Completion Notes"] === void 0 || n.value["Completion Notes"] === "") && (n.value["Completion Notes"] = "No notes provided.");
        try {
          const P = await Gl(t.hass, u.value, n.value);
          a.value = !1, u.value = "null", n.value = {}, console.log("Complete task: ", P);
        } catch (P) {
          console.error("Failed to completing task: ", P);
        }
      }
    }, fe = (P) => {
      M.value = r.value.find((m) => m.id === P);
    }, Q = it(
      () => [...M.value.completion_dates].reverse()
    ), K = () => {
      G.value = "interval", s.value = {}, s.value.Type = "interval";
    }, ze = () => {
      G.value = "conditional", s.value = {}, s.value.Type = "conditional";
    }, ft = async (P) => {
      d.value = !0;
      const m = o.value.find((ie) => ie.id === P);
      if (m.sensor != "")
        try {
          const ie = await Jn(t.hass, m.sensor);
          ce.value = ie, re.value = ce.value?.find((L) => L.option === m.option) ?? ie[0] ?? null, console.log("Attributes: ", ie);
        } catch (ie) {
          console.error("Failed to get attributes:", ie);
        }
      w.value = m.seasonal, E.value = m.duration_condition, $.value = m.seasonal_type == "runtime", G.value = m.type, m.duration_type == "minutes" ? m.duration /= 60 : m.duration_type == "hours" && (m.duration /= 3600), s.value = {
        task_id: m.id,
        "Task Name": m.name,
        Location: m.location,
        Sensor: m.sensor,
        Value: m.value,
        Operator: m.operator,
        Description: m.description,
        Duration: m.duration,
        "Duration Type": m.duration_type,
        "Seasonal Interval": m.seasonal_interval,
        "Seasonal Type": m.seasonal_type,
        "Condition Duration": m.duration_condition,
        "Seasonal Task": m.seasonal,
        Type: m.type,
        "Fixed Interval": m.fixed,
        "Last Completed": m.last_completed,
        "Repeat Every": m.seasonal_interval,
        "Interval Type": m.seasonal_type,
        Option: m.option
      }, console.log("Task: ", s.value);
    };
    return (P, m) => {
      const ie = ke("ha-icon"), L = ke("ha-button"), ue = ke("ha-card"), Te = ke("ha-form");
      return Y(), Re(pe, null, [
        t.hass ? (Y(), ve(ta, {
          key: 0,
          hass: t.hass,
          narrow: t.narrow
        }, null, 8, ["hass", "narrow"])) : rt("", !0),
        v("div", Na, [
          T(Bl, {
            totalTasks: oe.value,
            upcomingTasks: z.value,
            overdueTasks: H.value
          }, null, 8, ["totalTasks", "upcomingTasks", "overdueTasks"]),
          T(ue, { class: "flex flex-col p-6 gap-5" }, {
            default: N(() => [
              v("div", ja, [
                m[8] || (m[8] = v("div", { class: "flex flex-col" }, [
                  v("div", { class: "text-2xl font-medium" }, "Maintenance Tasks"),
                  v("div", { class: "text-xl" }, "Manage scheduled and conditional maintenance for your smart devices")
                ], -1)),
                v("div", qa, [
                  T(L, {
                    onClick: m[0] || (m[0] = (k) => i.value = !0)
                  }, {
                    default: N(() => [
                      T(ie, {
                        class: "text-white",
                        ".icon": "mdi:plus"
                      }, null, 32),
                      m[7] || (m[7] = se(" new Task", -1))
                    ]),
                    _: 1
                  })
                ])
              ]),
              T(ue, { class: "flex w-full p-1 gap-1 rounded-full" }, {
                default: N(() => [
                  T(L, {
                    onClick: m[1] || (m[1] = (k) => V.value = "interval"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: V.value === "interval" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: N(() => [
                      T(ie, {
                        variant: "neutral",
                        ".icon": "mdi:calendar-blank"
                      }, null, 32),
                      m[9] || (m[9] = se(" Interval tasks", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  T(L, {
                    onClick: m[2] || (m[2] = (k) => V.value = "conditional"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: V.value === "conditional" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: N(() => [
                      T(ie, {
                        variant: "neutral",
                        ".icon": "mdi:triangle-wave"
                      }, null, 32),
                      m[10] || (m[10] = se(" Conditional tasks", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  T(L, {
                    onClick: m[3] || (m[3] = (k) => V.value = "history"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: V.value === "history" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: N(() => [
                      T(ie, {
                        variant: "neutral",
                        ".icon": "mdi:history"
                      }, null, 32),
                      m[11] || (m[11] = se(" History", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"])
                ]),
                _: 1
              }),
              oe.value == 0 ? (Y(), Re("div", Ha, "No tasks created yet...")) : rt("", !0),
              V.value === "conditional" ? (Y(!0), Re(pe, { key: 1 }, Xt(o.value.filter((k) => k.type == "conditional"), (k) => (Y(), ve(ha, {
                key: k.id,
                id: k.id,
                name: k.name,
                location: k.location,
                description: k.description,
                sensor: k.sensor,
                operator: k.operator,
                value: k.value,
                overdue: k.notified,
                onDeleteTask: (Ne) => {
                  l.value = !0, p.value = k.id;
                },
                onCompleteTask: (Ne) => {
                  a.value = !0, u.value = k.id;
                },
                onEditTask: (Ne) => ft(k.id)
              }, null, 8, ["id", "name", "location", "description", "sensor", "operator", "value", "overdue", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : rt("", !0),
              V.value === "interval" ? (Y(!0), Re(pe, { key: 2 }, Xt(o.value.filter((k) => k.type == "interval"), (k) => (Y(), ve($a, {
                key: k.id,
                id: k.id,
                name: k.name,
                location: k.location,
                description: k.description,
                value: k.seasonal_interval,
                overdue: k.notified,
                next_due: k.next_due,
                last_completed: k.last_completed,
                seasonal_type: k.seasonal_type,
                warning: k.warning,
                onDeleteTask: (Ne) => {
                  l.value = !0, p.value = k.id;
                },
                onCompleteTask: (Ne) => {
                  a.value = !0, u.value = k.id;
                },
                onEditTask: (Ne) => ft(k.id)
              }, null, 8, ["id", "name", "location", "description", "value", "overdue", "next_due", "last_completed", "seasonal_type", "warning", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : rt("", !0),
              V.value === "history" ? (Y(), ve(ue, {
                key: 3,
                class: "w-full p-4"
              }, {
                default: N(() => [
                  v("table", La, [
                    m[12] || (m[12] = v("thead", { class: "text-left forn-size-lg text-[1.1em]" }, [
                      v("tr", null, [
                        v("th", null, "Task Name"),
                        v("th", null, "Location"),
                        v("th", null, "Date"),
                        v("th", null, "Note")
                      ])
                    ], -1)),
                    v("tbody", null, [
                      (Y(!0), Re(pe, null, Xt(r.value, (k) => (Y(), Re("tr", {
                        onClick: (Ne) => fe(k.id),
                        class: "cursor-pointer",
                        key: k.id
                      }, [
                        v("td", null, ee(k.name), 1),
                        v("td", null, ee(k.location), 1),
                        v("td", null, ee(k.completion_dates.at(-1).date.replace("T", " ")), 1),
                        v("td", Ua, ee(k.completion_dates.at(-1).note), 1)
                      ], 8, Va))), 128))
                    ])
                  ])
                ]),
                _: 1
              })) : rt("", !0)
            ]),
            _: 1
          }),
          T(Pt, { show: i.value }, {
            default: N(() => [
              T(ue, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: N(() => [
                  v("div", Ba, [
                    v("div", Wa, [
                      T(ie, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: $e
                      }, null, 32),
                      m[13] || (m[13] = v("div", { class: "flex-shrink-0" }, "Create Maintenance Task", -1))
                    ])
                  ]),
                  T(ue, { class: "mb-2 flex w-full p-1 gap-1 rounded-full" }, {
                    default: N(() => [
                      T(L, {
                        onClick: K,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: G.value === "interval" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: N(() => [...m[14] || (m[14] = [
                          se("Interval tasks", -1)
                        ])]),
                        _: 1
                      }, 8, ["appearance"]),
                      T(L, {
                        onClick: ze,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: G.value === "conditional" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: N(() => [...m[15] || (m[15] = [
                          se("Conditional tasks", -1)
                        ])]),
                        _: 1
                      }, 8, ["appearance"])
                    ]),
                    _: 1
                  }),
                  G.value == "conditional" ? (Y(), ve(Te, {
                    key: 0,
                    ".hass": t.hass,
                    ".schema": mt(Ie),
                    onValueChanged: Fe
                  }, null, 40, [".hass", ".schema"])) : (Y(), ve(Te, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": mt(ct),
                    onValueChanged: Fe
                  }, null, 40, [".hass", ".schema"])),
                  v("div", Ka, [
                    T(L, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: $e
                    }, {
                      default: N(() => [...m[16] || (m[16] = [
                        se("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(L, {
                      class: "flex flex-1 min-w-0",
                      onClick: ut
                    }, {
                      default: N(() => [...m[17] || (m[17] = [
                        se("Create", -1)
                      ])]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["show"]),
          T(Pt, { show: d.value }, {
            default: N(() => [
              T(ue, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: N(() => [
                  v("div", za, [
                    v("div", Ga, [
                      T(ie, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: $e
                      }, null, 32),
                      m[18] || (m[18] = v("div", { class: "flex-shrink-0" }, "Edit Maintenance Task", -1))
                    ])
                  ]),
                  s.value.Type == "conditional" ? (Y(), ve(Te, {
                    key: 0,
                    ".hass": t.hass,
                    ".schema": mt(Ie),
                    ".data": s.value,
                    onValueChanged: Fe
                  }, null, 40, [".hass", ".schema", ".data"])) : (Y(), ve(Te, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": mt(ct),
                    ".data": s.value,
                    onValueChanged: Fe
                  }, null, 40, [".hass", ".schema", ".data"])),
                  v("div", Ja, [
                    T(L, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: $e
                    }, {
                      default: N(() => [...m[19] || (m[19] = [
                        se("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(L, {
                      class: "flex flex-1 min-w-0",
                      onClick: ut
                    }, {
                      default: N(() => [...m[20] || (m[20] = [
                        se("Edit", -1)
                      ])]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["show"]),
          T(Pt, { show: l.value }, {
            default: N(() => [
              T(ue, { class: "p-6 flex flex-col" }, {
                default: N(() => [
                  m[23] || (m[23] = v("div", { class: "flex flex-col" }, [
                    v("div", { class: "text-2xl font-medium mb-5" }, "Create Maintenance Task"),
                    v("div", { class: "text-lg font-medium mb-5" }, "Are you sure you want to delete this maintenance task? This action cannot be undone.")
                  ], -1)),
                  v("div", Ya, [
                    T(L, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[4] || (m[4] = (k) => l.value = !1)
                    }, {
                      default: N(() => [...m[21] || (m[21] = [
                        se("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(L, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "danger",
                      onClick: Et
                    }, {
                      default: N(() => [...m[22] || (m[22] = [
                        se("Delete", -1)
                      ])]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["show"]),
          T(Pt, { show: a.value }, {
            default: N(() => [
              T(ue, { class: "p-6 flex flex-col" }, {
                default: N(() => [
                  m[26] || (m[26] = v("div", { class: "flex flex-col" }, [
                    v("div", { class: "text-2xl font-medium mb-5" }, "Mark as Complete"),
                    v("div", { class: "text-lg font-medium mb-5" }, "Add any notes about completing this maintenance task (optional).")
                  ], -1)),
                  T(Te, {
                    ".hass": t.hass,
                    ".schema": mt(Ke),
                    onValueChanged: Fe
                  }, null, 40, [".hass", ".schema"]),
                  v("div", Xa, [
                    T(L, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[5] || (m[5] = (k) => a.value = !1)
                    }, {
                      default: N(() => [...m[24] || (m[24] = [
                        se("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(L, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "brand",
                      onClick: zt
                    }, {
                      default: N(() => [...m[25] || (m[25] = [
                        se("Mark Complete", -1)
                      ])]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["show"]),
          T(Pt, {
            show: M.value !== ""
          }, {
            default: N(() => [
              T(ue, { class: "p-6 flex flex-col max-h-[80vh] overflow-auto scrollbar-hide" }, {
                default: N(() => [
                  v("div", Za, [
                    v("div", Qa, [
                      T(ie, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: m[6] || (m[6] = (k) => M.value = "")
                      }, null, 32),
                      v("div", ec, ee(M.value.name) + "'s history", 1)
                    ]),
                    v("div", tc, ee(M.value.location), 1)
                  ]),
                  v("table", sc, [
                    m[27] || (m[27] = v("thead", { class: "text-left forn-size-lg text-[1.1em]" }, [
                      v("tr", null, [
                        v("th", null, "Date"),
                        v("th", null, "Note")
                      ])
                    ], -1)),
                    v("tbody", null, [
                      (Y(!0), Re(pe, null, Xt(Q.value, (k) => (Y(), Re("tr", null, [
                        v("td", nc, ee(k.date.replace("T", " ")), 1),
                        v("td", oc, ee(k.note), 1)
                      ]))), 256))
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["show"])
        ])
      ], 64);
    };
  }
}), ic = "*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.invisible{visibility:hidden}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.left-0{left:0}.top-full{top:100%}.z-10{z-index:10}.z-50{z-index:50}.z-\\[8\\]{z-index:8}.m-6{margin:1.5rem}.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.mr-5{margin-right:1.25rem}.mt-1{margin-top:.25rem}.mt-4{margin-top:1rem}.flex{display:flex}.table{display:table}.hidden{display:none}.max-h-\\[80vh\\]{max-height:80vh}.w-full{width:100%}.w-max{width:-moz-max-content;width:max-content}.min-w-0{min-width:0px}.max-w-3xl{max-width:48rem}.max-w-md{max-width:28rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.table-fixed{table-layout:fixed}.border-spacing-y-3{--tw-border-spacing-y: .75rem;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.cursor-help{cursor:help}.cursor-pointer{cursor:pointer}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-10{gap:2.5rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-5{gap:1.25rem}.gap-8{gap:2rem}.overflow-auto{overflow:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.break-words{overflow-wrap:break-word}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}.rounded-sm{border-radius:.125rem}.border-2{border-width:2px}.border-blue-300{--tw-border-opacity: 1;border-color:rgb(147 197 253 / var(--tw-border-opacity, 1))}.border-red-500{--tw-border-opacity: 1;border-color:rgb(239 68 68 / var(--tw-border-opacity, 1))}.border-red-700{--tw-border-opacity: 1;border-color:rgb(185 28 28 / var(--tw-border-opacity, 1))}.border-yellow-500{--tw-border-opacity: 1;border-color:rgb(234 179 8 / var(--tw-border-opacity, 1))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1))}.bg-opacity-50{--tw-bg-opacity: .5}.p-1{padding:.25rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.pb-5{padding-bottom:1.25rem}.text-left{text-align:left}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[1\\.1em\\]{font-size:1.1em}.text-\\[1\\.2em\\]{font-size:1.2em}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.font-light{font-weight:300}.font-medium{font-weight:500}.font-semibold{font-weight:600}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-red-500{--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-500{--tw-text-opacity: 1;color:rgb(234 179 8 / var(--tw-text-opacity, 1))}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}", lc = /* @__PURE__ */ sr(rc, [["styles", [ic]]]), ac = /* @__PURE__ */ yl(lc);
customElements.define("my-integration-panel", ac);
