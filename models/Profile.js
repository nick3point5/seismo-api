const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
	{
		username: {
			type: String,
			required:true,
		},
		uid: {
			type: String,
			unique: true
		},
		img: {
			type: String,
			default: null
		},
		about: {
			type: String,
			default: 'About Me'
		},
		followers:[{
			type: String,
			ref: 'users'
		}],
		following:[{
			type: String,
			ref: 'users'
		}],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("profile", ProfileSchema);
