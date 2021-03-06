module.exports = {
	users: {
		id: {type: 'string', maxLength: 24, primary: true, nullable: false},
		name: {type: 'string', maxLength: 100, nullable: false, unique: true},
		email: {type: 'string', maxLength: 100, nullable: false, unique: true},
		password: {type: 'string', maxLength: 60, nullable: false},
		zip: {type: 'string', maxLength: 5, minLength: 5, nullable: false},
		phone: {type: 'string', maxLength: 10, minLength: 10, nullable: false}
	},
	products: {
		id: {type: 'string', maxLength: 24, primary: true, nullable: false},
		name: {type: 'string', maxLength: 100, nullable: false},
		user_id: {type: 'string', maxLength: 24, references: 'users'},
		created_at: {type: 'dateTime', nullable: false},
		picture: {type: 'string', maxLength: 100, nullable: true},
		description: {type: 'text', maxLength: 1000, nullable: false},
		condition: {type: 'integer', oneOf: [1, 2, 3, 4, 5]}
	},
	services: {
		id: {type: 'string', maxLength: 24, primary: true, nullable: false},
		user_id: {type: 'string', maxLength: 24, references: 'users'},
		created_at: {type: 'dateTime', nullable: false},
		availability: {type: 'string', maxLength: 100, nullable: false},
		name: {type: 'string', maxLength: 100, nullable: false},
		description: {type: 'string', maxLength: 1000, nullable: false},
	}
}
