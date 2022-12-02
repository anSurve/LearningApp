import React, { useState } from 'react'
import SignImg from './sign_img'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/navbar'; 
import configData from "../config.json";


function Signin(){
    const [email, setEmail] =  useState("");
    const [password, setPassword] =  useState("");
    const token = sessionStorage.getItem("token");
    const name = sessionStorage.getItem("name");
    const navigate = useNavigate();
    const isLoggedIn = (token &&  token !== "" && token !== undefined && name && name !== "" && name !== undefined);
  
    React.useEffect(() => {
      if (isLoggedIn) {
        navigate('/home');
      }
    }); 

     async function handleClick() {
        const email = document.getElementById("formBasicEmail").value;
        const password = document.getElementById("formBasicPassword").value;
        if(email && email !== "" && password && password !== ""){
            const opts = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }
            try{
                const resp = await fetch(configData.SERVER_URL + "/api/token", opts)
                if(resp.status !== 200) {
                    alert("username & password do not match");
                }else{
                    const data = await resp.json();
                    console.log("This came from backend = ", data);
                    sessionStorage.setItem("token", data.access_token);
                    sessionStorage.setItem("name", data.name);
                    navigate("/home");
                }

            }catch(error){
                alert("There has been some error logging in");
            }
        }else{
            alert("Fields cannot be blank");
        }
    }

    const signup = () => {
        navigate('/signup');
    }

    return(
        <div> 
        <Navbar/><center>
            <br/>
        <h2>Login Page</h2></center>
        <div className="container mt-3">
        <section className='d-flex justify-content-between'>
            <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                
                <h3 className='text-center col-lg-6'>Sign In</h3>
                <Form>

                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                    <Form.Control name='email' placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                        <Form.Control type="password" name='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" className='col-lg-6' style={{ background: "rgb(67, 185, 127)" }} onClick={ handleClick }>
                        Submit
                    </Button>
                </Form>
                <p className='mt-3'>Create a new account.&nbsp;
                <span onClick={signup} style={{cursor:'pointer', color:'blue'}}><u>Sign up</u></span></p>
            </div> 
            <SignImg />
        </section>
    </div></div>
    );
}
export default Signin;