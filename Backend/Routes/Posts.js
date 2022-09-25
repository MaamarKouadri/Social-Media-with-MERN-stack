/** @format */

const express = require('express');
const { body } = require('express-validator');
const Post = require('../database/Schemas/posts');

const feedController = require('../database/Controllers/feed');

const router = express.Router();

// POST /feed/post
router.post('/Create', feedController.createPost);

router.get('/AllPosts', async (req, res, next) => {
	console.log('Inside retreive all  users route ');
	try {
		const AllPosts = await Post.find({});

		const AllPostsIDs = [];

		AllPosts.forEach(function (x) {
			AllPostsIDs.push(x._id);
		});

		res.status(200).json(AllPostsIDs);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/:postId', async (req, res, next) => {
	console.log('Trying to get one Post for ID ');
	console.log('Params post ID is ' + req.params.postId);
	const postId = req.params.postId;

	Post.findById(postId)
		.then((post) => {
			if (!post) {
				console.log('Could not find post');
				const error = new Error('Could not find post');
				error.statusCode = 404;
				throw error;
			} else {
				console.log('Post fetched');
				res.status(200).json({ message: 'Post fetched.', post: post });
			}
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
});

module.exports = router;
