import React, {useState, useEffect } from 'react'
import NavbarLogged from '../Components/navbar_logged'; 
import { Navigate  } from "react-router-dom";
import configData from "../config.json";

function Main(){
    const token = sessionStorage.getItem("token");
    const [name, setName] = useState();
    const [requestComplete, setRequestComplete] = useState(false);
    const [learningStats, setLearningStats] = useState();
    const [learningrRquestComplete, setLearningrRquestComplete] = useState(false);

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

    const fetchLearningStats = async () => {
      const opts = {
          method: "GET",
          headers: {"Content-Type": "application/json",
                    "Authorization": "Bearer " + token }
      }
      try{
          const resp = await fetch(configData.SERVER_URL + "/api/get_learning_stats", opts)
          if(resp.status !== 200) {
              alert("Error occured while fetching learning stats");
              setLearningStats("");
          }else{
              const data = await resp.json();
              setLearningStats(data.learning_stats);
              setLearningrRquestComplete(true);
          }
      }catch(error){
        setLearningStats("");
        setLearningrRquestComplete(true);
        alert("The API is down");
      }
    }

    useEffect(() => {
      if(!requestComplete){
        fetchUser();
      }
      if(!learningrRquestComplete){
        fetchLearningStats();
      }
    });

    if(requestComplete){
      if (!name || name === "" || name === undefined){
        sessionStorage.removeItem("token");
        console.log("redirecting")
        return <Navigate to="/signin"/>
      }
    }

    function LearningStats(props) {
      const learningStats = props.learningStats;
      const listTearnings = 
      <>
      <center>
      <div className='d-flex justify-content-center'>
        <div className="card mt-4" key={learningStats.registered_skills} style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Registered Learnings</h4>
            <div className="card-text text-primary"><h1>{ learningStats.registered_skills }</h1><br/></div>
          </div>
        </div>
        <div className="card ml-5 mt-4" key={learningStats.total_teachers} style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Teachers Interacted With</h4>
            <div className="card-text text-primary"><h1>{ learningStats.total_teachers }</h1><br/></div>
          </div>
        </div>
        </div>
        <div className='d-flex justify-content-center'>
        <div className="card mt-4" key={learningStats.finished_learnings} style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Learnings Finished</h4>
            <div className="card-text text-success"><h1>{ learningStats.finished_learnings }</h1><br/></div>
          </div>
        </div>
        <div className="card ml-5 mt-4" key={learningStats.ongoing_learnings} style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Learnings In Progress</h4>
            <div className="card-text text-warning"><h1>{ learningStats.ongoing_learnings }</h1><br/></div>
          </div>
        </div>
        </div>
        </center>
      </>
      return (
        <div className="container">{listTearnings}</div>
      );
    }




    return(
        <div className='text-center'>
            <NavbarLogged/>
            <br />
            <h2>Hi, <span style={{color:"Violet"}}>{ name }</span><br/>Your Learnings Till Date:</h2>
            <hr/>
            <center>
              {learningStats && <LearningStats learningStats={learningStats} />}
            </center>
        </div>
    );
}
export default Main;