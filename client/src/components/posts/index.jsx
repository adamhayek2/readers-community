import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/user/posts'; // Update with your API endpoint

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
        const response = await axios.post(apiUrl, {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  return (
    <div>
      
      
        {posts.map(post => (
            
          <div key={post.id}>
            {post.caption}
          </div>
        ))}
      
    </div>
  );
}

export default Posts;