/** @format */

import React from 'react';
import Header from '../Components/Header';

import Box from '@mui/material/Box';
import './MessengerBox.css';
import MessageIcon from './MessageIcon';
import Message from './message';
import ChatOnline from './ChatOnline';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';

export default function MessengerBox() {
	const User = useSelector((state) => state.User.user);
	const [chats, setChats] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	//const [socket, setSocket] = useState(null);
	const socket = useRef();
	const [newMessage, setNewMessage] = useState('');
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const scrollRef = useRef();

	useEffect(() => {
		try {
			socket.current = io('ws://localhost:8900');
			socket.current.on('getMessage', (data) => {
				setArrivalMessage({
					sender: data.senderId,
					text: data.text,
					createdAt: Date.now(),
				});
			});
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		socket.current.emit('addUser', User._id);
		socket.current.on('getUsers', (users) => {
			setOnlineUsers(users);
		});
	}, [User]);
	const {
		_id,
		FirstName,
		LastName,
		ProfileDescription,
		email,
		Age,
		Profession,
		Country,
		NumberFriends,
		Friends,
		isAdmin,
		isConnected,
		img,
	} = User;

	useEffect(() => {
		console.log('Inside useEffect of MessengerBox');
		const getConversations = async () => {
			try {
				const res = await axios.get('http://localhost:5000/Chat/' + _id);
				console.log('Conversations');
				console.log(res);
				setChats(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		getConversations();
	}, [User]);

	useEffect(() => {
		const getTheMessenges = async () => {
			console.log('Current chat is ');
			console.log(currentChat);
			try {
				const res = await axios.get(
					'http://localhost:5000/Messages/' + currentChat?._id
				);
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getTheMessenges();
	}, [currentChat]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			chatId: currentChat._id,
			sender: User._id,
			text: newMessage,
		};

		const receiverId = currentChat.members.find(
			(member) => member !== User._id
		);

		socket.current.emit('sendMessage', {
			senderId: User._id,
			receiverId,
			text: newMessage,
		});

		try {
			const res = await axios.post('http://localhost:5000/Messages', message);
			setMessages([...messages, res.data]);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);
	return (
		<div className='messenger'>
			<div className='chatMenu'>
				<div className='chatMenuWrapper'>
					<input placeholder='Search Friends' className='chatMenuInput' />
					{chats.map((c) => (
						<div onClick={() => setCurrentChat(c)}>
							<MessageIcon chat={c} currentUserID={_id} />
						</div>
					))}
				</div>
			</div>
			<div className='chatBox'>
				<div className='chatBoxWrapper'>
					{currentChat ? (
						<>
							<div className='chatBoxTop'>
								{messages.map((m) => (
									<div ref={scrollRef}>
										<Message message={m} MyMessage={m.sender === User._id} />
									</div>
								))}
							</div>
							<div className='chatBoxBottom'>
								<textarea
									placeholder='write something ...'
									className='InputMessage'
									onChange={(e) => setNewMessage(e.target.value)}
									value={newMessage}></textarea>
								<button className='SubmitMessage' onClick={handleSubmit}>
									send
								</button>
							</div>{' '}
						</>
					) : (
						<span className='noConversationText'>
							Start chatting to create a Conversations...
						</span>
					)}
				</div>
			</div>
			<div className='chatOnline'>
				<div className='chatOnlineWrapper'>
					<ChatOnline
						onlineUsers={onlineUsers}
						currentId={User._id}
						setCurrentChat={setCurrentChat}
					/>
				</div>
			</div>
		</div>
	);
}
