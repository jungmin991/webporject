import axios from "axios";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {requestURL} from "../../config/config";

export default function RegistSite() {
    const navigate = useNavigate();
    const info = useParams();
    const [siteInfos, setSiteInfos] = useState({
        siteNo: 0,
        campGroundNo: info.campGroundNo,
        campGroundImages: JSON.stringify([]),
        price: 0,
        peopleNum: 0,
        siteName: ""
    })

    const handleFileUpload = (event) => {
        console.log(`${event.target.files[0].name} uploaded`);
        setSiteInfos({...siteInfos, campGroundImages: JSON.stringify([event.target.files[0]?.name])});
    };

    async function registSite() {
        await axios.post(requestURL + "/campsite/register", siteInfos, {})
        navigate('/showSiteList/' + info.hostNo + '/' + info.campGroundNo)
    }

    function setSiteInfo(type, value) {
        setSiteInfos({...siteInfos, [type]: value})
    }

    return <div>
        <input type="file" accept={'image/*'} onChange={handleFileUpload}></input>
        <label><input type="text" onChange={(e) => {
            setSiteInfo("siteNo", parseInt(e.target.value))
        }}/>사이트 번호 <br/> </label>
        <label><input type="type" onChange={(e) => {
            setSiteInfo("price", parseInt(e.target.value))
        }}/>가격 <br/> </label>
        <label><input type="text" onChange={(e) => {
            setSiteInfo("peopleNum", parseInt(e.target.value))
        }}/> 최대 인원수 <br/> </label>
        <label><input type="text" onChange={(e) => {
            setSiteInfo("siteName", e.target.value)
        }}/>사이트 이름 <br/> </label>
        <button onClick={registSite}>regist</button>
    </div>
}