import * as R from 'ramda';

import VuexApi from 'vuex-rest-api';

import { withTimestampAsString } from '../utils/timestamps';

const onLoginSuccess = (state, payload, axios) => {
  state.user = payload.data;
  axios.defaults.headers.common[
    'Authorization'
  ] = `Token ${payload.data.token}`;
};

const users = new VuexApi({
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
  .getStore();

export default {
  ...users,

  namespaced: true,

  getters: {
    user: state => state.user.user,
    token: state => state.user.token, // TODO remove
    queryHistory: state =>
      R.pipe(
        R.pathOr([])(['user', 'dictionary', 'queryHistory']),
        R.sortWith([R.descend(R.prop('timestamp'))]),
        R.map(withTimestampAsString)
      )(state.user),
    loading: state => state.pending.user,
    error: state => state.error.user,
  },

  mutations: {
    addWordToQueryHistory(state, word) {
      const queryHistory = R.pathOr(null)([
        'user',
        'dictionary',
        'queryHistory',
      ])(state.user);
      if (queryHistory) {
        queryHistory.push({
          word,
          timestamp: Date.now(),
        });
      }
    },
  },
};
