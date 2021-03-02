const router = require('express').Router();
const controllers = require('../controllers');

router.post('/', controllers.user.create);
router.get('/', controllers.user.show);
router.post('/login', controllers.user.login);
router.get('/logout', controllers.user.logout);
router.put('/', controllers.user.update);
router.delete('/', controllers.user.remove);

module.exports = router