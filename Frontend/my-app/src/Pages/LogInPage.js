/** @format */

import React from 'react';
import Header from '../Components/Header';
import LoginBox from '../Components/LoginBox';
import { styled } from '@mui/material/styles';

const LogInPage = () => {
	const Root = styled('div')(({ theme }) => ({
		padding: theme.spacing(1),
		[theme.breakpoints.up('xs')]: {
			//backgroundColor: 'red',
			width: '100%',
			height: '100%',
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
	return (
		<div>
			<Root>
				<LoginBox />
			</Root>
		</div>
	);
};

export default LogInPage;
