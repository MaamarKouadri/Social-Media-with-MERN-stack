/** @format */

import React from 'react';
import Header from '../Components/Header';
import Friends from '../Components/Friends';
import LeftDrawer from '../Components/LeftDrawer';
import RightDrawer from '../Components/RightDrawer';
import Box from '@mui/material/Box';

const FriendsList = () => {
	return (
		<Box
			display='flex'
			bgcolor='#FFFAF0'
			alignItems='center'
			justifyContent='center'
			flexDirection='column'
			sx={{ pr: 24 }}>
			<Header />
			Friends
			<LeftDrawer />
			<RightDrawer value='Friends' />
		</Box>
	);
};

export default FriendsList;
