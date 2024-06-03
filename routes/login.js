const router = require('express').Router();
const controller = require('../controllers/loginController');

router.get('/api/login', controller.login);

module.exports = router;