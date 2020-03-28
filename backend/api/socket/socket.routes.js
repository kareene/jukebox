module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('joinStation', ({ stationId, user }) => {
            if (socket.myStation) {
                socket.leave(socket.myStation);
            }
            socket.join(stationId);
            socket.myStation = stationId;
        });
        socket.on('chat newMsg', msg => {
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.myStation).emit('chat addMsg', msg);
        });
        socket.on('chat userTyping', username => {
            socket.broadcast.to(socket.myStation).emit('chat displayTyping', username);
        });
        socket.on('player playlistUpdated', playlist => {
            socket.broadcast.to(socket.myStation).emit('player updatePlaylist', playlist);
        });
        socket.on('player songPaused', () => {
            socket.broadcast.to(socket.myStation).emit('player pauseSong');
        });
        socket.on('player songPlayed', () => {
            socket.broadcast.to(socket.myStation).emit('player playSong');
        });
        socket.on('player songTimeUpdated', time => {
            socket.broadcast.to(socket.myStation).emit('player updateSongTime', time);
        });
        socket.on('player newSongPlayed', songId => {
            socket.broadcast.to(socket.myStation).emit('player playNewSong', songId);
        });
    })
}