/** @format */

import * as React from 'react';
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
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import EventIcon from '@mui/icons-material/Event';
import { Navigate } from 'react-router-dom';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { LoginUser, LogoutUser, LoginFailed } from '../Store/LoginSlice';
import { LogOutUserActions } from '../Store/userSlice';
import { useDispatch } from 'react-redux';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
const drawerWidth = 200;

export default function LeftDrawer() {
	let navigate = useNavigate();
	let dispatch = useDispatch();

	const Logout = () => {
		sessionStorage.removeItem('accessJWT');
		localStorage.removeItem('SocialMediaSite');
		dispatch(LogoutUser());
		dispatch(LogOutUserActions());
		navigate('/');
	};
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />

			<Drawer
				variant='permanent'
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}>
				<Toolbar />

				<List
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						gap: 2.5,
					}}>
					<Divider />

					<Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
						<ListItemIcon>
							<DataSaverOffIcon
								sx={{
									display: { xs: 'none', md: 'flex' },
									mr: 1,
								}}></DataSaverOffIcon>
						</ListItemIcon>
						<ListItemText primary={'Account menu'} />
					</Box>
					<Divider />

					<Divider />
					<ListItemButton>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText
							onClick={() => {
								navigate('/AccountSettings');
							}}
							primary={'Account Settings'}
						/>
					</ListItemButton>
					<Divider />

					<Divider />

					<Divider />
					<ListItemButton>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText
							primary={'Log out '}
							onClick={() => {
								Logout();
							}}
						/>
					</ListItemButton>
					<Divider />
				</List>
			</Drawer>
		</Box>
	);
}
