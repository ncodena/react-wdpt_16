import React, {useState, useEffect} from 'react'
import axios from 'axios';
const Home = () => {

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [file, setFile] = useState(null);
  const token = sessionStorage.getItem('jwt');

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('year', year);
    formData.append('genre', genre);

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/films`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        setFilms([...films, response.data]);
    } catch (error) {
        console.error(error.response.data);
    }
};

  useEffect(() => {
    // Define an async function
    const fetchFilms = async () => {
      
      
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
           <img src={`data:image/jpeg;base64,${film.img}`} alt={film.name} width={200}/>
          <p>{film.genre}</p>
        </div>
      )): null}


      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value) } />
        <input type="number" placeholder="Year" onChange={(e) => setYear(e.target.value)} />
        <input type="text" placeholder="Genre" onChange={(e) => setGenre(e.target.value)} />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Create Film</button>
      </form>
    </div>
  )
}

export default Home