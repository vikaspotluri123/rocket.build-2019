const api = require('../api');

async function deleteAProduct(productID, userID) {
	const product = await getProduct(productId);
	if (!product) {
		return {
			code: 404,
			error: 'product does not exist'
		};
	}

	if (product.user !== userID) {
		return {
			code: 403,
			error: 'You don not have permission to delete this product'
		};
	}

	const deleted = await deleteProduct(productID);

	if (deleted) {
		res.status(204).end();
	} else {
		res.status(500).end();
	}
}

module.exports = {
	async create(req, res) {
		if (!req.body) {
			res.end('you must send some data');
		}

		const {name, description, condition} = req.body;
		if (!name || !description || !condition) {
			return res.json({errors: ['name, description and condition must be provided']});
		}

		let photo = 'https://picsum.photos/id/524/200/200';
		const {file} = req;
		if (file) {
			photo = file.destination;
		}

		const product = await api.product.create(name, photo, description, condition, req.user.id);

		if (product.errors) {
			return res.json({errors: product.errors});
		}

		res.redirect(`/products/${product.id}`)
	}
}
