import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/assets/tailwind.css';
import Snotify from 'vue-snotify';

Vue.config.productionTip = false;
Vue.use(Snotify);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
