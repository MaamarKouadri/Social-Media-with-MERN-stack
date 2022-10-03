/** @format */

import React, { useState } from 'react';
import { Drawer, List, ListItemButton } from '@mui/material';
import Box from '@mui/material/Box';
import { IconButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { LoginUser, LogoutUser, LoginFailed } from '../Store/LoginSlice';
import { LogOutUserActions } from '../Store/userSlice';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

const DrawerHeader = () => {
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

	let navigate = useNavigate();
	let dispatch = useDispatch();
	const { user } = useSelector((state) => state.User);
	//	const [images, setImages] = useState('');
	const { img } = user;
	const Logout = () => {
		sessionStorage.removeItem('accessJWT');
		localStorage.removeItem('SocialMediaSite');
		dispatch(LogoutUser());
		dispatch(LogOutUserActions());
		navigate('/');
	};
	const [openDrawer, setopenDrawer] = useState(false);
	return (
		<Box>
			<Drawer open={openDrawer} onClose={() => setopenDrawer(false)}>
				<List
					sx={{
						mt: 15,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						flex: 3,
					}}>
					<ListItemButton
						onClick={() => {
							navigate('/Feed');
						}}>
						<ListItemIcon>
							<ListItemText sx={{ color: 'black' }}>Feed</ListItemText>
						</ListItemIcon>
					</ListItemButton>
					<ListItemButton
						onClick={() => {
							navigate('/AccountSettings');
						}}>
						<ListItemIcon>
							<ListItemText sx={{ color: 'black', display: 'block' }}>
								Update/Delete Profile
							</ListItemText>
						</ListItemIcon>
					</ListItemButton>
					<ListItemButton
						onClick={() => {
							Logout();
						}}>
						<ListItemIcon>
							<ListItemText sx={{ color: 'black', display: 'block' }}>
								Log out
							</ListItemText>
						</ListItemIcon>
					</ListItemButton>

					<ListItemButton>
						<Tooltip title='Personal Profil'>
							<StyledBadge
								overlap='circular'
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								variant='dot'>
								<Avatar
									alt='Maamar Kouadri'
									sx={{
										width: 65,
										height: 65,
										ml: 5,
									}}
									src={require(`../Images/${img}`)}
									onClick={() => {
										navigate('/PersonalProfile');
									}}
								/>
							</StyledBadge>
						</Tooltip>
					</ListItemButton>
				</List>
			</Drawer>
			<IconButton onClick={() => setopenDrawer(!openDrawer)}>
				<MenuIcon sx={{ fontSize: '35px' }} />
			</IconButton>
		</Box>
	);
};

export default DrawerHeader;
