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
import SearchProfile from './SearchProfile';
import TestSearch from './TestSearch';

export default function Search() {
	return <TestSearch message={'yes'} />;
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ title: 'The Shawshank Redemption', year: 1994 },
	{ title: 'The Godfather', year: 1972 },
	{ label: 'Vertigo', year: 1958 },
];
