var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = $('<li></li>')
  li.text(`${message.from}: ${message.text}`)

  $('#messages').append(li)
});

const serverNod = function (data) {
	console.log('Got it', data)
}

$('#message-form').on('submit', (e) => {
	e.preventDefault();
	console.log('clicked')

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function() {

	})

	
})