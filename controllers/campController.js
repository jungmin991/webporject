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

exports.campGroundList = (req, res) => {
    camp.campGroundList(req, res);
}

exports.getTest = (req, res) => {
    camp.getTest(req, res);
}
exports.insertFacilities = (req, res) => {
    camp.insertFacilities(req, res);
}

exports.maxFacilities = (req, res) => {
    camp.maxFacilities(req, res);
}

exports.registerFacilitiesInfo = (req, res) => {
    camp.registerFacilitiesInfo(req, res);
}

exports.getMaxFacilitiesInfo = (req, res) => {
    camp.getMaxFacilitiesInfo(req, res);
}

exports.campGroundListByNo = (req, res) => {
    camp.campGroundListByNo(req, res);
}

exports.getAvailableSites = (req, res) => {
    camp.getAvailableSites(req, res);
}

exports.updateCamp = (req, res) => {
    camp.updateCamp(req, res);
}

exports.updateFacilities = (req, res) => {
    camp.updateFacilities(req, res);
}

exports.updatePlay = (req, res) => {
    camp.updatePlay(req, res);
}

exports.updateSurround = (req, res) => {
    camp.updateSurround(req, res);
}