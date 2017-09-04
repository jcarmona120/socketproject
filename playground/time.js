const moment = require('moment')

var time = moment().format('h:mm:ss a');
console.log(time)

var date = moment().format("MMM Do, YYYY");
console.log(date)

var otherDate = moment();
console.log(otherDate.add(1, 'year').calendar())
console.log(otherDate.subtract(10, 'days').calendar())
console.log(moment().calendar());  

console.log(moment().format('h:mm a'))

