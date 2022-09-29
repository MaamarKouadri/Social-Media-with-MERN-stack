/** @format */

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
export default function ProfileCard(props) {
	const User = useSelector((state) => state.User.user);
	const [NewDescript, SetNewDescript] = useState('');
	const {
		_id,
		FirstName,
		LastName,
		ProfileDescription,
		email,
		Age,
		Profession,
		Country,
		NumberFriends,
		Friends,
		isAdmin,
		isConnected,
		img,
		NumberOfPosts,
	} = User;

	console.log('Image is ');
	console.log(img);

	const myArray = img.split('Images\\');
	console.log('New Path is ');

	const FullName = FirstName + ' ' + LastName;
	const Value = 'Capture1.PNG';
	const Value2 = 'couscous.jpg';

	function everyTwo(str) {
		return str
			.split(' ') // find spaces and make array from string
			.map((item, idx) => (idx % 20 === 0 ? item : item + '\n')) // add line break to every second word
			.join(' '); // make string from array
	}

	return (
		<Card sx={{ minWidth: 45, minHeight: 45 }}>
			<CardActionArea>
				<Box sx={{ position: 'relative' }}>
					<CardMedia
						component='img'
						height='250'
						width='140'
						src={require(`../Images/${img}`)}
						//src={require(`${image02}`)}
						//alt='profile picture'
						id='image'
					/>
					<Box
						sx={{
							position: 'absolute',
							bottom: 0,
							display: 'flex',
							justifyContent: 'center',

							width: '100%',

							color: 'white',
							padding: '10px',
						}}>
						<Box
							sx={{
								position: 'absolute',
								bottom: 0,
								display: 'flex',
								justifyContent: 'center',
								flexDirection: 'column',
							}}>
							<Typography variant='h5'>{FullName}</Typography>
							<Typography variant='body2'>
								{Age} , {Country}{' '}
							</Typography>
						</Box>
					</Box>
				</Box>

				<CardContent>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							textAlign: 'center',
						}}>
						<Typography
							gutterBottom
							variant='body1'
							component='div'
							id='text4'
							color='text.secondary'>
							Works at {Profession}
						</Typography>
						<Typography
							gutterBottom
							variant='body1'
							component='div'
							id='text5'
							color='text.secondary'>
							Has made {NumberOfPosts} posts
						</Typography>
						<Divider
							sx={{ borderBottomWidth: '2px', backgroundColor: 'black' }}
						/>
						<Box
							sx={{
								width: '100%',
								maxWidth: 400,
								display: 'flex',
								justifyContent: 'center',
								textAlign: 'center',
							}}>
							<Typography
								variant='body2'
								color='text.secondary'
								id='text2'
								gutterBottom>
								{everyTwo(ProfileDescription)}
							</Typography>
						</Box>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
