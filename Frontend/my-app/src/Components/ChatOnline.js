/** @format */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './chatOnline.css';

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
	const CurrentOnlineUsers = [];
	const [OnlineUsers, SetOnlineUsers] = useState(onlineUsers);

	/*
	useEffect(() => {
		console.log('Online users are  my man ');
		console.log(onlineUsers);
		onlineUsers.map((o) => {
			Extractor(o.userId);
		});
	}, [currentId]);
*/
	console.log('Inside Chat Online ');
	console.log(onlineUsers);
	const Extractor = async (id) => {
		console.log('Extractor');
		console.log('ID is ');
		console.log(id);

		try {
			const res = await axios.get('http://localhost:5000/Users' + id);
			console.log('User is ');
			console.log(res.data);

			CurrentOnlineUsers.append(res.data);
			if (CurrentOnlineUsers.includes(currentId)) {
				CurrentOnlineUsers.pop(currentId);
			}
			SetOnlineUsers(CurrentOnlineUsers);
		} catch (err) {
			console.log(err);
		}
	};

	const handleClick = async (user) => {
		try {
			Extractor(user.userId);

			const res = await axios.get(
				`http://localhost:5000/Chat/TwoChat/${currentId}/${user._id}`
			);
			console.log('Res data ');
			console.log(res);
			setCurrentChat(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='chatOnline'>
			{onlineUsers.map((o) => (
				<div
					className='chatOnlineFriend'
					onClick={() => {
						handleClick(o);
						//console.log('hey');
					}}>
					<div className='chatOnlineImgContainer'>
						<img
							//src={require(`../Images/${o.img}`)}
							src={require(`../Images/couscous.jpg`)}
							alt=''
							className='chatOnlineImage'
						/>
						<div className='chatOnlineBadge'> </div>
					</div>
					<span className='chatOnlineName'>
						{' '}
						{o.FirstName + ' ' + o.LastName}{' '}
					</span>
				</div>
			))}
		</div>
	);
}
