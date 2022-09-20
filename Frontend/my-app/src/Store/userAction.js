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
