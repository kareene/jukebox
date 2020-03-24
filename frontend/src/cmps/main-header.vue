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
    <loggedin-user />
    <div class = "hero flex direction-column" :class = 'heroSize'>
       <h2 >Make and Discover Playlists</h2>
       <router-link to="/station/edit">Add New Station</router-link>
    </div>
  </header>
</template>

<script>
import loggedinUser from '@/cmps/loggedin-user.vue';

export default {
  name: 'mainHeader',
  data(){
    return {
      isHomePage: false
    }
  },
  created(){
    this.isHomePage = (this.$route.name =='homePage' || this.$route.name === 'stationsPage') ? true : false;
  },
  computed: {
    heroSize(){
      return (this.isHomePage) ? 'full' : 'small';
    }
  },
  watch: {
    '$route'(to, from) {
      this.isHomePage = (to.name === 'homePage' || to.name === 'stationsPage') ? true : false;
          // if(to.name === 'homePage' || to.name === 'stationsPage') this.isHomePage = true;
          // else this.isHomePage = false;
    }
  },
  components: {
    loggedinUser
  }
}
</script>