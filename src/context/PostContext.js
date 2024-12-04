import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Post Context
const PostContext = createContext();

// Cache key and expiration time (10 minutes in milliseconds)
const CACHE_KEY = 'cachedPosts';
const CACHE_EXPIRATION = 10 * 60 * 1000;

// PostProvider Component
const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); // Posts state
  const token = localStorage.getItem('token');

  // Function to save data to cache
  const saveToCache = (data) => {
    const cacheData = {
      posts: data,
      timestamp: Date.now(), // Save the current timestamp
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  };

  // Function to load data from cache
  const loadFromCache = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const isCacheValid = Date.now() - parsedData.timestamp < CACHE_EXPIRATION;
      if (isCacheValid) {
        return parsedData.posts; // Return cached posts if valid
      } else {
        localStorage.removeItem(CACHE_KEY); // Invalidate cache
      }
    }
    return null; // No valid cached data
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`, // Adjust as per your auth setup
          },
        });
        const fetchedPosts = response.data;
        setPosts(fetchedPosts); // Update state
        saveToCache(fetchedPosts); // Update cache
      } catch (error) {
        console.error('Failed to fetch posts:', error.response?.data?.message || error.message);
      }
    };

    if (token) {
      const cachedPosts = loadFromCache();
      if (cachedPosts) {
        setPosts(cachedPosts); // Load from cache if valid
      } else {
        fetchPosts(); // Fetch fresh data if no valid cache
      }
    }
  }, [token]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the top of the feed
    saveToCache([newPost, ...posts]); // Update the cache with the new post
  };

  return (
    <PostContext.Provider value={{ posts, addPost, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
