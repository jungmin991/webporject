import React, {useState} from 'react';
import './css/myRegistCamp.css'
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import CampingItem from './CampingItem';

const CampingList = () => {
    const navigate = useNavigate();
    const userNo = useParams();

    const [data, setData] = useState([]);

    function campings() {
        axios.post('/campground/campGroundList', {userNo: userNo.id})
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }


    return (
        <div>
            <h2>내가 등록한 캠핑장</h2>
            <div className="camping-list">
                {campings()}
                {data.map((camping) => (
                    <CampingItem key={camping.campNo} camping={camping}/>
                ))}
            </div>
            <button className="add-button" onClick={() => {
                navigate('/RegistCampGround1/' + userNo.id)
            }}>캠핑장 추가
            </button>
        </div>
    );
};

export default CampingList;
