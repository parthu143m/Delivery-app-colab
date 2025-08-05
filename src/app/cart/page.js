'use client';
import React, { useEffect, useState } from 'react';
import DisCart from './cartdisplay';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  function clear() {
    localStorage.removeItem('cart');       
    setCartItems([]);                      
  }


  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="mt-4">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <DisCart
            name={item.name}
            price={item.price}
            key={item.id}
            handleRemove={() => removeItem(item.id)}
            />
          ))}
        </ul>
      )}
      <button onClick={clear} className="btn btn-warning mt-3">Clear All</button>
      <h2>total:</h2>
    </div>
  );
}
