const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection', (socket) => {
	console.log('new user connected');

	//socket.emit from admin text 'Welcome to Chat App'
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'))
	// socket.on('userJoins', (user) => {
	// 	console.log(`Welcome to the Chat App ${user.user}`)
	// 	socket.broadcast.emit('userJoined', {
	// 		greeting: `${user.user} has joined!`
	// 	})
	// })

	//socket.broadcast.emit for 'New User Joined'
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined!'))


	socket.on('createMessage', (message) => {
		// console.log('createMessage', message)
		io.emit('newMessage', generateMessage(message.from, message.text))
	})

	socket.on('disconnect', () => {
		console.log('client disconnected')
	});
})

app.get('/', () => {
	res.sendFile(__dirname + 'index.html');
})

server.listen(port, () => {
	console.log(`Check this out on port ${port}!`)
})