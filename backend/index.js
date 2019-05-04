const express = require('express');
const morgan = require('morgan');
const hbs = require('express-hbs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const addRoutes = require('./lib/routes');
const api = require('./lib/api');

async function boot() {
	const app = express();

	app.engine('hbs', hbs.express4({
		partialsDir: __dirname + '/../frontend/partials'
	}));

	app.set('view engine', 'hbs');
	app.set('views', __dirname + '/../frontend');

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(session({
		store: new FileStore(),
		resave: 1,
		saveUninitialized: true,
		secret: 'plschangeme'
	}));

	app.use(async function addUserIfExists(req, res, next) {
		if (req.session.user) {
			req.user = await api.user.find(req.session.user).catch(e => undefined);
		}

		next();
	});

	app.use(morgan('dev'));
	addRoutes(app);

	const dbMigrate = require('./lib/database/migrator');
	await dbMigrate.startup();

	app.listen(3000);
}

boot();
