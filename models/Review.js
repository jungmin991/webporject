const conn = require('../db');

const Review = {
    // 리뷰 등록
    register: (req, res) => {
        const {campGroundNo, reviewImage, review} = req.body;
        console.log(req.body);
        const query = 'insert review (campGroundNo, reviewImage, review)' +
            'values (?, ?, ?)'
        conn.query(query, [campGroundNo, reviewImage, review], ((err, result) => {
            res.send(true);
        }))
    },

    // 리뷰 조회(캠핑장별)
    show: (req, res) => {
        const {campGroundNo} = req.body;
        const query = 'select * from review where campGroundNo = ?'
        conn.query(query, [campGroundNo], (err, result) => {
            res.send(result);
        })
    },
}

module.exports = Review;