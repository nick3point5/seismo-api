const db = require("../models");

updateDB()
setInterval(() => {
	updateDB()
}, 1000 * 60 * 20);

function updateDB(){
	db.Post.find(
		{
			magnitude: { $lte: 0 },
		},
		(err, objArr) => {
			if (err) {
				console.log("Error:");
				console.log(err);
			}
			objArr.forEach((obj) => {
				recursiveDelete(obj._id);
			});
		}
	).then(() => {
		db.Post.find({}, (err, obj) => {
			if (err) {
				console.log("Error:");
				console.log(err);
			}
		}).then((obj) => {
			obj.forEach((post) => {
				const currentMag = magnitude(post.power, post.createdAt);
				if (currentMag !== post.magnitude) {
					updateObj = {
						magnitude: currentMag,
					};

					db.Post.findByIdAndUpdate(
						post._id,
						updateObj,
						{ new: true },
						(err, obj) => {
							if (err) {
								console.log("Error:");
								console.log(err);
							}
						}
					);
				}
			});
		});
	});
}

function magnitude(power, created) {
	const growth = 6.287728772;
	const spread = 0.034613447;
	const shift = 4.326726157;
	const decay = 0.055555556;

	const time = (new Date() - created) / 1000 / 60 / 60;
	return growth * Math.log10(power * spread + shift) - time * decay;
}

function recursiveDelete(parent) {
	return db.Post.find(
		{
			parent: parent,
		},
		(err, obj) => {
			if (err) {
				console.log("Error:");
				console.log(err);
			}
		}
	)
		.then((objArr) => {
			if (objArr && objArr.length > 0) {
				objArr.forEach((obj) => {
					recursiveDelete(obj._id);
				});
			}
		})
		.then(() => {
			db.Post.findByIdAndDelete(parent, (err, obj) => {
				if (err) {
					console.log("Error:");
					console.log(err);
				}
			});
		})
		.catch((err) => console.log(err));
}

module.exports = {
	magnitude,
};
