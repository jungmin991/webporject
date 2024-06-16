import { useState } from "react"
import  axios  from 'axios';
import { useParams } from "react-router-dom";
import { requestURL } from "../config/config";

export default function UpdateCamping() {

    const groundNo = useParams();

    const [campGroundInfo, setCampGroundInfo] = useState({  
        campGroundNo : groundNo,
        mannerStartTime: '',
        mannerEndTime: '',
        name: '',
        location: '',
        type: '',
        callNum: '',
        campingInfo: '',
        enterTime: '',
        leaveTime: '',
    })

    const [facilitiesInfo, setFacilitiesInfo] = useState({
        mart: 0,
        toilet: 0,
    })

    const [play, setPlay] = useState({
        playGround: 0,
        singingRoom: 0
    })

    const [surround, setSurround] = useState({      
        mountain: 0,
        river: 0
    })

    const onclick = async() => {
        try {
            const response = await axios.post(requestURL + '/campground/update', {
                campGroundInfo: campGroundInfo,
                facilitiesInfo: facilitiesInfo,
                play: play,
                surround: surround
            })
            console.log(response.data)
        }
        catch (error) {
            console.error('Error uploading file:', error);
        }


    }


    return (
        <div>
            <form className="RegistCampForm">
                <div className="RegistCampFormDiv">
                    <label className="label">매너 시작 시간<input type="time" onChange={(e) => setCampGroundInfo({...campGroundInfo ,mannerStartTime: e.target.value})}/><br/></label>
                    <label className="label">매너 종료 시간<input type="time" onChange={(e) => setCampGroundInfo({...campGroundInfo ,mannerEndTime: e.target.value})}/><br/></label>
                    <label className="label">캠핑장 이름<input id="campingInfoInput" type='text' onChange={(e) => setCampGroundInfo({...campGroundInfo ,name: e.target.value})}/><br/></label>
                    <label className="label">캠핑장 위치<input id="campingInfoInput" type='text' onChange={(e) => setCampGroundInfo({...campGroundInfo ,location: e.target.value})}/><br/></label>
                    <label className="label">캠핑장 타입<input id="campingInfoInput" type='text' onChange={(e) => setCampGroundInfo({...campGroundInfo ,type: e.target.value})}/><br/></label>
                    <label className="label">캠핑장 대표번호<input id="campingInfoInput" type='text' onChange={(e) => setCampGroundInfo({...campGroundInfo ,callNum: e.target.value})}/><br/></label>
                    <label className="label">캠핑장 설명<input id="campingInfoInput" type='text' onChange={(e) => setCampGroundInfo({...campGroundInfo ,campingInfo: e.target.value})}/><br/></label>
                    <label className="label">캠핑장 입실 시간<input id="campingInfoInput" type='time' onChange={(e) => setCampGroundInfo({...campGroundInfo ,enterTime: e.target.value})}/><br/></label>
                    <label className="label">캠핑장 퇴실 시간<input id="campingInfoInput" type='time' onChange={(e) => setCampGroundInfo({...campGroundInfo ,leaveTime: e.target.value})}/><br/></label>
                </div>
            </form>
            <div>
                <label>편의시설</label>
                <input type="checkbox" onChange={(e) => setFacilitiesInfo("mart", e.target.checked)}/>마트 
                <input type="checkbox" onChange={(e) => setFacilitiesInfo("toilet", e.target.checked)}/>화장실<br/>
                <label>놀이시설</label>
                <input type="checkbox" onChange={(e) => setPlay("playGround", e.target.checked)}/>놀이터
                <input type="checkbox" onChange={(e) => setPlay("singingRoom", e.target.checked)}/>노래방<br/>
                <label>주변환경</label>
                <input type="checkbox" onChange={(e) => setSurround("mountain", e.target.checked)}/>산
                <input type="checkbox" onChange={(e) => setSurround("river", e.target.checked)}/>강<br/>
            </div>

            <button onClick={onclick}>수정하기</button>
        </div>
    )
}