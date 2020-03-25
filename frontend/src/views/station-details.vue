<template>
  <article v-if="station" class="station-details">

    <header class="station-details-header">
      <h2>{{station.name}}</h2>
      <h3>Created by: {{station.createdBy.fullName}}</h3>
      <h4>{{station.tags.join(", ")}}</h4>
      <h4><button class="like-btn fas fa-heart"></button> {{likedCount}}</h4>
    </header>

    <section class="video-sec">
      <div class="video-container ratio-16-9">
        <youtube ref="youtube" width="100%" height="100%" @ready="sendSongRequst" @ended="playNextSong" @playing="sendPlaying" @paused="sendPaused"></youtube>
      </div>
      <!-- <button @click="shuffleSongs">Shuffle</button> -->
      <section class="video-btns-container">
        <button class="next-song-btn video-btns" @click="playPrevSong"><i class="fas fa-backward"></i></button>
        <button v-if="isSongPlaying" @click="toggleSong" class="play-song-btn video-btns fas fa-pause"></button>
        <button v-else @click="toggleSong" class="play-song-btn video-btns fas fa-play"></button>
        <button class="prev-song-btn video-btns" @click="playNextSong"><i class="fas fa-forward"></i></button>
      </section>
    </section>

    <section v-if="chatIsOff" class="songs-sec">
      <button class="add-button buttons" @click="toggleAddSong">{{listOrAddBtn}}</button>
      <songAdd v-if="isAddSongOpen" @add-song="addSong" />
      <songList v-else :songs="station.songs" :playingSongId="playingSongId" 
        @play-song="playSong" @update-playlist="updatePlaylist" />
    </section>

    <chat-room v-else :currStation="station" class="station-chat"></chat-room>
    <div @click="toggleChat" class="chat-open"><h4>talk to me!</h4></div>
    
  </article>
</template>

<script>
import socketService from "@/services/socket.service.js";
import { shuffleArray } from "@/services/util.service.js";
import songList from '@/cmps/song-list.vue';
import songAdd from '@/cmps/song-add.vue';
import chatRoom from '@/cmps/chat-room.vue';
// window.innerWidth
export default {
  name: 'stationDetails',
  data() {
    return {
      playingSongId: '',
      isAddSongOpen: false,
      isSongPlaying: false,
      chatIsOff: true
    }
  },
  async created() {
    await this.loadStation();
    socketService.setup();
    socketService.emit("join station", this.station._id);
    socketService.on("playlist updatePlaylist", this.updatePlaylist);
  },
  destroyed() {
    socketService.terminate();
    this.$store.commit({ type: 'unsetStation' });
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
    listOrAddBtn(){
      return (this.isAddSongOpen)? 'Return to playlist' : 'Add a new song';
    }
  },
  methods: {
    async loadStation() {
      const stationId = this.$route.params.id;
      await this.$store.dispatch({ type: 'loadStation', stationId });
    },
    loadSong() {
      this.player.loadVideoById(this.playingSongId);
    },
    sendSongRequst() {
      this.playingSongId = this.station.songs[0].id;
      this.loadSong();
    },
    async toggleSong() {
      const playerState = await this.player.getPlayerState();
      if (playerState === 1 /* PLAYING */) this.player.pauseVideo();
      else if (playerState === 2 /* PAUSED */) this.player.playVideo();
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
    sendPlaying() {
      this.isSongPlaying = true;
    },
    sendPaused() {
      this.isSongPlaying = false;
    },
    toggleAddSong() {
      this.isAddSongOpen = !this.isAddSongOpen;
    },
    addSong(song) {
      this.toggleAddSong();
      this.$store.dispatch({ type: 'addSong', song });
    },
    updatePlaylist(songs) {
      const playingSongIdx = songs.findIndex(song => song.id === this.playingSongId);
      if (playingSongIdx === -1) this.playNextSong();
      this.$store.dispatch({ type: 'updatePlaylist', songs });
    },
    shuffleSongs() {
      const songs = JSON.parse(JSON.stringify(this.station.songs));
      shuffleArray(songs);
      this.reorderSongs(songs);
    },
    toggleChat(){
      this.chatIsOff = !this.chatIsOff;
    }
  },
  components: {
    songList,
    songAdd,
    chatRoom
  }
}
</script>