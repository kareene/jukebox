<template>
  <header class="main-header">
    <h1>Jukebox</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/station">Stations</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'mainHeader'
}
</script>