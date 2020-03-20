<template>
  <article v-if="station" class="station-details">

    <header class="station-details-header">
      <h1>{{station.name}}</h1>
      <h2>Create by: {{station.createdBy.fullName}}</h2>
      <h4>{{station.tags.join(", ")}}</h4>
      <h4>Likes: {{likedCount}}</h4>
    </header>

    <div v-if="currSong" class="video-container">
        <iframe class="video-self" width="100%" :src="currSong.videoUrl" 
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
    </div>

    <ul class="songs-list">
      <li :key="song.id" v-for="song in station.songs">
        <h3>{{song.title}}</h3>
      </li>
    </ul>

    <section class="station-chat">Chat will be here</section>
      
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