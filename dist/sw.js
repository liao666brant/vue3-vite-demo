if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const u=e=>i(e,r),t={module:{uri:r},exports:c,require:u};s[r]=Promise.all(n.map((e=>t[e]||u(e)))).then((e=>(l(...e),c)))}}define(["./workbox-c193c916"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.0e3d42a3.css",revision:null},{url:"assets/index.2bb89541.css",revision:null},{url:"assets/index.2caae85b.css",revision:null},{url:"assets/index.2f359768.js",revision:null},{url:"assets/index.3c74645c.css",revision:null},{url:"assets/index.46669604.js",revision:null},{url:"assets/index.5638efd1.js",revision:null},{url:"assets/index.9e0a26d5.js",revision:null},{url:"assets/index.b797ec00.css",revision:null},{url:"assets/index.bf41964f.js",revision:null},{url:"assets/index.d7f1a2d8.css",revision:null},{url:"assets/index.e12e3d7e.js",revision:null},{url:"assets/index.e2f6344f.js",revision:null},{url:"assets/vendor.08e39216.css",revision:null},{url:"assets/vendor.225fbe0f.js",revision:null},{url:"index.html",revision:"07d461dcba90c542c95addc6f0ef57ae"},{url:"registerSW.js",revision:"29b0a536ff72b874a8c562cf2404a1ff"},{url:"favicon.svg",revision:"b5b9a72ee023e36a19a1830bdd0c4b18"},{url:"manifest.webmanifest",revision:"8d64ab248350ff40ed7ef92b4203255c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/.*?/i,new e.CacheFirst({cacheName:"interface-cache",plugins:[]}),"GET"),e.registerRoute(/(.*?)\.(js|css|ts)/,new e.CacheFirst({cacheName:"js-css-cache",plugins:[]}),"GET"),e.registerRoute(/(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,new e.CacheFirst({cacheName:"image-cache",plugins:[]}),"GET")}));