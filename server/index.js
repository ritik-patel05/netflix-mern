require('dotenv').config();
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const initializeDBConnection = require('./config/db.connect');
const userRouter = require('./routers/user.router')
const errorHandler = require('./middlewares/errorHandler');
const routeHandler = require('./middlewares/routeHandler');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Secure our Express apps by setting various HTTP headers.
app.use(compression()); // Compress routes
app.use(cors());

initializeDBConnection();

app.get('/', (req, res) => {
	return res.send({
		status: 'Hey, You entered into our backend world!',
	});
});

app.use("/users", userRouter);

app.use(routeHandler);
app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log('Backend Server is Up!');
});
