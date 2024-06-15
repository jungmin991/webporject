const router = require('express').Router();
const controller = require('../controllers/reservationController.js');

router.post('/reservation/register', controller.register);
router.post('/reservation/modify', controller.modify);
router.post('/reservation/list',controller.list);


module.exports = router;