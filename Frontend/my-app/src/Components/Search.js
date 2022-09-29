/** @format */

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ProfileSearch from './TestSearch';

/*
		<TextField
			width='60ch'
			height='40ch'
			id='standard-bare'
			variant='filled'
			label='Search Friends '
			color='primary'
			sx={{ my: 1, backgroundColor: 'white' }}
			InputProps={{
				backgroundcolor: 'white',
				endAdornment: (
					<IconButton>
						<SearchIcon />
					</IconButton>
				),
			}}
		/>
		*/

/*
		<Autocomplete
			disablePortal
			id='combo-box-demo'
			options={top100Films}
			getOptionLabel={(option) => option.title}
			sx={{ width: 300, backgroundColor: 'white' }}
			renderInput={(params) => (
				<div>
					{' '}
					<TextField {...params} label='Users ' />
					<Avatar
						src={require('http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcR8mRsgy0E0rw6Whm06Iu2_4chDeIR-WbtUxzMYFJHeDJTn6eY_WOtZo1ls8RY6By15')}
						sx={{ width: 45, height: 45 }}
					/>
				</div>
			)}
		/>
		*/

export default function Search() {
	return <ProfileSearch />;
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ title: 'The Shawshank Redemption', year: 1994 },
	{ title: 'The Godfather', year: 1972 },
	{ label: 'Vertigo', year: 1958 },
];
