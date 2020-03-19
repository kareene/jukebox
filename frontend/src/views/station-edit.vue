<template>
  <article class="station-edit">
    <h2>{{(currStation)? 'Edit' : 'Add'}} station</h2>

    <form @submit.prevent="saveStation">
      <label>Enter station name:</label>
      <input v-if="currStation" type="text" v-model="currStation.name" />

      <ul v-if="currStation">
        Tags:
        <li :key="tag" v-for="tag in currStation.tags">
          <h3>{{tag}}</h3>
          <button @click.prevent="removeTag(tag)">X</button>
        </li>
      </ul>

      <input type="text" v-model="tagToAdd" placeholder="enter new tag..." />
      <button @click.prevent="addNewTag">Add tag</button>

      <ul v-if="currStation">
        Songs list:
        <li :key="song.id" v-for="song in currStation.songs">
          <h3>{{song.title}}</h3>
          <button @click.prevent="removeSong(song.id)">X</button>
        </li>
      </ul>
      <button>{{(currStation)? 'Edit' : 'Add'}}</button>
    </form>
    <pre v-if="currStation">{{currStation}}</pre>
  </article>
</template>

<script>
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
    addNewTag() {
      this.currStation.tags.push(this.tagToAdd);
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
    clearInputs();
    this.loadStation();
    }
  }
};
</script>