import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import Notifications from 'vue-notification';
Vue.use(Notifications);

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faHeart,
  faStickyNote,
} from '@fortawesome/free-regular-svg-icons';
import {
  faUser as solidFaUser,
  faHeart as solidFaHeart,
  faStickyNote as solidFaStickyNote,
  faTrashAlt as solidFaTrashAlt,
  faSave as solidFaSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faUser,
  solidFaUser,
  faHeart,
  solidFaHeart,
  faStickyNote,
  solidFaStickyNote,
  solidFaTrashAlt,
  solidFaSave
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
