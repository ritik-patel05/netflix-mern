require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-undef
const secret = process.env.JWT_SECRET;

// SIGN UP
const signup = async (req, res) => {
	try {
		const { username, password, email } = req.body;

		const userWithSameUserName = await User.findOne({ username: username });
		if (userWithSameUserName) {
			return res.json({
				success: false,
				message: 'Username already exists.',
			});
		}

		const userWithSameEmail = await User.findOne({ email: email });
		if (userWithSameEmail) {
			return res.json({
				success: false,
				message: 'User with this email already exists.',
			});
		}

		try {
			const encryptedPassword = await bcrypt.hash(password, 10);
			const newUser = new User({
				username,
				email,
				password: encryptedPassword,
			});

			const savedUser = await newUser.save();
			const token = jwt.sign(
				{ _id: savedUser._id, email: savedUser.email },
				secret,
				{
					expiresIn: '5d',
				}
			);

			res.json({
				success: true,
				message: 'User Signed Up successfully.',
				user: savedUser,
				token,
			});
		} catch (error) {
			console.log(error);
			res.json({
				success: false,
				message: 'An unexpected error occurred.',
			});
		}
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: 'An unexpected error occurred.' });
	}
};

// LOG IN
const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email }).catch((error) =>
		console.log(error)
	);

	if (!user) {
		return res.json({
			success: false,
			message: 'No account exists with this email.',
		});
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		return res.json({
			success: false,
			message: 'Incorrect Password.',
		});
	}

	const token = jwt.sign(
		{
			id: user._id,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		secret,
		{ expiresIn: '5d' }
	);

	return res.json({
		success: true,
		message: 'Log In Successful.',
		user,
		token,
	});
};

module.exports = { login, signup };
