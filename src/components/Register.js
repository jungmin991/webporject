import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [data, setData] = useState({
        id: "",
        pw: "",
        pwChk: ""
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        if (data.pw !== data.pwChk) {
            alert('Password does not match');
            return;
        }

        try {
            const response = await axios.post('/api/signin', { id: data.id, pw: data.pw });
            console.log(response);
            console.log('Register successful');
        } catch (error) {
            console.log('Register failed');
        }
    }


    return (
        <div className="main">
        <div className="register">
            <form className="form" onSubmit={onSubmit}>
            <label htmlFor="chk" aria-hidden="true">
                Register
            </label>
            <input
                className="input"
                type="text"
                name="txt"
                placeholder="Username"
                required=""
            />
            <input
                className="input"
                type="id"
                name="id"
                placeholder="id"
                required=""
            />
            <input
                className="input"
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
            />
            <input
                className="input"
                type="password"
                name="pswdChk"
                placeholder="Password chk"
                required=""
            />
            <button type='submit'>Register</button>
            </form>
        </div>
        </div>
    )
}
