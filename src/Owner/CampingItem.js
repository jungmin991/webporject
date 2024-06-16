import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestURL } from "../config/config";

export default function CampingItem({camping}) {

    const navigate = useNavigate();

    const onclick = () => {
        console.log(camping.campGroundImages[0])
        navigate('/showSiteList/' + camping.userNo + '/' + camping.campGroundNo);
    }

    const updateCamping = () => {
        navigate('/updateCamping/'+camping.userNo+'/'+ camping.campGroundNo);
    }

    return (
        <div className="camping-item" >
            <div className="camping-item-img" onClick={onclick}>
                <img src={"/uploads/"+camping.campGroundImages[0]} alt="camping-img" />
            </div>
            <div className="camping-item-info">
                <div className="camping-item-title">{camping.name}</div>
                <div className="camping-item-location">{camping.location}</div>
            </div>
            <button onClick={updateCamping}>수정하기</button>
        </div>
    );
}