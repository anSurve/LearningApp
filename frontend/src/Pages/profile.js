import React, {useState, useEffect }  from 'react'
import NavbarLogged from '../Components/navbar_logged';  
import { Navigate } from "react-router-dom";
import NonEditableProfile from '../Components/profile_noneditable';

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
          const resp = await fetch("http://127.0.0.1:5000/api/get_user", opts)
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
        <NavbarLogged/>
        <center>
          <div className='row w-75' style={{height: '150px'}}>
            <div className='bg-info w-25 align-items-center'>
              <h2>Profile Page</h2>
            </div>
            <div className='bg-secondary text-white w-75 mt-10' style={{verticalAlign:'middle'}}>
              <div className='text-left' style={{ marginLeft: '15px', marginTop: '10px'}}>
                <h2>{ userData.first_name + ' ' + userData.last_name}</h2>
                <br/>
                { userData.email }
              </div>
            </div>
          </div>
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