import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quote = () => {

    const [quote, setQuote] = useState('')

    const fetchQuote = async () => {
        try{
            const getData = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
            //console.log(getData.data[0])
            setQuote(getData.data[0])
        } catch(error) {
            console.log(error, 'error fetching data')
        }
        
    } 

    useEffect(() => {
        // setInterval(() => {
        //     fetchQuote()
        //     return clearInterval
        // }, 2000)
        const interval = setInterval(fetchQuote, 5000);

        return () => {
            clearInterval(interval)
        }
        
    }, [])

    

  return (
    <div>
      <h1>Random Quote:</h1>
      {quote}
    </div>
  );
}

export default Quote;