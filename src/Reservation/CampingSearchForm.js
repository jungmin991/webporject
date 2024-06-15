import React, { useState } from 'react';
import axios from "axios";

const Camp = {
    name: '',
    type: '',
    location: ''
}

const Search = () => {
    const [name, setName] = useState('');
    const [local, setLocal] = useState('%');
    const [type, setType] = useState('%');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const [camps, setCamps] = useState([Camp])
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


        const searchData = { name: searchName, type: searchType, local: searchLocal };
        try {
            console.log(searchData);
            const response = await axios.post('/campground/getTest', searchData);
            setCamps(response.data);
            console.log(camps)
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="캠핑장 이름" />
                <select type="text" value={local} onChange={(e) => setLocal(e.target.value)} placeholder="지역">
                    <option value="all">모두</option>
                    <option value="gangwon">강원도</option>
                    <option value="gyeongsang">경상도</option>
                    <option value="gyeonggi">경기도</option>
                    <option value="jeolla">전라도</option>
                    <option value="chungcheong">충청도</option>
                    <option value="jeju">제주도</option>
                </select>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="all">모두</option>
                    <option value="CAMPING">캠핑</option>
                    <option value="GLAMPING">글램핑</option>
                    <option value="CARAVAN">카라반</option>
                    <option value="PENSION">펜션</option>
                </select>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder="입실일" />
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder="퇴실일" />
                <button type="submit">검색</button>
            </form>
            <div>
                {camps.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>이름</th>
                            <th>유형</th>
                            <th>위치</th>
                        </tr>
                        </thead>
                        <tbody>
                        {camps.map((camp, index) => (
                            <tr key={index}>
                                <td>{camp.name}</td>
                                <td>{camp.type}</td>
                                <td>{camp.location}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
