/** @format */

import React from 'react';
import Header from '../Components/Header';
import LeftDrawer from '../Components/LeftDrawer';
import RightDrawer from '../Components/RightDrawer';
import Box from '@mui/material/Box';
import Profile from '../Components/Profile';
import OtherUsProfile from '../Components/OtherUsProfile';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchOtherUser } from '../Store/userLogin';
import { ErrorBoundary } from 'react-error-boundary';
import { styled } from '@mui/material/styles';
//Chceck the box padding
export const OtherUserProfile = () => {
	const Root = styled('div')(({ theme }) => ({
		padding: theme.spacing(1),
		[theme.breakpoints.up('xs')]: {
			//backgroundColor: 'red',
			width: '80%',
			height: '100%',
		},
		[theme.breakpoints.up('sm')]: {
			//backgroundColor: 'blue',
			width: '70%',
			height: '100%',
		},
		[theme.breakpoints.up('md')]: {
			//backgroundColor: 'green',
			width: '60%',
			height: '100%',
		},
		[theme.breakpoints.up('lg')]: {
			//backgroundColor: 'yellow',
			width: '50%',
			height: '100%',
		},
		[theme.breakpoints.up('xl')]: {
			//backgroundColor: 'orange',
			width: '50%',
			height: '100%',
		},
	}));

	//down
	//only
	//between
	//up
	/*
xs: 0,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1536,
*/

	const Root2 = styled('div')(({ theme }) => ({
		padding: theme.spacing(1),
		[theme.breakpoints.up('xs')]: {
			width: '90%',
			height: '50%',
		},
		[theme.breakpoints.up('sm')]: {
			width: '90%',
			height: '90%',
			color: 'black',
		},
		[theme.breakpoints.up('md')]: {
			width: '90%',
			height: '90%',
		},
		[theme.breakpoints.up('lg')]: {
			width: '100%',
			height: '100%',
		},
		[theme.breakpoints.up('xl')]: {
			width: '100%',
			height: '10%',
		},
	}));
	function ErrorFallback({ error, resetErrorBoundary }) {
		return (
			<div role='alert'>
				<p>Something went wrong:</p>
				<pre>{error.message}</pre>
				<button onClick={resetErrorBoundary}>Try again</button>
			</div>
		);
	}

	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				// reset the state of your app so the error doesn't happen again
			}}>
			<Box
				display='flex'
				sx={{
					mt: 15,
					mb: 5,
				}}
				alignItems='center'
				justifyContent='center'
				flexDirection='column'>
				<Root2>
					<Header />
				</Root2>

				<Root>
					<OtherUsProfile />
				</Root>
			</Box>
		</ErrorBoundary>
	);
};

export default OtherUserProfile;
