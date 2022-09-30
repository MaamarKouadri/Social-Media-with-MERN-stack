/** @format */

import React from 'react';
import Header from '../Components/Header';
import LeftDrawer from '../Components/LeftDrawer';
import RightDrawer from '../Components/RightDrawer';
import Box from '@mui/material/Box';
import Profile from '../Components/Profile';
import OtherUsProfile from '../Components/OtherUsProfile';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchOtherUser } from '../Store/userLogin';
import { ErrorBoundary } from 'react-error-boundary';
//Chceck the box padding
export const OtherUserProfile = () => {
	function ErrorFallback({ error, resetErrorBoundary }) {
		return (
			<div role='alert'>
				<p>Something went wrong:</p>
				<pre>{error.message}</pre>
				<button onClick={resetErrorBoundary}>Try again</button>
			</div>
		);
	}

	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				// reset the state of your app so the error doesn't happen again
			}}>
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

				<OtherUsProfile />
			</Box>
		</ErrorBoundary>
	);
};

export default OtherUserProfile;
