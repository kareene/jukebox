<template>
  <article v-if="station" class="station-edit">
    <h2>
      {{(station._id)? 'Edit' : 'Add'}} station :
      <span v-if="station.name">{{station.name}}</span>
      <img v-if="station.imgUrl" :src="station.imgUrl" />
    </h2>

    <div class="edit-form">
      <section class="change-name">
        <label>Enter station name:</label>
        <input type="text" v-model="name" @change="setStationName" />
      </section>

      <section class="change-tags">
        <label v-if="station._id">Tags:</label>
        <ul class="tags-list">
          <li
            class="li-tag"
            :key="tag"
            v-for="tag in station.tags"
            data-hover="Remove"
            @click="removeTag(tag)"
          >{{tag}}</li>
        </ul>
        <div class="add-tags">
          Add tags:
          <input type="text" v-model="tag" list="tags" @change="addTag" />
          <datalist id="tags">
            <option v-for="tag in tags" :key="tag">{{tag}}</option>
          </datalist>
        </div>
      </section>

      <songList class="song-list-edit" :songs="station.songs" @update-playlist="updatePlaylist" />
      <section class="songs-add-sec">
        <songAdd class="add-song-edit" @add-song="addSong" />
      </section>

      <section class="add-img-sec">
        <label for="img">Enter station picture:</label>
        <input @change="setStationImage" type="file" id="station-img" name="station.imgUrl" accept="image/*" />
      </section>

      <button class="edit-btn buttons" @click="saveStation">{{(station._id)? 'Edit' : 'Add'}}</button>
    </div>
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
      tag: ""
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
    async loadStation() {
      const stationId = this.$route.params.id;
      await this.$store.dispatch({ type: "loadStation", stationId });
      this.name = this.station.name;
    },
    addSong(song) {
      this.$store.commit({ type: 'addSong', song });
    },
    updatePlaylist(songs) {
      this.$store.commit({ type: 'updatePlaylist', songs });
    },
    addTag() {
      if (this.tag && !this.station.tags.includes(this.tag)) {
        this.$store.commit({ type: 'addTag', tag: this.tag });
      }
      this.tag = "";
    },
    removeTag(tag) {
      this.$store.commit({ type: 'removeTag', tag });
    },
    async setStationImage(ev) {
      const file = ev.target.files[0];
      const img = await cloudinaryService.uploadImg(file);
      this.$store.commit({ type: 'setStationImg', imgUrl: img.secure_url });
    },
    setStationName() {
      if (this.name) {
        this.$store.commit({ type: 'setStationName', name: this.name });
      }
    },
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