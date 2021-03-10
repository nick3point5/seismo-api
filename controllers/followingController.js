const db = require("../models");

const follow = (req, res) => {
	let target = null;
	db.Profile.findById(req.params.id, (err, obj) => {
		if (err) {
			console.log("Error:");
			console.log(err);
		}
		target = obj;
	}).then((obj) => {
		if (obj.followers.includes(req.body.id)) {
			res.json({ message: "already following" });
		} else {
			obj.followers.push(req.body.id);
			db.Profile.findByIdAndUpdate(
				req.params.id,
				obj,
				{ new: true },
				(err, obj) => {
					if (err) {
						console.log("Error:");
						console.log(err);
					}
				}
			).then((followObj) => {
				db.Profile.findOne({ uid: req.body.id }, (err, followerObj) => {
					if (err) {
						console.log("Error:");
						console.log(err);
					}
				}).then((obj) => {
					obj.following.push(followObj.uid);
					db.Profile.findOneAndUpdate(
						{ uid: obj.uid },
						obj,
						{ new: true },
						(err, obj) => {
							if (err) {
								console.log("Error:");
								console.log(err);
							}
						}
					).then(() => {
						db.Profile.find(
							{
								following: target.uid,
							},
							(err, objArr) => {
								if (err) {
									console.log("Error:");
									console.log(err);
								}

								const resObj = objArr.map((obj) => {
									const result = {
										img: obj.img,
										username: obj.username,
										uid: obj.uid,
									};
									return result;
								});
								res.json(resObj);
							}
						);
					});
				});
			});
		}
	});
};

const unFollow = (req, res) => {
	let target = null;

	db.Profile.findById(req.params.id, (err, obj) => {
		if (err) {
			console.log("Error:");
			console.log(err);
		}
		target = obj;
	}).then((obj) => {
		if (!obj.followers.includes(req.body.id)) {
			res.json({ message: "already not following" });
		} else {
			const followers = obj.followers.filter((id) => id !== req.body.id);

			const updateObj = {
				followers: followers,
			};
			db.Profile.findByIdAndUpdate(
				req.params.id,
				updateObj,
				{ new: true },
				(err, obj) => {
					if (err) {
						console.log("Error:");
						console.log(err);
					}
				}
			).then((unFollowObj) => {
				db.Profile.findOne({ uid: req.body.id }, (err, followerObj) => {
					if (err) {
						console.log("Error:");
						console.log(err);
					}
				}).then((obj) => {
					const following = obj.following.filter(
						(id) => id !== unFollowObj.uid
					);

					const updateObj = {
						following: following,
					};

					db.Profile.findOneAndUpdate(
						{ uid: obj.uid },
						updateObj,
						{ new: true },
						(err, obj) => {
							if (err) {
								console.log("Error:");
								console.log(err);
							}
						}
					).then(() => {
						db.Profile.find(
							{
								following: target.uid,
							},
							(err, objArr) => {
								if (err) {
									console.log("Error:");
									console.log(err);
								}

								const resObj = objArr.map((obj) => {
									const result = {
										img: obj.img,
										username: obj.username,
										uid: obj.uid,
									};
									return result;
								});
								res.json(resObj);
							}
						);
					});
				});
			});
		}
	});
};

const getFollowers = (req, res) => {
	db.Profile.find(
		{
			following: req.params.id,
		},
		(err, objArr) => {
			if (err) {
				console.log("Error:");
				console.log(err);
			}

			resObj = objArr.map((obj) => {
				const res = {
					img: obj.img,
					username: obj.username,
					uid: obj.uid,
				};
				return res;
			});

			res.json(resObj);
		}
	);
};

const getFollowing = (req, res) => {
	db.Profile.find(
		{
			followers: req.params.id,
		},
		(err, objArr) => {
			if (err) {
				console.log("Error:");
				console.log(err);
			}
			resObj = objArr.map((obj) => {
				const res = {
					img: obj.img,
					username: obj.username,
					uid: obj.uid,
				};
				return res;
			});
			res.json(resObj);
		}
	);
};

module.exports = {
	follow,
	unFollow,
	getFollowers,
	getFollowing,
};