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

socket.on('newLocationMessage', function(message) {
	console.log(message)
	var li = $('<li></li>');
	var a = $('<a target="_blank">My Current Location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);

	 $('#messages').append(li)
})

const serverNod = function (data) {
	console.log('Got it', data)
}

navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position);
});


$('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function() {

	})
})

var locationButton = jQuery('#send-location')
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        alert('unable to fetch location')
    })
});
