<template>
  <div class="card my-2">
    <div class="card-body">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="card-title text-primary mb-1">
          {{ word }} ({{ def.wordType }})
        </h5>
        <small>{{ def.pronunciation }}</small>
      </div>
      <p class="card-text mb-1">{{ def.definition }}</p>

      <div class="card my-2" v-if="def.examples.length">
        <div class="card-header py-1">
          <button class="btn btn-link" @click="toggleExamples">Examples</button>
        </div>
        <ul class="list-group list-group-flush" v-show="toggleOpen.examples">
          <li
            class="list-group-item"
            v-for="(example, i) in def.examples"
            :key="i"
          >
            {{ example }}
          </li>
        </ul>
      </div>

      <small>
        <a :href="searchUrl" target="_blank" :title="'find on ' + def.source">
          {{ def.source }}
        </a>
      </small>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as R from 'ramda';

export default {
  props: {
    def: Object,
    word: String,
  },
  data() {
    return {
      toggleOpen: {
        examples: false,
      },
    };
  },
  computed: {
    ...mapGetters(['dictionarySources']),

    searchUrl() {
      const baseUrl = R.prop('searchUrl')(
        R.find(R.propEq('sourceName', this.def.source))(this.dictionarySources)
      );
      return baseUrl ? R.concat(baseUrl)(this.word) : '#';
    },
  },
  methods: {
    toggleExamples() {
      this.toggleOpen.examples = !this.toggleOpen.examples;
    },
  },
};
</script>

<style scoped></style>
