import {useState} from "react";
import FacilitiesCheckBox from "./FacilitiesCheckBox";
import axios from "axios";
import {requestURL} from "../../config/config";
import {Link, useLocation} from "react-router-dom";

export default function RegistFacilities({campGroundInfo, setCampGroundInfo}) {
    const [facilitiesDetail, setFacilitiesDetail] = useState({
        facilities: {
            facilitiesNo: 0,
            mart:
                false,
            toilet:
                false
        },
        play: {
            playNo: 0,
            playGround:
                false,
            singingRoom:
                false
        },
        surround: {
            surroundNo: 0,
            mountain:
                false,
            river:
                false
        }
    })

    const facilities = [
        {type: "facilities", list: ["mart", "toilet"]},
        {type: "play", list: ["playGround", "singingRoom"]},
        {type: "surround", list: ["mountain", "river"]}]

    const registFacilities = async () => {
        await axios.post(requestURL + '/campground/insertFacilities', facilitiesDetail)
        const response = await axios.post(requestURL + '/campground/maxFacilities');
        const data = response.data
        await axios.post(requestURL + '/campground/registerFacilitiesInfo', data)
        const maxFacilitiesInfo = (await axios.post(requestURL + '/campground/getMaxFacilitiesInfo')).data;
        console.log(maxFacilitiesInfo.maxFacilitiesInfo);
        const maxFacilitiesInfoNo = maxFacilitiesInfo.maxFacilitiesInfo;
        setCampGroundInfo({...campGroundInfo, facilitiesInfoNo: maxFacilitiesInfoNo});
    }

    return <div>
        {
            facilities.map((facility) => {
                return (
                    <>
                        <div>{facility.type}</div>
                        {facility.list.map((list) => {
                            return <FacilitiesCheckBox key={list} info={{name: list, type: facility.type}}
                                                       facilitiesDetail={facilitiesDetail}
                                                       setFacilitiesDetail={setFacilitiesDetail}></FacilitiesCheckBox>
                        })}
                    </>
                );
            })
        }
        <Link to={'/RegistCampGround3'} onClick={() => registFacilities()}>next</Link>
        <button onClick={() => {
            registFacilities()
        }}>submit
        </button>
    </div>
}