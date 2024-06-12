const router = require('express').Router();
const controller = require('../controllers/reviewController.js');

router.post('/review/register', controller.register);

module.exports = router;