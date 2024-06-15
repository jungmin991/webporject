import React, { useState } from 'react';

const Reservation = () => {
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const reservationData = { adults, children, checkIn, checkOut };
        console.log(reservationData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>예약</h3>
            <input type="number" value={adults} onChange={(e) => setAdults(e.target.value)} placeholder="성인 수" />
            <input type="number" value={children} onChange={(e) => setChildren(e.target.value)} placeholder="어린이 수" />
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder="입실일" />
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder="퇴실일" />
            <button type="submit">예약하기</button>
            <button type="button">예약 취소</button>
        </form>
    );
};

export default Reservation;
