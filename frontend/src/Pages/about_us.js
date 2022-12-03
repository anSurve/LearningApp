import * as React from 'react';
import {useEffect, useState} from 'react';
import Navbar from '../Components/navbar'; 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from 'react-bootstrap/Button';
import configData from "../config.json";
import HorizontalTimeline from "react-horizontal-timeline";


export default function AboutUs(){
  const [skills, setSkills] = useState();
  const [requestComplete, setRequestComplete] = useState(false);
  const [value, setValue] = useState(0);

  const [startDates, setStartDates] = useState();
  const [descriptions, setDescriptions] = useState();
  const [requestTimelineComplete, setRequestTimelineComplete] = useState(false);




  const [previous, setPrevious] = useState(0);
  const VALUES = ["2021-01-01", "2021-01-15","2021-03-22"];
  const description = [
    "The event of 1 Jan 2021 : Happy New Year",
    "The event of 15 Jan 2021 : Festival",
    "The event of 22 March 2021 : Board Exam",
  ];

  const submit = () => {
    let textVal = document.getElementById("combo-box-demo").value;
    console.log("Val ", textVal);
  }

  const fetchSkills = async () => {
    const opts = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }
    try{
        const resp = await fetch(configData.SERVER_URL + "/api/get_list_of_skills?", opts)
        if(resp.status !== 200) {
            alert("Error occured while fetching skills data");
            setSkills("");
        }else{
            const data = await resp.json();
            setSkills(data.skills_lst);
            setRequestComplete(true);
        }
    }catch(error){
      setRequestComplete(true);
      alert("The API is down");
    }
 }

  const fetchLearningTimeline = async () => {
    const opts = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
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
      fetchSkills();
    }
    if(!requestTimelineComplete){
      fetchLearningTimeline();
    }
  });

  return (
    <div>
    <Navbar />
    <br/>
    <center>
      {skills && 
        <>
        <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={skills}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Skill" />}
        />
        </div>
        
        <br/>
        <Button variant="primary" className='col-sm-4 mb-2' onClick={submit}>
              Submit
        </Button> </> }
        <br/>
        { startDates && descriptions &&
          <div style={{marginTop:'150px', textAlign:'center'}}>
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