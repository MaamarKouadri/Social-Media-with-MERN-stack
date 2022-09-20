/** @format */

import React from 'react';
import Header from '../Components/Header';

import Box from '@mui/material/Box';
import LeftDrawer from '../Components/LeftDrawer';
import RightDrawer from '../Components/RightDrawer';
import MessengerBox from '../Components/MessengerBox';

export default function MessengerPage() {
	return (
		<Box>
			<Header />
			<MessengerBox />
		</Box>
	);
}
