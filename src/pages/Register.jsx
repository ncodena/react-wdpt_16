import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api_url = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { name, email, password };
    setLoading(true);
    try {
      const response = await axios.post(api_url + '/api/auth/register', payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      if(response.status === 201 ){
        setSuccess(true);
        setTimeout(() => {
            navigate('/sign-in');
        }, 3000);
      }
      
    } catch (e) {
        console.log(e )
      setError(e);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {success && <p>Register successful!</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <form onSubmit={handleSubmit} className='formBody'>
            <h1>Register</h1>
            <label>
            Name:
            <input type="text" required value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <br />
          <br />
          <button type="submit">Create your account</button>
        </form>
      )}
    </div>
  );
};

export default Register;