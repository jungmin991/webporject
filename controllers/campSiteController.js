const site = require('../models/CampGroundSite')

exports.register = (req, res) => {
    site.register(req, res);
}