/** @format */

import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialAuthState = {
	isAuthenticated: false,
	userName: '',
	email: '',
	token: '',
	ErrorMessage: '',
};

const authSlice = createSlice({
	name: 'Login',
	initialState: initialAuthState,
	reducers: {
		LoginUser(state, action) {
			state.isAuthenticated = true;
			const { FirstName, LastName, email, token, userObject } = action.payload;
			state.userName = FirstName + ' ' + LastName;

			state.email = email;
			state.token = token;
		},
		LogoutUser(state, action) {
			state.isAuthenticated = false;
			state.userName = '';

			state.email = '';
			state.token = '';
			state.ErrorMessage = '';
		},

		LoginPending(state, action) {
			state.ErrorMessage = '';
		},

		LoginFailed(state, action) {
			state.isAuthenticated = false;
			state.userName = '';

			state.email = '';
			state.token = '';
			state.ErrorMessage = action.payload;
		},
	},
});

export const { LoginUser, LogoutUser, LoginFailed, LoginPending } =
	authSlice.actions;

export default authSlice.reducer;
