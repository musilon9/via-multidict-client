import Vue from "vue";
import Vuex from "vuex";

import dictionary from "./dictionary";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    dictionary
  }
});
