import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestURL } from "../config/config";

export default function CampingItem({camping}) {

    const navigate = useNavigate();

    const onclick = async() => {
        navigate('/showSiteList/' + camping.userNo);
    }

    return (
        <div className="camping-item" onClick={onclick}>
            <div className="camping-item-img">
                <img src={camping.img} alt="camping-img" />
            </div>
            <div className="camping-item-info">
                <div className="camping-item-title">{camping.name}</div>
                <div className="camping-item-location">{camping.location}</div>
            </div>
        </div>
    );
}