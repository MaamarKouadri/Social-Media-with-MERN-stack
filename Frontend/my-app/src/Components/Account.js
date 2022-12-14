/** @format */

import React from 'react';
/** @format */
import { useState } from 'react';
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
import { color, fontSize } from '@mui/system';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import countries from './coutries';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userSignUp } from '../Store/userLogin';
import { useNavigate } from 'react-router-dom';
import { LoadUsersIDs } from '../Store/userSlice';
import { VerifyEmail, GetAllUsersIDs } from '../Store/userLogin';
import { LoginPending } from '../Store/LoginSlice';
import {
	getUserPending,
	getUserSuccess,
	getUserFail,
} from '../Store/userSlice';
import { SendPost, getAllPosts } from '../Store/PostAction';
import { getUserProfile } from '../Store/userAction';
import {
	ImportPosts,
	EmptyPosts,
	AddUserNotToSee,
	RefreshPostOfUser,
} from '../Store/PostsSlice';

import Alert from '@mui/material/Alert';
import { ErrorBoundary } from 'react-error-boundary';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { LogoutUser } from '../Store/LoginSlice';
import { DeleteUser } from '../Store/userAction';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const axios = require('axios');
const validator = require('email-validator');
var moment = require('moment');

export default function UpdateAccount() {
	console.log('We are inside update Account');
	function ErrorFallback({ error, resetErrorBoundary }) {
		return (
			<div role='alert'>
				<p>Something went wrong:</p>
				<pre>{error.message}</pre>
				<button onClick={resetErrorBoundary}>Try again</button>
			</div>
		);
	}

	const User = useSelector((state) => state.User.user);

	const { _id } = User;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const DeleteTheUser = async () => {
		try {
			const res = await DeleteUser(_id);
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	const [FirstName, setFirstName] = useState('');
	const handleFirstName = (event) => {
		setFirstName(event.target.value);
	};
	const [LastName, setLastName] = useState('');
	const handleLastName = (event) => {
		setLastName(event.target.value);
	};
	const [password, setpassword] = useState('');
	// do not forget to hash the password
	const handlePassword = (event) => {
		setpassword(event.target.value);
	};
	const [ProfileDescription, setProfileDescription] = useState('');

	const handleProfileDescription = (event) => {
		setProfileDescription(event.target.value);
	};

	const [email, setemail] = useState('');

	const handleemail = (event) => {
		setemail(event.target.value);
	};
	const [Age, setAge] = useState(0);

	const handlAge = (event, today) => {
		const BirthDate = event.target.value;
		const dob = moment(BirthDate);
		const Age = moment(today).diff(dob, 'years');
		setAge(Age);
	};
	const [Profession, setProfession] = useState('');

	const handlProfession = (event) => {
		setProfession(event.target.value);
	};
	const [Country, setCountry] = useState('Afghanistan');

	const handleCountry = (event) => {
		setCountry(event.target.value);
	};

	const [NumberFriends, setNumberFriends] = useState(0);
	const [Friends, setFriends] = useState([]);

	const [isAdmin, setAdming] = useState(false);

	const [isConnected, setConnected] = useState(false);

	const [ErrorMessage, setErrorMessage] = useState(null);

	const [UploadImage, setUploadImage] = useState();
	const handleImage = (e) => {
		setUploadImage(e.target.files[0]);
	};

	const MakeApiCall = async () => {
		console.log('Inside MakeApiCall ');

		console.log('Inside MakeApiCall2 ');

		const formdata = new FormData();

		if (
			FirstName === '' &&
			LastName === '' &&
			Profession === '' &&
			(UploadImage === null || UploadImage === undefined)
		) {
			setErrorMessage(
				'You have entered no value to update, leave this page if you do not want to update'
			);
		}

		if (FirstName !== '') {
			formdata.append('FirstName', FirstName);
		}

		if (LastName !== '') {
			formdata.append('LastName', LastName);
		}

		if (ProfileDescription !== '') {
			if (ProfileDescription.length < 15) {
				setErrorMessage(
					'Your profile description cannot be this short , at least have 100 characters.'
				);
				return;
			}

			if (ProfileDescription.length > 300) {
				setErrorMessage(
					'There is a maximum of 300 charachters for the profile description. Try something shorter.'
				);
				return;
			}
			formdata.append('ProfileDescription', ProfileDescription);
		}
		if (Profession !== '') {
			formdata.append('Profession', Profession);
		}

		if (Country !== '') {
			formdata.append('Country', Country);
		}

		if (UploadImage !== null || UploadImage !== undefined) {
			formdata.append('image', UploadImage);
		}

		formdata.append('id', _id);
		try {
			const response = await axios.put(
				'http://localhost:5000/Users/Update',
				formdata
			);
			console.log('User profile has been updated with success');
			console.log(response);
			try {
				const User = await dispatch(getUserProfile());
				console.log('New User is ');
				console.log('User');
				dispatch(getUserSuccess(User));
				// Updating All posts as well
			} catch (err) {
				console.log(err);
			}
			const AllPosts = await dispatch(getAllPosts());
			dispatch(ImportPosts(AllPosts));
			navigate('/PersonalProfile');
		} catch (err) {
			console.log(err);
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

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();

	today = yyyy + '-' + mm + '-' + dd;

	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				// reset the state of your app so the error doesn't happen again
			}}>
			<Box
				container
				sx={{
					display: 'flex',
					flexDirection: 'row',
					height: '100vh',
					alignItems: 'center',

					margin: 'auto',
				}}>
				<Box
					sx={{
						backgroundColor: 'white',
						color: 'black',
						margin: 'auto',
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
						border: 'solid',

						alignItems: 'center',
						justifyContent: 'center',
						width: {
							xl: 650,
							lg: 600,
							md: 450,
							sm: 450,
							xs: 400,
						},
						height: {
							xl: '100%',
							lg: '100%',
							md: '100%',
							sm: '100%',
							xs: '100%',
						},
					}}>
					{ErrorMessage !== null && (
						<Typography
							sx={{
								backgroundColor: ' #ff9999',
								fontSize: {
									xl: '100%',
									lg: '100%',
									md: '80%',
									sm: '70%',
									xs: '60%',
								},
							}}>
							{ErrorMessage}
						</Typography>
					)}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Typography
							variant='h5'
							sx={{
								color: '#3483eb',
							}}>
							Update Profile Form
						</Typography>
					</Box>
					<Grid>
						<TextField
							label='First Name'
							id='outlined-start-adornment'
							sx={{
								m: 1,

								width: {
									xl: '25ch',
									lg: '25ch',
									md: '20ch',
									sm: '20ch',
									xs: '17ch',
								},

								color: 'white',
							}}
							onChange={(e) => {
								handleFirstName(e);
							}}
							className='FieldTexts'
						/>
						<TextField
							label='Last Name'
							id='outlined-start-adornment'
							sx={{
								m: 1,
								width: {
									xl: '25ch',
									lg: '25ch',
									md: '20ch',
									sm: '20ch',
									xs: '17ch',
								},
							}}
							onChange={(e) => {
								handleLastName(e);
							}}
							className='FieldTexts'
						/>
					</Grid>

					<Grid>
						<FormControl>
							<TextField
								label='Profession'
								className='FieldTexts'
								type='email'
								id='outlined-start-adornment'
								sx={{
									m: 1,
									width: {
										xl: '25ch',
										lg: '25ch',
										md: '20ch',
										sm: '20ch',
										xs: '17ch',
									},
								}}
								onChange={(e) => {
									handlProfession(e);
								}}
							/>
						</FormControl>

						<FormControl variant=''>
							<Select
								labelId='country-select-label'
								id='country-select'
								value={Country}
								displayEmpty
								sx={{
									m: 1,
									display: 'flex',
									width: {
										xl: '25ch',
										lg: '25ch',
										md: '20ch',
										sm: '20ch',
										xs: '17ch',
									},
								}}
								onChange={(e) => {
									handleCountry(e);
								}}>
								<MenuItem value=''>
									<em>Select a country</em>
								</MenuItem>
								{countries.map((c) => {
									return (
										<MenuItem
											value={c}
											key={c}
											sx={{
												width: '15ch',
												fontSize: {
													xl: 15,
													lg: 15,
													md: 15,
													sm: 12,
													xs: 9,
												},
											}}>
											{c}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</Grid>
					<Grid sx={{ width: '100%', px: 2 }}>
						<FormControl sx={{ width: '100%' }}>
							<TextField
								id='outlined-multiline-static'
								label='Profile description'
								className='FieldTexts'
								multiline
								rows={4}
								onChange={(e) => {
									handleProfileDescription(e);
								}}
							/>
						</FormControl>
					</Grid>

					<Grid>
						<FormControl
							sx={{ py: 2, dispay: 'flex', flexDirection: 'column' }}>
							<Typography
								variant='h7'
								component='h7'
								sx={{ color: '#3483eb', ml: 2 }}>
								Update Profile Picture click bellow
							</Typography>
							<Grid
								sx={{ borderStyle: 'groove', borderRadius: '25px', p: 1 }}
								className='FieldTexts'
								flexDirection='column'>
								<IconButton
									sx={{ Color: 'black' }}
									aria-label='upload picture'
									component='label'>
									<input
										accept='image/*'
										name='image'
										id='image'
										type='file'
										onChange={(e) => {
											handleImage(e);
										}}
									/>
									<PhotoCamera />
								</IconButton>
							</Grid>
						</FormControl>
					</Grid>
					<Grid sx={{ pb: 2 }}>
						<FormControl
							sx={{
								display: 'flex',
								flexDirection: 'row',
							}}>
							<Button
								variant='contained'
								href='#contained-buttons'
								sx={{
									marginInline: 2,
									fontSize: {
										xl: 18,
										lg: 15,
										md: 15,
										sm: 15,
										xs: 10,
									},
								}}
								onClick={() => {
									MakeApiCall();
								}}>
								Update Account
							</Button>
							<Button
								variant='contained'
								href='#contained-buttons'
								sx={{
									marginInline: 2,
									fontSize: {
										xl: 18,
										lg: 15,
										md: 15,
										sm: 15,
										xs: 10,
									},
								}}
								onClick={() => {
									DeleteTheUser();
								}}>
								Delete Account
							</Button>
						</FormControl>
					</Grid>
				</Box>
				<Grid
					container
					spacing={1}
					xs={2}
					sm={2}
					md={5}
					sx={{
						ml: 2,
						display: 'flex',
						flexDirection: 'column',
					}}>
					<Typography
						variant='h4'
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
						Update your Profile
					</Typography>
					<Typography
						variant='h6'
						component='h4'
						sx={{
							color: 'black',
							mb: 2,
							fontSize: {
								xl: 35,
								lg: 35,
								md: 30,
								sm: 25,
								xs: 20,
							},
						}}>
						<span>You can update any ,none or all fields</span>
						<br></br>
					</Typography>
				</Grid>
			</Box>
		</ErrorBoundary>
	);
}
