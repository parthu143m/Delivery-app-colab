'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        const res = await axios.get(`/api/orders?userId=${userId}`);
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mt-4">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border p-3 mb-3 rounded">
            <h5>Restaurant ID: {order.restaurantId}</h5>
            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - ₹{item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
          </div>
        ))
      )}
    </div>
  );
}
