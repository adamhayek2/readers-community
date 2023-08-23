import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Feed from '../../api/Feed';
import {ReactComponent as HeartSvg} from '../../images/HeartSvg.svg'

const apiUrl = 'http://localhost:8000/posts/feed';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
        const response = await Feed()
      setPosts(response);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  return (
    <div  className='w-full flex flex-col justify-center gap-16 items-center mt-20'>
      
        {posts.map(post => (
            
          <div key={post._id} className='w-1/2 bg-blue-300 rounded-2xl drop-shadow-lg '>
              <div className='flex flex-row w-full justify-between p-7'>
                <div>Post by: {post.user.name}</div>
                <div>
                  <HeartSvg width={20} height={20}/>
                </div>
              </div>
              <div className='w-full bg-white p-7 rounded-2xl flex flex-row'>
                <div className='w-24'>
                  <img src={`http://localhost:8000/images/${post.picture}`}  />
                </div>
                <div>
                  <div>{post.book_name}</div>
                  <div>{post.author}</div>
                  <div>{post.review}</div>
                </div>
              </div>
            
          </div>
        ))}
      
    </div>
  );
}

export default Posts;