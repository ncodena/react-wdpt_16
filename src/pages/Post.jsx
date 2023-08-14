import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Post = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((json) => setPost(json));
  }, [id])
console.log(post, 'post')
  return (
    <div>
    <button onClick={() => navigate(-1)}>Go back</button>
    {post ? (
      <div>
        <h3>{post.title}</h3>
      </div>
    ): null}

    </div>
  )
}

export default Post