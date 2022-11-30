import React from 'react';
import SignImg from './sign_img';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from '../Components/navbar'; 
import { useNavigate } from 'react-router-dom';

function Signup(){
    const navigate = useNavigate();
    
    const selectRole = (e) => {
        document.getElementById("formRole").value = e.target.value;
    }

    const selectGender = (e) => {
        document.getElementById("formGender").value = e.target.value;
    }

    const nextPage = async () => {
        const first_name = document.getElementById("formFirstName").value;
        const last_name = document.getElementById("formLastName").value;
        const gender = document.getElementById("formGender").value;
        const date_of_birth = document.getElementById("formDOB").value;
        const email = document.getElementById("formBasicEmail").value;
        const password = document.getElementById("formBasicPassword").value;
        const role = document.getElementById("formRole").value;
        const opts = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "first_name": first_name,
                "last_name": last_name,
                "gender": gender,
                "email": email,
                "password": password,
                "date_of_birth": date_of_birth,
                "role": role
            })
        }
        try{
            const resp = await fetch("http://127.0.0.1:5000/api/create_user", opts)
            if(resp.status !== 200) {
                alert("Error occured while creating a user");
            }else{
                const data = await resp.json();
                sessionStorage.setItem("user_id", data.user_id);
                navigate('/signup2');
            }

        }catch(error){
            alert("There has been some error creating a user");
        }
    }
    return(
        <div>
        <Navbar/><center>
        <h2>Sign Up Page</h2></center>
        <div className="container mt-3">
        <section className='d-flex justify-content-between'>
            <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                <Form >

                    <Form.Group className="mb-3 col-lg-8" controlId="formFirstName">
                        <Form.Control type="text" name='first_name' placeholder="Enter first name" />
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-8" controlId="formLastName">
                        <Form.Control type="text" name='last_name' placeholder="Enter last name" />
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-8" controlId="formGender">
                        <div className='d-flex justify-content-between'>
                        <Form.Select
                            variant="outline-secondary"
                            title="Gender"
                            id="gender-dropdown-1"
                            className="left_data form-control"
                            onChange={selectGender}
                            defaultValue="Select">
                            <option disabled value="Select">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                        <Form.Control name='Gender' aria-label="Gender input" className="right_data"  placeholder="Gender"/>
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-8" controlId="formRole">
                        <div className='d-flex justify-content-between'>
                        <Form.Select
                            variant="outline-secondary"
                            title="Role"
                            id="role-dropdown-1"
                            className="left_data  form-control"
                            onChange={selectRole}
                            defaultValue="Select">
                            <option disabled value="Select">Select</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                        </Form.Select>
                        <Form.Control name='Role' aria-label="Role input" className="right_data" placeholder="Role"/>
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-8" controlId="formDOB">
                        <Form.Control type="date" name='DOB' placeholder="Enter DOB" />
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicEmail">
                        <Form.Control type="email" name='email' placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-8" controlId="formBasicPassword">
                        <Form.Control type="password" name='password' placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" className='col-lg-8' style={{ background: "rgb(67, 185, 127)" }} onClick={nextPage}>
                        Next
                    </Button>
                </Form>
                <p className='mt-3'>Already have an account. <span>Sign In</span> </p>
            </div>
            <SignImg />
        </section>
    </div></div>
    );
}
export default Signup;