/** @format */

import React from 'react';

import { useParams } from 'react-router-dom';
import { FetchOtherUser } from '../Store/userLogin';
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
import { ErrorBoundary } from 'react-error-boundary';
import './Cards.css';

const OtherUsProfile = () => {
	const OtherUser = useSelector((state) => state.OtherUser.user);
	console.log('Other User  is ');
	console.log(OtherUser);
	function ErrorFallback({ error, resetErrorBoundary }) {
		return (
			<div role='alert'>
				<p>Something went wrong:</p>
				<pre>{error.message}</pre>
				<button onClick={resetErrorBoundary}>Try again</button>
			</div>
		);
	}
	function everyTwo(str) {
		return str
			.split(' ') // find spaces and make array from string
			.map((item, idx) => (idx % 20 === 0 ? item : item + '\n')) // add line break to every second word
			.join(' '); // make string from array
	}

	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				// reset the state of your app so the error doesn't happen again
			}}>
			<Card sx={{}}>
				<CardActionArea>
					<Box sx={{ position: 'relative' }}>
						<CardMedia
							className='card'
							component='img'
							height='250'
							width='140'
							image={require(`../Images/${OtherUser.img}`)}
							//src={require(`${image02}`)}
							//alt='profile picture'
							id='image'
							sx={{
								width: {
									xl: '100%',
									lg: '100%',
									md: '100%',
									sm: '100%',
									xs: '100%',
								},
								height: {
									xl: 300,
									lg: 300,
									md: 300,
									sm: 300,
									xs: 300,
								},
							}}
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
								<Typography variant='h5'>{OtherUser.FullName}</Typography>
								<Typography variant='body2'>
									{OtherUser.Age} , {OtherUser.Country}
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
								Works at {OtherUser.Profession}
							</Typography>
							<Typography
								gutterBottom
								variant='body1'
								component='div'
								id='text5'
								color='text.secondary'>
								Has made {OtherUser.NumberOfPosts} posts
							</Typography>
						</Box>
						<Divider
							sx={{ borderBottomWidth: '2px', backgroundColor: 'black' }}
						/>
						<Box
							sx={{
								width: '100%',
								maxWidth: 550,
								display: 'flex',
								justifyContent: 'center',
								textAlign: 'center',
							}}>
							<Typography
								variant='body1'
								color='text.secondary'
								id='text2'
								gutterBottom>
								{everyTwo(OtherUser.ProfileDescription)}
							</Typography>
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>
		</ErrorBoundary>
	);
};

export default OtherUsProfile;
