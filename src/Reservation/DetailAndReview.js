import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestURL } from "../config/config";
import axios from "axios";
import './css/DetailAndReview.css'

export default function DetailAndReview() {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [campData, setCampData] = useState({});
    const [reviewData, setReviewData] = useState({});

    const groundNo = useParams();

    function getReviewData() {
        axios.post(requestURL + '/review/show', groundNo)
            .then((response) => {
                setReviewData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    function getCampData() {
        axios.post(requestURL + '/campground/campGroundListByNo', groundNo)
            .then((response) => {
                console.log(response.data);
                setCampData(response.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        getCampData();
        getReviewData();
        console.log(campData);
        console.log(reviewData);
    }, []);


    const onsubmit = (e) => {
        e.preventDefault();
        try {
            const searchData = {checkIn: checkIn, checkOut: checkOut, groundNo: groundNo};
            axios.post(requestURL + '/campground/getAvailableSites', searchData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
    }


    return (
        <div>
            <form onSubmit={onsubmit}>
                <div className="form-group">
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        placeholder="입실일"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        placeholder="퇴실일"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn">검색</button>
                </div>
            </form>

            <h2>캠핑장 상세정보 및 리뷰</h2>
            <div className="camping-list">
                <div className="camping-item">
                    <div className="camping-image">
                        <img src = {campData.campGroundImage} alt="캠핑장 이미지"/>
                    </div>
                    <div className="camping-info">
                        <h3>캠핑장 이름</h3>
                        <h3>{campData.name}</h3>
                        <p>캠핑장 설명</p>
                        <p>{campData.campInfo}</p>
                        <p>캠핑장 위치</p>
                        <p>{campData.location}</p>
                        <p>캠핑장 유형</p>
                        <p>{campData.type}</p>
                        <p>입실 시간, 퇴실 시간</p>
                        <p>{campData.enterTime} ~ {campData.leaveTime}</p>
                        <p>매너타임</p>
                        <p>{campData.mannerStartTime}~{campData.mannerEndTime}</p>
                        <p>캠핑장 전화번호</p>
                        <p>{campData.callNum}</p>
                        <p>편의시설</p>
                        <p>{campData.mart = 1 ? '마트 ' : ''} {campData.toilet = 1 ? '화장실' : ''}</p> 
                        <p>놀이시설</p>
                        <p>{campData.playGround = 1 ? '놀이터 ' : ''} {campData.singingRoom = 1 ? '노래방' : ''}</p>
                        <p>주변 환경</p>
                        <p>{campData.mountain = 1 ? '산 ' : ''} {campData.river = 1 ? '강' : ''}</p>

                    </div>
                </div>
                <div className="camping-review">
                    <h3>리뷰</h3>
                    <div className="review-item">
                        <div className="review-img">
                            <p>리뷰사진</p>
                        </div>
                        <div className="review-content">
                            <p>리뷰 내용</p>
                            <p>{reviewData.review}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}