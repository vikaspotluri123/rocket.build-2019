const {isEmail} = require('validator');
const api = require('../api');

module.exports = {
	async login(req, res) {
		if (!req.body || !req.body.email || !req.body.password) {
			res.status(400).end('Provide email and password');
		}

		let {email, password} = req.body;

		email = email.trim().toLowerCase();

		if (!isEmail(email)) {
			res.status(400).end('Provide valid email');
		}

		const user = await api.user.login(email, password);

		if (user.errors) {
			res.json(user);
			return;
		}

		req.session.user = user.id;
		req.session.save(() => {
			res.redirect('/');
		});
	},

	async create(req, res) {
		if (!req.body) {
			return res.status(400).end('gimme d ata');
		}

		const {email, password, name, zip, phone} = req.body;

		if (!email || !password || !name || !zip || !phone) {
			return res.status(400).json({errors: ['Email, password, name, zip and phone must be valid']});
		}

		const user = await api.user.create({email, ptPassword: password, name, zip, phone});

		if (user.errors) {
			return res.status(400).json({errors: user.errors});
		}

		req.session.user = user.id;
		res.redirect('/');
	}
}
