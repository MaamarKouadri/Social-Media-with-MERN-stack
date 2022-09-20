/** @format */

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

export default function Search() {
	return (
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
	);
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ title: 'The Shawshank Redemption', year: 1994 },
	{ title: 'The Godfather', year: 1972 },
];
