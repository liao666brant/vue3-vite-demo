if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, l) => {
    const r =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[r]) return;
    let c = {};
    const t = (e) => i(e, r),
      u = { module: { uri: r }, exports: c, require: t };
    s[r] = Promise.all(n.map((e) => u[e] || t(e))).then((e) => (l(...e), c));
  };
}
define(['./workbox-c193c916'], function (e) {
  'use strict';
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: 'assets/index.0e04599b.js', revision: null },
        { url: 'assets/index.0e3d42a3.css', revision: null },
        { url: 'assets/index.3c7c5e6b.css', revision: null },
        { url: 'assets/index.4a19b068.js', revision: null },
        { url: 'assets/index.57c54ce9.js', revision: null },
        { url: 'assets/index.62543573.js', revision: null },
        { url: 'assets/index.89ac82e3.css', revision: null },
        { url: 'assets/index.9689396f.js', revision: null },
        { url: 'assets/index.b0fc25b3.css', revision: null },
        { url: 'assets/index.b7d5c6ea.css', revision: null },
        { url: 'assets/index.dd8d47c3.js', revision: null },
        { url: 'assets/vendor.08e39216.css', revision: null },
        { url: 'assets/vendor.88f433db.js', revision: null },
        { url: 'index.html', revision: 'a3c34ec375cb714c8f4b0a0d6efca990' },
        { url: 'registerSW.js', revision: '29b0a536ff72b874a8c562cf2404a1ff' },
        {
          url: 'manifest.webmanifest',
          revision: '8d64ab248350ff40ed7ef92b4203255c',
        },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL('index.html'))
    ),
    e.registerRoute(
      /.*?/i,
      new e.CacheFirst({ cacheName: 'interface-cache', plugins: [] }),
      'GET'
    ),
    e.registerRoute(
      /(.*?)\.(js|css|ts)/,
      new e.CacheFirst({ cacheName: 'js-css-cache', plugins: [] }),
      'GET'
    ),
    e.registerRoute(
      /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
      new e.CacheFirst({ cacheName: 'image-cache', plugins: [] }),
      'GET'
    );
});
