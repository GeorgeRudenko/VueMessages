import { createApp } from 'vue';
import App from './App.vue';
// Plugins
import VueMessages from '@/plugins/VueMessages/scripts.plugin';

createApp(App).use(VueMessages).mount('#app')
