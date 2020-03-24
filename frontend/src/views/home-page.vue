<template>
  <article class="home-page">
    <section v-for = "tag in tags" :key = tag class = "stations-by-tag">
      <div >
        <h2>{{tag}}</h2>
      </div>
      
      <stationList  :stations = "getStationsByTag(tag)"></stationList>
    </section>

  </article>
</template>

<script>
import stationList from '@/cmps/station-list.vue';

export default {
  name: 'homePage',

  created() {
      this.$store.dispatch({type: 'loadTags'})
  },

  computed: {
    tags() {
      return this.$store.getters.tags;
    },
    
  },

  methods: {
    getStationsByTag(tag){
      return this.$store.getters.stations.filter(station => 
        station.tags.includes(tag)
      );
    }
  },

  components: {
    stationList
  }
}
</script>