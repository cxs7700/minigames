const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketIO(server) // Sets up new server instance of socket.io

// On connection, you get a socket
io.on("connection", socket => {
  console.log("New client connected.");
  
  socket.on("incoming player move", (move) => {
    socket.broadcast.emit("outgoing player move", {playerMove: move});
  });
  
  socket.on("disconnect", () => console.log("Client disconnected."));
});

// Use different routing files
app.use(router)

server.listen(port, () => console.log(`Listening on port ${port}`));