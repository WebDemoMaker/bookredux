const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
	title:{
		type:String
	},
	price:{
		type:String
	},
	keywords:{
		type:[]
	}
});
Books = mongoose.model('Book', BookSchema);
module.exports =Books;