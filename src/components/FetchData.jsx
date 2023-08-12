import React from 'react';
import { useEffect, useState } from 'react';

const FetchData = () => {
const [data, setData] = useState([]);


   useEffect(() => {
        myFetchFunction();
   }, []);

   
   const myFetchFunction = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
        if(!response.ok){
            throw new Error(`The fetch has failed with status ${response.status}`);
        }

        return response.json();
    })
    
    .then((data) => {
        setData(data)
    })
    .catch((error) => {
        console.log('error', error)
    })
    .finally(() => {
        console.log('fetch completed')
    })
   }

   const sendRequest = async () => {

    const dataToSend = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
            })

            if(!response.ok){
                throw new Error(`The fetch has failed with status ${response.status}`);
            }

            const dataReceived = await response.json();

            console.log(dataReceived, 'received')

        } catch(error){
            console.log(error, 'error')

        } finally {
            console.log('request and response completed')
        }

   }

  return (
    <div>
        {data.length ? data.map((post) => (
            <div key={post.id}>{post.title}</div>
        )) : null}
        <button onClick={sendRequest}>Post request</button>
    </div>
  )
}

export default FetchData