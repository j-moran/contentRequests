let mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'contentRequest';

class Database {
	constructor() {
		this._connect();
	}

	_connect(){
		mongoose.connect(`mongodb://${server}/${database}`)
			.then(() => {
				console.log('Successfully connected to database!');
			})
			.catch(err => {
				console.error('Error connecting to database!');
			})
	}
}

module.exports = new Database()