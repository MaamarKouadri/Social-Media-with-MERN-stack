/** @format */

import React from 'react';
import Header from '../Components/Header';
import LeftDrawer from '../Components/LeftDrawer';
import RightDrawer from '../Components/RightDrawer';
import Box from '@mui/material/Box';
import InputBox from '../Components/InputBox';
import Account from '../Components/Account';
import ChatOnline from '../Components/ChatOnline';
import { styled } from '@mui/material/styles';

// Make sure to know how to center the box

const AccountSettings = () => {
	const Root = styled('div')(({ theme }) => ({
		padding: theme.spacing(1),
		[theme.breakpoints.up('xs')]: {
			//backgroundColor: 'red',
			width: '90%',
			height: '90%',
		},
		[theme.breakpoints.up('sm')]: {
			//backgroundColor: 'blue',
			width: '100%',
			height: '100%',
		},
		[theme.breakpoints.up('md')]: {
			//backgroundColor: 'green',
			width: '100%',
			height: '100%',
		},
		[theme.breakpoints.up('lg')]: {
			//backgroundColor: 'yellow',
			width: '100%',
			height: '100%',
		},
		[theme.breakpoints.up('xl')]: {
			//backgroundColor: 'orange',
			width: '100%',
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
	return (
		<Box
			display='flex'
			sx={{
				pt: 10,
			}}
			alignItems='center'
			justifyContent='center'
			flexDirection='column'>
			<Root2>
				<Header />
			</Root2>
			<Root>
				<Account />
			</Root>
		</Box>
	);
};

export default AccountSettings;
