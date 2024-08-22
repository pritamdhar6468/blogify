import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Navbar from './components/Navbar';
import { useState } from 'react';
import {signOut} from 'firebase/auth'
import { auth } from "./firebase-config";

function App() {
  const [isAuth,setIsAuth]=useState(false)

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
        <Route path='/' element={<Home/>} />
       <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/createpost' element={<CreatePost/>} />
      </Routes>
    </Router>
  );
}

export default App;
