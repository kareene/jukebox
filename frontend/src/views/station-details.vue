<template>
  <article v-if="station" class="station-details flex direction-column">
      
 <!-- v-bind:style="{ 'background-image': url(station.imgUrl) }" -->

    <header class="station-details-header">
      <div class="img-container ratio-square">
        <img class="station-img" v-bind:src="station.imgUrl"/>
      </div>
      <section class="info-station-sec">
        <h2>{{station.name}}</h2>
        <h3>{{station.createdBy.fullName}} add img of creator</h3>
        <router-link v-if="isStationCreator" :to="'/station/edit/' + station._id">Edit station</router-link>
      </section>
      <div class="sation-stats flex direction-column">
      <h4>{{station.tags.join(", ")}}</h4>
        <h4>
          <button class="like-btn fas fa-heart"></button>
          {{likedCount}}
        </h4>
      </div>
    </header>

    <section class="playlist-chat-container flex">
      <section class="songs-sec" v-if="!chatIsOn || (chatIsOn && !mobileMode)">
        <button class="add-button buttons" @click="toggleAddSong">{{listOrAddBtn}}</button>
        <songAdd v-if="isAddSongOpen" @add-song="addSong" />
        <songList v-else :songs="station.songs" :playingSongId="playingSongId" 
          @play-song="newSongPlayed($event, true)" @update-playlist="playlistUpdated" />
      </section>

      <chat-room :mobileMode="mobileMode" @chatClosed="toggleChat" v-if="chatIsOn || !mobileMode" :currStation="station"></chat-room>
      <div v-if="mobileMode && !chatIsOn" @click="toggleChat" class="chat-open">
        <h4>
          <i class="far fa-comments"></i>
        </h4>
      </div>
    </section>

    <article class="player-container flex align-center space-around">
      <section class="song-info-container">
        <p>Now playing</p>
        <p>Up next</p>
      </section>

      <section class="video-btns-container">
        <input type="range" min="0" max="100" v-model="playerProgress" @change="songTimeUpdated" 
          @mousedown="stopProgress" @mouseup="startProgress" @touchstart="stopProgress" @touchend="startProgress" />
        <button class="next-song-btn video-btns" @click="newSongPlayed(prevSong.id, true)">
          <i class="fas fa-backward"></i>
        </button>
        <button v-if="isSongPlaying" @click="songToggled" class="play-song-btn video-btns">
          <i class="fas fa-pause"></i>
        </button>
        <button v-else @click="songToggled" class="play-song-btn video-btns">
          <i class="fas fa-play"></i>
        </button>
        <button class="prev-song-btn video-btns" @click="newSongPlayed(nextSong.id, true)">
          <i class="fas fa-forward"></i>
        </button>
      </section>

      <section class="video-sec">
        <img class="needle" src="../assets/img/needl1.png"/>
        <div class="video-container ratio-square">
          <youtube ref="youtube" width="100%" height="100%" :player-vars="playerVars" @ready="firstSongRequsted"
            @ended="newSongPlayed(nextSong.id, false)" @playing="youtubePlaying" @paused="youtubePaused"
          ></youtube>
        </div>
        <div class="vinyl"></div>
      </section>
    </article>

  </article>
</template>

<script>
import socketService from '@/services/socket.service.js';
import { shuffleArray } from '@/services/util.service.js';
import songList from '@/cmps/song-list.vue';
import songAdd from '@/cmps/song-add.vue';
import chatRoom from '@/cmps/chat-room.vue';

export default {
  name: 'stationDetails',
  data() {
    return {
      windowWidth: 0,
      mobileMode: false,
      playingSongId: '',
      songDuration: 0,
      playerProgress: 0,
      playerVars: {
        controls: 0,
        disablekb: 1
      },
      isAddSongOpen: false,
      isSongPlaying: false,
      interval: null,
      chatIsOn: false
    };
  },
  async created() {
    socketService.setup();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    await this.loadStation();
    socketService.emit('joinStation', { stationId: this.station._id, user: this.loggedinUser });
    socketService.on('player updatePlaylist', this.updatePlaylist);
    socketService.on('player pauseSong', this.pauseSong);
    socketService.on('player playSong', this.playSong);
    socketService.on('player updateSongTime', this.updateSongTime);
    socketService.on('player playNewSong', this.playNewSong);
  },
  destroyed() {
    socketService.off('playlist updatePlaylist', this.updatePlaylist);
    socketService.off('player pauseSong', this.pauseSong);
    socketService.off('player playSong', this.playSong);
    socketService.off('player updateSongTime', this.updateSongTime);
    socketService.off('player playNewSong', this.playNewSong);
    socketService.terminate();
    this.$store.commit({ type: 'unsetStation' });
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    station() {
      return this.$store.getters.currStation;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    isStationCreator() {
      return (!this.$store.getters.isGuestUser && this.station.createdBy._id === this.loggedinUser._id);
    },
    likedCount() {
      return this.station.likedBy.length;
    },
    player() {
      return this.$refs.youtube.player;
    },
    nextSong() {
      var idx = this.station.songs.findIndex(song => song.id === this.playingSongId);
      idx++;
      if (idx === this.station.songs.length) idx = 0;
      return this.station.songs[idx];
    },
    prevSong() {
      var idx = this.station.songs.findIndex(song => song.id === this.playingSongId);
      idx--;
      if (idx < 0) idx = this.station.songs.length - 1;
      return this.station.songs[idx];
    },
    listOrAddBtn(){
      return (this.isAddSongOpen)? 'Return to playlist' : 'Add a new song';
    }
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      // this.windowWidth > 460
      this.windowWidth > 740
        ? (this.mobileMode = false)
        : (this.mobileMode = true);
    },
    async loadStation() {
      const stationId = this.$route.params.id;
      await this.$store.dispatch({ type: 'loadStation', stationId });
    },
    async youtubePlaying() {
      this.isSongPlaying = true;
      this.songDuration = await this.player.getDuration();
      this.startProgress();
    },
    youtubePaused() {
      this.isSongPlaying = false;
      this.stopProgress();
    },
    startProgress() {
      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(this.advancePlayerProgress, 1000);
    },
    stopProgress() {
      clearInterval(this.interval);
    },
    async advancePlayerProgress() {
      const songCurrTime = await this.player.getCurrentTime();
      this.playerProgress = (songCurrTime / this.songDuration) * 100;
    },
    firstSongRequsted() {
      socketService.emit('player firstSongRequsted');
    },
    newSongPlayed(songId, userInitiated) {
      this.playNewSong(songId);
      socketService.emit('player newSongPlayed', { songId, userInitiated });
    },
    playNewSong(songId) {
      this.playerProgress = 0;
      this.playingSongId = (songId) ? songId : this.station.songs[0].id;
      this.player.loadVideoById(this.playingSongId);
    },
    async songToggled() {
      const playerState = await this.player.getPlayerState();
      if (playerState === 1 /* PLAYING */) {
        this.pauseSong();
        socketService.emit('player songPaused');
      }
      else if (playerState === 2 /* PAUSED */) {
        this.playSong();
        socketService.emit('player songPlayed');
      }
    },
    pauseSong() {
      this.player.pauseVideo();
    },
    playSong() {
      this.player.playVideo();
    },
    songTimeUpdated() {
      const time = (this.playerProgress * this.songDuration) / 100;
      this.updateSongTime(time);
      socketService.emit('player songTimeUpdated', time);
    },
    updateSongTime(time) {
      this.player.seekTo(time);
    },
    async playlistUpdated(songs) {
      const playingSongIdx = songs.findIndex(song => song.id === this.playingSongId);
      if (playingSongIdx === -1) this.newSongPlayed(this.nextSong.id, true);
      await this.$store.dispatch({ type: 'updatePlaylist', songs });
      socketService.emit('player playlistUpdated', songs);
    },
    updatePlaylist(songs) {
      this.$store.commit({ type: 'updatePlaylist', songs });
    },
    shuffleSongs() {
      const songs = JSON.parse(JSON.stringify(this.station.songs));
      shuffleArray(songs);
      this.playlistUpdated(songs);
    },
    toggleAddSong() {
      this.isAddSongOpen = !this.isAddSongOpen;
    },
    async addSong(song) {
      this.toggleAddSong();
      await this.$store.dispatch({ type: 'addSong', song });
      socketService.emit('player playlistUpdated', this.station.songs);
    },
    toggleChat(value) {
      this.chatIsOn=!this.chatIsOn;
    },

  },
  components: {
    songList,
    songAdd,
    chatRoom
  }
};
</script>