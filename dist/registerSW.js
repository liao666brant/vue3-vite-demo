if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/vue3-vite-demo/sw.js', { scope: '/vue3-vite-demo/' })})}