import React from "react";
import { auth, provider } from "../firebase-config";
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from "react-router-dom";

const Login = ({setIsAuth}) => {
    let navigate = useNavigate();
  const signinWithGoogle = () => {
    signInWithPopup(auth,provider).then((result)=>{
        localStorage.setItem('isAuth',true);
        setIsAuth(true);
        navigate('/')
    })
  };
  return (
    <div className="login-page">
      <p>Sign in with Google to continue</p>
      <button className="login-with-google-btn" onClick={signinWithGoogle} >Sign in with Google</button>
    </div>
  );
};

export default Login;
