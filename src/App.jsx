

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './elements/Navbar';
import Contact from './pages/Contact';
import FetchData from './pages/FetchData';
import Home from './pages/Home';
import Post from './pages/Post';
import Posts from './pages/Posts';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='posts' element={<Navbar />}>
          <Route index element={<Posts />} />
          <Route path="post/:id" element={<Post />} />
        </Route>
        <Route path='info' element={<Navbar />}>
          <Route index element={<FetchData />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
