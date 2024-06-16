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
        const {groundNo} = req.body;
        const campGroundNo = groundNo; // Properly access the campGroundNo
        console.log("campGroundNo : " + campGroundNo);
        const query = 'SELECT * FROM review WHERE campGroundNo = ?';
        conn.query(query, [campGroundNo], (err, result) => {
            if (err) {
                console.error("Error fetching reviews: ", err);
                return res.status(500).send('Error fetching reviews');
            }
            console.log("리뷰 조회: ", result);
            res.send(result);
        });
    },

}

module.exports = Review;