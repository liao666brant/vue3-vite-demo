import { RouteRecordRaw } from 'vue-router';

import Home from '@/pages/Home/index.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { keepAlive: true, title: '动态疫情新闻' },
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
    meta: { title: '404!' },
    component: () => import('@/pages/404/index.vue'),
  },
  {
    path: '/news/:contentId',
    name: 'NewsDetail',
    component: () => import('@/pages/NewsDetail/index.vue'),
    meta: { keepAlive: false, title: '' },
    beforeEnter(to) {
      document.title = to.params.title as string;
    },
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
  {
    path: '/md',
    name: 'Markdown',
    component: () => import('@/pages/markdown/index.vue'),
  },
  {
    path: '/style',
    name: 'StylePage',
    component: () => import('@/pages/style/index.vue'),
  },
  {
    path: '/funComponent',
    name: 'FunComponent',
    component: () => import('@/pages/FunctionComponent/demo.vue'),
  },
  {
    path: '/tsx',
    name: 'TSXPage',
    component: () => import('@/pages/TSX'),
  },
  {
    path: '/directive',
    name: 'Directive',
    component: () => import('@/pages/DirectivePage/index.vue'),
  },
  {
    path: '/tailwindcss',
    name: 'TailwindCss',
    component: () => import('@/pages/TailwindCss/index.vue'),
  },
];
