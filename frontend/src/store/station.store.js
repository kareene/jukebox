import stationService from '@/services/station.service.js';

export default {
    state: {
        stations: [],
        filterBy: {
            name: '',
            tag: '',
            _sort: 'name',
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
        unsetStation(state) {
            state.currStation = null;
        },
        addStation(state, { station }) {
            state.stations.unshift(station);
        },
        updateStation(state, { station }) {
            const idx = state.stations.findIndex(currStation => currStation._id === station._id);
            if (idx === -1) return;
            state.stations.splice(idx, 1, station);
        },
        addSong(state, { song }) {
            const loggedinUser = this.getters.loggedinUser;
            song.addedBy = {
                _id: loggedinUser._id,
                fullName: loggedinUser.fullName,
                imgUrl: loggedinUser.imgUrl
            };
            state.currStation.songs.push(song);
        },
        reorderSongs(state, { songs }) {
            state.currStation.songs = songs;
        },
        addTag(state, { tag }) {
            state.currStation.tags.push(tag);
        },
        removeTag(state, { tag }) {
            const idx = state.currStation.tags.findIndex(currTag => currTag === tag);
            state.currStation.tags.splice(idx, 1);
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
        async saveStation(context, { station }) {
            const isUpdate = !!station._id;
            if (!isUpdate) {
                const loggedinUser = context.getters.loggedinUser;
                station.createdBy = {
                    _id: loggedinUser._id,
                    fullName: loggedinUser.fullName,
                    imgUrl: loggedinUser.imgUrl
                };
            }
            station = await stationService.save(station);
            if (isUpdate) context.commit({ type: 'updateStation', station });
            else context.commit({ type: 'addStation', station });
        },
        addSong(context, payload) {
            context.commit(payload);
            context.dispatch({ type: 'saveStation', station: context.getters.currStation });
        },
        reorderSongs(context, payload) {
            context.commit(payload);
            context.dispatch({ type: 'saveStation', station: context.getters.currStation });
        }
    }
}