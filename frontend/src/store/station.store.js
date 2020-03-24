import stationService from '@/services/station.service.js';

export default {
    state: {
        stations: [],
        filterBy: {
            name: '',
            tag: '',
            _sort: 'likes',
            _order: 1
        },
        currStation: null,
        tags: []
    },
    getters: {
        stations(state) {
            return state.stations;
        },
        currStation(state) {
            return state.currStation;
        },
        filterBy(state) {
            return state.filterBy;
        },
        tags(state){
            return state.tags;
        }
    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations;
        },
        setStation(state, { station }) {
            state.currStation = station;
        },
        setTags (state, { tags }){
            state.tags = tags;
        },

        setFilterBy (state, {filterBy}){
            state.filterBy = filterBy;
        },

        saveStation(state, { station }) {
            const idx = state.stations.findIndex(currStation => currStation._id === station._id);
            if (idx === -1) {
                state.stations.unshift(station);
            } else {
                state.stations.splice(idx, 1, station);
            }
        },
        addSong(state, { song }) {
            state.currStation.songs.push(song);
        },
        removeSong(state, { songId }) {
            const idx = state.currStation.songs.findIndex(song => song.id === songId);
            if (idx === -1) return;
            state.currStation.songs.splice(idx, 1);
        },
        reorderSongs(state, { songs }) {
            state.currStation.songs = songs;
        }
    },
    actions: {

        async loadTags(context){
            const tags = await stationService.getTags();
            console.log("tags from store:", tags);
            context.commit({type: 'setTags', tags})
            return tags;
        },

        async loadStations(context) {
            const stations = await stationService.query(context.getters.filterBy);
            context.commit({ type: 'setStations', stations });
            return stations;
        },
        async loadStation(context, { stationId }) {
            const station = await stationService.getById(stationId);
            context.commit({ type: 'setStation', station });
            return station;
        },

        setFilterBy(context, payload) {
            context.commit(payload)
            return context.dispatch({type: 'loadStations'})
        },

        saveStation(context, { station }) {
            station = stationService.save(station);
            context.commit({ type: 'saveStation', station });
        },
        addSong(context, payload) {
            context.commit(payload);
            context.dispatch({ type: 'saveStation', station: context.getters.currStation });
        },
        removeSong(context, payload) {
            context.commit(payload);
            context.dispatch({ type: 'saveStation', station: context.getters.currStation });
        },
        reorderSongs(context, payload) {
            context.commit(payload);
            context.dispatch({ type: 'saveStation', station: context.getters.currStation });
        }
    }
}