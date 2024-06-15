const conn = require('../db');

const Camp = {

    // 캠핑장 등록
    register: (req, res) => {
        const {
            userNo,
            campingType,
            campingName,
            address,
            contact,
            description,
            checkInTime,
            checkOutTime,
            mainImage,
            mannerTimeStart,
            mannerTimeEnd,
            facilities,
            activities,
            environment,
            localType
        } = req.body;
        conn.query(
            `
                INSERT INTO campground (userNo, type, name, location, callNum, campingInfo, enterTime, leaveTime,
                                        campGroundImages, mannerStartTime, mannerEndTime, facilities, activities,
                                        environment, localType)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                console.log(maxFacilities);
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
    }
}

module.exports = Camp;