'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [itemTotals, setItemTotals] = useState({});

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  function clear() {
    localStorage.removeItem('cart');
    setCartItems([]);
    setItemTotals({});
  }

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setItemTotals((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const totalPrice = Object.values(itemTotals).reduce((acc, val) => acc + val, 0);

  const placeOrder = async () => {
    try {
      const userId = localStorage.getItem('userId'); // assumes userId stored here
      const restaurantId = "kmlkl"; // replace with actual restaurantId

      // Prepare items for order
      const orderItems = cartItems.map((item) => ({
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      }));

      // Send POST request using Axios
      const response = await axios.post('/api/orders', { userId, items: orderItems, restaurantId });

      alert('Order sent');
      clear();
    } catch (err) {
      console.error('Error sending order:', err);
    }
  };

  return (
    <div className="mt-4">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="list-unstyled">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ₹{item.price} x {item.quantity || 1}
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <h4 className="mt-3">Total: ₹{totalPrice}</h4>

      <button onClick={clear} className="btn btn-warning mt-3">
        Clear All
      </button>
      <button onClick={placeOrder} className="btn btn-primary mt-3">
        Place Order
      </button>
    </div>
  );
}
