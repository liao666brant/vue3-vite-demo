if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let c={};const t=e=>i(e,l),u={module:{uri:l},exports:c,require:t};s[l]=Promise.all(n.map((e=>u[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-c193c916"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.30d94c43.css",revision:null},{url:"assets/index.379484f5.js",revision:null},{url:"assets/index.47f2f9ac.js",revision:null},{url:"assets/index.499ca9fa.js",revision:null},{url:"assets/index.4e45f7ac.css",revision:null},{url:"assets/index.592da04c.js",revision:null},{url:"assets/index.f3d5bec9.css",revision:null},{url:"assets/vendor.071d9c39.js",revision:null},{url:"assets/vendor.44945405.css",revision:null},{url:"index.html",revision:"282f2a62801117e3b3f746af7d4b365e"},{url:"registerSW.js",revision:"29b0a536ff72b874a8c562cf2404a1ff"},{url:"manifest.webmanifest",revision:"8d64ab248350ff40ed7ef92b4203255c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/.*?/i,new e.CacheFirst({cacheName:"interface-cache",plugins:[]}),"GET"),e.registerRoute(/(.*?)\.(js|css|ts)/,new e.CacheFirst({cacheName:"js-css-cache",plugins:[]}),"GET"),e.registerRoute(/(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,new e.CacheFirst({cacheName:"image-cache",plugins:[]}),"GET")}));
