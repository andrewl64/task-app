const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'shillongtitude@gmail.com',
		subject: 'Welcome to Task-App',
		text: `Hello ${name}! Welcome to Task-App! Glad to have you onboard and just let us know if you need any help with anything!`
	});
}

const sendGoodbyeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'shillongtitude@gmail.com',
		subject: 'Goodbye from Task-App',
		html: `<h2>Goodbye ${name}</h2><h4>We will miss you.</h4>`
	});
}

module.exports = {
	sendWelcomeEmail,
	sendGoodbyeEmail
};