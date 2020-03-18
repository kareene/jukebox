import { stationService } from '@/services/station.service.js';

export default {
    state: {
        stations: [],
        filterBy: {
            name: '',
            tag: '',
            _sort: 'likes',
            _order: 1
        }
    },
    getters: {
        stations(state) {
            return state.stations;
        },
        filterBy(state) {
            return state.filterBy;
        }
    },
    mutations: {
    },
    actions: {
    }
}