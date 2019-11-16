<template>
  <div class="home mx-auto py-4">
    <h1 class="display-3">MultiDict</h1>

    <form @submit.prevent="search">
      <div class="input-group search-group mx-auto my-5">
        <input
          type="search"
          class="form-control search-input"
          v-model="query"
        />
        <div class="input-group-append">
          <button type="submit" class="btn btn-primary btn-block search-button">
            Search
          </button>
        </div>
      </div>
    </form>

    <div class="row">
      <div class="mt-5 mx-auto" v-if="loading">
        <LoadingSpinner />
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
      <div class="mt-5 mx-auto" v-if="error">
        <OopsAlert message="Word was not found :(" />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner';
import OopsAlert from '../components/OopsAlert';
import DefinitionCard from '../components/DefinitionCard';

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
  background-color: #a82124;
  border-color: #a82124;
}
</style>
