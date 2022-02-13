import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueDOMPurifyHTML from 'vue-dompurify-html';

const app = createApp(App);

app.use(VueDOMPurifyHTML);
app.use(router);
app.mount('#app');
