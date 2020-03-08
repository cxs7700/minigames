const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const port = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketIO(server) // Sets up new server instance of socket.io

io.on("connection", (socket) => {
  console.log("New user has connected.");
  
  // Join
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    
    if (error) {
      return callback(error);
    }
    
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined.`});
    socket.join(user.room);
    callback();
  });
  
  // Send move
  socket.on('playerTurn', (message, callback) => {
    const user = getUser(socket.id);
    
    io.to(user.room).emit('message', { user: user.name, text: message});
    
    callback();
  })
  
  // Incoming move
  socket.on("incomingMove", (move) => {
    socket.broadcast.emit("outgoing player move", {playerMove: move});
  });
  
  socket.on("disconnect", () => console.log("User has disconnected."));
});

// Use different routing files
app.use(router)

server.listen(port, () => console.log(`Listening on port ${port}`));