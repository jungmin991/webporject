const review = require('../models/Review');

exports.register = (req, res) => {
    review.register(req, res);
}

