
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

    siteList: (req, res) => {
        console.log(req.body.userNo);
        //받아올 row 설정
        conn.query("SELECT * FROM campground JOIN campgroundsite ON campground.campgroundNo = campgroundsite.campgroundNo WHERE userNo Like " + req.body.userNo, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result[0])
                res.send(result)
            }
        })
    }

}

module.exports = CampGroundSite;