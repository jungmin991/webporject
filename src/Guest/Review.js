import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {requestURL} from "../config/config";


export default function Review() {
    const campGroundNo = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState({
        campGroundNo: campGroundNo.campGroundNo,
        reviewImage: null,
        review: ""
    });

    function submit() {
        axios.post(requestURL + "/review/register", review);
        navigate('/MyReservationList/'+campGroundNo.guestNo);
    }

    return <div>
        <label><input type="image" onChange={(e) => setReview({...review, image: e.target.value})}></input>리뷰 사진</label>
        <br/>
        <label><input type="text" onChange={(e) => setReview({...review, review: e.target.value})}></input>리뷰 작성</label>
        <br/>
        <button onClick={() => submit()}>리뷰 등록</button>
    </div>
}