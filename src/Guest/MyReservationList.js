import axios from "axios";
import {requestURL} from "../config/config";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function MyReservationList() {
    const guestNo = useParams()
    const [myReservationList, setMyReservationList] = useState([])
    const navigate = useNavigate();

    function getReservationList() {
        axios.post(requestURL + '/campground/mySiteList', guestNo).then((response) => {
            setMyReservationList(response.data);
            console.log(response.data);
        })
    }

    function review(campGroundNo) {
        navigate('/Review/' + guestNo.guestNo + "/" + campGroundNo);
    }

    useEffect(() => {
        getReservationList();
    }, []);

    return <div>
        {myReservationList.map((reservation, index) => (
            <div>
                <span> {reservation.name}</span>
                <span> {reservation.siteName}</span>
                <span> {reservation.state}
                    {reservation.state === 'FIXED' ?
                        <button onClick={() => review(reservation.campGroundNo)}>review</button> : null}
                </span>
            </div>
        ))}
    </div>
}