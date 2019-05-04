const Promise = require('bluebird');
const {createTable} = require('../../commands');
const schema = require('../../schema');

const schemaTables = Object.keys(schema);

function createTables({connection}) {
	return Promise.mapSeries(schemaTables, function createSingleTable(table) {
		console.info(`Creating table: ${table}`);
		return createTable(table, connection);
	});
}

module.exports.up = createTables;
