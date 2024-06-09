const router = require('express').Router();
const controller = require('../controllers/loginController.js');

router.post('/api/login', controller.login);

module.exports = router;