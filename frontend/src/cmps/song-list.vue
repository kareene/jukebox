<template>
    <article v-if="songs">
        <h2>Playlist</h2>
        <ul class="song-list">
            <li v-for="song in songs" :key="song.id">
                <p>{{song.title}}</p>
                <button @click="removeSong(song.id)">X</button>
            </li>
        </ul>
    </article>
</template>

<script>
export default {
    name: 'songList',
    props: {
        songs: Array
    },
    methods: {
        removeSong(songId) {
            this.$emit('remove-song', songId);
        }
    }
}
</script>