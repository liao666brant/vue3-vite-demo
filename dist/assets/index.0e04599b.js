import {
  C as l,
  d as u,
  u as i,
  g as d,
  D as _,
  G as m,
  r as p,
  o as h,
  i as v,
  q as f,
  t as g,
  m as B,
  j as e,
  w as C,
  F as y,
  p as w,
} from './vendor.88f433db.js';
const x = l('main', {
    state: () => ({ test: 'Hello World', count: 0 }),
    getters: {},
    actions: {},
  }),
  D = w('to Why'),
  S = u({
    setup(E, { expose: n }) {
      const s = i(),
        t = x();
      console.log('[ store ] \u{1F680}, ', t);
      const r = () => {
        s.push({ name: 'Why' });
      };
      return (
        d(() => {
          console.log('Other\u9500\u6BC1\u4E86');
        }),
        n({ name: 'Other' }),
        (k, F) => {
          const o = _,
            a = m,
            c = p('router-view');
          return (
            h(),
            v(
              y,
              null,
              [
                f('div', null, g(B(t).test), 1),
                e(o),
                e(
                  a,
                  { type: 'primary', size: 'default', onClick: r },
                  { default: C(() => [D]), _: 1 }
                ),
                e(o),
                e(c),
              ],
              64
            )
          );
        }
      );
    },
  });
export { S as default };
