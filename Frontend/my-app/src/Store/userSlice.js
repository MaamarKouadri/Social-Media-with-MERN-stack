/** @format */

import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialUserState = {
	user: {},
	AllUsersIDs: [],
	isLoading: false,
	error: '',
};

const userSlice = createSlice({
	name: 'User',
	initialState: initialUserState,
	reducers: {
		getUserPending: (state) => {
			state.isLoading = true;
		},
		getUserSuccess: (state, { payload }) => {
			console.log('The payload is  ');
			console.log(payload);
			state.isLoading = false;
			state.user = payload;
			state.error = '';
		},
		getUserFail: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
		LoadUsersIDs: (state, { payload }) => {
			state.AllUsersIDs = payload;
		},
		LogOutUserActions: (state) => {
			state.isLoading = false;
			state.user = {};
			state.error = '';
		},
	},
});

export const {
	getUserPending,
	getUserSuccess,
	getUserFail,
	LogOutUserActions,
	LoadUsersIDs,
} = userSlice.actions;

export default userSlice.reducer;
