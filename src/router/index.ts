import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routeConfig';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // console.log('[ to ] 🚀, ', JSON.parse(JSON.stringify(to)));
  // console.log('[ from ] 🚀, ', JSON.parse(JSON.stringify(from)));
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
