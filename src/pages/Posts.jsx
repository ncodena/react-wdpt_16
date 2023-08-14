import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Posts = () => {

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => setPosts(json));
  }, [])

  console.log(posts, 'posts')
  return (
    <>
    {posts.length ? posts.map((post) => (
      <div key={post.id} onClick={() => navigate(`post/${post.id}`)}>
        {post.title}
      </div>
    )) : null}</>
  )
}

export default Posts