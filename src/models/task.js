const mongoose = require('mongoose');
const { hash } = require('bcryptjs');

const taskSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
		trime: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	}
});

taskSchema.pre('save', async function(next) {
	next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;