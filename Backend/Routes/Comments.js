/** @format */

const { Router } = require('express');

const CommentDB = require('../database/Schemas/Comments');
const router = Router();
const PostDB = require('../database/Schemas/posts');

router.get('/All/:PostID', async (req, res) => {
	console.log('Inside  get All Comments Route');
	try {
		const PostID = req.params.PostID;
		console.log('PostID) is ');
		console.log(PostID);
		const AllComments = await CommentDB.find({
			PostID: { $all: [PostID] },
		});

		const AllCommentsIDs = [];

		AllComments.forEach(function (x) {
			AllCommentsIDs.push(x);
		});
		console.log('All Comments IDs are ');
		console.log('-------------------------------------');
		console.log(AllCommentsIDs);
		console.log('-------------------------------------');

		res.status(200).json(AllCommentsIDs);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});
router.post('/', async (req, res) => {
	console.log('We are inside post Comment Route');
	console.log(req.body);
	const newComment = new CommentDB(req.body);
	try {
		const savedComment = await newComment.save();
		Post = await PostDB.findById(req.body.PostID);
		Post.Comments.push(savedComment);
		await Post.save();
		res.status(200).json(savedComment);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});
module.exports = router;
