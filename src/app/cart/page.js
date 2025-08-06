'use client';
import React, { useEffect, useState } from 'react';
import DisCart from './cartdisplay';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [itemTotals, setItemTotals] = useState({}); 

  function clear() {
    localStorage.removeItem('cart');
    setCartItems([]);
    setItemTotals({});
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

 
    setItemTotals((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };


  const totalPrice = Object.values(itemTotals).reduce((acc, val) => acc + val, 0);

  return (
    <div className="mt-4">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="list-unstyled">
          {cartItems.map((item) => (
            <DisCart
              key={item.id}
              name={item.name}
              price={item.price}
              handleRemove={() => removeItem(item.id)}

           
              onTotalChange={(total) =>
                setItemTotals((prev) => ({ ...prev, [item.id]: total }))
              }
            />
          ))}
        </ul>
      )}
      
    
      <h4 className="mt-3">Total: ₹{totalPrice}</h4>

      <button onClick={clear} className="btn btn-warning mt-3">Clear All</button>
    </div>
  );
}
