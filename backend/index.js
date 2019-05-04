const express = require('express');
const morgan = require('morgan');
const hbs = require('express-hbs');
const bodyParser = require('body-parser');
const addRoutes = require('./lib/routes');


async function boot() {
	const app = express();

	app.engine('hbs', hbs.express4({
		partialsDir: __dirname + '/../frontend/partials'
	}));

	app.set('view engine', 'hbs');
	app.set('views', __dirname + '/../frontend');

	app.use(bodyParser.urlencoded({extended: true}));

	app.use(morgan('dev'));
	addRoutes(app);

	const dbMigrate = require('./lib/database/migrator');
	await dbMigrate.startup();

	app.listen(3000);
}

boot();
