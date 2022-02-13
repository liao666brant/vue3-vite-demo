import { RouteRecordRaw } from 'vue-router';
import Home from '@/pages/Home/index.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { keepAlive: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/404/index.vue'),
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

export default {};
