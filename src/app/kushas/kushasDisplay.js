'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Data } from './kushasData'; // Assuming Data is an array of restaurant objects

export default function KushasMenuList() {
  const [search, setSearch] = useState('');

  return (
    <div className="container mt-4">
      <h1 className="search">Search Dishes</h1>
      
      <input
        type="text"
        className="search1"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {Data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ).map(item => (
        <div key={item.id} className="card mb-2 p-3 shadow-sm">
          <h5 className="mb-1">{item.name}</h5>
          <p className="mb-0 text-success">Price: ₹{item.price}</p>
        </div>
      ))}

      
    </div>
  );
}
