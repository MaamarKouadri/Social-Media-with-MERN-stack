/** @format */

import React from 'react';
import Box from '@mui/material/Box';
import { ErrorBoundary } from 'react-error-boundary';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import useCollapse from 'react-collapsed';
import Avatar from '@mui/material/Avatar';

function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);
}

export default function SearchProfile() {
	const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
	const [expanded, setExpanded] = React.useState(false);
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				// reset the state of your app so the error doesn't happen again
			}}>
			<Box
				sx={{
					display: 'flex',
					FlexDirection: 'column',
				}}
				{...getToggleProps({
					onClick: () => setExpanded((prevExpanded) => !prevExpanded),
				})}>
				<Box
					style={{
						position: 'relative',
						backgroundColor: 'white',
						paddingLeft: '20px',
						height: '50px',
						width: '190px',
						marginTop: 9,
						color: 'black',
						display: 'flex',
						FlexDirection: 'row',
						justifyContent: 'flex-end',
						fontSize: '13px',
					}}>
					<Box sx={{ pt: 2, mr: 1 }}>
						<span>Search for other users</span>
					</Box>
					<SearchIcon style={{ color: 'black', fontSize: 45, mt: 5 }} />
				</Box>
			</Box>
			<section {...getCollapseProps()}>
				<Box sx={{ display: 'flex', FlexDirection: 'column' }}>
					<Box sx={{ display: 'flex', FlexDirection: 'row' }}>
						<Avatar
							alt='Maamar Kouadri'
							src={require(`../Images/maamar.PNG`)}
							sx={{ width: 36, height: 36, mr: 1 }}
						/>

						<Box sx={{ pt: 2, mr: 1 }}>
							<span>Search for other users</span>
						</Box>
					</Box>
				</Box>
			</section>
		</ErrorBoundary>
	);
}
