<template>
  <article v-if="station" class="station-details">
    <header class="station-details-header">
      <h2>{{station.name}}</h2>
      <h3>Created by: {{station.createdBy.fullName}}</h3>
      <h4>{{station.tags.join(", ")}}</h4>
      <h4>
        <button class="like-btn fas fa-heart"></button>
        {{likedCount}}
      </h4>
    </header>

    <section class="video-sec">
      <div class="video-container ratio-16-9">
<<<<<<< HEAD
        <youtube
          ref="youtube"
          width="100%"
          height="100%"
          @ready="loadSong"
          @ended="playNextSong"
          @playing="sendPlaying"
          @paused="sendPaused"
        ></youtube>
=======
        <youtube ref="youtube" width="100%" height="100%" @ready="sendSongRequst" @ended="playNextSong" @playing="sendPlaying" @paused="sendPaused"></youtube>
>>>>>>> 376924c23e453435f5c22ddb7c9934ff77679da6
      </div>
      <!-- <button @click="shuffleSongs">Shuffle</button> -->
      <section class="video-btns-container">
        <button class="next-song-btn video-btns" @click="playPrevSong">
          <i class="fas fa-backward"></i>
        </button>
        <button
          v-if="isSongPlaying"
          @click="toggleSong"
          class="play-song-btn video-btns fas fa-pause"
        ></button>
        <button v-else @click="toggleSong" class="play-song-btn video-btns fas fa-play"></button>
        <button class="prev-song-btn video-btns" @click="playNextSong">
          <i class="fas fa-forward"></i>
        </button>
        <h3>Width: {{ windowWidth }}</h3>
      </section>
    </section>

    <section v-if="chatIsOff" class="songs-sec">
      <button class="add-button buttons" @click="toggleAddSong">{{listOrAddBtn}}</button>
      <songAdd v-if="isAddSongOpen" @add-song="addSong" />
      <songList
        v-else
        :songs="station.songs"
        :playingSongId="playingSongId"
        @play-song="playSong"
        @reorder-songs="reorderSongs"
      />
    </section>

    <chat-room v-else :currStation="station" class="station-chat"></chat-room>
    <chat-room v-if="!mobileMode" :currStation="station" class="station-chat"></chat-room>
    <div v-if="mobileMode" @click="toggleChat" class="chat-open">
      <h4>
        <i class="far fa-comments"></i>
      </h4>
    </div>
  </article>
</template>

<script>
<<<<<<< HEAD
import songList from "@/cmps/song-list.vue";
import songAdd from "@/cmps/song-add.vue";
import chatRoom from "@/cmps/chat-room.vue";
=======
import socketService from "@/services/socket.service.js";
import { shuffleArray } from "@/services/util.service.js";
import songList from '@/cmps/song-list.vue';
import songAdd from '@/cmps/song-add.vue';
import chatRoom from '@/cmps/chat-room.vue';
>>>>>>> 376924c23e453435f5c22ddb7c9934ff77679da6
// window.innerWidth
export default {
  name: "stationDetails",
  data() {
    return {
      windowWidth: 0,
      mobileMode: false,
      playingSongId: "",
      isAddSongOpen: false,
      isSongPlaying: false,
      chatIsOff: true
    };
  },
<<<<<<< HEAD
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.loadStation();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
    this.$store.commit({ type: "unsetStation" });
=======
  async created() {
    await this.loadStation();
    socketService.setup();
    socketService.emit("join station", this.station._id);
  },
  destroyed() {
    socketService.terminate();
    this.$store.commit({ type: 'unsetStation' });
>>>>>>> 376924c23e453435f5c22ddb7c9934ff77679da6
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
<<<<<<< HEAD
    listOrAddSong() {
      return this.isAddSongOpen ? "Return to playlist" : "Add a new song";
=======
    listOrAddBtn(){
      return (this.isAddSongOpen)? 'Return to playlist' : 'Add a new song';
>>>>>>> 376924c23e453435f5c22ddb7c9934ff77679da6
    }
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.windowWidth > 460
        ? (this.mobileMode = false)
        : (this.mobileMode = true);
    },
    async loadStation() {
      const stationId = this.$route.params.id;
<<<<<<< HEAD
      await this.$store.dispatch({ type: "loadStation", stationId });
      this.playingSongId = this.station.songs[0].id;
=======
      await this.$store.dispatch({ type: 'loadStation', stationId });
>>>>>>> 376924c23e453435f5c22ddb7c9934ff77679da6
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
      var idx = this.station.songs.findIndex(
        song => song.id === this.playingSongId
      );
      idx++;
      if (idx === this.station.songs.length) idx = 0;
      this.playingSongId = this.station.songs[idx].id;
      this.loadSong();
    },
    playPrevSong() {
      var idx = this.station.songs.findIndex(
        song => song.id === this.playingSongId
      );
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
      this.$store.dispatch({ type: "addSong", song });
    },
    reorderSongs(songs) {
      const playingSongIdx = songs.findIndex(
        song => song.id === this.playingSongId
      );
      if (playingSongIdx === -1) this.playNextSong();
      this.$store.dispatch({ type: "reorderSongs", songs });
    },
<<<<<<< HEAD
    shuffleSongs() {},
    toggleChat() {
      this.chatIsOff = !this.chatIsOff;
=======
    shuffleSongs() {
      const songs = JSON.parse(JSON.stringify(this.station.songs));
      shuffleArray(songs);
      this.reorderSongs(songs);
    },
    toggleChat(){
      this.chatIsOff=!this.chatIsOff;
>>>>>>> 376924c23e453435f5c22ddb7c9934ff77679da6
    }
  },
  components: {
    songList,
    songAdd,
    chatRoom
  }
};
</script>