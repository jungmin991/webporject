import React, { useState } from 'react';
import './css/campRegister.css'

const CampingForm = () => {
    const [formData, setFormData] = useState({
        campingType: 'CAMPING',
        campingName: '',
        address: '',
        contact: '',
        description: '',
        checkInTime: '',
        checkOutTime: '',
        mainImage: null,
        mannerTimeStart: '',
        mannerTimeEnd: '',
        facilities: [],
        activities: [],
        environment: [],
        localType: '',
    });

    const handleChange = (e) => {
        const {name, value, type, checked, files} = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => {
                const updatedArray = checked
                    ? [...prevData[name], value]
                    : prevData[name].filter((item) => item !== value);
                return {...prevData, [name]: JSON.stringify(updatedArray)};
            });
        } else if (type === 'file') {
            setFormData((prevData) => ({...prevData, [name]: files[0]}));
        } else {
            setFormData((prevData) => ({...prevData, [name]: value}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try{
            const response = await axios.port('/campground/register', formData)
            console.log('Form submitted successfully:', response.data);
        }
        catch (err) {
            console.error('Error submitting form:', err);
        console.log(formData)
        try {
            const response = await axios.post('/campground/register', formData)
            console.log('Form submitted successfully:', response.data);
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    return (
        <div className="form-container">
            <h2>캠핑 정보 입력</h2>
            <form onSubmit={handleSubmit}>
                {/* 각 입력 필드 및 이벤트 핸들러 설정 */}
                {/* form fields as described before */}
                <div className="form-group">
                    <label htmlFor="campingType">캠핑 유형</label>
                    <select id="campingType" name="campingType" onChange={handleChange} value={formData.campingType}>
                        <option value="캠핑">캠핑</option>
                        <option value="글램핑">글램핑</option>
                        <option value="카라반">카라반</option>
                        <option value="펜션">펜션</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="campingName">캠핑장 이름</label>
                    <input type="text" id="campingName" name="campingName" onChange={handleChange}
                           value={formData.campingName} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">주소</label>
                    <input type="text" id="address" name="address" onChange={handleChange} value={formData.address}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="contact">연락처</label>
                    <input type="tel" id="contact" name="contact" onChange={handleChange} value={formData.contact}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">숙소 소개</label>
                    <textarea id="description" name="description" onChange={handleChange} value={formData.description}
                              required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="checkInTime">입실 시간</label>
                    <input type="time" id="checkInTime" name="checkInTime" onChange={handleChange}
                           value={formData.checkInTime}/>
                </div>
                <div className="form-group">
                    <label htmlFor="checkOutTime">퇴실 시간</label>
                    <input type="time" id="checkOutTime" name="checkOutTime" onChange={handleChange}
                           value={formData.checkOutTime}/>
                </div>
                <div className="form-group">
                    <label htmlFor="amenities">숙소 편의시설</label>
                    <textarea id="amenities" name="amenities" onChange={handleChange} value={formData.amenities}
                              required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="mainImage">대표사진</label>
                    <input type="file" id="mainImage" name="mainImage" accept="image/*" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="mannerTimeStart">매너타임 시작</label>
                    <input type="time" id="mannerTimeStart" name="mannerTimeStart" onChange={handleChange}
                           value={formData.mannerTimeStart} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="mannerTimeEnd">매너타임 종료</label>
                    <input type="time" id="mannerTimeEnd" name="mannerTimeEnd" onChange={handleChange}
                           value={formData.mannerTimeEnd} required/>
                </div>
                <div className="form-group">
                    <label>부대시설</label>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="facilities" value="공용 샤워실" onChange={handleChange}
                        />공용 샤워실</label>
                        <label><input type="checkbox" name="facilities" value="공용 화장실" onChange={handleChange}
                        />공용 화장실</label>
                        <label><input type="checkbox" name="facilities" value="개수대" onChange={handleChange}
                        />개수대</label>
                        <label><input type="checkbox" name="facilities" value="공용주차장" onChange={handleChange}
                        />공용주차장</label>
                        <label><input type="checkbox" name="facilities" value="편의점" onChange={handleChange}
                        />편의점</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="activities">놀거리</label>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="activities" value="낚시" onChange={handleChange}
                                      checked={formData.activities.includes("낚시")}/>낚시</label>
                        <label><input type="checkbox" name="activities" value="하이킹" onChange={handleChange}
                                      checked={formData.activities.includes("하이킹")}/>하이킹</label>
                        <label><input type="checkbox" name="activities" value="수영" onChange={handleChange}
                                      checked={formData.activities.includes("수영")}/>수영</label>
                        <label><input type="checkbox" name="activities" value="보드게임" onChange={handleChange}
                                      checked={formData.activities.includes("보드게임")}/>보드게임</label>
                        <label><input type="checkbox" name="activities" value="자전거 타기" onChange={handleChange}
                                      checked={formData.activities.includes("자전거 타기")}/>자전거 타기</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="environment">주변환경</label>
                    <div className="checkbox-group">
                        <label><input type="checkbox" name="environment" value="산" onChange={handleChange}
                                      checked={formData.environment.includes("산")}/>산</label>
                        <label><input type="checkbox" name="environment" value="계곡" onChange={handleChange}
                                      checked={formData.environment.includes("계곡")}/>계곡</label>
                        <label><input type="checkbox" name="environment" value="등산로" onChange={handleChange}
                                      checked={formData.environment.includes("등산로")}/>등산로</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="localType">지역</label>
                    <select id="localType" name="localType" onChange={handleChange} value={formData.localType}>
                        <option value="경상도">경상도</option>
                        <option value="전라도">전라도</option>
                        <option value="경기도">경기도</option>
                        <option value="강원도">강원도</option>
                        <option value="충청도">충청도</option>
                        <option value="제주도">제주도</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">제출하기</button>
                <br/>
                <button type="button" className="submit-button" onClick={() => setFormData({
                    campingType: '',
                    campingName: '',
                    address: '',
                    contact: '',
                    description: '',
                    checkInTime: null,
                    checkOutTime: null,
                    mainImage: null,
                    mannerTimeStart: '',
                    mannerTimeEnd: '',
                    facilities: [],
                    activities: [],
                    environment: [],
                    localType: '',
                })}>취소
                </button>
            </form>
        </div>
    );
};

export default CampingForm;