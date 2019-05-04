const {requireLogin} = require('./middleware');
const {product, service, user} = require('./controllers');


module.exports = function addRoutes(instance) {
	instance.get('/', (req, res) => {
		if (req.user) {
			console.log(req.user);
			res.render('dashboard');
		} else {
			res.render('signin');
		}
	});

	instance.get('/signup', (req, res) => {
		res.render('signup');
	});

	instance.post('/signup', user.create);

	instance.put('/login', user.login, (req, res) => {
		res.send('are you allowed');
	});

	instance.use(requireLogin);

	instance.get('/services-and-products', (req, res) => {
		res.send('list services and products associated with you');
	});

	instance.get('/services/new', (req, res) => {
		res.send('want to create a service?');
	});

	instance.put('/services/new', (req, res) => {
		res.send('you do want to create a service')
	});

	instance.post('/services/:id', (req, res) => {
		res.send('edit a service');
	});

	instance.delete('/services/:id', (req, res) => {
		res.send('delete a service');
	});

	instance.get('/products/new', (req, res) => {
		res.send('want to create a product?');
	});

	instance.put('/products/new', (req, res) => {
		res.send('you do want to create a product')
	});

	instance.post('/products/:id', (req, res) => {
		res.send('edit a products');
	});

	instance.delete('/products/:id', (req, res) => {
		res.send('delete a product');
	});
};
