const crypto = require('crypto');
const _multer = require('multer');
const {static} = require('express');
const api = require('./api');
const {requireLogin} = require('./middleware');
const {product, service, user} = require('./controllers');

const hash = data => crypto.createHash('md5').update(data).digest('hex');

const storage = _multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './user-data')
	},
	limits: {
		files: 1,
		fileSize: 1024 * 1024 * 5
	},
	filename: function (req, file, cb) {
		console.log(file);
		const now = hash(Date.now().toString());
		const ext = file.originalname.split('.')[file.originalname.split('.').length - 1]
		const finalFileName = `${file.fieldname}-${now}.${ext}`;
		cb(null, finalFileName);
	},
	onFileUploadStart: function (file) {
		return (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png');
	}
});

const photo = _multer({storage}).single('photo');

module.exports = function addRoutes(instance) {
	instance.get('/', (req, res) => {
		if (req.user) {
			res.render('dashboard');
		} else {
			res.render('signin');
		}
	});

	instance.use('/', static(process.cwd()));

	instance.get('/admin', (req, res) => {
		res.render('adminpages/admin');
	});

	instance.get('/admin/users', (req, res) => {
		res.render('adminpages/users');
	});

	instance.get('/profile', (req, res) => {
		res.render('profile', {user: req.user});
	});

	instance.get('/signup', (req, res) => {
		res.render('signup');
	});

	instance.post('/signup', user.create);

	instance.post('/login', user.login, (req, res) => {
		res.send('are you allowed');
	});

	instance.use(requireLogin);

	instance.get('/signout', (req, res) => {
		req.session.destroy(() => {
			res.redirect('/');
		});
	})

	instance.get('/services-and-products', async (req, res) => {
		const conditions = ['Poor', 'Fair', 'Good', 'Great', 'Perfect'];
		let [services, products] = await Promise.all([
			api.service.listMyServices(req.user.id),
			api.product.listMyProducts(req.user.id)
		]);

		products = products.map(product => {
			product.condition = conditions[Number(product.condition) - 1];
			return product;
		});

		res.render('services-and-products', {
			services,
			products
		});
	});

	instance.get('/services/new', (req, res) => {
		res.render('new-service');
	});

	instance.post('/services/new', service.create);

	instance.put('/services/:id', (req, res) => {
		res.send('edit a service');
	});

	instance.delete('/services/:id', (req, res) => {
		res.send('delete a service');
	});

	instance.get('/products/new', (req, res) => {
		res.render('new-product');
	});

	instance.post('/products/new', photo, product.create);

	instance.put('/products/:id', (req, res) => {
		res.send('edit a products');
	});

	instance.delete('/products/:id', (req, res) => {
		res.send('delete a product');
	});
};
