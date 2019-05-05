const knex = require('../database/knex');
const {insert} = require('./base');

function findProduct(productID) {
	return knex().select('*').from('products').where('id', productID);
}

function listMyProducts(userID) {
	return knex.select('*').from('products').where('user_id', userID);
}

function editProduct(productID) {
	return null;
}

function deleteProduct(productID) {
	return knex().where({id: productID}).delete();
}

module.exports = {
	async create(name, picture, description, condition, userID) {
		const errors = [];

		if (name.length > 100) {
			errors.push('name is too long');
		}

		if (description.length > 1000) {
			errors.push('description is too long');
		}

		if (!['1', '2', '3', '4', '5'].includes(condition.toString())) {
			errors.push('condition is not valid');
		}

		if (errors.length > 0) {
			return {errors};
		}

		const product = {name, description, picture, condition, createdAt: 1, user_id: userID};
		await insert('products', product);
		return product;
	},
	listMyProducts,
	findProduct,
	editProduct,
	deleteProduct
};
