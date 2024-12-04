import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://social-media-backend-n9qa.onrender.com/api', // Replace with your backend base URL
  timeout: 10000, // Optional: timeout for requests (10 seconds)
});

export default axiosInstance;
