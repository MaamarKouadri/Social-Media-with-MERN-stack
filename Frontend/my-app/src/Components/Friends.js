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

export default function Friends() {
	//const isAuth = useSelector((state) => state.auth.isAuthenticated);

	//console.log('Is Auth in Friends is  ' + isAuth);

	const [SelectedId, setSelectedID] = useState();
	const [rows, setRows] = useState([
		{
			id: 1,
			lastName: 'Snow',
			firstName: 'Jon',
			image:
				'https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg',
		},
		{
			id: 2,
			lastName: 'Lannister',
			firstName: 'Cersei',
		},
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime' },
		{ id: 4, lastName: 'Stark', firstName: 'Arya' },
		{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
		{ id: 6, lastName: 'Critiano', firstName: 'Ronaldo' },
		{ id: 7, lastName: 'Mark', firstName: 'Claire' },
		{ id: 8, lastName: 'Justin', firstName: 'Aumin' },
	]);
	const columns = [
		{
			field: 'image',
			headerName: 'Image',
			width: 150,
			renderCell: (params) => <Avatar src={params.value} />, // renderCell will render the component
		},
		{ field: 'id', headerName: 'Friend', width: 150 },
		{ field: 'firstName', headerName: 'First name', width: 130 },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
	];

	//let found = false;
	const UpdateIDs = (ID) => {
		rows.forEach(function (x) {
			if (x.id === ID[0]) {
				console.log('We are deleteting the ID  ' + x.id);
				//found = true;
			}

			if (x.id > ID[0]) {
				x.id = x.id - 1;
			}
		});
		//	setRows(rows);
	};

	const handleDeleteRow = () => {
		setRows((prevRows) => {
			const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
			console.log('Selected index is  ' + SelectedId);
			const index = SelectedId - 1;
			return [...rows.slice(0, index), ...rows.slice(index + 1)];
		});
		UpdateIDs(SelectedId);
	};
	return (
		<Box style={{ height: 500, width: 700 }}>
			<Stack direction='row' spacing={1}>
				<Button size='small' onClick={handleDeleteRow}>
					Delete a Friend
				</Button>
			</Stack>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={8}
				rowsPerPageOptions={[8]}
				checkboxSelection
				onSelectionModelChange={(ids) => {
					const selectedIDs = new Set(ids);
					setSelectedID(ids);
					/*
					const selectedRowData = rows.filter((row) =>
						selectedIDs.has(row.id.toString())
					);
					console.log(selectedRowData);
					*/
				}}
			/>
		</Box>
	);
}
