<template>
  <article class="about-page">
    <h2>About Page</h2>
    <h3>Rotem, Kareene, Limor</h3>
    <pre>{{loggedinUser}}</pre>
  </article>
</template>

<script>
export default {
  name: 'aboutPage',
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  }
}
</script>
