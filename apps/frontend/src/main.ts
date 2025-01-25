import './styles.scss';
import { createApp } from 'vue';
import App from './app/App.vue';
import router from './router';
import { createPinia } from 'pinia';

createApp(App).use(router).use(createPinia()).mount('#root');
