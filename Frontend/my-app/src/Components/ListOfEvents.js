/** @format */

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from './Card';
import InputBox from '../Components/InputBox';

export default function ListOfEvents() {
	return (
		<List
			sx={{
				width: '100%',
				maxWidth: 700,
				bgcolor: 'background.paper',
			}}>
			<Divider variant='inset' component='li' />
			<ListItem alignItems='flex-start'>
				<InputBox />
			</ListItem>
			<ListItem alignItems='flex-start'>ListOFEvents</ListItem>
			<Divider variant='inset' component='li' />
		</List>
	);
}
