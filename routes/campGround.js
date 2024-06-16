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
router.post('/campground/campGroundListByNo', controller.campGroundListByNo);
router.post('/campground/getAvailableSites', controller.getAvailableSites);

router.post('/campground/getTest', controller.getTest);

router.post('/campground/updateCamp', controller.updateCamp);
router.post('/campground/updateFacilities', controller.updateFacilities);
router.post('/campground/updatePlay', controller.updatePlay);
router.post('/campground/updateSurround', controller.updateSurround);

module.exports = router;

