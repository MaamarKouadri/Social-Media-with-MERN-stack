/** @format */

import React from 'react';
import './MessageIcon.css';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function MessageIcon({ chat, currentUserID }) {
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('null');
	const [publicPath, setpublicPath] = useState('../Images/');
	const [imagePath, setImagePath] = useState('');

	let sd = '';

	const getImagePath = (img) => {
		console.log('Image is ');
		console.log(img);

		const myArray = img.split('Images\\');
		console.log('New Path is ');

		const path = myArray[1];
		var FinalPath = path.replace(/\\/g, '/').toString();
		setImagePath(FinalPath);
		console.log('Final Path is ');
		console.log(publicPath + FinalPath);
	};

	useEffect(() => {
		console.log('Inside get user hook  of message Icon');
		const receiverID = chat.members.find((m) => m !== currentUserID);
		console.log('Receiver ID is ');
		console.log(receiverID);
		console.log('Current ID is ');
		console.log(currentUserID);
		console.log('Chat Members  is ');
		console.log(chat.members);
		const getUser = async () => {
			try {
				const res = await axios.get(
					'http://localhost:5000/Users?userId=' + receiverID
				);
				console.log(res);
				setUser(res.data);
				const FullName = res.data.FirstName + ' ' + res.data.LastName;
				setUsername(FullName);
				console.log('------------');
				console.log(res.data.img);
				setImagePath(res.data.img);
				sd = 'couscous.jpg';

				/*
				const { img } = res.data;
				console.log('user image');
				console.log(img);
				getImagePath(img);
				*/
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [chat, currentUserID]);

	return (
		<div className='chat'>
			<Grid container direction='row' alignItems='csenter'>
				<img
					className='ChatImage'
					src={require('../Images/couscous.jpg')}
					//src={require(`../Images/${user.img}`)}
					//src={require(`../Images/${imagePath}`)}
					//src='https://i.guim.co.uk/img/media/a4fbe541b080984bd50e0bb2d0d68b71b79db1e3/0_0_3500_2100/master/3500.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=4a49639c3f1650e5ad8b18ca29b1c276'
					alt=''
				/>
				<span className='chatName '>{username}</span>
			</Grid>
		</div>
	);
}
