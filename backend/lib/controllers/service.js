const api = require('../api');

module.exports = {
	async create(req, res) {
		if (!req.body) {
			res.end('you must send some data');
		}

		const {name, description, availability} = req.body;
		if (!name || !description || !availability) {
			return res.json({errors: ['name, description and availability must be provided']});
		}

		const service = await api.service.create(name, description, availability, req.user.id);

		if (service.errors) {
			return res.json({errors: service.errors});
		}

		res.redirect(`/services/${service.id}`)
	}
};
