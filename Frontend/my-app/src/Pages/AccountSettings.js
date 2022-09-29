/** @format */

import React from 'react';
import Header from '../Components/Header';
import LeftDrawer from '../Components/LeftDrawer';
import RightDrawer from '../Components/RightDrawer';
import Box from '@mui/material/Box';
import InputBox from '../Components/InputBox';
import Account from '../Components/Account';
import ChatOnline from '../Components/ChatOnline';

// Make sure to know how to center the box

const AccountSettings = () => {
	return (
		<Box
			display='flex'
			sx={{
				pt: 10,
			}}
			alignItems='center'
			justifyContent='center'
			flexDirection='column'>
			<Header />

			<Account />
		</Box>
	);
};

export default AccountSettings;
