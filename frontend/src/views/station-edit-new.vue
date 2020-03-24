<template>
  <article v-if="currStation" class="station-edit">
    <h2>
      {{(currStation._id)? 'Edit' : 'Add'}} station :
      <span v-if="currStation._id">{{currStation.name}}</span>
    </h2>

    <form class="edit-form" @submit.prevent="saveStation">
      <section class="change-name">
        <label>Enter station name:</label>
        <input type="text" v-model="currStation.name" />
      </section>

      <section class="change-tags">
        <label v-if="currStation._id">Tags:</label>
        <ul class="tags-list">
          <li
            class="li-tag"
            :key="tag"
            v-for="tag in currStation.tags"
            data-hover="Remove"
            @click.prevent="removeTag(tag)"
          >{{tag}}</li>
        </ul>
        <div class="add-tags">
          Add tags:
          <input @change="addNewTag" list="browsers" name="browser" />
          <datalist id="browsers">
            <option v-for="tag in tags" :key="tag" :value="tag" />
          </datalist>
        </div>
      </section>

      <!-- <songList :songs="currStation.songs" @reorder-songs="reorderSongs" />

      <button class="edit-btn">{{(currStation._id)? 'Edit' : 'Add'}}</button> -->
      <songList class="song-list-edit" :songs="currStation.songs" />
      <section class="songs-add-sec">
        <songAdd class="add-song-edit" @add-song="addSong" />
      </section>

      <section class="add-img-sec">
        <label for="img">Enter station picture:</label>
        <input @change="addImage" type="file" id="station-img" name="station.imgUrl" accept="image/*" />
      </section>

      <button class="edit-btn buttons">{{(currStation._id)? 'Edit' : 'Add'}}</button>
    </form>
  </article>
</template>

<script>
import songList from "@/cmps/song-list.vue";
import songAdd from "@/cmps/song-add.vue";
import cloudinaryService from "@/services/cloudinary.service.js";

export default {
  name: "stationEdit",
  data() {
    return {
      name: "",
      tagToAdd: ""
    };
  },
  created() {
    this.loadStation();
  },
  destroyed() {
    this.$store.commit({ type: 'unsetStation' });
  },
  computed: {
    station() {
      return this.$store.getters.currStation;
    },
    tags() {
      return this.$store.getters.tags;
    }
  },
  methods: {
    loadStation() {
      const stationId = this.$route.params.id;
      this.$store.dispatch({ type: "loadStation", stationId });
    },
    addSong(song) {
      this.$store.commit({ type: 'addSong', song });
    },
    reorderSongs(songs) {
      this.$store.commit({ type: 'reorderSongs', songs });
    },
    addTag(ev) {
      var tag = ev.target.value;
      if (tag && !this.station.includes(tag)) {
        this.$store.commit({ type: 'addTag', tag });
      }
      tag = "";
    },
    removeTag(tag) {
      this.$store.commit({ type: 'removeTag', tag });
    },
    async setStationImage(ev) {
      const file = ev.target.files[0];
      const img = await cloudinaryService.uploadImg(file);
      this.$store.commit({ type: 'setStationImg', imgUrl: img.secure_url });
    },
    setStationName() {},
    saveStation() {
      this.$store.dispatch({ type: "saveStation", station: this.station });
      this.$router.push("/");
    }
  },
  components: {
    songList,
    songAdd
  }
};
</script>