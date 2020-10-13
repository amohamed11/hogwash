import express from 'express';
import socketio from 'socket.io';
const app = express();
const port = 4113;

const server = app.listen(`${port}`, function() {
  console.log(`Server started on port ${port}`);
});

const io = socketio(server);
    
io.on('connection', (socket) => {
    socket.on('joinRoom', function(room) {
        socket.join(room);
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit("oh", "oh");
    });
});