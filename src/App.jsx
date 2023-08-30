

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './elements/Navbar';
import MemeGenerator from './pages/Info';

function App() {

  return (
    <>
      <Routes>
        
        <Route path='/' element={<Navbar />}>
          <Route index element={<MemeGenerator />} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App
