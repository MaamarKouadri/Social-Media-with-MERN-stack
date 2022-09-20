/** @format */

import React from 'react';
import Header from '../Components/Header';
import LeftDrawer from '../Components/LeftDrawer';
import RightDrawer from '../Components/RightDrawer';
import Box from '@mui/material/Box';

const LocalEvents = () => {
	return (
		<div>
			<Box
				display='flex'
				bgcolor='#FFFAF0'
				alignItems='center'
				justifyContent='center'
				flexDirection='column'
				sx={{ pr: 24 }}>
				<Header />
				<LeftDrawer />
				Local Events
				<RightDrawer value='Event' />
			</Box>
		</div>
	);
};

export default LocalEvents;
