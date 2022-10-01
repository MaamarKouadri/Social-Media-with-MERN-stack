/** @format */

import * as React from 'react';
import { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Card from './Card';
import Box from '@mui/material/Box';
import InputBox from '../Components/InputBox';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SendPost, getAllPosts } from '../Store/PostAction';
import {
	ImportPosts,
	EmptyPosts,
	AddUserNotToSee,
	RefreshPostOfUser,
} from '../Store/PostsSlice';

export default function ListOfPosts() {
	const axios = require('axios');
	const dispatch = useDispatch();
	const [PostsList, setPosts] = useState([]);

	return (
		<Box
			sx={{
				display: 'flex',

				flexDirection: 'column',
			}}>
			<InputBox value={'yes'} />
		</Box>
	);
}
