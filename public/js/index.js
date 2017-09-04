var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  console.log(message.createdAt)
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
  	from: message.from,
  	text: message.text,
  	createdAt: message.createdAt,
  });

  $('#messages').append(html)

  // var li = $('<li></li>')
  // li.text(`${message.from} - ${message.createdAt}: ${message.text} `)

  // $('#messages').append(li)
});

socket.on('newLocationMessage', function(message) {
	console.log(message)
	var template = $('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: message.createdAt
	})

	$('#messages').append(html)

	// var li = $('<li></li>');
	// var a = $('<a target="_blank">My Current Location</a>');

	// li.text(`${message.from} - ${message.createdAt}: `);
	// a.attr('href', message.url);
	// li.append(a);

	//  $('#messages').append(li)
})


navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position);
});


$('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextBox = $('[name=message]')

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val('')
	})
})

var locationButton = jQuery('#send-location')
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }
    locationButton.attr('disabled', 'disabled').text('Sending location')

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location')
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
    	locationButton.removeAttr('disabled').text('Send location')
        alert('unable to fetch location')
    })
});
