const router = require('express').Router();
const controller = require('../controllers/campController.js');

router.post('/campground/register', controller.register);
router.post('/campground/getCampInfo', controller.getCampInfo);
router.post('/campground/campGroundList', controller.campGroundList);
router.post('/campground/mySiteList', controller.mySiteList);
router.post('/campground/insertFacilities', controller.insertFacilities);
router.post('/campground/maxFacilities', controller.maxFacilities);
router.post('/campground/registerFacilitiesInfo', controller.registerFacilitiesInfo);
router.post('/campground/getMaxFacilitiesInfo', controller.getMaxFacilitiesInfo);

router.post('/campground/getTest', controller.getTest);

module.exports = router;

