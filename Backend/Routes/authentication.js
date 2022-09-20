/** @format */

const { Router } = require('express');
//const router = require('./api');
const router = Router();
const UserDB = require('../database/Schemas/user');
const PostDB = require('../database/Schemas/posts');
const multer = require('multer');
const UserController = require('../database/Controllers/users');
const fs = require('fs');

const isAuth = require('../database/middlewares/is-auth');

router.get('/Retreive', isAuth, UserController.getUserProfile);
router.post('/Create', UserController.createUser);

router.post('/login', UserController.login);

//Get User by Email
router.get('/AllUsers', async (req, res) => {
	console.log('Inside retreive all  users route ');
	try {
		const AllUsers = await UserDB.find({});

		const AllIDs = [];

		AllUsers.forEach(function (x) {
			AllIDs.push(x._id);
		});

		res.status(200).json(AllIDs);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/register', async (request, response) => {
	console.log('inside register route ');

	console.log(request.body);

	const {
		FirstName,
		LastName,
		password,
		ProfileDescription,
		email,
		Age,
		Profession,
		Country,
		NumberFriends,
		Friends,
		isAdmin,
		isConnected,
		//Image,
	} = request.body;
	console.log('Upload image inside the api ');

	//	formdata.append('image', UploadImage, UploadImage.name);
	//console.log(formdata);
	//console.log(...Image);
	/*
	const img = {
		data: fs.readFileSync('../Frontend/my-app/src/Images/maamar.PNG'),
		contentType: 'image/png',
	};
	*/
	console.log('inside register 2 ');
	try {
		const userDB = await UserDB.findOne({
			$and: [{ FirstName }, { LastName }],
		});

		if (userDB) {
			response.status(400).send({ msg: 'User already exists ! ' });
			console.log('User already exists ! ');

			console.log(userDB.FirstName);

			console.log(userDB.LastName);

			console.log(userDB.password);

			console.log(userDB.ProfileDescription);
		} else {
			const newUser = await UserDB.create({
				FirstName,
				LastName,
				password,
				ProfileDescription,
				email,
				Age,
				Profession,
				Country,
				NumberFriends,
				Friends,
				//img,
				isAdmin,
				isConnected,
			});
			newUser.save();
			console.log('User has been created ');
			//console.log(newUser);
			response.sendStatus(201);
		}
	} catch (e) {
		console.log('The error is ');
		console.log('---------------------------------------------------');
		console.log('This is my new profile ');

		console.log({ e });
	}
});

module.exports = router;
