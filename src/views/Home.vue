<template>
  <div class="home mx-auto py-4">
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
          <button type="submit" class="btn btn-primary btn-block search-button">
            Search
          </button>
        </div>
      </div>
    </form>

    <div class="row mx-3">
      <div class="mt-5 mx-auto" v-if="loading">
        <LoadingSpinner />
      </div>
      <div class="mt-5 mx-auto" v-else-if="error">
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
  </div>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner';
import OopsAlert from '../components/OopsAlert';
import DefinitionCard from '../components/DefinitionCard';

import { isWebBrowserUsable } from '../utils/browsers';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('dictionary');

export default {
  components: {
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
    ...mapGetters(['word', 'definitionsGroupedBySource', 'loading', 'error']),
    queryHistory() {
      return this.$store.getters['users/queryHistory'];
    },
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
.home {
  background-color: whitesmoke;
  max-width: 1200px;
  min-height: 100vh;
}
.search-group {
  width: 400px;
  max-width: 96vw;
}
.search-button {
  width: 100px;
  max-width: 24vw;
}
</style>
