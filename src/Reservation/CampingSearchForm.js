import React, {useState} from 'react';
import './css/CampingSearchForm.css'
import axios from "axios";
import {requestURL} from "../config/config";
import {useNavigate} from "react-router-dom";
import CampingTable from './CampingTable';

const Search = () => {
    const [name, setName] = useState('');
    const [local, setLocal] = useState('%');
    const [type, setType] = useState('%');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [isDetail, setIsDetail] = useState(false);
    const navigate = useNavigate();
    const [camps, setCamps] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();

        let searchName = name;
        let searchLocal = local;
        let searchType = type;

        if (searchName === '') {
            searchName = '%';
        }
        if (searchLocal === 'all') {
            searchLocal = '%';
        }
        if (searchType === 'all') {
            searchType = '%';
        }


        const searchData = {name: searchName, type: searchType, local: searchLocal};
        try {
            console.log(searchData);
            const response = await axios.post(requestURL + '/campground/getTest', searchData);
            setCamps(response.data);
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
    };


    return (
        <div className="CampingSearchForm">
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        className="inputName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="캠핑장 이름"
                    />
                </div>
                <div>
                    <input
                        className="inputName"
                        type="text"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                        placeholder="지역 검색"
                    />
                </div>
                {/*<div className="form-group">
                    <select type="text" value={local} onChange={(e) => setLocal(e.target.value)}
                            placeholder="지역" className="form-control">
                        <option value="all">모두</option>
                        <option value="gangwon">강원도</option>
                        <option value="gyeongsang">경상도</option>
                        <option value="gyeonggi">경기도</option>
                        <option value="jeolla">전라도</option>
                        <option value="chungcheong">충청도</option>
                        <option value="jeju">제주도</option>
                    </select>
                </div>*/}
                <div className="form-group">
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="form-control"
                    >
                        <option value="all">모두</option>
                        <option value="CAMPING">캠핑</option>
                        <option value="GLAMPING">글램핑</option>
                        <option value="CARAVAN">카라반</option>
                        <option value="PENSION">펜션</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        placeholder="입실일"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        placeholder="퇴실일"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn">검색</button>
                </div>
            </form>
            <div>
                <CampingTable camps={camps}/>
            </div>
        </div>
    );
};

export default Search;
