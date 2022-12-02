import React from 'react';
import Navbar from '../Components/navbar'; 
import GoogleApi from '../Components/google_api';
import { useNavigate } from 'react-router-dom';
import configData from "../config.json";

function Signup2(){

    const navigate = useNavigate();
    const location_details = {
            lat:  50,
            lon: 30,
            zoom: 6,
            city:"",
            locality:"",
            state:"",
            postal:""
        }


    const handleOnClickNext = async (lat, lon, state, city, postal_code, locality) => {
        const user_id = sessionStorage.getItem("user_id");
        const opts = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "user_id": user_id,
                "latitude": lat,
                "longitude": lon,
                "state": state,
                "city": city,
                "locality": locality,
                "postal_code": postal_code
            })
        }
        try{
            const resp = await fetch(configData.SERVER_URL + "/api/update_user_location", opts)
            if(resp.status !== 200) {
                alert("Error occured while creating a user");
            }else{
                const data = await resp.json();
                sessionStorage.setItem("user_id", data.user_id);
                navigate('/signup3');
            }

        }catch(error){
            alert("There has been some error creating a user");
        }
    }

    return(
        <div>
            <Navbar/>
            <center>
                <br/>
            <h2>Select Your Location Here</h2>
                <div style={{ maxHeight:'400px', maxWidth:'1000px' }}>
                    <GoogleApi
                        location_details={location_details}
                        onClickNext={handleOnClickNext}
                    />
                </div></center>
        </div>
    );
}

export default Signup2;