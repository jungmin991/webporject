import React from 'react';
import './css/myRegistCamp.css'

const CampingList = ({ campingData }) => {
    return (
        <div>
            <h2>내가 등록한 캠핑장</h2>
            <div className="camping-list">
                {campingData.map((camping, index) => (
                    <div key={index} className="camping-item">
                        <img src={URL.createObjectURL(camping.mainImage)} alt={`캠핑장 ${index + 1}`} />
                        <h3>{camping.campingName}</h3>
                        <button className="edit-button">수정</button>
                    </div>
                ))}
            </div>
            <button className="add-button">캠핑장 추가</button>
        </div>
    );
};

export default CampingList;
