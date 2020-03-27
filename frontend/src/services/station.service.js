import httpService from './http.service';

export default {
    query,
    getTags,
    getById,
    remove,
    save,
    getEmptyFilter
};

function query(filterBy) {
    const params = new URLSearchParams(filterBy);
    console.log(`station?${params}`)
    return httpService.get(`station?${params}`);
}

function getTags() {
    return httpService.get('station/tag');
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

function getEmptyFilter() {
    return  {
       
            name: '',
            tag: '',
            _sort: 'name',
            _order: 1
        }
    
}


function remove(stationId) {
    return httpService.delete(`station/${stationId}`);
}

function save(station) {
    return (station._id) ?
        httpService.put(`station/${station._id}`, station) :
        httpService.post('station', station);
}