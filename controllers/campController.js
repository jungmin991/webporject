const camp = require('../models/Camp');

exports.register = (req, res) => {
    camp.register(req, res);
}

exports.getCampInfo = (req, res) => {
    camp.getCampInfo(req, res);
}

exports.mySiteList = (req, res) => {
    camp.mySiteList(req, res);
}

