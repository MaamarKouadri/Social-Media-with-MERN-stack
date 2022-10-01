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
import Tooltip from '@mui/material/Tooltip';
import Card from './Card';
import {
	ImportPosts,
	EmptyPosts,
	AddUserNotToSee,
	RefreshPostOfUser,
} from '../Store/PostsSlice';
import './LoginBox.css';
import { getUserProfile } from '../Store/userAction';
import {
	getUserPending,
	getUserSuccess,
	getUserFail,
} from '../Store/userSlice';

export default function InputBox(props) {
	const dispatch = useDispatch();
	const [PostsList, setPosts] = useState([]);
	useEffect(() => {
		console.log('Use Effect of Input Box ');
		const FetchPosts = async () => {
			const AllPosts = await dispatch(getAllPosts());
			dispatch(ImportPosts(AllPosts));
			const resUser = await dispatch(getUserProfile());
			dispatch(getUserSuccess(resUser));
			setPosts(AllPosts);
		};
		FetchPosts();
	}, [props]);

	const User = useSelector((state) => state.User.user);
	const ThePosts = useSelector((state) => state.Post.PostsList);
	const { _id, img } = User;

	const path = require('../Images/' + img);

	const [Title, setTtile] = useState('');
	const [Description, setDescription] = useState('');
	const [CurrentDate, setCurrentDate] = useState('');
	const [UploadImage, setUploadImage] = useState(null);
	const [ErrorMessage, setErrorMessage] = useState(null);

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
				dispatch(ImportPosts(AllPosts));
				const resUser = await dispatch(getUserProfile());
				dispatch(getUserSuccess(resUser));
				setPosts(AllPosts);

				console.log('All Posts are ');
				console.log(AllPosts);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',

				flexDirection: 'column',
			}}>
			<Box
				alignItems='center'
				sx={{
					display: 'flex',

					flexDirection: 'column',
				}}>
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
						borderStyle: 'solid',

						pt: 1,

						pb: 1,
						mb: 2,
						position: 'relative',
					}}>
					<Avatar
						position='absolute'
						src={path}
						sx={{
							width: 60,
							height: 60,
							mr: 2,
							ml: 2,
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
							mr: 3,
							flexDirection: 'column',
							//justifyContent: 'space-evenly',
						}}>
						<Typography
							variant='h6'
							component='h6'
							sx={{ color: '	black', mb: 2 }}>
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
								flexDirection: 'column',
								pt: 2,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Tooltip title='Upload Post Image '>
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
							</Tooltip>

							<Button
								variant='contained'
								href='#contained-buttons'
								className='Submit'
								sx={{
									marginInline: 2,
									m: 1,
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
				{ThePosts?.map((id) => (
					<Card PostID={id} />
				))}
			</Box>
		</Box>
	);
}
