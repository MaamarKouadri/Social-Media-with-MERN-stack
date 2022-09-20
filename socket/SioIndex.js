/** @format */
console.log('Inside SioIndex');
const io = require('socket.io')(8900, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

io.on('connection', (socket) => {
	//when ceonnect

	console.log('a user connected.');

	//take userId and socketId from user
	socket.on('addUser', (userId) => {
		try {
			addUser(userId, socket.id);
			io.emit('getUsers', users);
		} catch (err) {
			console.log(err);
		}
	});

	const removeUser = (socketId) => {
		users = users.filter((user) => user.socketId !== socketId);
	};

	const getUser = (userId) => {
		return users.find((user) => user.userId === userId);
	};

	//send and get message
	socket.on('sendMessage', ({ senderId, receiverId, text }) => {
		console.log('Sending message ');

		try {
			const user = getUser(receiverId);
			io.to(user.socketId).emit('getMessage', {
				senderId,
				text,
			});
		} catch (err) {
			console.log(err);
		}
	});

	socket.on('disconnect', () => {
		console.log('a user disconnected!');
		removeUser(socket.id);
		io.emit('getUsers', users);
	});
});
