import { useState } from "react"
import  axios  from 'axios';
import { useParams } from "react-router-dom";
import { requestURL } from "../config/config";

export default function UpdateCamping() {

    const groundNo = useParams();

    const [campGroundInfo, setCampGroundInfo] = useState({  
        campGroundNo : groundNo.campGroundNo,
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
        facilitiesNo: groundNo.campGroundNo,
        mart: 0,
        toilet: 0,
    })

    const [play, setPlay] = useState({
        facilitiesNo: groundNo.campGroundNo,
        playGround: 0,
        singingRoom: 0
    })

    const [surround, setSurround] = useState({      
        facilitiesNo: groundNo.campGroundNo,
        mountain: 0,
        river: 0
    })

    const onclick = async() => {
        try {
            const response = await axios.post(requestURL + '/campground/updateCamp', campGroundInfo)
            console.log(response.data)
            const response2 = await axios.post(requestURL + '/campground/updateFacilities', facilitiesInfo)
            console.log(response2.data)
            const response3 = await axios.post(requestURL + '/campground/updatePlay', play)
            console.log(response3.data)
            const response4 = await axios.post(requestURL + '/campground/updateSurround', surround)
            console.log(response4.data)

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
                {console.log(campGroundInfo)}
            </form>
            <div>
                <label>편의시설</label>
                <input type="checkbox" onChange={(e) => setFacilitiesInfo({...facilitiesInfo , mart: e.target.checked})}/>마트 
                <input type="checkbox" onChange={(e) => setFacilitiesInfo({...facilitiesInfo , toilet: e.target.checked})}/>화장실<br/>
                <label>놀이시설</label>
                <input type="checkbox" onChange={(e) => setPlay({...play , playGround: e.target.checked})}/>놀이터
                <input type="checkbox" onChange={(e) => setPlay({...play , singingRoom: e.target.checked})}/>노래방<br/>
                <label>주변환경</label>
                <input type="checkbox" onChange={(e) => setSurround({...surround , mountain: e.target.checked})}/>산
                <input type="checkbox" onChange={(e) => setSurround({...surround , river: e.target.checked})}/>강<br/>
            </div>
            {console.log(facilitiesInfo)}

            <button onClick={onclick}>수정하기</button>
        </div>
    )
}