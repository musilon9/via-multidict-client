<template>
  <div class="alert alert-danger" role="alert">
    <h4 class="alert-heading">Oops!</h4>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "Oops",
  props: {
    message: {
      type: String
    }
  }
};
</script>

<style scoped></style>
