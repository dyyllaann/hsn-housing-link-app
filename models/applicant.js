const {DateTime} = require("luxon");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ApplicantSchema = new Schema({
	name: { type: String },
	date_added: { type: Date },
	tenants: { type: String },
	seeking: { type: Array },
	preferred_location: { type: Array },
	bedrooms: { type: Array },
	price: { type: Array },
	pets: { type: Array },
	pets_string: { type: String },
	vehicles: { type: String },
	occupation_location: { type: String },
	story: { type: String },
	interests: { type: String },
	status: { type: String },
});

ApplicantSchema.virtual("price_range").get(function () {
	return (this.price[0].min == 0) ? `Up to $${this.price[0].max}` : `$${this.price[0].min}-${this.price[0].max}`
});

// ApplicantSchema.virtual("pets_formatted").get(function () {

// });

//Export model
module.exports = mongoose.model("Applicant", ApplicantSchema);
