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
