import axios from "axios";
import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import './css/RegisterCampGround.css'

export default function RegistCampGround({campGroundInfo, setCampGroundInfo}) {
    const userNo = useParams();
    const setCampGroundInfos = (type, value) => {
        setCampGroundInfo({
            ...campGroundInfo, [type]: value
        })
    }
    return(
        <form className="RegistCampForm">
            <div className="RegistCampFormDiv">
                <label className="label">매너 시작 시간<input type="time" onChange={(e) => setCampGroundInfos("mannerStartTime", e.target.value)
                }/><br/></label>
                <label className="label">매너 종료 시간<input type="time" onChange={(e) => setCampGroundInfos("mannerEndTime", e.target.value)}/><br/></label>
                <label className="label">캠핑장 이름<input id="campingInfoInput" type='text' onChange={(e) => setCampGroundInfos("name", e.target.value)}/><br/></label>
                <label className="label">캠핑장 위치<input id="campingInfoInput" type='text' onChange={(e) => setCampGroundInfos("location", e.target.value)}/><br/></label>
                <label className="label">캠핑장 타입<input id="campingInfoInput" type='text' onChange={(e) => setCampGroundInfos("type", e.target.value)}/><br/></label>
                <label className="label">캠핑장 대표번호<input id="campingInfoInput" type='text' onChange={(e) => setCampGroundInfos("callNum", e.target.value)}/><br/></label>
                <label className="label">캠핑장 설명<input id="campingInfoInput" type='text' onChange={(e) => setCampGroundInfos("campingInfo", e.target.value)}/><br/></label>
                <label className="label">캠핑장 입실 시간<input id="campingInfoInput" type='time' onChange={(e) => setCampGroundInfos("enterTime", e.target.value)}/><br/></label>
                <label className="label">캠핑장 퇴실 시간<input id="campingInfoInput" type='time' onChange={(e) => setCampGroundInfos("leaveTime", e.target.value)}/><br/></label>
                <Link className="linkName" to={'/RegistCampGround2'} onClick={() => setCampGroundInfo({...campGroundInfo, userNo: userNo.id})
                }>next</Link>
            </div>
        </form>
    )
}