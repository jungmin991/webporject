const router = require('express').Router();
const controller = require('../controllers/reservationController.js');

router.post('/reservation/register', controller.register);
router.post('/reservation/modify', controller.modify);


module.exports = router;