//First, you need to import the useState function from the React library.
import React, { useState, useEffect } from 'react';

const Hooks = () => {

    const [counter, setCounter] = useState(0);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log('the loader state changed', loader)
    }, [loader])

    useEffect(() => {
        console.log('the counter state changed', counter)
    }, [counter])

    const requestRejected = () => {
        setLoader(false);
        setError("there was a problem fetching your data");
    }

   
  return (
    <div>
        <p>Counter: {counter}</p>
        <button onClick={() => setCounter(counter + 1)}>Increment counter</button>
        <button onClick={() => setCounter(counter - 1)}>Decrement counter</button>
        {loader ? (
            <div>it is loading</div>
        ) : null}

        <button onClick={() => setLoader(true)}>loader to true</button>
        <button onClick={requestRejected}>loader to false</button>
        {error.length ? (
            error
        ) : null}

        <button onClick={() => setLoader(!loader)}>toggle</button>
    </div>
  )
}

export default Hooks