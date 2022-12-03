import * as React from 'react';
import {useEffect, useState} from 'react';
import Navbar from '../Components/navbar'; 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from 'react-bootstrap/Button';
import configData from "../config.json";

export default function AboutUs(){
  const [skills, setSkills] = useState();
  const [requestComplete, setRequestComplete] = useState(false);

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

  useEffect(() => {
    if(!requestComplete){
      fetchSkills();
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
    </center>
    </div>
  );
}