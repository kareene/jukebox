<template>
  <article v-if="currStation" class="station-edit">
    <h2>{{(currStation)? 'Edit' : 'Add'}} station</h2>

    <form @submit.prevent="saveStation">
      <label>Enter station name:</label>
      <input type="text" v-model="currStation.name" />

      <ul class="tags-list">
        Tags:
        <li class="li-tag" :key="tag" v-for="tag in currStation.tags" data-hover="Remove" 
        @mouseover="isHoverTag = true"
        @isHoverTag="isHoverTag = false"
        @click.prevent="removeTag(tag)">
          {{tag}}
          <!-- <h3>{{tag}}</h3>
          <button @click.prevent="removeTag(tag)">X</button> -->
        </li>
      </ul>

        Add tags:
          <input @change="addNewTag" list="browsers" name="browser">
            <datalist id="browsers">
            <option :key="tag" v-for="tag in currStation.tags" :value="tag" />
          </datalist>

      <songAdd @add-song="addSong" />

      <songList :songs="currStation.songs" @remove-song="removeSong" />

      <button>{{(currStation)? 'Edit' : 'Add'}}</button>
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
      tagToAdd: "",
      isHoverTag: null
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
       console.log(ev.target.value)
        console.log(this.tagToAdd)
      this.tagToAdd=ev.target.value;
      this.currStation.tags.push(this.tagToAdd);
      // this.ev.target.value='';
    },
    addSong(song) {
      this.currStation.songs.unshift(song);
    },
    removeSong(songId) {
      const idx = this.currStation.songs.findIndex(song => song.id === songId);
      this.currStation.songs.splice(idx, 1);
    },
    removeTag(tagToRemove) {
      if(this.isHoverTag==='false')return
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