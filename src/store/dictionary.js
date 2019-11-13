import * as R from 'ramda';

import Vapi from 'vuex-rest-api';

const dictionary = new Vapi({
  baseURL: 'http://localhost:3000/words',
})
  .get({
    action: 'searchDictionary',
    property: 'word',
    path: ({ query }) => `/${query}`,
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
