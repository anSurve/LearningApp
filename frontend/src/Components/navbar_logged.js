import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate, useLocation  } from 'react-router-dom';

function NavbarLogged(){
    const navigate = useNavigate();
    const location = useLocation(); 
    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        navigate("/");
    }
    const getNavClasses = (tab) =>{
        let classes = "nav-item";
        let path = location.pathname.replace("/","").toUpperCase();
        let tab_proc = tab.toUpperCase();
        classes += path === tab_proc ? " active" : ""
        return classes
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand">Learning App</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className={getNavClasses("Home")}>
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className={getNavClasses("Profile")}>
                <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className={getNavClasses("Learnings")}>
                <Link className="nav-link" to="/learnings">My Learnings</Link>
            </li>
            <li className={getNavClasses("teacher_search")}>
                <Link className="nav-link" to="/teacher_search">Find Teacher</Link>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
                <Link className='text-white' to="/">
                    <button className='btn btn-primary btn-sm' onClick={logout}>Logout</button>
                </Link>
            </form>
        </div>
        </nav>
    );


}
 
export default NavbarLogged;