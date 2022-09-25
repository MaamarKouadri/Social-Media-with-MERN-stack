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

router.get('/AllUsers/all', async (req, res, next) => {
	console.log('Inside retreive all  users route ');
	try {
		const AllUsers = await UserDB.find({});

		const AllUsersArray = [];

		let index = 1;
		AllUsers.forEach(function (loadedUser) {
			const {
				FirstName,
				LastName,
				email,

				img,
			} = loadedUser;

			let id = index;
			let Email = email;
			let firstName = FirstName;
			let lastName = LastName;
			let image = img;

			AllUsersArray.push({ id, firstName, lastName, image, Email });
			index = index + 1;
		});

		res.status(200).json(AllUsersArray);
	} catch (err) {
		console.log('The error is');
		console.log(err);
		res.status(500).json(err);
	}
});

router.delete('/:email', async (req, res) => {
	console.log('');
	console.log(req);
	try {
		const EmailDelete = req.params.email;
		console.log('User Id is ');
		console.log(EmailDelete);
		const field = await UserDB.deleteOne({
			email: { $in: [EmailDelete] },
		});

		console.log(field);
		res.status(200).json('');
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
