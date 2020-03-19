<template>
  <article class="station-details">
    <h2>Station Details</h2>
    <div v-if="station">

        <iframe width="560" height="315" src="https://www.youtube.com/embed/M-aoyPa41Ic" 
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
    </div>

      <h1>{{station.name}}</h1>
      <h2>Create by: {{station.createdBy.fullName}}</h2>
      <h4>{{station.tags.join(", ")}}</h4>
      <h4>Likes: {{likedCount}}</h4>
      <ul>
        <li :key="song.id" v-for="song in station.songs">
          <h3>{{song.title}}</h3>
        </li>
      </ul>
      

    </div>
  </article>
</template>

<script>
export default {
  name: 'stationDetails',
  data() {
    return {
      station: null,
      currSong: null
    }
  },
  created() {
    this.loadStation();
  },
  computed:{
    likedCount(){
      return this.station.likedBy.length
    }
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