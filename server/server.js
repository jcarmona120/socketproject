const express = require('express')
const path = require('path')

const app = express();

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.get('/', () => {
	res.sendFile(__dirname + 'index.html');
})

app.listen(port, () => {
	console.log(`Check this out on port ${port}!`)
})