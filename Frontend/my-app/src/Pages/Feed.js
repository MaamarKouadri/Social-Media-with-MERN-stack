/** @format */

import React from 'react';
import Header from '../Components/Header';
import LeftDrawer from '../Components/LeftDrawer';
import RightDrawer from '../Components/RightDrawer';
import Box from '@mui/material/Box';
import InputBox from '../Components/InputBox';
import { useState, useEffect } from 'react';
import ListOfPosts from '../Components/ListOfPosts';

// Make sure to know how to center the box

const Feed = () => {
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
			<ListOfPosts />
		</Box>
	);
};

export default Feed;
