/** @format */

const { Router } = require('express');

const UserDB = require('../database/Schemas/user');
const router = Router();

//get a user
router.get('/', async (req, res) => {
	console.log('Inside  retreive unique user');
	const userId = req.query.userId;
	try {
		const loadedUser = userId
			? await UserDB.findById(userId)
			: await UserDB.findOne({ username: username });
		const {
			_id,
			FirstName,
			LastName,
			ProfileDescription,
			email,
			Age,
			Profession,
			Country,
			NumberFriends,
			Friends,
			isAdmin,
			isConnected,
			img,
		} = loadedUser;
		res.status(200).json(loadedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get a user by Id
router.get('/:userId', async (req, res) => {
	console.log('Inside retreive other user route ');
	console.log(req);
	try {
		const userId = req.query.userId;
		console.log('User Id is ');
		console.log(userId);
		const loadedUser = await UserDB.findById(userId);

		const {
			_id,
			FirstName,
			LastName,
			ProfileDescription,
			email,
			Age,
			Profession,
			Country,
			NumberFriends,
			Friends,
			isAdmin,
			isConnected,
			img,
		} = loadedUser;
		console.log('loadedUser is');
		res.status(200).json(loadedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Get User by Email
router.get('/Email/:email', async (req, res) => {
	console.log('Inside retreive other user route ');
	try {
		const Email = req.params.email;
		console.log('Email is ');
		console.log(Email);
		const loadedUser = await UserDB.find({
			email: { $in: [Email] },
		});

		if (loadedUser[0] !== undefined) {
			const message = 'There is already a user with the email ' + Email;
			res.json(message);
		} else {
			const message = '';
			console.log('loadedUser is');
			res.status(200).json(message);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
