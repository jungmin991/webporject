const conn = require('../db');

const Review = {
    // 리뷰 등록
    register: (req, res) => {
        const {campGroundNo, reviewImage, review} = req.body.postReview;

    const query = 'insert review (campGroundNo, reviewImage, review)' +
        'values (?, ?, ?)'
    conn.query(query,[campGroundNo, reviewImage,review],((err,result)=>{
        res.send(true);
    }))
    },
}

module.exports = Review;