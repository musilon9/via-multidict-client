import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as R from 'ramda';

import VuexApi from 'vuex-rest-api';

import { withTimestampAsString } from '../utils/timestamps';

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
    queryHistory.push({
      word: payload.data.word,
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
  .getStore();

export default new Vuex.Store({
  strict: true,

  ...dictionary,

  getters: {
    user: state => state.user.user,
    queryHistory: state =>
      R.pipe(
        R.pathOr([])(['user', 'dictionary', 'queryHistory']),
        R.sortWith([R.descend(R.prop('timestamp'))]),
        R.map(withTimestampAsString)
      )(state.user),
    userLoading: state => state.pending.user,
    userError: state => state.error.user,
    definitionsGroupedBySource: state =>
      state.word && state.word.definitions
        ? R.groupBy(R.prop('source'))(state.word.definitions)
        : {},
    word: state => R.prop('word')(state.word),
    wordLoading: state => state.pending.word,
    wordError: state => state.error.word,
  },
});
