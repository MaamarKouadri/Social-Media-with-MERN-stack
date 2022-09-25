/**
 * /* eslint-disable no-use-before-define
 *
 * @format
 */

import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
	return typeof String.fromCodePoint !== 'undefined'
		? isoCode
				.toUpperCase()
				.replace(/./g, (char) =>
					String.fromCodePoint(char.charCodeAt(0) + 127397)
				)
		: isoCode;
}

export default function ProfileSearch() {
	return (
		<Autocomplete
			id='country-select-demo'
			style={{ width: 250, paddingTop: 4 }}
			options={Users}
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
						}}>
						<Avatar
							alt='Maamar Kouadri'
							src={require(`../Images/maamar.PNG`)}
							sx={{ width: 46, height: 46, mr: 1 }}
						/>
						<Typography
							variant='h8'
							component='h8'
							sx={{ color: 'black', mt: 1 }}>
							{option.key}
						</Typography>

						{console.log('Options are ')}
						{console.log(option.key)}
					</Box>
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
	);
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const Users = [
	{ Name: 'Maamar Kouadri ' },
	//{ Data: ['Zinedine  Zidane ', '../Images/capture10.PNG'] },
];
