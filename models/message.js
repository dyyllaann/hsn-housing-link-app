const {DateTime} = require("luxon");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String },
	date_added: { type: Date },
	message: { type: String },
	status: { type: String },
});

//Export model
module.exports = mongoose.model("Message", MessageSchema);
