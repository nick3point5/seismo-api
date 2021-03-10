const router = require("express").Router();
const controllers = require("../controllers");

router.get("/", controllers.post.index);
router.get("/get10", controllers.post.get10);
router.post("/", controllers.post.create);
router.get("/getposts/:id", controllers.post.getPosts);
router.get("/:id", controllers.post.show);
router.put("/:id", controllers.post.update);
router.delete("/:id", controllers.post.remove);
router.post("/:id", controllers.post.reply);

module.exports = router;
