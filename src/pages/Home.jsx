import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ posts, onDeletePost, onAddComment }) => {
  // const [comments, setComments] = useState(posts.map(() => "")); // Initialize comment state for each post

  // const handleAddComment = (index, e) => {
  //   e.preventDefault();
  //   if (comments[index].trim() === "") return; // Prevent empty comments

  //   onAddComment(index, comments[index]);
  //   const newComments = [...comments];
  //   newComments[index] = ""; // Clear the input field for that specific post after submission
  //   setComments(newComments);
  // };

  // const handleCommentChange = (index, value) => {
  //   const newComments = [...comments];
  //   newComments[index] = value;
  //   setComments(newComments);
  // };

  return (
    <div style={{width:"100%"}}>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "2.5rem",
        }}
      >
        Posts
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              style={{
                border: "2px solid #ccc",
                margin: "10px",
                width: "50%",
                padding: "50px",
                borderRadius: "8px",
              }}
            >
              {/* <div>{user.name}</div> */}

              <Link to={`/post/${index}`}>
                <h3 style={{ padding: "10px" }}>{post.title}</h3>
              </Link>
              <div style={{
                      display:"flex",
                      justifyContent:"space-between"
                    }}>
                <Link to={`/post/${index}`}>
                  <button
                    style={{
                      color: "black",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    add comment
                  </button>
                </Link>

                <button
                  onClick={() => onDeletePost(index)}
                  style={{
                    backgroundColor: "#000000",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  delete
                </button>
              </div>
              {/* <div style={{ marginTop: "15px" }}>
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
              <form onSubmit={(e) => handleAddComment(index, e)}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comments[index]} // Bind the input value to the specific post's comment
                  onChange={(e) => handleCommentChange(index, e.target.value)}
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
                  Add Comment */}
              {/* </button> */}
              {/* </form> */}
              {/* </div> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
