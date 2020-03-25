module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('join station', stationId => {
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
            io.to(socket.myStation).emit('player updatePlaylist', playlist);
        });
    })
}