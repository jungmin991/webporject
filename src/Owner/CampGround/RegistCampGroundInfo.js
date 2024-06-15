import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function RegistCampGround({campGroundInfo, setCampGroundInfo}) {
    const setCampGroundInfos = (type, value) => {
        setCampGroundInfo({
            ...campGroundInfo, [type]: value
        })
    }
    return <div>
        <label><input type="time" onChange={(e) => setCampGroundInfos("mannerStartTime", e.target.value)
        }/>매너 시작 시간<br/></label>
        <label><input type="time" onChange={(e) => setCampGroundInfos("mannerEndTime", e.target.value)}/>매너 종료
            시간<br/></label>
        <label><input type='text' onChange={(e) => setCampGroundInfos("name", e.target.value)}/>캠핑장 이름<br/></label>
        <label><input type='text' onChange={(e) => setCampGroundInfos("location", e.target.value)}/>캠핑장 위치<br/></label>
        <label><input type='text' onChange={(e) => setCampGroundInfos("type", e.target.value)}/>캠핑장 타입<br/></label>
        <label><input type='text' onChange={(e) => setCampGroundInfos("callNum", e.target.value)}/>캠핑장 대표번호<br/></label>
        <label><input type='text' onChange={(e) => setCampGroundInfos("campingInfo", e.target.value)}/>캠핑장
            설명<br/></label>
        <label><input type='time' onChange={(e) => setCampGroundInfos("enterTime", e.target.value)}/>캠핑장 입실
            시간<br/></label>
        <label><input type='time' onChange={(e) => setCampGroundInfos("leaveTime", e.target.value)}/>캠핑장 퇴실
            시간<br/></label>
        <Link to={'/RegistCampGround2'} onClick={() => console.log("asdf"+campGroundInfo)}>next</Link>
    </div>
}