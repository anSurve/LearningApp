import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import NavbarLogged from '../Components/navbar_logged'; 
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import configData from "../config.json";

const LearningFeedback = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { learning_id } = useParams();
  const ratings = [1, 2, 3, 4, 5]


  useEffect(() => {
  }, [learning_id]);
  

  const selectSkillRating = (e) => {
    document.getElementById("skill_rating").value = e.target.value;
  }
  const selectLangRating = (e) => {
    document.getElementById("language_rating").value = e.target.value;
  }
  const selectCommRating = (e) => {
    document.getElementById("communication_rating").value = e.target.value;
  }
  const selectPuncRating = (e) => {
    document.getElementById("punctuality_rating").value = e.target.value;
  }

  const submitFeedback = async () => {
    
    const skill_rating = document.getElementById("skill_rating").value;
    const lang_rating = document.getElementById("language_rating").value;
    const comm_rating = document.getElementById("communication_rating").value;
    const punct_rating = document.getElementById("punctuality_rating").value;
    const comments = document.getElementById("formComments").value;
    const opts = {
        method: "POST",
        headers: {"Content-Type": "application/json",
                  "Authorization": "Bearer " + token },
        body: JSON.stringify({
            "learning_id": learning_id,
            "skill_rating": skill_rating,
            "lang_rating": lang_rating,
            "comm_rating": comm_rating,
            "punct_rating": punct_rating,
            "comments": comments
        })
    }
    try{
        const resp = await fetch(configData.SERVER_URL + "/api/submit_feedback", opts)
        if(resp.status !== 200) {
            alert("Error occured while submitting feedback");
        }else{
            const data = await resp.json();
            alert(data.res);
            navigate('/home');
        }
    }catch(error){
      console.log(error);
      alert("The API is down");
    }
  }

  return (
    <div className='text-center'>
        <NavbarLogged/><br/><center>
        <h2>Feedback Page</h2>
        <br />
        <Form >
            <Form.Group controlId="skill_rating" style={{ marginTop: '10px'}}>
            <div className="row" style={{ width: '50%'}}>
                <div className="col float-left">
                    <Form.Label>Skill Rating</Form.Label>
                </div>
                <div className="col float-left">
                    <div className='d-flex justify-content-between' style={{ width: '20rem'}}>
                        <Form.Select
                            variant="outline-secondary"
                            title="skill_rating"
                            id="gender-dropdown-1"
                            onChange={selectSkillRating}
                            className="left_data form-control"
                            defaultValue="Select">
                            <option disabled value="Select">Select</option>
                            {ratings.map(i => {
                                return <option key={i} value={i}>{i}</option>
                            })}
                        </Form.Select>
                        <Form.Control type="text" name='skill_rating' className="right_data ml-3" placeholder="Skill rating" />
                    </div>
                </div>
            </div>
            </Form.Group>

            <Form.Group controlId="language_rating" style={{ marginTop: '10px'}}>
            <div className="row" style={{ width: '50%'}}>
                <div className="col float-left">
                    <Form.Label>Language Rating</Form.Label>
                </div>
                <div className="col float-left">
                    <div className='d-flex justify-content-between' style={{ width: '20rem'}}>
                        <Form.Select
                            variant="outline-secondary"
                            title="language_rating"
                            id="gender-dropdown-1"
                            onChange={selectLangRating}
                            className="left_data form-control"
                            defaultValue="Select">
                            <option disabled value="Select">Select</option>
                            {ratings.map(i => {
                                return <option key={i} value={i}>{i}</option>
                            })}
                        </Form.Select>
                        <Form.Control type="text" name='language_rating' className="right_data ml-3" placeholder="Language rating" />
                    </div>
                </div>
            </div>
            </Form.Group>

            <Form.Group controlId="communication_rating" style={{ marginTop: '10px'}}>
            <div className="row" style={{ width: '50%'}}>
                <div className="col float-left">
                    <Form.Label>Communication Rating</Form.Label>
                </div>
                <div className="col float-left">
                    <div className='d-flex justify-content-between' style={{ width: '20rem'}}>
                        <Form.Select
                            variant="outline-secondary"
                            title="communication_rating"
                            id="gender-dropdown-1"
                            onChange={selectCommRating}
                            className="left_data form-control"
                            defaultValue="Select">
                            <option disabled value="Select">Select</option>
                            {ratings.map(i => {
                                return <option key={i} value={i}>{i}</option>
                            })}
                        </Form.Select>
                        <Form.Control type="text" name='communication_rating' className="right_data ml-3" placeholder="Communication rating" />
                    </div>
                </div>
            </div>
            </Form.Group>

            <Form.Group controlId="punctuality_rating" style={{ marginTop: '10px'}}>
            <div className="row" style={{ width: '50%'}}>
                <div className="col float-left">
                    <Form.Label>Punctuality Rating</Form.Label>
                </div>
                <div className="col float-left">
                    <div className='d-flex justify-content-between' style={{ width: '20rem'}}>
                        <Form.Select
                            variant="outline-secondary"
                            title="punctuality_rating"
                            id="gender-dropdown-1"
                            onChange={selectPuncRating}
                            className="left_data form-control"
                            defaultValue="Select">
                            <option disabled value="Select">Select</option>
                            {ratings.map(i => {
                                return <option key={i} value={i}>{i}</option>
                            })}
                        </Form.Select>
                        <Form.Control type="text" name='punctuality_rating' className="right_data ml-3" placeholder="Punctuality rating" />
                    </div>
                </div>
            </div>
            </Form.Group>
            <Form.Group controlId="formComments" style={{ marginTop: '10px'}}>
            <div className="row" style={{ width: '50%'}}>
                <div className="col float-left">
                    <Form.Label>Comments</Form.Label>
                </div>
                <div className="col float-left">
                    <div className='d-flex justify-content-between' style={{ width: '20rem'}}>
                      <Form.Control as="textarea" rows={5} name='Comments' placeholder="Enter Comments" />
                    </div>
                </div>
            </div>
            </Form.Group>
        </Form> 
        <Button variant="primary" className='col-sm-4 mt-3' style={{ width: '20rem'}} onClick={submitFeedback}>
            Submit
        </Button>
        </center>
    </div>
  );
};

export default LearningFeedback;