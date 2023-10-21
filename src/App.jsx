

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './elements/Navbar';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Routes>
        
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App
