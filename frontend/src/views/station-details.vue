<template>
  <article class="station-details">
    <h2>Station Details</h2>
    <pre v-if="station">{{station}}</pre>
  </article>
</template>

<script>
export default {
  name: 'stationDetails',
  data() {
    return {
      station: null
    }
  },
  created() {
    this.loadStation();
  },
  methods: {
    async loadStation() {
      const stationId = this.$route.params.id;
      const station = await this.$store.dispatch({ type: 'loadStation', stationId });
      this.station = station;
    }
  }
}
</script>