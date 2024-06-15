import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [name, setName] = useState('');
    const [region, setRegion] = useState('');
    const [type, setType] = useState('모두');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 검색 로직
        const searchResults = [
            // 예시 데이터
            { id: 1, name: '캠핑장 A', region: '서울', type: '캠핑' },
            { id: 2, name: '캠핑장 B', region: '부산', type: '글램핑' },
        ];
        onSearch(searchResults);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="캠핑장 이름"/>
            <select type="text" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="지역">
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
                <option value="camping">캠핑</option>
                <option value="glamping">글램핑</option>
                <option value="caravan">카라반</option>
                <option value="pension">펜션</option>
            </select>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder="입실일" />
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder="퇴실일" />
            <button type="submit">검색</button>
        </form>
    );
};

export default Search;
