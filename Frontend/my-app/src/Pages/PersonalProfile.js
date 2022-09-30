/** @format */

import React from 'react';
import Header from '../Components/Header';
import LeftDrawer from '../Components/LeftDrawer';
import RightDrawer from '../Components/RightDrawer';
import Box from '@mui/material/Box';
import Profile from '../Components/Profile';
//Chceck the box padding
export const PersonalProfile = () => {
	return (
		<Box
			display='flex'
			sx={{
				mt: 15,
				mb: 5,
			}}
			alignItems='center'
			justifyContent='center'
			flexDirection='column'>
			<Header />

			<Profile />
		</Box>
	);
};

export default PersonalProfile;
