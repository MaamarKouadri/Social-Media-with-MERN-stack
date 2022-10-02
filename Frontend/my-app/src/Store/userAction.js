/** @format */
import { getUserPending, getUserSuccess, getUserFail } from './userSlice';
import axios from 'axios';
import { FetchUser } from './userLogin';

export const getUserProfile = () => async (dispatch) => {
	try {
		dispatch(getUserPending());
		const user = await FetchUser();

		return user;
		//	const res = await axios.getUserFail('http://localhost:5000/auth/Retreive', data);
	} catch (error) {
		dispatch(getUserFail(error.message));
	}
};

export const getAllUsers = async () => {
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

export const getAllUsersDetails = async (id) => {
	try {
		const AllUsers = await axios.get(
			'http://localhost:5000/auth/AllUsers/Details'
		);
		return AllUsers.data;
		//	const res = await axios.getUserFail('http://localhost:5000/auth/Retreive', data);
	} catch (error) {
		console.log(error);
	}
};

export const DeleteUser = async (id) => {
	console.log('The ID inside Delete User');
	console.log(id);
	try {
		const res = await axios.delete(`http://localhost:5000/Users/${id}`);

		//	const res = await axios.getUserFail('http://localhost:5000/auth/Retreive', data);
	} catch (error) {
		console.log(error);
	}
};
