<template>
    <article v-if="songs">
        <h2>Playlist</h2>
        <ul class="song-list">
<<<<<<< HEAD
            <li  class="song-in-list" v-for="song in songs" :key="song.id">
                <p >{{song.title}}</p>
                <button class="remove-song-btn" @click="removeSong(song.id)">X</button>
=======
            <li v-for="song in songs" :key="song.id" :class="{ playing: song.id === playingSongId }" >
                <p>{{song.title}}</p>
                <button @click="removeSong(song.id)">X</button>
>>>>>>> 660d336a6b2d54d35877b7d7ff8e30c2179a4e23
            </li>
        </ul>
    </article>
</template>

<script>
export default {
    name: 'songList',
    props: {
        songs: Array,
        playingSongId: String
    },
    methods: {
        removeSong(songId) {
            this.$emit('remove-song', songId);
        }
    }
}
</script>