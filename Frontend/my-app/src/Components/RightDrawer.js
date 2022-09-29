/** @format */

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListOfPosts from './ListOfPosts';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import ListOfEvents from './ListOfEvents';

import Profile from './Profile';
import Friends from './Friends';
import Account from './Account';
import MessengerBox from '../Components/MessengerBox';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: 'ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}));

const drawerWidth = 200;

export default function RightDrawer(props) {
	const { user } = useSelector((state) => state.User);

	const navigate = useNavigate();

	//	const [images, setImages] = useState('');
	const { img } = user;

	const Main = props.value;

	console.log('Props is ');
	console.log(props.value);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				{console.log('Props inside component is ' + Main)}
				{Main === 'Feed' && <ListOfPosts />}
				{Main === 'Event' && <ListOfEvents />}
				{Main === 'Profile' && <Profile />}
				{Main === 'Friends' && <Friends />}
				{Main === 'Account' && <Account />}
				{Main === 'Messenger' && <MessengerBox />}
			</Box>
		</Box>
	);
}
