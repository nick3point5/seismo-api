const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.post.index);
router.post('/', controllers.post.create);
router.delete('/clear', controllers.post.clear);
router.get('/getposts/:id', controllers.post.getPosts)
router.get('/:id', controllers.post.show);
router.put('/:id', controllers.post.update);
router.delete('/:id', controllers.post.remove);
router.post('/:id', controllers.post.reply);

module.exports = router

