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
        currStation: null
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
        }
    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations;
        },
        setStation(state, { station }) {
            state.currStation = station;
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