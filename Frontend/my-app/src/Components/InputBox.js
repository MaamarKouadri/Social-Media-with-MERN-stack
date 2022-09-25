/** @format */

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import TableRow from '@mui/material/TableRow';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { SendPost, getAllPosts } from '../Store/PostAction';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Card from './Card';

export default function InputBox() {
	const dispatch = useDispatch();
	const User = useSelector((state) => state.User.user);
	const { _id, img } = User;

	console.log('The image path is  ');
	console.log(img);
	const path = require('../Images/' + img);

	const [Title, setTtile] = useState('');
	const [Description, setDescription] = useState('');
	const [CurrentDate, setCurrentDate] = useState('');
	const [UploadImage, setUploadImage] = useState(null);
	const [ErrorMessage, setErrorMessage] = useState(null);
	const [PostsList, setPosts] = useState([]);
	console.log('Posts list inside List Of Posts is ');
	console.log(PostsList);

	const handleImage = (e) => {
		setUploadImage(e.target.files[0]);
	};

	const handleTitle = (e) => {
		setTtile(e.target.value);
	};

	const handleProfileDescription = (e) => {
		setDescription(e.target.value);
		const Cdate = new Date().toLocaleDateString();
		setCurrentDate(Cdate);
	};

	const CreatePost = async () => {
		console.log('We are inside Create Post');

		try {
			console.log(UploadImage);
		} catch (err) {
			console.log(err);
		}

		if (Title === '') {
			setErrorMessage('There is Title for this post ');
			return;
		}

		if (UploadImage === null || UploadImage === undefined) {
			setErrorMessage('There is no post picture uploaded');
			return;
		}

		if (Description === '') {
			setErrorMessage('There is no descrption for this post');
			return;
		}

		const formdata = new FormData();

		formdata.append('title', Title);
		formdata.append('image', UploadImage);
		formdata.append('AvatarURL', img);
		formdata.append('content', Description);
		formdata.append('date', CurrentDate);
		formdata.append('creator', _id);

		try {
			const response = await SendPost(formdata);
			console.log('Post has been created with success');
			console.log(response);
			if (response.message === 'Post created successfully!') {
				const AllPosts = await dispatch(getAllPosts());
				setPosts(AllPosts);
				console.log('All Posts are ');
				console.log(AllPosts);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const FetchPosts = async () => {
			const AllPosts = await dispatch(getAllPosts());
			setPosts(AllPosts);
		};
		FetchPosts();
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',

				flexDirection: 'column',
			}}>
			<Box alignItems='center'>
				{ErrorMessage !== null && (
					<Alert severity='error' sx={{ m: 2 }}>
						{ErrorMessage}
					</Alert>
				)}
				<Box
					sx={{
						display: 'flex',
						backgroundColor: 'white',
						borderRadius: '20px',
						width: '100%',

						pt: 1,
						pr: 1,
						pb: 1,
						mb: 2,
						position: 'relative',
					}}>
					<Avatar
						alt='Remy Sharp'
						position='absolute'
						src={path}
						sx={{
							width: 56,
							height: 56,
							mr: 2,
							mb: 2,

							left: 0,
							right: 0,
						}}
					/>

					<Box
						sx={{
							width: '65ch',

							display: 'flex',

							mt: 2,
							mr: 5,
							flexDirection: 'column',
							//justifyContent: 'space-evenly',
						}}>
						<Typography
							variant='h7'
							component='h7'
							sx={{ color: '	#696969', mb: 2 }}>
							{new Date().toLocaleDateString()}
						</Typography>
						<TextField
							id='outlined-multiline-static'
							label='Title of the post'
							className='FieldTexts'
							multiline
							rows={1}
							sx={{ pb: 2 }}
							onChange={(e) => {
								handleTitle(e);
							}}
						/>
						<TextField
							id='outlined-multiline-static'
							label='Post description'
							className='FieldTexts'
							multiline
							rows={3}
							onChange={(e) => {
								handleProfileDescription(e);
							}}
						/>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								pt: 2,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<IconButton
								sx={{
									Color: 'black',
									borderStyle: 'groove',
									borderRadius: '25px',
									p: 1,
								}}
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
								<AddAPhotoIcon />
							</IconButton>

							<Button
								variant='contained'
								href='#contained-buttons'
								sx={{
									marginInline: 2,
									display: 'flex-end',
								}}
								onClick={() => {
									CreatePost();
								}}>
								Post
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',

					flexDirection: 'column',

					justifyContent: 'space-evenly',
				}}>
				{PostsList?.map((id) => (
					<Card PostID={id} />
				))}
			</Box>
		</Box>
	);
}
