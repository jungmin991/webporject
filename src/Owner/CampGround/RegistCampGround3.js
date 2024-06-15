import axios from "axios";
import {requestURL} from "../../config/config";

export default function RegistCampGround3(campGroundInfo, setCampGroundInfo) {
    async function register() {
        console.log(campGroundInfo.campGroundInfo);
        await axios.post(requestURL+"/campground/register",campGroundInfo.campGroundInfo)
    }
    return <div>
        <label><input type="image"/>대표 이미지<br/></label>
        <button onClick={register}/>
    </div>
}