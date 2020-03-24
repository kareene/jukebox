<template>
    <article class="song-add">
        <h2>Add a great song</h2>
        <form @submit.prevent="searchForSongs">
            <input type="text" v-model="searchStr" />
            <button class="search-btn buttons">Search</button>
        </form>
        <section class="songs-list-in-search" v-if="songSearchResults.length">
            <ul v-for="song in songSearchResults" :key="song.id">
                <li>
                    <img :src="song.imgUrl" />
                    <p>{{song.title}}</p>
                    <button class="fas fa-plus" @click.stop="addSong(song)"></button>
                </li>
            </ul>
        </section>
    </article>
</template>

<script>
import youtubeService from '@/services/youtube.service.js'

export default {
    name: 'songAdd',
    data() {
        return {
            searchStr: '',
            songSearchResults: []
        }
    },
    methods: {
        async searchForSongs() {
            this.songSearchResults = await youtubeService.getVideoSearchResults(this.searchStr);
        },
        addSong(song) {
            this.$emit('add-song', song);
            const idx = this.songSearchResults.findIndex(currSong => currSong.id === song.id);
            if (idx !== -1) this.songSearchResults.splice(idx, 1);
        }
    }
}
</script>