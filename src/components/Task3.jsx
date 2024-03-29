import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Task3.css';

function Task3() {
  const [prices, setPrices] = useState({}); // State to store cryptocurrency prices

  useEffect(() => {
    // Function to fetch cryptocurrency prices
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        setPrices(response.data.bpi); // Extract prices from the response
      } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error);
      }
    };

    fetchPrices(); // Call fetchPrices function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="crypto-container">
      {Object.keys(prices).map(currency => (
        <div key={currency} className="cryptocurrency-card">
          <h2>{currency}</h2>
          <div className="price">{prices[currency].rate}</div>
          <div className="currency">{prices[currency].description}</div>
        </div>
      ))}
    </div>
  );
}

export default Task3;
