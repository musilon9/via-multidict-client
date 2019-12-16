<template>
  <div id="app" class="mx-auto py-4">
    <!--    <div id="nav">-->
    <!--      <router-link to="/">Home</router-link> |-->
    <!--      <router-link to="/about">About</router-link>-->
    <!--    </div>-->
    <router-view />
    <notifications position="top center" classes="my-notifications" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  mounted() {
    this.getSourceInfo();
  },
  methods: {
    ...mapActions(['getSourceInfo']),
  },
};
</script>

<style lang="scss">
@import './assets/styles/custom';
@import '../node_modules/bootstrap/scss/bootstrap';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: whitesmoke;
  max-width: 1200px;
  min-height: 100vh;
}

.my-notifications {
  &.primary {
    font-size: 12px;
    padding: 10px;
    margin: 0 5px 5px;
    color: #fff;
    background: $primary;
    border-left: 5px solid darken($primary, 10%);
  }
}
</style>
