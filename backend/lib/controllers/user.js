const {isEmail} = require('validator');

module.exports = {
	login: (req, res) => {
		if (!req.body || !req.body.email || !req.body.password) {
			res.status(400).end('Provide email and password');
		}

		let {email, password} = req.body;

		email = email.trim().toLowerCase();

		if (!isEmail(email)) {
			res.status(400).end('Provide valid email');
		}
	}
}
