<template>
  <header class="main-header flex direction-column">
    <div class = "nav-container flex space-between">
      <router-link to="/" exact><h1>Jukebox</h1></router-link> 
      <div class="search">
        <input type="text" class="searchTerm" placeholder="Search">
        <button type="submit" class="searchButton">
          <i class="fa fa-search"></i>
        </button>
      </div>
      <nav class = "flex align-center">

        <router-link to="/" exact>Home</router-link> 
        <router-link to="/station">Stations</router-link> 
        <router-link to="/about">About</router-link>
        <loggedin-user />

      </nav>
      <div class="screen" @click="toggleMenu"></div>
      <button class="menu-btn" @click = "toggleMenu">☰</button>


    </div>
    <div class = "hero flex direction-column align-center" :class = 'heroSize'>
       <h2 >Make and Discover Playlists</h2>
       <router-link class = "buttons" to="/station/edit">Add New Station</router-link>

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

  methods : {
    toggleMenu(){
      document.body.classList.toggle('menu-open');
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