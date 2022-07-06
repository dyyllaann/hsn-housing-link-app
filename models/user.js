const {DateTime} = require("luxon");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: { type: String, required: true },
	password: { type: Date, required: true },
});

//Export model
module.exports = mongoose.model("User", UserSchema);