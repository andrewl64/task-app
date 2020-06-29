const mongoose = require('mongoose');
const validator = require('validator');
const { hash, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task.js');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	age: {
		type: Number,
		required: true,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number.');
			}
		}
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is not valid.');
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate(value) {
			if(value.toLowerCase().includes('password')) {
				throw new Error('Password not valid.');
			}
		}
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}],
	avatar: {
		type: Buffer
	}
}, {
	timestamps: true
});

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'author'
});

userSchema.methods.toJSON = function () {
	const userObj = this.toObject();

	delete userObj.password;
	delete userObj.tokens;
	delete userObj.avatar;

	return userObj;
};

userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id.toString() }, 'thi$!$@t0k3N');

	this.tokens = this.tokens.concat({ token });
	await this.save();
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('Unable to login.');
	}

	const isMatch = await compare(password, user.password);

	if (!isMatch) {
		throw new Error('Unable to login.');
	}

	return user;
}

//Hash plain-text password
userSchema.pre('save', async function (next) {

	if (this.isModified('password')) {
		this.password = await hash(this.password, 8);
	}

	next();
});

//delete tasks of removed user

userSchema.pre('remove', async function (next) {

	await Task.deleteMany({ author: this._id });

	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;