import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Navbar from './components/Navbar';
import { useState,useEffect } from 'react';
import {signOut} from 'firebase/auth'
import { auth } from "./firebase-config";

function App() {
  const [isAuth,setIsAuth]=useState(false)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  // Save posts to localStorage whenever posts state changes
 

  const addPost = (newPost) => {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const deletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
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
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
};

  const signUserOut = ()=>{
    signOut(auth).then(()=>{
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname='/login'
    })
  }
  return (
    <Router>
      <Navbar isAuth={isAuth} signUserOut={signUserOut}/>
      <Routes>
        <Route path='/' element={<Home posts={posts} onDeletePost={deletePost} onAddComment={addComment}/>} />
       <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/createpost' element={<CreatePost onAddPost={addPost}/>} />
      </Routes>
    </Router>
  );
}

export default App;
