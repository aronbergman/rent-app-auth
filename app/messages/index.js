const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

io.on('connect', (socket) => {
    socket.on('join', ({user, room}, callback) => {
        console.log('join in server!', user, room)
        socket.user = {room, user}

        socket.join(room);
        socket.broadcast.to(room).emit('notification', {user: 'admin', message: `${user} в сети`});
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

        if (socket.user)
            console.log('disconnect',socket.user)
        // if (user) {
            // io.to(user.room).emit('message', {user: 'admin', text: `${user.name} не в сети`});
            // io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        // }
    })
});

server.listen(process.env.PORT || 5050, () => console.log(`Server has started.`));