/**
 * /* eslint-disable no-use-before-define
 *
 * @format
 */

import React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ErrorBoundary } from 'react-error-boundary';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { FetchOtherUser } from '../Store/userLogin';
import { LoadOtherUser } from '../Store/OtherUserSlice';
import { useDispatch } from 'react-redux';
import { getAllUsersDetails } from '../Store/userAction';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
const url = 'maamar.PNG';
function countryToFlag(isoCode) {
	return typeof String.fromCodePoint !== 'undefined'
		? isoCode
				.toUpperCase()
				.replace(/./g, (char) =>
					String.fromCodePoint(char.charCodeAt(0) + 127397)
				)
		: isoCode;
}
function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);
}

const name = 'maamar.PNG';
const SplitOption1 = (text) => {
	const array = text.split('-');

	return array[0];
};

const SplitOption2 = (text) => {
	const array = text.split('-');

	return array[1];
};

const SplitOption3 = (text) => {
	const array = text.split('-');

	return array[2];
};

export default function ProfileSearch(props) {
	const [ArrayProfiles, setArrayProfiles] = useState([]);
	useEffect(() => {
		console.log('The details hook use effect ');
		const FetchArray = async () => {
			try {
				const Array = await getAllUsersDetails();
				console.log('The array of UseEffect is  ');
				console.log(Array);
				setArrayProfiles(Array);
			} catch (err) {
				console.log('The error of get post details is ');
				console.log(err);
			}
		};
		FetchArray();
	}, [props]);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [clicked, setClicked] = React.useState(false);
	const toggleClicked = () => setClicked((prev) => !prev);

	const FetchTheUser = async (id) => {
		console.log('Inside useEffect of OtherUsProfile');
		try {
			const OtherUser = await FetchOtherUser(id);

			const {
				_id,
				FirstName,
				LastName,
				ProfileDescription,
				email,
				Age,
				Profession,
				Country,
				NumberFriends,
				Friends,
				isAdmin,
				isConnected,
				img,
				NumberOfPosts,
			} = OtherUser;

			const FullName = FirstName + ' ' + LastName;

			dispatch(
				LoadOtherUser({
					_id,
					FullName,
					ProfileDescription,
					Age,
					Profession,
					Country,
					img,
					NumberOfPosts,
				})
			);

			console.log(OtherUser);
			navigate('/PersonalProfile/' + id);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				// reset the state of your app so the error doesn't happen again
			}}>
			<Autocomplete
				id='country-select-demo'
				style={{ width: 250, paddingTop: 4 }}
				options={ArrayProfiles}
				getOptionLabel={(option) => option.Name}
				renderOption={(option) => (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							marginTop: 1,
							alignItems: 'center',
						}}>
						<Box
							sx={{
								pl: 3,
								display: 'flex',
								cursor: 'pointer',
							}}
							onClick={() => {
								FetchTheUser(SplitOption3(option.key));
							}}>
							<Avatar
								alt='Maamar Kouadri'
								src={require(`../Images/${SplitOption2(option.key)}`)}
								//src={require(`../Images/maamar.PNG`)}
								sx={{ width: 46, height: 46, mr: 1 }}
							/>

							<Typography
								variant='h8'
								component='h8'
								sx={{ color: 'black', mt: 1 }}>
								{SplitOption1(option.key)}
							</Typography>

							{console.log('Options are ')}
							{console.log(option.key)}
						</Box>
						<Divider
							sx={{ borderBottomWidth: '2px', backgroundColor: 'black' }}
						/>
					</Box>
				)}
				renderInput={(params, data) => (
					<div style={{ position: 'relative', backgroundColor: 'white' }}>
						{params.inputProps.value && (
							<span
								style={{
									position: 'absolute',
									transform: 'translateY(50%)',
									marginLeft: '5px',
								}}></span>
						)}
						<TextField
							{...params}
							label='Search Users'
							variant='outlined'
							inputProps={{
								...params.inputProps,
								autoComplete: 'new-password',
								style: { paddingLeft: '20px', backgroundColor: 'white' }, // disable autocomplete and autofill
							}}
						/>
					</div>
				)}
			/>
		</ErrorBoundary>
	);
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const Users = [
	{ Name: 'Maamar Kouadri-maamar.PNG-63190a922f3b738a7f7876d3' },
	{ Name: 'Andres Iniesta-Iniesta.jpg-63266b1de5b0358b74d84cd3' },
	{ Name: 'Zidane Zinedine-Zidane.jpg-63267254e5b0358b74d84d01' },
];
