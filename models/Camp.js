const conn = require('../db');

const Camp = {

    // 캠핑장 사이트 정보 등록
    register: (req, res) => {
        const {
            userNo,
            facilitiesInfoNo,
            mannerStartTime,
            mannerEndTime,
            campGroundImages,
            name,
            location,
            type,
            callNum,
            campingInfo,
            enterTime,
            leaveTime
        } = req.body;
        conn.query(
            `
                INSERT INTO campground (userNo, facilitiesInfoNo, mannerStartTime, mannerEndTime, campGroundImages,
                                        name, location, type, callNum, campingInfo, enterTime, leaveTime)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                userNo,
                facilitiesInfoNo,
                mannerStartTime,
                mannerEndTime,
                campGroundImages,
                name,
                location,
                type,
                callNum,
                campingInfo,
                enterTime,
                leaveTime
            ], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send(true)
                }
            })
    },

    // 캠핑장 사이트 정보 조회
    getCampInfo: (req, res) => {
        conn.query("SELECT * FROM campground JOIN campgroundsite ON campground.campgroundNo = campgroundsite.campgroundNo WHERE userNo Like " + req.body.userNo, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
    },
    getTest: (req, res) => {
        conn.query("SELECT * FROM campground WHERE name LIKE %?% AND type LIKE ? AND location LIKE ?", [req.body.name, req.body.type, req.body.local], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
    },

    // campgroundNo를 통해 캠핑장 정보와 캠핑장 세부 정보를 조회
    campGroundListByNo: (req, res) => {
        conn.query("SELECT campground.*, facilities.* ,facilitiesInfo.*, play.*, surround.* FROM campground LEFT JOIN facilitiesInfo ON campground.facilitiesInfoNo = facilitiesInfo.facilitiesInfoNo LEFT JOIN play ON facilitiesInfo.playNo = play.playNo LEFT JOIN surround ON facilitiesInfo.surroundNo = surround.surroundNo LEFT JOIN facilities ON facilitiesInfo.facilitiesNo = facilities.facilitiesNo WHERE campground.campgroundNo = ?", [req.body.id], (err, result) => {
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

    // 게스트가 자신의 캠핑장 정보 조회 → 리뷰 작성
    mySiteList: (req, res) => {
        const query =
            'select reservationNo, name, siteName, state, campground.campGroundNo ' +
            'from campground ' +
            'join campgroundsite on campground.campgroundNo = campgroundsite.campgroundNo ' +
            'join reservation on campgroundsite.campGroundSiteNo = reservation.campGroundSiteNo ' +
            'where guestNo like ' + req.body.guestNo;
        conn.query(query, (err, result) => {
            res.send(result);
        })
    },

    insertFacilities: (req, res) => {
        const facilitiesQuery = new Promise((resolve, reject) => {
            conn.query(
                'INSERT INTO facilities (mart, toilet) VALUES (?, ?)',
                [req.body.facilities.mart, req.body.facilities.toilet],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });

        const playQuery = new Promise((resolve, reject) => {
            conn.query(
                'INSERT INTO play (playGround, singingRoom) VALUES (?, ?)',
                [req.body.play.playGround, req.body.play.singingRoom],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });

        const surroundQuery = new Promise((resolve, reject) => {
            conn.query(
                'INSERT INTO surround (mountain, river) VALUES (?, ?)',
                [req.body.surround.mountain, req.body.surround.river],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });

        Promise.all([facilitiesQuery, playQuery, surroundQuery])
            .then(() => res.send('Facilities inserted successfully'))
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error inserting facilities');
            });
    },

    maxFacilities: (req, res) => {
        const maxFacilities = {
            facilities: -1,
            play: -1,
            surround: -1
        };

        const facilitiesQuery = new Promise((resolve, reject) => {
            conn.query('SELECT MAX(facilitiesNo) AS facilitiesNo FROM facilities', (err, result) => {
                if (err) reject(err);
                else {
                    maxFacilities.facilities = result[0].facilitiesNo;
                    resolve();
                }
            });
        });

        const playQuery = new Promise((resolve, reject) => {
            conn.query('SELECT MAX(playNo) AS playNo FROM play', (err, result) => {
                if (err) reject(err);
                else {
                    maxFacilities.play = result[0].playNo;
                    resolve();
                }
            });
        });

        const surroundQuery = new Promise((resolve, reject) => {
            conn.query('SELECT MAX(surroundNo) AS surroundNo FROM surround', (err, result) => {
                if (err) reject(err);
                else {
                    maxFacilities.surround = result[0].surroundNo;
                    resolve();
                }
            });
        });

        Promise.all([facilitiesQuery, playQuery, surroundQuery])
            .then(() => {
                res.send(maxFacilities);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error fetching max facilities');
            });
    },

    registerFacilitiesInfo: (req, res) => {
        const {facilities, play, surround} = req.body;

        const promise = new Promise((resolve) => {
            conn.query(
                'INSERT INTO facilitiesinfo (facilitiesNo, playNo, surroundNo) VALUES (?, ?, ?)',
                [facilities, play, surround],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(true);
                    }
                }
            );
        })
        Promise.all([promise]).then(() => {
            console.log("dd");
        });

    },

    getMaxFacilitiesInfo: (req, res) => {
        const query = 'SELECT MAX(facilitiesInfoNo) AS maxFacilitiesInfo FROM facilitiesinfo';
        conn.query(query, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                const maxFacilitiesInfo = result[0].maxFacilitiesInfo;
                console.log('Max facilities info:', maxFacilitiesInfo);
                res.status(200).json({maxFacilitiesInfo}); // Send maxFacilitiesInfo as JSON response
            }
        });
    },

    // 예약이 되지 않은 캠핑장 사이트 조회
    getAvailableSites: (req, res) => {
        /*const query = "select campground.campGroundNo, campgroundsite.* from campground join campgroundsite on campground.campGroundNo = campgroundsite.campGroundNo left join reservation on campground.campGroundNo = reservation.campGroundNo and campgroundsite.campGroundSiteNo = reservation.campGroundSiteNo where campgroundsite.campGroundSiteNo not in (select campGroundSiteNo from reservation where reservation.state != 'CANCEL' and (enterDay < ? and leaveDay > ?)) and campground.campgroundNo = ?;";
        conn.query(query, [req.body.checkIn, req.body.checkOut, req.body.groundNo.id], (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
                res.send(result);
            }
        });
        */

        console.log(req.body.groundNo.id);
        const query = "select reservation.state, campground.campGroundNo, reservation.enterDay, reservation.leaveDay, campGroundSite.* from campground join campgroundsite on campground.campGroundNo = campgroundsite.campGroundNo left join reservation on campground.campGroundNo = reservation.campGroundNo and campgroundsite.campGroundSiteNo = reservation.campGroundSiteNo where campgroundsite.campGroundSiteNo not in (select campGroundSiteNo from reservation where reservation.state = 'FIXED') and campground.campgroundNo = ?;";
        const campGroundNo = req.body.groundNo.id;
        console.log(campGroundNo);
        conn.query(query, [campGroundNo], (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log("dfdfdfdf       "+ JSON.stringify(result));
                res.send(JSON.stringify(result));
            }
        });
    },

    updateCamp: (req, res) => {
        conn.query("UPDATE campground\n" +
            "SET\n" +
            "    userNo = ?,\n" +
            "    mannerStartTime = ?,\n" +
            "    mannerEndTime = ?,\n" +
            "    name = ?,\n" +
            "    location = ?,\n" +
            "    type = ?,\n" +
            "    callNum = ?,\n" +
            "    campingInfo = ?,\n" +
            "    enterTime = ?,\n" +
            "    leaveTime = ?\n" +
            "WHERE campGroundNo = ?;", [req.body.userNo, req.body.mannerStartTime, req.body.mannerEndTime, req.body.name, req.body.location, req.body.type, req.body.callNum, req.body.campingInfo , req.body.enterTime, req.body.leaveTime, req.body.campGroundNo], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
    },
    updateFacilities: (req, res) => {
        conn.query("UPDATE facilities\n" +
            "SET\n" +
            "   mart = ?,\n" +
            "   toillet = ?\n" +
            "WHERE facilitiesNo = ?;", [req.body.mart, req.body.toillet, req.body.facilitiesNo], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
    },
    updatePlay: (req, res) => {
        conn.query("UPDATE play\n" +
            "SET \n" +
            "   playGround = ?,\n" +
            "   singingRoom = ?\n" +
            "WHERE playNo = ?;", [req.body.playGround, req.body.singingRoom, req.body.playNo], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
    },
    updateSurround: (req, res) => {
        conn.query("UPDATE surround\n" +
            "SET\n" +
            "   river = ?,\n" +
            "   mountain = ?\n" +
            "WHERE surroundNo = ?;", [req.body.river, req.body.mountain, req.body.surroundNo], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
    },
}



module.exports = Camp;