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
			const res = await axios.get('http://localhost:5000/Posts/' + id);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const DeletePost = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log('Inside the Delete Posts Action');
			console.log(`http://localhost:5000/Posts/Delete/${id}`);
			const res = await axios.delete(
				`http://localhost:5000/Posts/Delete/${id}`
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const getAllPosts = () => async (dispatch) => {
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

export const ManageNumberOfLikes = (UserID, id, action) => {
	console.log(id);
	console.log(action);
	if (action === 'add') {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.put(
					'http://localhost:5000/Posts/AddLike/' + id + '/' + UserID
				);
				resolve(res.data);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}

	if (action === 'remove') {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.put(
					'http://localhost:5000/Posts/RemoveLike/' + id + '/' + UserID
				);
				resolve(res.data);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}
};
