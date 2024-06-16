import React, {useState} from 'react';
import axios from "axios";
import {requestURL} from "../config/config";

export default function Reservation(userNo){
    const [reservationSite, setReservationSite] = useState({
        campGroundSiteNo: 0,
        guestNo: userNo,
        enterDay: null,
        leaveDay: null,
        adult: 0,
        child: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    };


    return (
        <form onSubmit={handleSubmit}>
            <h3>예약</h3>
            <input type="text"
                   onChange={(e) => setReservationSite({...reservationSite, adult: e.target.value})}
                   placeholder="성인 수"/>
            <input type="text"
                   onChange={(e) => setReservationSite({...reservationSite, child: e.target.value})}
                   placeholder="어린이 수"/>
            <input type="date"
                   onChange={(e) => setReservationSite({...reservationSite, enterDay: e.target.value})}
                   placeholder="입실일"/>
            <input type="date"
                   onChange={(e) => setReservationSite({...reservationSite, leaveDay: e.target.value})}
                   placeholder="퇴실일"/>
            <button type="submit" onClick={() => {
                axios.post(requestURL + "/reservation/register",)
            }}>예약하기
            </button>
            <button type="button">예약 취소</button>
        </form>
    );
};
