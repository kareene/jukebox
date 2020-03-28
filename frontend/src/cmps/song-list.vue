<template>
  <section v-if="songs" class="song-list">
    <Container class="container-of-song-list" @drop="onDrop" :remove-on-drop-out="true">
      <Draggable v-for="song in songsCopy" :key="song.id">
        <article class="song-in-list" :class="{ playing: song.id === playingSongId }">
          <section class="left-sec-song-line">
            <img :src="song.imgUrl" /><button v-if="playingSongId" @click.stop="playSong(song)"></button>
            <div class="inner-txt-song">
              <p>{{song.title}}</p>
              <p class="song-add-by-name">Added by: {{song.addedBy.fullName}}</p>
            </div>
          </section>
          <img class="playing-song-gif" v-if="song.id === playingSongId && isSongPlaying" src="../../public/img/eq3.gif" />
          <!-- <button class="fas fa-play" v-if="playingSongId" @click.stop="playSong(song.id)"></button> -->

          <!--<button class="remove-song-btn" @click.stop="removeSong(song.id)">X</button>-->
        </article>
      </Draggable>
    </Container>
  </section>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "@/services/util.service.js";

export default {
  name: 'songList',
  props: {
    songs: Array,
    playingSongId: String,
    isSongPlaying: Boolean
  },
  data() {
    return {
      songsCopy: JSON.parse(JSON.stringify(this.songs))
    };
  },
  watch: {
    songs() {
      this.songsCopy = JSON.parse(JSON.stringify(this.songs));
    }
  },
  methods: {
    onDrop(dropResult) {
      const songs = applyDrag(this.songsCopy, dropResult);
      this.$emit('update-playlist', songs);
    },
    playSong(songId) {
      this.$emit('play-song', songId);
    },
    removeSong(songId) {
      this.$emit('remove-song', songId);
    }
  },
  components: { 
    Container, 
    Draggable
  }
};
</script>