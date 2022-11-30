import React, {useState, useEffect } from 'react'
import NavbarLogged from '../Components/navbar_logged'; 
import { Navigate  } from "react-router-dom";


function Main(){
    const token = sessionStorage.getItem("token");
    const [name, setName] = useState();
    const [requestComplete, setRequestComplete] = useState(false);

    const fetchUser = async () => {
        const opts = {
            method: "GET",
            headers: {"Content-Type": "application/json",
                      "Authorization": "Bearer " + token }
        }
        try{
            const resp = await fetch("http://127.0.0.1:5000/api/get_user", opts)
            if(resp.status !== 200) {
                alert("Error occured while fetching user");
                setName("");
            }else{
                const data = await resp.json();
                setName(data.first_name + " " + data.last_name);
                setRequestComplete(true);
            }
        }catch(error){
          setName("");
          setRequestComplete(true);
          alert("The API is down");
        }
    }

    useEffect(() => {
      if(!requestComplete){
        fetchUser();
      }
    });

    if(requestComplete){
      if (!name || name === "" || name === undefined){
        sessionStorage.removeItem("token");
        console.log("redirecting")
        return <Navigate to="/signin"/>
      }
    }
    return(
        <div className='text-center'>
            <NavbarLogged/>
            <h2>Home Page</h2>
            You are logged in as - '{ name }'
        </div>
    );
}
export default Main;