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
	} = User;

	console.log('Image is ');
	console.log(img);

	const myArray = img.split('Images\\');
	console.log('New Path is ');

	const FullName = FirstName + ' ' + LastName;
	const Value = 'Capture1.PNG';
	const Value2 = 'couscous.jpg';
	/*
	const [age, setAge] = useState(0);
	const [profession, setprofession] = useState('Programmer');
	const [country, setCountry] = useState('Algeria');
	const [friends, setFriends] = useState('56');
	const [FullName, setFullName] = useState('');
	const [base64String, setbase64String] = useState('');
	const [profileDescription, setProfileDescription] = useState('');
	const axios = require('axios');
	const url = 'http://localhost:5000/auth/data';
	const TypoArray = [];

	const arrayBufferToBase64 = (buffer) => {
		let binary = '';
		let bytes = new Uint8Array(buffer);
		let len = bytes.byteLength;
		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	};

	const GetMakeApiCall = async () => {
		await axios({
			method: 'get',
			url: url,
			params: {
				FirstName: 'Maamar',
				LastName: 'Kouadri',
			},
		})
			.then((res) => {
				const {
					FirstName,
					LastName,
					password,
					ProfileDescription,
					Age,
					Profession,
					Country,
					NumberFriends,
					ProfilePicture,
				} = res.data;
				setFullName(FirstName + ' ' + LastName);
				setAge('Age: ' + Age);
				setprofession('Profession: ' + Profession);
				setCountry('Country: ' + Country);
				setFriends('Number of Friends: ' + 0);
				setProfileDescription(ProfileDescription);
				var binary = '';
				var bytes = new Uint8Array(ProfilePicture.data.data);

				
				setbase64String(arrayBufferToBase64(ProfilePicture.data.data));

				
				console.log(profileDescription);
			
			})
			.catch((err) => console.log(err));
	};

	// runs

	useEffect(() => {
		GetMakeApiCall();
	}, []);
src={`data:image/png;base64,${props.base64String}`}

<img src={image02} alt='profile picture' height='140' width='240' />;

	*/

	//console.log(props.image);
	return (
		<Card sx={{ minWidth: 645, minHeight: 345 }}>
			<CardActionArea>
				<CardMedia
					component='img'
					height='340'
					src={require(`../Images/${img}`)}
					//src={require(`${image02}`)}
					//alt='profile picture'
					id='image'
				/>

				<CardContent>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<Typography gutterBottom variant='h5' component='div' id='text1'>
							{FullName}
						</Typography>
						<Typography gutterBottom variant='body1' component='div' id='text3'>
							Age : {Age}
						</Typography>

						<Typography gutterBottom variant='body1' component='div' id='text4'>
							Profession : {Profession}
						</Typography>
						<Typography gutterBottom variant='body1' component='div' id='text5'>
							Number of Friends: {NumberFriends}
						</Typography>
						<Typography gutterBottom variant='body1' component='div' id='text6'>
							Country : {Country}
						</Typography>
					</Box>
					<Divider
						sx={{ borderBottomWidth: '2px', backgroundColor: 'black' }}
					/>
					<Typography variant='body2' color='text.secondary' id='text2'>
						{ProfileDescription} + The oldest classical British and Latin
						writing had little or no space between words and could be written in
						boustrophedon (alternating directions). Over time, text direction
						(left to right) became standardized, and word dividers and terminal
						punctuation became common. The first way to divide sentences into
						groups was the original paragraphs, similar to an underscore at the
						beginning of the new group
					</Typography>
					<Divider
						sx={{ borderBottomWidth: '2px', backgroundColor: 'black' }}
					/>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
