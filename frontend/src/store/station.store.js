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
        loadStation(state, { station }) {
            state.currStation = station;
        }
    },
    actions: {
        async loadStation(context, { stationId }) {
            const station = await stationService.getById(stationId);
            context.commit('loadStation', station);
            return station;
        }
    }
}