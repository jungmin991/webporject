const con = require('../db');

const User = {
    // 유저 생성
    create: (user, result) => {
        con.query('INSERT INTO user SET ?', user, (err, res) => {
            if (err) {
                console.log('Error while inserting data');
                result(err, null);
            } else {
                console.log('User created successfully');
                result(null, res);
            }
        });
    },
    // 유저 조회
    get: (userId, result) => {
        con.query('SELECT * FROM user WHERE id = ?', userId, (err, res) => {
            if (err) {
                console.log('Error while fetching data');
                result(err, null);
            } else {
                console.log('User fetched successfully');
                result(null, res);
            }
        });
    },
    // 유저 업데이트
    update: (userId, user, result) => {
        con.query('UPDATE user SET ? WHERE id = ?', [user, userId], (err, res) => {
            if (err) {
                console.log('Error while updating data');
                result(err, null);
            } else {
                console.log('User updated successfully');
                result(null, res);
            }
        });
    },
    // 유저 삭제
    delete: (userId, result) => {
        con.query('DELETE FROM user WHERE id = ?', userId, (err, res) => {
            if (err) {
                console.log('Error while deleting data');
                result(err, null);
            } else {
                console.log('User deleted successfully');
                result(null, res);
            }
        });
    }
};

module.exports = User;