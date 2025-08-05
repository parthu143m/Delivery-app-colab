'use client';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './restorentList.css';
import { restList } from './restorentDtata'; // Make sure the file name is correc
import RestorentDisplay from './restorentDisplay'

export default function RestorentList() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState(''); // renamed for clarity

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
      <h1>search</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br /><br />
      <h2>search type</h2>

      <select
        id="restaurant"
        name="restaurant"
        onChange={(e) => setTypeFilter(e.target.value)}
        value={typeFilter}
      >
        <option value="">All</option>
        <option value="veg">veg</option>
        <option value="non-veg">non-veg</option>
      </select>

      {/* Display filtered data */}
      {restList
        .filter(item => {
          const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
          const matchesType = typeFilter === '' || item.type === typeFilter;
          return matchesSearch && matchesType;
        })
        .map(item => (
          <div>
         <RestorentDisplay
         key={item.id}
         name={item.name}
         place={item.place}
         
         />
         </div>
        ))
      }
    </div>
  );
}