import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {login} = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault();
    login(email, password, setLoading, setSuccess, setError);
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