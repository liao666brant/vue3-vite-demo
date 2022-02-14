import { RouteRecordRaw } from 'vue-router';
import Home from '@/pages/Home/index.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { keepAlive: true },
    children: [
      {
        path: '/home/detail',
        name: 'HomeDetail',
        component: () => import('@/pages/Home/HomeDetail/index.vue'),
      },
    ],
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
    children: [
      {
        path: '/other/why',
        name: 'Why',
        component: () => import('@/pages/Other/Why/index.vue'),
      },
    ],
  },
];

export default {};
