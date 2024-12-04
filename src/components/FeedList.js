import React, { useContext } from 'react';
import axios from 'axios';
import { PostContext } from '../context/PostContext';

const FeedList = () => {
  const { posts, setPosts } = useContext(PostContext);

  // Handle like/unlike action
  const toggleLike = async (postId, isLiked) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token
        },
      };

      if (isLiked) {
        // If already liked, send DELETE request
        await axios.delete('http://localhost:5000/api/likes', {
          data: { postId }, // Body for DELETE request
          ...config,
        });
      } else {
        // If not liked, send POST request
        await axios.post('http://localhost:5000/api/likes', { postId }, config);
      }

      // Update the post's like status and count
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                currentUserLiked: !isLiked,
                likeCount: post.likeCount + (isLiked ? -1 : 1),
              }
            : post
        )
      );
    } catch (error) {
      console.error('Error toggling like:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="card mb-3 mx-5" key={post._id}>
            <div className="card-body">
              {post.user.email && <h5 className="card-title">{post.user.email}</h5>}
              <p className="card-text">{post.content}</p>
              <div className="d-flex align-items-center">
                {/* Like button */}
                <button
                  className="btn btn-sm"
                  style={{ color: post.currentUserLiked ? 'red' : 'black' }} // Conditional color
                  onClick={() => toggleLike(post._id, post.currentUserLiked)} // Handle like toggle
                >
                  <i className={`bi ${post.currentUserLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </button>

                {/* Like count */}
                <span className="ms-2">
                  {post.likeCount} {post.likeCount === 1 ? 'Like' : 'Likes'}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No posts available yet!</p>
      )}
    </div>
  );
};

export default FeedList;
