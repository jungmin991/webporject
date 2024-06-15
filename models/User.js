const conn = require('../db');

const User = {
    // 회원가입
    signin: (req, res) => {
        conn.query(`INSERT INTO login (id, pw, userType)
                VALUES (?, ?, ?)`, [req.body.id, req.body.pw, req.body.userType], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(true);
            }

        })
    },

    //로그인
    login: (req, res) => {
        conn.query(`SELECT * FROM login WHERE id = ? AND pw = ?`, [req.body.id, req.body.pw], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result);
            }
        })
    }
    
};

module.exports = User;