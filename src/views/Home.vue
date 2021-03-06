<template>
  <div class="home mx-auto">
    <div class="row flex-md-row-reverse">
      <div class="col-12 col-md-3">
        <User />
      </div>
      <div class="col-12 col-md-6">
        <h1 class="display-3">MultiDict</h1>

        <form @submit.prevent="search">
          <div class="input-group search-group mx-auto my-5">
            <input
              type="search"
              list="search-history"
              class="form-control search-input"
              v-model="query"
            />
            <datalist id="search-history">
              <option
                v-for="query in queryHistory"
                :key="query.word"
                :value="query.word"
                :label="isWebBrowserUsable ? query.timestamp : query.word"
              >
              </option>
            </datalist>
            <div class="input-group-append">
              <button
                type="submit"
                class="btn btn-primary btn-block search-button"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="row mx-3">
      <div class="mt-5 mx-auto" v-if="wordLoading">
        <LoadingSpinner />
      </div>
      <div class="mt-5 mx-auto" v-else-if="wordError">
        <OopsAlert message="Word was not found :(" />
      </div>
      <div
        v-else
        class="col-12 col-md-4"
        v-for="source in Object.keys(definitionsGroupedBySource)"
        :key="source"
      >
        <DefinitionCard
          v-for="(def, i) in definitionsGroupedBySource[source]"
          :def="def"
          :word="word"
          :key="i"
        />
      </div>
    </div>

    <div class="row mx-3" v-if="storedCards.length">
      <div class="col-12 border-top border-primary border- my-4"></div>
      <div class="col-12 mx-auto">
        <h4>My Cards</h4>
      </div>
      <div class="col-12 col-md-4" v-for="(card, i) in storedCards" :key="i">
        <DefinitionCard :def="card" :word="card.word" :is-stored-card="true" />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner';
import OopsAlert from '../components/OopsAlert';
import DefinitionCard from '../components/DefinitionCard';
import User from '../components/User';

import { isWebBrowserUsable } from '../utils/browsers';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    User,
    DefinitionCard,
    LoadingSpinner,
    OopsAlert,
  },
  data() {
    return {
      query: '',
    };
  },
  computed: {
    ...mapGetters([
      'user',
      'queryHistory',
      'storedCards',
      'word',
      'definitionsGroupedBySource',
      'userLoading',
      'userError',
      'wordLoading',
      'wordError',
    ]),
    isWebBrowserUsable,
  },
  methods: {
    ...mapActions(['searchDictionary']),

    search() {
      this.query && this.searchDictionary({ params: { query: this.query } });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-group {
  width: 400px;
  max-width: 96vw;
}
.search-button {
  width: 100px;
  max-width: 24vw;
}
</style>
