import axios from "axios";
import {requestURL} from "../config/config";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './css/MyReservationList.css'

export default function MyReservationList({userNo, setUserNo}) {
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
            setUserNo(guestNo.guestNo);
            navigate('/SearchCampGround/' + guestNo.guestNo);
        }}>검색
        </button>
        {myReservationList.map((reservation, index) => (
            <div className="baseReser2">
                <span> {reservation.name}</span>
                <span> {reservation.siteName}</span>
                <span> {reservation.state}
                    {reservation.state === 'END' ?
                        <button
                            onClick={() => review(reservation.campGroundNo)}>review</button> : reservation.state === 'WAIT' ?
                            <button onClick={() => {
                                const data = {
                                    state: 'CANCEL',
                                    reservationNo: reservation.reservationNo
                                }
                                console.log(reservation);
                                axios.post(requestURL + "/reservation/modify", data).then((res) => {
                                        setMyReservationList(myReservationList);
                                    }
                                )

                            }}>취소</button> : null}
                </span>
            </div>
        ))}
    </div>

}