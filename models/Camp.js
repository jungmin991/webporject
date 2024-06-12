const conn = require('../db');

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

    // 캠핑장 리스트 조회
    campGroundList: (req, res) => {
        conn.query('select * from campground join facilitiesinfo on campground.facilitiesinfoNo = facilitiesInfo.facilitiesInfoNo left join review on campground.campGroundNo = review.campGroundNo join play on facilitiesinfo.playNo = play.playNo join surround on facilitiesinfo.surroundNo = surround.surroundNo  join facilities on facilitiesinfo.facilitiesNo = facilities.facilitiesNo where campground.campGroundNo like ' + req.body.campGroundNo, (err, result) => {
            console.log(result);
            res.send(result);
        })
    },

    // 자신의 캠핑장 정보 조회
    mySiteList: (req, res) => {
        const query =
        'select name, siteName, state, campground.campGroundNo ' +
        'from campground ' +
        'join campgroundsite on campground.campgroundNo = campgroundsite.campgroundNo ' +
        'join reservation on campgroundsite.campGroundSiteNo = reservation.campGroundSiteNo ' +
        'where guestNo like ' + req.body.userNo;
        conn.query(query, (err, result) => {
            res.send(result);
        })
    }
}

module.exports = Camp;