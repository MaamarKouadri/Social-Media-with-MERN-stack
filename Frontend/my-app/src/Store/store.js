/** @format */

import { configureStore } from '@reduxjs/toolkit';

import authSlice from './LoginSlice';
import userSlice from './userSlice';

const store = configureStore({
	reducer: {
		auth: authSlice,
		User: userSlice,
	},
});

export default store;
