const user = require('../models/User');

exports.login = (req, res) => {
    const id = req.body.id;
    const pswd = req.body.password;

    user.login(id, pswd, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send(true);
            } else {
                res.send(false);
            }
        }
    });

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