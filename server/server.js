const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, serverNod) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    serverNod();
    
  });

  socket.on('createLocationMessage', (coords) => {
  	io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

app.get('/', () => {
    res.sendFile(__dirname + 'index.html');
})

server.listen(port, () => {
    console.log(`Check this out on port ${port}!`)
})