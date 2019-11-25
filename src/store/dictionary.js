import * as R from 'ramda';

import VuexApi from 'vuex-rest-api';

const dictionary = new VuexApi({
  baseURL: 'http://localhost:3000', // TODO make configurable
})
  .get({
    action: 'searchDictionary',
    property: 'word',
    path: ({ query }) => `/words/${query}`,
  })
  .getStore();

export default {
  ...dictionary,

  namespaced: true,

  getters: {
    definitionsGroupedBySource: state =>
      state.word && state.word.definitions
        ? R.groupBy(R.prop('source'))(state.word.definitions)
        : {},
    word: state => R.prop('word')(state.word),
    loading: state => state.pending.word,
    error: state => state.error.word,
  },
};
