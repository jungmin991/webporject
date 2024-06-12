const router = require('express').Router();
const controller = require('../controllers/campGroundController.js');

router.post('/api/register', controller.register);
router.post('/api/getCampInfo', controller.getCampInfo);
router.post('/api/campGroundList', controller.campGroundList);
router.post('/api/mySiteList', controller.mySiteList);

module.exports = router;

