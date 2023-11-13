import React, {useState, useEffect} from 'react'
import axios from 'axios';
const Home = () => {

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [file, setFile] = useState(null);
  const token = sessionStorage.getItem('jwt');

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/films/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/films/images`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };

    fetchImages();
  }, []);


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
          <img src={film.img} width={200}  alt={film.name}/>
          <p>{film.genre}</p>
        </div>
      )): null}

      <select>
        {films.length ? 
        //  <option value="">--Please choose an option--</option>
        films.map(city => (
          <option value={city._id}>{city.name}</option>
          ))
        :null}
      </select>

      <form onSubmit={submitHandler}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      {images.length ? images.map((image, index) => (
        <div key={index}>
          <h3>{image.filename}</h3>
          <img src={`data:${image.contentType};base64,${image.imageBase64}`} alt={image.filename} />
        </div>
      )) : null}
    </div>
  )
}

export default Home