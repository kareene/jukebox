<template>
  <article v-if="station" class="station-details">

    <header class="station-details-header">
      <h1>{{station.name}}</h1>
      <h3>Create by: {{station.createdBy.fullName}}</h3>
      <h4>{{station.tags.join(", ")}}</h4>
      <h4>Likes: {{likedCount}}</h4>
    </header>

    <!--<div v-if="currSong" class="video-container">
        <iframe class="video-self" width="100%" :src="currSong.videoUrl" 
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
    </div>-->
    <section>
      <div class="video-container ratio-16-9">
          <youtube ref="youtube" width="100%" height="100%" @ended="playNextSong" @ready="loadSong"></youtube>
      </div>
      <button @click="playPrevSong">Prev</button>
      <!-- <button @click="toggleSong">play/pause</button> -->
      <button @click="playNextSong">Next</button>
    </section>

    <songAdd v-if="isAddMode" @add-song="addSong" />
    <songList v-else :songs="station.songs" :playingSongId="playingSongId" @remove-song="removeSong" />

    <section class="station-chat">Chat will be here</section>
      
  </article>
</template>

<script>
import songList from '@/cmps/song-list.vue';
import songAdd from '@/cmps/song-add.vue';

export default {
  name: 'stationDetails',
  data() {
    return {
      station: null,
      playingSongId: '',
      isAddMode: false
    }
  },
  async created() {
    await this.loadStation();
  },
  computed:{
    likedCount() {
      return this.station.likedBy.length
    },
    player() {
      return this.$refs.youtube.player;
    }
  },
  methods: {
    async loadStation() {
      const stationId = this.$route.params.id;
      const station = await this.$store.dispatch({ type: 'loadStation', stationId });
      this.station = JSON.parse(JSON.stringify(station));
      this.playingSongId = this.station.songs[0].id;
    },
    loadSong() {
      this.player.loadVideoById(this.playingSongId);
    },
    async toggleSong() {
      const playerStatus = await this.player.getPlayerState();
      if (playerStatus === 1) this.player.pauseVideo(); //playing
      else if (playerStatus === 2) this.player.playVideo(); //paused
    },
    playNextSong() {
      var idx = this.station.songs.findIndex(song => song.id === this.playingSongId);
      idx++;
      if (idx === this.station.songs.length) idx = 0;
      this.playingSongId = this.station.songs[idx].id;
      this.loadSong();
    },
    playPrevSong() {
      var idx = this.station.songs.findIndex(song => song.id === this.playingSongId);
      idx--;
      if (idx < 0) idx = this.station.songs.length - 1;
      this.playingSongId = this.station.songs[idx].id;
      this.loadSong();
    },
    addSong(song) {},
    removeSong(songId) {},
    shuffleSongs() {}
  },
  components: {
    songList,
    songAdd
  }
}
</script>