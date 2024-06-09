import React, { useState } from 'react';
import axios from 'axios';


export default function Main() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login', { id, password });
            console.log(response)
            console.log('Login successful');
        } catch (error) {
            console.log(id,password+'dd')
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
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    />
                    <input
                    className="input"
                    type="password"
                    name="pswd"
                    placeholder="Password"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Log in</button>
                </form>
            </div>
        </div>      
    );
}