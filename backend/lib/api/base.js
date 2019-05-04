const ObjectID = require('bson-objectid');
const knex = require('../database/knex');

module.exports = {
	insert(table, data) {
		data.id = ObjectID.generate();
		console.log(data);
		if (data.createdAt) {
			data.created_at = Date.now();
			delete data.createdAt;
		}

		return knex(table).insert(data);
	}
}
