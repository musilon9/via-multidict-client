<template>
  <div class="card my-2">
    <div class="card-body">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="card-title mb-1">{{ word }} ({{ def.wordType }})</h5>
        <small>{{ def.pronunciation }}</small>
      </div>
      <p class="card-text mb-1">{{ def.definition }}</p>
      <small>{{ def.source }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    def: {
      type: Object,
    },
    word: {
      type: String,
    },
  },
};
</script>

<style scoped></style>
