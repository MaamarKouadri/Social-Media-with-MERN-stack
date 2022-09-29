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
import { color } from '@mui/system';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import countries from '../Components/coutries';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userSignUp } from '../Store/userLogin';
import { useNavigate } from 'react-router-dom';
import { LoadUsersIDs } from '../Store/userSlice';
import { VerifyEmail, GetAllUsersIDs } from '../Store/userLogin';
import { LoginPending } from '../Store/LoginSlice';

import Alert from '@mui/material/Alert';

import { LogoutUser } from '../Store/LoginSlice';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const axios = require('axios');
const validator = require('email-validator');
var moment = require('moment');

export default function HomePage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

		if (FirstName === '') {
			setErrorMessage('There is no value entered for First Name');
			return;
		}

		formdata.append('FirstName', FirstName);

		if (LastName === '') {
			setErrorMessage('There is no value entered for Last Name');
			return;
		}
		formdata.append('LastName', LastName);

		if (password === '') {
			setErrorMessage('There is no value entered for password');
			return;
		}

		var regExp = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

		if (regExp.test(password) === false) {
			setErrorMessage('The password should contain both letters and numbers');
			return;
		}

		if (password.length < 4 || password.length > 12) {
			setErrorMessage('The password should contain between 4 to 12 characters');
			return;
		}
		formdata.append('password', password);

		if (ProfileDescription === '') {
			setErrorMessage('There is no value entered for ProfileDescription');
			return;
		}

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

		formdata.append('email', email);
		// Check the email format

		console.log('The email is ');
		console.log(email);

		if (email === '') {
			setErrorMessage('There is no value entered for email');
			return;
		}

		try {
			const res = await VerifyEmail(email);
			console.log('Logging the response');
			console.log(res);
			if (res != '') {
				setErrorMessage(res);
				return;
			}
		} catch (err) {
			console.log(err);
		}

		const ValidatedEmail = validator.validate(email);

		console.log('Validated Email is ');
		console.log(ValidatedEmail);

		if (ValidatedEmail === false) {
			setErrorMessage('This is an invalid email');
			return;
		}

		console.log('Age Is');

		if (Age === 0) {
			setErrorMessage('There is no value chosen for BirthDate');
			return;
		}

		formdata.append('Age', Age);

		if (Profession === '') {
			setErrorMessage('There is no value entered for Profession');
			return;
		}

		formdata.append('Profession', Profession);

		if (Country === '') {
			setErrorMessage('There is no value selected for Country');
			return;
		}
		formdata.append('Country', Country);
		formdata.append('NumberFriends', NumberFriends);
		formdata.append('Friends', Friends);
		formdata.append('isAdmin', isAdmin);
		formdata.append('isConnected', isConnected);
		formdata.append('image', UploadImage);

		console.log('Country IS ');

		if (UploadImage === null || UploadImage === undefined) {
			setErrorMessage('There is no profile picture uploaded');
			return;
		}

		console.log('Upload image is ');
		console.log(UploadImage);
		console.log('FormData is  ' + formdata[FirstName]);

		try {
			const response = await userSignUp(formdata);
			console.log('User has been created with success');
			console.log(response);
			try {
				const res = await GetAllUsersIDs();
				console.log('Logging the List of all IDs');
				dispatch(LoadUsersIDs(res));
				console.log(res);
			} catch (err) {
				console.log(err);
			}
			navigate('/');
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
		<Grid
			container
			spacing={{ xs: 2, sm: 2, md: 2 }}
			columns={{ xs: 2, sm: 4, md: 10 }}
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
					mt: 4,

					mb: 4,

					alignItems: 'center',
					justifyContent: 'center',
					width: 600,
				}}>
				{ErrorMessage !== null && (
					<Alert severity='error' sx={{ m: 2 }}>
						{ErrorMessage}
					</Alert>
				)}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
					}}>
					<Typography variant='h4' sx={{ color: '#3483eb', mb: 2 }}>
						Sign up Form
					</Typography>
				</Box>
				<Grid>
					<TextField
						label='First Name'
						id='outlined-start-adornment'
						sx={{ m: 1, width: '25ch', color: 'white' }}
						onChange={(e) => {
							handleFirstName(e);
						}}
						className='FieldTexts'
					/>
					<TextField
						label='Last Name'
						id='outlined-start-adornment'
						sx={{ m: 1, width: '25ch' }}
						onChange={(e) => {
							handleLastName(e);
						}}
						className='FieldTexts'
					/>
				</Grid>
				<Grid>
					<FormControl>
						<TextField
							label='Email'
							id='outlined-start-adornment'
							sx={{ m: 1, width: '25ch' }}
							onChange={(e) => {
								handleemail(e);
							}}
							className='FieldTexts'
						/>
					</FormControl>

					<FormControl
						sx={{ m: 1, width: '25ch' }}
						variant='outlined'
						className='FieldTexts'>
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
				</Grid>
				<Grid>
					<FormControl>
						<TextField
							label='Profession'
							className='FieldTexts'
							type='email'
							id='outlined-start-adornment'
							sx={{ m: 1, width: '25ch' }}
							onChange={(e) => {
								handlProfession(e);
							}}
						/>
					</FormControl>

					<FormControl>
						<TextField
							label='Birth Date'
							className='FieldTexts'
							type='date'
							defaultValue={today}
							id='outlined-start-adornment'
							onChange={(e) => {
								handlAge(e, today);
							}}
							sx={{ m: 1, width: '25ch' }}
						/>
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
					<FormControl sx={{ py: 2 }}>
						<Grid
							sx={{ borderStyle: 'groove', borderRadius: '25px', p: 1 }}
							className='FieldTexts'>
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
					<FormControl sx={{ py: 1 }}>
						<TextField
							id='standard-select-currency-native'
							select
							value={Country}
							className='FieldTexts'
							onChange={(e) => {
								handleCountry(e);
							}}
							sx={{ m: 1, width: '25ch' }}
							SelectProps={{
								native: true,
							}}
							helperText='Please select your Country'>
							{countries.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</TextField>
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
							}}
							onClick={() => {
								MakeApiCall();
							}}>
							Submit
						</Button>

						<Button
							variant='contained'
							href='#contained-buttons'
							sx={{
								marginInline: 2,
							}}
							onClick={() => {
								dispatch(LoginPending());
								navigate('/');
							}}>
							Log In
						</Button>
					</FormControl>
				</Grid>
			</Box>
			<Grid
				container
				spacing={3}
				xs={1}
				sm={2}
				md={5}
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Typography
					variant='h3'
					component='h4'
					sx={{ color: '#3483eb', mb: 2 }}>
					Create your account
				</Typography>
				<Typography variant='h6' component='h4' sx={{ color: 'black', mb: 2 }}>
					<span>Make sure a value for all fields is entered </span>
					<br />
					<span> all those fields are required. </span>
				</Typography>
			</Grid>
		</Grid>
	);
}
