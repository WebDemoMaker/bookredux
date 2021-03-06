const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	token: {
		type: String
	}
});
Users = mongoose.model('User', UserSchema);
module.exports = Users;