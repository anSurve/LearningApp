import React, {useState, useEffect } from 'react'
import NavbarLogged from '../Components/navbar_logged'; 
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import configData from "../config.json";


function Learnings(){
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [learnings, setLearnings] = useState();
    const [requestLearningComplete, setLearningRequestComplete] = useState(false);

    const fetchLearnings = async () => {
      const opts = {
          method: "GET",
          headers: {"Content-Type": "application/json",
                    "Authorization": "Bearer " + token }
      }
      try{
          const resp = await fetch(configData.SERVER_URL + "/api/my_learnings", opts)
          if(resp.status !== 200) {
              alert("Error occured while fetching learnings");
              setLearnings("");
          }else{
              const data = await resp.json();
              setLearnings(data.past_learnings);
              setLearningRequestComplete(true);
          }
      }catch(error){
        setLearnings("");
        setLearningRequestComplete(true);
        alert("The API is down");
      }
   }


    useEffect(() => {
      if(!requestLearningComplete){
        fetchLearnings();
      }
    });


    const finishLearning = (learning_id) =>{
      navigate('/teacher_feedback/'+learning_id);
    }

    function LearningList(props) {
      const learnings = props.learnings;
      const listTearnings = learnings.map((learning) =>
        <div className="card float-left ml-4 mt-4" style={{ width:'20rem' }} key={learning.learning_id}>
          <div className="card-body">
            <h5 className="card-title">{learning.skill}</h5>
            <div className="card-text">Teacher : { learning.first_name + " " + learning.last_name}<br/>
              Start Date :  { learning.start_date }<br/>
              End Date :  { learning.end_date }<br/>
              {(learning.status === 'In-Progress') ?
                  <>
                    <div className='row'>
                      <div className='col'><span className="badge badge-success">{ learning.status }</span></div>
                      <div className='col'><Button variant="primary" className='btn btn-sm' 
                      style={{ verticalAlign:'top'}} 
                      onClick={(e) =>finishLearning(learning.learning_id)}>Mark Completed</Button></div>
                    </div>                  
                  </> :
                  <span className="badge badge-secondary mb-3">{ learning.status }</span>
              }
            </div>
          </div>
        </div>
      );
      return (
        <div className="container">{listTearnings}</div>
      );
    }

    return(
        <div className='text-center'>
            <NavbarLogged/><br/>
            <h2>My Learning dashboard</h2>
            <br/>
            
            {learnings && <LearningList learnings={learnings}/>}
            
        </div>
    );
}
export default Learnings;