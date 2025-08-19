'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [itemTotals, setItemTotals] = useState({});

   
  

  // Load cart from localStorage on first render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);

      // Calculate initial totals
      const totals = {};
      parsedCart.forEach(item => {
        totals[item.id] = item.price * (item.quantity || 1);
      });
      setItemTotals(totals);
    }
  }, []);

  // Recalculate totals when cart changes
  useEffect(() => {
    const totals = {};
    cartItems.forEach(item => {
      totals[item.id] = item.price * (item.quantity || 1);
    });
    setItemTotals(totals);
  }, [cartItems]);

  // Clear cart
  function clear() {
    localStorage.removeItem('cart');
    setCartItems([]);
    setItemTotals({});
  }

  // Remove single item from cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = Object.values(itemTotals).reduce((acc, val) => acc + val, 0);

  // Place order
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const userId = localStorage.getItem('userId'); // assumes userId stored here
      const restaurantId = cartItems[0].restid;

      // Prepare items for order
      const orderItems = cartItems.map((item) => ({
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      }));

      // Send POST request using Axios
      await axios.post('/api/orders', {
        userId,
        items: orderItems,
        restaurantId,
    
      });

      alert('Order placed successfully!');
      clear();
    } catch (err) {
      console.error('Error sending order:', err);
      alert('Failed to place order.');
    }
  };

  const restId = cartItems.length > 0 ? cartItems[0].restid : null;

  return (
    <div className="mt-4">
      <h2>Cart</h2>

      {restId && (
        <h4 className="text-muted">Restaurant ID: {restId}</h4>
      )}

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="list-unstyled">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ₹{item.price} x {item.quantity || 1}
              <button
                onClick={() => removeItem(item.id)}
                className="btn btn-sm btn-danger ms-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <h4 className="mt-3">Total: ₹{totalPrice}</h4>

      <button onClick={clear} className="btn btn-warning mt-3 me-3">
        Clear All
      </button>
      <button onClick={placeOrder} className="btn btn-primary mt-3">
        Place Order
      </button>
    </div>
  );
}
