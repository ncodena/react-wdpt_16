import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [date, setDate] = useState(new Date());

    const tick = () => {
        setDate(new Date());
    }

    useEffect(() => {
        const timer = setInterval(tick, 1000);
        return() => clearInterval(timer)
    }, [])

    useEffect(() => {
        console.log('date updated', date)
    }, [date])
    

  return (
    <div>this is {date.toLocaleTimeString()}</div>
  )
}

export default Clock