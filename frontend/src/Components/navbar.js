import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate, useLocation  } from 'react-router-dom';


function Navbar(){
    
    const location = useLocation(); 
    const getNavClasses = (tab) =>{
        let classes = "nav-item";
        let path = location.pathname.replace("/","").toUpperCase();
        let tab_proc = tab.toUpperCase();
        classes += path === tab_proc ? " active" : ""
        return classes
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Learning App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className={getNavClasses("")}>
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className={getNavClasses("about_us")}>
                <Link className="nav-link" to="/about_us">About Us</Link>
            </li>
            <li className={getNavClasses("contact_me")}>
                <Link className="nav-link" to="/contact_me">Contact Me</Link>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className={getNavClasses("signin")}>
                    <Link className="nav-link" to="/signin">Login &nbsp;&nbsp;/</Link></li> 
                <li className={getNavClasses("signup")}>
                    <Link className="nav-link" to="/signup">Sign Up</Link></li>
                </ul>
            </form>
        </div>
        </nav>
    );
    }
 
export default Navbar;