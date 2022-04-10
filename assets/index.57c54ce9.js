var T = Object.defineProperty,
  V = Object.defineProperties;
var R = Object.getOwnPropertyDescriptors;
var h = Object.getOwnPropertySymbols;
var B = Object.prototype.hasOwnProperty,
  F = Object.prototype.propertyIsEnumerable;
var v = (n, t, e) =>
    t in n
      ? T(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
      : (n[t] = e),
  f = (n, t) => {
    for (var e in t || (t = {})) B.call(t, e) && v(n, e, t[e]);
    if (h) for (var e of h(t)) F.call(t, e) && v(n, e, t[e]);
    return n;
  },
  y = (n, t) => V(n, R(t));
import {
  d as D,
  r as A,
  o as c,
  c as u,
  w as d,
  K as S,
  a as $,
  b as j,
  e as q,
  u as K,
  f as M,
  g as W,
  h as z,
  E as G,
  i as g,
  j as w,
  k as E,
  F as J,
  l as U,
  m as Q,
  T as X,
  n as Y,
  p as Z,
  t as N,
  q as k,
  s as ee,
  v as te,
  x as oe,
  y as ne,
  z as se,
  A as re,
} from './vendor.88f433db.js';
const ae = function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
  new MutationObserver((o) => {
    for (const r of o)
      if (r.type === 'childList')
        for (const a of r.addedNodes)
          a.tagName === 'LINK' && a.rel === 'modulepreload' && s(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(o) {
    const r = {};
    return (
      o.integrity && (r.integrity = o.integrity),
      o.referrerpolicy && (r.referrerPolicy = o.referrerpolicy),
      o.crossorigin === 'use-credentials'
        ? (r.credentials = 'include')
        : o.crossorigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function s(o) {
    if (o.ep) return;
    o.ep = !0;
    const r = e(o);
    fetch(o.href, r);
  }
};
ae();
const ie = D({
    setup(n) {
      return (t, e) => {
        const s = A('router-view');
        return (
          c(),
          u(s, null, {
            default: d(({ Component: o }) => [
              (c(), u(S, { include: ['HomePage'] }, [(c(), u($(o)))], 1024)),
            ]),
            _: 1,
          })
        );
      };
    },
  }),
  ce = 'modulepreload',
  L = {},
  le = '/vue3-vite-demo/',
  l = function (t, e) {
    return !e || e.length === 0
      ? t()
      : Promise.all(
          e.map((s) => {
            if (((s = `${le}${s}`), s in L)) return;
            L[s] = !0;
            const o = s.endsWith('.css'),
              r = o ? '[rel="stylesheet"]' : '';
            if (document.querySelector(`link[href="${s}"]${r}`)) return;
            const a = document.createElement('link');
            if (
              ((a.rel = o ? 'stylesheet' : ce),
              o || ((a.as = 'script'), (a.crossOrigin = '')),
              (a.href = s),
              document.head.appendChild(a),
              o)
            )
              return new Promise((p, i) => {
                a.addEventListener('load', p), a.addEventListener('error', i);
              });
          })
        ).then(() => t());
  },
  ue = async () => {
    const n =
        'https://cdn.mdeer.com/contentdtos.js?callback=callbackcontentdtos&t=1628318435956&_=1628318432739',
      { data: t } = await j.get(n),
      e = t.slice(20, t.length - 1);
    return JSON.parse(e);
  };
var _e = (n, t) => {
  const e = n.__vccOpts || n;
  for (const [s, o] of t) e[s] = o;
  return e;
};
const de = { class: 'container' },
  me = ['onClick'],
  pe = { class: 'author-name' },
  fe = { name: 'HomePage' },
  he = D(
    y(f({}, fe), {
      setup(n, { expose: t }) {
        const e = q({ newList: [], loadNews: [] }),
          s = K();
        let o = !1;
        const r = async () => {
            console.log('[ getInfo ] \u{1F680}, ');
            const i = await ue();
            (e.newList = i), (e.loadNews = i.slice(0, 10)), (o = !0);
          },
          a = (i) => {
            s.push({ name: 'NewsDetail', params: f({}, i) });
          },
          p = () => {
            console.log('[ load ] \u{1F680}');
            const i = e.loadNews.length;
            o === !0 &&
              (e.loadNews.push(...e.newList.slice(i, i + 5)),
              console.log('[ state.loadNews ] \u{1F680}, ', e.loadNews.length));
          };
        return (
          t({ name: 'Home' }),
          M(() => {
            r();
          }),
          W(() => {
            console.log('Home\u9500\u6BC1\u4E86');
          }),
          (i, we) => {
            const P = A('router-view'),
              b = ee,
              C = Y,
              I = z('dompurify-html'),
              x = G;
            return (
              c(),
              g('main', de, [
                w(P),
                E(
                  (c(),
                  u(
                    X,
                    {
                      tag: 'ul',
                      name: 'list',
                      class: 'infinite-list',
                      'infinite-scroll-delay': 500,
                    },
                    {
                      default: d(() => [
                        (c(!0),
                        g(
                          J,
                          null,
                          U(
                            Q(e).loadNews,
                            (_, H) => (
                              c(),
                              u(
                                b,
                                { key: H, class: 'news-card' },
                                {
                                  header: d(() => [Z(N(_.title), 1)]),
                                  default: d(() => [
                                    E(
                                      k(
                                        'div',
                                        {
                                          class: 'content',
                                          onClick: (Ee) => a(_),
                                        },
                                        null,
                                        8,
                                        me
                                      ),
                                      [[I, _.articleAbstract]]
                                    ),
                                    k('div', pe, N(_.authorName), 1),
                                  ]),
                                  _: 2,
                                },
                                1024
                              )
                            )
                          ),
                          128
                        )),
                        w(C, {
                          key: 'empty',
                          description: '\u6CA1\u6709\u4E86\u5462~~',
                        }),
                      ]),
                      _: 1,
                    }
                  )),
                  [[x, p]]
                ),
              ])
            );
          }
        );
      },
    })
  );
var ve = _e(he, [['__scopeId', 'data-v-0ab3d43b']]);
const ye = [
    {
      path: '/',
      name: 'Home',
      component: ve,
      meta: { keepAlive: !0 },
      children: [
        {
          path: '/home/detail',
          name: 'HomeDetail',
          component: () =>
            l(
              () => import('./index.dd8d47c3.js'),
              [
                'assets/index.dd8d47c3.js',
                'assets/vendor.88f433db.js',
                'assets/vendor.08e39216.css',
              ]
            ),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () =>
        l(
          () => import('./index.4a19b068.js'),
          [
            'assets/index.4a19b068.js',
            'assets/index.b0fc25b3.css',
            'assets/vendor.88f433db.js',
            'assets/vendor.08e39216.css',
          ]
        ),
    },
    {
      path: '/news/:contentId',
      name: 'NewsDetail',
      component: () =>
        l(
          () => import('./index.9689396f.js'),
          [
            'assets/index.9689396f.js',
            'assets/index.b7d5c6ea.css',
            'assets/vendor.88f433db.js',
            'assets/vendor.08e39216.css',
          ]
        ),
      meta: { keepAlive: !1 },
    },
    {
      path: '/other',
      name: 'Other',
      component: () =>
        l(
          () => import('./index.0e04599b.js'),
          [
            'assets/index.0e04599b.js',
            'assets/index.0e3d42a3.css',
            'assets/vendor.88f433db.js',
            'assets/vendor.08e39216.css',
          ]
        ),
      meta: { keepAlive: !1 },
      children: [
        {
          path: '/other/why',
          name: 'Why',
          component: () =>
            l(
              () => import('./index.62543573.js'),
              [
                'assets/index.62543573.js',
                'assets/index.89ac82e3.css',
                'assets/vendor.88f433db.js',
                'assets/vendor.08e39216.css',
              ]
            ),
        },
      ],
    },
  ],
  O = te({ history: oe(), routes: ye });
O.beforeEach((n, t) => {
  if (
    n.matched.length === 0 ||
    (n.name === 'NewsDetail' && Object.keys(n.params).length === 1)
  )
    return '/';
});
const ge = ne(),
  m = se(ie);
m.use(re);
m.use(O);
m.use(ge);
m.mount('#app');
export { _e as _ };
