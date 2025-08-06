'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Data } from './kushasData'; // your data array
import { ProductCard } from '../kushas/kushasMenu'; // your card component

export default function KushasMenuList() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isItemAlreadyInCart = existingCart.some(cartItem => cartItem.id === item.id);

    if (isItemAlreadyInCart) {
      alert("Item already exists in the cart.");
      return;
    }

    // ✅ Condition now based on item.id
    if (item.id >= 1 && item.id <= 3) {
      const updatedCart = [...existingCart, item];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      alert("Only items with ID 1 to 3 can be added to the cart.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="search">Search Dishes</h1>

      <input
        type="text"
        className="search1 form-control mb-4"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {Data.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ).map(item => (
          <ProductCard
            key={item.id}
            name={item.name}
            price={item.price}
            button={item.button}
            item={item}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
