<template>
  <article class="station-edit">
    <h2>{{(currStation)? 'Edit' : 'Add'}} station</h2>

    <form @submit.prevent="saveStation">
      <label>Enter toy name:</label>
      <input v-if="currToy" type="text" v-model="editName" />

    </form>
    <pre v-if="currStation">{{currStation}}</pre>
  </article>
</template>

<script>
export default {
  name: "stationEdit",
  data() {
    return {
      currStation: [],
      newStation: {
        _id: "",
        name: "",
        tags: [],
        createdBy: {
          _id: "",
          fullName: "",
          urlImg: ""
        },
        likedBy: "",
        songs: "",
        chatMsgs: "",
        theme: ""
      }
    };
  },
  async created(){
    const stationId=this.$route.params.id;
   if(stationId) await this.loadStation();
  },
  methods:{
      async loadStation() {
      const stationId = this.$route.params.id;
      const station = await this.$store.dispatch({ type: 'loadStation', stationId });
      this.currStation = JSON.parse(JSON.stringify(station));
    },
    saveStation(){
      console.log('saved it!')
    }
  }
}
</script>