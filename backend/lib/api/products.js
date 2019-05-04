function findProduct(productID) {
	return knex().select('*').from('products').where('id', productID);
}

function listMyProducts(userID) {
	return knex().select('*').from('products').where('user', userID);
}

function editProduct(productID) {
	return null;
}

function deleteProduct(productID) {
	return knex().where({id: productID}).delete();
}

module.exports = {
	listMyProducts,
	findProduct,
	editProduct,
	deleteProduct
};
