const router = require('express').Router();
const controller = require('../controllers/campGroundController.js');

router.post('/api/register', controller.register);
router.post('/api/getCampInfo', controller.getCampInfo);

module.exports = router;

