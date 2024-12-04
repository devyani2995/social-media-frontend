import { useContext, useState } from 'react';
import axios from 'axios';
import { PostContext } from '../context/PostContext';

  
const PostForm = () => {
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { addPost } = useContext(PostContext);

  const handleInputChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!postContent.trim()) {
      setError('Post content cannot be empty.');
      return;
    }

    setLoading(true);

    try {
      // Make the API request
      const response = await axios.post(
        'http://localhost:5000/api/posts', // Replace with your actual API URL
        { content: postContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token logic
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("resp",response)
      addPost(response.data); // Add new post to the context
      setSuccess('Post created successfully!');
      setPostContent(''); // Clear the textbox
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to create the post. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="card-title text-center mb-3">Create a Post</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Write something..."
              value={postContent}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          <div className="text-center mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </div>
    </div>
  );
};

export default PostForm;
