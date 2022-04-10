function Ds(e, t) {
  const n = Object.create(null),
    r = e.split(',');
  for (let o = 0; o < r.length; o++) n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const $c =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Oc = Ds($c);
function El(e) {
  return !!e || e === '';
}
function fn(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = Te(r) ? Nc(r) : fn(r);
      if (o) for (const s in o) t[s] = o[s];
    }
    return t;
  } else {
    if (Te(e)) return e;
    if (Se(e)) return e;
  }
}
const Pc = /;(?![^(]*\))/g,
  Mc = /:(.+)/;
function Nc(e) {
  const t = {};
  return (
    e.split(Pc).forEach((n) => {
      if (n) {
        const r = n.split(Mc);
        r.length > 1 && (t[r[0].trim()] = r[1].trim());
      }
    }),
    t
  );
}
function He(e) {
  let t = '';
  if (Te(e)) t = e;
  else if (V(e))
    for (let n = 0; n < e.length; n++) {
      const r = He(e[n]);
      r && (t += r + ' ');
    }
  else if (Se(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
const wl = (e) =>
    Te(e)
      ? e
      : e == null
      ? ''
      : V(e) || (Se(e) && (e.toString === Al || !X(e.toString)))
      ? JSON.stringify(e, Tl, 2)
      : String(e),
  Tl = (e, t) =>
    t && t.__v_isRef
      ? Tl(e, t.value)
      : xn(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, o]) => ((n[`${r} =>`] = o), n),
            {}
          ),
        }
      : Sl(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : Se(t) && !V(t) && !xl(t)
      ? String(t)
      : t,
  _e = {},
  An = [],
  ot = () => {},
  Ic = () => !1,
  kc = /^on[^a-z]/,
  eo = (e) => kc.test(e),
  Fs = (e) => e.startsWith('onUpdate:'),
  Oe = Object.assign,
  Hs = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Lc = Object.prototype.hasOwnProperty,
  oe = (e, t) => Lc.call(e, t),
  V = Array.isArray,
  xn = (e) => to(e) === '[object Map]',
  Sl = (e) => to(e) === '[object Set]',
  X = (e) => typeof e == 'function',
  Te = (e) => typeof e == 'string',
  js = (e) => typeof e == 'symbol',
  Se = (e) => e !== null && typeof e == 'object',
  Cl = (e) => Se(e) && X(e.then) && X(e.catch),
  Al = Object.prototype.toString,
  to = (e) => Al.call(e),
  Dc = (e) => to(e).slice(8, -1),
  xl = (e) => to(e) === '[object Object]',
  Bs = (e) =>
    Te(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Fr = Ds(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  no = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Fc = /-(\w)/g,
  lt = no((e) => e.replace(Fc, (t, n) => (n ? n.toUpperCase() : ''))),
  Hc = /\B([A-Z])/g,
  In = no((e) => e.replace(Hc, '-$1').toLowerCase()),
  ro = no((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  $o = no((e) => (e ? `on${ro(e)}` : '')),
  ar = (e, t) => !Object.is(e, t),
  Qn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  zr = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Rl = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Pi;
const jc = () =>
  Pi ||
  (Pi =
    typeof globalThis != 'undefined'
      ? globalThis
      : typeof self != 'undefined'
      ? self
      : typeof window != 'undefined'
      ? window
      : typeof global != 'undefined'
      ? global
      : {});
let St;
class $l {
  constructor(t = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        St &&
        ((this.parent = St),
        (this.index = (St.scopes || (St.scopes = [])).push(this) - 1));
  }
  run(t) {
    if (this.active)
      try {
        return (St = this), t();
      } finally {
        St = this.parent;
      }
  }
  on() {
    St = this;
  }
  off() {
    St = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      this.active = !1;
    }
  }
}
function Ol(e) {
  return new $l(e);
}
function Bc(e, t = St) {
  t && t.active && t.effects.push(e);
}
const Us = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Pl = (e) => (e.w & Wt) > 0,
  Ml = (e) => (e.n & Wt) > 0,
  Uc = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Wt;
  },
  zc = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const o = t[r];
        Pl(o) && !Ml(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~Wt),
          (o.n &= ~Wt);
      }
      t.length = n;
    }
  },
  ns = new WeakMap();
let Vn = 0,
  Wt = 1;
const rs = 30;
let mt;
const an = Symbol(''),
  os = Symbol('');
class zs {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Bc(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = mt,
      n = Bt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = mt),
        (mt = this),
        (Bt = !0),
        (Wt = 1 << ++Vn),
        Vn <= rs ? Uc(this) : Mi(this),
        this.fn()
      );
    } finally {
      Vn <= rs && zc(this),
        (Wt = 1 << --Vn),
        (mt = this.parent),
        (Bt = n),
        (this.parent = void 0);
    }
  }
  stop() {
    this.active && (Mi(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Mi(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Bt = !0;
const Nl = [];
function dn() {
  Nl.push(Bt), (Bt = !1);
}
function hn() {
  const e = Nl.pop();
  Bt = e === void 0 ? !0 : e;
}
function et(e, t, n) {
  if (Bt && mt) {
    let r = ns.get(e);
    r || ns.set(e, (r = new Map()));
    let o = r.get(n);
    o || r.set(n, (o = Us())), Il(o);
  }
}
function Il(e, t) {
  let n = !1;
  Vn <= rs ? Ml(e) || ((e.n |= Wt), (n = !Pl(e))) : (n = !e.has(mt)),
    n && (e.add(mt), mt.deps.push(e));
}
function $t(e, t, n, r, o, s) {
  const i = ns.get(e);
  if (!i) return;
  let a = [];
  if (t === 'clear') a = [...i.values()];
  else if (n === 'length' && V(e))
    i.forEach((l, c) => {
      (c === 'length' || c >= r) && a.push(l);
    });
  else
    switch ((n !== void 0 && a.push(i.get(n)), t)) {
      case 'add':
        V(e)
          ? Bs(n) && a.push(i.get('length'))
          : (a.push(i.get(an)), xn(e) && a.push(i.get(os)));
        break;
      case 'delete':
        V(e) || (a.push(i.get(an)), xn(e) && a.push(i.get(os)));
        break;
      case 'set':
        xn(e) && a.push(i.get(an));
        break;
    }
  if (a.length === 1) a[0] && ss(a[0]);
  else {
    const l = [];
    for (const c of a) c && l.push(...c);
    ss(Us(l));
  }
}
function ss(e, t) {
  for (const n of V(e) ? e : [...e])
    (n !== mt || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run());
}
const Wc = Ds('__proto__,__v_isRef,__isVue'),
  kl = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(js)
  ),
  Kc = Ws(),
  Gc = Ws(!1, !0),
  qc = Ws(!0),
  Ni = Vc();
function Vc() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const r = ne(this);
        for (let s = 0, i = this.length; s < i; s++) et(r, 'get', s + '');
        const o = r[t](...n);
        return o === -1 || o === !1 ? r[t](...n.map(ne)) : o;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        dn();
        const r = ne(this)[t].apply(this, n);
        return hn(), r;
      };
    }),
    e
  );
}
function Ws(e = !1, t = !1) {
  return function (r, o, s) {
    if (o === '__v_isReactive') return !e;
    if (o === '__v_isReadonly') return e;
    if (o === '__v_isShallow') return t;
    if (o === '__v_raw' && s === (e ? (t ? ff : jl) : t ? Hl : Fl).get(r))
      return r;
    const i = V(r);
    if (!e && i && oe(Ni, o)) return Reflect.get(Ni, o, s);
    const a = Reflect.get(r, o, s);
    return (js(o) ? kl.has(o) : Wc(o)) || (e || et(r, 'get', o), t)
      ? a
      : we(a)
      ? !i || !Bs(o)
        ? a.value
        : a
      : Se(a)
      ? e
        ? Bl(a)
        : pn(a)
      : a;
  };
}
const Jc = Ll(),
  Yc = Ll(!0);
function Ll(e = !1) {
  return function (n, r, o, s) {
    let i = n[r];
    if (lr(i) && we(i) && !we(o)) return !1;
    if (
      !e &&
      !lr(o) &&
      (Ul(o) || ((o = ne(o)), (i = ne(i))), !V(n) && we(i) && !we(o))
    )
      return (i.value = o), !0;
    const a = V(n) && Bs(r) ? Number(r) < n.length : oe(n, r),
      l = Reflect.set(n, r, o, s);
    return (
      n === ne(s) && (a ? ar(o, i) && $t(n, 'set', r, o) : $t(n, 'add', r, o)),
      l
    );
  };
}
function Xc(e, t) {
  const n = oe(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && $t(e, 'delete', t, void 0), r;
}
function Qc(e, t) {
  const n = Reflect.has(e, t);
  return (!js(t) || !kl.has(t)) && et(e, 'has', t), n;
}
function Zc(e) {
  return et(e, 'iterate', V(e) ? 'length' : an), Reflect.ownKeys(e);
}
const Dl = { get: Kc, set: Jc, deleteProperty: Xc, has: Qc, ownKeys: Zc },
  ef = {
    get: qc,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  tf = Oe({}, Dl, { get: Gc, set: Yc }),
  Ks = (e) => e,
  oo = (e) => Reflect.getPrototypeOf(e);
function Cr(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = ne(e),
    s = ne(t);
  t !== s && !n && et(o, 'get', t), !n && et(o, 'get', s);
  const { has: i } = oo(o),
    a = r ? Ks : n ? Vs : ur;
  if (i.call(o, t)) return a(e.get(t));
  if (i.call(o, s)) return a(e.get(s));
  e !== o && e.get(t);
}
function Ar(e, t = !1) {
  const n = this.__v_raw,
    r = ne(n),
    o = ne(e);
  return (
    e !== o && !t && et(r, 'has', e),
    !t && et(r, 'has', o),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function xr(e, t = !1) {
  return (
    (e = e.__v_raw), !t && et(ne(e), 'iterate', an), Reflect.get(e, 'size', e)
  );
}
function Ii(e) {
  e = ne(e);
  const t = ne(this);
  return oo(t).has.call(t, e) || (t.add(e), $t(t, 'add', e, e)), this;
}
function ki(e, t) {
  t = ne(t);
  const n = ne(this),
    { has: r, get: o } = oo(n);
  let s = r.call(n, e);
  s || ((e = ne(e)), (s = r.call(n, e)));
  const i = o.call(n, e);
  return (
    n.set(e, t), s ? ar(t, i) && $t(n, 'set', e, t) : $t(n, 'add', e, t), this
  );
}
function Li(e) {
  const t = ne(this),
    { has: n, get: r } = oo(t);
  let o = n.call(t, e);
  o || ((e = ne(e)), (o = n.call(t, e))), r && r.call(t, e);
  const s = t.delete(e);
  return o && $t(t, 'delete', e, void 0), s;
}
function Di() {
  const e = ne(this),
    t = e.size !== 0,
    n = e.clear();
  return t && $t(e, 'clear', void 0, void 0), n;
}
function Rr(e, t) {
  return function (r, o) {
    const s = this,
      i = s.__v_raw,
      a = ne(i),
      l = t ? Ks : e ? Vs : ur;
    return (
      !e && et(a, 'iterate', an), i.forEach((c, u) => r.call(o, l(c), l(u), s))
    );
  };
}
function $r(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      s = ne(o),
      i = xn(s),
      a = e === 'entries' || (e === Symbol.iterator && i),
      l = e === 'keys' && i,
      c = o[e](...r),
      u = n ? Ks : t ? Vs : ur;
    return (
      !t && et(s, 'iterate', l ? os : an),
      {
        next() {
          const { value: d, done: h } = c.next();
          return h
            ? { value: d, done: h }
            : { value: a ? [u(d[0]), u(d[1])] : u(d), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Nt(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this;
  };
}
function nf() {
  const e = {
      get(s) {
        return Cr(this, s);
      },
      get size() {
        return xr(this);
      },
      has: Ar,
      add: Ii,
      set: ki,
      delete: Li,
      clear: Di,
      forEach: Rr(!1, !1),
    },
    t = {
      get(s) {
        return Cr(this, s, !1, !0);
      },
      get size() {
        return xr(this);
      },
      has: Ar,
      add: Ii,
      set: ki,
      delete: Li,
      clear: Di,
      forEach: Rr(!1, !0),
    },
    n = {
      get(s) {
        return Cr(this, s, !0);
      },
      get size() {
        return xr(this, !0);
      },
      has(s) {
        return Ar.call(this, s, !0);
      },
      add: Nt('add'),
      set: Nt('set'),
      delete: Nt('delete'),
      clear: Nt('clear'),
      forEach: Rr(!0, !1),
    },
    r = {
      get(s) {
        return Cr(this, s, !0, !0);
      },
      get size() {
        return xr(this, !0);
      },
      has(s) {
        return Ar.call(this, s, !0);
      },
      add: Nt('add'),
      set: Nt('set'),
      delete: Nt('delete'),
      clear: Nt('clear'),
      forEach: Rr(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((s) => {
      (e[s] = $r(s, !1, !1)),
        (n[s] = $r(s, !0, !1)),
        (t[s] = $r(s, !1, !0)),
        (r[s] = $r(s, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [rf, of, sf, af] = nf();
function Gs(e, t) {
  const n = t ? (e ? af : sf) : e ? of : rf;
  return (r, o, s) =>
    o === '__v_isReactive'
      ? !e
      : o === '__v_isReadonly'
      ? e
      : o === '__v_raw'
      ? r
      : Reflect.get(oe(n, o) && o in r ? n : r, o, s);
}
const lf = { get: Gs(!1, !1) },
  uf = { get: Gs(!1, !0) },
  cf = { get: Gs(!0, !1) },
  Fl = new WeakMap(),
  Hl = new WeakMap(),
  jl = new WeakMap(),
  ff = new WeakMap();
function df(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function hf(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : df(Dc(e));
}
function pn(e) {
  return lr(e) ? e : qs(e, !1, Dl, lf, Fl);
}
function pf(e) {
  return qs(e, !1, tf, uf, Hl);
}
function Bl(e) {
  return qs(e, !0, ef, cf, jl);
}
function qs(e, t, n, r, o) {
  if (!Se(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const s = o.get(e);
  if (s) return s;
  const i = hf(e);
  if (i === 0) return e;
  const a = new Proxy(e, i === 2 ? r : n);
  return o.set(e, a), a;
}
function Ut(e) {
  return lr(e) ? Ut(e.__v_raw) : !!(e && e.__v_isReactive);
}
function lr(e) {
  return !!(e && e.__v_isReadonly);
}
function Ul(e) {
  return !!(e && e.__v_isShallow);
}
function zl(e) {
  return Ut(e) || lr(e);
}
function ne(e) {
  const t = e && e.__v_raw;
  return t ? ne(t) : e;
}
function Rn(e) {
  return zr(e, '__v_skip', !0), e;
}
const ur = (e) => (Se(e) ? pn(e) : e),
  Vs = (e) => (Se(e) ? Bl(e) : e);
function Wl(e) {
  Bt && mt && ((e = ne(e)), Il(e.dep || (e.dep = Us())));
}
function Kl(e, t) {
  (e = ne(e)), e.dep && ss(e.dep);
}
function we(e) {
  return !!(e && e.__v_isRef === !0);
}
function Pt(e) {
  return Gl(e, !1);
}
function mf(e) {
  return Gl(e, !0);
}
function Gl(e, t) {
  return we(e) ? e : new gf(e, t);
}
class gf {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ne(t)),
      (this._value = n ? t : ur(t));
  }
  get value() {
    return Wl(this), this._value;
  }
  set value(t) {
    (t = this.__v_isShallow ? t : ne(t)),
      ar(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this.__v_isShallow ? t : ur(t)),
        Kl(this));
  }
}
function xe(e) {
  return we(e) ? e.value : e;
}
const vf = {
  get: (e, t, n) => xe(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return we(o) && !we(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function ql(e) {
  return Ut(e) ? e : new Proxy(e, vf);
}
function bf(e) {
  const t = V(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = is(e, n);
  return t;
}
class yf {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function is(e, t, n) {
  const r = e[t];
  return we(r) ? r : new yf(e, t, n);
}
class _f {
  constructor(t, n, r, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._dirty = !0),
      (this.effect = new zs(t, () => {
        this._dirty || ((this._dirty = !0), Kl(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = ne(this);
    return (
      Wl(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Ef(e, t, n = !1) {
  let r, o;
  const s = X(e);
  return (
    s ? ((r = e), (o = ot)) : ((r = e.get), (o = e.set)),
    new _f(r, o, s || !o, n)
  );
}
Promise.resolve();
const Zn = [];
function wf(e, ...t) {
  dn();
  const n = Zn.length ? Zn[Zn.length - 1].component : null,
    r = n && n.appContext.config.warnHandler,
    o = Tf();
  if (r)
    Rt(r, n, 11, [
      e + t.join(''),
      n && n.proxy,
      o.map(({ vnode: s }) => `at <${Au(n, s.type)}>`).join(`
`),
      o,
    ]);
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    o.length &&
      s.push(
        `
`,
        ...Sf(o)
      ),
      console.warn(...s);
  }
  hn();
}
function Tf() {
  let e = Zn[Zn.length - 1];
  if (!e) return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e
      ? n.recurseCount++
      : t.push({ vnode: e, recurseCount: 0 });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function Sf(e) {
  const t = [];
  return (
    e.forEach((n, r) => {
      t.push(
        ...(r === 0
          ? []
          : [
              `
`,
            ]),
        ...Cf(n)
      );
    }),
    t
  );
}
function Cf({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : '',
    r = e.component ? e.component.parent == null : !1,
    o = ` at <${Au(e.component, e.type, r)}`,
    s = '>' + n;
  return e.props ? [o, ...Af(e.props), s] : [o + s];
}
function Af(e) {
  const t = [],
    n = Object.keys(e);
  return (
    n.slice(0, 3).forEach((r) => {
      t.push(...Vl(r, e[r]));
    }),
    n.length > 3 && t.push(' ...'),
    t
  );
}
function Vl(e, t, n) {
  return Te(t)
    ? ((t = JSON.stringify(t)), n ? t : [`${e}=${t}`])
    : typeof t == 'number' || typeof t == 'boolean' || t == null
    ? n
      ? t
      : [`${e}=${t}`]
    : we(t)
    ? ((t = Vl(e, ne(t.value), !0)), n ? t : [`${e}=Ref<`, t, '>'])
    : X(t)
    ? [`${e}=fn${t.name ? `<${t.name}>` : ''}`]
    : ((t = ne(t)), n ? t : [`${e}=`, t]);
}
function Rt(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (s) {
    so(s, t, n);
  }
  return o;
}
function st(e, t, n, r) {
  if (X(e)) {
    const s = Rt(e, t, n, r);
    return (
      s &&
        Cl(s) &&
        s.catch((i) => {
          so(i, t, n);
        }),
      s
    );
  }
  const o = [];
  for (let s = 0; s < e.length; s++) o.push(st(e[s], t, n, r));
  return o;
}
function so(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy,
      a = n;
    for (; s; ) {
      const c = s.ec;
      if (c) {
        for (let u = 0; u < c.length; u++) if (c[u](e, i, a) === !1) return;
      }
      s = s.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      Rt(l, null, 10, [e, i, a]);
      return;
    }
  }
  xf(e, n, o, r);
}
function xf(e, t, n, r = !0) {
  console.error(e);
}
let Wr = !1,
  as = !1;
const Qe = [];
let xt = 0;
const er = [];
let Jn = null,
  wn = 0;
const tr = [];
let Dt = null,
  Tn = 0;
const Jl = Promise.resolve();
let Js = null,
  ls = null;
function cr(e) {
  const t = Js || Jl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Rf(e) {
  let t = xt + 1,
    n = Qe.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    fr(Qe[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Yl(e) {
  (!Qe.length || !Qe.includes(e, Wr && e.allowRecurse ? xt + 1 : xt)) &&
    e !== ls &&
    (e.id == null ? Qe.push(e) : Qe.splice(Rf(e.id), 0, e), Xl());
}
function Xl() {
  !Wr && !as && ((as = !0), (Js = Jl.then(eu)));
}
function $f(e) {
  const t = Qe.indexOf(e);
  t > xt && Qe.splice(t, 1);
}
function Ql(e, t, n, r) {
  V(e)
    ? n.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? r + 1 : r)) && n.push(e),
    Xl();
}
function Of(e) {
  Ql(e, Jn, er, wn);
}
function Pf(e) {
  Ql(e, Dt, tr, Tn);
}
function Ys(e, t = null) {
  if (er.length) {
    for (
      ls = t, Jn = [...new Set(er)], er.length = 0, wn = 0;
      wn < Jn.length;
      wn++
    )
      Jn[wn]();
    (Jn = null), (wn = 0), (ls = null), Ys(e, t);
  }
}
function Zl(e) {
  if (tr.length) {
    const t = [...new Set(tr)];
    if (((tr.length = 0), Dt)) {
      Dt.push(...t);
      return;
    }
    for (Dt = t, Dt.sort((n, r) => fr(n) - fr(r)), Tn = 0; Tn < Dt.length; Tn++)
      Dt[Tn]();
    (Dt = null), (Tn = 0);
  }
}
const fr = (e) => (e.id == null ? 1 / 0 : e.id);
function eu(e) {
  (as = !1), (Wr = !0), Ys(e), Qe.sort((n, r) => fr(n) - fr(r));
  const t = ot;
  try {
    for (xt = 0; xt < Qe.length; xt++) {
      const n = Qe[xt];
      n && n.active !== !1 && Rt(n, null, 14);
    }
  } finally {
    (xt = 0),
      (Qe.length = 0),
      Zl(),
      (Wr = !1),
      (Js = null),
      (Qe.length || er.length || tr.length) && eu(e);
  }
}
function Mf(e, t, ...n) {
  const r = e.vnode.props || _e;
  let o = n;
  const s = t.startsWith('update:'),
    i = s && t.slice(7);
  if (i && i in r) {
    const u = `${i === 'modelValue' ? 'model' : i}Modifiers`,
      { number: d, trim: h } = r[u] || _e;
    h ? (o = n.map((v) => v.trim())) : d && (o = n.map(Rl));
  }
  let a,
    l = r[(a = $o(t))] || r[(a = $o(lt(t)))];
  !l && s && (l = r[(a = $o(In(t)))]), l && st(l, e, 6, o);
  const c = r[a + 'Once'];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), st(c, e, 6, o);
  }
}
function tu(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (o !== void 0) return o;
  const s = e.emits;
  let i = {},
    a = !1;
  if (!X(e)) {
    const l = (c) => {
      const u = tu(c, t, !0);
      u && ((a = !0), Oe(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !s && !a
    ? (r.set(e, null), null)
    : (V(s) ? s.forEach((l) => (i[l] = null)) : Oe(i, s), r.set(e, i), i);
}
function Xs(e, t) {
  return !e || !eo(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      oe(e, t[0].toLowerCase() + t.slice(1)) || oe(e, In(t)) || oe(e, t));
}
let Ze = null,
  nu = null;
function Kr(e) {
  const t = Ze;
  return (Ze = e), (nu = (e && e.type.__scopeId) || null), t;
}
function us(e, t = Ze, n) {
  if (!t || e._n) return e;
  const r = (...o) => {
    r._d && Ji(-1);
    const s = Kr(t),
      i = e(...o);
    return Kr(s), r._d && Ji(1), i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Oo(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: s,
    propsOptions: [i],
    slots: a,
    attrs: l,
    emit: c,
    render: u,
    renderCache: d,
    data: h,
    setupState: v,
    ctx: C,
    inheritAttrs: L,
  } = e;
  let w, S;
  const y = Kr(e);
  try {
    if (n.shapeFlag & 4) {
      const A = o || r;
      (w = pt(u.call(A, A, d, s, v, h, C))), (S = l);
    } else {
      const A = t;
      (w = pt(
        A.length > 1 ? A(s, { attrs: l, slots: a, emit: c }) : A(s, null)
      )),
        (S = t.props ? l : Nf(l));
    }
  } catch (A) {
    (rr.length = 0), so(A, e, 1), (w = je(ut));
  }
  let M = w;
  if (S && L !== !1) {
    const A = Object.keys(S),
      { shapeFlag: K } = M;
    A.length && K & 7 && (i && A.some(Fs) && (S = If(S, i)), (M = cn(M, S)));
  }
  return (
    n.dirs && (M.dirs = M.dirs ? M.dirs.concat(n.dirs) : n.dirs),
    n.transition && (M.transition = n.transition),
    (w = M),
    Kr(y),
    w
  );
}
const Nf = (e) => {
    let t;
    for (const n in e)
      (n === 'class' || n === 'style' || eo(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  If = (e, t) => {
    const n = {};
    for (const r in e) (!Fs(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function kf(e, t, n) {
  const { props: r, children: o, component: s } = e,
    { props: i, children: a, patchFlag: l } = t,
    c = s.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return r ? Fi(r, i, c) : !!i;
    if (l & 8) {
      const u = t.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        const h = u[d];
        if (i[h] !== r[h] && !Xs(c, h)) return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? Fi(r, i, c)
        : !0
      : !!i;
  return !1;
}
function Fi(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (t[s] !== e[s] && !Xs(n, s)) return !0;
  }
  return !1;
}
function Lf({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Df = (e) => e.__isSuspense;
function Ff(e, t) {
  t && t.pendingBranch
    ? V(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Pf(e);
}
function nr(e, t) {
  if (Re) {
    let n = Re.provides;
    const r = Re.parent && Re.parent.provides;
    r === n && (n = Re.provides = Object.create(r)), (n[e] = t);
  }
}
function $e(e, t, n = !1) {
  const r = Re || Ze;
  if (r) {
    const o =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && X(t) ? t.call(r.proxy) : t;
  }
}
const Hi = {};
function zt(e, t, n) {
  return ru(e, t, n);
}
function ru(
  e,
  t,
  { immediate: n, deep: r, flush: o, onTrack: s, onTrigger: i } = _e
) {
  const a = Re;
  let l,
    c = !1,
    u = !1;
  if (
    (we(e)
      ? ((l = () => e.value), (c = Ul(e)))
      : Ut(e)
      ? ((l = () => e), (r = !0))
      : V(e)
      ? ((u = !0),
        (c = e.some(Ut)),
        (l = () =>
          e.map((S) => {
            if (we(S)) return S.value;
            if (Ut(S)) return on(S);
            if (X(S)) return Rt(S, a, 2);
          })))
      : X(e)
      ? t
        ? (l = () => Rt(e, a, 2))
        : (l = () => {
            if (!(a && a.isUnmounted)) return d && d(), st(e, a, 3, [h]);
          })
      : (l = ot),
    t && r)
  ) {
    const S = l;
    l = () => on(S());
  }
  let d,
    h = (S) => {
      d = w.onStop = () => {
        Rt(S, a, 4);
      };
    };
  if (mr)
    return (h = ot), t ? n && st(t, a, 3, [l(), u ? [] : void 0, h]) : l(), ot;
  let v = u ? [] : Hi;
  const C = () => {
    if (!!w.active)
      if (t) {
        const S = w.run();
        (r || c || (u ? S.some((y, M) => ar(y, v[M])) : ar(S, v))) &&
          (d && d(), st(t, a, 3, [S, v === Hi ? void 0 : v, h]), (v = S));
      } else w.run();
  };
  C.allowRecurse = !!t;
  let L;
  o === 'sync'
    ? (L = C)
    : o === 'post'
    ? (L = () => Ne(C, a && a.suspense))
    : (L = () => {
        !a || a.isMounted ? Of(C) : C();
      });
  const w = new zs(l, L);
  return (
    t
      ? n
        ? C()
        : (v = w.run())
      : o === 'post'
      ? Ne(w.run.bind(w), a && a.suspense)
      : w.run(),
    () => {
      w.stop(), a && a.scope && Hs(a.scope.effects, w);
    }
  );
}
function Hf(e, t, n) {
  const r = this.proxy,
    o = Te(e) ? (e.includes('.') ? ou(r, e) : () => r[e]) : e.bind(r, r);
  let s;
  X(t) ? (s = t) : ((s = t.handler), (n = t));
  const i = Re;
  On(this);
  const a = ru(o, s.bind(r), n);
  return i ? On(i) : un(), a;
}
function ou(e, t) {
  const n = t.split('.');
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
function on(e, t) {
  if (!Se(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), we(e))) on(e.value, t);
  else if (V(e)) for (let n = 0; n < e.length; n++) on(e[n], t);
  else if (Sl(e) || xn(e))
    e.forEach((n) => {
      on(n, t);
    });
  else if (xl(e)) for (const n in e) on(e[n], t);
  return e;
}
function su() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Zs(() => {
      e.isMounted = !0;
    }),
    ti(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const nt = [Function, Array],
  jf = {
    name: 'BaseTransition',
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: nt,
      onEnter: nt,
      onAfterEnter: nt,
      onEnterCancelled: nt,
      onBeforeLeave: nt,
      onLeave: nt,
      onAfterLeave: nt,
      onLeaveCancelled: nt,
      onBeforeAppear: nt,
      onAppear: nt,
      onAfterAppear: nt,
      onAppearCancelled: nt,
    },
    setup(e, { slots: t }) {
      const n = kn(),
        r = su();
      let o;
      return () => {
        const s = t.default && Qs(t.default(), !0);
        if (!s || !s.length) return;
        const i = ne(e),
          { mode: a } = i,
          l = s[0];
        if (r.isLeaving) return Po(l);
        const c = ji(l);
        if (!c) return Po(l);
        const u = dr(c, i, r, n);
        $n(c, u);
        const d = n.subTree,
          h = d && ji(d);
        let v = !1;
        const { getTransitionKey: C } = c.type;
        if (C) {
          const L = C();
          o === void 0 ? (o = L) : L !== o && ((o = L), (v = !0));
        }
        if (h && h.type !== ut && (!nn(c, h) || v)) {
          const L = dr(h, i, r, n);
          if (($n(h, L), a === 'out-in'))
            return (
              (r.isLeaving = !0),
              (L.afterLeave = () => {
                (r.isLeaving = !1), n.update();
              }),
              Po(l)
            );
          a === 'in-out' &&
            c.type !== ut &&
            (L.delayLeave = (w, S, y) => {
              const M = iu(r, h);
              (M[String(h.key)] = h),
                (w._leaveCb = () => {
                  S(), (w._leaveCb = void 0), delete u.delayedLeave;
                }),
                (u.delayedLeave = y);
            });
        }
        return l;
      };
    },
  },
  Bf = jf;
function iu(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function dr(e, t, n, r) {
  const {
      appear: o,
      mode: s,
      persisted: i = !1,
      onBeforeEnter: a,
      onEnter: l,
      onAfterEnter: c,
      onEnterCancelled: u,
      onBeforeLeave: d,
      onLeave: h,
      onAfterLeave: v,
      onLeaveCancelled: C,
      onBeforeAppear: L,
      onAppear: w,
      onAfterAppear: S,
      onAppearCancelled: y,
    } = t,
    M = String(e.key),
    A = iu(n, e),
    K = (P, Y) => {
      P && st(P, r, 9, Y);
    },
    I = {
      mode: s,
      persisted: i,
      beforeEnter(P) {
        let Y = a;
        if (!n.isMounted)
          if (o) Y = L || a;
          else return;
        P._leaveCb && P._leaveCb(!0);
        const Q = A[M];
        Q && nn(e, Q) && Q.el._leaveCb && Q.el._leaveCb(), K(Y, [P]);
      },
      enter(P) {
        let Y = l,
          Q = c,
          se = u;
        if (!n.isMounted)
          if (o) (Y = w || l), (Q = S || c), (se = y || u);
          else return;
        let ve = !1;
        const j = (P._enterCb = (Z) => {
          ve ||
            ((ve = !0),
            Z ? K(se, [P]) : K(Q, [P]),
            I.delayedLeave && I.delayedLeave(),
            (P._enterCb = void 0));
        });
        Y ? (Y(P, j), Y.length <= 1 && j()) : j();
      },
      leave(P, Y) {
        const Q = String(e.key);
        if ((P._enterCb && P._enterCb(!0), n.isUnmounting)) return Y();
        K(d, [P]);
        let se = !1;
        const ve = (P._leaveCb = (j) => {
          se ||
            ((se = !0),
            Y(),
            j ? K(C, [P]) : K(v, [P]),
            (P._leaveCb = void 0),
            A[Q] === e && delete A[Q]);
        });
        (A[Q] = e), h ? (h(P, ve), h.length <= 1 && ve()) : ve();
      },
      clone(P) {
        return dr(P, t, n, r);
      },
    };
  return I;
}
function Po(e) {
  if (io(e)) return (e = cn(e)), (e.children = null), e;
}
function ji(e) {
  return io(e) ? (e.children ? e.children[0] : void 0) : e;
}
function $n(e, t) {
  e.shapeFlag & 6 && e.component
    ? $n(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Qs(e, t = !1) {
  let n = [],
    r = 0;
  for (let o = 0; o < e.length; o++) {
    const s = e[o];
    s.type === Ke
      ? (s.patchFlag & 128 && r++, (n = n.concat(Qs(s.children, t))))
      : (t || s.type !== ut) && n.push(s);
  }
  if (r > 1) for (let o = 0; o < n.length; o++) n[o].patchFlag = -2;
  return n;
}
function vt(e) {
  return X(e) ? { setup: e, name: e.name } : e;
}
const Gr = (e) => !!e.type.__asyncLoader,
  io = (e) => e.type.__isKeepAlive,
  Uf = {
    name: 'KeepAlive',
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(e, { slots: t }) {
      const n = kn(),
        r = n.ctx;
      if (!r.renderer) return t.default;
      const o = new Map(),
        s = new Set();
      let i = null;
      const a = n.suspense,
        {
          renderer: {
            p: l,
            m: c,
            um: u,
            o: { createElement: d },
          },
        } = r,
        h = d('div');
      (r.activate = (y, M, A, K, I) => {
        const P = y.component;
        c(y, M, A, 0, a),
          l(P.vnode, y, M, A, P, a, K, y.slotScopeIds, I),
          Ne(() => {
            (P.isDeactivated = !1), P.a && Qn(P.a);
            const Y = y.props && y.props.onVnodeMounted;
            Y && rt(Y, P.parent, y);
          }, a);
      }),
        (r.deactivate = (y) => {
          const M = y.component;
          c(y, h, null, 1, a),
            Ne(() => {
              M.da && Qn(M.da);
              const A = y.props && y.props.onVnodeUnmounted;
              A && rt(A, M.parent, y), (M.isDeactivated = !0);
            }, a);
        });
      function v(y) {
        Mo(y), u(y, n, a, !0);
      }
      function C(y) {
        o.forEach((M, A) => {
          const K = Yr(M.type);
          K && (!y || !y(K)) && L(A);
        });
      }
      function L(y) {
        const M = o.get(y);
        !i || M.type !== i.type ? v(M) : i && Mo(i), o.delete(y), s.delete(y);
      }
      zt(
        () => [e.include, e.exclude],
        ([y, M]) => {
          y && C((A) => Yn(y, A)), M && C((A) => !Yn(M, A));
        },
        { flush: 'post', deep: !0 }
      );
      let w = null;
      const S = () => {
        w != null && o.set(w, No(n.subTree));
      };
      return (
        Zs(S),
        ei(S),
        ti(() => {
          o.forEach((y) => {
            const { subTree: M, suspense: A } = n,
              K = No(M);
            if (y.type === K.type) {
              Mo(K);
              const I = K.component.da;
              I && Ne(I, A);
              return;
            }
            v(y);
          });
        }),
        () => {
          if (((w = null), !t.default)) return null;
          const y = t.default(),
            M = y[0];
          if (y.length > 1) return (i = null), y;
          if (!hr(M) || (!(M.shapeFlag & 4) && !(M.shapeFlag & 128)))
            return (i = null), M;
          let A = No(M);
          const K = A.type,
            I = Yr(Gr(A) ? A.type.__asyncResolved || {} : K),
            { include: P, exclude: Y, max: Q } = e;
          if ((P && (!I || !Yn(P, I))) || (Y && I && Yn(Y, I)))
            return (i = A), M;
          const se = A.key == null ? K : A.key,
            ve = o.get(se);
          return (
            A.el && ((A = cn(A)), M.shapeFlag & 128 && (M.ssContent = A)),
            (w = se),
            ve
              ? ((A.el = ve.el),
                (A.component = ve.component),
                A.transition && $n(A, A.transition),
                (A.shapeFlag |= 512),
                s.delete(se),
                s.add(se))
              : (s.add(se),
                Q && s.size > parseInt(Q, 10) && L(s.values().next().value)),
            (A.shapeFlag |= 256),
            (i = A),
            M
          );
        }
      );
    },
  },
  I1 = Uf;
function Yn(e, t) {
  return V(e)
    ? e.some((n) => Yn(n, t))
    : Te(e)
    ? e.split(',').includes(t)
    : e.test
    ? e.test(t)
    : !1;
}
function zf(e, t) {
  au(e, 'a', t);
}
function Wf(e, t) {
  au(e, 'da', t);
}
function au(e, t, n = Re) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((ao(t, r, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      io(o.parent.vnode) && Kf(r, t, n, o), (o = o.parent);
  }
}
function Kf(e, t, n, r) {
  const o = ao(t, e, r, !0);
  ni(() => {
    Hs(r[t], o);
  }, n);
}
function Mo(e) {
  let t = e.shapeFlag;
  t & 256 && (t -= 256), t & 512 && (t -= 512), (e.shapeFlag = t);
}
function No(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function ao(e, t, n = Re, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          dn(), On(n);
          const a = st(t, n, e, i);
          return un(), hn(), a;
        });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const Mt =
    (e) =>
    (t, n = Re) =>
      (!mr || e === 'sp') && ao(e, t, n),
  Gf = Mt('bm'),
  Zs = Mt('m'),
  qf = Mt('bu'),
  ei = Mt('u'),
  ti = Mt('bum'),
  ni = Mt('um'),
  Vf = Mt('sp'),
  Jf = Mt('rtg'),
  Yf = Mt('rtc');
function Xf(e, t = Re) {
  ao('ec', e, t);
}
let cs = !0;
function Qf(e) {
  const t = uu(e),
    n = e.proxy,
    r = e.ctx;
  (cs = !1), t.beforeCreate && Bi(t.beforeCreate, e, 'bc');
  const {
    data: o,
    computed: s,
    methods: i,
    watch: a,
    provide: l,
    inject: c,
    created: u,
    beforeMount: d,
    mounted: h,
    beforeUpdate: v,
    updated: C,
    activated: L,
    deactivated: w,
    beforeDestroy: S,
    beforeUnmount: y,
    destroyed: M,
    unmounted: A,
    render: K,
    renderTracked: I,
    renderTriggered: P,
    errorCaptured: Y,
    serverPrefetch: Q,
    expose: se,
    inheritAttrs: ve,
    components: j,
    directives: Z,
    filters: ie,
  } = t;
  if ((c && Zf(c, r, null, e.appContext.config.unwrapInjectedRef), i))
    for (const pe in i) {
      const fe = i[pe];
      X(fe) && (r[pe] = fe.bind(n));
    }
  if (o) {
    const pe = o.call(n, n);
    Se(pe) && (e.data = pn(pe));
  }
  if (((cs = !0), s))
    for (const pe in s) {
      const fe = s[pe],
        Be = X(fe) ? fe.bind(n, n) : X(fe.get) ? fe.get.bind(n, n) : ot,
        ft = !X(fe) && X(fe.set) ? fe.set.bind(n) : ot,
        be = he({ get: Be, set: ft });
      Object.defineProperty(r, pe, {
        enumerable: !0,
        configurable: !0,
        get: () => be.value,
        set: (Ve) => (be.value = Ve),
      });
    }
  if (a) for (const pe in a) lu(a[pe], r, n, pe);
  if (l) {
    const pe = X(l) ? l.call(n) : l;
    Reflect.ownKeys(pe).forEach((fe) => {
      nr(fe, pe[fe]);
    });
  }
  u && Bi(u, e, 'c');
  function Ee(pe, fe) {
    V(fe) ? fe.forEach((Be) => pe(Be.bind(n))) : fe && pe(fe.bind(n));
  }
  if (
    (Ee(Gf, d),
    Ee(Zs, h),
    Ee(qf, v),
    Ee(ei, C),
    Ee(zf, L),
    Ee(Wf, w),
    Ee(Xf, Y),
    Ee(Yf, I),
    Ee(Jf, P),
    Ee(ti, y),
    Ee(ni, A),
    Ee(Vf, Q),
    V(se))
  )
    if (se.length) {
      const pe = e.exposed || (e.exposed = {});
      se.forEach((fe) => {
        Object.defineProperty(pe, fe, {
          get: () => n[fe],
          set: (Be) => (n[fe] = Be),
        });
      });
    } else e.exposed || (e.exposed = {});
  K && e.render === ot && (e.render = K),
    ve != null && (e.inheritAttrs = ve),
    j && (e.components = j),
    Z && (e.directives = Z);
}
function Zf(e, t, n = ot, r = !1) {
  V(e) && (e = fs(e));
  for (const o in e) {
    const s = e[o];
    let i;
    Se(s)
      ? 'default' in s
        ? (i = $e(s.from || o, s.default, !0))
        : (i = $e(s.from || o))
      : (i = $e(s)),
      we(i) && r
        ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (a) => (i.value = a),
          })
        : (t[o] = i);
  }
}
function Bi(e, t, n) {
  st(V(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function lu(e, t, n, r) {
  const o = r.includes('.') ? ou(n, r) : () => n[r];
  if (Te(e)) {
    const s = t[e];
    X(s) && zt(o, s);
  } else if (X(e)) zt(o, e.bind(n));
  else if (Se(e))
    if (V(e)) e.forEach((s) => lu(s, t, n, r));
    else {
      const s = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(s) && zt(o, s, e);
    }
}
function uu(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: s,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    a = s.get(t);
  let l;
  return (
    a
      ? (l = a)
      : !o.length && !n && !r
      ? (l = t)
      : ((l = {}), o.length && o.forEach((c) => qr(l, c, i, !0)), qr(l, t, i)),
    s.set(t, l),
    l
  );
}
function qr(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && qr(e, s, n, !0), o && o.forEach((i) => qr(e, i, n, !0));
  for (const i in t)
    if (!(r && i === 'expose')) {
      const a = ed[i] || (n && n[i]);
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const ed = {
  data: Ui,
  props: en,
  emits: en,
  methods: en,
  computed: en,
  beforeCreate: Ue,
  created: Ue,
  beforeMount: Ue,
  mounted: Ue,
  beforeUpdate: Ue,
  updated: Ue,
  beforeDestroy: Ue,
  beforeUnmount: Ue,
  destroyed: Ue,
  unmounted: Ue,
  activated: Ue,
  deactivated: Ue,
  errorCaptured: Ue,
  serverPrefetch: Ue,
  components: en,
  directives: en,
  watch: nd,
  provide: Ui,
  inject: td,
};
function Ui(e, t) {
  return t
    ? e
      ? function () {
          return Oe(
            X(e) ? e.call(this, this) : e,
            X(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function td(e, t) {
  return en(fs(e), fs(t));
}
function fs(e) {
  if (V(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ue(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function en(e, t) {
  return e ? Oe(Oe(Object.create(null), e), t) : t;
}
function nd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Oe(Object.create(null), e);
  for (const r in t) n[r] = Ue(e[r], t[r]);
  return n;
}
function rd(e, t, n, r = !1) {
  const o = {},
    s = {};
  zr(s, uo, 1), (e.propsDefaults = Object.create(null)), cu(e, t, o, s);
  for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
  n ? (e.props = r ? o : pf(o)) : e.type.props ? (e.props = o) : (e.props = s),
    (e.attrs = s);
}
function od(e, t, n, r) {
  const {
      props: o,
      attrs: s,
      vnode: { patchFlag: i },
    } = e,
    a = ne(o),
    [l] = e.propsOptions;
  let c = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let d = 0; d < u.length; d++) {
        let h = u[d];
        const v = t[h];
        if (l)
          if (oe(s, h)) v !== s[h] && ((s[h] = v), (c = !0));
          else {
            const C = lt(h);
            o[C] = ds(l, a, C, v, e, !1);
          }
        else v !== s[h] && ((s[h] = v), (c = !0));
      }
    }
  } else {
    cu(e, t, o, s) && (c = !0);
    let u;
    for (const d in a)
      (!t || (!oe(t, d) && ((u = In(d)) === d || !oe(t, u)))) &&
        (l
          ? n &&
            (n[d] !== void 0 || n[u] !== void 0) &&
            (o[d] = ds(l, a, d, void 0, e, !0))
          : delete o[d]);
    if (s !== a)
      for (const d in s) (!t || (!oe(t, d) && !0)) && (delete s[d], (c = !0));
  }
  c && $t(e, 'set', '$attrs');
}
function cu(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1,
    a;
  if (t)
    for (let l in t) {
      if (Fr(l)) continue;
      const c = t[l];
      let u;
      o && oe(o, (u = lt(l)))
        ? !s || !s.includes(u)
          ? (n[u] = c)
          : ((a || (a = {}))[u] = c)
        : Xs(e.emitsOptions, l) ||
          ((!(l in r) || c !== r[l]) && ((r[l] = c), (i = !0)));
    }
  if (s) {
    const l = ne(n),
      c = a || _e;
    for (let u = 0; u < s.length; u++) {
      const d = s[u];
      n[d] = ds(o, l, d, c[d], e, !oe(c, d));
    }
  }
  return i;
}
function ds(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const a = oe(i, 'default');
    if (a && r === void 0) {
      const l = i.default;
      if (i.type !== Function && X(l)) {
        const { propsDefaults: c } = o;
        n in c ? (r = c[n]) : (On(o), (r = c[n] = l.call(null, t)), un());
      } else r = l;
    }
    i[0] &&
      (s && !a ? (r = !1) : i[1] && (r === '' || r === In(n)) && (r = !0));
  }
  return r;
}
function fu(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e);
  if (o) return o;
  const s = e.props,
    i = {},
    a = [];
  let l = !1;
  if (!X(e)) {
    const u = (d) => {
      l = !0;
      const [h, v] = fu(d, t, !0);
      Oe(i, h), v && a.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  if (!s && !l) return r.set(e, An), An;
  if (V(s))
    for (let u = 0; u < s.length; u++) {
      const d = lt(s[u]);
      zi(d) && (i[d] = _e);
    }
  else if (s)
    for (const u in s) {
      const d = lt(u);
      if (zi(d)) {
        const h = s[u],
          v = (i[d] = V(h) || X(h) ? { type: h } : h);
        if (v) {
          const C = Gi(Boolean, v.type),
            L = Gi(String, v.type);
          (v[0] = C > -1),
            (v[1] = L < 0 || C < L),
            (C > -1 || oe(v, 'default')) && a.push(d);
        }
      }
    }
  const c = [i, a];
  return r.set(e, c), c;
}
function zi(e) {
  return e[0] !== '$';
}
function Wi(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? 'null' : '';
}
function Ki(e, t) {
  return Wi(e) === Wi(t);
}
function Gi(e, t) {
  return V(t) ? t.findIndex((n) => Ki(n, e)) : X(t) && Ki(t, e) ? 0 : -1;
}
const du = (e) => e[0] === '_' || e === '$stable',
  ri = (e) => (V(e) ? e.map(pt) : [pt(e)]),
  sd = (e, t, n) => {
    const r = us((...o) => ri(t(...o)), n);
    return (r._c = !1), r;
  },
  hu = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (du(o)) continue;
      const s = e[o];
      if (X(s)) t[o] = sd(o, s, r);
      else if (s != null) {
        const i = ri(s);
        t[o] = () => i;
      }
    }
  },
  pu = (e, t) => {
    const n = ri(t);
    e.slots.default = () => n;
  },
  id = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = ne(t)), zr(t, '_', n)) : hu(t, (e.slots = {}));
    } else (e.slots = {}), t && pu(e, t);
    zr(e.slots, uo, 1);
  },
  ad = (e, t, n) => {
    const { vnode: r, slots: o } = e;
    let s = !0,
      i = _e;
    if (r.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (s = !1)
          : (Oe(o, t), !n && a === 1 && delete o._)
        : ((s = !t.$stable), hu(t, o)),
        (i = t);
    } else t && (pu(e, t), (i = { default: 1 }));
    if (s) for (const a in o) !du(a) && !(a in i) && delete o[a];
  };
function k1(e, t) {
  const n = Ze;
  if (n === null) return e;
  const r = n.proxy,
    o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, a, l, c = _e] = t[s];
    X(i) && (i = { mounted: i, updated: i }),
      i.deep && on(a),
      o.push({
        dir: i,
        instance: r,
        value: a,
        oldValue: void 0,
        arg: l,
        modifiers: c,
      });
  }
  return e;
}
function Vt(e, t, n, r) {
  const o = e.dirs,
    s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    s && (a.oldValue = s[i].value);
    let l = a.dir[r];
    l && (dn(), st(l, n, 8, [e.el, a, e, t]), hn());
  }
}
function mu() {
  return {
    app: null,
    config: {
      isNativeTag: Ic,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let ld = 0;
function ud(e, t) {
  return function (r, o = null) {
    o != null && !Se(o) && (o = null);
    const s = mu(),
      i = new Set();
    let a = !1;
    const l = (s.app = {
      _uid: ld++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: $d,
      get config() {
        return s.config;
      },
      set config(c) {},
      use(c, ...u) {
        return (
          i.has(c) ||
            (c && X(c.install)
              ? (i.add(c), c.install(l, ...u))
              : X(c) && (i.add(c), c(l, ...u))),
          l
        );
      },
      mixin(c) {
        return s.mixins.includes(c) || s.mixins.push(c), l;
      },
      component(c, u) {
        return u ? ((s.components[c] = u), l) : s.components[c];
      },
      directive(c, u) {
        return u ? ((s.directives[c] = u), l) : s.directives[c];
      },
      mount(c, u, d) {
        if (!a) {
          const h = je(r, o);
          return (
            (h.appContext = s),
            u && t ? t(h, c) : e(h, c, d),
            (a = !0),
            (l._container = c),
            (c.__vue_app__ = l),
            ai(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(c, u) {
        return (s.provides[c] = u), l;
      },
    });
    return l;
  };
}
function hs(e, t, n, r, o = !1) {
  if (V(e)) {
    e.forEach((h, v) => hs(h, t && (V(t) ? t[v] : t), n, r, o));
    return;
  }
  if (Gr(r) && !o) return;
  const s = r.shapeFlag & 4 ? ai(r.component) || r.component.proxy : r.el,
    i = o ? null : s,
    { i: a, r: l } = e,
    c = t && t.r,
    u = a.refs === _e ? (a.refs = {}) : a.refs,
    d = a.setupState;
  if (
    (c != null &&
      c !== l &&
      (Te(c)
        ? ((u[c] = null), oe(d, c) && (d[c] = null))
        : we(c) && (c.value = null)),
    X(l))
  )
    Rt(l, a, 12, [i, u]);
  else {
    const h = Te(l),
      v = we(l);
    if (h || v) {
      const C = () => {
        if (e.f) {
          const L = h ? u[l] : l.value;
          o
            ? V(L) && Hs(L, s)
            : V(L)
            ? L.includes(s) || L.push(s)
            : h
            ? (u[l] = [s])
            : ((l.value = [s]), e.k && (u[e.k] = l.value));
        } else
          h
            ? ((u[l] = i), oe(d, l) && (d[l] = i))
            : we(l) && ((l.value = i), e.k && (u[e.k] = i));
      };
      i ? ((C.id = -1), Ne(C, n)) : C();
    }
  }
}
const Ne = Ff;
function cd(e) {
  return fd(e);
}
function fd(e, t) {
  const n = jc();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: o,
      patchProp: s,
      createElement: i,
      createText: a,
      createComment: l,
      setText: c,
      setElementText: u,
      parentNode: d,
      nextSibling: h,
      setScopeId: v = ot,
      cloneNode: C,
      insertStaticContent: L,
    } = e,
    w = (
      f,
      p,
      g,
      E = null,
      _ = null,
      $ = null,
      k = !1,
      x = null,
      R = !!p.dynamicChildren
    ) => {
      if (f === p) return;
      f && !nn(f, p) && ((E = B(f)), ce(f, _, $, !0), (f = null)),
        p.patchFlag === -2 && ((R = !1), (p.dynamicChildren = null));
      const { type: T, ref: U, shapeFlag: H } = p;
      switch (T) {
        case lo:
          S(f, p, g, E);
          break;
        case ut:
          y(f, p, g, E);
          break;
        case Io:
          f == null && M(p, g, E, k);
          break;
        case Ke:
          Z(f, p, g, E, _, $, k, x, R);
          break;
        default:
          H & 1
            ? I(f, p, g, E, _, $, k, x, R)
            : H & 6
            ? ie(f, p, g, E, _, $, k, x, R)
            : (H & 64 || H & 128) && T.process(f, p, g, E, _, $, k, x, R, de);
      }
      U != null && _ && hs(U, f && f.ref, $, p || f, !p);
    },
    S = (f, p, g, E) => {
      if (f == null) r((p.el = a(p.children)), g, E);
      else {
        const _ = (p.el = f.el);
        p.children !== f.children && c(_, p.children);
      }
    },
    y = (f, p, g, E) => {
      f == null ? r((p.el = l(p.children || '')), g, E) : (p.el = f.el);
    },
    M = (f, p, g, E) => {
      [f.el, f.anchor] = L(f.children, p, g, E, f.el, f.anchor);
    },
    A = ({ el: f, anchor: p }, g, E) => {
      let _;
      for (; f && f !== p; ) (_ = h(f)), r(f, g, E), (f = _);
      r(p, g, E);
    },
    K = ({ el: f, anchor: p }) => {
      let g;
      for (; f && f !== p; ) (g = h(f)), o(f), (f = g);
      o(p);
    },
    I = (f, p, g, E, _, $, k, x, R) => {
      (k = k || p.type === 'svg'),
        f == null ? P(p, g, E, _, $, k, x, R) : se(f, p, _, $, k, x, R);
    },
    P = (f, p, g, E, _, $, k, x) => {
      let R, T;
      const {
        type: U,
        props: H,
        shapeFlag: z,
        transition: G,
        patchFlag: te,
        dirs: me,
      } = f;
      if (f.el && C !== void 0 && te === -1) R = f.el = C(f.el);
      else {
        if (
          ((R = f.el = i(f.type, $, H && H.is, H)),
          z & 8
            ? u(R, f.children)
            : z & 16 &&
              Q(f.children, R, null, E, _, $ && U !== 'foreignObject', k, x),
          me && Vt(f, null, E, 'created'),
          H)
        ) {
          for (const re in H)
            re !== 'value' &&
              !Fr(re) &&
              s(R, re, null, H[re], $, f.children, E, _, N);
          'value' in H && s(R, 'value', null, H.value),
            (T = H.onVnodeBeforeMount) && rt(T, E, f);
        }
        Y(R, f, f.scopeId, k, E);
      }
      me && Vt(f, null, E, 'beforeMount');
      const le = (!_ || (_ && !_.pendingBranch)) && G && !G.persisted;
      le && G.beforeEnter(R),
        r(R, p, g),
        ((T = H && H.onVnodeMounted) || le || me) &&
          Ne(() => {
            T && rt(T, E, f), le && G.enter(R), me && Vt(f, null, E, 'mounted');
          }, _);
    },
    Y = (f, p, g, E, _) => {
      if ((g && v(f, g), E)) for (let $ = 0; $ < E.length; $++) v(f, E[$]);
      if (_) {
        let $ = _.subTree;
        if (p === $) {
          const k = _.vnode;
          Y(f, k, k.scopeId, k.slotScopeIds, _.parent);
        }
      }
    },
    Q = (f, p, g, E, _, $, k, x, R = 0) => {
      for (let T = R; T < f.length; T++) {
        const U = (f[T] = x ? Ft(f[T]) : pt(f[T]));
        w(null, U, p, g, E, _, $, k, x);
      }
    },
    se = (f, p, g, E, _, $, k) => {
      const x = (p.el = f.el);
      let { patchFlag: R, dynamicChildren: T, dirs: U } = p;
      R |= f.patchFlag & 16;
      const H = f.props || _e,
        z = p.props || _e;
      let G;
      g && Jt(g, !1),
        (G = z.onVnodeBeforeUpdate) && rt(G, g, p, f),
        U && Vt(p, f, g, 'beforeUpdate'),
        g && Jt(g, !0);
      const te = _ && p.type !== 'foreignObject';
      if (
        (T
          ? ve(f.dynamicChildren, T, x, g, E, te, $)
          : k || Be(f, p, x, null, g, E, te, $, !1),
        R > 0)
      ) {
        if (R & 16) j(x, p, H, z, g, E, _);
        else if (
          (R & 2 && H.class !== z.class && s(x, 'class', null, z.class, _),
          R & 4 && s(x, 'style', H.style, z.style, _),
          R & 8)
        ) {
          const me = p.dynamicProps;
          for (let le = 0; le < me.length; le++) {
            const re = me[le],
              Le = H[re],
              dt = z[re];
            (dt !== Le || re === 'value') &&
              s(x, re, Le, dt, _, f.children, g, E, N);
          }
        }
        R & 1 && f.children !== p.children && u(x, p.children);
      } else !k && T == null && j(x, p, H, z, g, E, _);
      ((G = z.onVnodeUpdated) || U) &&
        Ne(() => {
          G && rt(G, g, p, f), U && Vt(p, f, g, 'updated');
        }, E);
    },
    ve = (f, p, g, E, _, $, k) => {
      for (let x = 0; x < p.length; x++) {
        const R = f[x],
          T = p[x],
          U =
            R.el && (R.type === Ke || !nn(R, T) || R.shapeFlag & 70)
              ? d(R.el)
              : g;
        w(R, T, U, null, E, _, $, k, !0);
      }
    },
    j = (f, p, g, E, _, $, k) => {
      if (g !== E) {
        for (const x in E) {
          if (Fr(x)) continue;
          const R = E[x],
            T = g[x];
          R !== T && x !== 'value' && s(f, x, T, R, k, p.children, _, $, N);
        }
        if (g !== _e)
          for (const x in g)
            !Fr(x) && !(x in E) && s(f, x, g[x], null, k, p.children, _, $, N);
        'value' in E && s(f, 'value', g.value, E.value);
      }
    },
    Z = (f, p, g, E, _, $, k, x, R) => {
      const T = (p.el = f ? f.el : a('')),
        U = (p.anchor = f ? f.anchor : a(''));
      let { patchFlag: H, dynamicChildren: z, slotScopeIds: G } = p;
      G && (x = x ? x.concat(G) : G),
        f == null
          ? (r(T, g, E), r(U, g, E), Q(p.children, g, U, _, $, k, x, R))
          : H > 0 && H & 64 && z && f.dynamicChildren
          ? (ve(f.dynamicChildren, z, g, _, $, k, x),
            (p.key != null || (_ && p === _.subTree)) && gu(f, p, !0))
          : Be(f, p, g, U, _, $, k, x, R);
    },
    ie = (f, p, g, E, _, $, k, x, R) => {
      (p.slotScopeIds = x),
        f == null
          ? p.shapeFlag & 512
            ? _.ctx.activate(p, g, E, k, R)
            : qe(p, g, E, _, $, k, R)
          : Ee(f, p, R);
    },
    qe = (f, p, g, E, _, $, k) => {
      const x = (f.component = Ed(f, E, _));
      if ((io(f) && (x.ctx.renderer = de), wd(x), x.asyncDep)) {
        if ((_ && _.registerDep(x, pe), !f.el)) {
          const R = (x.subTree = je(ut));
          y(null, R, p, g);
        }
        return;
      }
      pe(x, f, p, g, _, $, k);
    },
    Ee = (f, p, g) => {
      const E = (p.component = f.component);
      if (kf(f, p, g))
        if (E.asyncDep && !E.asyncResolved) {
          fe(E, p, g);
          return;
        } else (E.next = p), $f(E.update), E.update();
      else (p.component = f.component), (p.el = f.el), (E.vnode = p);
    },
    pe = (f, p, g, E, _, $, k) => {
      const x = () => {
          if (f.isMounted) {
            let { next: U, bu: H, u: z, parent: G, vnode: te } = f,
              me = U,
              le;
            Jt(f, !1),
              U ? ((U.el = te.el), fe(f, U, k)) : (U = te),
              H && Qn(H),
              (le = U.props && U.props.onVnodeBeforeUpdate) && rt(le, G, U, te),
              Jt(f, !0);
            const re = Oo(f),
              Le = f.subTree;
            (f.subTree = re),
              w(Le, re, d(Le.el), B(Le), f, _, $),
              (U.el = re.el),
              me === null && Lf(f, re.el),
              z && Ne(z, _),
              (le = U.props && U.props.onVnodeUpdated) &&
                Ne(() => rt(le, G, U, te), _);
          } else {
            let U;
            const { el: H, props: z } = p,
              { bm: G, m: te, parent: me } = f,
              le = Gr(p);
            if (
              (Jt(f, !1),
              G && Qn(G),
              !le && (U = z && z.onVnodeBeforeMount) && rt(U, me, p),
              Jt(f, !0),
              H && q)
            ) {
              const re = () => {
                (f.subTree = Oo(f)), q(H, f.subTree, f, _, null);
              };
              le
                ? p.type.__asyncLoader().then(() => !f.isUnmounted && re())
                : re();
            } else {
              const re = (f.subTree = Oo(f));
              w(null, re, g, E, f, _, $), (p.el = re.el);
            }
            if ((te && Ne(te, _), !le && (U = z && z.onVnodeMounted))) {
              const re = p;
              Ne(() => rt(U, me, re), _);
            }
            p.shapeFlag & 256 && f.a && Ne(f.a, _),
              (f.isMounted = !0),
              (p = g = E = null);
          }
        },
        R = (f.effect = new zs(x, () => Yl(f.update), f.scope)),
        T = (f.update = R.run.bind(R));
      (T.id = f.uid), Jt(f, !0), T();
    },
    fe = (f, p, g) => {
      p.component = f;
      const E = f.vnode.props;
      (f.vnode = p),
        (f.next = null),
        od(f, p.props, E, g),
        ad(f, p.children, g),
        dn(),
        Ys(void 0, f.update),
        hn();
    },
    Be = (f, p, g, E, _, $, k, x, R = !1) => {
      const T = f && f.children,
        U = f ? f.shapeFlag : 0,
        H = p.children,
        { patchFlag: z, shapeFlag: G } = p;
      if (z > 0) {
        if (z & 128) {
          be(T, H, g, E, _, $, k, x, R);
          return;
        } else if (z & 256) {
          ft(T, H, g, E, _, $, k, x, R);
          return;
        }
      }
      G & 8
        ? (U & 16 && N(T, _, $), H !== T && u(g, H))
        : U & 16
        ? G & 16
          ? be(T, H, g, E, _, $, k, x, R)
          : N(T, _, $, !0)
        : (U & 8 && u(g, ''), G & 16 && Q(H, g, E, _, $, k, x, R));
    },
    ft = (f, p, g, E, _, $, k, x, R) => {
      (f = f || An), (p = p || An);
      const T = f.length,
        U = p.length,
        H = Math.min(T, U);
      let z;
      for (z = 0; z < H; z++) {
        const G = (p[z] = R ? Ft(p[z]) : pt(p[z]));
        w(f[z], G, g, null, _, $, k, x, R);
      }
      T > U ? N(f, _, $, !0, !1, H) : Q(p, g, E, _, $, k, x, R, H);
    },
    be = (f, p, g, E, _, $, k, x, R) => {
      let T = 0;
      const U = p.length;
      let H = f.length - 1,
        z = U - 1;
      for (; T <= H && T <= z; ) {
        const G = f[T],
          te = (p[T] = R ? Ft(p[T]) : pt(p[T]));
        if (nn(G, te)) w(G, te, g, null, _, $, k, x, R);
        else break;
        T++;
      }
      for (; T <= H && T <= z; ) {
        const G = f[H],
          te = (p[z] = R ? Ft(p[z]) : pt(p[z]));
        if (nn(G, te)) w(G, te, g, null, _, $, k, x, R);
        else break;
        H--, z--;
      }
      if (T > H) {
        if (T <= z) {
          const G = z + 1,
            te = G < U ? p[G].el : E;
          for (; T <= z; )
            w(null, (p[T] = R ? Ft(p[T]) : pt(p[T])), g, te, _, $, k, x, R),
              T++;
        }
      } else if (T > z) for (; T <= H; ) ce(f[T], _, $, !0), T++;
      else {
        const G = T,
          te = T,
          me = new Map();
        for (T = te; T <= z; T++) {
          const Ce = (p[T] = R ? Ft(p[T]) : pt(p[T]));
          Ce.key != null && me.set(Ce.key, T);
        }
        let le,
          re = 0;
        const Le = z - te + 1;
        let dt = !1,
          _t = 0;
        const qt = new Array(Le);
        for (T = 0; T < Le; T++) qt[T] = 0;
        for (T = G; T <= H; T++) {
          const Ce = f[T];
          if (re >= Le) {
            ce(Ce, _, $, !0);
            continue;
          }
          let Pe;
          if (Ce.key != null) Pe = me.get(Ce.key);
          else
            for (le = te; le <= z; le++)
              if (qt[le - te] === 0 && nn(Ce, p[le])) {
                Pe = le;
                break;
              }
          Pe === void 0
            ? ce(Ce, _, $, !0)
            : ((qt[Pe - te] = T + 1),
              Pe >= _t ? (_t = Pe) : (dt = !0),
              w(Ce, p[Pe], g, null, _, $, k, x, R),
              re++);
        }
        const Er = dt ? dd(qt) : An;
        for (le = Er.length - 1, T = Le - 1; T >= 0; T--) {
          const Ce = te + T,
            Pe = p[Ce],
            wr = Ce + 1 < U ? p[Ce + 1].el : E;
          qt[T] === 0
            ? w(null, Pe, g, wr, _, $, k, x, R)
            : dt && (le < 0 || T !== Er[le] ? Ve(Pe, g, wr, 2) : le--);
        }
      }
    },
    Ve = (f, p, g, E, _ = null) => {
      const { el: $, type: k, transition: x, children: R, shapeFlag: T } = f;
      if (T & 6) {
        Ve(f.component.subTree, p, g, E);
        return;
      }
      if (T & 128) {
        f.suspense.move(p, g, E);
        return;
      }
      if (T & 64) {
        k.move(f, p, g, de);
        return;
      }
      if (k === Ke) {
        r($, p, g);
        for (let H = 0; H < R.length; H++) Ve(R[H], p, g, E);
        r(f.anchor, p, g);
        return;
      }
      if (k === Io) {
        A(f, p, g);
        return;
      }
      if (E !== 2 && T & 1 && x)
        if (E === 0) x.beforeEnter($), r($, p, g), Ne(() => x.enter($), _);
        else {
          const { leave: H, delayLeave: z, afterLeave: G } = x,
            te = () => r($, p, g),
            me = () => {
              H($, () => {
                te(), G && G();
              });
            };
          z ? z($, te, me) : me();
        }
      else r($, p, g);
    },
    ce = (f, p, g, E = !1, _ = !1) => {
      const {
        type: $,
        props: k,
        ref: x,
        children: R,
        dynamicChildren: T,
        shapeFlag: U,
        patchFlag: H,
        dirs: z,
      } = f;
      if ((x != null && hs(x, null, g, f, !0), U & 256)) {
        p.ctx.deactivate(f);
        return;
      }
      const G = U & 1 && z,
        te = !Gr(f);
      let me;
      if ((te && (me = k && k.onVnodeBeforeUnmount) && rt(me, p, f), U & 6))
        D(f.component, g, E);
      else {
        if (U & 128) {
          f.suspense.unmount(g, E);
          return;
        }
        G && Vt(f, null, p, 'beforeUnmount'),
          U & 64
            ? f.type.remove(f, p, g, _, de, E)
            : T && ($ !== Ke || (H > 0 && H & 64))
            ? N(T, p, g, !1, !0)
            : (($ === Ke && H & 384) || (!_ && U & 16)) && N(R, p, g),
          E && gn(f);
      }
      ((te && (me = k && k.onVnodeUnmounted)) || G) &&
        Ne(() => {
          me && rt(me, p, f), G && Vt(f, null, p, 'unmounted');
        }, g);
    },
    gn = (f) => {
      const { type: p, el: g, anchor: E, transition: _ } = f;
      if (p === Ke) {
        b(g, E);
        return;
      }
      if (p === Io) {
        K(f);
        return;
      }
      const $ = () => {
        o(g), _ && !_.persisted && _.afterLeave && _.afterLeave();
      };
      if (f.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: k, delayLeave: x } = _,
          R = () => k(g, $);
        x ? x(f.el, $, R) : R();
      } else $();
    },
    b = (f, p) => {
      let g;
      for (; f !== p; ) (g = h(f)), o(f), (f = g);
      o(p);
    },
    D = (f, p, g) => {
      const { bum: E, scope: _, update: $, subTree: k, um: x } = f;
      E && Qn(E),
        _.stop(),
        $ && (($.active = !1), ce(k, f, p, g)),
        x && Ne(x, p),
        Ne(() => {
          f.isUnmounted = !0;
        }, p),
        p &&
          p.pendingBranch &&
          !p.isUnmounted &&
          f.asyncDep &&
          !f.asyncResolved &&
          f.suspenseId === p.pendingId &&
          (p.deps--, p.deps === 0 && p.resolve());
    },
    N = (f, p, g, E = !1, _ = !1, $ = 0) => {
      for (let k = $; k < f.length; k++) ce(f[k], p, g, E, _);
    },
    B = (f) =>
      f.shapeFlag & 6
        ? B(f.component.subTree)
        : f.shapeFlag & 128
        ? f.suspense.next()
        : h(f.anchor || f.el),
    ae = (f, p, g) => {
      f == null
        ? p._vnode && ce(p._vnode, null, null, !0)
        : w(p._vnode || null, f, p, null, null, null, g),
        Zl(),
        (p._vnode = f);
    },
    de = {
      p: w,
      um: ce,
      m: Ve,
      r: gn,
      mt: qe,
      mc: Q,
      pc: Be,
      pbc: ve,
      n: B,
      o: e,
    };
  let J, q;
  return (
    t && ([J, q] = t(de)), { render: ae, hydrate: J, createApp: ud(ae, J) }
  );
}
function Jt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function gu(e, t, n = !1) {
  const r = e.children,
    o = t.children;
  if (V(r) && V(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let a = o[s];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = o[s] = Ft(o[s])), (a.el = i.el)),
        n || gu(i, a));
    }
}
function dd(e) {
  const t = e.slice(),
    n = [0];
  let r, o, s, i, a;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const c = e[r];
    if (c !== 0) {
      if (((o = n[n.length - 1]), e[o] < c)) {
        (t[r] = o), n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        (a = (s + i) >> 1), e[n[a]] < c ? (s = a + 1) : (i = a);
      c < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), (n[s] = r));
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; ) (n[s] = i), (i = t[i]);
  return n;
}
const hd = (e) => e.__isTeleport,
  oi = 'components',
  pd = 'directives';
function vu(e, t) {
  return si(oi, e, !0, t) || e;
}
const bu = Symbol();
function qi(e) {
  return Te(e) ? si(oi, e, !1) || e : e || bu;
}
function L1(e) {
  return si(pd, e);
}
function si(e, t, n = !0, r = !1) {
  const o = Ze || Re;
  if (o) {
    const s = o.type;
    if (e === oi) {
      const a = Yr(s);
      if (a && (a === t || a === lt(t) || a === ro(lt(t)))) return s;
    }
    const i = Vi(o[e] || s[e], t) || Vi(o.appContext[e], t);
    return !i && r ? s : i;
  }
}
function Vi(e, t) {
  return e && (e[t] || e[lt(t)] || e[ro(lt(t))]);
}
const Ke = Symbol(void 0),
  lo = Symbol(void 0),
  ut = Symbol(void 0),
  Io = Symbol(void 0),
  rr = [];
let ln = null;
function Ae(e = !1) {
  rr.push((ln = e ? null : []));
}
function md() {
  rr.pop(), (ln = rr[rr.length - 1] || null);
}
let Vr = 1;
function Ji(e) {
  Vr += e;
}
function yu(e) {
  return (
    (e.dynamicChildren = Vr > 0 ? ln || An : null),
    md(),
    Vr > 0 && ln && ln.push(e),
    e
  );
}
function ze(e, t, n, r, o, s) {
  return yu(ue(e, t, n, r, o, s, !0));
}
function Cn(e, t, n, r, o) {
  return yu(je(e, t, n, r, o, !0));
}
function hr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function nn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const uo = '__vInternal',
  _u = ({ key: e }) => (e != null ? e : null),
  Hr = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? Te(e) || we(e) || X(e)
        ? { i: Ze, r: e, k: t, f: !!n }
        : e
      : null;
function ue(
  e,
  t = null,
  n = null,
  r = 0,
  o = null,
  s = e === Ke ? 0 : 1,
  i = !1,
  a = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && _u(t),
    ref: t && Hr(t),
    scopeId: nu,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    a
      ? (ii(l, n), s & 128 && e.normalize(l))
      : n && (l.shapeFlag |= Te(n) ? 8 : 16),
    Vr > 0 &&
      !i &&
      ln &&
      (l.patchFlag > 0 || s & 6) &&
      l.patchFlag !== 32 &&
      ln.push(l),
    l
  );
}
const je = gd;
function gd(e, t = null, n = null, r = 0, o = null, s = !1) {
  if (((!e || e === bu) && (e = ut), hr(e))) {
    const a = cn(e, t, !0);
    return n && ii(a, n), a;
  }
  if ((Rd(e) && (e = e.__vccOpts), t)) {
    t = vd(t);
    let { class: a, style: l } = t;
    a && !Te(a) && (t.class = He(a)),
      Se(l) && (zl(l) && !V(l) && (l = Oe({}, l)), (t.style = fn(l)));
  }
  const i = Te(e) ? 1 : Df(e) ? 128 : hd(e) ? 64 : Se(e) ? 4 : X(e) ? 2 : 0;
  return ue(e, t, n, r, o, i, s, !0);
}
function vd(e) {
  return e ? (zl(e) || uo in e ? Oe({}, e) : e) : null;
}
function cn(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: s, children: i } = e,
    a = t ? wu(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && _u(a),
    ref:
      t && t.ref ? (n && o ? (V(o) ? o.concat(Hr(t)) : [o, Hr(t)]) : Hr(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ke ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && cn(e.ssContent),
    ssFallback: e.ssFallback && cn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function Eu(e = ' ', t = 0) {
  return je(lo, null, e, t);
}
function pr(e = '', t = !1) {
  return t ? (Ae(), Cn(ut, null, e)) : je(ut, null, e);
}
function pt(e) {
  return e == null || typeof e == 'boolean'
    ? je(ut)
    : V(e)
    ? je(Ke, null, e.slice())
    : typeof e == 'object'
    ? Ft(e)
    : je(lo, null, String(e));
}
function Ft(e) {
  return e.el === null || e.memo ? e : cn(e);
}
function ii(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (V(t)) n = 16;
  else if (typeof t == 'object')
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), ii(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(uo in t)
        ? (t._ctx = Ze)
        : o === 3 &&
          Ze &&
          (Ze.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    X(t)
      ? ((t = { default: t, _ctx: Ze }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Eu(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function wu(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === 'class')
        t.class !== r.class && (t.class = He([t.class, r.class]));
      else if (o === 'style') t.style = fn([t.style, r.style]);
      else if (eo(o)) {
        const s = t[o],
          i = r[o];
        i &&
          s !== i &&
          !(V(s) && s.includes(i)) &&
          (t[o] = s ? [].concat(s, i) : i);
      } else o !== '' && (t[o] = r[o]);
  }
  return t;
}
function rt(e, t, n, r = null) {
  st(e, t, 7, [n, r]);
}
function D1(e, t, n, r) {
  let o;
  const s = n && n[r];
  if (V(e) || Te(e)) {
    o = new Array(e.length);
    for (let i = 0, a = e.length; i < a; i++)
      o[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == 'number') {
    o = new Array(e);
    for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (Se(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (i, a) => t(i, a, void 0, s && s[a]));
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let a = 0, l = i.length; a < l; a++) {
        const c = i[a];
        o[a] = t(e[c], c, a, s && s[a]);
      }
    }
  else o = [];
  return n && (n[r] = o), o;
}
function gt(e, t, n = {}, r, o) {
  if (Ze.isCE)
    return je('slot', t === 'default' ? null : { name: t }, r && r());
  let s = e[t];
  s && s._c && (s._d = !1), Ae();
  const i = s && Tu(s(n)),
    a = Cn(
      Ke,
      { key: n.key || `_${t}` },
      i || (r ? r() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    !o && a.scopeId && (a.slotScopeIds = [a.scopeId + '-s']),
    s && s._c && (s._d = !0),
    a
  );
}
function Tu(e) {
  return e.some((t) =>
    hr(t) ? !(t.type === ut || (t.type === Ke && !Tu(t.children))) : !0
  )
    ? e
    : null;
}
const ps = (e) => (e ? (Su(e) ? ai(e) || e.proxy : ps(e.parent)) : null),
  Jr = Oe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ps(e.parent),
    $root: (e) => ps(e.root),
    $emit: (e) => e.emit,
    $options: (e) => uu(e),
    $forceUpdate: (e) => () => Yl(e.update),
    $nextTick: (e) => cr.bind(e.proxy),
    $watch: (e) => Hf.bind(e),
  }),
  bd = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: o,
        props: s,
        accessCache: i,
        type: a,
        appContext: l,
      } = e;
      let c;
      if (t[0] !== '$') {
        const v = i[t];
        if (v !== void 0)
          switch (v) {
            case 1:
              return r[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return s[t];
          }
        else {
          if (r !== _e && oe(r, t)) return (i[t] = 1), r[t];
          if (o !== _e && oe(o, t)) return (i[t] = 2), o[t];
          if ((c = e.propsOptions[0]) && oe(c, t)) return (i[t] = 3), s[t];
          if (n !== _e && oe(n, t)) return (i[t] = 4), n[t];
          cs && (i[t] = 0);
        }
      }
      const u = Jr[t];
      let d, h;
      if (u) return t === '$attrs' && et(e, 'get', t), u(e);
      if ((d = a.__cssModules) && (d = d[t])) return d;
      if (n !== _e && oe(n, t)) return (i[t] = 4), n[t];
      if (((h = l.config.globalProperties), oe(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: s } = e;
      return o !== _e && oe(o, t)
        ? ((o[t] = n), !0)
        : r !== _e && oe(r, t)
        ? ((r[t] = n), !0)
        : oe(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((s[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: o,
          propsOptions: s,
        },
      },
      i
    ) {
      let a;
      return (
        !!n[i] ||
        (e !== _e && oe(e, i)) ||
        (t !== _e && oe(t, i)) ||
        ((a = s[0]) && oe(a, i)) ||
        oe(r, i) ||
        oe(Jr, i) ||
        oe(o.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? this.set(e, t, n.get(), null)
          : n.value != null && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  },
  yd = mu();
let _d = 0;
function Ed(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || yd,
    s = {
      uid: _d++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new $l(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: fu(r, o),
      emitsOptions: tu(r, o),
      emit: null,
      emitted: null,
      propsDefaults: _e,
      inheritAttrs: r.inheritAttrs,
      ctx: _e,
      data: _e,
      props: _e,
      attrs: _e,
      slots: _e,
      refs: _e,
      setupState: _e,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
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
      sp: null,
    };
  return (
    (s.ctx = { _: s }),
    (s.root = t ? t.root : s),
    (s.emit = Mf.bind(null, s)),
    e.ce && e.ce(s),
    s
  );
}
let Re = null;
const kn = () => Re || Ze,
  On = (e) => {
    (Re = e), e.scope.on();
  },
  un = () => {
    Re && Re.scope.off(), (Re = null);
  };
function Su(e) {
  return e.vnode.shapeFlag & 4;
}
let mr = !1;
function wd(e, t = !1) {
  mr = t;
  const { props: n, children: r } = e.vnode,
    o = Su(e);
  rd(e, n, o, t), id(e, r);
  const s = o ? Td(e, t) : void 0;
  return (mr = !1), s;
}
function Td(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Rn(new Proxy(e.ctx, bd)));
  const { setup: r } = n;
  if (r) {
    const o = (e.setupContext = r.length > 1 ? Cd(e) : null);
    On(e), dn();
    const s = Rt(r, e, 0, [e.props, o]);
    if ((hn(), un(), Cl(s))) {
      if ((s.then(un, un), t))
        return s
          .then((i) => {
            Yi(e, i, t);
          })
          .catch((i) => {
            so(i, e, 0);
          });
      e.asyncDep = s;
    } else Yi(e, s, t);
  } else Cu(e, t);
}
function Yi(e, t, n) {
  X(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Se(t) && (e.setupState = ql(t)),
    Cu(e, n);
}
let Xi;
function Cu(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Xi && !r.render) {
      const o = r.template;
      if (o) {
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = r,
          c = Oe(Oe({ isCustomElement: s, delimiters: a }, i), l);
        r.render = Xi(o, c);
      }
    }
    e.render = r.render || ot;
  }
  On(e), dn(), Qf(e), hn(), un();
}
function Sd(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return et(e, 'get', '$attrs'), t[n];
    },
  });
}
function Cd(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Sd(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function ai(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(ql(Rn(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Jr) return Jr[n](e);
        },
      }))
    );
}
const Ad = /(?:^|[-_])(\w)/g,
  xd = (e) => e.replace(Ad, (t) => t.toUpperCase()).replace(/[-_]/g, '');
function Yr(e) {
  return (X(e) && e.displayName) || e.name;
}
function Au(e, t, n = !1) {
  let r = Yr(t);
  if (!r && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (r = o[1]);
  }
  if (!r && e && e.parent) {
    const o = (s) => {
      for (const i in s) if (s[i] === t) return i;
    };
    r =
      o(e.components || e.parent.type.components) || o(e.appContext.components);
  }
  return r ? xd(r) : n ? 'App' : 'Anonymous';
}
function Rd(e) {
  return X(e) && '__vccOpts' in e;
}
const he = (e, t) => Ef(e, t, mr);
function xu(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? Se(t) && !V(t)
      ? hr(t)
        ? je(e, null, [t])
        : je(e, t)
      : je(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && hr(n) && (n = [n]),
      je(e, t, n));
}
const $d = '3.2.31',
  Od = 'http://www.w3.org/2000/svg',
  rn = typeof document != 'undefined' ? document : null,
  Qi = rn && rn.createElement('template'),
  Pd = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o = t
        ? rn.createElementNS(Od, e)
        : rn.createElement(e, n ? { is: n } : void 0);
      return (
        e === 'select' &&
          r &&
          r.multiple != null &&
          o.setAttribute('multiple', r.multiple),
        o
      );
    },
    createText: (e) => rn.createTextNode(e),
    createComment: (e) => rn.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => rn.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return '_value' in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, n, r, o, s) {
      const i = n ? n.previousSibling : t.lastChild;
      if (o && (o === s || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === s || !(o = o.nextSibling));

        );
      else {
        Qi.innerHTML = r ? `<svg>${e}</svg>` : e;
        const a = Qi.content;
        if (r) {
          const l = a.firstChild;
          for (; l.firstChild; ) a.appendChild(l.firstChild);
          a.removeChild(l);
        }
        t.insertBefore(a, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Md(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
      ? e.setAttribute('class', t)
      : (e.className = t);
}
function Nd(e, t, n) {
  const r = e.style,
    o = Te(n);
  if (n && !o) {
    for (const s in n) ms(r, s, n[s]);
    if (t && !Te(t)) for (const s in t) n[s] == null && ms(r, s, '');
  } else {
    const s = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute('style'),
      '_vod' in e && (r.display = s);
  }
}
const Zi = /\s*!important$/;
function ms(e, t, n) {
  if (V(n)) n.forEach((r) => ms(e, t, r));
  else if (t.startsWith('--')) e.setProperty(t, n);
  else {
    const r = Id(e, t);
    Zi.test(n)
      ? e.setProperty(In(r), n.replace(Zi, ''), 'important')
      : (e[r] = n);
  }
}
const ea = ['Webkit', 'Moz', 'ms'],
  ko = {};
function Id(e, t) {
  const n = ko[t];
  if (n) return n;
  let r = lt(t);
  if (r !== 'filter' && r in e) return (ko[t] = r);
  r = ro(r);
  for (let o = 0; o < ea.length; o++) {
    const s = ea[o] + r;
    if (s in e) return (ko[t] = s);
  }
  return t;
}
const ta = 'http://www.w3.org/1999/xlink';
function kd(e, t, n, r, o) {
  if (r && t.startsWith('xlink:'))
    n == null
      ? e.removeAttributeNS(ta, t.slice(6, t.length))
      : e.setAttributeNS(ta, t, n);
  else {
    const s = Oc(t);
    n == null || (s && !El(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, s ? '' : n);
  }
}
function Ld(e, t, n, r, o, s, i) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && i(r, o, s), (e[t] = n == null ? '' : n);
    return;
  }
  if (t === 'value' && e.tagName !== 'PROGRESS' && !e.tagName.includes('-')) {
    e._value = n;
    const a = n == null ? '' : n;
    (e.value !== a || e.tagName === 'OPTION') && (e.value = a),
      n == null && e.removeAttribute(t);
    return;
  }
  if (n === '' || n == null) {
    const a = typeof e[t];
    if (a === 'boolean') {
      e[t] = El(n);
      return;
    } else if (n == null && a === 'string') {
      (e[t] = ''), e.removeAttribute(t);
      return;
    } else if (a === 'number') {
      try {
        e[t] = 0;
      } catch {}
      e.removeAttribute(t);
      return;
    }
  }
  try {
    e[t] = n;
  } catch {}
}
let Xr = Date.now,
  Ru = !1;
if (typeof window != 'undefined') {
  Xr() > document.createEvent('Event').timeStamp &&
    (Xr = () => performance.now());
  const e = navigator.userAgent.match(/firefox\/(\d+)/i);
  Ru = !!(e && Number(e[1]) <= 53);
}
let gs = 0;
const Dd = Promise.resolve(),
  Fd = () => {
    gs = 0;
  },
  Hd = () => gs || (Dd.then(Fd), (gs = Xr()));
function jd(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Bd(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Ud(e, t, n, r, o = null) {
  const s = e._vei || (e._vei = {}),
    i = s[t];
  if (r && i) i.value = r;
  else {
    const [a, l] = zd(t);
    if (r) {
      const c = (s[t] = Wd(r, o));
      jd(e, a, c, l);
    } else i && (Bd(e, a, i, l), (s[t] = void 0));
  }
}
const na = /(?:Once|Passive|Capture)$/;
function zd(e) {
  let t;
  if (na.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(na)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [In(e.slice(2)), t];
}
function Wd(e, t) {
  const n = (r) => {
    const o = r.timeStamp || Xr();
    (Ru || o >= n.attached - 1) && st(Kd(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = Hd()), n;
}
function Kd(e, t) {
  if (V(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    );
  } else return t;
}
const ra = /^on[a-z]/,
  Gd = (e, t, n, r, o = !1, s, i, a, l) => {
    t === 'class'
      ? Md(e, r, o)
      : t === 'style'
      ? Nd(e, n, r)
      : eo(t)
      ? Fs(t) || Ud(e, t, n, r, i)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : qd(e, t, r, o)
        )
      ? Ld(e, t, r, s, i, a, l)
      : (t === 'true-value'
          ? (e._trueValue = r)
          : t === 'false-value' && (e._falseValue = r),
        kd(e, t, r, o));
  };
function qd(e, t, n, r) {
  return r
    ? !!(
        t === 'innerHTML' ||
        t === 'textContent' ||
        (t in e && ra.test(t) && X(n))
      )
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (ra.test(t) && Te(n))
    ? !1
    : t in e;
}
const It = 'transition',
  Wn = 'animation',
  $u = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  Vd = Oe({}, Bf.props, $u),
  Yt = (e, t = []) => {
    V(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  oa = (e) => (e ? (V(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Jd(e) {
  const t = {};
  for (const j in e) j in $u || (t[j] = e[j]);
  if (e.css === !1) return t;
  const {
      name: n = 'v',
      type: r,
      duration: o,
      enterFromClass: s = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: a = `${n}-enter-to`,
      appearFromClass: l = s,
      appearActiveClass: c = i,
      appearToClass: u = a,
      leaveFromClass: d = `${n}-leave-from`,
      leaveActiveClass: h = `${n}-leave-active`,
      leaveToClass: v = `${n}-leave-to`,
    } = e,
    C = Yd(o),
    L = C && C[0],
    w = C && C[1],
    {
      onBeforeEnter: S,
      onEnter: y,
      onEnterCancelled: M,
      onLeave: A,
      onLeaveCancelled: K,
      onBeforeAppear: I = S,
      onAppear: P = y,
      onAppearCancelled: Y = M,
    } = t,
    Q = (j, Z, ie) => {
      tn(j, Z ? u : a), tn(j, Z ? c : i), ie && ie();
    },
    se = (j, Z) => {
      tn(j, v), tn(j, h), Z && Z();
    },
    ve = (j) => (Z, ie) => {
      const qe = j ? P : y,
        Ee = () => Q(Z, j, ie);
      Yt(qe, [Z, Ee]),
        sa(() => {
          tn(Z, j ? l : s), Ct(Z, j ? u : a), oa(qe) || ia(Z, r, L, Ee);
        });
    };
  return Oe(t, {
    onBeforeEnter(j) {
      Yt(S, [j]), Ct(j, s), Ct(j, i);
    },
    onBeforeAppear(j) {
      Yt(I, [j]), Ct(j, l), Ct(j, c);
    },
    onEnter: ve(!1),
    onAppear: ve(!0),
    onLeave(j, Z) {
      const ie = () => se(j, Z);
      Ct(j, d),
        Pu(),
        Ct(j, h),
        sa(() => {
          tn(j, d), Ct(j, v), oa(A) || ia(j, r, w, ie);
        }),
        Yt(A, [j, ie]);
    },
    onEnterCancelled(j) {
      Q(j, !1), Yt(M, [j]);
    },
    onAppearCancelled(j) {
      Q(j, !0), Yt(Y, [j]);
    },
    onLeaveCancelled(j) {
      se(j), Yt(K, [j]);
    },
  });
}
function Yd(e) {
  if (e == null) return null;
  if (Se(e)) return [Lo(e.enter), Lo(e.leave)];
  {
    const t = Lo(e);
    return [t, t];
  }
}
function Lo(e) {
  return Rl(e);
}
function Ct(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function tn(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function sa(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Xd = 0;
function ia(e, t, n, r) {
  const o = (e._endId = ++Xd),
    s = () => {
      o === e._endId && r();
    };
  if (n) return setTimeout(s, n);
  const { type: i, timeout: a, propCount: l } = Ou(e, t);
  if (!i) return r();
  const c = i + 'end';
  let u = 0;
  const d = () => {
      e.removeEventListener(c, h), s();
    },
    h = (v) => {
      v.target === e && ++u >= l && d();
    };
  setTimeout(() => {
    u < l && d();
  }, a + 1),
    e.addEventListener(c, h);
}
function Ou(e, t) {
  const n = window.getComputedStyle(e),
    r = (C) => (n[C] || '').split(', '),
    o = r(It + 'Delay'),
    s = r(It + 'Duration'),
    i = aa(o, s),
    a = r(Wn + 'Delay'),
    l = r(Wn + 'Duration'),
    c = aa(a, l);
  let u = null,
    d = 0,
    h = 0;
  t === It
    ? i > 0 && ((u = It), (d = i), (h = s.length))
    : t === Wn
    ? c > 0 && ((u = Wn), (d = c), (h = l.length))
    : ((d = Math.max(i, c)),
      (u = d > 0 ? (i > c ? It : Wn) : null),
      (h = u ? (u === It ? s.length : l.length) : 0));
  const v = u === It && /\b(transform|all)(,|$)/.test(n[It + 'Property']);
  return { type: u, timeout: d, propCount: h, hasTransform: v };
}
function aa(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => la(n) + la(e[r])));
}
function la(e) {
  return Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function Pu() {
  return document.body.offsetHeight;
}
const Mu = new WeakMap(),
  Nu = new WeakMap(),
  Qd = {
    name: 'TransitionGroup',
    props: Oe({}, Vd, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const n = kn(),
        r = su();
      let o, s;
      return (
        ei(() => {
          if (!o.length) return;
          const i = e.moveClass || `${e.name || 'v'}-move`;
          if (!nh(o[0].el, n.vnode.el, i)) return;
          o.forEach(Zd), o.forEach(eh);
          const a = o.filter(th);
          Pu(),
            a.forEach((l) => {
              const c = l.el,
                u = c.style;
              Ct(c, i),
                (u.transform = u.webkitTransform = u.transitionDuration = '');
              const d = (c._moveCb = (h) => {
                (h && h.target !== c) ||
                  ((!h || /transform$/.test(h.propertyName)) &&
                    (c.removeEventListener('transitionend', d),
                    (c._moveCb = null),
                    tn(c, i)));
              });
              c.addEventListener('transitionend', d);
            });
        }),
        () => {
          const i = ne(e),
            a = Jd(i);
          let l = i.tag || Ke;
          (o = s), (s = t.default ? Qs(t.default()) : []);
          for (let c = 0; c < s.length; c++) {
            const u = s[c];
            u.key != null && $n(u, dr(u, a, r, n));
          }
          if (o)
            for (let c = 0; c < o.length; c++) {
              const u = o[c];
              $n(u, dr(u, a, r, n)), Mu.set(u, u.el.getBoundingClientRect());
            }
          return je(l, null, s);
        }
      );
    },
  },
  F1 = Qd;
function Zd(e) {
  const t = e.el;
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function eh(e) {
  Nu.set(e, e.el.getBoundingClientRect());
}
function th(e) {
  const t = Mu.get(e),
    n = Nu.get(e),
    r = t.left - n.left,
    o = t.top - n.top;
  if (r || o) {
    const s = e.el.style;
    return (
      (s.transform = s.webkitTransform = `translate(${r}px,${o}px)`),
      (s.transitionDuration = '0s'),
      e
    );
  }
}
function nh(e, t, n) {
  const r = e.cloneNode();
  e._vtc &&
    e._vtc.forEach((i) => {
      i.split(/\s+/).forEach((a) => a && r.classList.remove(a));
    }),
    n.split(/\s+/).forEach((i) => i && r.classList.add(i)),
    (r.style.display = 'none');
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(r);
  const { hasTransform: s } = Ou(r);
  return o.removeChild(r), s;
}
const rh = Oe({ patchProp: Gd }, Pd);
let ua;
function oh() {
  return ua || (ua = cd(rh));
}
const H1 = (...e) => {
  const t = oh().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const o = sh(r);
      if (!o) return;
      const s = t._component;
      !X(s) && !s.render && !s.template && (s.template = o.innerHTML),
        (o.innerHTML = '');
      const i = n(o, !1, o instanceof SVGElement);
      return (
        o instanceof Element &&
          (o.removeAttribute('v-cloak'), o.setAttribute('data-v-app', '')),
        i
      );
    }),
    t
  );
};
function sh(e) {
  return Te(e) ? document.querySelector(e) : e;
}
/*!
 * vue-router v4.0.12
 * (c) 2021 Eduardo San Martin Morote
 * @license MIT
 */ const Iu =
    typeof Symbol == 'function' && typeof Symbol.toStringTag == 'symbol',
  Ln = (e) => (Iu ? Symbol(e) : '_vr_' + e),
  ih = Ln('rvlm'),
  ca = Ln('rvd'),
  co = Ln('r'),
  li = Ln('rl'),
  vs = Ln('rvl'),
  Sn = typeof window != 'undefined';
function ah(e) {
  return e.__esModule || (Iu && e[Symbol.toStringTag] === 'Module');
}
const ye = Object.assign;
function Do(e, t) {
  const n = {};
  for (const r in t) {
    const o = t[r];
    n[r] = Array.isArray(o) ? o.map(e) : e(o);
  }
  return n;
}
const or = () => {},
  lh = /\/$/,
  uh = (e) => e.replace(lh, '');
function Fo(e, t, n = '/') {
  let r,
    o = {},
    s = '',
    i = '';
  const a = t.indexOf('?'),
    l = t.indexOf('#', a > -1 ? a : 0);
  return (
    a > -1 &&
      ((r = t.slice(0, a)),
      (s = t.slice(a + 1, l > -1 ? l : t.length)),
      (o = e(s))),
    l > -1 && ((r = r || t.slice(0, l)), (i = t.slice(l, t.length))),
    (r = hh(r != null ? r : t, n)),
    { fullPath: r + (s && '?') + s + i, path: r, query: o, hash: i }
  );
}
function ch(e, t) {
  const n = t.query ? e(t.query) : '';
  return t.path + (n && '?') + n + (t.hash || '');
}
function fa(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || '/';
}
function fh(e, t, n) {
  const r = t.matched.length - 1,
    o = n.matched.length - 1;
  return (
    r > -1 &&
    r === o &&
    Pn(t.matched[r], n.matched[o]) &&
    ku(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function Pn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ku(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!dh(e[n], t[n])) return !1;
  return !0;
}
function dh(e, t) {
  return Array.isArray(e) ? da(e, t) : Array.isArray(t) ? da(t, e) : e === t;
}
function da(e, t) {
  return Array.isArray(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function hh(e, t) {
  if (e.startsWith('/')) return e;
  if (!e) return t;
  const n = t.split('/'),
    r = e.split('/');
  let o = n.length - 1,
    s,
    i;
  for (s = 0; s < r.length; s++)
    if (((i = r[s]), !(o === 1 || i === '.')))
      if (i === '..') o--;
      else break;
  return (
    n.slice(0, o).join('/') +
    '/' +
    r.slice(s - (s === r.length ? 1 : 0)).join('/')
  );
}
var gr;
(function (e) {
  (e.pop = 'pop'), (e.push = 'push');
})(gr || (gr = {}));
var sr;
(function (e) {
  (e.back = 'back'), (e.forward = 'forward'), (e.unknown = '');
})(sr || (sr = {}));
function ph(e) {
  if (!e)
    if (Sn) {
      const t = document.querySelector('base');
      (e = (t && t.getAttribute('href')) || '/'),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ''));
    } else e = '/';
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), uh(e);
}
const mh = /^[^#]+#/;
function gh(e, t) {
  return e.replace(mh, '#') + t;
}
function vh(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const fo = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function bh(e) {
  let t;
  if ('el' in e) {
    const n = e.el,
      r = typeof n == 'string' && n.startsWith('#'),
      o =
        typeof n == 'string'
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!o) return;
    t = vh(o, e);
  } else t = e;
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function ha(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const bs = new Map();
function yh(e, t) {
  bs.set(e, t);
}
function _h(e) {
  const t = bs.get(e);
  return bs.delete(e), t;
}
let Eh = () => location.protocol + '//' + location.host;
function Lu(e, t) {
  const { pathname: n, search: r, hash: o } = t,
    s = e.indexOf('#');
  if (s > -1) {
    let a = o.includes(e.slice(s)) ? e.slice(s).length : 1,
      l = o.slice(a);
    return l[0] !== '/' && (l = '/' + l), fa(l, '');
  }
  return fa(n, e) + r + o;
}
function wh(e, t, n, r) {
  let o = [],
    s = [],
    i = null;
  const a = ({ state: h }) => {
    const v = Lu(e, location),
      C = n.value,
      L = t.value;
    let w = 0;
    if (h) {
      if (((n.value = v), (t.value = h), i && i === C)) {
        i = null;
        return;
      }
      w = L ? h.position - L.position : 0;
    } else r(v);
    o.forEach((S) => {
      S(n.value, C, {
        delta: w,
        type: gr.pop,
        direction: w ? (w > 0 ? sr.forward : sr.back) : sr.unknown,
      });
    });
  };
  function l() {
    i = n.value;
  }
  function c(h) {
    o.push(h);
    const v = () => {
      const C = o.indexOf(h);
      C > -1 && o.splice(C, 1);
    };
    return s.push(v), v;
  }
  function u() {
    const { history: h } = window;
    !h.state || h.replaceState(ye({}, h.state, { scroll: fo() }), '');
  }
  function d() {
    for (const h of s) h();
    (s = []),
      window.removeEventListener('popstate', a),
      window.removeEventListener('beforeunload', u);
  }
  return (
    window.addEventListener('popstate', a),
    window.addEventListener('beforeunload', u),
    { pauseListeners: l, listen: c, destroy: d }
  );
}
function pa(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? fo() : null,
  };
}
function Th(e) {
  const { history: t, location: n } = window,
    r = { value: Lu(e, n) },
    o = { value: t.state };
  o.value ||
    s(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function s(l, c, u) {
    const d = e.indexOf('#'),
      h =
        d > -1
          ? (n.host && document.querySelector('base') ? e : e.slice(d)) + l
          : Eh() + e + l;
    try {
      t[u ? 'replaceState' : 'pushState'](c, '', h), (o.value = c);
    } catch (v) {
      console.error(v), n[u ? 'replace' : 'assign'](h);
    }
  }
  function i(l, c) {
    const u = ye({}, t.state, pa(o.value.back, l, o.value.forward, !0), c, {
      position: o.value.position,
    });
    s(l, u, !0), (r.value = l);
  }
  function a(l, c) {
    const u = ye({}, o.value, t.state, { forward: l, scroll: fo() });
    s(u.current, u, !0);
    const d = ye({}, pa(r.value, l, null), { position: u.position + 1 }, c);
    s(l, d, !1), (r.value = l);
  }
  return { location: r, state: o, push: a, replace: i };
}
function Sh(e) {
  e = ph(e);
  const t = Th(e),
    n = wh(e, t.state, t.location, t.replace);
  function r(s, i = !0) {
    i || n.pauseListeners(), history.go(s);
  }
  const o = ye(
    { location: '', base: e, go: r, createHref: gh.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(o, 'location', {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(o, 'state', {
      enumerable: !0,
      get: () => t.state.value,
    }),
    o
  );
}
function j1(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ''),
    e.includes('#') || (e += '#'),
    Sh(e)
  );
}
function Ch(e) {
  return typeof e == 'string' || (e && typeof e == 'object');
}
function Du(e) {
  return typeof e == 'string' || typeof e == 'symbol';
}
const kt = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Fu = Ln('nf');
var ma;
(function (e) {
  (e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated');
})(ma || (ma = {}));
function Mn(e, t) {
  return ye(new Error(), { type: e, [Fu]: !0 }, t);
}
function Xt(e, t) {
  return e instanceof Error && Fu in e && (t == null || !!(e.type & t));
}
const ga = '[^/]+?',
  Ah = { sensitive: !1, strict: !1, start: !0, end: !0 },
  xh = /[.+*?^${}()[\]/\\]/g;
function Rh(e, t) {
  const n = ye({}, Ah, t),
    r = [];
  let o = n.start ? '^' : '';
  const s = [];
  for (const c of e) {
    const u = c.length ? [] : [90];
    n.strict && !c.length && (o += '/');
    for (let d = 0; d < c.length; d++) {
      const h = c[d];
      let v = 40 + (n.sensitive ? 0.25 : 0);
      if (h.type === 0)
        d || (o += '/'), (o += h.value.replace(xh, '\\$&')), (v += 40);
      else if (h.type === 1) {
        const { value: C, repeatable: L, optional: w, regexp: S } = h;
        s.push({ name: C, repeatable: L, optional: w });
        const y = S || ga;
        if (y !== ga) {
          v += 10;
          try {
            new RegExp(`(${y})`);
          } catch (A) {
            throw new Error(
              `Invalid custom RegExp for param "${C}" (${y}): ` + A.message
            );
          }
        }
        let M = L ? `((?:${y})(?:/(?:${y}))*)` : `(${y})`;
        d || (M = w && c.length < 2 ? `(?:/${M})` : '/' + M),
          w && (M += '?'),
          (o += M),
          (v += 20),
          w && (v += -8),
          L && (v += -20),
          y === '.*' && (v += -50);
      }
      u.push(v);
    }
    r.push(u);
  }
  if (n.strict && n.end) {
    const c = r.length - 1;
    r[c][r[c].length - 1] += 0.7000000000000001;
  }
  n.strict || (o += '/?'), n.end ? (o += '$') : n.strict && (o += '(?:/|$)');
  const i = new RegExp(o, n.sensitive ? '' : 'i');
  function a(c) {
    const u = c.match(i),
      d = {};
    if (!u) return null;
    for (let h = 1; h < u.length; h++) {
      const v = u[h] || '',
        C = s[h - 1];
      d[C.name] = v && C.repeatable ? v.split('/') : v;
    }
    return d;
  }
  function l(c) {
    let u = '',
      d = !1;
    for (const h of e) {
      (!d || !u.endsWith('/')) && (u += '/'), (d = !1);
      for (const v of h)
        if (v.type === 0) u += v.value;
        else if (v.type === 1) {
          const { value: C, repeatable: L, optional: w } = v,
            S = C in c ? c[C] : '';
          if (Array.isArray(S) && !L)
            throw new Error(
              `Provided param "${C}" is an array but it is not repeatable (* or + modifiers)`
            );
          const y = Array.isArray(S) ? S.join('/') : S;
          if (!y)
            if (w)
              h.length < 2 &&
                (u.endsWith('/') ? (u = u.slice(0, -1)) : (d = !0));
            else throw new Error(`Missing required param "${C}"`);
          u += y;
        }
    }
    return u;
  }
  return { re: i, score: r, keys: s, parse: a, stringify: l };
}
function $h(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Oh(e, t) {
  let n = 0;
  const r = e.score,
    o = t.score;
  for (; n < r.length && n < o.length; ) {
    const s = $h(r[n], o[n]);
    if (s) return s;
    n++;
  }
  return o.length - r.length;
}
const Ph = { type: 0, value: '' },
  Mh = /[a-zA-Z0-9_]/;
function Nh(e) {
  if (!e) return [[]];
  if (e === '/') return [[Ph]];
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
  function t(v) {
    throw new Error(`ERR (${n})/"${c}": ${v}`);
  }
  let n = 0,
    r = n;
  const o = [];
  let s;
  function i() {
    s && o.push(s), (s = []);
  }
  let a = 0,
    l,
    c = '',
    u = '';
  function d() {
    !c ||
      (n === 0
        ? s.push({ type: 0, value: c })
        : n === 1 || n === 2 || n === 3
        ? (s.length > 1 &&
            (l === '*' || l === '+') &&
            t(
              `A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`
            ),
          s.push({
            type: 1,
            value: c,
            regexp: u,
            repeatable: l === '*' || l === '+',
            optional: l === '*' || l === '?',
          }))
        : t('Invalid state to consume buffer'),
      (c = ''));
  }
  function h() {
    c += l;
  }
  for (; a < e.length; ) {
    if (((l = e[a++]), l === '\\' && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        l === '/' ? (c && d(), i()) : l === ':' ? (d(), (n = 1)) : h();
        break;
      case 4:
        h(), (n = r);
        break;
      case 1:
        l === '('
          ? (n = 2)
          : Mh.test(l)
          ? h()
          : (d(), (n = 0), l !== '*' && l !== '?' && l !== '+' && a--);
        break;
      case 2:
        l === ')'
          ? u[u.length - 1] == '\\'
            ? (u = u.slice(0, -1) + l)
            : (n = 3)
          : (u += l);
        break;
      case 3:
        d(), (n = 0), l !== '*' && l !== '?' && l !== '+' && a--, (u = '');
        break;
      default:
        t('Unknown state');
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), d(), i(), o;
}
function Ih(e, t, n) {
  const r = Rh(Nh(e.path), n),
    o = ye(r, { record: e, parent: t, children: [], alias: [] });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function kh(e, t) {
  const n = [],
    r = new Map();
  t = ba({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(u) {
    return r.get(u);
  }
  function s(u, d, h) {
    const v = !h,
      C = Dh(u);
    C.aliasOf = h && h.record;
    const L = ba(t, u),
      w = [C];
    if ('alias' in u) {
      const M = typeof u.alias == 'string' ? [u.alias] : u.alias;
      for (const A of M)
        w.push(
          ye({}, C, {
            components: h ? h.record.components : C.components,
            path: A,
            aliasOf: h ? h.record : C,
          })
        );
    }
    let S, y;
    for (const M of w) {
      const { path: A } = M;
      if (d && A[0] !== '/') {
        const K = d.record.path,
          I = K[K.length - 1] === '/' ? '' : '/';
        M.path = d.record.path + (A && I + A);
      }
      if (
        ((S = Ih(M, d, L)),
        h
          ? h.alias.push(S)
          : ((y = y || S),
            y !== S && y.alias.push(S),
            v && u.name && !va(S) && i(u.name)),
        'children' in C)
      ) {
        const K = C.children;
        for (let I = 0; I < K.length; I++) s(K[I], S, h && h.children[I]);
      }
      (h = h || S), l(S);
    }
    return y
      ? () => {
          i(y);
        }
      : or;
  }
  function i(u) {
    if (Du(u)) {
      const d = r.get(u);
      d &&
        (r.delete(u),
        n.splice(n.indexOf(d), 1),
        d.children.forEach(i),
        d.alias.forEach(i));
    } else {
      const d = n.indexOf(u);
      d > -1 &&
        (n.splice(d, 1),
        u.record.name && r.delete(u.record.name),
        u.children.forEach(i),
        u.alias.forEach(i));
    }
  }
  function a() {
    return n;
  }
  function l(u) {
    let d = 0;
    for (; d < n.length && Oh(u, n[d]) >= 0; ) d++;
    n.splice(d, 0, u), u.record.name && !va(u) && r.set(u.record.name, u);
  }
  function c(u, d) {
    let h,
      v = {},
      C,
      L;
    if ('name' in u && u.name) {
      if (((h = r.get(u.name)), !h)) throw Mn(1, { location: u });
      (L = h.record.name),
        (v = ye(
          Lh(
            d.params,
            h.keys.filter((y) => !y.optional).map((y) => y.name)
          ),
          u.params
        )),
        (C = h.stringify(v));
    } else if ('path' in u)
      (C = u.path),
        (h = n.find((y) => y.re.test(C))),
        h && ((v = h.parse(C)), (L = h.record.name));
    else {
      if (((h = d.name ? r.get(d.name) : n.find((y) => y.re.test(d.path))), !h))
        throw Mn(1, { location: u, currentLocation: d });
      (L = h.record.name),
        (v = ye({}, d.params, u.params)),
        (C = h.stringify(v));
    }
    const w = [];
    let S = h;
    for (; S; ) w.unshift(S.record), (S = S.parent);
    return { name: L, path: C, params: v, matched: w, meta: Hh(w) };
  }
  return (
    e.forEach((u) => s(u)),
    {
      addRoute: s,
      resolve: c,
      removeRoute: i,
      getRoutes: a,
      getRecordMatcher: o,
    }
  );
}
function Lh(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function Dh(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Fh(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in e ? e.components || {} : { default: e.component },
  };
}
function Fh(e) {
  const t = {},
    n = e.props || !1;
  if ('component' in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == 'boolean' ? n : n[r];
  return t;
}
function va(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Hh(e) {
  return e.reduce((t, n) => ye(t, n.meta), {});
}
function ba(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
const Hu = /#/g,
  jh = /&/g,
  Bh = /\//g,
  Uh = /=/g,
  zh = /\?/g,
  ju = /\+/g,
  Wh = /%5B/g,
  Kh = /%5D/g,
  Bu = /%5E/g,
  Gh = /%60/g,
  Uu = /%7B/g,
  qh = /%7C/g,
  zu = /%7D/g,
  Vh = /%20/g;
function ui(e) {
  return encodeURI('' + e)
    .replace(qh, '|')
    .replace(Wh, '[')
    .replace(Kh, ']');
}
function Jh(e) {
  return ui(e).replace(Uu, '{').replace(zu, '}').replace(Bu, '^');
}
function ys(e) {
  return ui(e)
    .replace(ju, '%2B')
    .replace(Vh, '+')
    .replace(Hu, '%23')
    .replace(jh, '%26')
    .replace(Gh, '`')
    .replace(Uu, '{')
    .replace(zu, '}')
    .replace(Bu, '^');
}
function Yh(e) {
  return ys(e).replace(Uh, '%3D');
}
function Xh(e) {
  return ui(e).replace(Hu, '%23').replace(zh, '%3F');
}
function Qh(e) {
  return e == null ? '' : Xh(e).replace(Bh, '%2F');
}
function Qr(e) {
  try {
    return decodeURIComponent('' + e);
  } catch {}
  return '' + e;
}
function Zh(e) {
  const t = {};
  if (e === '' || e === '?') return t;
  const r = (e[0] === '?' ? e.slice(1) : e).split('&');
  for (let o = 0; o < r.length; ++o) {
    const s = r[o].replace(ju, ' '),
      i = s.indexOf('='),
      a = Qr(i < 0 ? s : s.slice(0, i)),
      l = i < 0 ? null : Qr(s.slice(i + 1));
    if (a in t) {
      let c = t[a];
      Array.isArray(c) || (c = t[a] = [c]), c.push(l);
    } else t[a] = l;
  }
  return t;
}
function ya(e) {
  let t = '';
  for (let n in e) {
    const r = e[n];
    if (((n = Yh(n)), r == null)) {
      r !== void 0 && (t += (t.length ? '&' : '') + n);
      continue;
    }
    (Array.isArray(r) ? r.map((s) => s && ys(s)) : [r && ys(r)]).forEach(
      (s) => {
        s !== void 0 &&
          ((t += (t.length ? '&' : '') + n), s != null && (t += '=' + s));
      }
    );
  }
  return t;
}
function ep(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Array.isArray(r)
        ? r.map((o) => (o == null ? null : '' + o))
        : r == null
        ? r
        : '' + r);
  }
  return t;
}
function Kn() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const o = e.indexOf(r);
        o > -1 && e.splice(o, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function Ht(e, t, n, r, o) {
  const s = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
  return () =>
    new Promise((i, a) => {
      const l = (d) => {
          d === !1
            ? a(Mn(4, { from: n, to: t }))
            : d instanceof Error
            ? a(d)
            : Ch(d)
            ? a(Mn(2, { from: t, to: d }))
            : (s &&
                r.enterCallbacks[o] === s &&
                typeof d == 'function' &&
                s.push(d),
              i());
        },
        c = e.call(r && r.instances[o], t, n, l);
      let u = Promise.resolve(c);
      e.length < 3 && (u = u.then(l)), u.catch((d) => a(d));
    });
}
function Ho(e, t, n, r) {
  const o = [];
  for (const s of e)
    for (const i in s.components) {
      let a = s.components[i];
      if (!(t !== 'beforeRouteEnter' && !s.instances[i]))
        if (tp(a)) {
          const c = (a.__vccOpts || a)[t];
          c && o.push(Ht(c, n, r, s, i));
        } else {
          let l = a();
          o.push(() =>
            l.then((c) => {
              if (!c)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${s.path}"`)
                );
              const u = ah(c) ? c.default : c;
              s.components[i] = u;
              const h = (u.__vccOpts || u)[t];
              return h && Ht(h, n, r, s, i)();
            })
          );
        }
    }
  return o;
}
function tp(e) {
  return (
    typeof e == 'object' ||
    'displayName' in e ||
    'props' in e ||
    '__vccOpts' in e
  );
}
function _a(e) {
  const t = $e(co),
    n = $e(li),
    r = he(() => t.resolve(xe(e.to))),
    o = he(() => {
      const { matched: l } = r.value,
        { length: c } = l,
        u = l[c - 1],
        d = n.matched;
      if (!u || !d.length) return -1;
      const h = d.findIndex(Pn.bind(null, u));
      if (h > -1) return h;
      const v = Ea(l[c - 2]);
      return c > 1 && Ea(u) === v && d[d.length - 1].path !== v
        ? d.findIndex(Pn.bind(null, l[c - 2]))
        : h;
    }),
    s = he(() => o.value > -1 && sp(n.params, r.value.params)),
    i = he(
      () =>
        o.value > -1 &&
        o.value === n.matched.length - 1 &&
        ku(n.params, r.value.params)
    );
  function a(l = {}) {
    return op(l)
      ? t[xe(e.replace) ? 'replace' : 'push'](xe(e.to)).catch(or)
      : Promise.resolve();
  }
  return {
    route: r,
    href: he(() => r.value.href),
    isActive: s,
    isExactActive: i,
    navigate: a,
  };
}
const np = vt({
    name: 'RouterLink',
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' },
    },
    useLink: _a,
    setup(e, { slots: t }) {
      const n = pn(_a(e)),
        { options: r } = $e(co),
        o = he(() => ({
          [wa(e.activeClass, r.linkActiveClass, 'router-link-active')]:
            n.isActive,
          [wa(
            e.exactActiveClass,
            r.linkExactActiveClass,
            'router-link-exact-active'
          )]: n.isExactActive,
        }));
      return () => {
        const s = t.default && t.default(n);
        return e.custom
          ? s
          : xu(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value,
              },
              s
            );
      };
    },
  }),
  rp = np;
function op(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function sp(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n];
    if (typeof r == 'string') {
      if (r !== o) return !1;
    } else if (
      !Array.isArray(o) ||
      o.length !== r.length ||
      r.some((s, i) => s !== o[i])
    )
      return !1;
  }
  return !0;
}
function Ea(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
const wa = (e, t, n) => (e != null ? e : t != null ? t : n),
  ip = vt({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    setup(e, { attrs: t, slots: n }) {
      const r = $e(vs),
        o = he(() => e.route || r.value),
        s = $e(ca, 0),
        i = he(() => o.value.matched[s]);
      nr(ca, s + 1), nr(ih, i), nr(vs, o);
      const a = Pt();
      return (
        zt(
          () => [a.value, i.value, e.name],
          ([l, c, u], [d, h, v]) => {
            c &&
              ((c.instances[u] = l),
              h &&
                h !== c &&
                l &&
                l === d &&
                (c.leaveGuards.size || (c.leaveGuards = h.leaveGuards),
                c.updateGuards.size || (c.updateGuards = h.updateGuards))),
              l &&
                c &&
                (!h || !Pn(c, h) || !d) &&
                (c.enterCallbacks[u] || []).forEach((C) => C(l));
          },
          { flush: 'post' }
        ),
        () => {
          const l = o.value,
            c = i.value,
            u = c && c.components[e.name],
            d = e.name;
          if (!u) return Ta(n.default, { Component: u, route: l });
          const h = c.props[e.name],
            v = h
              ? h === !0
                ? l.params
                : typeof h == 'function'
                ? h(l)
                : h
              : null,
            L = xu(
              u,
              ye({}, v, t, {
                onVnodeUnmounted: (w) => {
                  w.component.isUnmounted && (c.instances[d] = null);
                },
                ref: a,
              })
            );
          return Ta(n.default, { Component: L, route: l }) || L;
        }
      );
    },
  });
function Ta(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const ap = ip;
function B1(e) {
  const t = kh(e.routes, e),
    n = e.parseQuery || Zh,
    r = e.stringifyQuery || ya,
    o = e.history,
    s = Kn(),
    i = Kn(),
    a = Kn(),
    l = mf(kt);
  let c = kt;
  Sn &&
    e.scrollBehavior &&
    'scrollRestoration' in history &&
    (history.scrollRestoration = 'manual');
  const u = Do.bind(null, (b) => '' + b),
    d = Do.bind(null, Qh),
    h = Do.bind(null, Qr);
  function v(b, D) {
    let N, B;
    return (
      Du(b) ? ((N = t.getRecordMatcher(b)), (B = D)) : (B = b), t.addRoute(B, N)
    );
  }
  function C(b) {
    const D = t.getRecordMatcher(b);
    D && t.removeRoute(D);
  }
  function L() {
    return t.getRoutes().map((b) => b.record);
  }
  function w(b) {
    return !!t.getRecordMatcher(b);
  }
  function S(b, D) {
    if (((D = ye({}, D || l.value)), typeof b == 'string')) {
      const q = Fo(n, b, D.path),
        f = t.resolve({ path: q.path }, D),
        p = o.createHref(q.fullPath);
      return ye(q, f, {
        params: h(f.params),
        hash: Qr(q.hash),
        redirectedFrom: void 0,
        href: p,
      });
    }
    let N;
    if ('path' in b) N = ye({}, b, { path: Fo(n, b.path, D.path).path });
    else {
      const q = ye({}, b.params);
      for (const f in q) q[f] == null && delete q[f];
      (N = ye({}, b, { params: d(b.params) })), (D.params = d(D.params));
    }
    const B = t.resolve(N, D),
      ae = b.hash || '';
    B.params = u(h(B.params));
    const de = ch(r, ye({}, b, { hash: Jh(ae), path: B.path })),
      J = o.createHref(de);
    return ye(
      { fullPath: de, hash: ae, query: r === ya ? ep(b.query) : b.query || {} },
      B,
      { redirectedFrom: void 0, href: J }
    );
  }
  function y(b) {
    return typeof b == 'string' ? Fo(n, b, l.value.path) : ye({}, b);
  }
  function M(b, D) {
    if (c !== b) return Mn(8, { from: D, to: b });
  }
  function A(b) {
    return P(b);
  }
  function K(b) {
    return A(ye(y(b), { replace: !0 }));
  }
  function I(b) {
    const D = b.matched[b.matched.length - 1];
    if (D && D.redirect) {
      const { redirect: N } = D;
      let B = typeof N == 'function' ? N(b) : N;
      return (
        typeof B == 'string' &&
          ((B = B.includes('?') || B.includes('#') ? (B = y(B)) : { path: B }),
          (B.params = {})),
        ye({ query: b.query, hash: b.hash, params: b.params }, B)
      );
    }
  }
  function P(b, D) {
    const N = (c = S(b)),
      B = l.value,
      ae = b.state,
      de = b.force,
      J = b.replace === !0,
      q = I(N);
    if (q) return P(ye(y(q), { state: ae, force: de, replace: J }), D || N);
    const f = N;
    f.redirectedFrom = D;
    let p;
    return (
      !de &&
        fh(r, B, N) &&
        ((p = Mn(16, { to: f, from: B })), ft(B, B, !0, !1)),
      (p ? Promise.resolve(p) : Q(f, B))
        .catch((g) => (Xt(g) ? g : pe(g, f, B)))
        .then((g) => {
          if (g) {
            if (Xt(g, 2))
              return P(
                ye(y(g.to), { state: ae, force: de, replace: J }),
                D || f
              );
          } else g = ve(f, B, !0, J, ae);
          return se(f, B, g), g;
        })
    );
  }
  function Y(b, D) {
    const N = M(b, D);
    return N ? Promise.reject(N) : Promise.resolve();
  }
  function Q(b, D) {
    let N;
    const [B, ae, de] = lp(b, D);
    N = Ho(B.reverse(), 'beforeRouteLeave', b, D);
    for (const q of B)
      q.leaveGuards.forEach((f) => {
        N.push(Ht(f, b, D));
      });
    const J = Y.bind(null, b, D);
    return (
      N.push(J),
      vn(N)
        .then(() => {
          N = [];
          for (const q of s.list()) N.push(Ht(q, b, D));
          return N.push(J), vn(N);
        })
        .then(() => {
          N = Ho(ae, 'beforeRouteUpdate', b, D);
          for (const q of ae)
            q.updateGuards.forEach((f) => {
              N.push(Ht(f, b, D));
            });
          return N.push(J), vn(N);
        })
        .then(() => {
          N = [];
          for (const q of b.matched)
            if (q.beforeEnter && !D.matched.includes(q))
              if (Array.isArray(q.beforeEnter))
                for (const f of q.beforeEnter) N.push(Ht(f, b, D));
              else N.push(Ht(q.beforeEnter, b, D));
          return N.push(J), vn(N);
        })
        .then(
          () => (
            b.matched.forEach((q) => (q.enterCallbacks = {})),
            (N = Ho(de, 'beforeRouteEnter', b, D)),
            N.push(J),
            vn(N)
          )
        )
        .then(() => {
          N = [];
          for (const q of i.list()) N.push(Ht(q, b, D));
          return N.push(J), vn(N);
        })
        .catch((q) => (Xt(q, 8) ? q : Promise.reject(q)))
    );
  }
  function se(b, D, N) {
    for (const B of a.list()) B(b, D, N);
  }
  function ve(b, D, N, B, ae) {
    const de = M(b, D);
    if (de) return de;
    const J = D === kt,
      q = Sn ? history.state : {};
    N &&
      (B || J
        ? o.replace(b.fullPath, ye({ scroll: J && q && q.scroll }, ae))
        : o.push(b.fullPath, ae)),
      (l.value = b),
      ft(b, D, N, J),
      Be();
  }
  let j;
  function Z() {
    j = o.listen((b, D, N) => {
      const B = S(b),
        ae = I(B);
      if (ae) {
        P(ye(ae, { replace: !0 }), B).catch(or);
        return;
      }
      c = B;
      const de = l.value;
      Sn && yh(ha(de.fullPath, N.delta), fo()),
        Q(B, de)
          .catch((J) =>
            Xt(J, 12)
              ? J
              : Xt(J, 2)
              ? (P(J.to, B)
                  .then((q) => {
                    Xt(q, 20) && !N.delta && N.type === gr.pop && o.go(-1, !1);
                  })
                  .catch(or),
                Promise.reject())
              : (N.delta && o.go(-N.delta, !1), pe(J, B, de))
          )
          .then((J) => {
            (J = J || ve(B, de, !1)),
              J &&
                (N.delta
                  ? o.go(-N.delta, !1)
                  : N.type === gr.pop && Xt(J, 20) && o.go(-1, !1)),
              se(B, de, J);
          })
          .catch(or);
    });
  }
  let ie = Kn(),
    qe = Kn(),
    Ee;
  function pe(b, D, N) {
    Be(b);
    const B = qe.list();
    return (
      B.length ? B.forEach((ae) => ae(b, D, N)) : console.error(b),
      Promise.reject(b)
    );
  }
  function fe() {
    return Ee && l.value !== kt
      ? Promise.resolve()
      : new Promise((b, D) => {
          ie.add([b, D]);
        });
  }
  function Be(b) {
    Ee ||
      ((Ee = !0),
      Z(),
      ie.list().forEach(([D, N]) => (b ? N(b) : D())),
      ie.reset());
  }
  function ft(b, D, N, B) {
    const { scrollBehavior: ae } = e;
    if (!Sn || !ae) return Promise.resolve();
    const de =
      (!N && _h(ha(b.fullPath, 0))) ||
      ((B || !N) && history.state && history.state.scroll) ||
      null;
    return cr()
      .then(() => ae(b, D, de))
      .then((J) => J && bh(J))
      .catch((J) => pe(J, b, D));
  }
  const be = (b) => o.go(b);
  let Ve;
  const ce = new Set();
  return {
    currentRoute: l,
    addRoute: v,
    removeRoute: C,
    hasRoute: w,
    getRoutes: L,
    resolve: S,
    options: e,
    push: A,
    replace: K,
    go: be,
    back: () => be(-1),
    forward: () => be(1),
    beforeEach: s.add,
    beforeResolve: i.add,
    afterEach: a.add,
    onError: qe.add,
    isReady: fe,
    install(b) {
      const D = this;
      b.component('RouterLink', rp),
        b.component('RouterView', ap),
        (b.config.globalProperties.$router = D),
        Object.defineProperty(b.config.globalProperties, '$route', {
          enumerable: !0,
          get: () => xe(l),
        }),
        Sn &&
          !Ve &&
          l.value === kt &&
          ((Ve = !0), A(o.location).catch((ae) => {}));
      const N = {};
      for (const ae in kt) N[ae] = he(() => l.value[ae]);
      b.provide(co, D), b.provide(li, pn(N)), b.provide(vs, l);
      const B = b.unmount;
      ce.add(b),
        (b.unmount = function () {
          ce.delete(b),
            ce.size < 1 &&
              ((c = kt), j && j(), (l.value = kt), (Ve = !1), (Ee = !1)),
            B();
        });
    },
  };
}
function vn(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function lp(e, t) {
  const n = [],
    r = [],
    o = [],
    s = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < s; i++) {
    const a = t.matched[i];
    a && (e.matched.find((c) => Pn(c, a)) ? r.push(a) : n.push(a));
    const l = e.matched[i];
    l && (t.matched.find((c) => Pn(c, l)) || o.push(l));
  }
  return [n, r, o];
}
function U1() {
  return $e(co);
}
function z1() {
  return $e(li);
}
var Or =
  typeof globalThis != 'undefined'
    ? globalThis
    : typeof window != 'undefined'
    ? window
    : typeof global != 'undefined'
    ? global
    : typeof self != 'undefined'
    ? self
    : {};
function up(e) {
  for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
    var o = e[t];
    r[o[0]] = o[1];
  }
  return r;
}
var cp = up;
class fp extends Error {
  constructor(t) {
    super(t);
    this.name = 'ElementPlusError';
  }
}
function dp(e, t) {
  throw new fp(`[${e}] ${t}`);
}
const ci = Symbol('elForm'),
  Wu = Symbol('elFormItem'),
  Ku = Symbol('buttonGroupContextKey'),
  hp = Symbol(),
  _s = Symbol(),
  Sa = '__elPropsReservedKey';
function Gu(e, t) {
  if (!Se(e) || !!e[Sa]) return e;
  const { values: n, required: r, default: o, type: s, validator: i } = e,
    a =
      n || i
        ? (l) => {
            let c = !1,
              u = [];
            if (
              (n && ((u = [...n, o]), c || (c = u.includes(l))),
              i && (c || (c = i(l))),
              !c && u.length > 0)
            ) {
              const d = [...new Set(u)]
                .map((h) => JSON.stringify(h))
                .join(', ');
              wf(
                `Invalid prop: validation failed${
                  t ? ` for prop "${t}"` : ''
                }. Expected one of [${d}], got value ${JSON.stringify(l)}.`
              );
            }
            return c;
          }
        : void 0;
  return {
    type:
      typeof s == 'object' && Object.getOwnPropertySymbols(s).includes(_s)
        ? s[_s]
        : s,
    required: !!r,
    default: o,
    validator: a,
    [Sa]: !0,
  };
}
const ho = (e) => cp(Object.entries(e).map(([t, n]) => [t, Gu(n, t)])),
  vr = (e) => ({ [_s]: e }),
  pp = ['large', 'default', 'small'],
  qu = (e) => {
    const t = kn();
    return he(() => {
      var n, r;
      return (r = (n = t.proxy) == null ? void 0 : n.$props[e]) != null
        ? r
        : void 0;
    });
  };
function mp() {
  (this.__data__ = []), (this.size = 0);
}
var gp = mp;
function vp(e, t) {
  return e === t || (e !== e && t !== t);
}
var bp = vp,
  yp = bp;
function _p(e, t) {
  for (var n = e.length; n--; ) if (yp(e[n][0], t)) return n;
  return -1;
}
var po = _p,
  Ep = po,
  wp = Array.prototype,
  Tp = wp.splice;
function Sp(e) {
  var t = this.__data__,
    n = Ep(t, e);
  if (n < 0) return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Tp.call(t, n, 1), --this.size, !0;
}
var Cp = Sp,
  Ap = po;
function xp(e) {
  var t = this.__data__,
    n = Ap(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var Rp = xp,
  $p = po;
function Op(e) {
  return $p(this.__data__, e) > -1;
}
var Pp = Op,
  Mp = po;
function Np(e, t) {
  var n = this.__data__,
    r = Mp(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
}
var Ip = Np,
  kp = gp,
  Lp = Cp,
  Dp = Rp,
  Fp = Pp,
  Hp = Ip;
function Dn(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Dn.prototype.clear = kp;
Dn.prototype.delete = Lp;
Dn.prototype.get = Dp;
Dn.prototype.has = Fp;
Dn.prototype.set = Hp;
var jp = Dn,
  Bp = typeof Or == 'object' && Or && Or.Object === Object && Or,
  Vu = Bp,
  Up = Vu,
  zp = typeof self == 'object' && self && self.Object === Object && self,
  Wp = Up || zp || Function('return this')(),
  bt = Wp,
  Kp = bt,
  Gp = Kp.Symbol,
  mo = Gp,
  Ca = mo,
  Ju = Object.prototype,
  qp = Ju.hasOwnProperty,
  Vp = Ju.toString,
  Gn = Ca ? Ca.toStringTag : void 0;
function Jp(e) {
  var t = qp.call(e, Gn),
    n = e[Gn];
  try {
    e[Gn] = void 0;
    var r = !0;
  } catch {}
  var o = Vp.call(e);
  return r && (t ? (e[Gn] = n) : delete e[Gn]), o;
}
var Yp = Jp,
  Xp = Object.prototype,
  Qp = Xp.toString;
function Zp(e) {
  return Qp.call(e);
}
var em = Zp,
  Aa = mo,
  tm = Yp,
  nm = em,
  rm = '[object Null]',
  om = '[object Undefined]',
  xa = Aa ? Aa.toStringTag : void 0;
function sm(e) {
  return e == null
    ? e === void 0
      ? om
      : rm
    : xa && xa in Object(e)
    ? tm(e)
    : nm(e);
}
var go = sm;
function im(e) {
  var t = typeof e;
  return e != null && (t == 'object' || t == 'function');
}
var br = im,
  am = go,
  lm = br,
  um = '[object AsyncFunction]',
  cm = '[object Function]',
  fm = '[object GeneratorFunction]',
  dm = '[object Proxy]';
function hm(e) {
  if (!lm(e)) return !1;
  var t = am(e);
  return t == cm || t == fm || t == um || t == dm;
}
var pm = hm,
  mm = bt,
  gm = mm['__core-js_shared__'],
  vm = gm,
  jo = vm,
  Ra = (function () {
    var e = /[^.]+$/.exec((jo && jo.keys && jo.keys.IE_PROTO) || '');
    return e ? 'Symbol(src)_1.' + e : '';
  })();
function bm(e) {
  return !!Ra && Ra in e;
}
var ym = bm,
  _m = Function.prototype,
  Em = _m.toString;
function wm(e) {
  if (e != null) {
    try {
      return Em.call(e);
    } catch {}
    try {
      return e + '';
    } catch {}
  }
  return '';
}
var Yu = wm,
  Tm = pm,
  Sm = ym,
  Cm = br,
  Am = Yu,
  xm = /[\\^$.*+?()[\]{}|]/g,
  Rm = /^\[object .+?Constructor\]$/,
  $m = Function.prototype,
  Om = Object.prototype,
  Pm = $m.toString,
  Mm = Om.hasOwnProperty,
  Nm = RegExp(
    '^' +
      Pm.call(Mm)
        .replace(xm, '\\$&')
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          '$1.*?'
        ) +
      '$'
  );
function Im(e) {
  if (!Cm(e) || Sm(e)) return !1;
  var t = Tm(e) ? Nm : Rm;
  return t.test(Am(e));
}
var km = Im;
function Lm(e, t) {
  return e == null ? void 0 : e[t];
}
var Dm = Lm,
  Fm = km,
  Hm = Dm;
function jm(e, t) {
  var n = Hm(e, t);
  return Fm(n) ? n : void 0;
}
var Fn = jm,
  Bm = Fn,
  Um = bt,
  zm = Bm(Um, 'Map'),
  Xu = zm,
  Wm = Fn,
  Km = Wm(Object, 'create'),
  vo = Km,
  $a = vo;
function Gm() {
  (this.__data__ = $a ? $a(null) : {}), (this.size = 0);
}
var qm = Gm;
function Vm(e) {
  var t = this.has(e) && delete this.__data__[e];
  return (this.size -= t ? 1 : 0), t;
}
var Jm = Vm,
  Ym = vo,
  Xm = '__lodash_hash_undefined__',
  Qm = Object.prototype,
  Zm = Qm.hasOwnProperty;
function eg(e) {
  var t = this.__data__;
  if (Ym) {
    var n = t[e];
    return n === Xm ? void 0 : n;
  }
  return Zm.call(t, e) ? t[e] : void 0;
}
var tg = eg,
  ng = vo,
  rg = Object.prototype,
  og = rg.hasOwnProperty;
function sg(e) {
  var t = this.__data__;
  return ng ? t[e] !== void 0 : og.call(t, e);
}
var ig = sg,
  ag = vo,
  lg = '__lodash_hash_undefined__';
function ug(e, t) {
  var n = this.__data__;
  return (
    (this.size += this.has(e) ? 0 : 1),
    (n[e] = ag && t === void 0 ? lg : t),
    this
  );
}
var cg = ug,
  fg = qm,
  dg = Jm,
  hg = tg,
  pg = ig,
  mg = cg;
function Hn(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Hn.prototype.clear = fg;
Hn.prototype.delete = dg;
Hn.prototype.get = hg;
Hn.prototype.has = pg;
Hn.prototype.set = mg;
var gg = Hn,
  Oa = gg,
  vg = jp,
  bg = Xu;
function yg() {
  (this.size = 0),
    (this.__data__ = {
      hash: new Oa(),
      map: new (bg || vg)(),
      string: new Oa(),
    });
}
var _g = yg;
function Eg(e) {
  var t = typeof e;
  return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean'
    ? e !== '__proto__'
    : e === null;
}
var wg = Eg,
  Tg = wg;
function Sg(e, t) {
  var n = e.__data__;
  return Tg(t) ? n[typeof t == 'string' ? 'string' : 'hash'] : n.map;
}
var bo = Sg,
  Cg = bo;
function Ag(e) {
  var t = Cg(this, e).delete(e);
  return (this.size -= t ? 1 : 0), t;
}
var xg = Ag,
  Rg = bo;
function $g(e) {
  return Rg(this, e).get(e);
}
var Og = $g,
  Pg = bo;
function Mg(e) {
  return Pg(this, e).has(e);
}
var Ng = Mg,
  Ig = bo;
function kg(e, t) {
  var n = Ig(this, e),
    r = n.size;
  return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
}
var Lg = kg,
  Dg = _g,
  Fg = xg,
  Hg = Og,
  jg = Ng,
  Bg = Lg;
function jn(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
jn.prototype.clear = Dg;
jn.prototype.delete = Fg;
jn.prototype.get = Hg;
jn.prototype.has = jg;
jn.prototype.set = Bg;
var Ug = jn,
  zg = bt;
zg.Uint8Array;
var Pa = mo,
  Ma = Pa ? Pa.prototype : void 0;
Ma && Ma.valueOf;
var Wg = Array.isArray,
  fi = Wg;
function Kg(e) {
  return e != null && typeof e == 'object';
}
var di = Kg,
  Gg = go,
  qg = di,
  Vg = '[object Arguments]';
function Jg(e) {
  return qg(e) && Gg(e) == Vg;
}
var Yg = Jg,
  Na = Yg,
  Xg = di,
  Qu = Object.prototype,
  Qg = Qu.hasOwnProperty,
  Zg = Qu.propertyIsEnumerable;
Na(
  (function () {
    return arguments;
  })()
);
var Ia = { exports: {} };
function ev() {
  return !1;
}
var tv = ev;
(function (e, t) {
  var n = bt,
    r = tv,
    o = t && !t.nodeType && t,
    s = o && !0 && e && !e.nodeType && e,
    i = s && s.exports === o,
    a = i ? n.Buffer : void 0,
    l = a ? a.isBuffer : void 0,
    c = l || r;
  e.exports = c;
})(Ia, Ia.exports);
var Es = { exports: {} };
(function (e, t) {
  var n = Vu,
    r = t && !t.nodeType && t,
    o = r && !0 && e && !e.nodeType && e,
    s = o && o.exports === r,
    i = s && n.process,
    a = (function () {
      try {
        var l = o && o.require && o.require('util').types;
        return l || (i && i.binding && i.binding('util'));
      } catch {}
    })();
  e.exports = a;
})(Es, Es.exports);
var ka = Es.exports;
ka && ka.isTypedArray;
var nv = Fn,
  rv = bt,
  ov = nv(rv, 'DataView'),
  sv = ov,
  iv = Fn,
  av = bt,
  lv = iv(av, 'Promise'),
  uv = lv,
  cv = Fn,
  fv = bt,
  dv = cv(fv, 'Set'),
  hv = dv,
  pv = Fn,
  mv = bt,
  gv = pv(mv, 'WeakMap'),
  vv = gv,
  ws = sv,
  Ts = Xu,
  Ss = uv,
  Cs = hv,
  As = vv,
  Zu = go,
  Bn = Yu,
  La = '[object Map]',
  bv = '[object Object]',
  Da = '[object Promise]',
  Fa = '[object Set]',
  Ha = '[object WeakMap]',
  ja = '[object DataView]',
  yv = Bn(ws),
  _v = Bn(Ts),
  Ev = Bn(Ss),
  wv = Bn(Cs),
  Tv = Bn(As),
  bn = Zu;
((ws && bn(new ws(new ArrayBuffer(1))) != ja) ||
  (Ts && bn(new Ts()) != La) ||
  (Ss && bn(Ss.resolve()) != Da) ||
  (Cs && bn(new Cs()) != Fa) ||
  (As && bn(new As()) != Ha)) &&
  (bn = function (e) {
    var t = Zu(e),
      n = t == bv ? e.constructor : void 0,
      r = n ? Bn(n) : '';
    if (r)
      switch (r) {
        case yv:
          return ja;
        case _v:
          return La;
        case Ev:
          return Da;
        case wv:
          return Fa;
        case Tv:
          return Ha;
      }
    return t;
  });
var Sv = !1;
const Kt = typeof window != 'undefined';
function Cv(e) {
  var t;
  const n = xe(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Av = Kt ? window : void 0;
Kt && window.document;
Kt && window.navigator;
Kt && window.location;
const xs =
    typeof globalThis != 'undefined'
      ? globalThis
      : typeof window != 'undefined'
      ? window
      : typeof global != 'undefined'
      ? global
      : typeof self != 'undefined'
      ? self
      : {},
  Rs = '__vueuse_ssr_handlers__';
xs[Rs] = xs[Rs] || {};
xs[Rs];
function xv(e, t, { window: n = Av } = {}) {
  const r = Pt(''),
    o = he(() => {
      var s;
      return (
        Cv(t) ||
        ((s = n == null ? void 0 : n.document) == null
          ? void 0
          : s.documentElement)
      );
    });
  return (
    zt(
      [o, () => xe(e)],
      ([s, i]) => {
        s && n && (r.value = n.getComputedStyle(s).getPropertyValue(i));
      },
      { immediate: !0 }
    ),
    zt(r, (s) => {
      var i;
      ((i = o.value) == null ? void 0 : i.style) &&
        o.value.style.setProperty(xe(e), s);
    }),
    r
  );
}
var Ba, Ua;
Kt &&
  (window == null ? void 0 : window.navigator) &&
  ((Ba = window == null ? void 0 : window.navigator) == null
    ? void 0
    : Ba.platform) &&
  /iP(ad|hone|od)/.test(
    (Ua = window == null ? void 0 : window.navigator) == null
      ? void 0
      : Ua.platform
  );
var Rv = Object.defineProperty,
  za = Object.getOwnPropertySymbols,
  $v = Object.prototype.hasOwnProperty,
  Ov = Object.prototype.propertyIsEnumerable,
  Wa = (e, t, n) =>
    t in e
      ? Rv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  Pv = (e, t) => {
    for (var n in t || (t = {})) $v.call(t, n) && Wa(e, n, t[n]);
    if (za) for (var n of za(t)) Ov.call(t, n) && Wa(e, n, t[n]);
    return e;
  };
const Mv = { top: 0, left: 0, bottom: 0, right: 0, height: 0, width: 0 };
Pv({ text: '' }, Mv);
const Nv = (e) => typeof e == 'number';
function Iv(e) {
  return e === void 0;
}
function kv(e) {
  return Te(e) ? e : Nv(e) ? `${e}px` : '';
}
const Lv = Pt({});
function yo(e) {
  const t = $e(hp, Lv);
  return e
    ? Se(t.value) && oe(t.value, e)
      ? he(() => t.value[e])
      : Pt(void 0)
    : t;
}
const Dv = Gu({ type: String, values: pp, required: !1 }),
  Fv = (e, t = {}) => {
    const n = Pt(void 0),
      r = t.prop ? n : qu('size'),
      o = t.global ? n : yo('size'),
      s = t.form ? { size: void 0 } : $e(ci, void 0),
      i = t.formItem ? { size: void 0 } : $e(Wu, void 0);
    return he(
      () =>
        r.value ||
        xe(e) ||
        (i == null ? void 0 : i.size) ||
        (s == null ? void 0 : s.size) ||
        o.value ||
        'default'
    );
  },
  Hv = (e) => {
    const t = qu('disabled'),
      n = $e(ci, void 0);
    return he(
      () => t.value || xe(e) || (n == null ? void 0 : n.disabled) || !1
    );
  },
  jv = () => {
    const e = $e(ci, void 0),
      t = $e(Wu, void 0);
    return { form: e, formItem: t };
  };
var Bv = go,
  Uv = di,
  zv = '[object Symbol]';
function Wv(e) {
  return typeof e == 'symbol' || (Uv(e) && Bv(e) == zv);
}
var _o = Wv,
  Kv = fi,
  Gv = _o,
  qv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  Vv = /^\w*$/;
function Jv(e, t) {
  if (Kv(e)) return !1;
  var n = typeof e;
  return n == 'number' || n == 'symbol' || n == 'boolean' || e == null || Gv(e)
    ? !0
    : Vv.test(e) || !qv.test(e) || (t != null && e in Object(t));
}
var Yv = Jv,
  ec = Ug,
  Xv = 'Expected a function';
function hi(e, t) {
  if (typeof e != 'function' || (t != null && typeof t != 'function'))
    throw new TypeError(Xv);
  var n = function () {
    var r = arguments,
      o = t ? t.apply(this, r) : r[0],
      s = n.cache;
    if (s.has(o)) return s.get(o);
    var i = e.apply(this, r);
    return (n.cache = s.set(o, i) || s), i;
  };
  return (n.cache = new (hi.Cache || ec)()), n;
}
hi.Cache = ec;
var Qv = hi,
  Zv = Qv,
  e0 = 500;
function t0(e) {
  var t = Zv(e, function (r) {
      return n.size === e0 && n.clear(), r;
    }),
    n = t.cache;
  return t;
}
var n0 = t0,
  r0 = n0,
  o0 =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  s0 = /\\(\\)?/g,
  i0 = r0(function (e) {
    var t = [];
    return (
      e.charCodeAt(0) === 46 && t.push(''),
      e.replace(o0, function (n, r, o, s) {
        t.push(o ? s.replace(s0, '$1') : r || n);
      }),
      t
    );
  }),
  a0 = i0;
function l0(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = Array(r); ++n < r; )
    o[n] = t(e[n], n, e);
  return o;
}
var u0 = l0,
  Ka = mo,
  c0 = u0,
  f0 = fi,
  d0 = _o,
  h0 = 1 / 0,
  Ga = Ka ? Ka.prototype : void 0,
  qa = Ga ? Ga.toString : void 0;
function tc(e) {
  if (typeof e == 'string') return e;
  if (f0(e)) return c0(e, tc) + '';
  if (d0(e)) return qa ? qa.call(e) : '';
  var t = e + '';
  return t == '0' && 1 / e == -h0 ? '-0' : t;
}
var p0 = tc,
  m0 = p0;
function g0(e) {
  return e == null ? '' : m0(e);
}
var v0 = g0,
  b0 = fi,
  y0 = Yv,
  _0 = a0,
  E0 = v0;
function w0(e, t) {
  return b0(e) ? e : y0(e, t) ? [e] : _0(E0(e));
}
var T0 = w0,
  S0 = _o,
  C0 = 1 / 0;
function A0(e) {
  if (typeof e == 'string' || S0(e)) return e;
  var t = e + '';
  return t == '0' && 1 / e == -C0 ? '-0' : t;
}
var x0 = A0,
  R0 = T0,
  $0 = x0;
function O0(e, t) {
  t = R0(t, e);
  for (var n = 0, r = t.length; e != null && n < r; ) e = e[$0(t[n++])];
  return n && n == r ? e : void 0;
}
var P0 = O0,
  M0 = P0;
function N0(e, t, n) {
  var r = e == null ? void 0 : M0(e, t);
  return r === void 0 ? n : r;
}
var I0 = N0,
  k0 = {
    name: 'en',
    el: {
      colorpicker: { confirm: 'OK', clear: 'Clear' },
      datepicker: {
        now: 'Now',
        today: 'Today',
        cancel: 'Cancel',
        clear: 'Clear',
        confirm: 'OK',
        selectDate: 'Select date',
        selectTime: 'Select time',
        startDate: 'Start Date',
        startTime: 'Start Time',
        endDate: 'End Date',
        endTime: 'End Time',
        prevYear: 'Previous Year',
        nextYear: 'Next Year',
        prevMonth: 'Previous Month',
        nextMonth: 'Next Month',
        year: '',
        month1: 'January',
        month2: 'February',
        month3: 'March',
        month4: 'April',
        month5: 'May',
        month6: 'June',
        month7: 'July',
        month8: 'August',
        month9: 'September',
        month10: 'October',
        month11: 'November',
        month12: 'December',
        week: 'week',
        weeks: {
          sun: 'Sun',
          mon: 'Mon',
          tue: 'Tue',
          wed: 'Wed',
          thu: 'Thu',
          fri: 'Fri',
          sat: 'Sat',
        },
        months: {
          jan: 'Jan',
          feb: 'Feb',
          mar: 'Mar',
          apr: 'Apr',
          may: 'May',
          jun: 'Jun',
          jul: 'Jul',
          aug: 'Aug',
          sep: 'Sep',
          oct: 'Oct',
          nov: 'Nov',
          dec: 'Dec',
        },
      },
      select: {
        loading: 'Loading',
        noMatch: 'No matching data',
        noData: 'No data',
        placeholder: 'Select',
      },
      cascader: {
        noMatch: 'No matching data',
        loading: 'Loading',
        placeholder: 'Select',
        noData: 'No data',
      },
      pagination: {
        goto: 'Go to',
        pagesize: '/page',
        total: 'Total {total}',
        pageClassifier: '',
        deprecationWarning:
          'Deprecated usages detected, please refer to the el-pagination documentation for more details',
      },
      messagebox: {
        title: 'Message',
        confirm: 'OK',
        cancel: 'Cancel',
        error: 'Illegal input',
      },
      upload: {
        deleteTip: 'press delete to remove',
        delete: 'Delete',
        preview: 'Preview',
        continue: 'Continue',
      },
      table: {
        emptyText: 'No Data',
        confirmFilter: 'Confirm',
        resetFilter: 'Reset',
        clearFilter: 'All',
        sumText: 'Sum',
      },
      tree: { emptyText: 'No Data' },
      transfer: {
        noMatch: 'No matching data',
        noData: 'No data',
        titles: ['List 1', 'List 2'],
        filterPlaceholder: 'Enter keyword',
        noCheckedFormat: '{total} items',
        hasCheckedFormat: '{checked}/{total} checked',
      },
      image: { error: 'FAILED' },
      pageHeader: { title: 'Back' },
      popconfirm: { confirmButtonText: 'Yes', cancelButtonText: 'No' },
    },
  };
const L0 = (e) => (t, n) => D0(t, n, xe(e)),
  D0 = (e, t, n) =>
    I0(n, e, e).replace(/\{(\w+)\}/g, (r, o) => {
      var s;
      return `${(s = t == null ? void 0 : t[o]) != null ? s : `{${o}}`}`;
    }),
  F0 = (e) => {
    const t = he(() => xe(e).name),
      n = we(e) ? e : Pt(e);
    return { lang: t, locale: n, t: L0(e) };
  },
  H0 = () => {
    const e = yo('locale');
    return F0(he(() => e.value || k0));
  },
  Bo = function (e, t) {
    var n;
    if (!Kt || !e || !t) return '';
    (t = lt(t)), t === 'float' && (t = 'cssFloat');
    try {
      const r = e.style[t];
      if (r) return r;
      const o =
        (n = document.defaultView) == null ? void 0 : n.getComputedStyle(e, '');
      return o ? o[t] : '';
    } catch {
      return e.style[t];
    }
  },
  j0 = (e, t) =>
    Kt
      ? (t == null
          ? Bo(e, 'overflow')
          : t
          ? Bo(e, 'overflow-y')
          : Bo(e, 'overflow-x')
        ).match(/(scroll|auto|overlay)/)
      : null,
  B0 = (e, t) => {
    if (!Kt) return;
    let n = e;
    for (; n; ) {
      if ([window, document, document.documentElement].includes(n))
        return window;
      if (j0(n, t)) return n;
      n = n.parentNode;
    }
    return n;
  },
  Va = (e) => {
    let t = 0,
      n = e;
    for (; n; ) (t += n.offsetTop), (n = n.offsetParent);
    return t;
  },
  U0 = (e, t) => Math.abs(Va(e) - Va(t)),
  z0 = 'el',
  W0 = 'is-',
  Qt = (e, t, n, r, o) => {
    let s = `${e}-${t}`;
    return n && (s += `-${n}`), r && (s += `__${r}`), o && (s += `--${o}`), s;
  },
  Un = (e) => {
    const t = he(() => yo('namespace').value || z0);
    return {
      namespace: t,
      b: (u = '') => Qt(xe(t), e, u, '', ''),
      e: (u) => (u ? Qt(xe(t), e, '', u, '') : ''),
      m: (u) => (u ? Qt(xe(t), e, '', '', u) : ''),
      be: (u, d) => (u && d ? Qt(xe(t), e, u, d, '') : ''),
      em: (u, d) => (u && d ? Qt(xe(t), e, '', u, d) : ''),
      bm: (u, d) => (u && d ? Qt(xe(t), e, u, '', d) : ''),
      bem: (u, d, h) => (u && d && h ? Qt(xe(t), e, u, d, h) : ''),
      is: (u, d = !0) => (d ? `${W0}${u}` : ''),
    };
  },
  yr = (e, t) => {
    if (
      ((e.install = (n) => {
        for (const r of [e, ...Object.values(t != null ? t : {})])
          n.component(r.name, r);
      }),
      t)
    )
      for (const [n, r] of Object.entries(t)) e[n] = r;
    return e;
  },
  K0 = (e) => ((e.install = ot), e);
var mn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t) n[r] = o;
  return n;
};
const G0 = ho({
    size: { type: vr([Number, String]) },
    color: { type: String },
  }),
  q0 = vt({
    name: 'ElIcon',
    inheritAttrs: !1,
    props: G0,
    setup(e) {
      const t = Un('icon'),
        n = he(() =>
          !e.size && !e.color
            ? {}
            : { fontSize: Iv(e.size) ? void 0 : kv(e.size), '--color': e.color }
        );
      return { ns: t, style: n };
    },
  });
function V0(e, t, n, r, o, s) {
  return (
    Ae(),
    ze(
      'i',
      wu({ class: e.ns.b(), style: e.style }, e.$attrs),
      [gt(e.$slots, 'default')],
      16
    )
  );
}
var J0 = mn(q0, [['render', V0]]);
const Y0 = yr(J0);
var X0 = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t) n[r] = o;
  return n;
};
const Q0 = vt({ name: 'Loading' }),
  Z0 = {
    class: 'icon',
    width: '200',
    height: '200',
    viewBox: '0 0 1024 1024',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  eb = ue(
    'path',
    {
      fill: 'currentColor',
      d: 'M512 64a32 32 0 0132 32v192a32 32 0 01-64 0V96a32 32 0 0132-32zm0 640a32 32 0 0132 32v192a32 32 0 11-64 0V736a32 32 0 0132-32zm448-192a32 32 0 01-32 32H736a32 32 0 110-64h192a32 32 0 0132 32zm-640 0a32 32 0 01-32 32H96a32 32 0 010-64h192a32 32 0 0132 32zM195.2 195.2a32 32 0 0145.248 0L376.32 331.008a32 32 0 01-45.248 45.248L195.2 240.448a32 32 0 010-45.248zm452.544 452.544a32 32 0 0145.248 0L828.8 783.552a32 32 0 01-45.248 45.248L647.744 692.992a32 32 0 010-45.248zM828.8 195.264a32 32 0 010 45.184L692.992 376.32a32 32 0 01-45.248-45.248l135.808-135.808a32 32 0 0145.248 0zm-452.544 452.48a32 32 0 010 45.248L240.448 828.8a32 32 0 01-45.248-45.248l135.808-135.808a32 32 0 0145.248 0z',
    },
    null,
    -1
  ),
  tb = [eb];
function nb(e, t, n, r, o, s) {
  return Ae(), ze('svg', Z0, tb);
}
var nc = X0(Q0, [['render', nb]]),
  rb = bt,
  ob = function () {
    return rb.Date.now();
  },
  sb = ob,
  ib = /\s/;
function ab(e) {
  for (var t = e.length; t-- && ib.test(e.charAt(t)); );
  return t;
}
var lb = ab,
  ub = lb,
  cb = /^\s+/;
function fb(e) {
  return e && e.slice(0, ub(e) + 1).replace(cb, '');
}
var db = fb,
  hb = db,
  Ja = br,
  pb = _o,
  Ya = 0 / 0,
  mb = /^[-+]0x[0-9a-f]+$/i,
  gb = /^0b[01]+$/i,
  vb = /^0o[0-7]+$/i,
  bb = parseInt;
function yb(e) {
  if (typeof e == 'number') return e;
  if (pb(e)) return Ya;
  if (Ja(e)) {
    var t = typeof e.valueOf == 'function' ? e.valueOf() : e;
    e = Ja(t) ? t + '' : t;
  }
  if (typeof e != 'string') return e === 0 ? e : +e;
  e = hb(e);
  var n = gb.test(e);
  return n || vb.test(e) ? bb(e.slice(2), n ? 2 : 8) : mb.test(e) ? Ya : +e;
}
var _b = yb,
  Eb = br,
  Uo = sb,
  Xa = _b,
  wb = 'Expected a function',
  Tb = Math.max,
  Sb = Math.min;
function Cb(e, t, n) {
  var r,
    o,
    s,
    i,
    a,
    l,
    c = 0,
    u = !1,
    d = !1,
    h = !0;
  if (typeof e != 'function') throw new TypeError(wb);
  (t = Xa(t) || 0),
    Eb(n) &&
      ((u = !!n.leading),
      (d = 'maxWait' in n),
      (s = d ? Tb(Xa(n.maxWait) || 0, t) : s),
      (h = 'trailing' in n ? !!n.trailing : h));
  function v(I) {
    var P = r,
      Y = o;
    return (r = o = void 0), (c = I), (i = e.apply(Y, P)), i;
  }
  function C(I) {
    return (c = I), (a = setTimeout(S, t)), u ? v(I) : i;
  }
  function L(I) {
    var P = I - l,
      Y = I - c,
      Q = t - P;
    return d ? Sb(Q, s - Y) : Q;
  }
  function w(I) {
    var P = I - l,
      Y = I - c;
    return l === void 0 || P >= t || P < 0 || (d && Y >= s);
  }
  function S() {
    var I = Uo();
    if (w(I)) return y(I);
    a = setTimeout(S, L(I));
  }
  function y(I) {
    return (a = void 0), h && r ? v(I) : ((r = o = void 0), i);
  }
  function M() {
    a !== void 0 && clearTimeout(a), (c = 0), (r = l = o = a = void 0);
  }
  function A() {
    return a === void 0 ? i : y(Uo());
  }
  function K() {
    var I = Uo(),
      P = w(I);
    if (((r = arguments), (o = this), (l = I), P)) {
      if (a === void 0) return C(l);
      if (d) return clearTimeout(a), (a = setTimeout(S, t)), v(l);
    }
    return a === void 0 && (a = setTimeout(S, t)), i;
  }
  return (K.cancel = M), (K.flush = A), K;
}
var Ab = Cb;
function ke(e, t) {
  xb(e) && (e = '100%');
  var n = Rb(e);
  return (
    (e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e)))),
    n && (e = parseInt(String(e * t), 10) / 100),
    Math.abs(e - t) < 1e-6
      ? 1
      : (t === 360
          ? (e = (e < 0 ? (e % t) + t : e % t) / parseFloat(String(t)))
          : (e = (e % t) / parseFloat(String(t))),
        e)
  );
}
function Pr(e) {
  return Math.min(1, Math.max(0, e));
}
function xb(e) {
  return typeof e == 'string' && e.indexOf('.') !== -1 && parseFloat(e) === 1;
}
function Rb(e) {
  return typeof e == 'string' && e.indexOf('%') !== -1;
}
function rc(e) {
  return (e = parseFloat(e)), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function Mr(e) {
  return e <= 1 ? Number(e) * 100 + '%' : e;
}
function sn(e) {
  return e.length === 1 ? '0' + e : String(e);
}
function $b(e, t, n) {
  return { r: ke(e, 255) * 255, g: ke(t, 255) * 255, b: ke(n, 255) * 255 };
}
function Qa(e, t, n) {
  (e = ke(e, 255)), (t = ke(t, 255)), (n = ke(n, 255));
  var r = Math.max(e, t, n),
    o = Math.min(e, t, n),
    s = 0,
    i = 0,
    a = (r + o) / 2;
  if (r === o) (i = 0), (s = 0);
  else {
    var l = r - o;
    switch (((i = a > 0.5 ? l / (2 - r - o) : l / (r + o)), r)) {
      case e:
        s = (t - n) / l + (t < n ? 6 : 0);
        break;
      case t:
        s = (n - e) / l + 2;
        break;
      case n:
        s = (e - t) / l + 4;
        break;
    }
    s /= 6;
  }
  return { h: s, s: i, l: a };
}
function zo(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * (6 * n)
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function Ob(e, t, n) {
  var r, o, s;
  if (((e = ke(e, 360)), (t = ke(t, 100)), (n = ke(n, 100)), t === 0))
    (o = n), (s = n), (r = n);
  else {
    var i = n < 0.5 ? n * (1 + t) : n + t - n * t,
      a = 2 * n - i;
    (r = zo(a, i, e + 1 / 3)), (o = zo(a, i, e)), (s = zo(a, i, e - 1 / 3));
  }
  return { r: r * 255, g: o * 255, b: s * 255 };
}
function Za(e, t, n) {
  (e = ke(e, 255)), (t = ke(t, 255)), (n = ke(n, 255));
  var r = Math.max(e, t, n),
    o = Math.min(e, t, n),
    s = 0,
    i = r,
    a = r - o,
    l = r === 0 ? 0 : a / r;
  if (r === o) s = 0;
  else {
    switch (r) {
      case e:
        s = (t - n) / a + (t < n ? 6 : 0);
        break;
      case t:
        s = (n - e) / a + 2;
        break;
      case n:
        s = (e - t) / a + 4;
        break;
    }
    s /= 6;
  }
  return { h: s, s: l, v: i };
}
function Pb(e, t, n) {
  (e = ke(e, 360) * 6), (t = ke(t, 100)), (n = ke(n, 100));
  var r = Math.floor(e),
    o = e - r,
    s = n * (1 - t),
    i = n * (1 - o * t),
    a = n * (1 - (1 - o) * t),
    l = r % 6,
    c = [n, i, s, s, a, n][l],
    u = [a, n, n, i, s, s][l],
    d = [s, s, a, n, n, i][l];
  return { r: c * 255, g: u * 255, b: d * 255 };
}
function el(e, t, n, r) {
  var o = [
    sn(Math.round(e).toString(16)),
    sn(Math.round(t).toString(16)),
    sn(Math.round(n).toString(16)),
  ];
  return r &&
    o[0].startsWith(o[0].charAt(1)) &&
    o[1].startsWith(o[1].charAt(1)) &&
    o[2].startsWith(o[2].charAt(1))
    ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0)
    : o.join('');
}
function Mb(e, t, n, r, o) {
  var s = [
    sn(Math.round(e).toString(16)),
    sn(Math.round(t).toString(16)),
    sn(Math.round(n).toString(16)),
    sn(Nb(r)),
  ];
  return o &&
    s[0].startsWith(s[0].charAt(1)) &&
    s[1].startsWith(s[1].charAt(1)) &&
    s[2].startsWith(s[2].charAt(1)) &&
    s[3].startsWith(s[3].charAt(1))
    ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) + s[3].charAt(0)
    : s.join('');
}
function Nb(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function tl(e) {
  return Xe(e) / 255;
}
function Xe(e) {
  return parseInt(e, 16);
}
function Ib(e) {
  return { r: e >> 16, g: (e & 65280) >> 8, b: e & 255 };
}
var $s = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  goldenrod: '#daa520',
  gold: '#ffd700',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavenderblush: '#fff0f5',
  lavender: '#e6e6fa',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
};
function kb(e) {
  var t = { r: 0, g: 0, b: 0 },
    n = 1,
    r = null,
    o = null,
    s = null,
    i = !1,
    a = !1;
  return (
    typeof e == 'string' && (e = Fb(e)),
    typeof e == 'object' &&
      (Tt(e.r) && Tt(e.g) && Tt(e.b)
        ? ((t = $b(e.r, e.g, e.b)),
          (i = !0),
          (a = String(e.r).substr(-1) === '%' ? 'prgb' : 'rgb'))
        : Tt(e.h) && Tt(e.s) && Tt(e.v)
        ? ((r = Mr(e.s)),
          (o = Mr(e.v)),
          (t = Pb(e.h, r, o)),
          (i = !0),
          (a = 'hsv'))
        : Tt(e.h) &&
          Tt(e.s) &&
          Tt(e.l) &&
          ((r = Mr(e.s)),
          (s = Mr(e.l)),
          (t = Ob(e.h, r, s)),
          (i = !0),
          (a = 'hsl')),
      Object.prototype.hasOwnProperty.call(e, 'a') && (n = e.a)),
    (n = rc(n)),
    {
      ok: i,
      format: e.format || a,
      r: Math.min(255, Math.max(t.r, 0)),
      g: Math.min(255, Math.max(t.g, 0)),
      b: Math.min(255, Math.max(t.b, 0)),
      a: n,
    }
  );
}
var Lb = '[-\\+]?\\d+%?',
  Db = '[-\\+]?\\d*\\.\\d+%?',
  jt = '(?:' + Db + ')|(?:' + Lb + ')',
  Wo = '[\\s|\\(]+(' + jt + ')[,|\\s]+(' + jt + ')[,|\\s]+(' + jt + ')\\s*\\)?',
  Ko =
    '[\\s|\\(]+(' +
    jt +
    ')[,|\\s]+(' +
    jt +
    ')[,|\\s]+(' +
    jt +
    ')[,|\\s]+(' +
    jt +
    ')\\s*\\)?',
  it = {
    CSS_UNIT: new RegExp(jt),
    rgb: new RegExp('rgb' + Wo),
    rgba: new RegExp('rgba' + Ko),
    hsl: new RegExp('hsl' + Wo),
    hsla: new RegExp('hsla' + Ko),
    hsv: new RegExp('hsv' + Wo),
    hsva: new RegExp('hsva' + Ko),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
function Fb(e) {
  if (((e = e.trim().toLowerCase()), e.length === 0)) return !1;
  var t = !1;
  if ($s[e]) (e = $s[e]), (t = !0);
  else if (e === 'transparent')
    return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
  var n = it.rgb.exec(e);
  return n
    ? { r: n[1], g: n[2], b: n[3] }
    : ((n = it.rgba.exec(e)),
      n
        ? { r: n[1], g: n[2], b: n[3], a: n[4] }
        : ((n = it.hsl.exec(e)),
          n
            ? { h: n[1], s: n[2], l: n[3] }
            : ((n = it.hsla.exec(e)),
              n
                ? { h: n[1], s: n[2], l: n[3], a: n[4] }
                : ((n = it.hsv.exec(e)),
                  n
                    ? { h: n[1], s: n[2], v: n[3] }
                    : ((n = it.hsva.exec(e)),
                      n
                        ? { h: n[1], s: n[2], v: n[3], a: n[4] }
                        : ((n = it.hex8.exec(e)),
                          n
                            ? {
                                r: Xe(n[1]),
                                g: Xe(n[2]),
                                b: Xe(n[3]),
                                a: tl(n[4]),
                                format: t ? 'name' : 'hex8',
                              }
                            : ((n = it.hex6.exec(e)),
                              n
                                ? {
                                    r: Xe(n[1]),
                                    g: Xe(n[2]),
                                    b: Xe(n[3]),
                                    format: t ? 'name' : 'hex',
                                  }
                                : ((n = it.hex4.exec(e)),
                                  n
                                    ? {
                                        r: Xe(n[1] + n[1]),
                                        g: Xe(n[2] + n[2]),
                                        b: Xe(n[3] + n[3]),
                                        a: tl(n[4] + n[4]),
                                        format: t ? 'name' : 'hex8',
                                      }
                                    : ((n = it.hex3.exec(e)),
                                      n
                                        ? {
                                            r: Xe(n[1] + n[1]),
                                            g: Xe(n[2] + n[2]),
                                            b: Xe(n[3] + n[3]),
                                            format: t ? 'name' : 'hex',
                                          }
                                        : !1)))))))));
}
function Tt(e) {
  return Boolean(it.CSS_UNIT.exec(String(e)));
}
var Nr = (function () {
  function e(t, n) {
    t === void 0 && (t = ''), n === void 0 && (n = {});
    var r;
    if (t instanceof e) return t;
    typeof t == 'number' && (t = Ib(t)), (this.originalInput = t);
    var o = kb(t);
    (this.originalInput = t),
      (this.r = o.r),
      (this.g = o.g),
      (this.b = o.b),
      (this.a = o.a),
      (this.roundA = Math.round(100 * this.a) / 100),
      (this.format = (r = n.format) !== null && r !== void 0 ? r : o.format),
      (this.gradientType = n.gradientType),
      this.r < 1 && (this.r = Math.round(this.r)),
      this.g < 1 && (this.g = Math.round(this.g)),
      this.b < 1 && (this.b = Math.round(this.b)),
      (this.isValid = o.ok);
  }
  return (
    (e.prototype.isDark = function () {
      return this.getBrightness() < 128;
    }),
    (e.prototype.isLight = function () {
      return !this.isDark();
    }),
    (e.prototype.getBrightness = function () {
      var t = this.toRgb();
      return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
    }),
    (e.prototype.getLuminance = function () {
      var t = this.toRgb(),
        n,
        r,
        o,
        s = t.r / 255,
        i = t.g / 255,
        a = t.b / 255;
      return (
        s <= 0.03928
          ? (n = s / 12.92)
          : (n = Math.pow((s + 0.055) / 1.055, 2.4)),
        i <= 0.03928
          ? (r = i / 12.92)
          : (r = Math.pow((i + 0.055) / 1.055, 2.4)),
        a <= 0.03928
          ? (o = a / 12.92)
          : (o = Math.pow((a + 0.055) / 1.055, 2.4)),
        0.2126 * n + 0.7152 * r + 0.0722 * o
      );
    }),
    (e.prototype.getAlpha = function () {
      return this.a;
    }),
    (e.prototype.setAlpha = function (t) {
      return (
        (this.a = rc(t)), (this.roundA = Math.round(100 * this.a) / 100), this
      );
    }),
    (e.prototype.toHsv = function () {
      var t = Za(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
    }),
    (e.prototype.toHsvString = function () {
      var t = Za(this.r, this.g, this.b),
        n = Math.round(t.h * 360),
        r = Math.round(t.s * 100),
        o = Math.round(t.v * 100);
      return this.a === 1
        ? 'hsv(' + n + ', ' + r + '%, ' + o + '%)'
        : 'hsva(' + n + ', ' + r + '%, ' + o + '%, ' + this.roundA + ')';
    }),
    (e.prototype.toHsl = function () {
      var t = Qa(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
    }),
    (e.prototype.toHslString = function () {
      var t = Qa(this.r, this.g, this.b),
        n = Math.round(t.h * 360),
        r = Math.round(t.s * 100),
        o = Math.round(t.l * 100);
      return this.a === 1
        ? 'hsl(' + n + ', ' + r + '%, ' + o + '%)'
        : 'hsla(' + n + ', ' + r + '%, ' + o + '%, ' + this.roundA + ')';
    }),
    (e.prototype.toHex = function (t) {
      return t === void 0 && (t = !1), el(this.r, this.g, this.b, t);
    }),
    (e.prototype.toHexString = function (t) {
      return t === void 0 && (t = !1), '#' + this.toHex(t);
    }),
    (e.prototype.toHex8 = function (t) {
      return t === void 0 && (t = !1), Mb(this.r, this.g, this.b, this.a, t);
    }),
    (e.prototype.toHex8String = function (t) {
      return t === void 0 && (t = !1), '#' + this.toHex8(t);
    }),
    (e.prototype.toRgb = function () {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a,
      };
    }),
    (e.prototype.toRgbString = function () {
      var t = Math.round(this.r),
        n = Math.round(this.g),
        r = Math.round(this.b);
      return this.a === 1
        ? 'rgb(' + t + ', ' + n + ', ' + r + ')'
        : 'rgba(' + t + ', ' + n + ', ' + r + ', ' + this.roundA + ')';
    }),
    (e.prototype.toPercentageRgb = function () {
      var t = function (n) {
        return Math.round(ke(n, 255) * 100) + '%';
      };
      return { r: t(this.r), g: t(this.g), b: t(this.b), a: this.a };
    }),
    (e.prototype.toPercentageRgbString = function () {
      var t = function (n) {
        return Math.round(ke(n, 255) * 100);
      };
      return this.a === 1
        ? 'rgb(' + t(this.r) + '%, ' + t(this.g) + '%, ' + t(this.b) + '%)'
        : 'rgba(' +
            t(this.r) +
            '%, ' +
            t(this.g) +
            '%, ' +
            t(this.b) +
            '%, ' +
            this.roundA +
            ')';
    }),
    (e.prototype.toName = function () {
      if (this.a === 0) return 'transparent';
      if (this.a < 1) return !1;
      for (
        var t = '#' + el(this.r, this.g, this.b, !1),
          n = 0,
          r = Object.entries($s);
        n < r.length;
        n++
      ) {
        var o = r[n],
          s = o[0],
          i = o[1];
        if (t === i) return s;
      }
      return !1;
    }),
    (e.prototype.toString = function (t) {
      var n = Boolean(t);
      t = t != null ? t : this.format;
      var r = !1,
        o = this.a < 1 && this.a >= 0,
        s = !n && o && (t.startsWith('hex') || t === 'name');
      return s
        ? t === 'name' && this.a === 0
          ? this.toName()
          : this.toRgbString()
        : (t === 'rgb' && (r = this.toRgbString()),
          t === 'prgb' && (r = this.toPercentageRgbString()),
          (t === 'hex' || t === 'hex6') && (r = this.toHexString()),
          t === 'hex3' && (r = this.toHexString(!0)),
          t === 'hex4' && (r = this.toHex8String(!0)),
          t === 'hex8' && (r = this.toHex8String()),
          t === 'name' && (r = this.toName()),
          t === 'hsl' && (r = this.toHslString()),
          t === 'hsv' && (r = this.toHsvString()),
          r || this.toHexString());
    }),
    (e.prototype.toNumber = function () {
      return (
        (Math.round(this.r) << 16) +
        (Math.round(this.g) << 8) +
        Math.round(this.b)
      );
    }),
    (e.prototype.clone = function () {
      return new e(this.toString());
    }),
    (e.prototype.lighten = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.l += t / 100), (n.l = Pr(n.l)), new e(n);
    }),
    (e.prototype.brighten = function (t) {
      t === void 0 && (t = 10);
      var n = this.toRgb();
      return (
        (n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100))))),
        (n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100))))),
        (n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100))))),
        new e(n)
      );
    }),
    (e.prototype.darken = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.l -= t / 100), (n.l = Pr(n.l)), new e(n);
    }),
    (e.prototype.tint = function (t) {
      return t === void 0 && (t = 10), this.mix('white', t);
    }),
    (e.prototype.shade = function (t) {
      return t === void 0 && (t = 10), this.mix('black', t);
    }),
    (e.prototype.desaturate = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.s -= t / 100), (n.s = Pr(n.s)), new e(n);
    }),
    (e.prototype.saturate = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.s += t / 100), (n.s = Pr(n.s)), new e(n);
    }),
    (e.prototype.greyscale = function () {
      return this.desaturate(100);
    }),
    (e.prototype.spin = function (t) {
      var n = this.toHsl(),
        r = (n.h + t) % 360;
      return (n.h = r < 0 ? 360 + r : r), new e(n);
    }),
    (e.prototype.mix = function (t, n) {
      n === void 0 && (n = 50);
      var r = this.toRgb(),
        o = new e(t).toRgb(),
        s = n / 100,
        i = {
          r: (o.r - r.r) * s + r.r,
          g: (o.g - r.g) * s + r.g,
          b: (o.b - r.b) * s + r.b,
          a: (o.a - r.a) * s + r.a,
        };
      return new e(i);
    }),
    (e.prototype.analogous = function (t, n) {
      t === void 0 && (t = 6), n === void 0 && (n = 30);
      var r = this.toHsl(),
        o = 360 / n,
        s = [this];
      for (r.h = (r.h - ((o * t) >> 1) + 720) % 360; --t; )
        (r.h = (r.h + o) % 360), s.push(new e(r));
      return s;
    }),
    (e.prototype.complement = function () {
      var t = this.toHsl();
      return (t.h = (t.h + 180) % 360), new e(t);
    }),
    (e.prototype.monochromatic = function (t) {
      t === void 0 && (t = 6);
      for (
        var n = this.toHsv(), r = n.h, o = n.s, s = n.v, i = [], a = 1 / t;
        t--;

      )
        i.push(new e({ h: r, s: o, v: s })), (s = (s + a) % 1);
      return i;
    }),
    (e.prototype.splitcomplement = function () {
      var t = this.toHsl(),
        n = t.h;
      return [
        this,
        new e({ h: (n + 72) % 360, s: t.s, l: t.l }),
        new e({ h: (n + 216) % 360, s: t.s, l: t.l }),
      ];
    }),
    (e.prototype.onBackground = function (t) {
      var n = this.toRgb(),
        r = new e(t).toRgb();
      return new e({
        r: r.r + (n.r - r.r) * n.a,
        g: r.g + (n.g - r.g) * n.a,
        b: r.b + (n.b - r.b) * n.a,
      });
    }),
    (e.prototype.triad = function () {
      return this.polyad(3);
    }),
    (e.prototype.tetrad = function () {
      return this.polyad(4);
    }),
    (e.prototype.polyad = function (t) {
      for (
        var n = this.toHsl(), r = n.h, o = [this], s = 360 / t, i = 1;
        i < t;
        i++
      )
        o.push(new e({ h: (r + i * s) % 360, s: n.s, l: n.l }));
      return o;
    }),
    (e.prototype.equals = function (t) {
      return this.toRgbString() === new e(t).toRgbString();
    }),
    e
  );
})();
const Hb = [
    'default',
    'primary',
    'success',
    'warning',
    'info',
    'danger',
    'text',
    '',
  ],
  jb = ['button', 'submit', 'reset'],
  Os = ho({
    size: Dv,
    disabled: Boolean,
    type: { type: String, values: Hb, default: '' },
    icon: { type: vr([String, Object]), default: '' },
    nativeType: { type: String, values: jb, default: 'button' },
    loading: Boolean,
    loadingIcon: { type: vr([String, Object]), default: () => nc },
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    color: String,
    autoInsertSpace: { type: Boolean, default: void 0 },
  }),
  Bb = { click: (e) => e instanceof MouseEvent },
  Ub = vt({
    name: 'ElButton',
    components: { ElIcon: Y0, Loading: nc },
    props: Os,
    emits: Bb,
    setup(e, { emit: t, slots: n }) {
      const r = Pt(),
        o = $e(Ku, void 0),
        s = yo('button'),
        i = Un('button'),
        a = he(() => {
          var w, S, y;
          return (y =
            (S = e.autoInsertSpace) != null
              ? S
              : (w = s.value) == null
              ? void 0
              : w.autoInsertSpace) != null
            ? y
            : !1;
        }),
        l = he(() => {
          var w;
          const S = (w = n.default) == null ? void 0 : w.call(n);
          if (a.value && (S == null ? void 0 : S.length) === 1) {
            const y = S[0];
            if ((y == null ? void 0 : y.type) === lo) {
              const M = y.children;
              return /^\p{Unified_Ideograph}{2}$/u.test(M);
            }
          }
          return !1;
        }),
        { form: c } = jv(),
        u = Fv(he(() => (o == null ? void 0 : o.size))),
        d = Hv(),
        h = he(() => e.type || (o == null ? void 0 : o.type) || ''),
        v = he(() => xv(`--el-color-${e.type}`).value),
        C = he(() => {
          let w = {};
          const S = e.color || v.value;
          if (S) {
            const y = new Nr(S).shade(10).toString();
            if (e.plain)
              w = {
                '--el-button-bg-color': new Nr(S).tint(90).toString(),
                '--el-button-text-color': S,
                '--el-button-hover-text-color': 'var(--el-color-white)',
                '--el-button-hover-bg-color': S,
                '--el-button-hover-border-color': S,
                '--el-button-active-bg-color': y,
                '--el-button-active-text-color': 'var(--el-color-white)',
                '--el-button-active-border-color': y,
              };
            else {
              const M = new Nr(S).tint(20).toString();
              w = {
                '--el-button-bg-color': S,
                '--el-button-border-color': S,
                '--el-button-hover-bg-color': M,
                '--el-button-hover-border-color': M,
                '--el-button-active-bg-color': y,
                '--el-button-active-border-color': y,
              };
            }
            if (d.value) {
              const M = new Nr(S).tint(50).toString();
              (w['--el-button-disabled-bg-color'] = M),
                (w['--el-button-disabled-border-color'] = M);
            }
          }
          return w;
        });
      return {
        buttonRef: r,
        buttonStyle: C,
        buttonSize: u,
        buttonType: h,
        buttonDisabled: d,
        shouldAddSpace: l,
        handleClick: (w) => {
          e.nativeType === 'reset' && (c == null || c.resetFields()),
            t('click', w);
        },
        ns: i,
      };
    },
  }),
  zb = ['disabled', 'autofocus', 'type'];
function Wb(e, t, n, r, o, s) {
  const i = vu('el-icon');
  return (
    Ae(),
    ze(
      'button',
      {
        ref: 'buttonRef',
        class: He([
          e.ns.b(),
          e.ns.m(e.buttonType),
          e.ns.m(e.buttonSize),
          e.ns.is('disabled', e.buttonDisabled),
          e.ns.is('loading', e.loading),
          e.ns.is('plain', e.plain),
          e.ns.is('round', e.round),
          e.ns.is('circle', e.circle),
        ]),
        disabled: e.buttonDisabled || e.loading,
        autofocus: e.autofocus,
        type: e.nativeType,
        style: fn(e.buttonStyle),
        onClick:
          t[0] || (t[0] = (...a) => e.handleClick && e.handleClick(...a)),
      },
      [
        e.loading
          ? (Ae(),
            ze(
              Ke,
              { key: 0 },
              [
                e.$slots.loading
                  ? gt(e.$slots, 'loading', { key: 0 })
                  : (Ae(),
                    Cn(
                      i,
                      { key: 1, class: He(e.ns.is('loading')) },
                      {
                        default: us(() => [(Ae(), Cn(qi(e.loadingIcon)))]),
                        _: 1,
                      },
                      8,
                      ['class']
                    )),
              ],
              2112
            ))
          : e.icon
          ? (Ae(),
            Cn(
              i,
              { key: 1 },
              { default: us(() => [(Ae(), Cn(qi(e.icon)))]), _: 1 }
            ))
          : pr('v-if', !0),
        e.$slots.default
          ? (Ae(),
            ze(
              'span',
              {
                key: 2,
                class: He({ [e.ns.em('text', 'expand')]: e.shouldAddSpace }),
              },
              [gt(e.$slots, 'default')],
              2
            ))
          : pr('v-if', !0),
      ],
      14,
      zb
    )
  );
}
var Kb = mn(Ub, [['render', Wb]]);
const Gb = { size: Os.size, type: Os.type },
  qb = vt({
    name: 'ElButtonGroup',
    props: Gb,
    setup(e) {
      return (
        nr(Ku, pn({ size: is(e, 'size'), type: is(e, 'type') })),
        { ns: Un('button') }
      );
    },
  });
function Vb(e, t, n, r, o, s) {
  return (
    Ae(),
    ze('div', { class: He(`${e.ns.b('group')}`) }, [gt(e.$slots, 'default')], 2)
  );
}
var oc = mn(qb, [['render', Vb]]);
const W1 = yr(Kb, { ButtonGroup: oc });
K0(oc);
const Jb = ho({
    header: { type: String, default: '' },
    bodyStyle: { type: vr([String, Object, Array]), default: '' },
    shadow: { type: String, default: 'always' },
  }),
  Yb = vt({
    name: 'ElCard',
    props: Jb,
    setup() {
      return { ns: Un('card') };
    },
  });
function Xb(e, t, n, r, o, s) {
  return (
    Ae(),
    ze(
      'div',
      { class: He([e.ns.b(), e.ns.is(`${e.shadow}-shadow`)]) },
      [
        e.$slots.header || e.header
          ? (Ae(),
            ze(
              'div',
              { key: 0, class: He(e.ns.e('header')) },
              [gt(e.$slots, 'header', {}, () => [Eu(wl(e.header), 1)])],
              2
            ))
          : pr('v-if', !0),
        ue(
          'div',
          { class: He(e.ns.e('body')), style: fn(e.bodyStyle) },
          [gt(e.$slots, 'default')],
          6
        ),
      ],
      2
    )
  );
}
var Qb = mn(Yb, [['render', Xb]]);
const K1 = yr(Qb);
var Zb = Ab,
  ey = br,
  ty = 'Expected a function';
function ny(e, t, n) {
  var r = !0,
    o = !0;
  if (typeof e != 'function') throw new TypeError(ty);
  return (
    ey(n) &&
      ((r = 'leading' in n ? !!n.leading : r),
      (o = 'trailing' in n ? !!n.trailing : o)),
    Zb(e, t, { leading: r, maxWait: t, trailing: o })
  );
}
var nl = ny;
const ry = ho({
    direction: {
      type: String,
      values: ['horizontal', 'vertical'],
      default: 'horizontal',
    },
    contentPosition: {
      type: String,
      values: ['left', 'center', 'right'],
      default: 'center',
    },
    borderStyle: { type: vr(String), default: 'solid' },
  }),
  oy = vt({
    name: 'ElDivider',
    props: ry,
    setup(e) {
      const t = Un('divider'),
        n = he(() => ({ '--el-border-style': e.borderStyle }));
      return { ns: t, dividerStyle: n };
    },
  });
function sy(e, t, n, r, o, s) {
  return (
    Ae(),
    ze(
      'div',
      { class: He([e.ns.b(), e.ns.m(e.direction)]), style: fn(e.dividerStyle) },
      [
        e.$slots.default && e.direction !== 'vertical'
          ? (Ae(),
            ze(
              'div',
              {
                key: 0,
                class: He([e.ns.e('text'), e.ns.is(e.contentPosition)]),
              },
              [gt(e.$slots, 'default')],
              2
            ))
          : pr('v-if', !0),
      ],
      6
    )
  );
}
var iy = mn(oy, [['render', sy]]);
const G1 = yr(iy);
let ay = 0;
const ly = vt({
    name: 'ImgEmpty',
    setup() {
      return { id: ++ay };
    },
  }),
  uy = {
    viewBox: '0 0 79 86',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  },
  cy = ['id'],
  fy = ue(
    'stop',
    { 'stop-color': 'var(--el-empty-fill-color-1)', offset: '0%' },
    null,
    -1
  ),
  dy = ue(
    'stop',
    { 'stop-color': 'var(--el-empty-fill-color-4)', offset: '100%' },
    null,
    -1
  ),
  hy = [fy, dy],
  py = ['id'],
  my = ue(
    'stop',
    { 'stop-color': 'var(--el-empty-fill-color-1)', offset: '0%' },
    null,
    -1
  ),
  gy = ue(
    'stop',
    { 'stop-color': 'var(--el-empty-fill-color-6)', offset: '100%' },
    null,
    -1
  ),
  vy = [my, gy],
  by = ['id'],
  yy = {
    id: 'Illustrations',
    stroke: 'none',
    'stroke-width': '1',
    fill: 'none',
    'fill-rule': 'evenodd',
  },
  _y = { id: 'B-type', transform: 'translate(-1268.000000, -535.000000)' },
  Ey = { id: 'Group-2', transform: 'translate(1268.000000, 535.000000)' },
  wy = ue(
    'path',
    {
      id: 'Oval-Copy-2',
      d: 'M39.5,86 C61.3152476,86 79,83.9106622 79,81.3333333 C79,78.7560045 57.3152476,78 35.5,78 C13.6847524,78 0,78.7560045 0,81.3333333 C0,83.9106622 17.6847524,86 39.5,86 Z',
      fill: 'var(--el-empty-fill-color-3)',
    },
    null,
    -1
  ),
  Ty = ue(
    'polygon',
    {
      id: 'Rectangle-Copy-14',
      fill: 'var(--el-empty-fill-color-7)',
      transform:
        'translate(27.500000, 51.500000) scale(1, -1) translate(-27.500000, -51.500000) ',
      points: '13 58 53 58 42 45 2 45',
    },
    null,
    -1
  ),
  Sy = {
    id: 'Group-Copy',
    transform:
      'translate(34.500000, 31.500000) scale(-1, 1) rotate(-25.000000) translate(-34.500000, -31.500000) translate(7.000000, 10.000000)',
  },
  Cy = ue(
    'polygon',
    {
      id: 'Rectangle-Copy-10',
      fill: 'var(--el-empty-fill-color-7)',
      transform:
        'translate(11.500000, 5.000000) scale(1, -1) translate(-11.500000, -5.000000) ',
      points: '2.84078316e-14 3 18 3 23 7 5 7',
    },
    null,
    -1
  ),
  Ay = ue(
    'polygon',
    {
      id: 'Rectangle-Copy-11',
      fill: 'var(--el-empty-fill-color-5)',
      points: '-3.69149156e-15 7 38 7 38 43 -3.69149156e-15 43',
    },
    null,
    -1
  ),
  xy = ['fill'],
  Ry = ue(
    'polygon',
    {
      id: 'Rectangle-Copy-13',
      fill: 'var(--el-empty-fill-color-2)',
      transform:
        'translate(39.500000, 3.500000) scale(-1, 1) translate(-39.500000, -3.500000) ',
      points: '24 7 41 7 55 -3.63806207e-12 38 -3.63806207e-12',
    },
    null,
    -1
  ),
  $y = ['fill'],
  Oy = {
    id: 'Rectangle-Copy-17',
    transform: 'translate(53.000000, 45.000000)',
  },
  Py = ['id'],
  My = ['xlink:href'],
  Ny = ['xlink:href'],
  Iy = ['mask'],
  ky = ue(
    'polygon',
    {
      id: 'Rectangle-Copy-18',
      fill: 'var(--el-empty-fill-color-2)',
      transform:
        'translate(66.000000, 51.500000) scale(-1, 1) translate(-66.000000, -51.500000) ',
      points: '62 45 79 45 70 58 53 58',
    },
    null,
    -1
  );
function Ly(e, t, n, r, o, s) {
  return (
    Ae(),
    ze('svg', uy, [
      ue('defs', null, [
        ue(
          'linearGradient',
          {
            id: `linearGradient-1-${e.id}`,
            x1: '38.8503086%',
            y1: '0%',
            x2: '61.1496914%',
            y2: '100%',
          },
          hy,
          8,
          cy
        ),
        ue(
          'linearGradient',
          {
            id: `linearGradient-2-${e.id}`,
            x1: '0%',
            y1: '9.5%',
            x2: '100%',
            y2: '90.5%',
          },
          vy,
          8,
          py
        ),
        ue(
          'rect',
          { id: `path-3-${e.id}`, x: '0', y: '0', width: '17', height: '36' },
          null,
          8,
          by
        ),
      ]),
      ue('g', yy, [
        ue('g', _y, [
          ue('g', Ey, [
            wy,
            Ty,
            ue('g', Sy, [
              Cy,
              Ay,
              ue(
                'rect',
                {
                  id: 'Rectangle-Copy-12',
                  fill: `url(#linearGradient-1-${e.id})`,
                  transform:
                    'translate(46.500000, 25.000000) scale(-1, 1) translate(-46.500000, -25.000000) ',
                  x: '38',
                  y: '7',
                  width: '17',
                  height: '36',
                },
                null,
                8,
                xy
              ),
              Ry,
            ]),
            ue(
              'rect',
              {
                id: 'Rectangle-Copy-15',
                fill: `url(#linearGradient-2-${e.id})`,
                x: '13',
                y: '45',
                width: '40',
                height: '36',
              },
              null,
              8,
              $y
            ),
            ue('g', Oy, [
              ue(
                'mask',
                { id: `mask-4-${e.id}`, fill: 'var(--el-empty-fill-color-0)' },
                [ue('use', { 'xlink:href': `#path-3-${e.id}` }, null, 8, My)],
                8,
                Py
              ),
              ue(
                'use',
                {
                  id: 'Mask',
                  fill: 'var(--el-empty-fill-color-8)',
                  transform:
                    'translate(8.500000, 18.000000) scale(-1, 1) translate(-8.500000, -18.000000) ',
                  'xlink:href': `#path-3-${e.id}`,
                },
                null,
                8,
                Ny
              ),
              ue(
                'polygon',
                {
                  id: 'Rectangle-Copy',
                  fill: 'var(--el-empty-fill-color-9)',
                  mask: `url(#mask-4-${e.id})`,
                  transform:
                    'translate(12.000000, 9.000000) scale(-1, 1) translate(-12.000000, -9.000000) ',
                  points: '7 0 24 0 20 18 -1.70530257e-13 16',
                },
                null,
                8,
                Iy
              ),
            ]),
            ky,
          ]),
        ]),
      ]),
    ])
  );
}
var Dy = mn(ly, [['render', Ly]]);
const Fy = {
    image: { type: String, default: '' },
    imageSize: Number,
    description: { type: String, default: '' },
  },
  Hy = vt({
    name: 'ElEmpty',
    components: { ImgEmpty: Dy },
    props: Fy,
    setup(e) {
      const { t } = H0(),
        n = Un('empty'),
        r = he(() => e.description || t('el.table.emptyText')),
        o = he(() => ({ width: e.imageSize ? `${e.imageSize}px` : '' }));
      return { ns: n, emptyDescription: r, imageStyle: o };
    },
  }),
  jy = ['src'],
  By = { key: 1 };
function Uy(e, t, n, r, o, s) {
  const i = vu('img-empty');
  return (
    Ae(),
    ze(
      'div',
      { class: He(e.ns.b()) },
      [
        ue(
          'div',
          { class: He(e.ns.e('image')), style: fn(e.imageStyle) },
          [
            e.image
              ? (Ae(),
                ze(
                  'img',
                  { key: 0, src: e.image, ondragstart: 'return false' },
                  null,
                  8,
                  jy
                ))
              : gt(e.$slots, 'image', { key: 1 }, () => [je(i)]),
          ],
          6
        ),
        ue(
          'div',
          { class: He(e.ns.e('description')) },
          [
            e.$slots.description
              ? gt(e.$slots, 'description', { key: 0 })
              : (Ae(), ze('p', By, wl(e.emptyDescription), 1)),
          ],
          2
        ),
        e.$slots.default
          ? (Ae(),
            ze(
              'div',
              { key: 0, class: He(e.ns.e('bottom')) },
              [gt(e.$slots, 'default')],
              2
            ))
          : pr('v-if', !0),
      ],
      2
    )
  );
}
var zy = mn(Hy, [['render', Uy]]);
const q1 = yr(zy),
  at = 'ElInfiniteScroll',
  Wy = 50,
  Ky = 200,
  Gy = 0,
  qy = {
    delay: { type: Number, default: Ky },
    distance: { type: Number, default: Gy },
    disabled: { type: Boolean, default: !1 },
    immediate: { type: Boolean, default: !0 },
  },
  pi = (e, t) =>
    Object.entries(qy).reduce((n, [r, o]) => {
      var s, i;
      const { type: a, default: l } = o,
        c = e.getAttribute(`infinite-scroll-${r}`);
      let u = (i = (s = t[c]) != null ? s : c) != null ? i : l;
      return (
        (u = u === 'false' ? !1 : u),
        (u = a(u)),
        (n[r] = Number.isNaN(u) ? l : u),
        n
      );
    }, {}),
  sc = (e) => {
    const { observer: t } = e[at];
    t && (t.disconnect(), delete e[at].observer);
  },
  Vy = (e, t) => {
    const {
        container: n,
        containerEl: r,
        instance: o,
        observer: s,
        lastScrollTop: i,
      } = e[at],
      { disabled: a, distance: l } = pi(e, o),
      { clientHeight: c, scrollHeight: u, scrollTop: d } = r,
      h = d - i;
    if (((e[at].lastScrollTop = d), s || a || h < 0)) return;
    let v = !1;
    if (n === e) v = u - (c + d) <= l;
    else {
      const { clientTop: C, scrollHeight: L } = e,
        w = U0(e, r);
      v = d + c >= w + C + L - l;
    }
    v && t.call(o);
  };
function Go(e, t) {
  const { containerEl: n, instance: r } = e[at],
    { disabled: o } = pi(e, r);
  o ||
    n.clientHeight === 0 ||
    (n.scrollHeight <= n.clientHeight ? t.call(r) : sc(e));
}
const Jy = {
    async mounted(e, t) {
      const { instance: n, value: r } = t;
      X(r) || dp(at, "'v-infinite-scroll' binding value must be a function"),
        await cr();
      const { delay: o, immediate: s } = pi(e, n),
        i = B0(e, !0),
        a = i === window ? document.documentElement : i,
        l = nl(Vy.bind(null, e, r), o);
      if (!!i) {
        if (
          ((e[at] = {
            instance: n,
            container: i,
            containerEl: a,
            delay: o,
            cb: r,
            onScroll: l,
            lastScrollTop: a.scrollTop,
          }),
          s)
        ) {
          const c = new MutationObserver(nl(Go.bind(null, e, r), Wy));
          (e[at].observer = c),
            c.observe(e, { childList: !0, subtree: !0 }),
            Go(e, r);
        }
        i.addEventListener('scroll', l);
      }
    },
    unmounted(e) {
      const { container: t, onScroll: n } = e[at];
      t == null || t.removeEventListener('scroll', n), sc(e);
    },
    async updated(e) {
      e[at] || (await cr());
      const { containerEl: t, cb: n, observer: r } = e[at];
      t.clientHeight && r && Go(e, n);
    },
  },
  Ps = Jy;
Ps.install = (e) => {
  e.directive('InfiniteScroll', Ps);
};
const V1 = Ps;
var mi = { exports: {} },
  ic = function (t, n) {
    return function () {
      for (var o = new Array(arguments.length), s = 0; s < o.length; s++)
        o[s] = arguments[s];
      return t.apply(n, o);
    };
  },
  Yy = ic,
  Gt = Object.prototype.toString;
function gi(e) {
  return Array.isArray(e);
}
function Ms(e) {
  return typeof e == 'undefined';
}
function Xy(e) {
  return (
    e !== null &&
    !Ms(e) &&
    e.constructor !== null &&
    !Ms(e.constructor) &&
    typeof e.constructor.isBuffer == 'function' &&
    e.constructor.isBuffer(e)
  );
}
function ac(e) {
  return Gt.call(e) === '[object ArrayBuffer]';
}
function Qy(e) {
  return Gt.call(e) === '[object FormData]';
}
function Zy(e) {
  var t;
  return (
    typeof ArrayBuffer != 'undefined' && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && ac(e.buffer)),
    t
  );
}
function e_(e) {
  return typeof e == 'string';
}
function t_(e) {
  return typeof e == 'number';
}
function lc(e) {
  return e !== null && typeof e == 'object';
}
function jr(e) {
  if (Gt.call(e) !== '[object Object]') return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function n_(e) {
  return Gt.call(e) === '[object Date]';
}
function r_(e) {
  return Gt.call(e) === '[object File]';
}
function o_(e) {
  return Gt.call(e) === '[object Blob]';
}
function uc(e) {
  return Gt.call(e) === '[object Function]';
}
function s_(e) {
  return lc(e) && uc(e.pipe);
}
function i_(e) {
  return Gt.call(e) === '[object URLSearchParams]';
}
function a_(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
}
function l_() {
  return typeof navigator != 'undefined' &&
    (navigator.product === 'ReactNative' ||
      navigator.product === 'NativeScript' ||
      navigator.product === 'NS')
    ? !1
    : typeof window != 'undefined' && typeof document != 'undefined';
}
function vi(e, t) {
  if (!(e === null || typeof e == 'undefined'))
    if ((typeof e != 'object' && (e = [e]), gi(e)))
      for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
    else
      for (var o in e)
        Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
}
function Ns() {
  var e = {};
  function t(o, s) {
    jr(e[s]) && jr(o)
      ? (e[s] = Ns(e[s], o))
      : jr(o)
      ? (e[s] = Ns({}, o))
      : gi(o)
      ? (e[s] = o.slice())
      : (e[s] = o);
  }
  for (var n = 0, r = arguments.length; n < r; n++) vi(arguments[n], t);
  return e;
}
function u_(e, t, n) {
  return (
    vi(t, function (o, s) {
      n && typeof o == 'function' ? (e[s] = Yy(o, n)) : (e[s] = o);
    }),
    e
  );
}
function c_(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
var Ge = {
    isArray: gi,
    isArrayBuffer: ac,
    isBuffer: Xy,
    isFormData: Qy,
    isArrayBufferView: Zy,
    isString: e_,
    isNumber: t_,
    isObject: lc,
    isPlainObject: jr,
    isUndefined: Ms,
    isDate: n_,
    isFile: r_,
    isBlob: o_,
    isFunction: uc,
    isStream: s_,
    isURLSearchParams: i_,
    isStandardBrowserEnv: l_,
    forEach: vi,
    merge: Ns,
    extend: u_,
    trim: a_,
    stripBOM: c_,
  },
  yn = Ge;
function rl(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}
var cc = function (t, n, r) {
    if (!n) return t;
    var o;
    if (r) o = r(n);
    else if (yn.isURLSearchParams(n)) o = n.toString();
    else {
      var s = [];
      yn.forEach(n, function (l, c) {
        l === null ||
          typeof l == 'undefined' ||
          (yn.isArray(l) ? (c = c + '[]') : (l = [l]),
          yn.forEach(l, function (d) {
            yn.isDate(d)
              ? (d = d.toISOString())
              : yn.isObject(d) && (d = JSON.stringify(d)),
              s.push(rl(c) + '=' + rl(d));
          }));
      }),
        (o = s.join('&'));
    }
    if (o) {
      var i = t.indexOf('#');
      i !== -1 && (t = t.slice(0, i)),
        (t += (t.indexOf('?') === -1 ? '?' : '&') + o);
    }
    return t;
  },
  f_ = Ge;
function Eo() {
  this.handlers = [];
}
Eo.prototype.use = function (t, n, r) {
  return (
    this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null,
    }),
    this.handlers.length - 1
  );
};
Eo.prototype.eject = function (t) {
  this.handlers[t] && (this.handlers[t] = null);
};
Eo.prototype.forEach = function (t) {
  f_.forEach(this.handlers, function (r) {
    r !== null && t(r);
  });
};
var d_ = Eo,
  h_ = Ge,
  p_ = function (t, n) {
    h_.forEach(t, function (o, s) {
      s !== n &&
        s.toUpperCase() === n.toUpperCase() &&
        ((t[n] = o), delete t[s]);
    });
  },
  fc = function (t, n, r, o, s) {
    return (
      (t.config = n),
      r && (t.code = r),
      (t.request = o),
      (t.response = s),
      (t.isAxiosError = !0),
      (t.toJSON = function () {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status:
            this.response && this.response.status ? this.response.status : null,
        };
      }),
      t
    );
  },
  m_ = fc,
  dc = function (t, n, r, o, s) {
    var i = new Error(t);
    return m_(i, n, r, o, s);
  },
  g_ = dc,
  v_ = function (t, n, r) {
    var o = r.config.validateStatus;
    !r.status || !o || o(r.status)
      ? t(r)
      : n(
          g_(
            'Request failed with status code ' + r.status,
            r.config,
            null,
            r.request,
            r
          )
        );
  },
  Ir = Ge,
  b_ = Ir.isStandardBrowserEnv()
    ? (function () {
        return {
          write: function (n, r, o, s, i, a) {
            var l = [];
            l.push(n + '=' + encodeURIComponent(r)),
              Ir.isNumber(o) && l.push('expires=' + new Date(o).toGMTString()),
              Ir.isString(s) && l.push('path=' + s),
              Ir.isString(i) && l.push('domain=' + i),
              a === !0 && l.push('secure'),
              (document.cookie = l.join('; '));
          },
          read: function (n) {
            var r = document.cookie.match(
              new RegExp('(^|;\\s*)(' + n + ')=([^;]*)')
            );
            return r ? decodeURIComponent(r[3]) : null;
          },
          remove: function (n) {
            this.write(n, '', Date.now() - 864e5);
          },
        };
      })()
    : (function () {
        return {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {},
        };
      })(),
  y_ = function (t) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
  },
  __ = function (t, n) {
    return n ? t.replace(/\/+$/, '') + '/' + n.replace(/^\/+/, '') : t;
  },
  E_ = y_,
  w_ = __,
  T_ = function (t, n) {
    return t && !E_(n) ? w_(t, n) : n;
  },
  qo = Ge,
  S_ = [
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ],
  C_ = function (t) {
    var n = {},
      r,
      o,
      s;
    return (
      t &&
        qo.forEach(
          t.split(`
`),
          function (a) {
            if (
              ((s = a.indexOf(':')),
              (r = qo.trim(a.substr(0, s)).toLowerCase()),
              (o = qo.trim(a.substr(s + 1))),
              r)
            ) {
              if (n[r] && S_.indexOf(r) >= 0) return;
              r === 'set-cookie'
                ? (n[r] = (n[r] ? n[r] : []).concat([o]))
                : (n[r] = n[r] ? n[r] + ', ' + o : o);
            }
          }
        ),
      n
    );
  },
  ol = Ge,
  A_ = ol.isStandardBrowserEnv()
    ? (function () {
        var t = /(msie|trident)/i.test(navigator.userAgent),
          n = document.createElement('a'),
          r;
        function o(s) {
          var i = s;
          return (
            t && (n.setAttribute('href', i), (i = n.href)),
            n.setAttribute('href', i),
            {
              href: n.href,
              protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
              host: n.host,
              search: n.search ? n.search.replace(/^\?/, '') : '',
              hash: n.hash ? n.hash.replace(/^#/, '') : '',
              hostname: n.hostname,
              port: n.port,
              pathname:
                n.pathname.charAt(0) === '/' ? n.pathname : '/' + n.pathname,
            }
          );
        }
        return (
          (r = o(window.location.href)),
          function (i) {
            var a = ol.isString(i) ? o(i) : i;
            return a.protocol === r.protocol && a.host === r.host;
          }
        );
      })()
    : (function () {
        return function () {
          return !0;
        };
      })();
function bi(e) {
  this.message = e;
}
bi.prototype.toString = function () {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};
bi.prototype.__CANCEL__ = !0;
var wo = bi,
  kr = Ge,
  x_ = v_,
  R_ = b_,
  $_ = cc,
  O_ = T_,
  P_ = C_,
  M_ = A_,
  Vo = dc,
  N_ = So,
  I_ = wo,
  sl = function (t) {
    return new Promise(function (r, o) {
      var s = t.data,
        i = t.headers,
        a = t.responseType,
        l;
      function c() {
        t.cancelToken && t.cancelToken.unsubscribe(l),
          t.signal && t.signal.removeEventListener('abort', l);
      }
      kr.isFormData(s) && delete i['Content-Type'];
      var u = new XMLHttpRequest();
      if (t.auth) {
        var d = t.auth.username || '',
          h = t.auth.password
            ? unescape(encodeURIComponent(t.auth.password))
            : '';
        i.Authorization = 'Basic ' + btoa(d + ':' + h);
      }
      var v = O_(t.baseURL, t.url);
      u.open(t.method.toUpperCase(), $_(v, t.params, t.paramsSerializer), !0),
        (u.timeout = t.timeout);
      function C() {
        if (!!u) {
          var w =
              'getAllResponseHeaders' in u
                ? P_(u.getAllResponseHeaders())
                : null,
            S =
              !a || a === 'text' || a === 'json' ? u.responseText : u.response,
            y = {
              data: S,
              status: u.status,
              statusText: u.statusText,
              headers: w,
              config: t,
              request: u,
            };
          x_(
            function (A) {
              r(A), c();
            },
            function (A) {
              o(A), c();
            },
            y
          ),
            (u = null);
        }
      }
      if (
        ('onloadend' in u
          ? (u.onloadend = C)
          : (u.onreadystatechange = function () {
              !u ||
                u.readyState !== 4 ||
                (u.status === 0 &&
                  !(u.responseURL && u.responseURL.indexOf('file:') === 0)) ||
                setTimeout(C);
            }),
        (u.onabort = function () {
          !u || (o(Vo('Request aborted', t, 'ECONNABORTED', u)), (u = null));
        }),
        (u.onerror = function () {
          o(Vo('Network Error', t, null, u)), (u = null);
        }),
        (u.ontimeout = function () {
          var S = t.timeout
              ? 'timeout of ' + t.timeout + 'ms exceeded'
              : 'timeout exceeded',
            y = t.transitional || N_.transitional;
          t.timeoutErrorMessage && (S = t.timeoutErrorMessage),
            o(
              Vo(S, t, y.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', u)
            ),
            (u = null);
        }),
        kr.isStandardBrowserEnv())
      ) {
        var L =
          (t.withCredentials || M_(v)) && t.xsrfCookieName
            ? R_.read(t.xsrfCookieName)
            : void 0;
        L && (i[t.xsrfHeaderName] = L);
      }
      'setRequestHeader' in u &&
        kr.forEach(i, function (S, y) {
          typeof s == 'undefined' && y.toLowerCase() === 'content-type'
            ? delete i[y]
            : u.setRequestHeader(y, S);
        }),
        kr.isUndefined(t.withCredentials) ||
          (u.withCredentials = !!t.withCredentials),
        a && a !== 'json' && (u.responseType = t.responseType),
        typeof t.onDownloadProgress == 'function' &&
          u.addEventListener('progress', t.onDownloadProgress),
        typeof t.onUploadProgress == 'function' &&
          u.upload &&
          u.upload.addEventListener('progress', t.onUploadProgress),
        (t.cancelToken || t.signal) &&
          ((l = function (w) {
            !u ||
              (o(!w || (w && w.type) ? new I_('canceled') : w),
              u.abort(),
              (u = null));
          }),
          t.cancelToken && t.cancelToken.subscribe(l),
          t.signal &&
            (t.signal.aborted ? l() : t.signal.addEventListener('abort', l))),
        s || (s = null),
        u.send(s);
    });
  },
  Ie = Ge,
  il = p_,
  k_ = fc,
  L_ = { 'Content-Type': 'application/x-www-form-urlencoded' };
function al(e, t) {
  !Ie.isUndefined(e) &&
    Ie.isUndefined(e['Content-Type']) &&
    (e['Content-Type'] = t);
}
function D_() {
  var e;
  return (
    (typeof XMLHttpRequest != 'undefined' ||
      (typeof process != 'undefined' &&
        Object.prototype.toString.call(process) === '[object process]')) &&
      (e = sl),
    e
  );
}
function F_(e, t, n) {
  if (Ie.isString(e))
    try {
      return (t || JSON.parse)(e), Ie.trim(e);
    } catch (r) {
      if (r.name !== 'SyntaxError') throw r;
    }
  return (n || JSON.stringify)(e);
}
var To = {
  transitional: {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  adapter: D_(),
  transformRequest: [
    function (t, n) {
      return (
        il(n, 'Accept'),
        il(n, 'Content-Type'),
        Ie.isFormData(t) ||
        Ie.isArrayBuffer(t) ||
        Ie.isBuffer(t) ||
        Ie.isStream(t) ||
        Ie.isFile(t) ||
        Ie.isBlob(t)
          ? t
          : Ie.isArrayBufferView(t)
          ? t.buffer
          : Ie.isURLSearchParams(t)
          ? (al(n, 'application/x-www-form-urlencoded;charset=utf-8'),
            t.toString())
          : Ie.isObject(t) || (n && n['Content-Type'] === 'application/json')
          ? (al(n, 'application/json'), F_(t))
          : t
      );
    },
  ],
  transformResponse: [
    function (t) {
      var n = this.transitional || To.transitional,
        r = n && n.silentJSONParsing,
        o = n && n.forcedJSONParsing,
        s = !r && this.responseType === 'json';
      if (s || (o && Ie.isString(t) && t.length))
        try {
          return JSON.parse(t);
        } catch (i) {
          if (s)
            throw i.name === 'SyntaxError' ? k_(i, this, 'E_JSON_PARSE') : i;
        }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: 'application/json, text/plain, */*' } },
};
Ie.forEach(['delete', 'get', 'head'], function (t) {
  To.headers[t] = {};
});
Ie.forEach(['post', 'put', 'patch'], function (t) {
  To.headers[t] = Ie.merge(L_);
});
var So = To,
  H_ = Ge,
  j_ = So,
  B_ = function (t, n, r) {
    var o = this || j_;
    return (
      H_.forEach(r, function (i) {
        t = i.call(o, t, n);
      }),
      t
    );
  },
  hc = function (t) {
    return !!(t && t.__CANCEL__);
  },
  ll = Ge,
  Jo = B_,
  U_ = hc,
  z_ = So,
  W_ = wo;
function Yo(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new W_('canceled');
}
var K_ = function (t) {
    Yo(t),
      (t.headers = t.headers || {}),
      (t.data = Jo.call(t, t.data, t.headers, t.transformRequest)),
      (t.headers = ll.merge(
        t.headers.common || {},
        t.headers[t.method] || {},
        t.headers
      )),
      ll.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        function (o) {
          delete t.headers[o];
        }
      );
    var n = t.adapter || z_.adapter;
    return n(t).then(
      function (o) {
        return (
          Yo(t),
          (o.data = Jo.call(t, o.data, o.headers, t.transformResponse)),
          o
        );
      },
      function (o) {
        return (
          U_(o) ||
            (Yo(t),
            o &&
              o.response &&
              (o.response.data = Jo.call(
                t,
                o.response.data,
                o.response.headers,
                t.transformResponse
              ))),
          Promise.reject(o)
        );
      }
    );
  },
  Je = Ge,
  pc = function (t, n) {
    n = n || {};
    var r = {};
    function o(u, d) {
      return Je.isPlainObject(u) && Je.isPlainObject(d)
        ? Je.merge(u, d)
        : Je.isPlainObject(d)
        ? Je.merge({}, d)
        : Je.isArray(d)
        ? d.slice()
        : d;
    }
    function s(u) {
      if (Je.isUndefined(n[u])) {
        if (!Je.isUndefined(t[u])) return o(void 0, t[u]);
      } else return o(t[u], n[u]);
    }
    function i(u) {
      if (!Je.isUndefined(n[u])) return o(void 0, n[u]);
    }
    function a(u) {
      if (Je.isUndefined(n[u])) {
        if (!Je.isUndefined(t[u])) return o(void 0, t[u]);
      } else return o(void 0, n[u]);
    }
    function l(u) {
      if (u in n) return o(t[u], n[u]);
      if (u in t) return o(void 0, t[u]);
    }
    var c = {
      url: i,
      method: i,
      data: i,
      baseURL: a,
      transformRequest: a,
      transformResponse: a,
      paramsSerializer: a,
      timeout: a,
      timeoutMessage: a,
      withCredentials: a,
      adapter: a,
      responseType: a,
      xsrfCookieName: a,
      xsrfHeaderName: a,
      onUploadProgress: a,
      onDownloadProgress: a,
      decompress: a,
      maxContentLength: a,
      maxBodyLength: a,
      transport: a,
      httpAgent: a,
      httpsAgent: a,
      cancelToken: a,
      socketPath: a,
      responseEncoding: a,
      validateStatus: l,
    };
    return (
      Je.forEach(Object.keys(t).concat(Object.keys(n)), function (d) {
        var h = c[d] || s,
          v = h(d);
        (Je.isUndefined(v) && h !== l) || (r[d] = v);
      }),
      r
    );
  },
  mc = { version: '0.25.0' },
  G_ = mc.version,
  yi = {};
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
  function (e, t) {
    yi[e] = function (r) {
      return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
    };
  }
);
var ul = {};
yi.transitional = function (t, n, r) {
  function o(s, i) {
    return (
      '[Axios v' +
      G_ +
      "] Transitional option '" +
      s +
      "'" +
      i +
      (r ? '. ' + r : '')
    );
  }
  return function (s, i, a) {
    if (t === !1)
      throw new Error(o(i, ' has been removed' + (n ? ' in ' + n : '')));
    return (
      n &&
        !ul[i] &&
        ((ul[i] = !0),
        console.warn(
          o(
            i,
            ' has been deprecated since v' +
              n +
              ' and will be removed in the near future'
          )
        )),
      t ? t(s, i, a) : !0
    );
  };
};
function q_(e, t, n) {
  if (typeof e != 'object') throw new TypeError('options must be an object');
  for (var r = Object.keys(e), o = r.length; o-- > 0; ) {
    var s = r[o],
      i = t[s];
    if (i) {
      var a = e[s],
        l = a === void 0 || i(a, s, e);
      if (l !== !0) throw new TypeError('option ' + s + ' must be ' + l);
      continue;
    }
    if (n !== !0) throw Error('Unknown option ' + s);
  }
}
var V_ = { assertOptions: q_, validators: yi },
  gc = Ge,
  J_ = cc,
  cl = d_,
  fl = K_,
  Co = pc,
  vc = V_,
  _n = vc.validators;
function _r(e) {
  (this.defaults = e),
    (this.interceptors = { request: new cl(), response: new cl() });
}
_r.prototype.request = function (t, n) {
  if (
    (typeof t == 'string' ? ((n = n || {}), (n.url = t)) : (n = t || {}),
    !n.url)
  )
    throw new Error('Provided config url is not valid');
  (n = Co(this.defaults, n)),
    n.method
      ? (n.method = n.method.toLowerCase())
      : this.defaults.method
      ? (n.method = this.defaults.method.toLowerCase())
      : (n.method = 'get');
  var r = n.transitional;
  r !== void 0 &&
    vc.assertOptions(
      r,
      {
        silentJSONParsing: _n.transitional(_n.boolean),
        forcedJSONParsing: _n.transitional(_n.boolean),
        clarifyTimeoutError: _n.transitional(_n.boolean),
      },
      !1
    );
  var o = [],
    s = !0;
  this.interceptors.request.forEach(function (v) {
    (typeof v.runWhen == 'function' && v.runWhen(n) === !1) ||
      ((s = s && v.synchronous), o.unshift(v.fulfilled, v.rejected));
  });
  var i = [];
  this.interceptors.response.forEach(function (v) {
    i.push(v.fulfilled, v.rejected);
  });
  var a;
  if (!s) {
    var l = [fl, void 0];
    for (
      Array.prototype.unshift.apply(l, o),
        l = l.concat(i),
        a = Promise.resolve(n);
      l.length;

    )
      a = a.then(l.shift(), l.shift());
    return a;
  }
  for (var c = n; o.length; ) {
    var u = o.shift(),
      d = o.shift();
    try {
      c = u(c);
    } catch (h) {
      d(h);
      break;
    }
  }
  try {
    a = fl(c);
  } catch (h) {
    return Promise.reject(h);
  }
  for (; i.length; ) a = a.then(i.shift(), i.shift());
  return a;
};
_r.prototype.getUri = function (t) {
  if (!t.url) throw new Error('Provided config url is not valid');
  return (
    (t = Co(this.defaults, t)),
    J_(t.url, t.params, t.paramsSerializer).replace(/^\?/, '')
  );
};
gc.forEach(['delete', 'get', 'head', 'options'], function (t) {
  _r.prototype[t] = function (n, r) {
    return this.request(
      Co(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
gc.forEach(['post', 'put', 'patch'], function (t) {
  _r.prototype[t] = function (n, r, o) {
    return this.request(Co(o || {}, { method: t, url: n, data: r }));
  };
});
var Y_ = _r,
  X_ = wo;
function Nn(e) {
  if (typeof e != 'function')
    throw new TypeError('executor must be a function.');
  var t;
  this.promise = new Promise(function (o) {
    t = o;
  });
  var n = this;
  this.promise.then(function (r) {
    if (!!n._listeners) {
      var o,
        s = n._listeners.length;
      for (o = 0; o < s; o++) n._listeners[o](r);
      n._listeners = null;
    }
  }),
    (this.promise.then = function (r) {
      var o,
        s = new Promise(function (i) {
          n.subscribe(i), (o = i);
        }).then(r);
      return (
        (s.cancel = function () {
          n.unsubscribe(o);
        }),
        s
      );
    }),
    e(function (o) {
      n.reason || ((n.reason = new X_(o)), t(n.reason));
    });
}
Nn.prototype.throwIfRequested = function () {
  if (this.reason) throw this.reason;
};
Nn.prototype.subscribe = function (t) {
  if (this.reason) {
    t(this.reason);
    return;
  }
  this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
};
Nn.prototype.unsubscribe = function (t) {
  if (!!this._listeners) {
    var n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
};
Nn.source = function () {
  var t,
    n = new Nn(function (o) {
      t = o;
    });
  return { token: n, cancel: t };
};
var Q_ = Nn,
  Z_ = function (t) {
    return function (r) {
      return t.apply(null, r);
    };
  },
  e1 = Ge,
  t1 = function (t) {
    return e1.isObject(t) && t.isAxiosError === !0;
  },
  dl = Ge,
  n1 = ic,
  Br = Y_,
  r1 = pc,
  o1 = So;
function bc(e) {
  var t = new Br(e),
    n = n1(Br.prototype.request, t);
  return (
    dl.extend(n, Br.prototype, t),
    dl.extend(n, t),
    (n.create = function (o) {
      return bc(r1(e, o));
    }),
    n
  );
}
var yt = bc(o1);
yt.Axios = Br;
yt.Cancel = wo;
yt.CancelToken = Q_;
yt.isCancel = hc;
yt.VERSION = mc.version;
yt.all = function (t) {
  return Promise.all(t);
};
yt.spread = Z_;
yt.isAxiosError = t1;
mi.exports = yt;
mi.exports.default = yt;
var J1 = mi.exports;
/*!
 * pinia v2.0.11
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ let yc;
const Ao = (e) => (yc = e),
  _c = Symbol();
function Is(e) {
  return (
    e &&
    typeof e == 'object' &&
    Object.prototype.toString.call(e) === '[object Object]' &&
    typeof e.toJSON != 'function'
  );
}
var ir;
(function (e) {
  (e.direct = 'direct'),
    (e.patchObject = 'patch object'),
    (e.patchFunction = 'patch function');
})(ir || (ir = {}));
function Y1() {
  const e = Ol(!0),
    t = e.run(() => Pt({}));
  let n = [],
    r = [];
  const o = Rn({
    install(s) {
      Ao(o),
        (o._a = s),
        s.provide(_c, o),
        (s.config.globalProperties.$pinia = o),
        r.forEach((i) => n.push(i)),
        (r = []);
    },
    use(s) {
      return !this._a && !Sv ? r.push(s) : n.push(s), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return o;
}
const Ec = () => {};
function hl(e, t, n, r = Ec) {
  e.push(t);
  const o = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), r());
  };
  return !n && kn() && ni(o), o;
}
function En(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
function ks(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n];
    Is(o) && Is(r) && !we(r) && !Ut(r) ? (e[n] = ks(o, r)) : (e[n] = r);
  }
  return e;
}
const s1 = Symbol();
function i1(e) {
  return !Is(e) || !e.hasOwnProperty(s1);
}
const { assign: At } = Object;
function a1(e) {
  return !!(we(e) && e.effect);
}
function l1(e, t, n, r) {
  const { state: o, actions: s, getters: i } = t,
    a = n.state.value[e];
  let l;
  function c() {
    a || (n.state.value[e] = o ? o() : {});
    const u = bf(n.state.value[e]);
    return At(
      u,
      s,
      Object.keys(i || {}).reduce(
        (d, h) => (
          (d[h] = Rn(
            he(() => {
              Ao(n);
              const v = n._s.get(e);
              return i[h].call(v, v);
            })
          )),
          d
        ),
        {}
      )
    );
  }
  return (
    (l = wc(e, c, t, n)),
    (l.$reset = function () {
      const d = o ? o() : {};
      this.$patch((h) => {
        At(h, d);
      });
    }),
    l
  );
}
function wc(e, t, n = {}, r, o) {
  let s;
  const i = n.state,
    a = At({ actions: {} }, n),
    l = { deep: !0 };
  let c,
    u,
    d = Rn([]),
    h = Rn([]),
    v;
  const C = r.state.value[e];
  !i && !C && (r.state.value[e] = {}), Pt({});
  function L(I) {
    let P;
    (c = u = !1),
      typeof I == 'function'
        ? (I(r.state.value[e]),
          (P = { type: ir.patchFunction, storeId: e, events: v }))
        : (ks(r.state.value[e], I),
          (P = { type: ir.patchObject, payload: I, storeId: e, events: v })),
      cr().then(() => {
        c = !0;
      }),
      (u = !0),
      En(d, P, r.state.value[e]);
  }
  const w = Ec;
  function S() {
    s.stop(), (d = []), (h = []), r._s.delete(e);
  }
  function y(I, P) {
    return function () {
      Ao(r);
      const Y = Array.from(arguments),
        Q = [],
        se = [];
      function ve(ie) {
        Q.push(ie);
      }
      function j(ie) {
        se.push(ie);
      }
      En(h, { args: Y, name: I, store: A, after: ve, onError: j });
      let Z;
      try {
        Z = P.apply(this && this.$id === e ? this : A, Y);
      } catch (ie) {
        throw (En(se, ie), ie);
      }
      return Z instanceof Promise
        ? Z.then((ie) => (En(Q, ie), ie)).catch(
            (ie) => (En(se, ie), Promise.reject(ie))
          )
        : (En(Q, Z), Z);
    };
  }
  const M = {
      _p: r,
      $id: e,
      $onAction: hl.bind(null, h),
      $patch: L,
      $reset: w,
      $subscribe(I, P = {}) {
        const Y = hl(d, I, P.detached, () => Q()),
          Q = s.run(() =>
            zt(
              () => r.state.value[e],
              (se) => {
                (P.flush === 'sync' ? u : c) &&
                  I({ storeId: e, type: ir.direct, events: v }, se);
              },
              At({}, l, P)
            )
          );
        return Y;
      },
      $dispose: S,
    },
    A = pn(At({}, M));
  r._s.set(e, A);
  const K = r._e.run(() => ((s = Ol()), s.run(() => t())));
  for (const I in K) {
    const P = K[I];
    if ((we(P) && !a1(P)) || Ut(P))
      i ||
        (C && i1(P) && (we(P) ? (P.value = C[I]) : ks(P, C[I])),
        (r.state.value[e][I] = P));
    else if (typeof P == 'function') {
      const Y = y(I, P);
      (K[I] = Y), (a.actions[I] = P);
    }
  }
  return (
    At(A, K),
    At(ne(A), K),
    Object.defineProperty(A, '$state', {
      get: () => r.state.value[e],
      set: (I) => {
        L((P) => {
          At(P, I);
        });
      },
    }),
    r._p.forEach((I) => {
      At(
        A,
        s.run(() => I({ store: A, app: r._a, pinia: r, options: a }))
      );
    }),
    C && i && n.hydrate && n.hydrate(A.$state, C),
    (c = !0),
    (u = !0),
    A
  );
}
function X1(e, t, n) {
  let r, o;
  const s = typeof t == 'function';
  typeof e == 'string' ? ((r = e), (o = s ? n : t)) : ((o = e), (r = e.id));
  function i(a, l) {
    const c = kn();
    return (
      (a = a || (c && $e(_c))),
      a && Ao(a),
      (a = yc),
      a._s.has(r) || (s ? wc(r, t, o, a) : l1(r, o, a)),
      a._s.get(r)
    );
  }
  return (i.$id = r), i;
}
/*! @license DOMPurify 2.3.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.5/LICENSE */ function u1(
  e
) {
  if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  } else return Array.from(e);
}
var c1 = Object.hasOwnProperty,
  pl = Object.setPrototypeOf,
  f1 = Object.isFrozen,
  d1 = Object.getPrototypeOf,
  h1 = Object.getOwnPropertyDescriptor,
  We = Object.freeze,
  Ot = Object.seal,
  p1 = Object.create,
  Tc = typeof Reflect != 'undefined' && Reflect,
  Zr = Tc.apply,
  Ls = Tc.construct;
Zr ||
  (Zr = function (t, n, r) {
    return t.apply(n, r);
  });
We ||
  (We = function (t) {
    return t;
  });
Ot ||
  (Ot = function (t) {
    return t;
  });
Ls ||
  (Ls = function (t, n) {
    return new (Function.prototype.bind.apply(t, [null].concat(u1(n))))();
  });
var m1 = ct(Array.prototype.forEach),
  ml = ct(Array.prototype.pop),
  qn = ct(Array.prototype.push),
  Ur = ct(String.prototype.toLowerCase),
  gl = ct(String.prototype.match),
  Lt = ct(String.prototype.replace),
  g1 = ct(String.prototype.indexOf),
  v1 = ct(String.prototype.trim),
  Ye = ct(RegExp.prototype.test),
  Xo = b1(TypeError);
function ct(e) {
  return function (t) {
    for (
      var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), o = 1;
      o < n;
      o++
    )
      r[o - 1] = arguments[o];
    return Zr(e, t, r);
  };
}
function b1(e) {
  return function () {
    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return Ls(e, n);
  };
}
function ee(e, t) {
  pl && pl(e, null);
  for (var n = t.length; n--; ) {
    var r = t[n];
    if (typeof r == 'string') {
      var o = Ur(r);
      o !== r && (f1(t) || (t[n] = o), (r = o));
    }
    e[r] = !0;
  }
  return e;
}
function Zt(e) {
  var t = p1(null),
    n = void 0;
  for (n in e) Zr(c1, e, [n]) && (t[n] = e[n]);
  return t;
}
function Lr(e, t) {
  for (; e !== null; ) {
    var n = h1(e, t);
    if (n) {
      if (n.get) return ct(n.get);
      if (typeof n.value == 'function') return ct(n.value);
    }
    e = d1(e);
  }
  function r(o) {
    return console.warn('fallback value for', o), null;
  }
  return r;
}
var vl = We([
    'a',
    'abbr',
    'acronym',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'bdi',
    'bdo',
    'big',
    'blink',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'center',
    'cite',
    'code',
    'col',
    'colgroup',
    'content',
    'data',
    'datalist',
    'dd',
    'decorator',
    'del',
    'details',
    'dfn',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'element',
    'em',
    'fieldset',
    'figcaption',
    'figure',
    'font',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'main',
    'map',
    'mark',
    'marquee',
    'menu',
    'menuitem',
    'meter',
    'nav',
    'nobr',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'section',
    'select',
    'shadow',
    'small',
    'source',
    'spacer',
    'span',
    'strike',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'tr',
    'track',
    'tt',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
  ]),
  Qo = We([
    'svg',
    'a',
    'altglyph',
    'altglyphdef',
    'altglyphitem',
    'animatecolor',
    'animatemotion',
    'animatetransform',
    'circle',
    'clippath',
    'defs',
    'desc',
    'ellipse',
    'filter',
    'font',
    'g',
    'glyph',
    'glyphref',
    'hkern',
    'image',
    'line',
    'lineargradient',
    'marker',
    'mask',
    'metadata',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialgradient',
    'rect',
    'stop',
    'style',
    'switch',
    'symbol',
    'text',
    'textpath',
    'title',
    'tref',
    'tspan',
    'view',
    'vkern',
  ]),
  Zo = We([
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
  ]),
  y1 = We([
    'animate',
    'color-profile',
    'cursor',
    'discard',
    'fedropshadow',
    'font-face',
    'font-face-format',
    'font-face-name',
    'font-face-src',
    'font-face-uri',
    'foreignobject',
    'hatch',
    'hatchpath',
    'mesh',
    'meshgradient',
    'meshpatch',
    'meshrow',
    'missing-glyph',
    'script',
    'set',
    'solidcolor',
    'unknown',
    'use',
  ]),
  es = We([
    'math',
    'menclose',
    'merror',
    'mfenced',
    'mfrac',
    'mglyph',
    'mi',
    'mlabeledtr',
    'mmultiscripts',
    'mn',
    'mo',
    'mover',
    'mpadded',
    'mphantom',
    'mroot',
    'mrow',
    'ms',
    'mspace',
    'msqrt',
    'mstyle',
    'msub',
    'msup',
    'msubsup',
    'mtable',
    'mtd',
    'mtext',
    'mtr',
    'munder',
    'munderover',
  ]),
  _1 = We([
    'maction',
    'maligngroup',
    'malignmark',
    'mlongdiv',
    'mscarries',
    'mscarry',
    'msgroup',
    'mstack',
    'msline',
    'msrow',
    'semantics',
    'annotation',
    'annotation-xml',
    'mprescripts',
    'none',
  ]),
  bl = We(['#text']),
  yl = We([
    'accept',
    'action',
    'align',
    'alt',
    'autocapitalize',
    'autocomplete',
    'autopictureinpicture',
    'autoplay',
    'background',
    'bgcolor',
    'border',
    'capture',
    'cellpadding',
    'cellspacing',
    'checked',
    'cite',
    'class',
    'clear',
    'color',
    'cols',
    'colspan',
    'controls',
    'controlslist',
    'coords',
    'crossorigin',
    'datetime',
    'decoding',
    'default',
    'dir',
    'disabled',
    'disablepictureinpicture',
    'disableremoteplayback',
    'download',
    'draggable',
    'enctype',
    'enterkeyhint',
    'face',
    'for',
    'headers',
    'height',
    'hidden',
    'high',
    'href',
    'hreflang',
    'id',
    'inputmode',
    'integrity',
    'ismap',
    'kind',
    'label',
    'lang',
    'list',
    'loading',
    'loop',
    'low',
    'max',
    'maxlength',
    'media',
    'method',
    'min',
    'minlength',
    'multiple',
    'muted',
    'name',
    'nonce',
    'noshade',
    'novalidate',
    'nowrap',
    'open',
    'optimum',
    'pattern',
    'placeholder',
    'playsinline',
    'poster',
    'preload',
    'pubdate',
    'radiogroup',
    'readonly',
    'rel',
    'required',
    'rev',
    'reversed',
    'role',
    'rows',
    'rowspan',
    'spellcheck',
    'scope',
    'selected',
    'shape',
    'size',
    'sizes',
    'span',
    'srclang',
    'start',
    'src',
    'srcset',
    'step',
    'style',
    'summary',
    'tabindex',
    'title',
    'translate',
    'type',
    'usemap',
    'valign',
    'value',
    'width',
    'xmlns',
    'slot',
  ]),
  ts = We([
    'accent-height',
    'accumulate',
    'additive',
    'alignment-baseline',
    'ascent',
    'attributename',
    'attributetype',
    'azimuth',
    'basefrequency',
    'baseline-shift',
    'begin',
    'bias',
    'by',
    'class',
    'clip',
    'clippathunits',
    'clip-path',
    'clip-rule',
    'color',
    'color-interpolation',
    'color-interpolation-filters',
    'color-profile',
    'color-rendering',
    'cx',
    'cy',
    'd',
    'dx',
    'dy',
    'diffuseconstant',
    'direction',
    'display',
    'divisor',
    'dur',
    'edgemode',
    'elevation',
    'end',
    'fill',
    'fill-opacity',
    'fill-rule',
    'filter',
    'filterunits',
    'flood-color',
    'flood-opacity',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-weight',
    'fx',
    'fy',
    'g1',
    'g2',
    'glyph-name',
    'glyphref',
    'gradientunits',
    'gradienttransform',
    'height',
    'href',
    'id',
    'image-rendering',
    'in',
    'in2',
    'k',
    'k1',
    'k2',
    'k3',
    'k4',
    'kerning',
    'keypoints',
    'keysplines',
    'keytimes',
    'lang',
    'lengthadjust',
    'letter-spacing',
    'kernelmatrix',
    'kernelunitlength',
    'lighting-color',
    'local',
    'marker-end',
    'marker-mid',
    'marker-start',
    'markerheight',
    'markerunits',
    'markerwidth',
    'maskcontentunits',
    'maskunits',
    'max',
    'mask',
    'media',
    'method',
    'mode',
    'min',
    'name',
    'numoctaves',
    'offset',
    'operator',
    'opacity',
    'order',
    'orient',
    'orientation',
    'origin',
    'overflow',
    'paint-order',
    'path',
    'pathlength',
    'patterncontentunits',
    'patterntransform',
    'patternunits',
    'points',
    'preservealpha',
    'preserveaspectratio',
    'primitiveunits',
    'r',
    'rx',
    'ry',
    'radius',
    'refx',
    'refy',
    'repeatcount',
    'repeatdur',
    'restart',
    'result',
    'rotate',
    'scale',
    'seed',
    'shape-rendering',
    'specularconstant',
    'specularexponent',
    'spreadmethod',
    'startoffset',
    'stddeviation',
    'stitchtiles',
    'stop-color',
    'stop-opacity',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke',
    'stroke-width',
    'style',
    'surfacescale',
    'systemlanguage',
    'tabindex',
    'targetx',
    'targety',
    'transform',
    'transform-origin',
    'text-anchor',
    'text-decoration',
    'text-rendering',
    'textlength',
    'type',
    'u1',
    'u2',
    'unicode',
    'values',
    'viewbox',
    'visibility',
    'version',
    'vert-adv-y',
    'vert-origin-x',
    'vert-origin-y',
    'width',
    'word-spacing',
    'wrap',
    'writing-mode',
    'xchannelselector',
    'ychannelselector',
    'x',
    'x1',
    'x2',
    'xmlns',
    'y',
    'y1',
    'y2',
    'z',
    'zoomandpan',
  ]),
  _l = We([
    'accent',
    'accentunder',
    'align',
    'bevelled',
    'close',
    'columnsalign',
    'columnlines',
    'columnspan',
    'denomalign',
    'depth',
    'dir',
    'display',
    'displaystyle',
    'encoding',
    'fence',
    'frame',
    'height',
    'href',
    'id',
    'largeop',
    'length',
    'linethickness',
    'lspace',
    'lquote',
    'mathbackground',
    'mathcolor',
    'mathsize',
    'mathvariant',
    'maxsize',
    'minsize',
    'movablelimits',
    'notation',
    'numalign',
    'open',
    'rowalign',
    'rowlines',
    'rowspacing',
    'rowspan',
    'rspace',
    'rquote',
    'scriptlevel',
    'scriptminsize',
    'scriptsizemultiplier',
    'selection',
    'separator',
    'separators',
    'stretchy',
    'subscriptshift',
    'supscriptshift',
    'symmetric',
    'voffset',
    'width',
    'xmlns',
  ]),
  Dr = We(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']),
  E1 = Ot(/\{\{[\s\S]*|[\s\S]*\}\}/gm),
  w1 = Ot(/<%[\s\S]*|[\s\S]*%>/gm),
  T1 = Ot(/^data-[\-\w.\u00B7-\uFFFF]/),
  S1 = Ot(/^aria-[\-\w]+$/),
  C1 = Ot(
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  ),
  A1 = Ot(/^(?:\w+script|data):/i),
  x1 = Ot(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
  Xn =
    typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            typeof Symbol == 'function' &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        };
function ht(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  } else return Array.from(e);
}
var R1 = function () {
    return typeof window == 'undefined' ? null : window;
  },
  $1 = function (t, n) {
    if (
      (typeof t == 'undefined' ? 'undefined' : Xn(t)) !== 'object' ||
      typeof t.createPolicy != 'function'
    )
      return null;
    var r = null,
      o = 'data-tt-policy-suffix';
    n.currentScript &&
      n.currentScript.hasAttribute(o) &&
      (r = n.currentScript.getAttribute(o));
    var s = 'dompurify' + (r ? '#' + r : '');
    try {
      return t.createPolicy(s, {
        createHTML: function (a) {
          return a;
        },
      });
    } catch {
      return (
        console.warn('TrustedTypes policy ' + s + ' could not be created.'),
        null
      );
    }
  };
function Sc() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : R1(),
    t = function (m) {
      return Sc(m);
    };
  if (
    ((t.version = '2.3.5'),
    (t.removed = []),
    !e || !e.document || e.document.nodeType !== 9)
  )
    return (t.isSupported = !1), t;
  var n = e.document,
    r = e.document,
    o = e.DocumentFragment,
    s = e.HTMLTemplateElement,
    i = e.Node,
    a = e.Element,
    l = e.NodeFilter,
    c = e.NamedNodeMap,
    u = c === void 0 ? e.NamedNodeMap || e.MozNamedAttrMap : c,
    d = e.HTMLFormElement,
    h = e.DOMParser,
    v = e.trustedTypes,
    C = a.prototype,
    L = Lr(C, 'cloneNode'),
    w = Lr(C, 'nextSibling'),
    S = Lr(C, 'childNodes'),
    y = Lr(C, 'parentNode');
  if (typeof s == 'function') {
    var M = r.createElement('template');
    M.content && M.content.ownerDocument && (r = M.content.ownerDocument);
  }
  var A = $1(v, n),
    K = A ? A.createHTML('') : '',
    I = r,
    P = I.implementation,
    Y = I.createNodeIterator,
    Q = I.createDocumentFragment,
    se = I.getElementsByTagName,
    ve = n.importNode,
    j = {};
  try {
    j = Zt(r).documentMode ? r.documentMode : {};
  } catch {}
  var Z = {};
  t.isSupported =
    typeof y == 'function' &&
    P &&
    typeof P.createHTMLDocument != 'undefined' &&
    j !== 9;
  var ie = E1,
    qe = w1,
    Ee = T1,
    pe = S1,
    fe = A1,
    Be = x1,
    ft = C1,
    be = null,
    Ve = ee({}, [].concat(ht(vl), ht(Qo), ht(Zo), ht(es), ht(bl))),
    ce = null,
    gn = ee({}, [].concat(ht(yl), ht(ts), ht(_l), ht(Dr))),
    b = Object.seal(
      Object.create(null, {
        tagNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        attributeNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        allowCustomizedBuiltInElements: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: !1,
        },
      })
    ),
    D = null,
    N = null,
    B = !0,
    ae = !0,
    de = !1,
    J = !1,
    q = !1,
    f = !1,
    p = !1,
    g = !1,
    E = !1,
    _ = !1,
    $ = !0,
    k = !0,
    x = !1,
    R = {},
    T = null,
    U = ee({}, [
      'annotation-xml',
      'audio',
      'colgroup',
      'desc',
      'foreignobject',
      'head',
      'iframe',
      'math',
      'mi',
      'mn',
      'mo',
      'ms',
      'mtext',
      'noembed',
      'noframes',
      'noscript',
      'plaintext',
      'script',
      'style',
      'svg',
      'template',
      'thead',
      'title',
      'video',
      'xmp',
    ]),
    H = null,
    z = ee({}, ['audio', 'video', 'img', 'source', 'image', 'track']),
    G = null,
    te = ee({}, [
      'alt',
      'class',
      'for',
      'id',
      'label',
      'name',
      'pattern',
      'placeholder',
      'role',
      'summary',
      'title',
      'value',
      'style',
      'xmlns',
    ]),
    me = 'http://www.w3.org/1998/Math/MathML',
    le = 'http://www.w3.org/2000/svg',
    re = 'http://www.w3.org/1999/xhtml',
    Le = re,
    dt = !1,
    _t = void 0,
    qt = ['application/xhtml+xml', 'text/html'],
    Er = 'text/html',
    Ce = void 0,
    Pe = null,
    wr = r.createElement('form'),
    _i = function (m) {
      return m instanceof RegExp || m instanceof Function;
    },
    xo = function (m) {
      (Pe && Pe === m) ||
        ((!m || (typeof m == 'undefined' ? 'undefined' : Xn(m)) !== 'object') &&
          (m = {}),
        (m = Zt(m)),
        (be = 'ALLOWED_TAGS' in m ? ee({}, m.ALLOWED_TAGS) : Ve),
        (ce = 'ALLOWED_ATTR' in m ? ee({}, m.ALLOWED_ATTR) : gn),
        (G = 'ADD_URI_SAFE_ATTR' in m ? ee(Zt(te), m.ADD_URI_SAFE_ATTR) : te),
        (H = 'ADD_DATA_URI_TAGS' in m ? ee(Zt(z), m.ADD_DATA_URI_TAGS) : z),
        (T = 'FORBID_CONTENTS' in m ? ee({}, m.FORBID_CONTENTS) : U),
        (D = 'FORBID_TAGS' in m ? ee({}, m.FORBID_TAGS) : {}),
        (N = 'FORBID_ATTR' in m ? ee({}, m.FORBID_ATTR) : {}),
        (R = 'USE_PROFILES' in m ? m.USE_PROFILES : !1),
        (B = m.ALLOW_ARIA_ATTR !== !1),
        (ae = m.ALLOW_DATA_ATTR !== !1),
        (de = m.ALLOW_UNKNOWN_PROTOCOLS || !1),
        (J = m.SAFE_FOR_TEMPLATES || !1),
        (q = m.WHOLE_DOCUMENT || !1),
        (g = m.RETURN_DOM || !1),
        (E = m.RETURN_DOM_FRAGMENT || !1),
        (_ = m.RETURN_TRUSTED_TYPE || !1),
        (p = m.FORCE_BODY || !1),
        ($ = m.SANITIZE_DOM !== !1),
        (k = m.KEEP_CONTENT !== !1),
        (x = m.IN_PLACE || !1),
        (ft = m.ALLOWED_URI_REGEXP || ft),
        (Le = m.NAMESPACE || re),
        m.CUSTOM_ELEMENT_HANDLING &&
          _i(m.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
          (b.tagNameCheck = m.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
        m.CUSTOM_ELEMENT_HANDLING &&
          _i(m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
          (b.attributeNameCheck = m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
        m.CUSTOM_ELEMENT_HANDLING &&
          typeof m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements ==
            'boolean' &&
          (b.allowCustomizedBuiltInElements =
            m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
        (_t =
          qt.indexOf(m.PARSER_MEDIA_TYPE) === -1
            ? (_t = Er)
            : (_t = m.PARSER_MEDIA_TYPE)),
        (Ce =
          _t === 'application/xhtml+xml'
            ? function (O) {
                return O;
              }
            : Ur),
        J && (ae = !1),
        E && (g = !0),
        R &&
          ((be = ee({}, [].concat(ht(bl)))),
          (ce = []),
          R.html === !0 && (ee(be, vl), ee(ce, yl)),
          R.svg === !0 && (ee(be, Qo), ee(ce, ts), ee(ce, Dr)),
          R.svgFilters === !0 && (ee(be, Zo), ee(ce, ts), ee(ce, Dr)),
          R.mathMl === !0 && (ee(be, es), ee(ce, _l), ee(ce, Dr))),
        m.ADD_TAGS && (be === Ve && (be = Zt(be)), ee(be, m.ADD_TAGS)),
        m.ADD_ATTR && (ce === gn && (ce = Zt(ce)), ee(ce, m.ADD_ATTR)),
        m.ADD_URI_SAFE_ATTR && ee(G, m.ADD_URI_SAFE_ATTR),
        m.FORBID_CONTENTS && (T === U && (T = Zt(T)), ee(T, m.FORBID_CONTENTS)),
        k && (be['#text'] = !0),
        q && ee(be, ['html', 'head', 'body']),
        be.table && (ee(be, ['tbody']), delete D.tbody),
        We && We(m),
        (Pe = m));
    },
    Ei = ee({}, ['mi', 'mo', 'mn', 'ms', 'mtext']),
    wi = ee({}, ['foreignobject', 'desc', 'title', 'annotation-xml']),
    Tr = ee({}, Qo);
  ee(Tr, Zo), ee(Tr, y1);
  var Ro = ee({}, es);
  ee(Ro, _1);
  var Cc = function (m) {
      var O = y(m);
      (!O || !O.tagName) && (O = { namespaceURI: re, tagName: 'template' });
      var F = Ur(m.tagName),
        ge = Ur(O.tagName);
      if (m.namespaceURI === le)
        return O.namespaceURI === re
          ? F === 'svg'
          : O.namespaceURI === me
          ? F === 'svg' && (ge === 'annotation-xml' || Ei[ge])
          : Boolean(Tr[F]);
      if (m.namespaceURI === me)
        return O.namespaceURI === re
          ? F === 'math'
          : O.namespaceURI === le
          ? F === 'math' && wi[ge]
          : Boolean(Ro[F]);
      if (m.namespaceURI === re) {
        if (
          (O.namespaceURI === le && !wi[ge]) ||
          (O.namespaceURI === me && !Ei[ge])
        )
          return !1;
        var De = ee({}, ['title', 'style', 'font', 'a', 'script']);
        return !Ro[F] && (De[F] || !Tr[F]);
      }
      return !1;
    },
    Et = function (m) {
      qn(t.removed, { element: m });
      try {
        m.parentNode.removeChild(m);
      } catch {
        try {
          m.outerHTML = K;
        } catch {
          m.remove();
        }
      }
    },
    Ti = function (m, O) {
      try {
        qn(t.removed, { attribute: O.getAttributeNode(m), from: O });
      } catch {
        qn(t.removed, { attribute: null, from: O });
      }
      if ((O.removeAttribute(m), m === 'is' && !ce[m]))
        if (g || E)
          try {
            Et(O);
          } catch {}
        else
          try {
            O.setAttribute(m, '');
          } catch {}
    },
    Si = function (m) {
      var O = void 0,
        F = void 0;
      if (p) m = '<remove></remove>' + m;
      else {
        var ge = gl(m, /^[\r\n\t ]+/);
        F = ge && ge[0];
      }
      _t === 'application/xhtml+xml' &&
        (m =
          '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
          m +
          '</body></html>');
      var De = A ? A.createHTML(m) : m;
      if (Le === re)
        try {
          O = new h().parseFromString(De, _t);
        } catch {}
      if (!O || !O.documentElement) {
        O = P.createDocument(Le, 'template', null);
        try {
          O.documentElement.innerHTML = dt ? '' : De;
        } catch {}
      }
      var Fe = O.body || O.documentElement;
      return (
        m &&
          F &&
          Fe.insertBefore(r.createTextNode(F), Fe.childNodes[0] || null),
        Le === re
          ? se.call(O, q ? 'html' : 'body')[0]
          : q
          ? O.documentElement
          : Fe
      );
    },
    Ci = function (m) {
      return Y.call(
        m.ownerDocument || m,
        m,
        l.SHOW_ELEMENT | l.SHOW_COMMENT | l.SHOW_TEXT,
        null,
        !1
      );
    },
    Ac = function (m) {
      return (
        m instanceof d &&
        (typeof m.nodeName != 'string' ||
          typeof m.textContent != 'string' ||
          typeof m.removeChild != 'function' ||
          !(m.attributes instanceof u) ||
          typeof m.removeAttribute != 'function' ||
          typeof m.setAttribute != 'function' ||
          typeof m.namespaceURI != 'string' ||
          typeof m.insertBefore != 'function')
      );
    },
    zn = function (m) {
      return (typeof i == 'undefined' ? 'undefined' : Xn(i)) === 'object'
        ? m instanceof i
        : m &&
            (typeof m == 'undefined' ? 'undefined' : Xn(m)) === 'object' &&
            typeof m.nodeType == 'number' &&
            typeof m.nodeName == 'string';
    },
    wt = function (m, O, F) {
      !Z[m] ||
        m1(Z[m], function (ge) {
          ge.call(t, O, F, Pe);
        });
    },
    Ai = function (m) {
      var O = void 0;
      if (
        (wt('beforeSanitizeElements', m, null),
        Ac(m) || gl(m.nodeName, /[\u0080-\uFFFF]/))
      )
        return Et(m), !0;
      var F = Ce(m.nodeName);
      if (
        (wt('uponSanitizeElement', m, { tagName: F, allowedTags: be }),
        (!zn(m.firstElementChild) &&
          (!zn(m.content) || !zn(m.content.firstElementChild)) &&
          Ye(/<[/\w]/g, m.innerHTML) &&
          Ye(/<[/\w]/g, m.textContent)) ||
          (F === 'select' && Ye(/<template/i, m.innerHTML)))
      )
        return Et(m), !0;
      if (!be[F] || D[F]) {
        if (k && !T[F]) {
          var ge = y(m) || m.parentNode,
            De = S(m) || m.childNodes;
          if (De && ge)
            for (var Fe = De.length, Me = Fe - 1; Me >= 0; --Me)
              ge.insertBefore(L(De[Me], !0), w(m));
        }
        return !D[F] &&
          Ri(F) &&
          ((b.tagNameCheck instanceof RegExp && Ye(b.tagNameCheck, F)) ||
            (b.tagNameCheck instanceof Function && b.tagNameCheck(F)))
          ? !1
          : (Et(m), !0);
      }
      return (m instanceof a && !Cc(m)) ||
        ((F === 'noscript' || F === 'noembed') &&
          Ye(/<\/no(script|embed)/i, m.innerHTML))
        ? (Et(m), !0)
        : (J &&
            m.nodeType === 3 &&
            ((O = m.textContent),
            (O = Lt(O, ie, ' ')),
            (O = Lt(O, qe, ' ')),
            m.textContent !== O &&
              (qn(t.removed, { element: m.cloneNode() }), (m.textContent = O))),
          wt('afterSanitizeElements', m, null),
          !1);
    },
    xi = function (m, O, F) {
      if ($ && (O === 'id' || O === 'name') && (F in r || F in wr)) return !1;
      if (!(ae && !N[O] && Ye(Ee, O))) {
        if (!(B && Ye(pe, O))) {
          if (!ce[O] || N[O]) {
            if (
              !(
                (Ri(m) &&
                  ((b.tagNameCheck instanceof RegExp &&
                    Ye(b.tagNameCheck, m)) ||
                    (b.tagNameCheck instanceof Function &&
                      b.tagNameCheck(m))) &&
                  ((b.attributeNameCheck instanceof RegExp &&
                    Ye(b.attributeNameCheck, O)) ||
                    (b.attributeNameCheck instanceof Function &&
                      b.attributeNameCheck(O)))) ||
                (O === 'is' &&
                  b.allowCustomizedBuiltInElements &&
                  ((b.tagNameCheck instanceof RegExp &&
                    Ye(b.tagNameCheck, F)) ||
                    (b.tagNameCheck instanceof Function && b.tagNameCheck(F))))
              )
            )
              return !1;
          } else if (!G[O]) {
            if (!Ye(ft, Lt(F, Be, ''))) {
              if (
                !(
                  (O === 'src' || O === 'xlink:href' || O === 'href') &&
                  m !== 'script' &&
                  g1(F, 'data:') === 0 &&
                  H[m]
                )
              ) {
                if (!(de && !Ye(fe, Lt(F, Be, '')))) {
                  if (F) return !1;
                }
              }
            }
          }
        }
      }
      return !0;
    },
    Ri = function (m) {
      return m.indexOf('-') > 0;
    },
    $i = function (m) {
      var O = void 0,
        F = void 0,
        ge = void 0,
        De = void 0;
      wt('beforeSanitizeAttributes', m, null);
      var Fe = m.attributes;
      if (!!Fe) {
        var Me = {
          attrName: '',
          attrValue: '',
          keepAttr: !0,
          allowedAttributes: ce,
        };
        for (De = Fe.length; De--; ) {
          O = Fe[De];
          var Sr = O,
            tt = Sr.name,
            Oi = Sr.namespaceURI;
          if (
            ((F = v1(O.value)),
            (ge = Ce(tt)),
            (Me.attrName = ge),
            (Me.attrValue = F),
            (Me.keepAttr = !0),
            (Me.forceKeepAttr = void 0),
            wt('uponSanitizeAttribute', m, Me),
            (F = Me.attrValue),
            !Me.forceKeepAttr && (Ti(tt, m), !!Me.keepAttr))
          ) {
            if (Ye(/\/>/i, F)) {
              Ti(tt, m);
              continue;
            }
            J && ((F = Lt(F, ie, ' ')), (F = Lt(F, qe, ' ')));
            var Rc = Ce(m.nodeName);
            if (!!xi(Rc, ge, F))
              try {
                Oi ? m.setAttributeNS(Oi, tt, F) : m.setAttribute(tt, F),
                  ml(t.removed);
              } catch {}
          }
        }
        wt('afterSanitizeAttributes', m, null);
      }
    },
    xc = function W(m) {
      var O = void 0,
        F = Ci(m);
      for (wt('beforeSanitizeShadowDOM', m, null); (O = F.nextNode()); )
        wt('uponSanitizeShadowNode', O, null),
          !Ai(O) && (O.content instanceof o && W(O.content), $i(O));
      wt('afterSanitizeShadowDOM', m, null);
    };
  return (
    (t.sanitize = function (W, m) {
      var O = void 0,
        F = void 0,
        ge = void 0,
        De = void 0,
        Fe = void 0;
      if (((dt = !W), dt && (W = '<!-->'), typeof W != 'string' && !zn(W))) {
        if (typeof W.toString != 'function')
          throw Xo('toString is not a function');
        if (((W = W.toString()), typeof W != 'string'))
          throw Xo('dirty is not a string, aborting');
      }
      if (!t.isSupported) {
        if (
          Xn(e.toStaticHTML) === 'object' ||
          typeof e.toStaticHTML == 'function'
        ) {
          if (typeof W == 'string') return e.toStaticHTML(W);
          if (zn(W)) return e.toStaticHTML(W.outerHTML);
        }
        return W;
      }
      if ((f || xo(m), (t.removed = []), typeof W == 'string' && (x = !1), x)) {
        if (W.nodeName) {
          var Me = Ce(W.nodeName);
          if (!be[Me] || D[Me])
            throw Xo('root node is forbidden and cannot be sanitized in-place');
        }
      } else if (W instanceof i)
        (O = Si('<!---->')),
          (F = O.ownerDocument.importNode(W, !0)),
          (F.nodeType === 1 && F.nodeName === 'BODY') || F.nodeName === 'HTML'
            ? (O = F)
            : O.appendChild(F);
      else {
        if (!g && !J && !q && W.indexOf('<') === -1)
          return A && _ ? A.createHTML(W) : W;
        if (((O = Si(W)), !O)) return g ? null : _ ? K : '';
      }
      O && p && Et(O.firstChild);
      for (var Sr = Ci(x ? W : O); (ge = Sr.nextNode()); )
        (ge.nodeType === 3 && ge === De) ||
          Ai(ge) ||
          (ge.content instanceof o && xc(ge.content), $i(ge), (De = ge));
      if (((De = null), x)) return W;
      if (g) {
        if (E)
          for (Fe = Q.call(O.ownerDocument); O.firstChild; )
            Fe.appendChild(O.firstChild);
        else Fe = O;
        return ce.shadowroot && (Fe = ve.call(n, Fe, !0)), Fe;
      }
      var tt = q ? O.outerHTML : O.innerHTML;
      return (
        J && ((tt = Lt(tt, ie, ' ')), (tt = Lt(tt, qe, ' '))),
        A && _ ? A.createHTML(tt) : tt
      );
    }),
    (t.setConfig = function (W) {
      xo(W), (f = !0);
    }),
    (t.clearConfig = function () {
      (Pe = null), (f = !1);
    }),
    (t.isValidAttribute = function (W, m, O) {
      Pe || xo({});
      var F = Ce(W),
        ge = Ce(m);
      return xi(F, ge, O);
    }),
    (t.addHook = function (W, m) {
      typeof m == 'function' && ((Z[W] = Z[W] || []), qn(Z[W], m));
    }),
    (t.removeHook = function (W) {
      Z[W] && ml(Z[W]);
    }),
    (t.removeHooks = function (W) {
      Z[W] && (Z[W] = []);
    }),
    (t.removeAllHooks = function () {
      Z = {};
    }),
    t
  );
}
var O1 = Sc();
function P1(e, t) {
  var n;
  const r = (n = e.hooks) != null ? n : {};
  let o;
  for (o in r) {
    const s = r[o];
    s !== void 0 && t.addHook(o, s);
  }
}
function M1(e = {}) {
  const t = O1();
  P1(e, t);
  const n = function (r, o) {
    var s, i;
    const a = o.arg,
      l = e.namedConfigurations,
      c = (s = e.default) != null ? s : {};
    if (l && a !== void 0) {
      r.innerHTML = t.sanitize(o.value, (i = l[a]) != null ? i : c);
      return;
    }
    r.innerHTML = t.sanitize(o.value, c);
  };
  return { mounted: n, updated: n };
}
const Q1 = {
  install(e, t = {}) {
    e.directive('dompurify-html', M1(t));
  },
};
export {
  Q1 as A,
  z1 as B,
  X1 as C,
  G1 as D,
  V1 as E,
  Ke as F,
  W1 as G,
  I1 as K,
  F1 as T,
  qi as a,
  J1 as b,
  Cn as c,
  vt as d,
  pn as e,
  Gf as f,
  ni as g,
  L1 as h,
  ze as i,
  je as j,
  k1 as k,
  D1 as l,
  xe as m,
  q1 as n,
  Ae as o,
  Eu as p,
  ue as q,
  vu as r,
  K1 as s,
  wl as t,
  U1 as u,
  B1 as v,
  us as w,
  j1 as x,
  Y1 as y,
  H1 as z,
};
