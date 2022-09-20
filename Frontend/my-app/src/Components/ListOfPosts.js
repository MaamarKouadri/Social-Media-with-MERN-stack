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
import Card from './Card';
import InputBox from '../Components/InputBox';

export default function ListOfPosts() {
	const axios = require('axios');
	/*
	const MakeApiCall = async () => {
		console.log('We are trying to create a new Post ');
		const url = 'http://localhost:5000/Posts/Create';
		const formdata = new FormData();
		formdata.append('title', 'Title 2 ');
		formdata.append('content', 'Algeria is the greatest in the universe ');
		formdata.append('image');
		await axios({
			method: 'post',
			url: url,
			body: formdata,
		})
			.post(url, {
				title: 'First Post',
				content: 'This is the true meaning of life',
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const GetMakeApiCall = () => {
		console.log('Inside GetMakeApiCall');
		const url2 =
			'http://localhost:5000/Posts/post/' + '63092479aa736a2f25658154';
		axios({
			method: 'get',
			url: url2,
		})
			.then((res) => {
				if (res.status != 200) {
					throw new Error('Failed to fetch status');
				} else {
					console.log(res);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		//MakeApiCall();
		GetMakeApiCall();
	}, []);

	*/

	return (
		<List
			sx={{
				width: '100%',
				maxWidth: 700,
				bgcolor: 'background.paper',
			}}>
			<Divider variant='inset' component='li' />
			<ListItem alignItems='flex-start'>
				<InputBox />
			</ListItem>
			<ListItem alignItems='flex-start'>
				<Card />
			</ListItem>
			<Divider variant='inset' component='li' />
		</List>
	);
}
