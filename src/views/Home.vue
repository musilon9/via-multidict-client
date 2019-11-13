<template>
  <div class="home mx-auto py-4">
    <h1 class="display-3">MultiDict</h1>

    <form @submit.prevent="search">
      <div class="mx-auto my-5">
        <input
          type="search"
          class="form-control search-input mx-2"
          v-model="query"
        />
        <button
          type="submit"
          class="btn btn-primary btn-block search-button mx-2"
        >
          Search
        </button>
      </div>
    </form>

    <div class="row">
      <div class="mt-5 mx-auto" v-if="loading">
        <LoadingSpinner />
      </div>
      <div
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

const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  'dictionary'
);

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
    ...mapState(['loading', 'error']),
    ...mapGetters(['word', 'definitionsGroupedBySource']),
  },
  methods: {
    ...mapActions(['searchDictionary']),

    search() {
      this.searchDictionary(this.query);
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
.search-input {
  display: inline-block;
  width: 240px;
}
.search-button {
  display: inline-block;
  width: 80px;
  background-color: #a82124;
  border-color: #a82124;
}
</style>
