const knex = require('./knex');
const schema = require('./schema');

module.exports.init = async function init() {
	for (const table in schema) {
		const hasTable = await knex.schema.hasTable(table);

		if (!hasTable) {
			console.log(table, 'does not exist.. creating');
			await knex.schema.createTable(table, builder => {
				for (const column in schema[table]) {
					const spec = schema[table][column];
					if (!builder[spec.type]) {
						throw new Error(`column type ${column.type} does not exist`);
					}

					builder[spec.type]()
				}
			});
		}
	}
}


module.exports.init();
