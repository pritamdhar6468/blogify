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
    <div  style={{height:"90vh",display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
      <p style={{fontSize:"2rem",marginBottom:'10px'}}>Sign in with Google to continue</p>
      <button style={{fontSize:"1.2rem",cursor:"pointer"}} className="login-with-google-btn" onClick={signinWithGoogle} >Sign in with Google</button>
    </div>
  );
};

export default Login;
