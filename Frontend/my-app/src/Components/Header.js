/** @format */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { LoginUser, LogoutUser, LoginFailed } from '../Store/LoginSlice';
import { LogOutUserActions } from '../Store/userSlice';
import Search from '../Components/Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createTheme } from '@mui/material/styles';

const Header = () => {
	let dispatch = useDispatch();

	const Logout = () => {
		sessionStorage.removeItem('accessJWT');
		localStorage.removeItem('SocialMediaSite');
		dispatch(LogoutUser());
		dispatch(LogOutUserActions());
		navigate('/');
	};

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

	const { user } = useSelector((state) => state.User);
	//	const [images, setImages] = useState('');
	const { img } = user;

	/*
	const myArray = img.split('Images\\');
	const path = myArray[1];
	var FinalPath = path.replace(/\\/g, '/').toString();
*/
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	let navigate = useNavigate();
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar
			position='fixed'
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography variant='h6' component='h6' sx={{ color: 'white' }}>
						Mini Social App
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: 'flex',
							justifyContent: 'space-evenly',
						}}>
						<Search />
						<Button
							onClick={() => {
								navigate('/Feed');
							}}
							sx={{ my: 2, color: 'white', display: 'block' }}>
							Feed
						</Button>

						<Button
							onClick={() => {
								navigate('/AccountSettings');
							}}
							sx={{ my: 2, color: 'white', display: 'block' }}>
							Update/Delete Profile
						</Button>
						<Button
							primary={'Log out '}
							onClick={() => {
								Logout();
							}}
							sx={{ my: 2, color: 'white', display: 'block' }}>
							Log out
						</Button>
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Personal Profil'>
							<StyledBadge
								overlap='circular'
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								variant='dot'>
								<Avatar
									alt='Maamar Kouadri'
									sx={{
										width: 55,
										height: 55,
									}}
									src={require(`../Images/${img}`)}
									onClick={() => {
										navigate('/PersonalProfile');
									}}
								/>
							</StyledBadge>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;
