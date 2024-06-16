const conn = require('../db');

const Reservation = {
    register: (req, res) => {
        console.log(req.body);
        const {campGroundSiteNo, enterDay, leaveDay, guestNo, adult, child} = req.body;
        const query =
            'insert reservation (campGroundSiteNo, enterDay, leaveDay, guestNo, adult, child, state)' +
            ' values (?, ?, ?, ?, ?, ?, \'WAIT\')';
        conn.query(query, [campGroundSiteNo, enterDay, leaveDay, guestNo, adult, child], (err, result) => {
            res.send(true);
        })
    },

    // 예약 정보 수정
    modify: (req, res) => {
        console.log(req.body)
        conn.query('UPDATE reservation SET state= \''+ req.body.state +'\' WHERE reservationNo LIKE ' + req.body.reservationNo, (err, result) => {
            if (err) {
                console.log(err);
            } else {
            }
            res.send(true);
        })
    },

    list: (req, res) => {
        const query = 'select reservationNo, enterDay, leaveDay, adult, child, state from campground join campgroundsite on campground.campGroundNo = campgroundsite.campGroundNo join reservation on campgroundsite.campGroundSiteNo = reservation.campGroundSiteNo where userNo like ' + req.body.hostNo;
        conn.query(query, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
    }


}

module.exports = Reservation;