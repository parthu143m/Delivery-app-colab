'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [itemTotals, setItemTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const aa  =  "gg"

  // ✅ Authentication check
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);

      
      
      
    }
  }, []);

  
  useEffect(() => {
    const totals = {};
    cartItems.forEach(item => {
      totals[item.id] = item.price * (item.quantity || 1);
    });
    setItemTotals(totals);
  }, [cartItems]);

  // ✅ Clear cart
  function clear() {
    localStorage.removeItem('cart');
    setCartItems([]);
    setItemTotals({});
  }

  // ✅ Remove item
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // ✅ Place order
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const restaurantId = cartItems[0].restid;

      const orderItems = cartItems.map((item) => ({
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      }));

      await axios.post('/api/orders', {
        userId,
        items: orderItems,
        restaurantId,
        aa,

      });

      alert('Order placed successfully!');
      clear();
    } catch (err) {
      console.error('Error sending order:', err);
      alert('Failed to place order.');
    }
  };

  const totalPrice = Object.values(itemTotals).reduce((acc, val) => acc + val, 0);

  if (loading) return <p>Checking authentication...</p>;

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
<div>
   <button onClick={() => window.location.href = "/orderHistory"}>
              ORDERS</button>
              
</div>
      
    </div>
   
  );
}
