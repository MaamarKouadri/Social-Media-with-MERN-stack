/** @format */

const { validationResult } = require('express-validator');
const Post = require('../Schemas/posts');

exports.createPost = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect.');
		error.statusCode = 422;
		throw error;
	}

	if (!req.file) {
		const error = new Error('No Image provided');
		error.stautsCode = 422;
		throw error;
	}

	const imageURL = req.file.path.repalce('\\', '/');
	const title = req.body.title;
	const content = req.body.content;
	const post = new Post({
		title: title,
		content: content,
		imageUrl: '../../../Frontend/my-app/src/Images/couscous.jpg',
		creator: { name: 'Maamar' },
	});
	post
		.save()
		.then((result) => {
			res.status(201).json({
				message: 'Post created successfully!',
				post: result,
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
			console.log(err);
		});
};

exports.getPost = (req, res, next) => {
	console.log('Paramis post ID is ' + req.params.postId);
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
};
