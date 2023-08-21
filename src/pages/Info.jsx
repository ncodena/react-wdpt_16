import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Info() {
  const [quote, setQuote] = useState('');

  

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes'); // Replace with your API endpoint
      const newQuote = response.data[0]; // Adjust the property name according to your API response
      setQuote(newQuote);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote()

    const intervalId = setInterval(fetchQuote, 30000); // Fetch a new quote every 30 seconds

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  console.log(quote)

  return (
    <div>
      <h1>Random Quote:</h1>
      <p>{quote}</p>
    </div>
  );
}

export default Info;