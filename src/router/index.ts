import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/Home/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { keepAlive: true },
  },
  {
    path: '/news/:contentId',
    name: 'NewsDetail',
    component: () => import('@/pages/NewsDetail/index.vue'),
    meta: { keepAlive: false },
  },
  {
    path: '/other',
    name: 'Other',
    component: () => import('@/pages/Other/index.vue'),
    meta: { keepAlive: false },
  },
];

const router = createRouter({
  history: createWebHashHistory('/vue3-vite-demo/'),
  routes,
});

export default router;
