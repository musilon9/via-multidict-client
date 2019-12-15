import Vue from 'vue';
import Vuex from 'vuex';
import VuexApi from 'vuex-rest-api';
import * as R from 'ramda';

import { withTimestampAsString } from '../utils/timestamps';

Vue.use(Vuex);

const onLoginSuccess = (state, payload, axios) => {
  state.user = payload.data;
  axios.defaults.headers.common[
    'Authorization'
  ] = `Token ${payload.data.token}`;
};

const onDictionarySearchSuccess = (state, payload) => {
  state.word = payload.data;

  const queryHistory = R.pathOr(null)(['user', 'dictionary', 'queryHistory'])(
    state.user
  );
  if (queryHistory) {
    const { word } = payload.data;

    const existingIndex = queryHistory.findIndex(q => q.word === word);
    if (existingIndex >= 0) {
      queryHistory.splice(existingIndex, 1);
    }

    queryHistory.push({
      word,
      timestamp: Date.now(),
    });
  }
};

const dictionary = new VuexApi({
  baseURL: 'http://localhost:3000', // TODO make configurable
})
  .post({
    action: 'login',
    property: 'user',
    path: '/users/login',
    onSuccess: onLoginSuccess,
  })
  .post({
    action: 'signup',
    property: 'user',
    path: '/users',
    onSuccess: onLoginSuccess,
  })
  .get({
    action: 'getUser',
    property: 'user',
    path: '/user',
  })
  .get({
    action: 'searchDictionary',
    property: 'word',
    path: ({ query }) => `/words/${query}`,
    onSuccess: onDictionarySearchSuccess,
  })
  .get({
    action: 'getSourceInfo',
    property: 'dictionarySources',
    path: '/sources/dictionaries',
  })
  .post({
    action: 'storeCard',
    property: 'user',
    path: '/user/cards',
  })
  .getStore();

export default new Vuex.Store({
  strict: true,

  ...dictionary,

  getters: {
    user: state => R.prop('user')(state.user),
    queryHistory: state =>
      R.pipe(
        R.pathOr([])(['user', 'dictionary', 'queryHistory']),
        R.sortWith([R.descend(R.prop('timestamp'))]),
        R.map(withTimestampAsString)
      )(state.user),
    storedCards: state => R.pathOr([])(['user', 'stored', 'cards'])(state.user),
    userLoading: state => state.pending.user,
    userError: state => state.error.user,
    definitionsGroupedBySource: state =>
      state.word && state.word.definitions
        ? R.groupBy(R.prop('source'))(state.word.definitions)
        : {},
    word: state => R.prop('word')(state.word),
    wordLoading: state => state.pending.word,
    wordError: state => state.error.word,
    dictionarySources: state => state.dictionarySources,
  },
});
