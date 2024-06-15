import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Main() {

    const navigate = useNavigate();
    const [data, setData] = useState({
        userNo: 0,
        id: "",
        pw: "",
        userType: null
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login', { id: data.id, pw: data.pw, userType: data.userType});
            console.log(response)
            setData({
                userNo: response.data[0].userNo,
                id: response.data[0].id,
                pw: response.data[0].pw,
                userType: response.data[0].userType
            });
            console.log(data.userType);
            if (data.userType == 'GUEST') {
                navigate('/guest');
            }
            else if (data.userType == 'HOST') {
                navigate('/host');
            }

            console.log('Login successful');
        } catch (error) {
            console.log('Login failed');
        }
    };

    return (
        <div className="main">
            <div className="login">
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="chk" aria-hidden="true">
                    Log in
                    </label>
                    <input
                    className="input"
                    type="id"
                    name="id"
                    placeholder="id"
                    required=""
                    value={data.id}
                    onChange={(e) => setData({...data, id: e.target.value})}
                    />
                    <input
                    className="input"
                    type="password"
                    name="pswd"
                    placeholder="Password"
                    required=""
                    value={data.pw}
                    onChange={(e) => setData({...data, pw: e.target.value})}
                    />
                    <button type='submit'>Log in</button>
                </form>
            </div>
        </div>      
    );
}