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
        <table>
            {reservationLists.filter(reservation => reservation.state !== 'END' && reservation.state !== 'CANCEL').map((reservation, index) => (
                <tr>
                    <td>{reservation.siteName}</td>
                    <td>{reservation.enterDay.substring(0, 10)}</td>
                    <td>{reservation.leaveDay.substring(0, 10)}</td>
                    <td>{reservation.adult}</td>
                    <td>{reservation.child} </td>
                    <td>{reservation.state}</td>
                    <td>
                        {reservation.state === 'WAIT' ? <td>
                            <button onClick={() => setFixed(reservation.reservationNo)}>확정</button>
                            <button onClick={() => setCancel(reservation.reservationNo)}>취소</button>
                        </td> : <td></td>}
                    </td>
                </tr>
            ))}
        </table>
    </div>

}