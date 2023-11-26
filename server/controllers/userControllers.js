import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../models/userModel.js';

// ============================================================================================

export const signUp = async (req, res) => {
	const { email, password, firstName, lastName, confirmPassword, isGuest } =
		req.body;

	try {
		if (!isGuest) {
			const existingUser = await UserModel.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ message: 'User already exists' });
			}
			if (password !== confirmPassword) {
				return res.status(400).json({ message: `Passwords don't match` });
			}
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await UserModel.create({
			email,
			password: hashedPassword,
			firstName,
			lastName,
			isGuest,
		});

		const token = jwt.sign(
			{
				email: newUser.email,
				_id: newUser._id,
				isGuest: newUser.isGuest,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '1d',
			}
		);

		res.status(200).json({
			token,
		});
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
	}
};
// ============================================================================================

export const signIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await UserModel.findOne({ email });

		if (!existingUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{
				email: existingUser.email,
				_id: existingUser._id,
				isGuest: existingUser.isGuest,
				firstName: existingUser.firstName,
				lastName: existingUser.lastName,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		);

		res.status(200).json({
			token,
		});
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong.' });
	}
};
// ============================================================================================

export const deleteUser = async (req, res) => {
	try {
		const { _id: userId } = req.tokenData;
		await UserModel.findByIdAndDelete(userId);
		res.status(201).json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong.' });
	}
};
// ============================================================================================

export const updateUser = async (req, res) => {
	try {
		const { firstName, lastName, email, currentPassword, newPassword } =
			req.body;
		const { _id: userId } = req.tokenData;
		const user = await UserModel.findById(userId);

		if (!user) {
			res.status(404).send({ message: `User doesn't exist` });
		}

		if (user.isGuest) {
			res.status(404).send({ message: `Cannot update guest user` });
		}

		const isPasswordCorrect = await bcrypt.compare(
			currentPassword,
			user.password
		);

		if (!isPasswordCorrect) {
			return res.status(404).send({ message: 'Incorrect current password' });
		}

		const newObject = {};
		if (firstName !== '') {
			newObject.firstName = firstName;
		}
		if (lastName !== '') {
			newObject.lastName = lastName;
		}
		if (email !== '') {
			newObject.email = email;
		}
		if (newPassword !== '') {
			newObject.password = await bcrypt.hash(newPassword, 12);
		}
		const updatedUser = await UserModel.findByIdAndUpdate(userId, newObject);

		const token = jwt.sign(
			{
				email: updatedUser.email,
				_id: updatedUser._id,
				isGuest: updatedUser.isGuest,
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '1d',
			}
		);

		res.status(200).json({ message: 'User updated successfully', token });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Something went wrong' });
	}
};
// ============================================================================================

export const getUserDetails = async (req, res) => {
	let userId = req.params.userId;

	if (userId === 'null') {
		userId = req.tokenData._id;
	}

	try {
		const user = await UserModel.findById(userId);

		if (!user) {
			res.status(404).send({ message: 'User does not exist' });
		}

		const userDetails = {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		};
		res.status(200).json({ userDetails });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

// ============================================================================================

export const getUsers = async (req, res) => {
	const { userName } = req.query;

	let users = [];

	if (userName === null || userName === '') {
		return res.status(200).json({ users });
	}

	try {
		const regExpName = new RegExp(userName, 'i');

		const queryObject = {};

		if (userName !== 'null' && userName !== '') {
			queryObject.$or = [{ firstName: regExpName }, { lastName: regExpName }];
		}
		const results = UserModel.find(queryObject);

		// deselect these field
		results.select('-password');
		results.select('-posts');
		results.select('-createdAt');
		results.select('-updatedAt');
		results.select('-isGuest');
		results.select('-email');

		users = await results;
		res.status(200).json({ users });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
