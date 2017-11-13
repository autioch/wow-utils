import macrosUrl from 'macros.json';
import tagCategoriesUrl from 'tagCategories.json';
import tagDefinitionsUrl from 'tagDefinitions.json';

export default {
  state: {
    macros: [],
    tagCategories: [],
    tags: []

    // tagDictionary: {},
  },
  actions: {
    fetchData({ commit }) {
      Promise
        .all(
          [
            fetch(macrosUrl),
            fetch(tagCategoriesUrl),
            fetch(tagDefinitionsUrl)
          ].map((promise) => promise.then((resp) => resp.json()))
        )
        .then(([macros, tagCategories, tagDefinitions]) => {
          commit('setTagCategories', tagCategories);
          commit('setTags', tagDefinitions);
          commit('setMacros', macros);
          commit('setVisibleMacros');
        });
    }
  },
  mutations: {

    setTagCategories(state, payload) {
      state.tagCategories = payload;
    },

    setTags(state, tagDefinitions) {
      state.tags = tagDefinitions.map((tag) => Object.assign({}, tag, {
        isSelected: false
      }));

      // state.tagDictionary = state.tags.reduce((dict, tag) => Object.assign(dict, {
      //   [tag.id]: tag
      // }), {});
    },

    setMacros(state, payload) {
      state.macros = payload;
    },

    setVisibleMacros(state) {
      const selectedTags = state.tags.filter((tag) => tag.isSelected);

      if (selectedTags.length === 0) {
        state.macros.forEach((macro) => {
          macro.isHidden = false;
        });
      } else {
        state.macros.forEach((macro) => {
          macro.isHidden = macro.tags.every((tag) => selectedTags.every((selectedTag) => selectedTag !== tag));
        });
      }
    },

    toggleTag(state, payload) {
      state.tagGroups.find((tagGroup) => tagGroup.tags.find((tag) => {
        if (tag.id === payload.id) {
          tag.isSelected = !tag.isSelected;

          return true;
        }

        return false;
      }));

      /* TODO setVisibleMacros DUPLICATE */
      const selectedTags = state.tags.filter((tag) => tag.isSelected);

      if (selectedTags.length === 0) {
        state.visibleMacros = state.macros.slice(0);
      } else {
        state.visibleMacros = state.macros
          .filter((macro) => macro.tags.some((tag) => selectedTags.some((selectedTag) => selectedTag.id === tag)));
      }
    }
  },
  getters: {
    visibleMacros(state) {
      return state.macros.filter((macro) => !macro.isHidden);
    }
  }
};
