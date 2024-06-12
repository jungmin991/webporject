const router = require('express').Router();
const controller = require('../controllers/reservationController.js');

router.post('/api/register', controller.register);
router.post('/api/modify', controller.modify);


module.exports = router;