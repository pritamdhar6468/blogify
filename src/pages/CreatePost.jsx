import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const CreatePost = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const newPost = { title, content, comments: [] };
    onAddPost(newPost);
    // Clear form fields after submission
    setTitle("");
    setContent("");
    navigate("/home");
  };

  return (
    <div style={{width:"100%"}}>
      <h1>Create a Post</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height:"50vh"
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{width:"500px",}}>
            <input
              style={{width:"500px",height:"40px",outline:"none",fontSize:"15px"}}
              type="text"
              placeholder="Enter the title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            {/* <label htmlFor="content">Content:</label> */}
            <textarea
            style={{width:"500px",height:"200px",outline:"none",fontSize:"25px"}}
              id="content"
              placeholder="Enter the content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button style={{width:"100px",height:"50px",fontSize:"20px",border:"none",borderRadius:"5px",cursor:"pointer"}} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
