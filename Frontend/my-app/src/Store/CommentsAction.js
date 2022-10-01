/** @format */

import axios from 'axios';

export const SendComment = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log('Trying to send a post');
			const res = await axios.post('http://localhost:5000/Comments', data);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const DeleteComment = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log('Trying to delete a Post');
			const res = await axios.delete('http://localhost:5000/Comments/' + id);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const getAllComment = async (PostId) => {
	console.log('We are inside get All posts');
	try {
		const AllPosts = await axios.get(
			'http://localhost:5000/Comments/All/' + PostId
		);
		console.log(AllPosts.data);
		return AllPosts.data;
		//	const res = await axios.getUserFail('http://localhost:5000/auth/Retreive', data);
	} catch (error) {
		console.log(error);
	}
};
