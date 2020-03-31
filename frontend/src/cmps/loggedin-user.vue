<template>
  <section v-if="loggedinUser" class="loggedin-user">
    <img :src="loggedinUser.imgUrl"/>
    <div class="user-options">
      <p>Hello {{loggedinUser.fullName}}</p>
      <template v-if="isGuestUser">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </template>
      <template v-else>
        <router-link :to="'/user/' + loggedinUser._id">Profile Page</router-link>
        <button @click="logout">Logout</button>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'loggedinUser',
  computed: {
      loggedinUser() {
        return this.$store.getters.loggedinUser;
      },
      isGuestUser() {
        return this.$store.getters.isGuestUser;
      }
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: 'logout' });
    }
  }
}
</script>