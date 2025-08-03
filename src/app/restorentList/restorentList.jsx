'use client';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './restorentList.css';
import { restList } from './restorentDtata'; // Make sure the file name is correct

export default function RestorentList() {
  const [search, setSearch] = useState('');
  const [serch1, setSearch1] = useState(''); // using your original variable names

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

      {/* Display filtered data */}
      {restList
        .filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          (serch1 === '' || item.name.toLowerCase().includes(serch1.toLowerCase()))
        )
        .map(item => (
          <div key={item.name}>
            {item.name}
          </div>
        ))
      }

      <br /><br /><br />
      <h2>search type</h2>

      <select
        id="restaurant"
        name="restaurant"
        onChange={(h) => setSearch1(h.target.value)}
      >
        <option value="">All</option>
        <option value="knl">KNL</option>
        <option value="kushas">Kushas</option>
      </select>
    </div>
  );
}
