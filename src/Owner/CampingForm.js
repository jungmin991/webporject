import React, { useState } from 'react';
import axios from 'axios';
import './css/campRegister.css';

const CampingForm = ({ addCamping }) => {
    const [formData, setFormData] = useState({
        mannerStartTime: '',
        mannerEndTime: '',
        campgroundImages: [],
        name: '',
        location: '',
        type: '',
        callNum: '',
        campingInfo: '',
        enterTime: '',
        leaveTime: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => {
                const updatedArray = checked
                    ? [...prevData[name], value]
                    : prevData[name].filter((item) => item !== value);
                return { ...prevData, [name]: updatedArray };
            });
        } else if (type === 'file') {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            if (formData[key] instanceof Array) {
                formData[key].forEach((value) => {
                    data.append(`${key}[]`, value);
                });
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post('/campground/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            addCamping(response.data);
            setFormData({
                mannerStartTime: '',
                mannerEndTime: '',
                campgroundImages: [],
                name: '',
                location: '',
                type: '',
                callNum: '',
                campingInfo: '',
                enterTime: '',
                leaveTime: '',
            });
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="form-container">
            <h2>캠핑 정보 입력</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="type">캠핑 유형</label>
                    <select id="type" name="type" onChange={handleChange} value={formData.type}>
                        <option value="">선택하세요</option>
                        <option value="캠핑">캠핑</option>
                        <option value="글램핑">글램핑</option>
                        <option value="카라반">카라반</option>
                        <option value="펜션">펜션</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="name">캠핑장 이름</label>
                    <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} required />
                </div>
                <div className="form-group">
                    <label htmlFor="location">주소</label>
                    <input type="text" id="location" name="location" required />
                </div>
                <div className="form-group">
                    <label htmlFor="callNum">연락처</label>
                    <input type="tel" id="callNum" name="callNum" onChange={handleChange} value={formData.callNum} required />
                </div>
                <div className="form-group">
                    <label htmlFor="campingInfo">숙소 소개</label>
                    <textarea id="campingInfo" name="campingInfo" onChange={handleChange} value={formData.campingInfo} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="enterTime">입실 시간</label>
                    <input type="time" id="enterTime" name="enterTime" onChange={handleChange} value={formData.enterTime} />
                </div>
                <div className="form-group">
                    <label htmlFor="leaveTime">퇴실 시간</label>
                    <input type="time" id="leaveTime" name="leaveTime" onChange={handleChange} value={formData.leaveTime} />
                </div>
                <div className="form-group">
                    <label htmlFor="amenities">숙소 편의시설</label>
                    <textarea id="amenities" name="amenities" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="campgroundImages">대표사진</label>
                    <input type="file" id="campgroundImages" name="campgroundImages" accept="image/*" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="mannerStartTime">매너타임 시작</label>
                    <input type="time" id="mannerStartTime" name="mannerStartTime" onChange={handleChange} value={formData.mannerStartTime} required />
                </div>
                <div className="form-group">
                    <label htmlFor="mannerEndTime">매너타임 종료</label>
                    <input type="time" id="mannerEndTime" name="mannerEndTime" onChange={handleChange} value={formData.mannerEndTime} required />
                </div>
                <div className="form-group">
                    <label>부대시설</label>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="facilitiesInfoNo" value="공용 샤워실" />공용 샤워실</label>
                        <label><input type="checkbox" name="facilitiesInfoNo" value="공용 화장실" />공용 화장실</label>
                        <label><input type="checkbox" name="facilitiesInfoNo" value="개수대" />개수대</label>
                        <label><input type="checkbox" name="facilitiesInfoNo" value="공용주차장" />공용주차장</label>
                        <label><input type="checkbox" name="facilitiesInfoNo" value="편의점" />편의점</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="activities">놀거리</label>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="activities" value="낚시" />낚시</label>
                        <label><input type="checkbox" name="activities" value="하이킹" />하이킹</label>
                        <label><input type="checkbox" name="activities" value="수영" />수영</label>
                        <label><input type="checkbox" name="activities" value="보드게임" />보드게임</label>
                        <label><input type="checkbox" name="activities" value="자전거 타기" />자전거 타기</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="environment">주변환경</label>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="environment" value="산" />산</label>
                        <label><input type="checkbox" name="environment" value="계곡" />계곡</label>
                        <label><input type="checkbox" name="environment" value="등산로" />등산로</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="localType">지역</label>
                    <select id="localType" name="localType" onChange={handleChange} value={formData.location}>
                        <option value="경상도">경상도</option>
                        <option value="전라도">전라도</option>
                        <option value="경기도">경기도</option>
                        <option value="강원도">강원도</option>
                        <option value="충청도">충청도</option>
                        <option value="제주도">제주도</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">제출하기</button>
                <br />
                <button type="button" className="submit-button" onClick={() => setFormData({
                    mannerStartTime: '',
                    mannerEndTime: '',
                    campgroundImages: [],
                    name: '',
                    location: '',
                    type: '',
                    callNum: '',
                    campingInfo: '',
                    enterTime: '',
                    leaveTime: '',
                })}>취소</button>
            </form>
        </div>
    );
};

export default CampingForm;
