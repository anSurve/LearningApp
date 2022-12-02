import React, {useState, useEffect } from 'react'
import NavbarLoggedTeacher from '../Components/navbar_logged_teacher'; 
import { Navigate  } from "react-router-dom";
import configData from "../config.json";

function TeacherMain(){
    const token = sessionStorage.getItem("token");
    const [name, setName] = useState();
    const [requestComplete, setRequestComplete] = useState(false);
    const [teachingStats, setTeachingStats] = useState();
    const [teachingrRquestComplete, setTeachingrRquestComplete] = useState(false);

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
    
    const fetchTeachingStats = async () => {
      const opts = {
          method: "GET",
          headers: {"Content-Type": "application/json",
                    "Authorization": "Bearer " + token }
      }
      try{
          const resp = await fetch(configData.SERVER_URL + "/api/get_teaching_stats", opts)
          if(resp.status !== 200) {
              alert("Error occured while fetching learning stats");
              setTeachingStats("");
          }else{
              const data = await resp.json();
              setTeachingStats(data.teaching_stats);
              setTeachingrRquestComplete(true);
          }
      }catch(error){
        setTeachingStats("");
        setTeachingrRquestComplete(true);
        alert("The API is down");
      }
    }

    useEffect(() => {
      if(!requestComplete){
        fetchUser();
      }
      if(!teachingrRquestComplete){
        fetchTeachingStats();
      }
    });

    if(requestComplete){
      if (!name || name === "" || name === undefined){
        sessionStorage.removeItem("token");
        console.log("redirecting")
        return <Navigate to="/signin"/>
      }
    }

    function TeachingStats(props) {
      const teachingStats = props.teachingStats;
      const listTeachStats = 
      <>
      <center>
      <div className='d-flex justify-content-center'>
        <div className="card mt-4" style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Registered Skills</h4>
            <div className="card-text text-primary"><h1>{ teachingStats.registered_skills }</h1><br/></div>
          </div>
        </div>
        <div className="card ml-5 mt-4" style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Students Interacted With</h4>
            <div className="card-text text-primary"><h1>{ teachingStats.total_students }</h1><br/></div>
          </div>
        </div>
        </div>
        <div className='d-flex justify-content-center'>
        <div className="card mt-4" style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Teachings Finished</h4>
            <div className="card-text text-success"><h1>{ teachingStats.finished_teachings }</h1><br/></div>
          </div>
        </div>
        <div className="card ml-5 mt-4" style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Teachings In Progress</h4>
            <div className="card-text text-warning"><h1>{ teachingStats.ongoing_teachings }</h1><br/></div>
          </div>
        </div>
        </div>
        </center>
      </>
      return (
        <div className="container">{listTeachStats}</div>
      );
    }

    return(
        <div className='text-center'>
            <NavbarLoggedTeacher/>
            <br />
            <h2>Hi, <span style={{color:"Violet"}}>{ name }</span><br/>Your Teachings Till Date:</h2>
            <hr/>
            <center>
              {teachingStats && <TeachingStats teachingStats={teachingStats} />}
            </center>
        </div>
    );
}
export default TeacherMain;