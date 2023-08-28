

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './elements/Navbar';
import Contact from './pages/Contact';
import FetchData from './pages/FetchData';
import Home from './pages/Home';
import Post from './pages/Post';
import Posts from './pages/Posts';
import TodoList from './pages/TodoList';
import Quote from './pages/Info';

function App() {

  return (
    <>
      <Routes>
        
        <Route path='/' element={<Navbar />}>
          <Route index element={<TodoList />} />
          <Route path="info" element={<Quote />} />
          <Route path="posts" element={<Posts />} />
          <Route path="post/:id" element={<Post />} />
        </Route>
        
      </Routes>
    </>
  )
}

export default App
