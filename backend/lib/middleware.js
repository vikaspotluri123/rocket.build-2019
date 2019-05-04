module.exports = {
	requireLogin: (req, res, next) => {
		if (!req.user) {
			res.status(401).send('you need to be logged in to continue');
		}

		next();
	}
}
