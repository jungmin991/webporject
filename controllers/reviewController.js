const review = require('../models/Review');

exports.register = (req, res) => {
    review.register(req, res);
}

exports.show = (req, res) => {
    review.show(req, res);
}