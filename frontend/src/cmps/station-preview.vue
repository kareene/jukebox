<template>
  <li v-if="station" class="station-preview">
    <pre>{{station}}</pre>
    <img v-if="station.imgUrl" :src="station.imgUrl" />
    <router-link :to="'/station/'+station._id">Details</router-link>
    <router-link :to="'/station/edit/'+station._id">Edit</router-link>
    <button @click="$emit('remove', station)">Delete</button>
  </li>
</template>

<script>
export default {
  props: {
    station: Object
  }
};
</script>