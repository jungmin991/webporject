import axios from "axios";
import {requestURL} from "../../config/config";
import {useNavigate} from "react-router-dom";

export default function RegistCampGround3({campGroundInfo, setCampGroundInfo}) {
    const navigate = useNavigate();

    async function register() {
        navigate("/host/" + campGroundInfo.userNo)
        await axios.post(requestURL + "/campground/register", campGroundInfo)
    }

    return <div>
        <label><input type="image"/>대표 이미지<br/></label>
        <button onClick={register}/>
    </div>
}