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

		const userWithSameUserName = await User.findOne({ username: username }).lean();
		if (userWithSameUserName) {
			return res.status(401).json({
				success: false,
				message: 'Username already exists.',
			});
		}

		const userWithSameEmail = await User.findOne({ email: email }).lean();
		if (userWithSameEmail) {
			return res.status(401).json({
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
				{ id: savedUser._id, email: savedUser.email, isAdmin: savedUser.isAdmin },
				secret,
				{
					expiresIn: '5d',
				}
			);

			res.status(201).json({
				success: true,
				message: 'User Signed Up successfully.',
				user: savedUser,
				token,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: 'An unexpected error occurred.',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
	}
};

// LOG IN
const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email }).lean().catch((error) =>
		console.log(error)
	);

	if (!user) {
		return res.status(400).json({
			success: false,
			message: 'No account exists with this email.',
		});
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		return res.status(400).json({
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

	return res.status(200).json({
		success: true,
		message: 'Log In Successful.',
		user,
		token,
	});
};

// UPDATE
const updateUser = async (req, res) => {
	if (req.user.isAdmin || req.user.id === req.params.id) {
		// if we are updating password, update the hash in db.
		if (req.body.password) {
			req.body.password = await bcrypt.hash(req.body.password, 10);
		}

		try {
			const updatedUser = await User.findByIdAndUpdate(req.params.id, 
				{
					$set: req.body
				}, {new: true}// this will return updated user.
			);
			
			return res.status(200).json({
				success: true,
				message: "Updated successfully.",
				user: updatedUser
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: 'Cannot update the user. Some error occured.'
			});
		}
	}

	return res.status(403).json({
		success: false,
		message: 'Not authorized.'
	});
}

// DELETE
const deleteUser = async (req, res) => {
	if (req.user.isAdmin || req.user.id === req.params.id) {
		try {
			await User.findByIdAndDelete(req.params.id);
			return res.status(200).json({
				success: true,
				message: "Deleted successfully.",
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: 'Cannot delete the user. Some error occured.',
			});
		}
	}

	return res.status(403).json({
		success: false,
		message: 'Not authorized.'
	});
}

// GET
const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).lean();
		// eslint-disable-next-line no-unused-vars
		const { password, ...info } = user;
		return res.status(200).json({
			success: true,
			message: "Success.",
			user: info
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Cannot get the user. Some error occurred.",
			user: null
		});
	}
}

// GET ALL
const getAllUsers = async(req, res) => {
	const query = req.query.new;
	if (req.user.isAdmin) {
		try {
			const users = query ? await User.find().sort({_id: -1}).limit(5).lean() : await User.find().lean(); // sort by _id in descending order.

			return res.status(200).json({
				success: true,
				message: "Success.",
				users: users
			})
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: "Error fetching all users.",
				users: null,
			});
		}
	}

	return res.status(403).json({
		success: false,
		message: 'Not authorized.'
	});
}

// GET USER STATS (users last year)
const getUserStatisticsInLastYear = async (req, res) => {
	const today = new Date();
	// eslint-disable-next-line no-unused-vars
	const lastYear = today.setFullYear(today.getFullYear() - 1);

	// find total users per month.
	// aggregate our documents per month.
	try {
		const data = await User.aggregate([
			{
				$project: {
					month: { $month: "$createdAt" },
				}
			}, {
				$group: {
					_id: "$month",
					total: { $sum: 1 },
				}
			}
		]);

		return res.status(200).json({
			success: false,
			message: "Success",
			users: data
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error fetching stats of users.",
		});
	}
}

module.exports = { login, signup, updateUser, deleteUser, getUser, getAllUsers, getUserStatisticsInLastYear };
