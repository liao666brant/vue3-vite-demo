import { createRouter, createWebHistory } from 'vue-router';

import { routes } from './routeConfig';

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory('/vue3-vite-demo'),
  routes,
});

router.beforeEach((to) => {
  console.log('[ to-beforeEach ] 🚀');
  // console.log('[ to ] 🚀, ', JSON.parse(JSON.stringify(to)));
  // console.log('[ from ] 🚀, ', JSON.parse(JSON.stringify(from)));
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  if (to.matched.length === 0) {
    return '/';
  }
  if (to.name === 'NewsDetail') {
    if (Object.keys(to.params).length === 1) {
      return '/';
    }
  }
});

export default router;
