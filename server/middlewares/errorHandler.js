const errorHandler = (req, res) => {
	res.status(404).json({
		success: false,
		message: 'Route not found on server, please verify the url.',
	});
};

module.exports = errorHandler;
