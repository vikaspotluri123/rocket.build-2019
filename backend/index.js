const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const addRoutes = require('./lib/routes');


async function boot() {
	const app = express();
	app.use(bodyParser.urlencoded({extended: true}));

	app.use(morgan('dev'));
	addRoutes(app);

	const dbMigrate = require('./lib/database/migrator');
	await dbMigrate.startup();

	app.listen(3000);
}

boot();
