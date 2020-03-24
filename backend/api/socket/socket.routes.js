module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg => {
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.myChatRoom).emit('chat addMsg', msg);
        });
        socket.on('chat userTyping', username => {
            socket.broadcast.to(socket.myChatRoom).emit('chat displayTyping', username);
        });
        socket.on('chat room', stationId => {
            if (socket.myChatRoom) {
                socket.leave(socket.myChatRoom);
            }
            socket.join(stationId);
            socket.myChatRoom = stationId;
        });
    })
}