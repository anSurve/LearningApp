import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class Navbar extends Component {
    render() { 
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Learning App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about_us">About Us</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contact_me">Contact Me</Link>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin">Login &nbsp;&nbsp;/</Link></li> 
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Sign Up</Link></li>
                    </ul>
                </form>
            </div>
            </nav>
        );
    }
}
 
export default Navbar;