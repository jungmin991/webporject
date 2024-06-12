const con = require('../db');

const Camp = {
    // 캠핑장 등록
    register: (req, res) => {
        conn.query(
            `
                INSERT INTO campground (userNo, facilitiesInfoNo, mannerStartTime, mannerEndTime, campGroundImages, name,
                                        location, type, callNum, campingInfo, enterTime, leaveTime)
                SELECT ?,
                       MAX(facilitiesInfoNo),
                       ?,
                       ?,
                       ?,
                       ?,
                       ?,
                       ?,
                       ?,
                       ?,
                       ?,
                       ?
                FROM facilitiesinfo;
            `,
            [
                req.body.userNo, req.body.mannerStartTime, req.body.mannerEndTime, req.body.campGroundImages, req.body.name, req.body.location, req.body.type, req.body.callNum, req.body.campingInfo, req.body.enterTime, req.body.leaveTime
            ], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send(true)
                }
            })
    },

    // 캠핑장 정보 조회
    getCampInfo: (req, res) => {
        conn.query("SELECT * FROM campground JOIN campgroundsite ON campground.campgroundNo = campgroundsite.campgroundNo WHERE userNo Like " + req.body.userNo, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send(result)
                }
            })
    },
}

module.exports = Camp;