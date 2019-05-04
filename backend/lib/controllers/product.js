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
