/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import { format } from 'timeago.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { SendComment, getAllComment } from '../Store/CommentsAction';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import date from 'date-and-time';
import en from 'javascript-time-ago/locale/en';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import './Comments.css';
import { DeleteComment } from '../Store/CommentsAction';
import { SendPost, getAllPosts } from '../Store/PostAction';
import { ImportPosts, EmptyPosts, DeletePostOfUser } from '../Store/PostsSlice';

const imgLink =
	'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';

export default function Comments(props) {
	//{format(message.createdAt)}

	TimeAgo.addDefaultLocale(en);
	const now = new Date();
	const dispatch = useDispatch();
	const User = useSelector((state) => state.User.user);
	const CurrentUserImage = User.img;

	const { FirstName, LastName } = User;

	const Name = FirstName + ' ' + LastName;
	const VerifyPresence = () => {
		if (Name === props.Object.UserName) {
			return true;
		}

		return false;
	};

	const CurrentUser = FirstName + ' ' + LastName;

	// Create formatter (English).

	const UserUsername = '';
	const { _id, UserImg, UserName, Content, DateCreated, PostID } = props.Object;

	const patth2 = '../Images/daemon2.jpg';

	const [SubmitContent, setContent] = useState('');
	//Add error system after
	const DeleteComments = async () => {
		try {
			console.log('Inside Delete Comment');
			//console.log(props.Object);
			const res = await DeleteComment(_id);
			const AllPosts = await dispatch(getAllPosts());
			dispatch(ImportPosts(AllPosts));
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	const handeContent = (e) => {
		setContent(e.target.value);
	};

	return (
		<div style={{ padding: 14, fontFamily: 'sans-serif' }} className='App'>
			<Paper style={{ padding: '20px 20px' }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
					}}>
					<Grid container wrap='nowrap' spacing={2}>
						<Grid item>
							<Avatar
								alt='Remy Sharp'
								src={require(`../Images/${props.Object.UserImg}`)}
							/>
						</Grid>
						<Grid justifyContent='left' item xs zeroMinWidth>
							<h4 style={{ margin: 0, textAlign: 'left' }}>{UserName}</h4>
							<p style={{ textAlign: 'left' }}>{Content}</p>
							<p style={{ textAlign: 'left', color: 'gray' }}>
								posted {DateCreated}
							</p>
						</Grid>
					</Grid>
					<Divider variant='' style={{ margin: '0px 0' }} />
					{VerifyPresence() && (
						<Tooltip
							title='Delete Comment'
							onClick={() => {
								DeleteComments();
							}}>
							<IconButton>
								<FolderDeleteIcon />
							</IconButton>
						</Tooltip>
					)}
				</Box>
			</Paper>
		</div>
	);
}
