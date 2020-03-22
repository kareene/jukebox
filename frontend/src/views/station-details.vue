<template>
  <article v-if="station" class="station-details">

    <header class="station-details-header">
      <h1>{{station.name}}</h1>
      <h3>Create by: {{station.createdBy.fullName}}</h3>
      <h4>{{station.tags.join(", ")}}</h4>
      <h4><button class="like-btn fas fa-heart"></button> {{likedCount}}</h4>
    </header>

    <section class="video-sec">
      <div class="video-container ratio-16-9">
          <youtube ref="youtube" width="100%" height="100%" @ready="loadSong" @ended="playNextSong" @playing="sendPlayed" @paused="sendPaused"></youtube>
      </div>
      <section class="video-btns-container">
      <button class="next-song-btn video-btns" @click="playPrevSong"><i class="fas fa-backward"></i></button>
      <!-- <button @click="toggleSong">play/pause</button> -->
      <button v-if="isPlaySong" @click="togglePlasySong" class="play-song-btn video-btns fas fa-pause"></button>
      <button v-else @click="togglePlaySong" class="play-song-btn video-btns fas fa-play"></button>
      <button class="prev-song-btn video-btns" @click="playNextSong"><i class="fas fa-forward"></i></button>
       </section>
    </section>

    <section class="songs-sec">
      <button class="add-button buttons" @click="toggleAddMode">{{listOrAddSong}}</button>
      <songAdd v-if="isAddMode" @add-song="addSong" />
      <songList v-else :songs="station.songs" :playingSongId="playingSongId" 
        @remove-song="removeSong" @play-song="playSong" @reorder-songs="reorderSongs" />
    </section>

    <chat-room :currStation="station" class="station-chat"></chat-room>
    <!-- <section class="station-chat">Chat will be here</section> -->
      
  </article>
</template>

<script>
import songList from '@/cmps/song-list.vue';
import songAdd from '@/cmps/song-add.vue';
import chatRoom from '@/cmps/chat-room.vue';

export default {
  name: 'stationDetails',
  data() {
    return {
      playingSongId: '',
      isAddMode: false,
      isPlaySong: false
    }
  },
  async created() {
    await this.loadStation();
  },
  computed: {
    station() {
      return this.$store.getters.currStation;
    },
    likedCount() {
      return this.station.likedBy.length;
    },
    player() {
      return this.$refs.youtube.player;
    },
    listOrAddSong(){
      return (this.isAddMode)? 'Return to playlist' : 'Add a new song';
    }
  },
  methods: {
    async loadStation() {
      const stationId = this.$route.params.id;
      await this.$store.dispatch({ type: 'loadStation', stationId });
      this.playingSongId = this.station.songs[0].id;
    },
    loadSong() {
      this.player.loadVideoById(this.playingSongId);
    },
    async toggleSong() {
      const playerState = await this.player.getPlayerState();
      if (playerState === 1 /* PLAYING */) this.player.pauseVideo();
      else if (playerState === 2 /* PAUSED */) this.player.playVideo();
    },
    togglePlaySong(){
      this.isPlaySong=!this.isPlaySong;
    },
    playSong(songId) {
      this.playingSongId = songId;
      this.loadSong();
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
    sendPlayed() {
      console.log('playing');
    },
    sendPaused() {
      console.log('paused');
    },
    toggleAddMode(){
      this.isAddMode=!this.isAddMode;
    },
    addSong(song) {
      this.$store.dispatch({ type: 'addSong', song });
      this.toggleAddMode();
    },
    removeSong(songId) {
      if (songId === this.playingSongId) this.playNextSong();
      this.$store.dispatch({ type: 'removeSong', songId });
    },
    reorderSongs(songs) {
      this.$store.dispatch({ type: 'reorderSongs', songs });
    },
    shuffleSongs() {}
  },
  components: {
    songList,
    songAdd,
    chatRoom
  }
}
</script>