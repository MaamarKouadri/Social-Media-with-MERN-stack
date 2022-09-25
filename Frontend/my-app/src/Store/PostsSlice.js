/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
	PostsList: [],
	UsersNotToSee: [],
};

const PostSlice = createSlice({
	name: 'Post',
	initialState: initialAuthState,
	reducers: {
		ImportPosts(state, { payload }) {
			state.PostsList = payload;
		},
		EmptyPosts(state, { payload }) {
			state.PostsList = [];
		},

		AddUserNotToSee(state, { payload }) {
			state.UsersNotToSee = state.UsersNotToSee.push(payload);
		},

		RefreshPostOfUser(state, { payload }) {
			const IDtoDelete = payload;
			const NewListOfPosts = [];

			for (var i = 0; i < state.PostsList.length; i++) {
				for (var v = 0; v < state.UsersNotToSee.length; v++) {
					if (state.PostsList[i].creator === state.UsersNotToSee[v])
						state.PostsList.pop(state.PostsList[i]);
				}
			}
		},
	},
});

export const { ImportPosts, EmptyPosts, AddUserNotToSee, RefreshPostOfUser } =
	PostSlice.actions;

export default PostSlice.reducer;
