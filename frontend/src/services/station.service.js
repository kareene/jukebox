export default {
    query,
    getById,
    save
}

var gStations = _createStations();

function query(filterBy = {}) {
    return Promise.resolve(JSON.parse(JSON.stringify(gStations)))
}

function getById(stationId) {
    const station = (stationId) ? gStations.find(station => station._id === stationId) : {
        _id: "",
        name: "",
        tags: [],
        createdBy: {
            _id: "",
            fullName: "",
            urlImg: ""
        },
        likedBy: "",
        songs: null,
        chatMsgs: "",
        theme: ""
    }

    return Promise.resolve(station)
}

function save(station) {
    const idx = gStations.findIndex(currStation => currStation._id === station._id);
    // if (toyIdx === -1) throw new Error('toy not found')
    gStations.splice(idx, 1, station);
    localStorage.setItem('stations', JSON.stringify(gStations));


}

function _createStations() {
    var stations = JSON.parse(localStorage.getItem('stations'));
    if (!stations || !stations.length) {
        stations = [{
                _id: 'oskfdkfo',
                name: 'Party on the roff',
                tags: ['dance', 'happy'],
                createdBy: {
                    _id: 'eksnfits',
                    fullName: 'Rotem Yehiel',
                    urlImg: 'api.adorable.io/avatars/100/20.png'
                },
                likedBy: [{
                        _id: 'edfjhfdg',
                        fullName: 'Kareene Komet',
                        urlImg: 'api.adorable.io/avatars/100/3.png'
                    },
                    {
                        _id: 'edfjhfdg',
                        fullName: 'Limor Abaev',
                        urlImg: 'api.adorable.io/avatars/100/2.png'
                    }
                ],
                songs: [{
                        id: 'dfsgdfgsdf',
                        title: 'Mahmood - Soldi',
                        videoUrl: 'https://www.youtube.com/embed/M-aoyPa41Ic',
                        addedBy: {
                            _id: 'eksnfits',
                            fullName: 'Rotem Yehiel',
                            urlImg: 'api.adorable.io/avatars/100/20.png'
                        }
                    },
                    {
                        id: 'lkdfdsjfkgh',
                        title: 'Verka Serduchka - Dancing Lasha Tumbai',
                        videoUrl: 'https://www.youtube.com/embed/hfjHJneVonE',
                        addedBy: {
                            _id: 'eksnfits',
                            fullName: 'Rotem Yehiel',
                            urlImg: 'api.adorable.io/avatars/100/20.png'
                        }
                    }
                ],
                chatMsgs: [{
                        fullName: 'Rotem Yehiel',
                        txt: 'Welcome to the house of fun'
                    },
                    {
                        fullName: 'Guest',
                        txt: 'Graet music'
                    }
                ],
                theme: 'happy'
            },
            {
                _id: 'lkjfgdiufgypiuyt',
                name: 'Night night',
                tags: ['dance', 'happy'],
                createdBy: {
                    _id: 'eksnfits',
                    fullName: 'Rotem Yehiel',
                    urlImg: 'api.adorable.io/avatars/100/20.png'
                },
                likedBy: [{
                        _id: 'edfjhfdg',
                        fullName: 'Kareene Komet',
                        urlImg: 'api.adorable.io/avatars/100/3.png'
                    },
                    {
                        _id: 'edfjhfdg',
                        fullName: 'Limor Abaev',
                        urlImg: 'api.adorable.io/avatars/100/2.png'
                    }
                ],
                songs: [{
                        id: 'dfsgdfgsdf',
                        title: 'Mahmood - Soldi',
                        videoUrl: 'https://www.youtube.com/embed/M-aoyPa41Ic',
                        addedBy: {
                            _id: 'eksnfits',
                            fullName: 'Rotem Yehiel',
                            urlImg: 'api.adorable.io/avatars/100/20.png'
                        }
                    },
                    {
                        id: 'lkdfdsjfkgh',
                        title: 'Verka Serduchka - Dancing Lasha Tumbai',
                        videoUrl: 'https://www.youtube.com/embed/hfjHJneVonE',
                        addedBy: {
                            _id: 'eksnfits',
                            fullName: 'Rotem Yehiel',
                            urlImg: 'api.adorable.io/avatars/100/20.png'
                        }
                    }
                ],
                chatMsgs: [{
                        fullName: 'Rotem Yehiel',
                        txt: 'Welcome to the house of fun'
                    },
                    {
                        fullName: 'Guest',
                        txt: 'Graet music'
                    }
                ],
                theme: 'happy'
            }
        ];
        localStorage.setItem('stations', JSON.stringify(stations));
    }
    return stations
}