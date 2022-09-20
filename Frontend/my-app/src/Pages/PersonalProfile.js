/** @format */

import React from 'react';
import Header from '../Components/Header';
import LeftDrawer from '../Components/LeftDrawer';
import RightDrawer from '../Components/RightDrawer';
import Box from '@mui/material/Box';
//Chceck the box padding
export const PersonalProfile = () => {
	return (
		<Box
			display='flex'
			alignItems='center'
			justifyContent='center'
			flexDirection='column'
			sx={{ pr: 24 }}>
			<Header />
			Personal Profile
			<LeftDrawer />
			<RightDrawer value='Profile' />
		</Box>
	);
};

export default PersonalProfile;
