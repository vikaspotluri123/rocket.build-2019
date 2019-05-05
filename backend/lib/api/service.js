const knex = require('../database/knex');
const {insert} = require('./base');

module.exports = {
	async create(name, description, availability, userID) {
		const errors = [];

		if (name.length > 100) {
			errors.push('name is too long');
		}

		if (description.length > 1000) {
			errors.push('description is too long');
		}

		if (availability.length > 100) {
			errors.push('availability is too long');
		}

		if (errors.length > 0) {
			return {errors};
		}

		const service = {name, description, availability, createdAt: 1, user_id: userID};
		await insert('services', service);
		return service;
	},

	listMyServices(userID) {
		return knex.select('*').from('services').where('user_id', userID);
	}
}
