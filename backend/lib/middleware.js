module.exports = {
	requireLogin: (req, res, next) => {
		if (!req.user) {
			return res.status(401).send('you need to be logged in to do this');
		}

		next();
	}
}
