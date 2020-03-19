<template>
  <article v-if="station" class="station-details">
    <h2>Station Details</h2>

    <div v-if="currSong" class="video-container">
        <iframe width="560" height="315" :src="currSong.videoUrl" 
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
  async created() {
    await this.loadStation();
    this.currSong = this.station.songs.shift();
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
      this.station = JSON.parse(JSON.stringify(station));
    },
    playNextSong() {
      this.station.songs.push(this.currSong);
      this.currSong = this.station.songs.shift();
    }
  }
}
</script>