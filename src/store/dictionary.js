import axios from 'axios';
import * as R from 'ramda';

export default {
  namespaced: true,

  state: {
    word: {},
    loading: false,
    error: null,
  },

  getters: {
    definitionsGroupedBySource: state =>
      state.word.definitions
        ? R.groupBy(R.prop('source'))(state.word.definitions)
        : {},
    word: state => R.prop('word')(state.word),
  },

  mutations: {
    loadingStarted(state) {
      state.word = {};
      state.loading = true;
      state.error = null;
    },
    success(state, data) {
      state.word = data;
      state.error = null;
    },
    error(state, error) {
      state.error = error;
    },
    loadingFinished(state) {
      state.loading = false;
    },
  },

  actions: {
    searchDictionary({ commit }, query) {
      commit('loadingStarted');
      axios
        .get(`http://localhost:3000/words/${query}`)
        .then(res => {
          commit('success', res.data);
        })
        .catch(err => {
          commit('error', err);
        })
        .finally(() => {
          commit('loadingFinished');
        });
    },
  },
};
