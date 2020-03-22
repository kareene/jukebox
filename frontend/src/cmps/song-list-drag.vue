<template>
  <section v-if="songs" class="song-list ">
    <Container @drop="onDrop">
      <Draggable v-for="song in songsCopy" :key="song.id">
        <article class="song-in-list" :class="{ playing: song.id === playingSongId }">
          <!--<div class="ratio-square">
            <img :src="song.imgUrl" />
          </div>-->
          <p>{{song.title}}</p>
          <button @click.stop="playSong(song.id)">play</button>
          <button class="remove-song-btn" @click.stop="removeSong(song.id)">X</button>
        </article>
      </Draggable>
    </Container>
  </section>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "../utils/helpers";

export default {
  name: 'songList',
  props: {
    songs: Array,
    playingSongId: String
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
      const reorderedSongs = applyDrag(this.songsCopy, dropResult);
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