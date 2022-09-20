/** @format */

const express = require('express');
const { body } = require('express-validator');

const feedController = require('../database/Controllers/feed');

const router = express.Router();

// POST /feed/post
router.post(
	'/Create',
	[
		body('title').trim().isLength({ min: 7 }),
		body('content').trim().isLength({ min: 7 }),
	],
	feedController.createPost
);

router.get('/post/:postId', feedController.getPost);

module.exports = router;
