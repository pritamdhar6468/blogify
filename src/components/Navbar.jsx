import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar = ({signUserOut,isAuth}) => {
  return (
    <nav className="navbar">
            <Link to="/home" className="heading"><h1>Blogify</h1></Link>

      <div className="nav-link">
      <Link to="/createpost">
        <button className="navbar-button">Create a Post</button>
      </Link>
      <Link to="/home" className="link-color">Home</Link>
      <Link to="/profile" className="link-color">Profile</Link>
      <button className="log-out-btn" onClick={signUserOut}>Log out</button>
      {/* {!isAuth ? <Link to="/login" className="link-color">Login</Link> : <button onClick={signUserOut}>Log out</button>} */}

      {/* <div className="profile-circle"></div> */}
      </div>
    </nav>
  );
};

export default Navbar;
