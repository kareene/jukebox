import httpService from './http.service';

export default {
    query,
    getTags,
    getById,
    remove,
    save,
    getEmptyStation
};

function query(filterBy) {
    const params = new URLSearchParams(filterBy);
    return httpService.get(`station?${params}`);
}

function getTags() {
    return httpService.get('station/tag');
}

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

function remove(stationId) {
    return httpService.delete(`station/${stationId}`);
}

function save(station) {
    return (station._id) ?
        httpService.put(`station/${station._id}`, station) :
        httpService.post('station', station);
}

function getEmptyStation() {
    return {
        name: '',
        imgUrl: '',
        tags: [],
        likedBy: [],
        songs: [],
        chatMsgs: []
    }
}