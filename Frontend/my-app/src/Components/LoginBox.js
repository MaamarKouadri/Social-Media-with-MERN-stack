/** @format */

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import { TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { color } from '@mui/system';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import countries from './coutries';
import { useDispatch } from 'react-redux';
import { authActions } from '../Store/LoginSlice';
import { useSelector } from 'react-redux';
import { userRegistration, userLogin } from '../Store/userLogin';
import {
	LoginUser,
	LogoutUser,
	LoginFailed,
	LoginPending,
} from '../Store/LoginSlice';
import { getUserProfile } from '../Store/userAction';
import {
	getUserPending,
	getUserSuccess,
	getUserFail,
} from '../Store/userSlice';

import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import './LoginBox.css';

//import axios from 'axios';
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const axios = require('axios');

export default function LoginBox() {
	const { isAuthenticated, userName, token, ErrorMessage } = useSelector(
		(state) => state.auth
	);

	console.log('Is Auth is  ' + isAuthenticated);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(LoginPending());
	}, []);

	dispatch(LoginPending);
	const [password, setpassword] = useState('');
	// do not forget to hash the password
	const handlePassword = (event) => {
		setpassword(event.target.value);
	};

	const [email, setemail] = useState('');

	const handleemail = (event) => {
		setemail(event.target.value);
	};

	const MakeApiCall = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			return alert('Fill up all the form!');
		}

		//dispatch(loginPending());

		try {
			const isAuth = await userLogin({ email, password });

			if (isAuth.status === 'error') {
				return dispatch(LoginFailed(isAuth.message));
			}

			if (isAuth.status === 'success') {
				console.log('The Authenticated user ');
				console.log(isAuth);
				dispatch(LoginUser(isAuth));
				const User = await dispatch(getUserProfile());
				dispatch(getUserSuccess(User));
				navigate('/Feed');

				//history.push('/dashboard');
			}
		} catch (error) {
			console.log('Catching the error message');
			console.log(error);
			dispatch(LoginFailed(error.response.data));
		}
	};

	const [values, setValues] = React.useState({
		amount: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });

		//console.log(event.target.value);
		setpassword(event.target.value);
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	// fixe positoon not mt and width flex
	return (
		<Grid
			container
			sx={{
				display: 'flex',
				flexDirection: 'row',
				height: '100vh',
				alignItems: 'center',
				margin: 'auto',
			}}>
			<Grid
				container
				xs={8}
				sm={8}
				md={6}
				sx={{
					backgroundColor: 'white',
					color: 'black',
					margin: 'auto',
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					border: 'solid',
					mt: {
						xl: 5,
						lg: 5,
						md: 5,
						sm: 5,
						xs: 5,
					},

					width: {
						xl: 650,
						lg: 600,
						md: 450,
						sm: 450,
						xs: 450,
					},
					height: {
						xl: 450,
						lg: 480,
						md: 480,
						sm: 480,
						xs: 520,
					},
				}}>
				{ErrorMessage !== '' && (
					<Alert
						severity='error'
						sx={{
							width: {
								xl: '45ch',
								lg: '40ch',
								md: '40ch',
								sm: '40ch',
								xs: '30ch',
							},
						}}>
						{ErrorMessage}
					</Alert>
				)}
				<Typography
					variant='h4'
					component='h4'
					sx={{ color: '#3483eb', mb: 2 }}>
					Log In Form
				</Typography>

				<FormControl>
					<TextField
						label='Email'
						id='outlined-start-adornment'
						sx={{
							m: 1,
							width: {
								xl: '45ch',
								lg: '45ch',
								md: '40ch',
								sm: '40ch',
								xs: '30ch',
							},

							mb: 2,
						}}
						onChange={(e) => {
							handleemail(e);
						}}
					/>
				</FormControl>

				<FormControl
					sx={{
						m: 1,
						width: {
							xl: '45ch',
							lg: '45ch',
							md: '40ch',
							sm: '40ch',
							xs: '30ch',
						},
						mb: 4,
					}}
					variant='outlined'>
					<InputLabel htmlFor='outlined-adornment-password'>
						Password
					</InputLabel>
					<OutlinedInput
						id='outlined-adornment-password'
						type={values.showPassword ? 'text' : 'password'}
						value={values.password}
						onChange={handleChange('password')}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge='end'>
									{values.showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label='Password'
					/>
				</FormControl>

				<Button
					variant='contained'
					className='Submit'
					sx={{ marginBottom: 4 }}
					onClick={(e) => {
						MakeApiCall(e);
					}}>
					Submit
				</Button>
				<Typography
					variant='h7'
					component='h7'
					sx={{ color: '#3483eb', mb: 3 }}>
					You don't have an account ? Click bellow
				</Typography>
				<Button
					variant='contained'
					color='success'
					sx={{ marginBottom: 2 }}
					className='SignUp'
					onClick={(e) => {
						navigate('/HomePage');
					}}>
					Sign Up Page
				</Button>
			</Grid>

			<Grid
				container
				spacing={3}
				xs={3}
				sm={3}
				md={5}
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Typography
					variant='h3'
					component='h4'
					sx={{
						color: '#3483eb',
						mb: 2,
						fontSize: {
							xl: 35,
							lg: 35,
							md: 30,
							sm: 25,
							xs: 20,
						},
					}}>
					The Mini Social App
				</Typography>
				<Typography
					variant='h6'
					component='h4'
					sx={{
						color: 'black',
						mb: 2,

						mr: {
							sm: 1,
						},

						fontSize: {
							xl: 35,
							lg: 35,
							md: 30,
							sm: 25,
							xs: 20,
						},
					}}>
					Post Things and Chat with your friends.
				</Typography>
			</Grid>
		</Grid>
	);
}
