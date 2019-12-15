<template>
  <div>
    <div class="text-primary" v-if="user">
      <font-awesome-icon :icon="['fas', 'user']" />
      {{ user.username }}
    </div>
    <div v-else>
      <div class="text-primary">
        <font-awesome-icon :icon="['far', 'user']" />
        <button
          class="btn btn-link text-decoration-none"
          @click="toggleLoginForm"
        >
          Login
        </button>
      </div>

      <form
        class="mx-3"
        v-show="toggleOpen.loginForm"
        @submit.prevent="doLogin"
      >
        <input
          type="text"
          class="form-control my-1"
          id="username"
          v-model="loginForm.username"
          placeholder="Username"
        />
        <input
          type="text"
          class="form-control my-1"
          id="password"
          v-model="loginForm.password"
          placeholder="Password"
        />
        <button type="submit" class="btn btn-primary my-1">
          Login<span v-if="userLoading"> ...</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      toggleOpen: {
        loginForm: false,
      },
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapGetters(['user', 'userLoading']),
  },
  methods: {
    ...mapActions(['login']),
    toggleLoginForm() {
      this.toggleOpen.loginForm = !this.toggleOpen.loginForm;
    },
    doLogin() {
      this.login({ data: this.loginForm });
    },
  },
};
</script>

<style scoped></style>
