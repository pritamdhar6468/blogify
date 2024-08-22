import React from "react";
import { useState } from "react";

const Home = ({ posts,onDeletePost, onAddComment }) => {

  const [comment, setComment] = useState('');

  
  const handleAddComment = (index, e) => {
    e.preventDefault();
    if (comment.trim() === '') return; // Prevent empty comments
    onAddComment(index, comment);
    setComment('');
  };

  return (
    <div>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post, index) => (
          <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => onDeletePost(index)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>

            <div style={{ marginTop: '15px' }}>
              <h4>Comments</h4>
              {post.comments && post.comments.length === 0  ? (
                <p>No comments yet.</p>
              ) : (
                post.comments && post.comments.map((comment, i) => (
                  <p key={i} style={{ marginBottom: '10px', padding: '5px', borderLeft: '2px solid #007BFF' }}>{comment}</p>
                ))
              )}
              <form onSubmit={(e) => handleAddComment(index, e)}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment( e.target.value)}
                  style={{ width: '80%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  required
                />
                <button  type="submit" style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Add Comment
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
