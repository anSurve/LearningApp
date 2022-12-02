import React, {useState, useEffect }  from 'react'
import NavbarLogged from '../Components/navbar_logged';  
import NavbarLoggedTeacher from '../Components/navbar_logged_teacher'; 
import { Navigate } from "react-router-dom";
import NonEditableProfile from '../Components/profile_noneditable';
import configData from "../config.json";

function Profile(){
    
  const token = sessionStorage.getItem("token");
  const [userData, setuserData] = useState({});
  const [requestComplete, setRequestComplete] = useState(false);

  const fetchUser = async () => {
      const opts = {
          method: "GET",
          headers: {"Content-Type": "application/json",
                    "Authorization": "Bearer " + token }
      }
      try{
          const resp = await fetch(configData.SERVER_URL + "/api/get_user", opts)
          if(resp.status !== 200) {
              alert("Error occured while fetching user");
              setuserData("");
          }else{
              const data = await resp.json();
              //console.log(data);
              setuserData(data);
              setRequestComplete(true);
          }
      }catch(error){
        setuserData("");
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
    if (!userData || userData === {} || userData === "" || userData === undefined){
      sessionStorage.removeItem("token");
      console.log("redirecting")
      return <Navigate to="/signin"/>
    }
  }

    return(
        <div className='text-center'>
          {userData.role === "Student" ? <NavbarLogged/> : <NavbarLoggedTeacher/>}
        
        <center>
          <div className='row w-75' style={{height: '150px', verticalAlign:'middle'}}>
            <div className='bg-info w-25 align-items-center' style={{borderRadius:'85px'}}>
              <h2 style={{marginTop: '50px'}}>Profile Page</h2>
            </div>
            <div className='text-white w-75 mt-10' style={{borderRadius:'85px', backgroundColor:'SlateBlue'}}>
              <div className='text-center' style={{ marginLeft: '15px', marginTop: '10px', VerticalAlign:'middle'}}>
                <h2 style={{marginTop: '40px'}}>{ userData.first_name + ' ' + userData.last_name}</h2>
                { userData.email }
              </div>
            </div>
          </div>
          <br/>
          <div className='w-75' style={{marginTop:'15px'}}>
            <NonEditableProfile
            user_data={userData}
            />
          </div>
          </center>
        </div>
    );
}
export default Profile;