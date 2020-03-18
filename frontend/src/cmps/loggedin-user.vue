<template>
  <section class="loggedin-user">
    <img :src="loggedinUser.imgUrl" />
    <div class="user-options">
      <p>Hello {{loggedinUser.fullName}}</p>
      <router-link :to="'/user/' + loggedinUser._id">Profile Page</router-link>
      <button @click="$emit('logout')">Logout</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'loggedinUser',
  props: {
      loggedinUser: Object
  }
}
</script>