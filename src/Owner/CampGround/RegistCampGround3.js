import axios from "axios";
import {requestURL} from "../../config/config";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function RegistCampGround3({campGroundInfo, setCampGroundInfo}) {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const handleFileUpload = (event) => {
        console.log(`${event.target.files[0].name} uploaded`);
        setImageFile(event.target.files[0]);
        setCampGroundInfo({...campGroundInfo, campGroundImages: JSON.stringify([event.target.files[0]?.name])});
    };

    const register = async () => {
        const formData = new FormData();
        formData.append('file', imageFile);

        await axios.post(requestURL + "/campground/register", campGroundInfo); // 캠프장 정보 등록 요청
        // await axios.post(requestURL + '/upload', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
    }

    return (
        <div>
            <hr/>
            <input type="file" onChange={handleFileUpload}/>
            <button onClick={() => {
                register().then(() => {
                    navigate(`/host/${campGroundInfo.userNo}`)
                })
            }}>등록
            </button>
        </div>
    )
}