<template>
    <article class="song-add">
        <h2>song add</h2>
        <form @submit.prevent="searchForSongs">
            <input type="text" v-model="searchStr" />
            <button>Search</button>
        </form>
        <section v-if="songSearchResults.length">
            <ul v-for="song in songSearchResults" :key="song.id">
                <li>
                    <img :src="song.imgUrl" />
                    <p>{{song.title}}</p>
                    <button @click.stop="$emit('add-song', song)">+</button>
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
        }
    }
}
</script>