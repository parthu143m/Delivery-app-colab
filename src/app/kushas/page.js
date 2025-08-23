'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Data } from '../data/page';
import { ProductCard } from '../universaldisplay/page';

export default function KushasMenuList() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [cart, setCart] = useState([]);

  // ✅ Authentication check
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // ✅ Add item to cart
  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isItemAlreadyInCart = existingCart.some(cartItem => cartItem.id === item.id);

    if (isItemAlreadyInCart) {
      alert("Item already exists in the cart.");
      return;
    }

    // ✅ Restriction logic
    if (
      existingCart.some(cartItem => (cartItem.id >= 9 && cartItem.id <= 12)) ||
      existingCart.some(cartItem => (cartItem.id >= 5 && cartItem.id <= 8))
    ) {
      alert("ihhihu");
      return;
    }

    const updatedCart = [...existingCart, item];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (loading) {
    return (
      <p>Checking authentication...</p> // Loader until auth check is done
    );
  }

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
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
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
            const matchesId = item.id >= 1 && item.id <= 4;
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
      <button onClick={() => window.location.href = "/cart"}>
              GO TO CART</button> 
    </div>
  );
}
