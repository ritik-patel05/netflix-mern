require('dotenv').config();
const express = require('express');
const app = express();
const initializeDBConnection = require('./config/db.connect');
const errorHandler = require('./middlewares/errorHandler');
const routeHandler = require('./middlewares/routeHandler');

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8000;

initializeDBConnection();

app.get('/', (req, res) => {
	return res.send({
		status: 'Hey, You entered into our backend world!',
	});
});

app.use(routeHandler);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log('Backend Server is Up!');
});
