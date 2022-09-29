/** @format */

import axios from 'axios';
import { ImportPosts, EmptyPosts } from './PostsSlice';

export const SendPost = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log('Trying to send a post');
			const res = await axios.post('http://localhost:5000/Posts/Create', data);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const GetPost = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log('Trying to get one  post');
			console.log('The ID is ');
			console.log(id);
			console.log('The URL is ');
			console.log('http://localhost:5000/Posts/' + id);

			const res = await axios.get('http://localhost:5000/Posts/' + id);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const getAllPosts = () => async (dispatch) => {
	console.log('We are inside get All posts');
	try {
		const AllPosts = await axios.get('http://localhost:5000/Posts/AllPosts');
		dispatch(ImportPosts(AllPosts.data));
		return AllPosts.data;
		//	const res = await axios.getUserFail('http://localhost:5000/auth/Retreive', data);
	} catch (error) {
		console.log(error);
		dispatch(EmptyPosts());
	}
};
