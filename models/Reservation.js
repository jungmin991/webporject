const conn = require('../db');

const Reservation = {
    register: (req, res) => {
        const {campGroundSiteNo, enterDay, leaveDay, guestNo, peopleNum} = req.body.reservationSite;
    const query =
        'insert reservation (campGroundSiteNo, enterDay, leaveDay, guestNo, peopleNum, state)' +
        ' values (?, ?, ?, ?, ?, \'WAIT\')';
    conn.query(query, [campGroundSiteNo, enterDay, leaveDay, guestNo, peopleNum], (err, result) => {
        res.send(true);
    })
    },

    // 예약 정보 수정
    modify: (req, res) => {
        conn.query('UPDATE reservation SET state=\'IMPOSS\' WHERE reservationNo LIKE '+req.body.reservationNo,(err, result) => {
            if (err) {
                console.log(err);
            }else{}
            res.send(true);
        })
    }


}

module.exports = Reservation;