const router = require('express').Router();
const controller = require('../controllers/campSiteController.js');

router.post('/api/register', controller.register);


module.exports = router;