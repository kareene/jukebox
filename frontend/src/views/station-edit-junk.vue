<template>
  <article v-if="station" class="station-edit">
    <h2>
      {{(station._id)? 'Edit' : 'Add'}} station :
      <span v-if="station._id">{{station.name}}</span>
    </h2>

    <form class="edit-form" @submit.prevent="saveStation">
      <section class="change-name">
        <label>Enter station name:</label>
        <input type="text" v-model="station.name" />
      </section>

      <section class="change-tags">
        <label v-if="station._id">Tags:</label>
        <ul class="tags-list">
          <li
            class="li-tag"
            :key="tag"
            v-for="tag in station.tags"
            data-hover="Remove"
            @click.prevent="removeTag(tag)"
          >{{tag}}</li>
        </ul>
        <div class="add-tags">
          Add tags:
          <input @change="addNewTag" list="browsers" name="browser" />
          <datalist id="browsers">
            <option :key="tag" v-for="tag in station.tags" :value="tag" />
          </datalist>
        </div>
      </section>

      <songList :songs="station.songs" @reorder-songs="reorderSongs" />

      <button class="edit-btn">{{(station._id)? "Edit" : "Add"}}</button>
    </form>
    <songAdd @add-song="addSong" />
    <pre>{{station}}</pre>
  </article>
</template>

<script>
import songList from '@/cmps/song-list.vue';
import songAdd from '@/cmps/song-add.vue';

export default {
  name: 'stationEdit',
  created() {
    this.loadStation();
  },
  destroyed() {
    this.$store.commit({ type: 'unsetStation' });
  },
  computed: {
    station() {
      return this.$store.getters.station;
    }
  },
  methods: {
    loadStation() {
      const stationId = this.$route.params.id;
      this.$store.dispatch({ type: 'loadStation', stationId });
    },
    addSong(song) {
      this.$store.commit({ type: 'addSong', song });
    },
    reorderSongs(songs) {
      this.$store.commit({ type: 'reorderSongs', songs });
    },
    addTag(ev) {
      const tagToAdd = ev.target.value;
      if (!this.station.tags.find(tag => tag === tagToAdd)) {
        this.$store.commit({ type: 'addTag', tag: tagToAdd });
      }
    },
    removeTag(tag) {
      this.$store.commit({ type: 'removeTag', tag });
    },
    saveStation() {
      this.$store.dispatch({ type: 'saveStation', station: this.station });
      this.$router.push('/');
    }
  },
  components: {
    songList,
    songAdd
  }
};
</script>