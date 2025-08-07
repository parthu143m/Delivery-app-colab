'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Data } from '../data/page'; 
import { ProductCard } from '../universaldisplay/page'; 


export default function KushasMenuLit() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState(''); 
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isItemAlreadyInCart = existingCart.some(cartItem => cartItem.id === item.id);

    if (isItemAlreadyInCart) {
      alert("Item already exists in the cart.");
      return;
    }

    if (existingCart.some(cartItem => cartItem.id >= 9 && cartItem.id <= 12) || existingCart.some(cartItem => cartItem.id >= 1 && cartItem.id <= 4)) {
      alert("yugiupiu9p8y")
    } else {
     const updatedCart = [...existingCart, item];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="search">Search Dishes</h1>

      {/* Search Input */}
      <input
        type="text"
        className="search1 form-control mb-4"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter by Type */}
      <h2 className="mt-4">Search Type</h2>
      <select
        id="restaurant"
        name="restaurant"
        className="form-select mb-4"
        onChange={(e) => setTypeFilter(e.target.value)}
        value={typeFilter}
      >
        <option value="">All</option>
        <option value="veg">Veg</option>
        <option value="non-veg">Non-Veg</option>
      </select>

      {/* Display Filtered Results */}
      <div className="row">
        {Data
          .filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
            const matchesType = typeFilter === '' || item.type === typeFilter;
            const matchesId = item.id >= 5 && item.id <= 8;
            return matchesSearch && matchesType && matchesId;
          })
          .map(item => (
            <ProductCard
              key={item.id}
              name={item.name}
              price={item.price}
              button={item.button}
              item={item}
              onAddToCart={addToCart}
            />
          ))
        }
      </div>
    </div>
  );
}
