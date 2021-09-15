// Error Handling Middleware(i.e why takes 4 parameters)

// eslint-disable-next-line no-unused-vars
const routeHandler = (err, _req, res, _next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: 'error occured, see the errMessage key for more details',
		errorMessage: err.message,
	});
};

module.exports = routeHandler;
