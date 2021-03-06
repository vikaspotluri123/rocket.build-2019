const {isEmail} = require('validator');
const knex = require('../database/knex');
const {compare, hash} = require('../utils/password-hash');
const {insert} = require('./base');

const isSecurePassword = () => true;

module.exports = {
	async find(id) {
		const user = (await knex.select('*').from('users').where('id', id))[0];
		if (user) {
			delete user.password;
		}

		return user;
	},
	async login (email, ptPassword) {
		const user = (await knex.select('*').from('users').where('email', email))[0];
		if (!user) {
			return {
				errors: [
					"invalid email or password"
				]
			};
		}

		const {password} = user;

		const isPasswordCorrect = await compare(ptPassword, password);

		if (isPasswordCorrect) {
			return user;
		}

		return {
			errors: [
				"invalid email or password"
			]
		};
	},

	async create({email, ptPassword, phone, zip, name}) {
		const errors = [];

		if (!isEmail(email)) {
			errors.push('Email must be a valid email')
		}

		if (phone.length !== 10) {
			errors.push('Phone number must be 10 digits');
		} else if (isNaN(phone)) {
			errors.push('Invalid phone number');
		}

		if (zip.length !== 5) {
			errors.push('Zip must be 5 digits');
		} else if (isNaN(zip)) {
			errors.push('Invalid zip code');
		}

		if (name.length > 100) {
			errors.push('Name is too long');
		}

		if (!isSecurePassword(ptPassword)) {
			errors.push('password is insecure');
		}

		if (errors.length > 0) {
			return {errors};
		}

		const userExists = (await knex.select('*').from('users').where('email', email))[0];

		if (userExists) {
			return {
				errors: ['email is already in use, please login']
			};
		}

		const password = await hash(ptPassword);

		const user = {email, password, name, zip, phone};

		const [created] = await insert('users', user);

		if (created) {
			return user;
		}

		return {
			errors: ['Something broke on our end, please try again later']
		};
	}
}
