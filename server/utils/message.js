const moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().format('h:mm:ss a')
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
	return {
		from, 
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: moment().format('h:mm:ss a')
	}
}

module.exports = {generateMessage, generateLocationMessage};
