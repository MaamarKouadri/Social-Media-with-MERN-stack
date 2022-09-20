/** @format */

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import IconButton from '@mui/material/IconButton';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import TableRow from '@mui/material/TableRow';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function InputBox() {
	return (
		<Box alignItems='center'>
			<Box
				sx={{
					flexGrow: 2,
					display: 'flex',
					justifyContent: 'space-around',
				}}>
				<Avatar
					alt='Remy Sharp'
					src={require('../Images/maamar.PNG')}
					sx={{ width: 56, height: 56, mr: 2, mb: 2 }}
				/>
				<TextField
					sx={{ width: '65ch' }}
					id='filled-search'
					label='Enter post description'
					type='search'
					variant='filled'
				/>
			</Box>
			<Divider />

			<TableRow
				sx={{
					width: '65ch',
					margin: 'auto',
					display: 'flex',
					justifyContent: 'space-evenly',
				}}>
				<IconButton aria-label='share' sx={{ fontSize: '17px' }}>
					<AddAPhotoIcon />
					Upload Picture
				</IconButton>
			</TableRow>
			<Divider />
		</Box>
	);
}
