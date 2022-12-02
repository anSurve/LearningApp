import React, {useState, useEffect } from 'react';
import NavbarLoggedTeacher from '../Components/navbar_logged_teacher'; 
import configData from "../config.json";

function Teachings(){
    const token = sessionStorage.getItem("token");
    const [teachings, setteachings] = useState();
    const [requestTeachingComplete, setTeachingRequestComplete] = useState(false);

    const fetchteachings = async () => {
      const opts = {
          method: "GET",
          headers: {"Content-Type": "application/json",
                    "Authorization": "Bearer " + token }
      }
      try{
          const resp = await fetch(configData.SERVER_URL + "/api/my_teachings", opts)
          if(resp.status !== 200) {
              alert("Error occured while fetching teachings");
              setteachings("");
          }else{
              const data = await resp.json();
              setteachings(data.past_teachings);
              setTeachingRequestComplete(true);
          }
      }catch(error){
        setteachings("");
        setTeachingRequestComplete(true);
        alert("The API is down");
      }
   }


    useEffect(() => {
      if(!requestTeachingComplete){
        fetchteachings();
      }
    });

    function TeachingList(props) {
      const teachings = props.teachings;
      const listTeachings = teachings.map((teaching) =>
        <div className="card float-left ml-4 mt-4" style={{ width:'20rem' }} key={teaching.teaching_id}>
          <div className="card-body">
            <h5 className="card-title">{teaching.skill}</h5>
            <div className="card-text">Teacher : { teaching.first_name + " " + teaching.last_name}<br/>
              Start Date :  { teaching.start_date }<br/>
              End Date :  { teaching.end_date }<br/>
              {(teaching.status === 'In-Progress') ?
                  <>
                    <div className='row'>
                      <div className='col'><span className="badge badge-success">{ teaching.status }</span></div>
                    </div>                  
                  </> :
                  <span className="badge badge-secondary mb-3">{ teaching.status }</span>
              }
            </div>
          </div>
        </div>
      );
      return (
        <div className="container">{listTeachings}</div>
      );
    }

    return(
        <div className='text-center'>
            <NavbarLoggedTeacher/><br/>
            <h2>My Teaching dashboard</h2>
            <br/>
            
            {teachings && <TeachingList teachings={teachings}/>}
            
        </div>
    );
}
export default Teachings;