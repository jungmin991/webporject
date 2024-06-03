const router = require('express').Router();
const controller = require('../controllers/loginController.js');

router.get('/api/login', controller.login);

module.exports = router;