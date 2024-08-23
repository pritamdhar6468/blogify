import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const CreatePost = ({onAddPost}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  let navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const newPost = { title, content,comments: []  };
    onAddPost(newPost);
    // Clear form fields after submission
    setTitle('');
    setContent('');
    navigate('/home')
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
     
    
  );
}

export default CreatePost;
