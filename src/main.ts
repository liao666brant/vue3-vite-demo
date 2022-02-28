import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// 全局引入样式，解决通知组件样式缺失问题
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import VueDOMPurifyHTML from 'vue-dompurify-html';

const pinia = createPinia();
const app = createApp(App);

app.use(VueDOMPurifyHTML);
app.use(router);
app.use(pinia);
app.mount('#app');
