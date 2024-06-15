import axios from "axios";
import {useState} from "react";
import {requestURL} from "../../config/config";
import {useParams} from "react-router-dom";

export default function ReservationList() {
    const userNo = useParams();
    const [reservationLists, setReservationLists] = useState([]);

    function reservationList(userNo) {
        console.log(userNo.hostNo);
        axios.post(requestURL + "/reservation/list", {hostNo : userNo.hostNo}).then((res) => {
            setReservationLists(res.data);
            console.log(res.data);
        })
    }

    return <div>
        <button onClick={() => reservationList(userNo)}>test</button>
        {reservationLists.map((reservation) => (
            console.log(reservationLists),
            <div>{reservation.reservationNo}</div>
        ))}
    </div>

}