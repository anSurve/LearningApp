import React, {useState, useEffect } from 'react'
import NavbarLogged from '../Components/navbar_logged'; 
import { Navigate  } from "react-router-dom";
import configData from "../config.json";
import HorizontalTimeline from "react-horizontal-timeline";

function Main(){
    const token = sessionStorage.getItem("token");
    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [requestComplete, setRequestComplete] = useState(false);
    const [learningStats, setLearningStats] = useState();
    const [learningrRquestComplete, setLearningrRquestComplete] = useState(false);
    
    const [previous, setPrevious] = useState(0);
    const [value, setValue] = useState(0);
    const [startDates, setStartDates] = useState();
    const [descriptions, setDescriptions] = useState();
    const [requestTimelineComplete, setRequestTimelineComplete] = useState(false);

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
                setRole(data.role)
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

    const fetchLearningTimeline = async () => {
      const opts = {
          method: "GET",
          headers: {"Content-Type": "application/json",
                    "Authorization": "Bearer " + token }
      }
      try{
          const resp = await fetch(configData.SERVER_URL + "/api/my_learning_timeline?", opts)
          if(resp.status !== 200) {
              alert("Error occured while fetching skills data");
              setDescriptions("");
              setStartDates("");
          }else{
              const data = await resp.json();
              setStartDates(data.learning_start_dates);
              setDescriptions(data.learning_descriptions);
              setRequestTimelineComplete(true);
          }
      }catch(error){
        setRequestTimelineComplete(true);
        alert("The API is down");
      }
    }
    useEffect(() => {
      if(!requestComplete){
        fetchUser();
      }
      if (requestComplete && role==="Student"){
        if(!learningrRquestComplete){
          fetchLearningStats();
        }
      }
      
      if(!requestTimelineComplete){
        fetchLearningTimeline();
      }
    });

    if(requestComplete){
      if (!name || name === "" || name === undefined){
        sessionStorage.removeItem("token");
        console.log("redirecting")
        return <Navigate to="/signin"/>
      }
      
      if(role==="Teacher"){
        console.log("redirecting to teacher view")
        return <Navigate to="/teacher_home"/>
      }
    }

    function LearningStats(props) {
      const learningStats = props.learningStats;
      const listTearnings = 
      <>
      <center>
      <div className='d-flex justify-content-center'>
        <div className="card mt-4" style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Registered Learnings</h4>
            <div className="card-text text-primary"><h1>{ learningStats.registered_skills }</h1></div>
          </div>
        </div>
        <div className="card ml-5 mt-4" style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Teachers Interacted With</h4>
            <div className="card-text text-primary"><h1>{ learningStats.total_teachers }</h1></div>
          </div>
        </div>
        </div>
        <div className='d-flex justify-content-center'>
        <div className="card mt-4" style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Learnings Finished</h4>
            <div className="card-text text-success"><h1>{ learningStats.finished_learnings }</h1></div>
          </div>
        </div>
        <div className="card ml-5 mt-4" style={{width: '25rem'}}>
          <div className="card-body">
            <h4 className="card-title">No of Learnings In Progress</h4>
            <div className="card-text text-warning"><h1>{ learningStats.ongoing_learnings }</h1></div>
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
            <h2>Hi, <span style={{color:"Violet"}}>{ name }</span>, Here are Your Learnings Till Date:</h2>
            <hr/>
            <center>
              {learningStats && <LearningStats learningStats={learningStats} />}

              <br/><hr/>
              <h2>Your Learning Timeline</h2>
              { startDates && descriptions &&
                <div style={{marginTop:'50px', textAlign:'center'}}>
                <div style={{ width: "60%",
                              height: "100px", 
                              margin: "0 auto" }}>
                  <HorizontalTimeline
                    styles={{ outline: "#DFA867", foreground: "#19295C" }}
                    index={value}
                    indexClick={(index) => {
                      setValue(index);
                      setPrevious(value);
                    }}
                    values={startDates}
                  />
                </div>
                <div className="text-center" style={{textAlign:'center'}}>{descriptions[value]}</div>
                </div>
              }
            </center>
        </div>
    );
}
export default Main;