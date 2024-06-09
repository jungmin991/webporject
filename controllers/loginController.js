const con = require('../db');
const user = require('../models/User');

exports.login = (req, res) => {
    const id = req.body.id;
    const pswd = req.body.password;

    console.log(id, pswd);

    user.get(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving user data.'
            });
        } else {
            if (data[0].pw === pswd) {
                res.send(data[0]);
            } else {
                res.status(400).send({
                    message: 'Incorrect password'
                });
            }
        }
    });
}