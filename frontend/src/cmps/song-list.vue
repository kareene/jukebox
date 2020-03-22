<template>
    <article v-if="songs">
        <ul class="song-list">
            <li class="song-in-list" v-for="song in songs" :key="song.id" :class="{ playing: song.id === playingSongId }" >
                <p>{{song.title}}</p>
                <button class="remove-song-btn" @click="removeSong(song.id)">X</button>
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