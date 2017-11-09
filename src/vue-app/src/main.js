import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import seed from './seed';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: seed,
  mutations: {
    toggleTag(state, payload) {
      state.tagGroups.find((tagGroup) => tagGroup.tags.find((tag) => {
        if (tag.id === payload.id) {
          tag.isSelected = !tag.isSelected;

          return true;
        }

        return false;
      }));
    }
  }
});

const app = new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
});
