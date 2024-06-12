const reservation = require('../models/Reservation');

exports.register = (req, res) => {
    reservation.register(req, res);
}

exports.modify = (req, res) => {
    reservation.modify(req, res);
}