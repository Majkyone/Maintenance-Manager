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
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ws = (e) => e.startsWith("onUpdate:"), oe = Object.assign, Ks = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, si = Object.prototype.hasOwnProperty, U = (e, t) => si.call(e, t), D = Array.isArray, xt = (e) => us(e) === "[object Map]", Xn = (e) => us(e) === "[object Set]", j = (e) => typeof e == "function", ne = (e) => typeof e == "string", et = (e) => typeof e == "symbol", te = (e) => e !== null && typeof e == "object", Zn = (e) => (te(e) || j(e)) && j(e.then) && j(e.catch), Qn = Object.prototype.toString, us = (e) => Qn.call(e), ni = (e) => us(e).slice(8, -1), fs = (e) => us(e) === "[object Object]", zs = (e) => ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $t = /* @__PURE__ */ Bs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ds = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, ri = /-\w/g, we = ds(
  (e) => e.replace(ri, (t) => t.slice(1).toUpperCase())
), ii = /\B([A-Z])/g, ke = ds(
  (e) => e.replace(ii, "-$1").toLowerCase()
), ps = ds((e) => e.charAt(0).toUpperCase() + e.slice(1)), xs = ds(
  (e) => e ? `on${ps(e)}` : ""
), lt = (e, t) => !Object.is(e, t), ws = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, er = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, oi = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, gn = (e) => {
  const t = ne(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let _n;
const hs = () => _n || (_n = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Gs(e) {
  if (D(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = ne(n) ? ui(n) : Gs(n);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (ne(e) || te(e))
    return e;
}
const li = /;(?![^(]*\))/g, ai = /:([^]+)/, ci = /\/\*[^]*?\*\//g;
function ui(e) {
  const t = {};
  return e.replace(ci, "").split(li).forEach((s) => {
    if (s) {
      const n = s.split(ai);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Bt(e) {
  let t = "";
  if (ne(e))
    t = e;
  else if (D(e))
    for (let s = 0; s < e.length; s++) {
      const n = Bt(e[s]);
      n && (t += n + " ");
    }
  else if (te(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const fi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", di = /* @__PURE__ */ Bs(fi);
function tr(e) {
  return !!e || e === "";
}
const sr = (e) => !!(e && e.__v_isRef === !0), ee = (e) => ne(e) ? e : e == null ? "" : D(e) || te(e) && (e.toString === Qn || !j(e.toString)) ? sr(e) ? ee(e.value) : JSON.stringify(e, nr, 2) : String(e), nr = (e, t) => sr(t) ? nr(e, t.value) : xt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, r], i) => (s[ys(n, i) + " =>"] = r, s),
    {}
  )
} : Xn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => ys(s))
} : et(t) ? ys(t) : te(t) && !D(t) && !fs(t) ? String(t) : t, ys = (e, t = "") => {
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
class pi {
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
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function hi() {
  return Se;
}
let X;
const Cs = /* @__PURE__ */ new WeakSet();
class rr {
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || or(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, vn(this), lr(this);
    const t = X, s = De;
    X = this, De = !0;
    try {
      return this.fn();
    } finally {
      ar(this), X = t, De = s, this.flags &= -3;
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
let ir = 0, Rt, Dt;
function or(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Dt, Dt = e;
    return;
  }
  e.next = Rt, Rt = e;
}
function Js() {
  ir++;
}
function Ys() {
  if (--ir > 0)
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
function lr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ar(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const r = n.prevDep;
    n.version === -1 ? (n === s && (s = r), Xs(n), mi(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = r;
  }
  e.deps = t, e.depsTail = s;
}
function $s(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (cr(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function cr(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === qt) || (e.globalVersion = qt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !$s(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = X, n = De;
  X = e, De = !0;
  try {
    lr(e);
    const r = e.fn(e._value);
    (t.version === 0 || lt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    X = s, De = n, ar(e), e.flags &= -3;
  }
}
function Xs(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: r } = e;
  if (n && (n.nextSub = r, e.prevSub = void 0), r && (r.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep)
      Xs(i, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function mi(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let De = !0;
const ur = [];
function Xe() {
  ur.push(De), De = !1;
}
function Ze() {
  const e = ur.pop();
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
class gi {
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
      s = this.activeLink = new gi(X, this), X.deps ? (s.prevDep = X.depsTail, X.depsTail.nextDep = s, X.depsTail = s) : X.deps = X.depsTail = s, fr(s);
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
function fr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        fr(n);
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
    let r = n.get(s);
    r || (n.set(s, r = new Zs()), r.map = n, r.key = s), r.track();
  }
}
function Ye(e, t, s, n, r, i) {
  const o = Rs.get(e);
  if (!o) {
    qt++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Js(), t === "clear")
    o.forEach(l);
  else {
    const a = D(e), d = a && zs(s);
    if (a && s === "length") {
      const u = Number(n);
      o.forEach((p, w) => {
        (w === "length" || w === Ht || !et(w) && w >= u) && l(p);
      });
    } else
      switch ((s !== void 0 || o.has(void 0)) && l(o.get(s)), d && l(o.get(Ht)), t) {
        case "add":
          a ? d && l(o.get("length")) : (l(o.get(gt)), xt(e) && l(o.get(Ds)));
          break;
        case "delete":
          a || (l(o.get(gt)), xt(e) && l(o.get(Ds)));
          break;
        case "set":
          xt(e) && l(o.get(gt));
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
const _i = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ss(this, Symbol.iterator, de);
  },
  concat(...e) {
    return _t(this).concat(
      ...e.map((t) => D(t) ? _t(t) : t)
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
    return Ot(this, "pop");
  },
  push(...e) {
    return Ot(this, "push", e);
  },
  reduce(e, ...t) {
    return bn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return bn(this, "reduceRight", e, t);
  },
  shift() {
    return Ot(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ge(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ot(this, "splice", e);
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
    return Ot(this, "unshift", e);
  },
  values() {
    return Ss(this, "values", de);
  }
};
function Ss(e, t, s) {
  const n = ms(e), r = n[t]();
  return n !== e && !Pe(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.done || (i.value = s(i.value)), i;
  }), r;
}
const vi = Array.prototype;
function Ge(e, t, s, n, r, i) {
  const o = ms(e), l = o !== e && !Pe(e), a = o[t];
  if (a !== vi[t]) {
    const p = a.apply(e, i);
    return l ? de(p) : p;
  }
  let d = s;
  o !== e && (l ? d = function(p, w) {
    return s.call(this, de(p), w, e);
  } : s.length > 2 && (d = function(p, w) {
    return s.call(this, p, w, e);
  }));
  const u = a.call(o, d, n);
  return l && r ? r(u) : u;
}
function bn(e, t, s, n) {
  const r = ms(e);
  let i = s;
  return r !== e && (Pe(e) ? s.length > 3 && (i = function(o, l, a) {
    return s.call(this, o, l, a, e);
  }) : i = function(o, l, a) {
    return s.call(this, o, de(l), a, e);
  }), r[t](i, ...n);
}
function Ts(e, t, s) {
  const n = B(e);
  he(n, "iterate", Ht);
  const r = n[t](...s);
  return (r === -1 || r === !1) && sn(s[0]) ? (s[0] = B(s[0]), n[t](...s)) : r;
}
function Ot(e, t, s = []) {
  Xe(), Js();
  const n = B(e)[t].apply(e, s);
  return Ys(), Ze(), n;
}
const bi = /* @__PURE__ */ Bs("__proto__,__v_isRef,__isVue"), dr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(et)
);
function xi(e) {
  et(e) || (e = String(e));
  const t = B(this);
  return he(t, "has", e), t.hasOwnProperty(e);
}
class pr {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (s === "__v_isReactive")
      return !r;
    if (s === "__v_isReadonly")
      return r;
    if (s === "__v_isShallow")
      return i;
    if (s === "__v_raw")
      return n === (r ? i ? ki : _r : i ? gr : mr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const o = D(t);
    if (!r) {
      let a;
      if (o && (a = _i[s]))
        return a;
      if (s === "hasOwnProperty")
        return xi;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ge(t) ? t : n
    );
    if ((et(s) ? dr.has(s) : bi(s)) || (r || he(t, "get", s), i))
      return l;
    if (ge(l)) {
      const a = o && zs(s) ? l : l.value;
      return r && te(a) ? Fs(a) : a;
    }
    return te(l) ? r ? Fs(l) : en(l) : l;
  }
}
class hr extends pr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let i = t[s];
    if (!this._isShallow) {
      const a = at(i);
      if (!Pe(n) && !at(n) && (i = B(i), n = B(n)), !D(t) && ge(i) && !ge(n))
        return a || (i.value = n), !0;
    }
    const o = D(t) && zs(s) ? Number(s) < t.length : U(t, s), l = Reflect.set(
      t,
      s,
      n,
      ge(t) ? t : r
    );
    return t === B(r) && (o ? lt(n, i) && Ye(t, "set", s, n) : Ye(t, "add", s, n)), l;
  }
  deleteProperty(t, s) {
    const n = U(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && Ye(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!et(s) || !dr.has(s)) && he(t, "has", s), n;
  }
  ownKeys(t) {
    return he(
      t,
      "iterate",
      D(t) ? "length" : gt
    ), Reflect.ownKeys(t);
  }
}
class wi extends pr {
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
const yi = /* @__PURE__ */ new hr(), Ci = /* @__PURE__ */ new wi(), Si = /* @__PURE__ */ new hr(!0);
const Ns = (e) => e, Gt = (e) => Reflect.getPrototypeOf(e);
function Ti(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, i = B(r), o = xt(i), l = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, d = r[e](...n), u = s ? Ns : t ? ss : de;
    return !t && he(
      i,
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
function Ei(e, t) {
  const s = {
    get(r) {
      const i = this.__v_raw, o = B(i), l = B(r);
      e || (lt(r, l) && he(o, "get", r), he(o, "get", l));
      const { has: a } = Gt(o), d = t ? Ns : e ? ss : de;
      if (a.call(o, r))
        return d(i.get(r));
      if (a.call(o, l))
        return d(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && he(B(r), "iterate", gt), r.size;
    },
    has(r) {
      const i = this.__v_raw, o = B(i), l = B(r);
      return e || (lt(r, l) && he(o, "has", r), he(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, a = B(l), d = t ? Ns : e ? ss : de;
      return !e && he(a, "iterate", gt), l.forEach((u, p) => r.call(i, d(u), d(p), o));
    }
  };
  return oe(
    s,
    e ? {
      add: Jt("add"),
      set: Jt("set"),
      delete: Jt("delete"),
      clear: Jt("clear")
    } : {
      add(r) {
        !t && !Pe(r) && !at(r) && (r = B(r));
        const i = B(this);
        return Gt(i).has.call(i, r) || (i.add(r), Ye(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !Pe(i) && !at(i) && (i = B(i));
        const o = B(this), { has: l, get: a } = Gt(o);
        let d = l.call(o, r);
        d || (r = B(r), d = l.call(o, r));
        const u = a.call(o, r);
        return o.set(r, i), d ? lt(i, u) && Ye(o, "set", r, i) : Ye(o, "add", r, i), this;
      },
      delete(r) {
        const i = B(this), { has: o, get: l } = Gt(i);
        let a = o.call(i, r);
        a || (r = B(r), a = o.call(i, r)), l && l.call(i, r);
        const d = i.delete(r);
        return a && Ye(i, "delete", r, void 0), d;
      },
      clear() {
        const r = B(this), i = r.size !== 0, o = r.clear();
        return i && Ye(
          r,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    s[r] = Ti(r, e, t);
  }), s;
}
function Qs(e, t) {
  const s = Ei(e, t);
  return (n, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(
    U(s, r) && r in n ? s : n,
    r,
    i
  );
}
const Ai = {
  get: /* @__PURE__ */ Qs(!1, !1)
}, Mi = {
  get: /* @__PURE__ */ Qs(!1, !0)
}, Oi = {
  get: /* @__PURE__ */ Qs(!0, !1)
};
const mr = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap(), _r = /* @__PURE__ */ new WeakMap(), ki = /* @__PURE__ */ new WeakMap();
function Pi(e) {
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
function Ii(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Pi(ni(e));
}
function en(e) {
  return at(e) ? e : tn(
    e,
    !1,
    yi,
    Ai,
    mr
  );
}
function $i(e) {
  return tn(
    e,
    !1,
    Si,
    Mi,
    gr
  );
}
function Fs(e) {
  return tn(
    e,
    !0,
    Ci,
    Oi,
    _r
  );
}
function tn(e, t, s, n, r) {
  if (!te(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = Ii(e);
  if (i === 0)
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const l = new Proxy(
    e,
    i === 2 ? n : s
  );
  return r.set(e, l), l;
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
function Ri(e) {
  return !U(e, "__v_skip") && Object.isExtensible(e) && er(e, "__v_skip", !0), e;
}
const de = (e) => te(e) ? en(e) : e, ss = (e) => te(e) ? Fs(e) : e;
function ge(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ie(e) {
  return Di(e, !1);
}
function Di(e, t) {
  return ge(e) ? e : new Ni(e, t);
}
class Ni {
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
const Fi = {
  get: (e, t, s) => t === "__v_raw" ? e : mt(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return ge(r) && !ge(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function vr(e) {
  return wt(e) ? e : new Proxy(e, Fi);
}
class ji {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new Zs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    X !== this)
      return or(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return cr(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function qi(e, t, s = !1) {
  let n, r;
  return j(e) ? n = e : (n = e.get, r = e.set), new ji(n, r, s);
}
const Yt = {}, ns = /* @__PURE__ */ new WeakMap();
let ht;
function Hi(e, t = !1, s = ht) {
  if (s) {
    let n = ns.get(s);
    n || ns.set(s, n = []), n.push(e);
  }
}
function Li(e, t, s = Z) {
  const { immediate: n, deep: r, once: i, scheduler: o, augmentJob: l, call: a } = s, d = (O) => r ? O : Pe(O) || r === !1 || r === 0 ? rt(O, 1) : rt(O);
  let u, p, w, E, I = !1, $ = !1;
  if (ge(e) ? (p = () => e.value, I = Pe(e)) : wt(e) ? (p = () => d(e), I = !0) : D(e) ? ($ = !0, I = e.some((O) => wt(O) || Pe(O)), p = () => e.map((O) => {
    if (ge(O))
      return O.value;
    if (wt(O))
      return d(O);
    if (j(O))
      return a ? a(O, 2) : O();
  })) : j(e) ? t ? p = a ? () => a(e, 2) : e : p = () => {
    if (w) {
      Xe();
      try {
        w();
      } finally {
        Ze();
      }
    }
    const O = ht;
    ht = u;
    try {
      return a ? a(e, 3, [E]) : e(E);
    } finally {
      ht = O;
    }
  } : p = Be, t && r) {
    const O = p, G = r === !0 ? 1 / 0 : r;
    p = () => rt(O(), G);
  }
  const re = hi(), H = () => {
    u.stop(), re && re.active && Ks(re.effects, u);
  };
  if (i && t) {
    const O = t;
    t = (...G) => {
      O(...G), H();
    };
  }
  let z = $ ? new Array(e.length).fill(Yt) : Yt;
  const L = (O) => {
    if (!(!(u.flags & 1) || !u.dirty && !O))
      if (t) {
        const G = u.run();
        if (r || I || ($ ? G.some((le, ce) => lt(le, z[ce])) : lt(G, z))) {
          w && w();
          const le = ht;
          ht = u;
          try {
            const ce = [
              G,
              // pass undefined as the old value when it's changed for the first time
              z === Yt ? void 0 : $ && z[0] === Yt ? [] : z,
              E
            ];
            z = G, a ? a(t, 3, ce) : (
              // @ts-expect-error
              t(...ce)
            );
          } finally {
            ht = le;
          }
        }
      } else
        u.run();
  };
  return l && l(L), u = new rr(p), u.scheduler = o ? () => o(L, !1) : L, E = (O) => Hi(O, !1, u), w = u.onStop = () => {
    const O = ns.get(u);
    if (O) {
      if (a)
        a(O, 4);
      else
        for (const G of O) G();
      ns.delete(u);
    }
  }, t ? n ? L(!0) : z = u.run() : o ? o(L.bind(null, !0), !0) : u.run(), H.pause = u.pause.bind(u), H.resume = u.resume.bind(u), H.stop = H, H;
}
function rt(e, t = 1 / 0, s) {
  if (t <= 0 || !te(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, ge(e))
    rt(e.value, t, s);
  else if (D(e))
    for (let n = 0; n < e.length; n++)
      rt(e[n], t, s);
  else if (Xn(e) || xt(e))
    e.forEach((n) => {
      rt(n, t, s);
    });
  else if (fs(e)) {
    for (const n in e)
      rt(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && rt(e[n], t, s);
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
  } catch (r) {
    gs(r, t, s);
  }
}
function We(e, t, s, n) {
  if (j(e)) {
    const r = Wt(e, t, s, n);
    return r && Zn(r) && r.catch((i) => {
      gs(i, t, s);
    }), r;
  }
  if (D(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(We(e[i], t, s, n));
    return r;
  }
}
function gs(e, t, s, n = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Z;
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
    if (i) {
      Xe(), Wt(i, null, 10, [
        e,
        a,
        d
      ]), Ze();
      return;
    }
  }
  Vi(e, s, r, n, o);
}
function Vi(e, t, s, n = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const be = [];
let Ve = -1;
const yt = [];
let st = null, vt = 0;
const br = /* @__PURE__ */ Promise.resolve();
let rs = null;
function xr(e) {
  const t = rs || br;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ui(e) {
  let t = Ve + 1, s = be.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = be[n], i = Lt(r);
    i < e || i === e && r.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function nn(e) {
  if (!(e.flags & 1)) {
    const t = Lt(e), s = be[be.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Lt(s) ? be.push(e) : be.splice(Ui(t), 0, e), e.flags |= 1, wr();
  }
}
function wr() {
  rs || (rs = br.then(Cr));
}
function Bi(e) {
  D(e) ? yt.push(...e) : st && e.id === -1 ? st.splice(vt + 1, 0, e) : e.flags & 1 || (yt.push(e), e.flags |= 1), wr();
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
function yr(e) {
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
function Cr(e) {
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
    Ve = -1, be.length = 0, yr(), rs = null, (be.length || yt.length) && Cr();
  }
}
let xe = null, Sr = null;
function is(e) {
  const t = xe;
  return xe = e, Sr = e && e.type.__scopeId || null, t;
}
function F(e, t = xe, s) {
  if (!t || e._n)
    return e;
  const n = (...r) => {
    n._d && Pn(-1);
    const i = is(t);
    let o;
    try {
      o = e(...r);
    } finally {
      is(i), n._d && Pn(1);
    }
    return o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function dt(e, t, s, n) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let a = l.dir[n];
    a && (Xe(), We(a, s, 8, [
      e.el,
      l,
      e,
      t
    ]), Ze());
  }
}
const Wi = Symbol("_vte"), Ki = (e) => e.__isTeleport, zi = Symbol("_leaveCb");
function rn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, rn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Tr(e, t) {
  return j(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    oe({ name: e.name }, t, { setup: e })
  ) : e;
}
function Er(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const os = /* @__PURE__ */ new WeakMap();
function Nt(e, t, s, n, r = !1) {
  if (D(e)) {
    e.forEach(
      (I, $) => Nt(
        I,
        t && (D(t) ? t[$] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (Ct(n) && !r) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Nt(e, t, s, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? un(n.component) : n.el, o = r ? null : i, { i: l, r: a } = e, d = t && t.r, u = l.refs === Z ? l.refs = {} : l.refs, p = l.setupState, w = B(p), E = p === Z ? Yn : (I) => U(w, I);
  if (d != null && d !== a) {
    if (wn(t), ne(d))
      u[d] = null, E(d) && (p[d] = null);
    else if (ge(d)) {
      d.value = null;
      const I = t;
      I.k && (u[I.k] = null);
    }
  }
  if (j(a))
    Wt(a, l, 12, [o, u]);
  else {
    const I = ne(a), $ = ge(a);
    if (I || $) {
      const re = () => {
        if (e.f) {
          const H = I ? E(a) ? p[a] : u[a] : a.value;
          if (r)
            D(H) && Ks(H, i);
          else if (D(H))
            H.includes(i) || H.push(i);
          else if (I)
            u[a] = [i], E(a) && (p[a] = u[a]);
          else {
            const z = [i];
            a.value = z, e.k && (u[e.k] = z);
          }
        } else I ? (u[a] = o, E(a) && (p[a] = o)) : $ && (a.value = o, e.k && (u[e.k] = o));
      };
      if (o) {
        const H = () => {
          re(), os.delete(e);
        };
        H.id = -1, os.set(e, H), Ae(H, s);
      } else
        wn(e), re();
    }
  }
}
function wn(e) {
  const t = os.get(e);
  t && (t.flags |= 8, os.delete(e));
}
hs().requestIdleCallback;
hs().cancelIdleCallback;
const Ct = (e) => !!e.type.__asyncLoader, Ar = (e) => e.type.__isKeepAlive;
function Gi(e, t) {
  Mr(e, "a", t);
}
function Ji(e, t) {
  Mr(e, "da", t);
}
function Mr(e, t, s = me) {
  const n = e.__wdc || (e.__wdc = () => {
    let r = s;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (_s(t, n, s), s) {
    let r = s.parent;
    for (; r && r.parent; )
      Ar(r.parent.vnode) && Yi(n, t, s, r), r = r.parent;
  }
}
function Yi(e, t, s, n) {
  const r = _s(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Or(() => {
    Ks(n[t], r);
  }, s);
}
function _s(e, t, s = me, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Xe();
      const l = Kt(s), a = We(t, s, e, o);
      return l(), Ze(), a;
    });
    return n ? r.unshift(i) : r.push(i), i;
  }
}
const tt = (e) => (t, s = me) => {
  (!Ut || e === "sp") && _s(e, (...n) => t(...n), s);
}, Xi = tt("bm"), Zi = tt("m"), Qi = tt(
  "bu"
), eo = tt("u"), to = tt(
  "bum"
), Or = tt("um"), so = tt(
  "sp"
), no = tt("rtg"), ro = tt("rtc");
function io(e, t = me) {
  _s("ec", e, t);
}
const oo = "components";
function Me(e, t) {
  return ao(oo, e, !0, t) || e;
}
const lo = Symbol.for("v-ndc");
function ao(e, t, s = !0, n = !1) {
  const r = xe || me;
  if (r) {
    const i = r.type;
    {
      const l = Qo(
        i,
        !1
      );
      if (l && (l === t || l === we(t) || l === ps(we(t))))
        return i;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      yn(r[e] || i[e], t) || // global registration
      yn(r.appContext[e], t)
    );
    return !o && n ? i : o;
  }
}
function yn(e, t) {
  return e && (e[t] || e[we(t)] || e[ps(we(t))]);
}
function Xt(e, t, s, n) {
  let r;
  const i = s, o = D(e);
  if (o || ne(e)) {
    const l = o && wt(e);
    let a = !1, d = !1;
    l && (a = !Pe(e), d = at(e), e = ms(e)), r = new Array(e.length);
    for (let u = 0, p = e.length; u < p; u++)
      r[u] = t(
        a ? d ? ss(de(e[u])) : de(e[u]) : e[u],
        u,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, i);
  } else if (te(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, a) => t(l, a, void 0, i)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let a = 0, d = l.length; a < d; a++) {
        const u = l[a];
        r[a] = t(e[u], u, a, i);
      }
    }
  else
    r = [];
  return r;
}
function co(e, t, s = {}, n, r) {
  if (xe.ce || xe.parent && Ct(xe.parent) && xe.parent.ce) {
    const d = Object.keys(s).length > 0;
    return Y(), ve(
      pe,
      null,
      [T("slot", s, n)],
      d ? -2 : 64
    );
  }
  let i = e[t];
  i && i._c && (i._d = !1), Y();
  const o = i && kr(i(s)), l = s.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  o && o.key, a = ve(
    pe,
    {
      key: (l && !et(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!o && n ? "_fb" : "")
    },
    o || [],
    o && e._ === 1 ? 64 : -2
  );
  return a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a;
}
function kr(e) {
  return e.some((t) => an(t) ? !(t.type === Qe || t.type === pe && !kr(t.children)) : !0) ? e : null;
}
const js = (e) => e ? Yr(e) ? un(e) : js(e.parent) : null, Ft = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ oe(/* @__PURE__ */ Object.create(null), {
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
    $options: (e) => Ir(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      nn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = xr.bind(e.proxy)),
    $watch: (e) => Io.bind(e)
  })
), Es = (e, t) => e !== Z && !e.__isScriptSetup && U(e, t), uo = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: r, props: i, accessCache: o, type: l, appContext: a } = e;
    let d;
    if (t[0] !== "$") {
      const E = o[t];
      if (E !== void 0)
        switch (E) {
          case 1:
            return n[t];
          case 2:
            return r[t];
          case 4:
            return s[t];
          case 3:
            return i[t];
        }
      else {
        if (Es(n, t))
          return o[t] = 1, n[t];
        if (r !== Z && U(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && U(d, t)
        )
          return o[t] = 3, i[t];
        if (s !== Z && U(s, t))
          return o[t] = 4, s[t];
        qs && (o[t] = 0);
      }
    }
    const u = Ft[t];
    let p, w;
    if (u)
      return t === "$attrs" && he(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (p = l.__cssModules) && (p = p[t])
    )
      return p;
    if (s !== Z && U(s, t))
      return o[t] = 4, s[t];
    if (
      // global properties
      w = a.config.globalProperties, U(w, t)
    )
      return w[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: i } = e;
    return Es(r, t) ? (r[t] = s, !0) : n !== Z && U(n, t) ? (n[t] = s, !0) : U(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, propsOptions: i, type: o }
  }, l) {
    let a, d;
    return !!(s[l] || e !== Z && l[0] !== "$" && U(e, l) || Es(t, l) || (a = i[0]) && U(a, l) || U(n, l) || U(Ft, l) || U(r.config.globalProperties, l) || (d = o.__cssModules) && d[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : U(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Cn(e) {
  return D(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let qs = !0;
function fo(e) {
  const t = Ir(e), s = e.proxy, n = e.ctx;
  qs = !1, t.beforeCreate && Sn(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: a,
    inject: d,
    // lifecycle
    created: u,
    beforeMount: p,
    mounted: w,
    beforeUpdate: E,
    updated: I,
    activated: $,
    deactivated: re,
    beforeDestroy: H,
    beforeUnmount: z,
    destroyed: L,
    unmounted: O,
    render: G,
    renderTracked: le,
    renderTriggered: ce,
    errorCaptured: Ie,
    serverPrefetch: ct,
    // public API
    expose: Ke,
    inheritAttrs: $e,
    // assets
    components: ut,
    directives: Ne,
    filters: Et
  } = t;
  if (d && po(d, n, null), o)
    for (const Q in o) {
      const K = o[Q];
      j(K) && (n[Q] = K.bind(s));
    }
  if (r) {
    const Q = r.call(s, s);
    te(Q) && (e.data = en(Q));
  }
  if (qs = !0, i)
    for (const Q in i) {
      const K = i[Q], ze = j(K) ? K.bind(s, s) : j(K.get) ? K.get.bind(s, s) : Be, ft = !j(K) && j(K.set) ? K.set.bind(s) : Be, N = ot({
        get: ze,
        set: ft
      });
      Object.defineProperty(n, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => N.value,
        set: (m) => N.value = m
      });
    }
  if (l)
    for (const Q in l)
      Pr(l[Q], n, s, Q);
  if (a) {
    const Q = j(a) ? a.call(s) : a;
    Reflect.ownKeys(Q).forEach((K) => {
      bo(K, Q[K]);
    });
  }
  u && Sn(u, e, "c");
  function fe(Q, K) {
    D(K) ? K.forEach((ze) => Q(ze.bind(s))) : K && Q(K.bind(s));
  }
  if (fe(Xi, p), fe(Zi, w), fe(Qi, E), fe(eo, I), fe(Gi, $), fe(Ji, re), fe(io, Ie), fe(ro, le), fe(no, ce), fe(to, z), fe(Or, O), fe(so, ct), D(Ke))
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
  G && e.render === Be && (e.render = G), $e != null && (e.inheritAttrs = $e), ut && (e.components = ut), Ne && (e.directives = Ne), ct && Er(e);
}
function po(e, t, s = Be) {
  D(e) && (e = Hs(e));
  for (const n in e) {
    const r = e[n];
    let i;
    te(r) ? "default" in r ? i = Zt(
      r.from || n,
      r.default,
      !0
    ) : i = Zt(r.from || n) : i = Zt(r), ge(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[n] = i;
  }
}
function Sn(e, t, s) {
  We(
    D(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function Pr(e, t, s, n) {
  let r = n.includes(".") ? Wr(s, n) : () => s[n];
  if (ne(e)) {
    const i = t[e];
    j(i) && Qt(r, i);
  } else if (j(e))
    Qt(r, e.bind(s));
  else if (te(e))
    if (D(e))
      e.forEach((i) => Pr(i, t, s, n));
    else {
      const i = j(e.handler) ? e.handler.bind(s) : t[e.handler];
      j(i) && Qt(r, i, e);
    }
}
function Ir(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let a;
  return l ? a = l : !r.length && !s && !n ? a = t : (a = {}, r.length && r.forEach(
    (d) => ls(a, d, o, !0)
  ), ls(a, t, o)), te(t) && i.set(t, a), a;
}
function ls(e, t, s, n = !1) {
  const { mixins: r, extends: i } = t;
  i && ls(e, i, s, !0), r && r.forEach(
    (o) => ls(e, o, s, !0)
  );
  for (const o in t)
    if (!(n && o === "expose")) {
      const l = ho[o] || s && s[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const ho = {
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
  watch: go,
  // provide / inject
  provide: Tn,
  inject: mo
};
function Tn(e, t) {
  return t ? e ? function() {
    return oe(
      j(e) ? e.call(this, this) : e,
      j(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function mo(e, t) {
  return It(Hs(e), Hs(t));
}
function Hs(e) {
  if (D(e)) {
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
  return e ? oe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function En(e, t) {
  return e ? D(e) && D(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : oe(
    /* @__PURE__ */ Object.create(null),
    Cn(e),
    Cn(t ?? {})
  ) : t;
}
function go(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = oe(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = _e(e[n], t[n]);
  return s;
}
function $r() {
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
let _o = 0;
function vo(e, t) {
  return function(n, r = null) {
    j(n) || (n = oe({}, n)), r != null && !te(r) && (r = null);
    const i = $r(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const d = i.app = {
      _uid: _o++,
      _component: n,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: tl,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...p) {
        return o.has(u) || (u && j(u.install) ? (o.add(u), u.install(d, ...p)) : j(u) && (o.add(u), u(d, ...p))), d;
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), d;
      },
      component(u, p) {
        return p ? (i.components[u] = p, d) : i.components[u];
      },
      directive(u, p) {
        return p ? (i.directives[u] = p, d) : i.directives[u];
      },
      mount(u, p, w) {
        if (!a) {
          const E = d._ceVNode || T(n, r);
          return E.appContext = i, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(E, u, w), a = !0, d._container = u, u.__vue_app__ = d, un(E.component);
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
        return i.provides[u] = p, d;
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
function bo(e, t) {
  if (me) {
    let s = me.provides;
    const n = me.parent && me.parent.provides;
    n === s && (s = me.provides = Object.create(n)), s[e] = t;
  }
}
function Zt(e, t, s = !1) {
  const n = Go();
  if (n || St) {
    let r = St ? St._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && j(t) ? t.call(n && n.proxy) : t;
  }
}
const Rr = {}, Dr = () => Object.create(Rr), Nr = (e) => Object.getPrototypeOf(e) === Rr;
function xo(e, t, s, n = !1) {
  const r = {}, i = Dr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Fr(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  s ? e.props = n ? r : $i(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function wo(e, t, s, n) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = B(r), [a] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const u = e.vnode.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        let w = u[p];
        if (vs(e.emitsOptions, w))
          continue;
        const E = t[w];
        if (a)
          if (U(i, w))
            E !== i[w] && (i[w] = E, d = !0);
          else {
            const I = we(w);
            r[I] = Ls(
              a,
              l,
              I,
              E,
              e,
              !1
            );
          }
        else
          E !== i[w] && (i[w] = E, d = !0);
      }
    }
  } else {
    Fr(e, t, r, i) && (d = !0);
    let u;
    for (const p in l)
      (!t || // for camelCase
      !U(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = ke(p)) === p || !U(t, u))) && (a ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[u] !== void 0) && (r[p] = Ls(
        a,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (i !== l)
      for (const p in i)
        (!t || !U(t, p)) && (delete i[p], d = !0);
  }
  d && Ye(e.attrs, "set", "");
}
function Fr(e, t, s, n) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let a in t) {
      if ($t(a))
        continue;
      const d = t[a];
      let u;
      r && U(r, u = we(a)) ? !i || !i.includes(u) ? s[u] = d : (l || (l = {}))[u] = d : vs(e.emitsOptions, a) || (!(a in n) || d !== n[a]) && (n[a] = d, o = !0);
    }
  if (i) {
    const a = B(s), d = l || Z;
    for (let u = 0; u < i.length; u++) {
      const p = i[u];
      s[p] = Ls(
        r,
        a,
        p,
        d[p],
        e,
        !U(d, p)
      );
    }
  }
  return o;
}
function Ls(e, t, s, n, r, i) {
  const o = e[s];
  if (o != null) {
    const l = U(o, "default");
    if (l && n === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && j(a)) {
        const { propsDefaults: d } = r;
        if (s in d)
          n = d[s];
        else {
          const u = Kt(r);
          n = d[s] = a.call(
            null,
            t
          ), u();
        }
      } else
        n = a;
      r.ce && r.ce._setProp(s, n);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !l ? n = !1 : o[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === ke(s)) && (n = !0));
  }
  return n;
}
const yo = /* @__PURE__ */ new WeakMap();
function jr(e, t, s = !1) {
  const n = s ? yo : t.propsCache, r = n.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let a = !1;
  if (!j(e)) {
    const u = (p) => {
      a = !0;
      const [w, E] = jr(p, t, !0);
      oe(o, w), E && l.push(...E);
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!i && !a)
    return te(e) && n.set(e, bt), bt;
  if (D(i))
    for (let u = 0; u < i.length; u++) {
      const p = we(i[u]);
      An(p) && (o[p] = Z);
    }
  else if (i)
    for (const u in i) {
      const p = we(u);
      if (An(p)) {
        const w = i[u], E = o[p] = D(w) || j(w) ? { type: w } : oe({}, w), I = E.type;
        let $ = !1, re = !0;
        if (D(I))
          for (let H = 0; H < I.length; ++H) {
            const z = I[H], L = j(z) && z.name;
            if (L === "Boolean") {
              $ = !0;
              break;
            } else L === "String" && (re = !1);
          }
        else
          $ = j(I) && I.name === "Boolean";
        E[
          0
          /* shouldCast */
        ] = $, E[
          1
          /* shouldCastTrue */
        ] = re, ($ || U(E, "default")) && l.push(p);
      }
    }
  const d = [o, l];
  return te(e) && n.set(e, d), d;
}
function An(e) {
  return e[0] !== "$" && !$t(e);
}
const on = (e) => e === "_" || e === "_ctx" || e === "$stable", ln = (e) => D(e) ? e.map(Ue) : [Ue(e)], Co = (e, t, s) => {
  if (t._n)
    return t;
  const n = F((...r) => ln(t(...r)), s);
  return n._c = !1, n;
}, qr = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (on(r)) continue;
    const i = e[r];
    if (j(i))
      t[r] = Co(r, i, n);
    else if (i != null) {
      const o = ln(i);
      t[r] = () => o;
    }
  }
}, Hr = (e, t) => {
  const s = ln(t);
  e.slots.default = () => s;
}, Lr = (e, t, s) => {
  for (const n in t)
    (s || !on(n)) && (e[n] = t[n]);
}, So = (e, t, s) => {
  const n = e.slots = Dr();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Lr(n, t, s), s && er(n, "_", r, !0)) : qr(t, n);
  } else t && Hr(e, t);
}, To = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let i = !0, o = Z;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? i = !1 : Lr(r, t, s) : (i = !t.$stable, qr(t, r)), o = t;
  } else t && (Hr(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !on(l) && o[l] == null && delete r[l];
}, Ae = Ho;
function Eo(e) {
  return Ao(e);
}
function Ao(e, t) {
  const s = hs();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: a,
    setText: d,
    setElementText: u,
    parentNode: p,
    nextSibling: w,
    setScopeId: E = Be,
    insertStaticContent: I
  } = e, $ = (c, f, h, b = null, g = null, _ = null, S = void 0, C = null, y = !!f.dynamicChildren) => {
    if (c === f)
      return;
    c && !kt(c, f) && (b = M(c), m(c, g, _, !0), c = null), f.patchFlag === -2 && (y = !1, f.dynamicChildren = null);
    const { type: x, ref: P, shapeFlag: A } = f;
    switch (x) {
      case bs:
        re(c, f, h, b);
        break;
      case Qe:
        H(c, f, h, b);
        break;
      case Ms:
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
        A & 1 ? G(
          c,
          f,
          h,
          b,
          g,
          _,
          S,
          C,
          y
        ) : A & 6 ? Ne(
          c,
          f,
          h,
          b,
          g,
          _,
          S,
          C,
          y
        ) : (A & 64 || A & 128) && x.process(
          c,
          f,
          h,
          b,
          g,
          _,
          S,
          C,
          y,
          At
        );
    }
    P != null && g ? Nt(P, c && c.ref, _, f || c, !f) : P == null && c && c.ref != null && Nt(c.ref, null, _, c, !0);
  }, re = (c, f, h, b) => {
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
    [c.el, c.anchor] = I(
      c.children,
      f,
      h,
      b,
      c.el,
      c.anchor
    );
  }, L = ({ el: c, anchor: f }, h, b) => {
    let g;
    for (; c && c !== f; )
      g = w(c), n(c, h, b), c = g;
    n(f, h, b);
  }, O = ({ el: c, anchor: f }) => {
    let h;
    for (; c && c !== f; )
      h = w(c), r(c), c = h;
    r(f);
  }, G = (c, f, h, b, g, _, S, C, y) => {
    f.type === "svg" ? S = "svg" : f.type === "math" && (S = "mathml"), c == null ? le(
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
  }, le = (c, f, h, b, g, _, S, C) => {
    let y, x;
    const { props: P, shapeFlag: A, transition: k, dirs: R } = c;
    if (y = c.el = o(
      c.type,
      _,
      P && P.is,
      P
    ), A & 8 ? u(y, c.children) : A & 16 && Ie(
      c.children,
      y,
      null,
      b,
      g,
      As(c, _),
      S,
      C
    ), R && dt(c, null, b, "created"), ce(y, c, c.scopeId, S, b), P) {
      for (const J in P)
        J !== "value" && !$t(J) && i(y, J, null, P[J], _, b);
      "value" in P && i(y, "value", null, P.value, _), (x = P.onVnodeBeforeMount) && Le(x, b, c);
    }
    R && dt(c, null, b, "beforeMount");
    const q = Mo(g, k);
    q && k.beforeEnter(y), n(y, f, h), ((x = P && P.onVnodeMounted) || q || R) && Ae(() => {
      x && Le(x, b, c), q && k.enter(y), R && dt(c, null, b, "mounted");
    }, g);
  }, ce = (c, f, h, b, g) => {
    if (h && E(c, h), b)
      for (let _ = 0; _ < b.length; _++)
        E(c, b[_]);
    if (g) {
      let _ = g.subTree;
      if (f === _ || zr(_.type) && (_.ssContent === f || _.ssFallback === f)) {
        const S = g.vnode;
        ce(
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
      const P = c[x] = C ? nt(c[x]) : Ue(c[x]);
      $(
        null,
        P,
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
    let { patchFlag: y, dynamicChildren: x, dirs: P } = f;
    y |= c.patchFlag & 16;
    const A = c.props || Z, k = f.props || Z;
    let R;
    if (h && pt(h, !1), (R = k.onVnodeBeforeUpdate) && Le(R, h, f, c), P && dt(f, c, h, "beforeUpdate"), h && pt(h, !0), (A.innerHTML && k.innerHTML == null || A.textContent && k.textContent == null) && u(C, ""), x ? Ke(
      c.dynamicChildren,
      x,
      C,
      h,
      b,
      As(f, g),
      _
    ) : S || K(
      c,
      f,
      C,
      null,
      h,
      b,
      As(f, g),
      _,
      !1
    ), y > 0) {
      if (y & 16)
        $e(C, A, k, h, g);
      else if (y & 2 && A.class !== k.class && i(C, "class", null, k.class, g), y & 4 && i(C, "style", A.style, k.style, g), y & 8) {
        const q = f.dynamicProps;
        for (let J = 0; J < q.length; J++) {
          const W = q[J], ye = A[W], Ce = k[W];
          (Ce !== ye || W === "value") && i(C, W, ye, Ce, g, h);
        }
      }
      y & 1 && c.children !== f.children && u(C, f.children);
    } else !S && x == null && $e(C, A, k, h, g);
    ((R = k.onVnodeUpdated) || P) && Ae(() => {
      R && Le(R, h, f, c), P && dt(f, c, h, "updated");
    }, b);
  }, Ke = (c, f, h, b, g, _, S) => {
    for (let C = 0; C < f.length; C++) {
      const y = c[C], x = f[C], P = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        y.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (y.type === pe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !kt(y, x) || // - In the case of a component, it could contain anything.
        y.shapeFlag & 198) ? p(y.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      $(
        y,
        x,
        P,
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
          !$t(_) && !(_ in h) && i(
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
        S !== C && _ !== "value" && i(c, _, C, S, g, b);
      }
      "value" in h && i(c, "value", f.value, h.value, g);
    }
  }, ut = (c, f, h, b, g, _, S, C, y) => {
    const x = f.el = c ? c.el : l(""), P = f.anchor = c ? c.anchor : l("");
    let { patchFlag: A, dynamicChildren: k, slotScopeIds: R } = f;
    R && (C = C ? C.concat(R) : R), c == null ? (n(x, h, b), n(P, h, b), Ie(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      h,
      P,
      g,
      _,
      S,
      C,
      y
    )) : A > 0 && A & 64 && k && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (Ke(
      c.dynamicChildren,
      k,
      h,
      g,
      _,
      S,
      C
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || g && f === g.subTree) && Vr(
      c,
      f,
      !0
      /* shallow */
    )) : K(
      c,
      f,
      h,
      P,
      g,
      _,
      S,
      C,
      y
    );
  }, Ne = (c, f, h, b, g, _, S, C, y) => {
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
    const C = c.component = zo(
      c,
      b,
      g
    );
    if (Ar(c) && (C.ctx.renderer = At), Jo(C, !1, S), C.asyncDep) {
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
    if (jo(c, f, h))
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
        let { next: A, bu: k, u: R, parent: q, vnode: J } = c;
        {
          const qe = Ur(c);
          if (qe) {
            A && (A.el = J.el, Q(c, A, S)), qe.asyncDep.then(() => {
              c.isUnmounted || C();
            });
            return;
          }
        }
        let W = A, ye;
        pt(c, !1), A ? (A.el = J.el, Q(c, A, S)) : A = J, k && ws(k), (ye = A.props && A.props.onVnodeBeforeUpdate) && Le(ye, q, A, J), pt(c, !0);
        const Ce = On(c), je = c.subTree;
        c.subTree = Ce, $(
          je,
          Ce,
          // parent may have changed if it's in a teleport
          p(je.el),
          // anchor may have changed if it's in a fragment
          M(je),
          c,
          g,
          _
        ), A.el = Ce.el, W === null && qo(c, Ce.el), R && Ae(R, g), (ye = A.props && A.props.onVnodeUpdated) && Ae(
          () => Le(ye, q, A, J),
          g
        );
      } else {
        let A;
        const { el: k, props: R } = f, { bm: q, m: J, parent: W, root: ye, type: Ce } = c, je = Ct(f);
        pt(c, !1), q && ws(q), !je && (A = R && R.onVnodeBeforeMount) && Le(A, W, f), pt(c, !0);
        {
          ye.ce && // @ts-expect-error _def is private
          ye.ce._def.shadowRoot !== !1 && ye.ce._injectChildStyle(Ce);
          const qe = c.subTree = On(c);
          $(
            null,
            qe,
            h,
            b,
            c,
            g,
            _
          ), f.el = qe.el;
        }
        if (J && Ae(J, g), !je && (A = R && R.onVnodeMounted)) {
          const qe = f;
          Ae(
            () => Le(A, W, qe),
            g
          );
        }
        (f.shapeFlag & 256 || W && Ct(W.vnode) && W.vnode.shapeFlag & 256) && c.a && Ae(c.a, g), c.isMounted = !0, f = h = b = null;
      }
    };
    c.scope.on();
    const y = c.effect = new rr(C);
    c.scope.off();
    const x = c.update = y.run.bind(y), P = c.job = y.runIfDirty.bind(y);
    P.i = c, P.id = c.uid, y.scheduler = () => nn(P), pt(c, !0), x();
  }, Q = (c, f, h) => {
    f.component = c;
    const b = c.vnode.props;
    c.vnode = f, c.next = null, wo(c, f.props, b, h), To(c, f.children, h), Xe(), xn(c), Ze();
  }, K = (c, f, h, b, g, _, S, C, y = !1) => {
    const x = c && c.children, P = c ? c.shapeFlag : 0, A = f.children, { patchFlag: k, shapeFlag: R } = f;
    if (k > 0) {
      if (k & 128) {
        ft(
          x,
          A,
          h,
          b,
          g,
          _,
          S,
          C,
          y
        );
        return;
      } else if (k & 256) {
        ze(
          x,
          A,
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
    R & 8 ? (P & 16 && Te(x, g, _), A !== x && u(h, A)) : P & 16 ? R & 16 ? ft(
      x,
      A,
      h,
      b,
      g,
      _,
      S,
      C,
      y
    ) : Te(x, g, _, !0) : (P & 8 && u(h, ""), R & 16 && Ie(
      A,
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
    const x = c.length, P = f.length, A = Math.min(x, P);
    let k;
    for (k = 0; k < A; k++) {
      const R = f[k] = y ? nt(f[k]) : Ue(f[k]);
      $(
        c[k],
        R,
        h,
        null,
        g,
        _,
        S,
        C,
        y
      );
    }
    x > P ? Te(
      c,
      g,
      _,
      !0,
      !1,
      A
    ) : Ie(
      f,
      h,
      b,
      g,
      _,
      S,
      C,
      y,
      A
    );
  }, ft = (c, f, h, b, g, _, S, C, y) => {
    let x = 0;
    const P = f.length;
    let A = c.length - 1, k = P - 1;
    for (; x <= A && x <= k; ) {
      const R = c[x], q = f[x] = y ? nt(f[x]) : Ue(f[x]);
      if (kt(R, q))
        $(
          R,
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
    for (; x <= A && x <= k; ) {
      const R = c[A], q = f[k] = y ? nt(f[k]) : Ue(f[k]);
      if (kt(R, q))
        $(
          R,
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
      A--, k--;
    }
    if (x > A) {
      if (x <= k) {
        const R = k + 1, q = R < P ? f[R].el : b;
        for (; x <= k; )
          $(
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
    } else if (x > k)
      for (; x <= A; )
        m(c[x], g, _, !0), x++;
    else {
      const R = x, q = x, J = /* @__PURE__ */ new Map();
      for (x = q; x <= k; x++) {
        const Ee = f[x] = y ? nt(f[x]) : Ue(f[x]);
        Ee.key != null && J.set(Ee.key, x);
      }
      let W, ye = 0;
      const Ce = k - q + 1;
      let je = !1, qe = 0;
      const Mt = new Array(Ce);
      for (x = 0; x < Ce; x++) Mt[x] = 0;
      for (x = R; x <= A; x++) {
        const Ee = c[x];
        if (ye >= Ce) {
          m(Ee, g, _, !0);
          continue;
        }
        let He;
        if (Ee.key != null)
          He = J.get(Ee.key);
        else
          for (W = q; W <= k; W++)
            if (Mt[W - q] === 0 && kt(Ee, f[W])) {
              He = W;
              break;
            }
        He === void 0 ? m(Ee, g, _, !0) : (Mt[He - q] = x + 1, He >= qe ? qe = He : je = !0, $(
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
      const pn = je ? Oo(Mt) : bt;
      for (W = pn.length - 1, x = Ce - 1; x >= 0; x--) {
        const Ee = q + x, He = f[Ee], hn = f[Ee + 1], mn = Ee + 1 < P ? (
          // #13559, fallback to el placeholder for unresolved async component
          hn.el || hn.placeholder
        ) : b;
        Mt[x] === 0 ? $(
          null,
          He,
          h,
          mn,
          g,
          _,
          S,
          C,
          y
        ) : je && (W < 0 || x !== pn[W] ? N(He, h, mn, 2) : W--);
      }
    }
  }, N = (c, f, h, b, g = null) => {
    const { el: _, type: S, transition: C, children: y, shapeFlag: x } = c;
    if (x & 6) {
      N(c.component.subTree, f, h, b);
      return;
    }
    if (x & 128) {
      c.suspense.move(f, h, b);
      return;
    }
    if (x & 64) {
      S.move(c, f, h, At);
      return;
    }
    if (S === pe) {
      n(_, f, h);
      for (let A = 0; A < y.length; A++)
        N(y[A], f, h, b);
      n(c.anchor, f, h);
      return;
    }
    if (S === Ms) {
      L(c, f, h);
      return;
    }
    if (b !== 2 && x & 1 && C)
      if (b === 0)
        C.beforeEnter(_), n(_, f, h), Ae(() => C.enter(_), g);
      else {
        const { leave: A, delayLeave: k, afterLeave: R } = C, q = () => {
          c.ctx.isUnmounted ? r(_) : n(_, f, h);
        }, J = () => {
          _._isLeaving && _[zi](
            !0
            /* cancelled */
          ), A(_, () => {
            q(), R && R();
          });
        };
        k ? k(_, q, J) : J();
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
      shapeFlag: P,
      patchFlag: A,
      dirs: k,
      cacheIndex: R
    } = c;
    if (A === -2 && (g = !1), C != null && (Xe(), Nt(C, null, h, c, !0), Ze()), R != null && (f.renderCache[R] = void 0), P & 256) {
      f.ctx.deactivate(c);
      return;
    }
    const q = P & 1 && k, J = !Ct(c);
    let W;
    if (J && (W = S && S.onVnodeBeforeUnmount) && Le(W, f, c), P & 6)
      ue(c.component, h, b);
    else {
      if (P & 128) {
        c.suspense.unmount(h, b);
        return;
      }
      q && dt(c, null, f, "beforeUnmount"), P & 64 ? c.type.remove(
        c,
        f,
        h,
        At,
        b
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== pe || A > 0 && A & 64) ? Te(
        x,
        f,
        h,
        !1,
        !0
      ) : (_ === pe && A & 384 || !g && P & 16) && Te(y, f, h), b && ae(c);
    }
    (J && (W = S && S.onVnodeUnmounted) || q) && Ae(() => {
      W && Le(W, f, c), q && dt(c, null, f, "unmounted");
    }, h);
  }, ae = (c) => {
    const { type: f, el: h, anchor: b, transition: g } = c;
    if (f === pe) {
      V(h, b);
      return;
    }
    if (f === Ms) {
      O(c);
      return;
    }
    const _ = () => {
      r(h), g && !g.persisted && g.afterLeave && g.afterLeave();
    };
    if (c.shapeFlag & 1 && g && !g.persisted) {
      const { leave: S, delayLeave: C } = g, y = () => S(h, _);
      C ? C(c.el, _, y) : y();
    } else
      _();
  }, V = (c, f) => {
    let h;
    for (; c !== f; )
      h = w(c), r(c), c = h;
    r(f);
  }, ue = (c, f, h) => {
    const { bum: b, scope: g, job: _, subTree: S, um: C, m: y, a: x } = c;
    Mn(y), Mn(x), b && ws(b), g.stop(), _ && (_.flags |= 8, m(S, c, f, h)), C && Ae(C, f), Ae(() => {
      c.isUnmounted = !0;
    }, f);
  }, Te = (c, f, h, b = !1, g = !1, _ = 0) => {
    for (let S = _; S < c.length; S++)
      m(c[S], f, h, b, g);
  }, M = (c) => {
    if (c.shapeFlag & 6)
      return M(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const f = w(c.anchor || c.el), h = f && f[Wi];
    return h ? w(h) : f;
  };
  let Fe = !1;
  const dn = (c, f, h) => {
    c == null ? f._vnode && m(f._vnode, null, null, !0) : $(
      f._vnode || null,
      c,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = c, Fe || (Fe = !0, xn(), yr(), Fe = !1);
  }, At = {
    p: $,
    um: m,
    m: N,
    r: ae,
    mt: Et,
    mc: Ie,
    pc: K,
    pbc: Ke,
    n: M,
    o: e
  };
  return {
    render: dn,
    hydrate: void 0,
    createApp: vo(dn)
  };
}
function As({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function pt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Mo(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Vr(e, t, s = !1) {
  const n = e.children, r = t.children;
  if (D(n) && D(r))
    for (let i = 0; i < n.length; i++) {
      const o = n[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = nt(r[i]), l.el = o.el), !s && l.patchFlag !== -2 && Vr(o, l)), l.type === bs && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = o.el), l.type === Qe && !l.el && (l.el = o.el);
    }
}
function Oo(e) {
  const t = e.slice(), s = [0];
  let n, r, i, o, l;
  const a = e.length;
  for (n = 0; n < a; n++) {
    const d = e[n];
    if (d !== 0) {
      if (r = s[s.length - 1], e[r] < d) {
        t[n] = r, s.push(n);
        continue;
      }
      for (i = 0, o = s.length - 1; i < o; )
        l = i + o >> 1, e[s[l]] < d ? i = l + 1 : o = l;
      d < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), s[i] = n);
    }
  }
  for (i = s.length, o = s[i - 1]; i-- > 0; )
    s[i] = o, o = t[o];
  return s;
}
function Ur(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ur(t);
}
function Mn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const ko = Symbol.for("v-scx"), Po = () => Zt(ko);
function Qt(e, t, s) {
  return Br(e, t, s);
}
function Br(e, t, s = Z) {
  const { immediate: n, deep: r, flush: i, once: o } = s, l = oe({}, s), a = t && n || !t && i !== "post";
  let d;
  if (Ut) {
    if (i === "sync") {
      const E = Po();
      d = E.__watcherHandles || (E.__watcherHandles = []);
    } else if (!a) {
      const E = () => {
      };
      return E.stop = Be, E.resume = Be, E.pause = Be, E;
    }
  }
  const u = me;
  l.call = (E, I, $) => We(E, u, I, $);
  let p = !1;
  i === "post" ? l.scheduler = (E) => {
    Ae(E, u && u.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (E, I) => {
    I ? E() : nn(E);
  }), l.augmentJob = (E) => {
    t && (E.flags |= 4), p && (E.flags |= 2, u && (E.id = u.uid, E.i = u));
  };
  const w = Li(e, t, l);
  return Ut && (d ? d.push(w) : a && w()), w;
}
function Io(e, t, s) {
  const n = this.proxy, r = ne(e) ? e.includes(".") ? Wr(n, e) : () => n[e] : e.bind(n, n);
  let i;
  j(t) ? i = t : (i = t.handler, s = t);
  const o = Kt(this), l = Br(r, i.bind(n), s);
  return o(), l;
}
function Wr(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++)
      n = n[s[r]];
    return n;
  };
}
const $o = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${we(t)}Modifiers`] || e[`${ke(t)}Modifiers`];
function Ro(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || Z;
  let r = s;
  const i = t.startsWith("update:"), o = i && $o(n, t.slice(7));
  o && (o.trim && (r = s.map((u) => ne(u) ? u.trim() : u)), o.number && (r = s.map(oi)));
  let l, a = n[l = xs(t)] || // also try camelCase event handler (#2249)
  n[l = xs(we(t))];
  !a && i && (a = n[l = xs(ke(t))]), a && We(
    a,
    e,
    6,
    r
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
      r
    );
  }
}
const Do = /* @__PURE__ */ new WeakMap();
function Kr(e, t, s = !1) {
  const n = s ? Do : t.emitsCache, r = n.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!j(e)) {
    const a = (d) => {
      const u = Kr(d, t, !0);
      u && (l = !0, oe(o, u));
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !l ? (te(e) && n.set(e, null), null) : (D(i) ? i.forEach((a) => o[a] = null) : oe(o, i), te(e) && n.set(e, o), o);
}
function vs(e, t) {
  return !e || !cs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), U(e, t[0].toLowerCase() + t.slice(1)) || U(e, ke(t)) || U(e, t));
}
function On(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: a,
    render: d,
    renderCache: u,
    props: p,
    data: w,
    setupState: E,
    ctx: I,
    inheritAttrs: $
  } = e, re = is(e);
  let H, z;
  try {
    if (s.shapeFlag & 4) {
      const O = r || n, G = O;
      H = Ue(
        d.call(
          G,
          O,
          u,
          p,
          E,
          w,
          I
        )
      ), z = l;
    } else {
      const O = t;
      H = Ue(
        O.length > 1 ? O(
          p,
          { attrs: l, slots: o, emit: a }
        ) : O(
          p,
          null
        )
      ), z = t.props ? l : No(l);
    }
  } catch (O) {
    jt.length = 0, gs(O, e, 1), H = T(Qe);
  }
  let L = H;
  if (z && $ !== !1) {
    const O = Object.keys(z), { shapeFlag: G } = L;
    O.length && G & 7 && (i && O.some(Ws) && (z = Fo(
      z,
      i
    )), L = Tt(L, z, !1, !0));
  }
  return s.dirs && (L = Tt(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(s.dirs) : s.dirs), s.transition && rn(L, s.transition), H = L, is(re), H;
}
const No = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || cs(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Fo = (e, t) => {
  const s = {};
  for (const n in e)
    (!Ws(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function jo(e, t, s) {
  const { props: n, children: r, component: i } = e, { props: o, children: l, patchFlag: a } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return n ? kn(n, o, d) : !!o;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        const w = u[p];
        if (o[w] !== n[w] && !vs(d, w))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : n === o ? !1 : n ? o ? kn(n, o, d) : !0 : !!o;
  return !1;
}
function kn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < n.length; r++) {
    const i = n[r];
    if (t[i] !== e[i] && !vs(s, i))
      return !0;
  }
  return !1;
}
function qo({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const zr = (e) => e.__isSuspense;
function Ho(e, t) {
  t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : Bi(e);
}
const pe = Symbol.for("v-fgt"), bs = Symbol.for("v-txt"), Qe = Symbol.for("v-cmt"), Ms = Symbol.for("v-stc"), jt = [];
let Oe = null;
function Y(e = !1) {
  jt.push(Oe = e ? null : []);
}
function Lo() {
  jt.pop(), Oe = jt[jt.length - 1] || null;
}
let Vt = 1;
function Pn(e, t = !1) {
  Vt += e, e < 0 && Oe && t && (Oe.hasOnce = !0);
}
function Gr(e) {
  return e.dynamicChildren = Vt > 0 ? Oe || bt : null, Lo(), Vt > 0 && Oe && Oe.push(e), e;
}
function Re(e, t, s, n, r, i) {
  return Gr(
    v(
      e,
      t,
      s,
      n,
      r,
      i,
      !0
    )
  );
}
function ve(e, t, s, n, r) {
  return Gr(
    T(
      e,
      t,
      s,
      n,
      r,
      !0
    )
  );
}
function an(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function kt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Jr = ({ key: e }) => e ?? null, es = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? ne(e) || ge(e) || j(e) ? { i: xe, r: e, k: t, f: !!s } : e : null);
function v(e, t = null, s = null, n = 0, r = null, i = e === pe ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Jr(t),
    ref: t && es(t),
    scopeId: Sr,
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
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: xe
  };
  return l ? (cn(a, s), i & 128 && e.normalize(a)) : s && (a.shapeFlag |= ne(s) ? 8 : 16), Vt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Oe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Oe.push(a), a;
}
const T = Vo;
function Vo(e, t = null, s = null, n = 0, r = null, i = !1) {
  if ((!e || e === lo) && (e = Qe), an(e)) {
    const l = Tt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && cn(l, s), Vt > 0 && !i && Oe && (l.shapeFlag & 6 ? Oe[Oe.indexOf(e)] = l : Oe.push(l)), l.patchFlag = -2, l;
  }
  if (el(e) && (e = e.__vccOpts), t) {
    t = Uo(t);
    let { class: l, style: a } = t;
    l && !ne(l) && (t.class = Bt(l)), te(a) && (sn(a) && !D(a) && (a = oe({}, a)), t.style = Gs(a));
  }
  const o = ne(e) ? 1 : zr(e) ? 128 : Ki(e) ? 64 : te(e) ? 4 : j(e) ? 2 : 0;
  return v(
    e,
    t,
    s,
    n,
    r,
    o,
    i,
    !0
  );
}
function Uo(e) {
  return e ? sn(e) || Nr(e) ? oe({}, e) : e : null;
}
function Tt(e, t, s = !1, n = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: a } = e, d = t ? Bo(r || {}, t) : r, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Jr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? D(i) ? i.concat(es(t)) : [i, es(t)] : es(t)
    ) : i,
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
    patchFlag: t && e.type !== pe ? o === -1 ? 16 : o | 16 : o,
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
  return a && n && rn(
    u,
    a.clone(u)
  ), u;
}
function se(e = " ", t = 0) {
  return T(bs, null, e, t);
}
function it(e = "", t = !1) {
  return t ? (Y(), ve(Qe, null, e)) : T(Qe, null, e);
}
function Ue(e) {
  return e == null || typeof e == "boolean" ? T(Qe) : D(e) ? T(
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
  else if (D(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), cn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !Nr(t) ? t._ctx = xe : r === 3 && xe && (xe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else j(t) ? (t = { default: t, _ctx: xe }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [se(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Bo(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === "class")
        t.class !== n.class && (t.class = Bt([t.class, n.class]));
      else if (r === "style")
        t.style = Gs([t.style, n.style]);
      else if (cs(r)) {
        const i = t[r], o = n[r];
        o && i !== o && !(D(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = n[r]);
  }
  return t;
}
function Le(e, t, s, n = null) {
  We(e, t, 7, [
    s,
    n
  ]);
}
const Wo = $r();
let Ko = 0;
function zo(e, t, s) {
  const n = e.type, r = (t ? t.appContext : e.appContext) || Wo, i = {
    uid: Ko++,
    vnode: e,
    type: n,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new pi(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: jr(n, r),
    emitsOptions: Kr(n, r),
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Ro.bind(null, i), e.ce && e.ce(i), i;
}
let me = null;
const Go = () => me || xe;
let as, Vs;
{
  const e = hs(), t = (s, n) => {
    let r;
    return (r = e[s]) || (r = e[s] = []), r.push(n), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
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
function Yr(e) {
  return e.vnode.shapeFlag & 4;
}
let Ut = !1;
function Jo(e, t = !1, s = !1) {
  t && Vs(t);
  const { props: n, children: r } = e.vnode, i = Yr(e);
  xo(e, n, i, t), So(e, r, s || t);
  const o = i ? Yo(e, t) : void 0;
  return t && Vs(!1), o;
}
function Yo(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, uo);
  const { setup: n } = s;
  if (n) {
    Xe();
    const r = e.setupContext = n.length > 1 ? Zo(e) : null, i = Kt(e), o = Wt(
      n,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = Zn(o);
    if (Ze(), i(), (l || e.sp) && !Ct(e) && Er(e), l) {
      if (o.then(In, In), t)
        return o.then((a) => {
          $n(e, a);
        }).catch((a) => {
          gs(a, e, 0);
        });
      e.asyncDep = o;
    } else
      $n(e, o);
  } else
    Xr(e);
}
function $n(e, t, s) {
  j(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : te(t) && (e.setupState = vr(t)), Xr(e);
}
function Xr(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Be);
  {
    const r = Kt(e);
    Xe();
    try {
      fo(e);
    } finally {
      Ze(), r();
    }
  }
}
const Xo = {
  get(e, t) {
    return he(e, "get", ""), e[t];
  }
};
function Zo(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Xo),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function un(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(vr(Ri(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in Ft)
        return Ft[s](e);
    },
    has(t, s) {
      return s in t || s in Ft;
    }
  })) : e.proxy;
}
function Qo(e, t = !0) {
  return j(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function el(e) {
  return j(e) && "__vccOpts" in e;
}
const ot = (e, t) => qi(e, t, Ut), tl = "3.5.22";
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
const Zr = Us ? (e) => Us.createHTML(e) : (e) => e, sl = "http://www.w3.org/2000/svg", nl = "http://www.w3.org/1998/Math/MathML", Je = typeof document < "u" ? document : null, Dn = Je && /* @__PURE__ */ Je.createElement("template"), rl = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t === "svg" ? Je.createElementNS(sl, e) : t === "mathml" ? Je.createElementNS(nl, e) : s ? Je.createElement(e, { is: s }) : Je.createElement(e);
    return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple), r;
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
  insertStaticContent(e, t, s, n, r, i) {
    const o = s ? s.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), s), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      Dn.innerHTML = Zr(
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
      o ? o.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, il = Symbol("_vtc");
function ol(e, t, s) {
  const n = e[il];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Nn = Symbol("_vod"), ll = Symbol("_vsh"), al = Symbol(""), cl = /(?:^|;)\s*display\s*:/;
function ul(e, t, s) {
  const n = e.style, r = ne(s);
  let i = !1;
  if (s && !r) {
    if (t)
      if (ne(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          s[l] == null && ts(n, l, "");
        }
      else
        for (const o in t)
          s[o] == null && ts(n, o, "");
    for (const o in s)
      o === "display" && (i = !0), ts(n, o, s[o]);
  } else if (r) {
    if (t !== s) {
      const o = n[al];
      o && (s += ";" + o), n.cssText = s, i = cl.test(s);
    }
  } else t && e.removeAttribute("style");
  Nn in e && (e[Nn] = i ? n.display : "", e[ll] && (n.display = "none"));
}
const Fn = /\s*!important$/;
function ts(e, t, s) {
  if (D(s))
    s.forEach((n) => ts(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = fl(e, t);
    Fn.test(s) ? e.setProperty(
      ke(n),
      s.replace(Fn, ""),
      "important"
    ) : e[n] = s;
  }
}
const jn = ["Webkit", "Moz", "ms"], Os = {};
function fl(e, t) {
  const s = Os[t];
  if (s)
    return s;
  let n = we(t);
  if (n !== "filter" && n in e)
    return Os[t] = n;
  n = ps(n);
  for (let r = 0; r < jn.length; r++) {
    const i = jn[r] + n;
    if (i in e)
      return Os[t] = i;
  }
  return t;
}
const qn = "http://www.w3.org/1999/xlink";
function Hn(e, t, s, n, r, i = di(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(qn, t.slice(6, t.length)) : e.setAttributeNS(qn, t, s) : s == null || i && !tr(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : et(s) ? String(s) : s
  );
}
function Ln(e, t, s, n, r) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Zr(s) : s);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (l !== a || !("_value" in e)) && (e.value = a), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let o = !1;
  if (s === "" || s == null) {
    const l = typeof e[t];
    l === "boolean" ? s = tr(s) : s == null && l === "string" ? (s = "", o = !0) : l === "number" && (s = 0, o = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function dl(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function pl(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Vn = Symbol("_vei");
function hl(e, t, s, n, r = null) {
  const i = e[Vn] || (e[Vn] = {}), o = i[t];
  if (n && o)
    o.value = n;
  else {
    const [l, a] = ml(t);
    if (n) {
      const d = i[t] = vl(
        n,
        r
      );
      dl(e, l, d, a);
    } else o && (pl(e, l, o, a), i[t] = void 0);
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
  return [e[2] === ":" ? e.slice(3) : ke(e.slice(2)), t];
}
let ks = 0;
const gl = /* @__PURE__ */ Promise.resolve(), _l = () => ks || (gl.then(() => ks = 0), ks = Date.now());
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
  if (D(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (r) => !r._stopped && n && n(r)
    );
  } else
    return t;
}
const Bn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, xl = (e, t, s, n, r, i) => {
  const o = r === "svg";
  t === "class" ? ol(e, n, o) : t === "style" ? ul(e, s, n) : cs(t) ? Ws(t) || hl(e, t, s, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : wl(e, t, n, o)) ? (Ln(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Hn(e, t, n, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ne(n)) ? Ln(e, we(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Hn(e, t, n, o));
};
function wl(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Bn(t) && j(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Bn(t) && ne(s) ? !1 : t in e;
}
const Wn = {};
// @__NO_SIDE_EFFECTS__
function yl(e, t, s) {
  let n = /* @__PURE__ */ Tr(e, t);
  fs(n) && (n = oe({}, n, t));
  class r extends fn {
    constructor(o) {
      super(n, o, s);
    }
  }
  return r.def = n, r;
}
const Cl = typeof HTMLElement < "u" ? HTMLElement : class {
};
class fn extends Cl {
  constructor(t, s = {}, n = zn) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== zn ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      oe({}, t.shadowRootOptions, {
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
    this._connected = !1, xr(() => {
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
    const t = (n, r = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: i, styles: o } = n;
      let l;
      if (i && !D(i))
        for (const a in i) {
          const d = i[a];
          (d === Number || d && d.type === Number) && (a in this._props && (this._props[a] = gn(this._props[a])), (l || (l = /* @__PURE__ */ Object.create(null)))[we(a)] = !0);
        }
      this._numberProps = l, this._resolveProps(n), this.shadowRoot && this._applyStyles(o), this._mount(n);
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
    const { props: s } = t, n = D(s) ? s : Object.keys(s || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && n.includes(r) && this._setProp(r, this[r]);
    for (const r of n.map(we))
      Object.defineProperty(this, r, {
        get() {
          return this._getProp(r);
        },
        set(i) {
          this._setProp(r, i, !0, !0);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const s = this.hasAttribute(t);
    let n = s ? this.getAttribute(t) : Wn;
    const r = we(t);
    s && this._numberProps && this._numberProps[r] && (n = gn(n)), this._setProp(r, n, !1, !0);
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
  _setProp(t, s, n = !0, r = !1) {
    if (s !== this._props[t] && (s === Wn ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), r && this._instance && this._update(), n)) {
      const i = this._ob;
      i && (this._processMutations(i.takeRecords()), i.disconnect()), s === !0 ? this.setAttribute(ke(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(ke(t), s + "") : s || this.removeAttribute(ke(t)), i && i.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Al(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = T(this._def, oe(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const r = (i, o) => {
        this.dispatchEvent(
          new CustomEvent(
            i,
            fs(o[0]) ? oe({ detail: o }, o[0]) : { detail: o }
          )
        );
      };
      n.emit = (i, ...o) => {
        r(i, o), ke(i) !== i && r(ke(i), o);
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
    for (let r = t.length - 1; r >= 0; r--) {
      const i = document.createElement("style");
      n && i.setAttribute("nonce", n), i.textContent = t[r], this.shadowRoot.prepend(i);
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
      const r = t[n], i = r.getAttribute("name") || "default", o = this._slots[i], l = r.parentNode;
      if (o)
        for (const a of o) {
          if (s && a.nodeType === 1) {
            const d = s + "-s", u = document.createTreeWalker(a, 1);
            a.setAttribute(d, "");
            let p;
            for (; p = u.nextNode(); )
              p.setAttribute(d, "");
          }
          l.insertBefore(a, r);
        }
      else
        for (; r.firstChild; ) l.insertBefore(r.firstChild, r);
      l.removeChild(r);
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
}, Qr = (e, t) => {
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = Tl[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  }));
}, El = /* @__PURE__ */ oe({ patchProp: xl }, rl);
let Kn;
function ei() {
  return Kn || (Kn = Eo(El));
}
const Al = ((...e) => {
  ei().render(...e);
}), zn = ((...e) => {
  const t = ei().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const r = Ol(n);
    if (!r) return;
    const i = t._component;
    !j(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = s(r, !1, Ml(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
});
function Ml(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ol(e) {
  return ne(e) ? document.querySelector(e) : e;
}
function kl(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var s = function n() {
      var r = !1;
      try {
        r = this instanceof n;
      } catch {
      }
      return r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    s.prototype = t.prototype;
  } else s = {};
  return Object.defineProperty(s, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var r = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(s, n, r.get ? r : {
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
}, Symbol.toStringTag, { value: "Module" })), Ps = /* @__PURE__ */ kl(Il);
var Is, Gn;
function $l() {
  if (Gn) return Is;
  Gn = 1;
  let { existsSync: e, readFileSync: t } = Ps, { dirname: s, join: n } = Ps, { SourceMapConsumer: r, SourceMapGenerator: i } = Ps;
  function o(a) {
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
      return this.consumerCache || (this.consumerCache = new r(this.text)), this.consumerCache;
    }
    decodeInline(d) {
      let u = /^data:application\/json;charset=utf-?8;base64,/, p = /^data:application\/json;base64,/, w = /^data:application\/json;charset=utf-?8,/, E = /^data:application\/json,/, I = d.match(w) || d.match(E);
      if (I)
        return decodeURIComponent(d.substr(I[0].length));
      let $ = d.match(u) || d.match(p);
      if ($)
        return o(d.substr($[0].length));
      let re = d.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + re);
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
          if (u instanceof r)
            return i.fromSourceMap(u).toString();
          if (u instanceof i)
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
const Rl = { class: "flex gap-8 flex-row" }, Dl = { class: "flex flex-col" }, Nl = { class: "text-2xl" }, Fl = { class: "flex-shrink-0" }, jl = { class: "flex flex-col" }, ql = { class: "text-2xl" }, Hl = { class: "flex-shrink-0" }, Ll = { class: "flex flex-col" }, Vl = { class: "text-2xl" }, Ul = { class: "flex-shrink-0" }, Bl = {
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
      const r = Me("ha-icon"), i = Me("ha-card");
      return Y(), Re("div", Rl, [
        T(i, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: F(() => [
            v("div", Dl, [
              n[0] || (n[0] = v("div", { class: "text-2xl" }, "Total tasks", -1)),
              v("div", Nl, ee(t.totalTasks), 1)
            ]),
            v("div", Fl, [
              T(r, {
                class: "text-blue-500",
                ".icon": "mdi:calendar-blank"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        T(i, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: F(() => [
            v("div", jl, [
              n[1] || (n[1] = v("div", { class: "text-2xl" }, "Upcoming Tasks", -1)),
              v("div", ql, ee(t.upcomingTasks), 1)
            ]),
            v("div", Hl, [
              T(r, {
                class: "text-yellow-500",
                ".icon": "mdi:bell"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        T(i, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: F(() => [
            v("div", Ll, [
              n[2] || (n[2] = v("div", { class: "text-2xl" }, "Overdue Tasks", -1)),
              v("div", Vl, ee(t.overdueTasks), 1)
            ]),
            v("div", Ul, [
              T(r, {
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
}), Xl = ".header[data-v-0681a64f]{background-color:var(--app-header-background-color);color:var(--app-header-text-color, white);border-bottom:var(--app-header-border-bottom, none)}.toolbar[data-v-0681a64f]{height:var(--header-height);display:flex;align-items:center;font-size:20px;padding:0 16px;font-weight:400;box-sizing:border-box}.main-title[data-v-0681a64f]{margin:0 0 0 24px;line-height:20px;flex-grow:1}.version[data-v-0681a64f]{font-size:14px;font-weight:500;color:rgba(var(--rgb-text-primary-color),.9)}", ti = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, r] of t)
    s[n] = r;
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
    return (s, n) => {
      const r = Me("ha-menu-button");
      return Y(), Re("div", Zl, [
        v("div", Ql, [
          T(r, {
            ".hass": t.hass,
            ".narrow": t.narrow
          }, null, 40, [".hass", ".narrow"]),
          n[0] || (n[0] = v("div", { class: "main-title" }, " Device Maintenance Manager ", -1)),
          n[1] || (n[1] = v("div", { class: "version" }, " 1.0.0 ", -1))
        ])
      ]);
    };
  }
}, ta = /* @__PURE__ */ ti(ea, [["styles", [Xl]], ["__scopeId", "data-v-0681a64f"]]), sa = { class: "flex items-start justify-between mb-2" }, na = { class: "text-2xl font-medium" }, ra = { class: "flex items-center gap-2 mr-5" }, ia = { class: "flex flex-col relative" }, oa = { class: "flex flex-col items-start w-full" }, la = { class: "flex items-center gap-2 justify-start w-full" }, aa = { class: "flex items-center gap-2 justify-start w-full" }, ca = { class: "text-xl font-light mb-6" }, ua = { class: "bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 text-lg" }, fa = { class: "mb-1" }, da = { class: "text-blue-600 ml-1" }, pa = { class: "text-blue-600 ml-1" }, ha = {
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
    const s = e, n = ie(!1), r = {
      below: "<",
      equal: "=",
      above: ">"
    }, i = t, o = () => {
      n.value = !1, i("deleteTask");
    }, l = () => {
      i("completeTask");
    }, a = () => {
      n.value = !1, i("editTask");
    }, d = () => {
      n.value = !n.value;
    };
    return (u, p) => {
      const w = Me("ha-icon"), E = Me("ha-button"), I = Me("ha-card");
      return Y(), ve(I, {
        class: Bt(["w-full", "p-6", { "border-red-700": s.overdue }])
      }, {
        default: F(() => [
          v("div", sa, [
            v("div", na, ee(s.name), 1),
            v("div", ra, [
              T(E, {
                onClick: l,
                appearance: "accent",
                variant: "success",
                class: "flex items-center gap-2"
              }, {
                default: F(() => [
                  T(w, { ".icon": "mdi:check-circle-outline" }, null, 32),
                  p[0] || (p[0] = se(" Complete ", -1))
                ]),
                _: 1
              }),
              v("div", ia, [
                T(E, {
                  onClick: Qr(d, ["stop"]),
                  variant: "neutral",
                  appearance: "plain"
                }, {
                  default: F(() => [
                    T(w, {
                      ".icon": "mdi:dots-vertical",
                      variant: "neutral",
                      appearance: "accent"
                    }, null, 32)
                  ]),
                  _: 1
                }),
                n.value ? (Y(), ve(I, {
                  key: 0,
                  class: "p-1 absolute top-full"
                }, {
                  default: F(() => [
                    v("div", oa, [
                      T(E, {
                        onClick: a,
                        variant: "neutral",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: F(() => [
                          v("div", la, [
                            T(w, { ".icon": "mdi:pencil" }, null, 32),
                            p[1] || (p[1] = se(" Edit ", -1))
                          ])
                        ]),
                        _: 1
                      }),
                      T(E, {
                        onClick: o,
                        variant: "danger",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: F(() => [
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
                })) : it("", !0)
              ])
            ])
          ]),
          v("div", ca, ee(s.location), 1),
          v("div", ua, [
            v("div", fa, [
              p[3] || (p[3] = v("span", { class: "text-blue-600 font-semibold" }, "Condition:", -1)),
              v("span", da, ee(s.sensor) + " " + ee(r[s.operator] ?? "=") + " " + ee(s.value), 1)
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
        co(t.$slots, "default")
      ])
    ])) : it("", !0);
  }
}, _a = { class: "flex items-start justify-between mb-2" }, va = { class: "text-2xl font-medium" }, ba = { class: "flex items-center gap-2 mr-5" }, xa = { class: "flex flex-col relative" }, wa = { class: "flex flex-col items-start w-full" }, ya = { class: "flex items-center gap-2 justify-start w-full" }, Ca = { class: "flex items-center gap-2 justify-start w-full" }, Sa = { class: "text-xl font-light mb-6" }, Ta = { class: "text-lg" }, Ea = { class: "mb-2" }, Aa = { class: "ml-2 mb" }, Ma = { class: "mb-2" }, Oa = { class: "ml-2" }, ka = { class: "mb-2" }, Pa = { class: "ml-2" }, Ia = { class: "ml-2" }, $a = {
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
    const s = e, n = ie(!1), r = t, i = () => {
      n.value = !1, r("deleteTask");
    }, o = () => {
      r("completeTask");
    }, l = () => {
      n.value = !1, r("editTask");
    }, a = () => {
      n.value = !n.value;
    };
    return (d, u) => {
      const p = Me("ha-icon"), w = Me("ha-button"), E = Me("ha-card");
      return Y(), ve(E, {
        class: Bt(["w-full", "p-6", {
          "border-red-500": s.overdue,
          "border-yellow-500": s.warning && !s.overdue
        }])
      }, {
        default: F(() => [
          v("div", _a, [
            v("div", va, ee(s.name), 1),
            v("div", ba, [
              T(w, {
                onClick: o,
                appearance: "accent",
                variant: "success",
                class: "flex items-center gap-2"
              }, {
                default: F(() => [
                  T(p, { ".icon": "mdi:check-circle-outline" }, null, 32),
                  u[0] || (u[0] = se(" Complete ", -1))
                ]),
                _: 1
              }),
              v("div", xa, [
                T(w, {
                  onClick: Qr(a, ["stop"]),
                  variant: "neutral",
                  appearance: "plain"
                }, {
                  default: F(() => [
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
                  default: F(() => [
                    v("div", wa, [
                      T(w, {
                        onClick: l,
                        variant: "neutral",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: F(() => [
                          v("div", ya, [
                            T(p, { ".icon": "mdi:pencil" }, null, 32),
                            u[1] || (u[1] = se(" Edit ", -1))
                          ])
                        ]),
                        _: 1
                      }),
                      T(w, {
                        onClick: i,
                        variant: "danger",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: F(() => [
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
                })) : it("", !0)
              ])
            ])
          ]),
          v("div", Sa, ee(s.location), 1),
          v("div", Ta, [
            v("div", Ea, [
              u[3] || (u[3] = v("span", { class: "font-semibold" }, "Description:", -1)),
              v("span", Aa, ee(s.description), 1)
            ]),
            v("div", Ma, [
              T(p, { ".icon": "mdi:calendar" }, null, 32),
              v("span", Oa, "Every " + ee(s.value) + " " + ee(s.seasonal_type == "runtime" ? "hours" : s.seasonal_type), 1)
            ]),
            v("div", ka, [
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
    schemaNotes: ot(
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
    schemaConditional: ot(
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
            name: "Attribute",
            required: !0,
            selector: {
              select: {
                options: e.value.map((i) => i.option),
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
function Na(e, t, s) {
  return {
    schemaInterval: ot(
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
            name: "Attribute",
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
        ] : []
      ]
    )
  };
}
const Fa = { class: "flex flex-col gap-10 justify-center m-6" }, ja = { class: "flex items-center justify-between pb-5" }, qa = { class: "flex-shrink-0" }, Ha = {
  key: 0,
  class: "text-2xl font-medium"
}, La = { class: "w-full table-fixed border-spacing-y-3 text-[1.2em]" }, Va = ["onClick"], Ua = { class: "truncate" }, Ba = { class: "flex flex-col mb-5" }, Wa = { class: "flex gap-5 text-2xl items-center" }, Ka = { class: "flex flex-row w-full mt-4 gap-3" }, za = { class: "flex flex-col mb-5" }, Ga = { class: "flex gap-5 text-2xl items-center" }, Ja = { class: "flex flex-row w-full mt-4 gap-3" }, Ya = { class: "flex flex-row w-full mt-4 gap-3" }, Xa = { class: "flex flex-row w-full mt-4 gap-3" }, Za = { class: "flex flex-col" }, Qa = { class: "flex gap-3 text-2xl items-center mb-2" }, ec = { class: "text-2xl font-medium" }, tc = { class: "text-lg font-medium mb-5" }, sc = { class: "w-full table-fixed border-spacing-y-3 text-[1.2em]" }, nc = { class: "" }, rc = { class: "break-words" }, ic = /* @__PURE__ */ Tr({
  __name: "App",
  props: {
    hass: { type: Object },
    narrow: { type: Boolean }
  },
  setup(e) {
    const t = e, s = ie({}), n = ie({}), r = ie([]), i = ie([]), o = ie(!1), l = ie(!1), a = ie(!1), d = ie(!1), u = ie("null"), p = ie("null"), w = ie(!1), E = ie(!1), I = ie(!1), $ = /* @__PURE__ */ new Set(["Task Name"]), re = ot(() => r.value.length), H = ot(() => r.value.filter((N) => N.notified).length), z = ot(() => r.value.filter((N) => N.warning && !N.notified).length), L = ie("interval"), O = ie(""), G = ie("interval"), le = ie(null), ce = ie(null), { schemaConditional: Ie } = Da(le, ce, E, w), { schemaInterval: ct } = Na(le, ce, I), { schemaNotes: Ke } = Ra();
    Qt(
      () => t.hass,
      async (N) => {
        if (N)
          try {
            const m = await Wl(N), ae = await Jl(N);
            i.value = ae, r.value = m.map((V) => {
              if (V.type == "interval") {
                if (V.seasonal_type === "runtime")
                  return { ...V, warning: V.next_due <= 3600 };
                const ue = new Date(V.next_due), Te = /* @__PURE__ */ new Date(), M = (ue.getTime() - Te.getTime()) / (1e3 * 60 * 60 * 24);
                return { ...V, warning: M <= 0.5 };
              } else
                return { ...V, warning: !1 };
            }).sort((V, ue) => ue.notified !== V.notified ? ue.notified - V.notified : ue.warning !== V.warning ? Number(ue.warning) - Number(V.warning) : 0);
          } catch (m) {
            console.error("Failed to get devices:", m);
          }
      },
      { immediate: !0 }
    );
    const $e = () => {
      o.value = !1, d.value = !1, w.value = !1, E.value = !1, I.value = !1, le.value = [], ce.value = {}, s.value = {};
    }, ut = async () => {
      s.value["Condition Duration"] === !0 ? ($.add("Duration"), $.add("Duration Type")) : ($.delete("Duration"), $.delete("Duration Type"), s.value.Duration = 0, s.value["Duration Type"] = ""), s.value["Seasonal Task"] === !0 ? ($.add("Seasonal Interval"), $.add("Seasonal Type")) : ($.delete("Seasonal Interval"), $.delete("Seasonal Type"), s.value["Seasonal Interval"] = 0, s.value["Seasonal Type"] = "");
      for (const N of $)
        if (s.value[N] === void 0 || s.value[N] === null || s.value[N] === "") {
          alert(`Field '${N}' is required.`);
          return;
        }
      s.value.Type = G.value, s.value.Control = ce.value?.control;
      try {
        d.value ? await Yl(t.hass, s.value) : await Kl(t.hass, s.value), $e();
      } catch (N) {
        console.error("Failed to create maintenance task:", N);
      }
    }, Ne = async (N) => {
      if (N.detail.value.Sensor != s.value.Sensor)
        try {
          const m = await Jn(t.hass, N.detail.value.Sensor);
          le.value = m, ce.value = le.value.length > 1 ? {} : le.value[0] ?? null, N.detail.value.Operator = "", N.detail.value.Value = "", N.detail.value.Attribute = "";
        } catch (m) {
          console.error("Failed to get attributes:", m);
        }
      if (a.value) {
        n.value = N.detail.value;
        return;
      }
      N.detail.value.Attribute != s.value.Attribute && (N.detail.value.Value = "", N.detail.value.Operator = ""), s.value = N.detail.value, w.value = s.value["Seasonal Task"] ?? !1, E.value = s.value["Condition Duration"] ?? !1, I.value = s.value["Interval Type"] == "runtime", s.value.Attribute && le.value.length > 1 && (ce.value = le.value?.find((m) => m.option === s.value.Attribute) ?? null);
    }, Et = async () => {
      if (t.hass)
        try {
          await zl(t.hass, p.value), l.value = !1, p.value = "null";
        } catch (N) {
          console.error("Failed to delete task: ", N);
        }
    }, zt = async () => {
      if (t.hass) {
        (n.value["Completion Notes"] === void 0 || n.value["Completion Notes"] === "") && (n.value["Completion Notes"] = "No notes provided.");
        try {
          const N = await Gl(t.hass, u.value, n.value);
          a.value = !1, u.value = "null", n.value = {};
        } catch (N) {
          console.error("Failed to completing task: ", N);
        }
      }
    }, fe = (N) => {
      O.value = i.value.find((m) => m.id === N);
    }, Q = ot(
      () => [...O.value.completion_dates].reverse()
    ), K = () => {
      G.value = "interval", s.value = {}, s.value.Type = "interval";
    }, ze = () => {
      G.value = "conditional", s.value = {}, s.value.Type = "conditional";
    }, ft = async (N) => {
      d.value = !0;
      const m = r.value.find((ae) => ae.id === N);
      if (m.sensor != "")
        try {
          const ae = await Jn(t.hass, m.sensor);
          le.value = ae, ce.value = le.value?.find((V) => V.option === m.option) ?? ae[0] ?? null;
        } catch (ae) {
          console.error("Failed to get attributes:", ae);
        }
      w.value = m.seasonal, E.value = m.duration_condition, I.value = m.seasonal_type == "runtime", G.value = m.type, m.duration_type == "minutes" ? m.duration /= 60 : m.duration_type == "hours" && (m.duration /= 3600), s.value = {
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
        Attribute: m.option
      };
    };
    return (N, m) => {
      const ae = Me("ha-icon"), V = Me("ha-button"), ue = Me("ha-card"), Te = Me("ha-form");
      return Y(), Re(pe, null, [
        t.hass ? (Y(), ve(ta, {
          key: 0,
          hass: t.hass,
          narrow: t.narrow
        }, null, 8, ["hass", "narrow"])) : it("", !0),
        v("div", Fa, [
          T(Bl, {
            totalTasks: re.value,
            upcomingTasks: z.value,
            overdueTasks: H.value
          }, null, 8, ["totalTasks", "upcomingTasks", "overdueTasks"]),
          T(ue, { class: "flex flex-col p-6 gap-5" }, {
            default: F(() => [
              v("div", ja, [
                m[8] || (m[8] = v("div", { class: "flex flex-col" }, [
                  v("div", { class: "text-2xl font-medium" }, "Maintenance Tasks"),
                  v("div", { class: "text-xl" }, "Manage scheduled and conditional maintenance for your smart devices")
                ], -1)),
                v("div", qa, [
                  T(V, {
                    onClick: m[0] || (m[0] = (M) => o.value = !0)
                  }, {
                    default: F(() => [
                      T(ae, {
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
                default: F(() => [
                  T(V, {
                    onClick: m[1] || (m[1] = (M) => L.value = "interval"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: L.value === "interval" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: F(() => [
                      T(ae, {
                        variant: "neutral",
                        ".icon": "mdi:calendar-blank"
                      }, null, 32),
                      m[9] || (m[9] = se(" Interval tasks", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  T(V, {
                    onClick: m[2] || (m[2] = (M) => L.value = "conditional"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: L.value === "conditional" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: F(() => [
                      T(ae, {
                        variant: "neutral",
                        ".icon": "mdi:triangle-wave"
                      }, null, 32),
                      m[10] || (m[10] = se(" Conditional tasks", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  T(V, {
                    onClick: m[3] || (m[3] = (M) => L.value = "history"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: L.value === "history" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: F(() => [
                      T(ae, {
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
              re.value == 0 ? (Y(), Re("div", Ha, "No tasks created yet...")) : it("", !0),
              L.value === "conditional" ? (Y(!0), Re(pe, { key: 1 }, Xt(r.value.filter((M) => M.type == "conditional"), (M) => (Y(), ve(ha, {
                key: M.id,
                id: M.id,
                name: M.name,
                location: M.location,
                description: M.description,
                sensor: M.sensor,
                operator: M.operator,
                value: M.value,
                overdue: M.notified,
                onDeleteTask: (Fe) => {
                  l.value = !0, p.value = M.id;
                },
                onCompleteTask: (Fe) => {
                  a.value = !0, u.value = M.id;
                },
                onEditTask: (Fe) => ft(M.id)
              }, null, 8, ["id", "name", "location", "description", "sensor", "operator", "value", "overdue", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : it("", !0),
              L.value === "interval" ? (Y(!0), Re(pe, { key: 2 }, Xt(r.value.filter((M) => M.type == "interval"), (M) => (Y(), ve($a, {
                key: M.id,
                id: M.id,
                name: M.name,
                location: M.location,
                description: M.description,
                value: M.seasonal_interval,
                overdue: M.notified,
                next_due: M.next_due,
                last_completed: M.last_completed,
                seasonal_type: M.seasonal_type,
                warning: M.warning,
                onDeleteTask: (Fe) => {
                  l.value = !0, p.value = M.id;
                },
                onCompleteTask: (Fe) => {
                  a.value = !0, u.value = M.id;
                },
                onEditTask: (Fe) => ft(M.id)
              }, null, 8, ["id", "name", "location", "description", "value", "overdue", "next_due", "last_completed", "seasonal_type", "warning", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : it("", !0),
              L.value === "history" ? (Y(), ve(ue, {
                key: 3,
                class: "w-full p-4"
              }, {
                default: F(() => [
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
                      (Y(!0), Re(pe, null, Xt(i.value, (M) => (Y(), Re("tr", {
                        onClick: (Fe) => fe(M.id),
                        class: "cursor-pointer",
                        key: M.id
                      }, [
                        v("td", null, ee(M.name), 1),
                        v("td", null, ee(M.location), 1),
                        v("td", null, ee(M.completion_dates.at(-1).date.replace("T", " ")), 1),
                        v("td", Ua, ee(M.completion_dates.at(-1).note), 1)
                      ], 8, Va))), 128))
                    ])
                  ])
                ]),
                _: 1
              })) : it("", !0)
            ]),
            _: 1
          }),
          T(Pt, { show: o.value }, {
            default: F(() => [
              T(ue, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: F(() => [
                  v("div", Ba, [
                    v("div", Wa, [
                      T(ae, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: $e
                      }, null, 32),
                      m[13] || (m[13] = v("div", { class: "flex-shrink-0" }, "Create Maintenance Task", -1))
                    ])
                  ]),
                  T(ue, { class: "mb-2 flex w-full p-1 gap-1 rounded-full" }, {
                    default: F(() => [
                      T(V, {
                        onClick: K,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: G.value === "interval" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: F(() => [...m[14] || (m[14] = [
                          se("Interval tasks", -1)
                        ])]),
                        _: 1
                      }, 8, ["appearance"]),
                      T(V, {
                        onClick: ze,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: G.value === "conditional" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: F(() => [...m[15] || (m[15] = [
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
                    onValueChanged: Ne
                  }, null, 40, [".hass", ".schema"])) : (Y(), ve(Te, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": mt(ct),
                    onValueChanged: Ne
                  }, null, 40, [".hass", ".schema"])),
                  v("div", Ka, [
                    T(V, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: $e
                    }, {
                      default: F(() => [...m[16] || (m[16] = [
                        se("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(V, {
                      class: "flex flex-1 min-w-0",
                      onClick: ut
                    }, {
                      default: F(() => [...m[17] || (m[17] = [
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
            default: F(() => [
              T(ue, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: F(() => [
                  v("div", za, [
                    v("div", Ga, [
                      T(ae, {
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
                    onValueChanged: Ne
                  }, null, 40, [".hass", ".schema", ".data"])) : (Y(), ve(Te, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": mt(ct),
                    ".data": s.value,
                    onValueChanged: Ne
                  }, null, 40, [".hass", ".schema", ".data"])),
                  v("div", Ja, [
                    T(V, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: $e
                    }, {
                      default: F(() => [...m[19] || (m[19] = [
                        se("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(V, {
                      class: "flex flex-1 min-w-0",
                      onClick: ut
                    }, {
                      default: F(() => [...m[20] || (m[20] = [
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
            default: F(() => [
              T(ue, { class: "p-6 flex flex-col" }, {
                default: F(() => [
                  m[23] || (m[23] = v("div", { class: "flex flex-col" }, [
                    v("div", { class: "text-2xl font-medium mb-5" }, "Create Maintenance Task"),
                    v("div", { class: "text-lg font-medium mb-5" }, "Are you sure you want to delete this maintenance task? This action cannot be undone.")
                  ], -1)),
                  v("div", Ya, [
                    T(V, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[4] || (m[4] = (M) => l.value = !1)
                    }, {
                      default: F(() => [...m[21] || (m[21] = [
                        se("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(V, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "danger",
                      onClick: Et
                    }, {
                      default: F(() => [...m[22] || (m[22] = [
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
            default: F(() => [
              T(ue, { class: "p-6 flex flex-col" }, {
                default: F(() => [
                  m[26] || (m[26] = v("div", { class: "flex flex-col" }, [
                    v("div", { class: "text-2xl font-medium mb-5" }, "Mark as Complete"),
                    v("div", { class: "text-lg font-medium mb-5" }, "Add any notes about completing this maintenance task (optional).")
                  ], -1)),
                  T(Te, {
                    ".hass": t.hass,
                    ".schema": mt(Ke),
                    onValueChanged: Ne
                  }, null, 40, [".hass", ".schema"]),
                  v("div", Xa, [
                    T(V, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[5] || (m[5] = (M) => a.value = !1)
                    }, {
                      default: F(() => [...m[24] || (m[24] = [
                        se("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(V, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "brand",
                      onClick: zt
                    }, {
                      default: F(() => [...m[25] || (m[25] = [
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
            show: O.value !== ""
          }, {
            default: F(() => [
              T(ue, { class: "p-6 flex flex-col max-h-[80vh] overflow-auto scrollbar-hide" }, {
                default: F(() => [
                  v("div", Za, [
                    v("div", Qa, [
                      T(ae, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: m[6] || (m[6] = (M) => O.value = "")
                      }, null, 32),
                      v("div", ec, ee(O.value.name) + "'s history", 1)
                    ]),
                    v("div", tc, ee(O.value.location), 1)
                  ]),
                  v("table", sc, [
                    m[27] || (m[27] = v("thead", { class: "text-left forn-size-lg text-[1.1em]" }, [
                      v("tr", null, [
                        v("th", null, "Date"),
                        v("th", null, "Note")
                      ])
                    ], -1)),
                    v("tbody", null, [
                      (Y(!0), Re(pe, null, Xt(Q.value, (M) => (Y(), Re("tr", null, [
                        v("td", nc, ee(M.date.replace("T", " ")), 1),
                        v("td", rc, ee(M.note), 1)
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
}), oc = "*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.invisible{visibility:hidden}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.left-0{left:0}.top-full{top:100%}.z-10{z-index:10}.z-50{z-index:50}.z-\\[8\\]{z-index:8}.m-6{margin:1.5rem}.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.mr-5{margin-right:1.25rem}.mt-1{margin-top:.25rem}.mt-4{margin-top:1rem}.flex{display:flex}.table{display:table}.hidden{display:none}.max-h-\\[80vh\\]{max-height:80vh}.w-full{width:100%}.w-max{width:-moz-max-content;width:max-content}.min-w-0{min-width:0px}.max-w-3xl{max-width:48rem}.max-w-md{max-width:28rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.table-fixed{table-layout:fixed}.border-spacing-y-3{--tw-border-spacing-y: .75rem;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.cursor-help{cursor:help}.cursor-pointer{cursor:pointer}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-10{gap:2.5rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-5{gap:1.25rem}.gap-8{gap:2rem}.overflow-auto{overflow:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.break-words{overflow-wrap:break-word}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}.rounded-sm{border-radius:.125rem}.border-2{border-width:2px}.border-blue-300{--tw-border-opacity: 1;border-color:rgb(147 197 253 / var(--tw-border-opacity, 1))}.border-red-500{--tw-border-opacity: 1;border-color:rgb(239 68 68 / var(--tw-border-opacity, 1))}.border-red-700{--tw-border-opacity: 1;border-color:rgb(185 28 28 / var(--tw-border-opacity, 1))}.border-yellow-500{--tw-border-opacity: 1;border-color:rgb(234 179 8 / var(--tw-border-opacity, 1))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1))}.bg-opacity-50{--tw-bg-opacity: .5}.p-1{padding:.25rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.pb-5{padding-bottom:1.25rem}.text-left{text-align:left}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[1\\.1em\\]{font-size:1.1em}.text-\\[1\\.2em\\]{font-size:1.2em}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.font-light{font-weight:300}.font-medium{font-weight:500}.font-semibold{font-weight:600}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-red-500{--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-500{--tw-text-opacity: 1;color:rgb(234 179 8 / var(--tw-text-opacity, 1))}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}", lc = /* @__PURE__ */ ti(ic, [["styles", [oc]]]), ac = /* @__PURE__ */ yl(lc);
customElements.define("my-integration-panel", ac);
