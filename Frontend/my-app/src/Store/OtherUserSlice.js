/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
	user: {},
};

const OtheruserSlice = createSlice({
	name: 'OtherUser',
	initialState: initialUserState,
	reducers: {
		LoadOtherUser: (state, { payload }) => {
			state.user = payload;
		},
	},
});

export const { LoadOtherUser } = OtheruserSlice.actions;

export default OtheruserSlice.reducer;
