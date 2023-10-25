import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './elements/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path='*' element={<Navigate to={"/"} />} />
          </Route>
          <Route path="/*" element={<PublicRoutes />}>
            <Route path="sign-up" element={<Register />} />
            <Route path="sign-in" element={<Login />} />
            <Route path='*' element={<Navigate to={"/sign-in"} />} />
          </Route>
      </Routes>
    </>
  )
}

export default App;



