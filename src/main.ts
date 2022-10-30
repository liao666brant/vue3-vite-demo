// 全局引入样式，解决通知组件样式缺失问题
import 'element-plus/dist/index.css';
import '@/styles/tailwind.css';

import { useIntersectionObserver } from '@vueuse/core';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';

import App from './App.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

app.config.errorHandler = (err) => {
  alert(err);
};

app.directive('img-lazy', {
  mounted(el, binding) {
    const { stop } = useIntersectionObserver(
      el,
      // eslint-disable-next-line no-unused-vars
      ([{ isIntersecting }]) => {
        console.log('[ isIntersecting ] 🚀, ', isIntersecting);
        if (isIntersecting) {
          el.src = binding.value;
          stop();
        }
      }
    );
  },
});

app.use(router).use(pinia).use(VueDOMPurifyHTML).mount('#app');
