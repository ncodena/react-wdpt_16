import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api_url = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { email, password };
    setLoading(true);
    try {
      const response = await axios.post(api_url + '/api/auth/login', payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { token } = response.data;
      sessionStorage.setItem('jwt', token);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (e) {
        console.log(e.response.data)
      setError(e.response.data);
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
      {success && <p>Login successful!</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
            <form onSubmit={handleSubmit} className='formBody'>
                <h1>Login</h1>
            <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <br />
            <br />
            <button type="submit">Submit</button>
            </form>
        </>
      )}
    </div>
  );
};

export default Login;