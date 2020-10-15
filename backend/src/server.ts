import express from 'express';
import socketio from 'socket.io';

const app = express();
const port = 4113;

const server = app.listen(`${port}`, function() {
  console.log(`Server started on port ${port}`);
});

const io = socketio(server);
    
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        socket.emit("oh", "oh");
    });
    socket.on('createRoom', function(room: string) {
        socket.join(room);
        console.log(socket.adapter.rooms);
        socket.emit("createRoom", "success");
    });
    socket.on('joinRoom', function(room: string) {
        socket.emit("joinRoom", "success");
    });
});