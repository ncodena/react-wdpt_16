import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const UserContext = createContext();


const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    // Initialize user state to null
    const [user, setUser] = useState(null);
    // Get the initial token from sessionStorage
    const [token, setToken] = useState(sessionStorage.getItem('jwt') || null);


  const login = async (email, password, setError, setSuccess, setLoading, navigate) => {
    setLoading(true);
    const api_url = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(`${api_url}/api/auth/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { token, user } = response.data;
      sessionStorage.setItem('jwt', token);
      setToken(token);
      setUser(user);  // Assuming you want to store the user
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('jwt');
    navigate("/sign-in");
  };


 
 
  // useEffect hook to load the user data on component mount
  useEffect(() => {
      // Define a function to fetch user data
      const fetchUserData = async () => {
          // If there's a token set in the state, try to get the user data
          if (token) {
              const api_url = import.meta.env.VITE_BACKEND_URL;
              try {
                  const response = await axios.get(`${api_url}/api/students/user`, {
                      headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                      }
                  });
                  // Set the user data on successful response
                  setUser(response.data);
              } catch (e) {
                  console.error('Failed to fetch user data:', e);
                   logout();
                  // Handle failure to fetch user data (e.g., by logging out the user)


              }
          }
      };


      fetchUserData();
  }, [token]);




  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserProvider;