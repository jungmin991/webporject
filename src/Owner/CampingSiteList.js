import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import CampingSiteItem from "./CampingSiteItem";
import {requestURL} from "../config/config";
import {useEffect, useState} from "react";

export default function CampingSiteList() {

    const user = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    function sites() {
        axios.post(requestURL + '/campsite/siteList', user)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }

    useEffect(() => {
        sites();
    }, []);

    const moveMypage = () => {
        navigate('/host/' + user.id);
    }

    const registerSite = () => {
        navigate('/RegistSite/' + user.id + '/'  + user.groundNum);
    }

    return (
        <div>
            <h2>캠핑장 사이트 목록</h2>
            <div className="camping-list">
                {data.map((site) => (
                    <CampingSiteItem key={site.siteNo} site={site}/>
                ))}
            </div>
            <button onClick={moveMypage}>마이페이지로</button>
            <button onClick={registerSite}>사이트등록</button>
        </div>
    );
}