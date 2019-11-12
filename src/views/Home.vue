<template>
  <div class="home">
    <div class="jumbotron mx-auto">
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
          <div
            class="card my-2"
            v-for="(def, i) in definitionsGroupedBySource[source]"
            :key="i"
          >
            <div class="card-body">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="card-title mb-1">{{ word }} ({{ def.wordType }})</h5>
                <small>{{ def.pronunciation }}</small>
              </div>
              <p class="card-text mb-1">{{ def.definition }}</p>
              <small>{{ def.source }}</small>
            </div>
          </div>
        </div>
        <div class="mt-5 mx-auto" v-if="error">
          <Oops message="Word was not found :(" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import LoadingSpinner from "../components/LoadingSpinner";
import Oops from "../components/Oops";

import { createNamespacedHelpers } from "vuex";

const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  "dictionary"
);

export default {
  name: "home",
  components: {
    LoadingSpinner,
    Oops
  },
  data() {
    return {
      query: ""
    };
  },
  computed: {
    ...mapState(["loading", "error"]),
    ...mapGetters(["word", "definitionsGroupedBySource"])
  },
  methods: {
    ...mapActions(["searchDictionary"]),

    search() {
      this.searchDictionary(this.query);
    }
  }
};
</script>

<style lang="scss" scoped>
.jumbotron {
  max-width: 1200px;
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
