module.exports = connectSockets

function connectSockets(io) {
    var stationMap = {};
    io.on('connection', socket => {
        socket.on('joinStation', ({ stationId, user }) => {
            if (socket.myStation) {
                socket.leave(socket.myStation);
            }
            socket.join(stationId);
            socket.myStation = stationId;
            if (!stationMap[socket.myStation]) stationMap[socket.myStation] = {};
            if (!stationMap[socket.myStation].users) stationMap[socket.myStation].users = [user];
            else stationMap[socket.myStation].users.push(user);
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
        socket.on('player newSongPlayed', evData => {
            if (!stationMap[socket.myStation].songId || stationMap[socket.myStation].songId !== evData.songId) {
                stationMap[socket.myStation].songId = evData.songId;
                console.log(stationMap)
                console.log('save new song id', evData.songId);
            }
            if (!evData.userInitiated) return;
            socket.broadcast.to(socket.myStation).emit('player playNewSong', evData.songId);
        });
        socket.on('player firstSongRequsted', () => {
            const songId = (stationMap[socket.myStation].songId) ? stationMap[socket.myStation].songId : '';
            socket.emit('player playNewSong', songId);
        });
        
    })
}