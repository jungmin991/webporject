const config = require('../config/db.js');
const mysql = require('mysql2');

//연결 설정 세팅
const con = mysql.createConnection(config);

con.connect((err) => {
    if (err) {
        throw err;
    }
})

module.exports = con;