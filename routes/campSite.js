const router = require('express').Router();
const controller = require('../controllers/campSiteController.js');

router.post('/campsite/register', controller.register);
router.post('/campsite/siteList',controller.siteList);

module.exports = router;