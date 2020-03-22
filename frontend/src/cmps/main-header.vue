<template>
  <header class="main-header flex direction-column">
    <div class = "nav-container flex space-between">
      <h1>Jukebox</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/station">Stations</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </div>
    <h2>Make and Discover Playlists</h2>
  </header>
</template>

<script>
export default {
  name: 'mainHeader'
}
</script>