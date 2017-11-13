import Vue from 'vue';
import Vuex from 'vuex';
import App from './app/app.vue';
import StoreDefinition from './store';

Vue.use(Vuex);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store: new Vuex.Store(StoreDefinition),
  render: (h) => h(App) // eslint-disable-line id-length
});
