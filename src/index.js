import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PostProvider } from './context/PostContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <PostProvider>
        <App />
      </PostProvider>
    </React.StrictMode>
  </BrowserRouter>
);


