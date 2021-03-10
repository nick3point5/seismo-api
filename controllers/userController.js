const db = require("../models");

const index = (req, res) => {
	db.Profile.find({}, (err, obj) => {
		if (err) {
			console.log("Error:");
			console.log(err);
		}
		res.json(obj);
	});
};

const show = (req, res) => {
	db.Profile.findOne(
		{
			uid: req.params.id,
		},
		(err, obj) => {
			if (err) {
				console.log("Error:");
				console.log(err);
			}
			res.json(obj);
		}
	);
};

const create = (req, res) => {
	if (!req.body.username) {
		return res.json({ message: "Must enter Username" });
	}
	const newUser = req.body;
	db.Profile.create(newUser, (err) => {
		if (err) return res.send(err);

		res.json(newUser);
	});
};

const update = (req, res) => {
	const updateObj = req.body;
	db.Profile.findOneAndUpdate(
		{
			uid: req.params.id,
		},
		updateObj,
		{ new: true },
		(err, obj) => {
			if (err) {
				console.log("Error:");
				console.log(err);
			}
			res.json(obj);
		}
	);
};

const remove = (req, res) => {
	db.Profile.findByIdAndDelete(req.params._id, (err, deletedObj) => {
		if (err) return res.send(err);
		res.json(deletedObj);
	});
};

const clear = (req, res) => {
	db.Profile.deleteMany({}, (err, obj) => {
		if (err) {
			console.log("Error:");
			console.log(err);
		}
		res.json(obj);
	});
};

const login = (req, res) => {
	const user = { uid: req.body.uid };
	db.Profile.findOne(user, (err, foundObj) => {
		if (err) {
			return res.send(err);
		}
		if (!foundObj) {
			db.Profile.create(req.body, (err, obj) => {
				if (err) {
					console.log("Error:");
					console.log(err);
				}
				res.json({ message: "User created" });
			});
		} else {
			res.json({ message: "User found." });
		}
	});
};

const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) return res.send(err);
		res.json({ message: "logout" });
	});
};

const getPosts = (req, res) => {
	db.Post.find(
		{
			ownerId: req.params.id,
		},
		(err, obj) => {
			if (err) {
				console.log("Error:");
				console.log(err);
			}
			res.json(obj);
		}
	).sort({ createdAt: -1 });
};

const feedTime = async (req, res) => {
	db.Profile.findOne(
		{
			uid: req.params.id,
		},
		(err, obj) => {
			if (err) {
				console.log("Error:");
				console.log(err);
			}
		}
	).then((obj) => {
		db.Post.find(
			{
				ownerId: obj.following,
			},
			(err, obj) => {
				if (err) {
					console.log("Error:");
					console.log(err);
				}
				res.json(obj);
			}
		)
			.sort({ createdAt: -1 })
			.limit(10);
	});
};

const feedMag = (req, res) => {
	db.Profile.findOne(
		{
			uid: req.params.id,
		},
		(err, obj) => {
			if (err) {
				console.log("Error:");
				console.log(err);
			}
		}
	).then((obj) => {
		db.Post.find(
			{
				ownerId: obj.following,
			},
			(err, obj) => {
				if (err) {
					console.log("Error:");
					console.log(err);
				}
				res.json(obj);
			}
		)
			.sort({ magnitude: -1 })
			.limit(10);
	});
};

module.exports = {
	index,
	create,
	show,
	update,
	remove,
	login,
	logout,
	getPosts,
	clear,
	feedTime,
	feedMag,
};
