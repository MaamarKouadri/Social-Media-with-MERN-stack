/** @format */

const { Router } = require('express');

const UserDB = require('../database/Schemas/user');
const PostDB = require('../database/Schemas/posts');
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

router.put('/Update', async (req, res) => {
	console.log('Inside the update profile route ');
	try {
		if (!req.file) {
			const {
				id,
				FirstName,
				LastName,
				Country,
				ProfileDescription,
				Profession,
			} = req.body;
			const filter = { _id: id };
			var update = {};

			var dict = {};

			dict['key'] = 'testing';

			console.log(dict);

			const profession = '';
			if (Profession !== undefined) {
				update['Profession'] = Profession;
				console.log('Update is ');
				console.log(update);
			}

			if (FirstName !== undefined) {
				update['FirstName'] = FirstName;
			}

			const lastName = '';
			if (LastName !== undefined) {
				update['LastName'] = LastName;
			}
			const country = '';
			if (Country !== undefined) {
				update['Country'] = Country;
			}

			const firstName = '';
			const profileDescription = '';
			if (ProfileDescription !== undefined) {
				update['ProfileDescription'] = ProfileDescription;
			}

			console.log('Update is');
			console.log(update);

			const Updated = await UserDB.findOneAndUpdate(filter, update);
		} else {
			const imageURL = req.file.path;

			const myArray = imageURL.split('Images\\');

			const path = myArray[1];
			var FinalPath = path.replace(/\\/g, '/').toString();
			console.log('Final Path is ');
			console.log(FinalPath);

			const {
				id,
				FirstName,
				LastName,
				Country,
				ProfileDescription,
				Profession,
			} = req.body;
			const filter = { _id: id };
			const update = {};

			const profession = '';
			if (Profession !== undefined) {
				update['Profession'] = Profession;
			}
			const firstName = '';
			if (FirstName !== undefined) {
				update['FirstName'] = FirstName;
			}
			const lastName = '';
			if (LastName !== undefined) {
				update['LastName'] = LastName;
			}
			const country = '';
			if (Country !== undefined) {
				update['Country'] = Country;
			}

			const profileDescription = '';
			if (ProfileDescription !== undefined) {
				update['ProfileDescription'] = ProfileDescription;
			}
			const Image = '';
			if (FinalPath !== undefined) {
				update['img'] = FinalPath;
			}

			console.log('Update is');
			console.log(update);

			const Updated = await UserDB.findOneAndUpdate(filter, update);

			const filter2 = { creator: id };
			var update2 = {};
			update2['imageUrl'] = FinalPath;

			console.log('Updating all the posts ');
			const UpdatedPosts = PostDB.updateMany(
				{ creator: id },
				{ $set: { imageUrl: FinalPath } }
			);
			console.log('-----------------------------');
			console.log(UpdatedPosts);
			console.log('-----------------------------');
		}

		res.status(200).json('User Updated');
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
