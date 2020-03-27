<template>
  <article class="stations-page content-container">
    <h2>Stations Page</h2>
    <router-link to="/station/edit">Add New Station</router-link>
    <station-list :stations="stations" v-if = "isStationLoaded"/>
  </article>
</template>

<script>
import stationList from "@/cmps/station-list.vue";
import stationService from "@/services/station.service.js";

export default {
  name: "stationPage",

  data(){
    return {
      isStationLoaded: false
    }
  },

  async created() {
    var query = this.$route.query;
    var filterBy = stationService.getEmptyFilter();
    for (var key in query){
      filterBy[key] = query[key]
    }
    await this.$store.dispatch({type: 'setFilterBy', filterBy});
    this.isStationLoaded = true;
  },

  destroyed() {
    var filterBy = stationService.getEmptyFilter();
    this.$store.dispatch({type: 'setFilterBy', filterBy})

  },

  computed: {
    stations() {
      return this.$store.getters.stations;
    }
  },
  components: {
    stationList
  }
};
</script>