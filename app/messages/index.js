module.exports = function (io) {
    io.on('connect', (socket) => {
        socket.on('join', ({user, room}, callback) => {
            console.log('join in server!', user, room)
            socket.user = {room, user}

            socket.join(room);
            socket.broadcast.to(room).emit('notification', {isOnline: true, room});
            callback();
        });

        socket.on('newRentAd', (ad) => {
            // console.log('newRentAd', ad)
            io.emit('fetchRentAd', ad);
        });

        socket.on('sendMessage', (message, callback) => {
            console.log('message in server!', message)
            io.to(message.room).emit('message', message);
            callback();
        });

        socket.on('disconnect', () => {
            // const user = removeUser(socket.id);
            const user = socket.user

            if (user) {
                console.log('disconnect', user)
                if (user.room)
                    socket.broadcast.to(user.room).emit('notification', {isOnline: false, room: user.room});
            }

            // if (user) {
            // io.to(user.room).emit('message', {user: 'admin', text: `${user.name} не в сети`});
            // io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
            // }
        })
    });
}