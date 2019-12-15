<template>
  <div class="card my-2">
    <div class="card-body">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="card-title text-primary">
          {{ word }} ({{ def.wordType }})
          <button
            class="btn btn-link text-decoration-none py-0"
            v-if="!isStoredCard && canBeStored"
            @click="doStoreCard"
          >
            <font-awesome-icon :icon="['far', 'heart']" />
          </button>
          <font-awesome-icon
            :icon="['fas', 'heart']"
            v-if="!isStoredCard && hasBeenStored"
          />
        </h5>
        <small>{{ def.pronunciation }}</small>
      </div>
      <p class="card-text mb-1">{{ def.definition }}</p>

      <div class="card my-2" v-if="def.examples.length">
        <div class="card-header py-1">
          <button
            class="btn btn-link text-decoration-none"
            @click="toggleExamples"
          >
            Examples
          </button>
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

      <div class="row">
        <div class="col-8 offset-2">
          <small>
            <a
              :href="searchUrl"
              target="_blank"
              :title="'find on ' + def.source"
            >
              {{ def.source }}
            </a>
          </small>
        </div>
        <div class="col-2">
          <button
            class="btn btn-link text-muted text-decoration-none py-0"
            v-if="isStoredCard"
            @click="doDeleteCard"
          >
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import * as R from 'ramda';

import { canBeStored, hasBeenStored } from '../utils/cards';

export default {
  props: {
    def: Object,
    word: String,
    isStoredCard: {
      type: Boolean,
      default: false,
    },
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
    canBeStored() {
      return canBeStored(this.def);
    },
    hasBeenStored() {
      return hasBeenStored(this.def);
    },
  },
  methods: {
    ...mapActions(['storeCard', 'deleteCard']),
    toggleExamples() {
      this.toggleOpen.examples = !this.toggleOpen.examples;
    },
    doStoreCard() {
      this.storeCard({
        data: { ...R.omit(['_id'])(this.def), word: this.word },
      });
    },
    doDeleteCard() {
      this.deleteCard({ params: { id: this.def._id } });
    },
  },
};
</script>

<style scoped></style>
