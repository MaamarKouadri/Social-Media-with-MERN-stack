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
import DrawerHeader from './DrawerHeader';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ErrorBoundary } from 'react-error-boundary';

const Header = () => {
	let dispatch = useDispatch();
	function ErrorFallback({ error, resetErrorBoundary }) {
		return (
			<div role='alert'>
				<p>Something went wrong:</p>
				<pre>{error.message}</pre>
				<button onClick={resetErrorBoundary}>Try again</button>
			</div>
		);
	}
	const theme = createTheme();
	console.log('The theme is ');
	console.log(theme);

	const isMatch = useMediaQuery(theme.breakpoints.down('md'));

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
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				// reset the state of your app so the error doesn't happen again
			}}>
			<AppBar
				position='fixed'
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}>
				{isMatch ? (
					<Toolbar disableGutters>
						<DrawerHeader
							sx={{
								ml: {
									xl: 1,
									lg: 8,
									md: 8,
									sm: 8,
									xs: 8,
								},
								mr: {
									xl: 0,
									lg: 0,
									md: 0,
									sm: 4,
									xs: 6,
								},
							}}
						/>
						<Box
							sx={{
								flexGrow: 1,
								display: 'flex',
								justifyContent: 'space-evenly',
								marginTop: {
									xl: 2,
									lg: 2,
									md: 2,
									sm: 2,
									xs: 2,
								},
								marginBottom: {
									sm: 2,
									xs: 2,
								},
							}}>
							<Search
								sx={{
									mt: {
										xl: 1,
										lg: 10,
										md: 10,
										sm: 10,
										xs: 1,
									},

									flex: {
										md: 8,
										sm: 8,
										xs: 8,
									},
								}}
							/>
						</Box>
					</Toolbar>
				) : (
					<Toolbar disableGutters>
						<Typography
							//variant='h6'
							//component='h6'
							sx={{
								color: 'white',
								fontSize: {
									xl: 25,
									lg: 20,
									md: 20,
									sm: 15,
									xs: 20,
								},
								ml: {
									xl: 1,
									lg: 8,
									md: 4,
									sm: 8,
									xs: 8,
								},
								mr: {
									xl: 0,
									lg: 0,
									md: 0,
									sm: 4,
									xs: 6,
								},
							}}>
							Mini Social App
						</Typography>
						<Box
							sx={{
								flexGrow: 1,
								display: 'flex',
								justifyContent: 'space-evenly',
								marginTop: {
									xl: 2,
									lg: 2,
									md: 2,
									sm: 2,
									xs: 2,
								},
							}}>
							<Search
								sx={{
									mt: {
										xl: 1,
										lg: 10,
										md: 10,
										sm: 10,
										xs: 1,
									},
								}}
							/>
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
								sx={{
									my: 2,
									color: 'white',
									display: 'block',
								}}>
								Log out
							</Button>
						</Box>
						<Box sx={{ flexGrow: 0, mr: 2 }}>
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
											border: '2px solid lightgray',
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
				)}
				{/* 
			 
			 <Typography
					//variant='h6'
					//component='h6'
					sx={{
						color: 'white',
						fontSize: {
							xl: 25,
							lg: 20,
							md: 15,
							sm: 15,
							xs: 20,
						},
						ml: {
							xl: 1,
							lg: 8,
							md: 8,
							sm: 8,
							xs: 8,
						},
						mr: {
							xl: 0,
							lg: 0,
							md: 0,
							sm: 4,
							xs: 6,
						},
					}}>
					Mini Social App
				</Typography>
			 
			 
			 

				<Box
					sx={{
						flexGrow: 1,
						display: 'flex',
						justifyContent: 'space-evenly',
						marginTop: {
							xl: 2,
							lg: 2,
							md: 2,
							sm: 2,
							xs: 2,
						},
					}}>
					<Search
						sx={{
							mt: {
								xl: 1,
								lg: 10,
								md: 10,
								sm: 10,
								xs: 1,
							},
						}}
					/>
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
				<Box sx={{ flexGrow: 0, mr: 2 }}>
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
			*/}
			</AppBar>
		</ErrorBoundary>
	);
};
export default Header;
