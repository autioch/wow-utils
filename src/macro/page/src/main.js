import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import seed from './seed';

Vue.use(Vuex);

function getSelectedTagLabels(tags) {
  return tags.filter((tag) => tag.isSelected).map((tag) => tag.label);
}

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

      const selectedTags = state.tagGroups.reduce((tags, group) => tags.concat(...getSelectedTagLabels(group.tags)), []);

      if (selectedTags.length) {
        state.macros.forEach((macro) => {
          macro.isHidden = macro.tags.every((tag) => selectedTags.every((selectedTag) => selectedTag !== tag));
        });
      } else {
        state.macros.forEach((macro) => {
          macro.isHidden = false;
        });
      }
    }
  },
  getters: {
    visibleMacros(state) {
      return state.macros.filter((macro) => !macro.isHidden);
    }
  }
});

const app = new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
});
