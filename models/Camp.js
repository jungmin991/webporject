const conn = require('../db');

const Camp = {

    // 캠핑장 등록
    register: (req, res) => {
        const {userNo, campingType, campingName, address, contact, description, checkInTime, checkOutTime, mainImage, mannerTimeStart, mannerTimeEnd, facilities, activities, environment, localType} = req.body;
        conn.query(
            `
                INSERT INTO campground (userNo, type, name, location, callNum, campingInfo, enterTime, leaveTime, campGroundImages, mannerStartTime, mannerEndTime, facilities, activities, environment, localType)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                `,
            [
                userNo, campingType, campingName, address, contact, description, checkInTime, checkOutTime, mainImage, mannerTimeStart, mannerTimeEnd, facilities, activities, environment, localType
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

    // 캠핑장 리스트 조회 (UserNo로 조회)
    campGroundList: (req, res) => {
        conn.query("SELECT * FROM campground WHERE userNo = ?", [req.body.userNo], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
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