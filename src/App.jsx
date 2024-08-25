import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [posts, setPosts] = useState([]);

  // let Navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuth");
    if (authStatus === "true") {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  // Save posts to localStorage whenever posts state changes

  const addPost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const deletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  // Add a comment to a post
  const addComment = (index, comment) => {
    const updatedPosts = [...posts];

    // Ensure the comments array is initialized
    if (!Array.isArray(updatedPosts[index].comments)) {
      updatedPosts[index].comments = [];
    }

    updatedPosts[index].comments.push(comment);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const editPost = (index, title, content) => {
    const updatedPosts = [...posts];
    updatedPosts[index].title = title;
    updatedPosts[index].content = content;
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const signUserOut = () => {
    signOut(auth).then(() => {
      // Only clear authentication-related data
      localStorage.removeItem("isAuth"); // Remove only the auth-related data
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <Router>
      {isAuth ? (
        <>
        <div style={{display:'flex',}}>
          <Navbar isAuth={isAuth} signUserOut={signUserOut} />
          <Routes>
            <Route
              path="/home"
              element={
                <Home
                  posts={posts}
                  onDeletePost={deletePost}
                  onAddComment={addComment}
                />
              }
            />
            <Route
              path="/createpost"
              element={<CreatePost onAddPost={addPost} />}
            />
             <Route
              path="/post/:postId"
              element={<PostDetail posts={posts}  onEditPost={editPost} onAddComment={addComment} />}
            />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/home" element={<Navigate to="/home" />} /> */}
          </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/*" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
