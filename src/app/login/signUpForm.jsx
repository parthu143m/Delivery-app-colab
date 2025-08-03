'use client';
import { useState } from "react";
import axios from "axios";

export default function Home({ handleBacktoLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await axios.post('/api/users', { name, email });
      alert("sent")
  
    } catch (err) {
      console.error("Error in POST API:", err);

    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Input Name</h1><br />
        <input type="text" onChange={(e) => setName(e.target.value)} /><br />
        <h1>Password</h1><br />
        <input type="password" onChange={(e) => setEmail(e.target.value)} /><br />
     
        <button type="submit">Sign up</button>
        <button onClick={handleBacktoLogin}>Back</button>
      </form>
    </div>
  );
}
