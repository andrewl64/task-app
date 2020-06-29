const mongoose = require('mongoose');

const dbName = 'task-app-api';

mongoose.connect(`${process.env.MONGODB_URL}/${dbName}`, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});