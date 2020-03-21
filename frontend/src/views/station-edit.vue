<template>
  <article v-if="currStation" class="station-edit">
    <h2>{{(currStation._id)? 'Edit' : 'Add'}} station : <span v-if="currStation._id">{{currStation.name}}</span></h2>

    <form class="edit-form" @submit.prevent="saveStation">

      <section class="change-name">
        <label>Enter station name:</label>
        <input type="text" v-model="currStation.name" />
      </section>

      <section class="change-tags" >
          <label v-if="currStation._id">Tags:</label>
        <ul class="tags-list">
          <li class="li-tag" :key="tag" v-for="tag in currStation.tags" data-hover="Remove" @click.prevent="removeTag(tag)">
            {{tag}}
          </li>
        </ul>
        <div  class="add-tags">
        Add tags:
          <input @change="addNewTag" list="browsers" name="browser">
            <datalist id="browsers">
            <option :key="tag" v-for="tag in currStation.tags" :value="tag" />
          </datalist>
          </div>
        </section>

      <songAdd @add-song="addSong" />

      <songList :songs="currStation.songs" @remove-song="removeSong" />

      <button class="edit-btn">{{(currStation)? 'Edit' : 'Add'}}</button>
    </form>
    <pre>{{currStation}}</pre>
  </article>
</template>

<script>
import songList from '@/cmps/song-list.vue';
import songAdd from '@/cmps/song-add.vue';

export default {
  name: "stationEdit",
  data() {
    return {
      currStation: null,
      tagToAdd: ""
    };
  },
  created() {
    this.loadStation();
  },
  methods: {
    async loadStation() {
      const stationId = this.$route.params.id;
      const station = await this.$store.dispatch({
        type: "loadStation",
        stationId
      });
      this.currStation = JSON.parse(JSON.stringify(station));
    },
    addNewTag(ev) {
      this.tagToAdd=ev.target.value;
      this.currStation.tags.push(this.tagToAdd);
    },
    addSong(song) {
      this.currStation.songs.unshift(song);
    },
    removeSong(songId) {
      const idx = this.currStation.songs.findIndex(song => song.id === songId);
      this.currStation.songs.splice(idx, 1);
    },
    removeTag(tagToRemove) {
      const idx = this.currStation.tags.findIndex(tag => tag === tagToRemove);
      this.currStation.tags.splice(idx, 1);
    },
    clearInputs(){
      this.tagToAdd='';
    },
    saveStation() {
    const stationToSave=this.currStation;
    this.$store.dispatch({ type: 'saveStation',stationToSave  })
    this.clearInputs();
    this.loadStation();
    }
  },
  components: {
    songList,
    songAdd
  }
}
</script>