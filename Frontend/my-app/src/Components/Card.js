/** @format */

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

import { ImportPosts, EmptyPosts, DeletePostOfUser } from '../Store/PostsSlice';
import { GetPost } from '../Store/PostAction';
import { ErrorBoundary } from 'react-error-boundary';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import { useDispatch } from 'react-redux';
import { authActions } from '../Store/LoginSlice';
import { useSelector } from 'react-redux';
import Comments from './Comments';
import useCollapse from 'react-collapsed';
import date from 'date-and-time';
import { SendComment, getAllComment } from '../Store/CommentsAction';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function RecipeReviewCard(props) {
	const User = useSelector((state) => state.User.user);

	function ErrorFallback({ error, resetErrorBoundary }) {
		return (
			<div role='alert'>
				<p>Something went wrong:</p>
				<pre>{error.message}</pre>
				<button onClick={resetErrorBoundary}>Try again</button>
			</div>
		);
	}

	const { FistName, LastName } = User;
	const PostID = props.PostID;
	const FullName = FistName + ' ' + LastName;

	const [FetchedPost, setFetchedPost] = useState(null);
	const [content, setcontent] = useState('');
	const [createdAt, setcreatedAt] = useState('');
	const [imageUrl, setimageUrl] = useState('');
	const [AvatarUrl, setAvatarUrl] = useState('');
	const [title, settitleFetchedPost] = useState('');
	const [comment, setComment] = useState('');
	const [AllComments, setAllComments] = useState([]);
	const [SubmittedComment, setSubmittedComment] = useState([]);
	const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

	useEffect(() => {
		console.log('Inside Use Effect');
		const FetchPosts = async () => {
			try {
				const FetchedPost = await GetPost(props.PostID);
				console.log('The id of this post is ');
				console.log(props.PostID);
				console.log(FetchedPost.post);
				const { content, date, imageUrl, title, AvatarURL } = FetchedPost.post;

				setcontent(content);
				setcreatedAt(date);
				const path = require('../Images/' + imageUrl);
				setimageUrl(path);
				const Avatar = require('../Images/' + AvatarURL);
				console.log();
				setAvatarUrl(Avatar);

				settitleFetchedPost(title);
				setFetchedPost(FetchedPost.post);
			} catch (error) {
				console.log(error);
			}
		};
		FetchPosts();
	}, []);

	const handeContent = (e) => {
		setComment(e.target.value);
	};
	const FetchComments = async () => {
		const AllComments = await getAllComment(props.PostID);
		console.log('Comments are');
		console.log(AllComments);
		setAllComments(AllComments);
	};

	const SubmitComment = async () => {
		const now = new Date();
		const Body = {
			UserImg: User.img,
			UserName: User.FirstName + ' ' + User.LastName,
			Content: comment,
			DateCreated: date.format(now, 'ddd, MMM DD YYYY'),
			PostID: PostID,
		};

		console.log('Body is ');
		console.log(Body);
		try {
			const res = await SendComment(Body);
			console.log('Comment has been added');
			console.log(res);
			FetchComments();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		FetchComments();
	}, []);
	/*
	useEffect(() => {
		const FetchComments = async () => {
			try {
				const AllComments = await getAllComment(props.PostID);
				console.log('Comments are');
				console.log(AllComments);
				setAllComments(AllComments);
			} catch (error) {
				console.log(error);
			}
		};
		FetchComments();
	}, []);
*/
	const { PostsList, UsersNotToSee } = useSelector((state) => state.Post);

	console.log(UsersNotToSee);

	const dispatch = useDispatch();

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	/*
	content
	createdAt
	imageUrl
	title
	*/
	return (
		<Card sx={{ p: 2, m: 2, maxWidth: 700, borderStyle: 'solid' }}>
			<CardHeader
				avatar={
					<Avatar
						sx={{ bgcolor: red[500] }}
						src={AvatarUrl}
						aria-label='recipe'></Avatar>
				}
				action={
					<Tooltip title='Delete Post'>
						<IconButton aria-label='settings'>
							<FolderDeleteIcon />
						</IconButton>
					</Tooltip>
				}
				title={title}
				subheader={createdAt}
			/>
			<CardMedia
				component='img'
				height='200'
				sx={{
					objectFit: 'cover',
				}}
				src={imageUrl}
				alt='Paella dish'
			/>
			<CardContent>
				<Typography variant='body2' color='text.secondary'>
					{content}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<TableRow
					sx={{
						width: '65ch',
						margin: 'auto',
						display: 'flex',
						justifyContent: 'space-evenly',
						fontSize: '17px',
					}}>
					<IconButton aria-label='add to favorites'>
						<FavoriteIcon />
						Like
					</IconButton>

					<IconButton
						aria-label='comment'
						{...getToggleProps({
							onClick: () => setExpanded((prevExpanded) => !prevExpanded),
						})}>
						<ModeCommentIcon />
						Comment
					</IconButton>
				</TableRow>
			</CardActions>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => {
					// reset the state of your app so the error doesn't happen again
				}}>
				<section {...getCollapseProps()}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Typography variant='h6' color='black' sx={{ pb: 2 }}>
							Comments Section
						</Typography>
						{AllComments?.map((id) => (
							<Comments Object={id} CurrentUser={User} />
						))}
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',

							justifyContent: 'space-between',
						}}>
						<TextField
							id='outlined-multiline-static'
							label='Add a comment'
							placeholder='Add a comment'
							className='FieldTexts'
							multiline
							rows={3}
							sx={{ m: 2 }}
							onChange={(e) => {
								handeContent(e);
							}}
						/>
						<Button
							variant='contained'
							href='#contained-buttons'
							sx={{
								marginInline: 2,
								display: 'flex-end',
							}}
							onClick={() => {
								SubmitComment();
							}}>
							Post Comment
						</Button>
					</Box>
				</section>
			</ErrorBoundary>
		</Card>
	);
}
