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
import countries from './coutries';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const axios = require('axios');

export default function Account() {
	//const User = useSelector((state) => state.User.isAuthenticated);

	//console.log('Is Auth is  ' + isAuth);
	//const dispatch = useDispatch();

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

	const handlAge = (event) => {
		setAge(event.target.value);
	};
	const [Profession, setProfession] = useState('');

	const handlProfession = (event) => {
		setProfession(event.target.value);
	};
	const [Country, setCountry] = useState();

	const handleCountry = (event) => {
		setCountry(event.target.value);
	};

	const [NumberFriends, setNumberFriends] = useState(0);
	const [Friends, setFriends] = useState([]);

	const [isAdmin, setAdming] = useState(false);

	const [isConnected, setConnected] = useState(false);

	const PrintValues = () => {
		console.log(FirstName);

		console.log(LastName);

		console.log(password);

		console.log(ProfileDescription);

		console.log(email);

		console.log(Age);

		console.log(Profession);

		console.log(Country);

		console.log(NumberFriends);

		console.log(Friends);

		console.log(isAdmin);

		console.log(isConnected);
	};

	const [UploadImage, setUploadImage] = useState();
	const handleImage = (e) => {
		setUploadImage(e.target.files[0]);
	};

	const MakeApiCall2 = async () => {
		console.log('We are trying to create a new Post ');
		const url = 'http://localhost:5000/auth/Create';
		const formdata = new FormData();
		formdata.append('FirstName', FirstName);
		formdata.append('LastName', LastName);
		formdata.append('password', password);

		formdata.append('ProfileDescription', ProfileDescription);
		formdata.append('email', email);
		formdata.append('Age', Age);
		formdata.append('Profession', Profession);
		formdata.append('Country', Country);
		formdata.append('NumberFriends', NumberFriends);
		formdata.append('Friends', Friends);
		formdata.append('isAdmin', isAdmin);
		formdata.append('isConnected', isConnected);
		formdata.append('image', UploadImage);

		console.log('Upload image is ');
		console.log(UploadImage);
		console.log('FormData is  ' + formdata[FirstName]);

		/*
		for (var key of formdata.entries()) {
			console.log(key[0] + ', ' + key[1]);
		}
*/

		console.log([...formdata]);

		//dispatch(authActions.login());

		//	console.log('Is Auth is  ' + isAuth);

		try {
			const response = await axios({
				method: 'post',
				url: url,
				data: formdata,
				headers: {
					'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
				},
			});

			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	const MakeApiCall = () => {
		const img = document.getElementById('image');
		const url = 'http://localhost:5000/auth/register';
		const formdata = new FormData();
		//	console.log('Upload image is ');
		//console.log('Upload image is ');
		//console.log(e.target.files[0]);
		//console.log(UploadImage);
		formdata.set('file', UploadImage);
		//formdata.append('image', UploadImage, UploadImage.name);
		console.log('UploadImage is   ');
		console.log(UploadImage);
		axios
			.post(
				url,
				{
					FirstName: FirstName,
					LastName: LastName,
					password: password,
					ProfileDescription: ProfileDescription,
					email: email,
					Age: Age,
					Profession: Profession,
					Country: Country,
					NumberFriends: NumberFriends,
					Friends: Friends,
					isAdmin: isAdmin,
					isConnected: isConnected,
					//Image: UploadImage,
				}
				/*
				{
					headers: {
						'Content-Type': UploadImage.type,
					},
				}
				*/
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
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
		<Box
			sx={{
				backgroundColor: 'white',
				color: 'black',
				margin: 'auto',
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'column',
				mt: 4,

				alignItems: 'center',
				justifyContent: 'center',
				width: 600,
			}}>
			<Typography variant='h5' component='h4' sx={{ color: 'black' }}>
				Personal Settings Form
			</Typography>
			<Grid>
				<TextField
					label='First Name'
					id='outlined-start-adornment'
					sx={{ m: 1, width: '25ch', color: 'white' }}
					onChange={(e) => {
						handleFirstName(e);
					}}
				/>
				<TextField
					label='Last Name'
					id='outlined-start-adornment'
					sx={{ m: 1, width: '25ch' }}
					onChange={(e) => {
						handleLastName(e);
					}}
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
					/>
				</FormControl>

				<FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
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
						type='date'
						defaultValue={today}
						id='outlined-start-adornment'
						sx={{ m: 1, width: '25ch' }}
					/>
				</FormControl>
			</Grid>
			<Grid sx={{ width: '100%', px: 2 }}>
				<FormControl sx={{ width: '100%' }}>
					<TextField
						id='outlined-multiline-static'
						label='Profile description'
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
					<Grid sx={{ borderStyle: 'groove', borderRadius: '25px', p: 1 }}>
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
				<FormControl>
					<Button
						variant='contained'
						href='#contained-buttons'
						sx={{ color: '#2196f3', backgroundColor: 'white' }}
						onClick={() => {
							//PrintValues();
							MakeApiCall2();
							//GetMakeApiCall();
						}}>
						Submit
					</Button>
				</FormControl>
			</Grid>
		</Box>
	);
}
