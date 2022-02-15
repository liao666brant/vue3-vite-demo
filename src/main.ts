import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import VueDOMPurifyHTML from 'vue-dompurify-html';

const pinia = createPinia();
const app = createApp(App);

app.use(VueDOMPurifyHTML);
app.use(router);
app.use(pinia);
app.mount('#app');
