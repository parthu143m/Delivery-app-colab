'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home({ handleFPClick, handleSignUp }) {
    const [users, setUsers] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/users');
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    const handleCheck = () => {
        const userExists = users.some(
            (user) => user.name === inputName && user.email === inputEmail
        );

        if (userExists) {
            window.location.href = "/mainRestorentList";
           
        } else if (inputName==="" && inputEmail==="" ) {
           alert("empty")
        }
        else{
          alert("worong")
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Check Name & password</h2>
            <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
            /><br /><br />
            <input
                type="password"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
            /><br /><br />
            <button onClick={handleCheck}>Sign In</button><br></br>
            <button onClick={handleSignUp}>SignUp</button><br></br>
            <button onClick={handleFPClick}>Forgot Password</button>


        </div>
    );
}
