/** @format */

import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { randomInt, randomUserName } from '@mui/x-data-grid-generator';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../Store/userAction';
import { ErrorBoundary } from 'react-error-boundary';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import DataTable from 'react-data-table-component';

export default function Friends() {
	function ErrorFallback({ error, resetErrorBoundary }) {
		return (
			<div role='alert'>
				<p>Something went wrong:</p>
				<pre>{error.message}</pre>
				<button onClick={resetErrorBoundary}>Try again</button>
			</div>
		);
	}

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	function FormRow() {
		return (
			<React.Fragment>
				<Grid item xs={3}>
					Delete User Option
				</Grid>
				<Grid item xs={3}>
					User Number
				</Grid>
				<Grid item xs={3}>
					First Name
				</Grid>
				<Grid item xs={3}>
					Last Name
				</Grid>
			</React.Fragment>
		);
	}

	function SecondRow(props) {
		return (
			<>
				<Grid item xs={3}>
					<Box sx={{ display: 'flex', flexDirection: 'row' }}>
						<Button
							variant='contained'
							sx={{ mt: 2, mr: 2, width: 26, height: 26 }}
							onClick={() => {
								console.log('Button is Clicked');
							}}>
							Delete{' '}
						</Button>

						<Avatar
							alt='Maamar Kouadri'
							src={require(`../Images/${props.Object.image}`)}
							sx={{ width: 56, height: 56 }}
						/>
					</Box>
				</Grid>
				<Grid item xs={3}>
					{props.Object.id}
				</Grid>
				<Grid item xs={3}>
					{props.Object.firstName}
				</Grid>
				<Grid item xs={3}>
					{props.Object.lastName}
				</Grid>
			</>
		);
	}

	const [UserRows, setUserRows] = useState();

	const FetchAllUsers = async () => {
		try {
			const Users = await getAllUsers();
			console.log('The Users are ');
			console.log(Users);

			for (var i = 0; i < Users.length; i++) {
				//
				//Users[i].image = Avatar;
				//console.log(Users[i].image);
				//Do something
			}
			console.log('The Users are ');
			console.log(Users);

			setUserRows(Users);
		} catch (err) {
			console.log(err);
		}
	};

	const Delete = async (Email) => {
		console.log('Button is Clicked');

		try {
			const res = await axios.delete(`http://localhost:5000/Users/${Email}`);
			console.log('User has been deleted ');
			FetchAllUsers();
		} catch (err) {
			console.log(err);
		}
	};

	const columns = [
		{
			name: 'Delete User',
			selector: (row) => (
				<Button
					variant='contained'
					sx={{ mt: 2, mr: 2, width: 26, height: 26 }}
					onClick={() => {
						Delete(row.Email);
					}}>
					Delete{' '}
				</Button>
			),
		},
		{
			name: 'Profile pic',
			selector: (row) => (
				<Avatar
					alt='Maamar Kouadri'
					src={require(`../Images/${row.image}`)}
					sx={{ width: 56, height: 56 }}
				/>
			),
		},
		{
			name: 'User Number',
			selector: (row) => row.id,
		},

		{
			name: 'Email',
			selector: (row) => row.Email,
		},

		{
			name: 'First Name',
			selector: (row) => row.firstName,
		},
		{
			name: 'Last Name',
			selector: (row) => row.lastName,
		},
	];

	const data = [
		{
			id: 1,
			title: 'Beetlejuice',
			year: '1988',
		},
		{
			id: 2,
			title: 'Ghostbusters',
			year: '1984',
		},
	];

	useEffect(() => {
		const FetchAllUsers = async () => {
			try {
				const Users = await getAllUsers();
				console.log('The Users are ');
				console.log(Users);

				for (var i = 0; i < Users.length; i++) {
					//
					//Users[i].image = Avatar;
					//console.log(Users[i].image);
					//Do something
				}
				console.log('The Users are ');
				console.log(Users);

				setUserRows(Users);
			} catch (err) {
				console.log(err);
			}
		};
		FetchAllUsers();
	}, []);
	//const isAuth = useSelector((state) => state.auth.isAuthenticated);

	//console.log('Is Auth in Friends is  ' + isAuth);
	const customStyles = {
		rows: {
			style: {
				minWidth: '700px', // override the row height
			},
		},
		headCells: {
			style: {
				paddingLeft: '8px', // override the cell padding for head cells
				paddingRight: '8px',
			},
		},
		cells: {
			style: {
				paddingLeft: '8px', // override the cell padding for data cells
				paddingRight: '8px',
			},
		},
	};
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				// reset the state of your app so the error doesn't happen again
			}}>
			<Box sx={{ width: '100%' }}>
				<DataTable
					columns={columns}
					data={UserRows}
					customStyles={customStyles}
				/>
			</Box>
		</ErrorBoundary>
	);
}
