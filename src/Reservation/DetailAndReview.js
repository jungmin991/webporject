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
    const [siteData, setSiteData] = useState([]);

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
            <form className="DARform" onSubmit={onsubmit}>
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

            {siteData.map((site) => (
                <div>
                    <div className="site-img">
                        <img src = {site.campGroundImages} alt="사이트 이미지"/>
                    </div>
                    <p>사이트 번호: {site.siteNo}</p>
                    <p>사이트 이름: {site.siteName}</p>
                    <p>인원수: {site.peopleNum}</p>
                    <p>사이트 가격: {site.price}</p>
                </div>
            ))
            }

            <h2>캠핑장 상세정보 및 리뷰</h2>
            <div className="camping-list">
                <div className="camping-item">
                    <div className="camping-image">
                        <img src = {campData.campGroundImage} alt="캠핑장 이미지"/>
                    </div>
                    <div className="camping-info">
                        <div className="campingItem">
                            <h3>캠핑장 이름</h3>
                            <h3>{campData.name}</h3>
                        </div>

                        <div className="campingItem">
                            <p>캠핑장 설명</p>
                            <p>{campData.campInfo}</p>
                        </div>

                        <div className="campingItem">
                            <p>캠핑장 위치</p>
                            <p>{campData.location}</p>
                        </div>

                        <div className="campingItem">
                            <p>캠핑장 유형</p>
                            <p>{campData.type}</p>
                        </div>

                        <div className="campingItem">
                            <p>입실 시간, 퇴실 시간</p>
                            <p>{campData.enterTime} ~ {campData.leaveTime}</p>
                        </div>

                        <div className="campingItem">
                            <p>매너타임</p>
                            <p>{campData.mannerStartTime}~{campData.mannerEndTime}</p>
                        </div>

                        <div className="campingItem">
                            <p>캠핑장 전화번호</p>
                            <p>{campData.callNum}</p>
                        </div>

                        <div className="amenity">
                            <div className="amenityItem">
                                <p>편의시설</p>
                                <p>{campData.mart = 1 ? '마트 ' : ''} {campData.toilet = 1 ? '화장실' : ''}</p>
                            </div>

                            <div className="amenityItem">
                                <p>놀이시설</p>
                                <p>{campData.playGround = 1 ? '놀이터 ' : ''} {campData.singingRoom = 1 ? '노래방' : ''}</p>
                            </div>

                            <div className="amenityItem">
                                <p>주변 환경</p>
                                <p>{campData.mountain = 1 ? '산 ' : ''} {campData.river = 1 ? '강' : ''}</p>
                            </div>
                        </div>
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