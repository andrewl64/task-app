const mongoose = require('mongoose');

const connURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-app-api';

mongoose.connect(`${connURL}/${dbName}`, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});