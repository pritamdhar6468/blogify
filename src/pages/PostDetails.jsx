import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";

const PostDetail = ({ posts, onAddComment,onEditPost }) => {
  const { postId } = useParams();
  const post = posts[parseInt(postId)];

  if (!post) {
    return <p>Post not found.</p>;
  }


  let navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);

  const [comment, setComment] = React.useState("");


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(post.title); // Reset to original title
    setEditedContent(post.content); // Reset to original content
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    onEditPost(parseInt(postId), editedTitle, editedContent);
    setIsEditing(false);
  };
  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return; // Prevent empty comments

    onAddComment(parseInt(postId), comment);
    setComment(""); // Clear the input field after submission
  };
  const handleBack=(e)=>{
    e.preventDefault;
    navigate('/home')
  }

  return (
    <div style={{padding:"20px"}}>
        <button onClick={handleBack}>back</button>
      {isEditing ? (
        <form onSubmit={handleSaveEdit}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1.5rem",
              marginBottom: "10px",
            }}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows="10"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
            }}
          />
          <div>
            <button type="submit" style={buttonStyle}>
              Save
            </button>
            <button type="button" onClick={handleCancelEdit} style={buttonStyle}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <div>
            <button onClick={handleEdit} style={buttonStyle}>
              Edit
            </button>
            {/* <button onClick={handleDeletePost} style={buttonStyle}>
              Delete
            </button> */}
          </div>
        </div>
      )}


      <div style={{ marginTop: "15px" }}>
        <h4>Comments</h4>
        {post.comments && post.comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          post.comments &&
          post.comments.map((comment, index) => (
            <p
              key={index}
              style={{
                marginBottom: "10px",
                padding: "5px",
                borderLeft: "2px solid #007BFF",
              }}
            >
              {comment}
            </p>
          ))
        )}
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: "80%",
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            required
          />
          <button
            type="submit"
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

const buttonStyle = {
    margin: "5px",
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

export default PostDetail;
