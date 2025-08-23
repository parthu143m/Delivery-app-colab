'use client';
import { useState, useEffect } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './restorentList.css';
import { restList } from './restorentDtata'; // Ensure the filename is correct
import RestorentDisplay from './restorentDisplay';
import { useRouter } from "next/navigation";

export default function RestorentList() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const router = useRouter();

 

  // Handle button click by restaurant name
  const handleClick = (name) => {
    if (name === "KNL") {
      window.location.href = './knlrest';
    } else if (name === "Snow Field") {
      window.location.href = './snowfield';
    } else if (name === "Kushas") {
      window.location.href = './kushas';
    } else {
      alert(`${name} is clicked`);
    }
  };

  return (
    <div>
      <br />
      <Carousel interval={3000} pause={false} className='coroselmain'>
        <Carousel.Item className='coroselmain2'>
          <img
            className="d"
            src="https://img.etimg.com/thumb/msid-106775052,width-300,height-225,imgsize-69266,resizemode-75/mclaren-750s-launched-in-india-at-rs-5-91-crore-what-makes-it-so-expensive.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item className='coroselmain2'>
          <img
            className="d"
            src="https://img.etimg.com/thumb/msid-106775052,width-300,height-225,imgsize-69266,resizemode-75/mclaren-750s-launched-in-india-at-rs-5-91-crore-what-makes-it-so-expensive.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item className='coroselmain2'>
          <img
            className="d"
            src="https://img.etimg.com/thumb/msid-106775052,width-300,height-225,imgsize-69266,resizemode-75/mclaren-750s-launched-in-india-at-rs-5-91-crore-what-makes-it-so-expensive.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <br />
      <h1>Search</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br /><br />
      <h2>Search Type</h2>
      <select
        id="restaurant"
        name="restaurant"
        onChange={(e) => setTypeFilter(e.target.value)}
        value={typeFilter}
      >
        <option value="">All</option>
        <option value="veg">Veg</option>
        <option value="non-veg">Non-Veg</option>
      </select>

      {/* Display filtered restaurants */}
      {restList
        .filter(item => {
          const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
          const matchesType = typeFilter === '' || item.type === typeFilter;
          return matchesSearch && matchesType;
        })
        .map(item => (
          <div key={item.name}>
            {/* Restaurant name as clickable button */}
            <button
              onClick={() => handleClick(item.name)}
              style={{
                margin: '10px 0',
                padding: '10px 20px',
                backgroundColor: '#f8f8f8',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              <RestorentDisplay name={item.name} place={item.place}/>
            </button>
          </div>
          
           
        ))
      }
     

      
    </div>
  );
}
