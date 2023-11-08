import React, {useState, useEffect} from 'react'
import axios from 'axios';
const Home = () => {

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Define an async function
    const fetchFilms = async () => {
      const token = sessionStorage.getItem('jwt');
      
      try {
        // Make the GET request
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/films`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        // Update the films state with data from the response
        setFilms(response.data);

        // Set loading to false once the data is fetched
        setLoading(false);
      } catch (err) {
        // Handle any errors by updating the error state and setting loading to false
        setError(err);
      }finally{
        setLoading(false);
      }
    };
    // Call the async function
    fetchFilms();
  }, []); 
  return (
    <div>
      {films.length ? films.map((film) => (
        <div key={film._id}>
          <h2>{film.name}</h2>
          <img src={film.img} width={200}  alt={film.name}/>
          <p>{film.genre}</p>
        </div>
      )): null}
    </div>
  )
}

export default Home