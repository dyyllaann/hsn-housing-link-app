const {DateTime} = require("luxon");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ApplicantSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	name: { type: String },
	preferred_name: { type: String },
	email: { type: String },
	date_added: { type: Date },
	tenants: { type: String },
	seeking: { type: Array },
	preferred_location: { type: Array },
	bedrooms: { type: Array },
	price: { 
		min: { type: String },
		max: { type: String } 
	},
	pets: { type: Array },
	pets_string: { type: String },
	occupation_location: { type: String },
	story: { type: String },
	interests: { type: String },
	status: { type: String },
});

ApplicantSchema.virtual("price_range").get(function () {
	return (this.price.min == 0) ? `Up to $${this.price.max}` : `$${this.price.min}-${this.price.max}`
});

ApplicantSchema.virtual("name_formatted").get(function () {
	return (this.lastName) ? (`${this.firstName} ${this.lastName[0]}.`) : this.name
});

// ApplicantSchema.virtual("pets_formatted").get(function () {

// });

//Export model
module.exports = mongoose.model("Applicant", ApplicantSchema);
