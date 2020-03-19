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
        updateStation(state, { stationToSave }) {
            console.log(stationToSave)
            const idx = state.stations.findIndex(currStation => currStation._id === stationToSave._id);
            // if (toyIdx === -1) throw new Error('toy not found')
            state.stations.splice(idx, 1, stationToSave);
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
        saveStation(context, { stationToSave }) {
            stationService.save(stationToSave);
            context.commit({ type: 'updateStation', stationToSave });


        }
    }
}