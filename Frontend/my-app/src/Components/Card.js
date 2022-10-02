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
import { DeletePost } from '../Store/PostAction';
import Divider from '@mui/material/Divider';
import {
	SendPost,
	getAllPosts,
	ManageNumberOfLikes,
} from '../Store/PostAction';
import { ImportPosts, EmptyPosts, DeletePostOfUser } from '../Store/PostsSlice';
import {
	getUserPending,
	getUserSuccess,
	getUserFail,
} from '../Store/userSlice';
import { getUserProfile } from '../Store/userAction';

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
	const { LikedPosts } = User;
	const [LikeButtonClicked, setLikeButtonClicked] = useState(false);
	const [ButtonColor, setButtonColor] = useState(
		LikedPosts.indexOf(props.PostID) === -1 ? 'default' : 'primary'
	);
	const [TheLikes, setNumberOfLikes] = useState(0);

	// Use redux to fix the likes or already like in the databse fix it
	const HandleButton = async () => {
		if (ButtonColor === 'default') {
			try {
				const res = await ManageNumberOfLikes(User._id, props.PostID, 'add');
				setNumberOfLikes(res);
				setButtonColor('primary');
				setLikeButtonClicked(true);
				const resUser = await dispatch(getUserProfile());
				dispatch(getUserSuccess(resUser));
				return;
			} catch (err) {
				console.log(err);
			}
		}
		if (ButtonColor === 'primary') {
			try {
				const res = await ManageNumberOfLikes(User._id, props.PostID, 'remove');
				setNumberOfLikes(res);
				setButtonColor('default');
				setLikeButtonClicked(false);
				const resUser = await dispatch(getUserProfile());
				dispatch(getUserSuccess(resUser));
				return;
			} catch (err) {
				console.log(err);
			}
		}
	};

	const { posts } = User;

	const [isPresent, setIsPresent] = useState(false);

	const VerifyPresence = () => {
		for (var i = 0; i < posts.length; i++) {
			if (posts[i] === props.PostID) {
				return true;
			}
		}
		return false;
	};
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
	const [ThisID, setThisId] = useState();
	const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

	const DeleteThePost = async () => {
		try {
			const res = await DeletePost(ThisID);

			const AllPosts = await dispatch(getAllPosts());
			dispatch(ImportPosts(AllPosts));
			const resUser = await dispatch(getUserProfile());
			dispatch(getUserSuccess(resUser));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		console.log('Inside Use Effect');
		const FetchPosts = async () => {
			try {
				const FetchedPost = await GetPost(props.PostID);
				const {
					NumberOfLikes,
					_id,
					content,
					date,
					imageUrl,
					title,
					AvatarURL,
					ColorOfLikeButton,
				} = FetchedPost.post;

				setThisId(_id);

				setNumberOfLikes(NumberOfLikes);
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
	}, [props, TheLikes, LikeButtonClicked]);

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
	}, [props]);

	const { PostsList, UsersNotToSee } = useSelector((state) => state.Post);

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
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => {
					// reset the state of your app so the error doesn't happen again
				}}>
				<CardHeader
					sx={{
						border: 'solid',
					}}
					avatar={
						<Avatar
							sx={{ bgcolor: red[500], height: 50, width: 50 }}
							src={AvatarUrl}
							aria-label='recipe'></Avatar>
					}
					action={
						VerifyPresence() && (
							<Tooltip
								title='Delete Post'
								onClick={() => {
									DeleteThePost();
								}}>
								<IconButton>
									<FolderDeleteIcon />
								</IconButton>
							</Tooltip>
						)
					}
					title={'Title : ' + title}
					subheader={'Posted ' + createdAt}
				/>
			</ErrorBoundary>
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
			<Divider sx={{ borderBottomWidth: '2px', backgroundColor: 'black' }} />
			<CardActions disableSpacing>
				<TableRow
					sx={{
						width: '65ch',
						margin: 'auto',
						display: 'flex',
						justifyContent: 'space-evenly',
						fontSize: '17px',
					}}>
					<IconButton
						aria-label='add to favorites'
						color={ButtonColor}
						onClick={() => {
							HandleButton();
						}}>
						<FavoriteIcon />
						{TheLikes} Likes
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
		</Card>
	);
}
