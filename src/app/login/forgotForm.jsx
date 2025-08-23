"use client";
import { useState } from "react";

export default function UpdateEmail() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  const handleUpdateEmail = async () => {
    if (!phone || !email) return alert("Enter phone and email");

    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith("+91")) {
      formattedPhone = "+91" + formattedPhone;
    }

    try {
      const res = await fetch("/api/check-phone", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formattedPhone, email }),
      });

      const data = await res.json();

      if (data.exists) {
        setResult("Email updated successfully ✅");
      } else {
        setResult("User not found ❌");
      }
    } catch (err) {
      console.error(err);
      setResult("Error updating email ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Email for Phone</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <input
        type="email"
        placeholder="Enter new email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button onClick={handleUpdateEmail}>Update Email</button>
      {result && <p>{result}</p>}
    </div>
  );
}
