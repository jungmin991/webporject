import axios from "axios";
import {useEffect, useState} from "react";
import {requestURL} from "../../config/config";
import {useParams} from "react-router-dom";

export default function ReservationList() {
    const userNo = useParams();
    const [reservationLists, setReservationLists] = useState([]);

    function reservationList(userNo) {
        console.log(userNo.hostNo);
        axios.post(requestURL + "/reservation/list", {hostNo: userNo.hostNo}).then((res) => {
            setReservationLists(res.data);
        })
    }

    function setFixed(reservationNo) {
        const data = {
            state: 'FIXED',
            reservationNo: reservationNo
        }
        axios.post(requestURL + "/reservation/modify", data).then((res) => {
            reservationList(userNo);
        })
    }

    function setCancel(reservationNo) {
        const data = {
            state: 'CANCEL',
            reservationNo: reservationNo
        }
        axios.post(requestURL + "/reservation/modify", data).then((res) => {
            reservationList(userNo);
        })
    }

    useEffect(() => {
        reservationList(userNo);
    }, []);

    return <div>
        {reservationLists.filter(reservation => reservation.state !== 'END' && reservation.state !== 'CANCEL').map((reservation, index) => (
            <div>
                <span key={index}>{reservation.enterDay.substring(0, 10)} | </span>
                <span>{reservation.leaveDay.substring(0, 10)} | </span>
                <span>{reservation.peopleNum} | </span>
                <span>{reservation.state}</span>
                <button onClick={() => setFixed(reservation.reservationNo)}>확정</button>
                <button onClick={() => setCancel(reservation.reservationNo)}>취소</button>
            </div>
        ))}
    </div>

}