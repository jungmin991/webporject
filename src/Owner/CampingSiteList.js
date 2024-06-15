import axios from "axios";
import { useParams } from "react-router-dom";
import CampingSiteItem from "./CampingSiteItem";
import { requestURL } from "../config/config";
import { useState } from "react";

export default function CampingSiteList() {

    const user = useParams();

    const [data, setData] = useState([]);

    function sites() {
        console.log(user)
        axios.post(requestURL + '/campsite/siteList', user)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    
    }

    return (
        <div>
            <h2>캠핑장 사이트 목록</h2>
            <div className="camping-list">
                {sites()}
                {data.map((site) => (
                    <CampingSiteItem key={site.siteNo} site={site} />
                ))}
            </div>
        </div>
    );
}