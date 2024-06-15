import axios from "axios";
import {useEffect, useState} from "react";
import {requestURL} from "../../config/config";
import {useParams} from "react-router-dom";

export default function ReservationList() {
    const userNo = useParams();
    const [reservationLists, setReservationLists] = useState([]);
    const [reservationState, setReservationState] = useState({
        state: '',
        reservationNo: 0
    })

    function reservationList(userNo) {
        console.log(userNo.hostNo);
        axios.post(requestURL + "/reservation/list", {hostNo: userNo.hostNo}).then((res) => {
            setReservationLists(res.data);
        })
    }

    function setFixed(reservationNo) {
        setReservationState({state: 'FIXED', reservationNo: reservationNo})
        axios.post(requestURL + "/reservation/modify", reservationState).then((res) => {

        })
    }

    function setCancel(reservationNo) {
        setReservationState({state: 'CANCEL', reservationNo: reservationNo})
        axios.post(requestURL + "/reservation/modify", reservationState).then((res) => {

        })
    }

    useEffect(() => {
        reservationList(userNo);
    }, []);

    return <div>
        {reservationLists.map((reservation, index) => (
            <div>
                <span key={index}>{reservation.enterDay.substring(0, 10)} | </span>
                <span>{reservation.leaveDay.substring(0, 10)} | </span>
                <span>{reservation.peopleNum} | </span>

                <span> {reservationState.state === "" ? reservation.state : reservationState.state}< /span>
                <button onClick={() => setFixed(reservation.reservationNo)}>확정</button>
                <button onClick={() => setCancel(reservation.reservationNo)}>취소</button>
            </div>
        ))}
    </div>
}