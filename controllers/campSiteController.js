const site = require('../models/CampGroundSite')

exports.register = (req, res) => {
    site.register(req, res);
}

exports.siteList = (req, res) => {
    site.siteList(req, res);
}