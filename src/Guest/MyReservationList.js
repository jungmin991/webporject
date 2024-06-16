import axios from "axios";
import {requestURL} from "../config/config";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './css/MyReservationList.css'

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

    return <div className="baseReser">
        <button onClick={() => {
            navigate('/SearchCampGround/'+guestNo.guestNo);
        }}>검색</button>
        {myReservationList.map((reservation, index) => (
            <div className="baseReser2">
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