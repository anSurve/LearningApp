import React from 'react'
import Navbar from '../Components/navbar'; 
import { useNavigate } from "react-router-dom";

function Home(){
    
    const token = sessionStorage.getItem("token");
    const name = sessionStorage.getItem("name");
    const isLoggedIn = (token &&  token !== "" && token !== undefined && name && name !== "" && name !== undefined);
    const navigate = useNavigate();
  
    React.useEffect(() => {
      if (isLoggedIn) {
        navigate('/home');
      }
    });

    return(
        <div className='text-center'>
        <Navbar/>
        <h2>Home Page</h2>
            <h2>Welcome to my Website!!</h2>
        </div>
    );
}
export default Home;