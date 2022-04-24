const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CheckOutSchema = new Schema({

	email: {
		type: String
	},

	address: {
		type: String
	},
	phone: {
		type: String
	},
	cart: {
		type: String
	}
});
Orders = mongoose.model('CheckOut', CheckOutSchema);
module.exports = Orders;