    const conn = require('../db');

const CampGroundSite = {
    // 캠핑장 사이트 등록
    register: (req, res) => {
        conn.query("INSERT INTO campgroundsite (siteNo, campGroundNo, campGroundImages, price, peopleNum, siteName) VALUES (?,?,?,?,?,?)",
        [req.body.siteNo, req.body.campGroundNo, req.body.campGroundImages, req.body.price, req.body.peopleNum, req.body.siteName],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(true);
            }
        })
    },

}

module.exports = CampGroundSite;