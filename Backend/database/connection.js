/** @format */
const mongoose = require('mongoose');
//Database

const URI = process.env.MONGO_URI;
const connectDB = async () => {
	try {
		//console.log(process.env.MONGO_URI);
		const conn = await mongoose.connect(URI);
		console.log(`Connected to DB: ${conn.connection.host}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);

		process.exit(1);
	}
};
module.exports = connectDB;
