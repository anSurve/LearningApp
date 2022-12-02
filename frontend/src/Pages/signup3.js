import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import configData from "../config.json";

function Signup3(){
    const [allLangs, setLang] = useState([]);
    const [preferredLang1, setLang1] = useState([]);
    const [preferredLang2, setLang2] = useState([]);
    const [preferredLang3, setLang3] = useState([]);

    useEffect(() => {
        fetchLangs();
      }, []);

    const navigate = useNavigate();
    const createUser = async () => {
        const preferred_lang1 = document.getElementById("formLanguage1").value;
        const preferred_lang2 = document.getElementById("formLanguage2").value;
        const preferred_lang3 = document.getElementById("formLanguage3").value;
        
        let preferred_lang1_id = '';
        let preferred_lang2_id = '';
        let preferred_lang3_id = '';

        if(allLangs.length > 0) {
            allLangs.map(lang => {
                if (preferred_lang1 === lang.language_name) {
                    preferred_lang1_id = lang.row_id;
                }else if(preferred_lang2 === lang.language_name) {
                    preferred_lang2_id = lang.row_id;
                }else if(preferred_lang3 === lang.language_name) {
                    preferred_lang3_id = lang.row_id;
                }
            })
        }
        
        const user_id = sessionStorage.getItem("user_id");
        const opts = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "user_id": user_id,
                "preferred_lang1": preferred_lang1_id,
                "preferred_lang2": preferred_lang2_id,
                "preferred_lang3": preferred_lang3_id
            })
        }
        try{
            const resp = await fetch(configData.SERVER_URL + "/api/update_user_languages", opts)
            if(resp.status !== 200) {
                alert("Error occured while creating a user");
            }else{
                const data = await resp.json();
                sessionStorage.setItem("user_id", data.user_id);
                alert("User has been successfully created");
                navigate('/signin');
            }

        }catch(error){
            alert("There has been some error creating a user");
        }
    }

    const fetchLangs = async () => {
        const opts = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }
        try{
            const resp = await fetch(configData.SERVER_URL + "/api/get_languages", opts)
            if(resp.status !== 200) {
                alert("Error occured while creating a user");
            }else{
                const data = await resp.json();
                setLang(data.languages);
                setLang1(data.languages);
            }
        }catch(error){
            alert("There has been some error creating a user");
        }
    }
    const selectLang1 = (e) => {
        document.getElementById("formLanguage1").value = e.target.value;
        setLang2(preferredLang1.filter((c) => c.language_name !== e.target.value));
    }
    const selectLang2 = (e) => {
        document.getElementById("formLanguage2").value = e.target.value;
        setLang3(preferredLang2.filter((c) => c.language_name !== e.target.value));
    }
    const selectLang3 = (e) => {
        document.getElementById("formLanguage3").value = e.target.value;
    }

    return(
        <div>
            <Navbar/>
            <center><br/>
            <h2>Select Your Preferred Languages Here</h2>
            <div className="w-50 p-3">
                <Form >

                    <Form.Group controlId="formLanguage1" style={{ marginTop: '10px'}}>
                    <div className="row">
                        <div className="col-sm-4">
                            <Form.Label>Preferred Language 1</Form.Label>
                        </div>
                        <div className="col">
                            <div className='d-flex justify-content-between'>
                                <Form.Select
                                    variant="outline-secondary"
                                    title="Language1"
                                    id="gender-dropdown-1"
                                    className="left_data form-control"
                                    onChange={selectLang1}
                                    defaultValue="Select">
                                    <option disabled value="Select">Select</option>
                                    {preferredLang1.map(lang => {
                                        return <option key={lang.row_id} value={lang.language_name}>{lang.language_name}</option>
                                    })}
                                </Form.Select>
                                <Form.Control type="text" name='language1' className="right_data" placeholder="Preferred Language 1" />
                            </div>
                        </div>
                    </div>
                    </Form.Group>


                    <Form.Group controlId="formLanguage2" style={{ marginTop: '10px'}}>
                    <div className="row">
                        <div className="col-sm-4">
                            <Form.Label>Preferred Language 2</Form.Label>
                        </div>
                        <div className="col">
                            <div className='d-flex justify-content-between'>
                                <Form.Select
                                    variant="outline-secondary"
                                    title="Language1"
                                    id="gender-dropdown-1"
                                    className="left_data form-control"
                                    onChange={selectLang2}
                                    defaultValue="Select">
                                    <option disabled value="Select">Select</option>
                                    {preferredLang2.map(lang => {
                                        return <option key={lang.row_id} value={lang.language_name}>{lang.language_name}</option>
                                    })}
                                </Form.Select>
                                <Form.Control type="text" name='language2' className="right_data" placeholder="Preferred Language 2" />
                            </div>
                        </div>
                    </div>
                    </Form.Group>
                    <Form.Group controlId="formLanguage3" style={{ marginTop: '10px'}}>
                    <div className="row">
                        <div className="col-sm-4">
                            <Form.Label>Preferred Language 3</Form.Label>
                        </div>
                        <div className="col">
                            <div className='d-flex justify-content-between'>
                                <Form.Select
                                    variant="outline-secondary"
                                    title="Language1"
                                    id="gender-dropdown-1"
                                    className="left_data form-control"
                                    onChange={selectLang3}
                                    defaultValue="Select">
                                    <option disabled value="Select">Select</option>
                                    {preferredLang3.map(lang => {
                                        return <option key={lang.row_id} value={lang.language_name}>{lang.language_name}</option>
                                    })}
                                </Form.Select>
                                <Form.Control type="text" name='language3' className="right_data" placeholder="Preferred Language 3" />
                            </div>
                        </div>
                    </div>                    
                    <Button variant="primary" className='col-lg-6' style={{ marginTop: '20px'}} onClick={createUser}>
                        Create User
                    </Button>
                    </Form.Group>
                </Form>
            </div>
            </center>
        </div>
    );
}
export default Signup3;