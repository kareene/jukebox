import httpService from './http.service';

export default {
    query,
    getById,
    remove,
    save
};

function query(filterBy) {
    const params = new URLSearchParams(filterBy);
    return httpService.get(`station?${params}`);
}

function getById(stationId) {
    return (stationId) ?
        httpService.get(`station/${stationId}`) :
        Promise.resolve({
            name: '',
            imgUrl: '',
            tags: [],
            likedBy: [],
            songs: [],
            chatMsgs: []
        });
}

function remove(stationId) {
    return httpService.delete(`station/${stationId}`);
}

function save(station) {
    return (station._id) ?
        httpService.put(`station/${station._id}`, station) :
        httpService.post('station', station);
}