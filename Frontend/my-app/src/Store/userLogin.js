/** @format */

import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUserPending, getUserSuccess, getUserFail } from './userSlice';

import { LoginUser, LoginFailed } from './LoginSlice';

export const FetchUser = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const accessJWT = sessionStorage.getItem('accessJWT');

			if (!accessJWT) reject('Token not found ');

			const res = await axios.get('http://localhost:5000/auth/Retreive', {
				headers: {
					Authorization: 'Bearer ' + accessJWT,
				},
			});

			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const userLogin = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.post('http://localhost:5000/auth/login', data);

			if (res.data.status === 'success') {
				sessionStorage.setItem('accessJWT', res.data.token);
				localStorage.setItem(
					'SocialMediaSite',
					JSON.stringify({ refreshJWT: res.data.token })
				);
			}

			resolve(res.data);
		} catch (error) {
			reject(error);
		}
	});
};

export const userSignUp = (formdata) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios({
				method: 'post',
				url: 'http://localhost:5000/auth/Create',
				data: formdata,
				headers: {
					'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
				},
			});

			resolve(res.data);
		} catch (error) {
			reject(error);
		}
	});
};

export const VerifyEmail = (email) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log('Inside Verify Email');
			const res = await axios({
				method: 'get',
				url: 'http://localhost:5000/Users/Email/' + email,
			});

			resolve(res.data);
		} catch (error) {
			reject(error);
		}
	});
};

export const GetAllUsersIDs = () => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log('Inside Verify Email');
			const res = await axios({
				method: 'get',
				url: 'http://localhost:5000/auth/AllUsers',
			});
			resolve(res.data);
		} catch (error) {
			reject(error);
		}
	});
};
