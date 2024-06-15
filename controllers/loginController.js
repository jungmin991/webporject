const user = require('../models/User');

exports.login = (req, res) => {
    user.login(req, res);
}

exports.signin = (req, res) => {
    const id = req.body.id;
    const pswd = req.body.password;
    const userType = req.body.userType;

    user.signin(id, pswd, userType, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(true);
        }
    });
}