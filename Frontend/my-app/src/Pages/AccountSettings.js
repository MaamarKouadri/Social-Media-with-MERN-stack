/** @format */

import React from 'react';
import Header from '../Components/Header';
import LeftDrawer from '../Components/LeftDrawer';
import RightDrawer from '../Components/RightDrawer';
import Box from '@mui/material/Box';
import InputBox from '../Components/InputBox';

// Make sure to know how to center the box

const AccountSettings = () => {
	return (
		<Box
			display='flex'
			bgcolor='#FFFAF0'
			alignItems='center'
			justifyContent='center'
			flexDirection='column'
			sx={{ pr: 24 }}>
			<Header />

			<LeftDrawer />
			<RightDrawer value='Account' />
		</Box>
	);
};

export default AccountSettings;
