/** @format */
import { getUserPending, getUserSuccess, getUserFail } from './userSlice';
import axios from 'axios';
import { FetchUser } from './userLogin';

export const getUserProfile = () => async (dispatch) => {
	try {
		console.log('inside get user profile');
		dispatch(getUserPending());
		const user = await FetchUser();
		console.log('The fetched user is ');
		console.log(user);

		return user;
		//	const res = await axios.getUserFail('http://localhost:5000/auth/Retreive', data);
	} catch (error) {
		dispatch(getUserFail(error.message));
	}
};

export const getAllUsers = async () => {
	console.log('We are inside get All posts');
	try {
		const AllUsers = await axios.get(
			'http://localhost:5000/Users/AllUsers/all'
		);
		return AllUsers.data;
		//	const res = await axios.getUserFail('http://localhost:5000/auth/Retreive', data);
	} catch (error) {
		console.log(error);
	}
};
