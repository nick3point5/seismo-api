const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		comment: {
			type: String,
			required: true,
			maxLength: 200,
		},
		author: {
			type: String,
			default: "anonymous",
		},
		img: {
			type: String,
			default: null,
		},
		reply: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "posts",
			},
		],
		ownerId: {
			type: String,
			// type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		magnitude: {
			type: Number,
			default: 4.0,
		},
		power: {
			type: Number,
			default: 0,
		},
		parent: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "parent",
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
