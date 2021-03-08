const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.user.index);
router.post('/', controllers.user.create);
router.get('/:id', controllers.user.show);
router.post('/login', controllers.user.login);
router.get('/logout', controllers.user.logout);
router.put('/:id', controllers.user.update);
router.delete('/:id', controllers.user.remove);
router.get('/getposts/:id',controllers.user.getPosts)
router.get('/feedTime/:id',controllers.user.feedTime)
router.get('/feedMag/:id',controllers.user.feedMag)

router.post('/follow/:id', controllers.following.follow);
router.post('/unfollow/:id', controllers.following.unFollow);
router.get('/getfollowers/:id', controllers.following.getFollowers);
router.get('/getfollowing/:id', controllers.following.getFollowing);


module.exports = router