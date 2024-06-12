const router = require('express').Router();
const controller = require('../controllers/campGroundController.js');

router.post('/campground/register', controller.register);
router.post('/campground/getCampInfo', controller.getCampInfo);
router.post('/campground/campGroundList', controller.campGroundList);
router.post('/campground/mySiteList', controller.mySiteList);

module.exports = router;

