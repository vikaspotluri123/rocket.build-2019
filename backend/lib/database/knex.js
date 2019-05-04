const initKnex = require('knex');

let knex;
let initOptions;

function reinit() {
	if (knex) {
		knex.destroy();
	}

	initOptions = {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: 'db.db'
		},
		debug: false
	};

	knex = initKnex(initOptions);

	module.exports = knex;
	module.exports.connectionOptions = initOptions;
	module.exports.reinit = reinit;
	module.exports.init = initPool;
}

function initPool() {
	if (!knex.client.pool) {
		knex.client.initializePool({});
	}
}

reinit();
