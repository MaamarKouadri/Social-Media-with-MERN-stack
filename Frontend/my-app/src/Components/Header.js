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
import Search from '../Components/Search';
import { useSelector } from 'react-redux';

const pages = ['Feed', 'Personal Profile'];

const Header = () => {
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
					<DataSaverOffIcon
						sx={{
							display: { xs: 'none', md: 'flex' },
							mr: 1,
						}}></DataSaverOffIcon>
					<Box
						sx={{
							flexGrow: 1,
							display: 'flex',
							justifyContent: 'space-evenly',
						}}>
						<Search />
						{pages.map((page) => (
							<Button
								key={page}
								onClick={() => {
									const NewPage = page.replace(/ /g, '');
									console.log('The page is ' + NewPage);

									if (page !== 'HomePage') navigate('/' + NewPage);
									else navigate('/');
								}}
								sx={{ my: 2, color: 'white', display: 'block' }}>
								{page}
							</Button>
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									src={require(`../Images/${img}`)}
									sx={{ width: 56, height: 56 }}
								/>
							</IconButton>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;
