import axios from 'axios';
import React, { createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserProvider= ({children}) => {
    const navigate = useNavigate();
    //Initialize user satte to null
    const [user, setUser] = useState(null);
    // the initial state for token from sessionStorage
    const [token, setToken] = useState(sessionStorage.getItem('jwt') || null);

    const api_url = import.meta.env.VITE_BACKEND_URL;


    const login = async (email, password, setLoading, setSuccess, setError ) => {
        const payload = { email, password };
        setLoading(true);
        try {
            const response = await axios.post(api_url + '/api/auth/login', payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            const { token, user } = response.data;
            sessionStorage.setItem('jwt', token);
            setUser(user);
            setToken(token);
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

    const logout = () => {
        sessionStorage.removeItem('jwt')
        setUser(null)
        setToken(null)
        navigate("/sign-in");
    }


  return (
    <UserContext.Provider value={{user, token, login, logout}}>{children}</UserContext.Provider>
  )
}

export default UserProvider