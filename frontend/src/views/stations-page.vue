<template>
  <article class="stations-page">
    <h2>Station Page</h2>
    <router-link to="/station/edit">Add New Station</router-link>
    <station-list :stations="stations" />
  </article>
</template>

<script>
import stationList from '@/cmps/station-list.vue';

export default {
  name: 'stationPage',
  computed: {
    stations() {
      return this.$store.getters.stations;
    }
  },
  components: {
    stationList
  }
}
</script>