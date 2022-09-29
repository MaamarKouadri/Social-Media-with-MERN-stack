/** @format */

import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ProfileCard from './ProfileCard';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';
import ImagePosts from './ImagePosts';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const axios = require('axios');

export default function Profile() {
	const { user } = useSelector((state) => state.User);

	console.log('Inside profile card ');

	/*

<img src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
important code for life 

	*/

	const {
		_id,
		firstName,
		lastName,
		profileDescription,
		email,
		age,
		profession,
		country,
		numberFriends,
		friends,
		isAdmin,
		isConnected,
		img,
	} = user;

	console.log(img);

	const myArray = img.split('src\\');
	console.log('New Path is ');

	const path = '../' + myArray[1];
	var FinalPath = path.replace(/\\/g, '/').toString();
	console.log(FinalPath);

	const FullName = firstName + ' ' + lastName;
	// we will come back to this

	return <ProfileCard image={FinalPath} />;
}
