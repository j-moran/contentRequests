let mongoose = require('mongoose');

const server = process.env.DB_HOST;
const database = process.env.DB_NAME;

class Database {
	constructor() {
		this._connect();
	}

	_connect(){
		mongoose.connect(`mongodb://${server}:27017/${database}`, {useNewUrlParser: true})
			.then(() => {
				console.log('Successfully connected to database!');
			})
			.catch(err => {
				console.error('Error connecting to database!');
			})
	}
}

module.exports = new Database()