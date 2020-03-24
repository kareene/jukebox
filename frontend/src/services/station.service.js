export default {
    query,
    getById,
    save,
    getTags
}

var gStations = _createStations();

function query(filterBy = {}) {
    if (filterBy.tag) {
        var filteredStations = gStations.filter( station => {
            station.tags.includes(filterBy.tag)
        })
        return Promise.resolve(filteredStations)
    }
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
        likedBy: [],
        songs: [],
        chatMsgs: [],
        theme: ""
    }

    return Promise.resolve(station)
}

function save(station) {
    if (station._id) {
        const idx = gStations.findIndex(currStation => currStation._id === station._id);
        gStations.splice(idx, 1, station);
    } else {
        station._id = _makeId()
        gStations.unshift(station)
    }

    localStorage.setItem('stations', JSON.stringify(gStations));
    return station;


}


function getTags(){
    return Promise.resolve(['happy', 'dance', 'chill', 'kids'])
}

function _makeId(length = 8) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createStations() {
    var stations = JSON.parse(localStorage.getItem('stations'));
    if (!stations || !stations.length) {
        stations = [{
                _id: 'oskfdkfo',
                name: 'Party on the roff',
                tags: ['dance', 'happy'],
                imgUrl: '//dhwwtar19mmjy.cloudfront.net/videograbber/wp-content/uploads/2017/03/album-cover.jpg.webp',
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
                        id: 'M-aoyPa41Ic',
                        title: 'Mahmood - Soldi',
                        videoUrl: 'https://www.youtube.com/embed/M-aoyPa41Ic',
                        addedBy: {
                            _id: 'eksnfits',
                            fullName: 'Rotem Yehiel',
                            urlImg: 'api.adorable.io/avatars/100/20.png'
                        }
                    },
                    {
                        id: 'hfjHJneVonE',
                        title: 'Verka Serduchka - Dancing Lasha Tumbai',
                        videoUrl: 'https://www.youtube.com/embed/hfjHJneVonE',
                        addedBy: {
                            _id: 'eksnfits',
                            fullName: 'Rotem Yehiel',
                            urlImg: 'api.adorable.io/avatars/100/20.png'
                        },

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
                tags: ['chill'],
                imgUrl: 'https://cdn.vox-cdn.com/thumbor/88Ak89PINGGhye90mf40bYHgb6M=/0x109:493x438/1200x800/filters:focal(0x109:493x438)/cdn.vox-cdn.com/uploads/chorus_image/image/49449809/Screen_Shot_2016-05-01_at_12.14.34_PM.0.0.png',
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
                        id: 'M-aoyPa41Ic',
                        title: 'Mahmood - Soldi',
                        videoUrl: 'https://www.youtube.com/embed/M-aoyPa41Ic',
                        addedBy: {
                            _id: 'eksnfits',
                            fullName: 'Rotem Yehiel',
                            urlImg: 'api.adorable.io/avatars/100/20.png'
                        }
                    },
                    {
                        id: 'hfjHJneVonE',
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
                _id: 'lkjfgdiufgypiu2t',
                name: 'That Old School Flavor',
                tags: ['dance', 'happy'],
                imgUrl: 'https://images.8tracks.com/cover/i/000/074/723/tumblr_m26iguKoGE1qc05pbo1_1280-3201.jpg?rect=0,0,721,721&q=98&fm=jpg&fit=max',
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
                        id: 'M-aoyPa41Ic',
                        title: 'Mahmood - Soldi',
                        videoUrl: 'https://www.youtube.com/embed/M-aoyPa41Ic',
                        addedBy: {
                            _id: 'eksnfits',
                            fullName: 'Rotem Yehiel',
                            urlImg: 'api.adorable.io/avatars/100/20.png'
                        }
                    },
                    {
                        id: 'hfjHJneVonE',
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
                _id: 'lkjfgdiufgypyu3t',
                name: 'Far away from home',
                tags: ['kids'],
                imgUrl: 'https://images.8tracks.com/imgix/i/009/659/911/Z3B5CBI-8362.gif?rect=72,0,422,422&q=65&fit=max',
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
                        id: 'M-aoyPa41Ic',
                        title: 'Mahmood - Soldi',
                        videoUrl: 'https://www.youtube.com/embed/M-aoyPa41Ic',
                        addedBy: {
                            _id: 'eksnfits',
                            fullName: 'Rotem Yehiel',
                            urlImg: 'api.adorable.io/avatars/100/20.png'
                        }
                    },
                    {
                        id: 'hfjHJneVonE',
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