import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavbarLogged from '../Components/navbar_logged'; 
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import configData from "../config.json";

const TeacherSelection = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { teacher_id } = useParams();
  const { skill } = useParams();

  const [teacherData, setTeacherData] = useState();
  const [similarTeachers, setSimilarTeachers] = useState();

  const fetchTeacher = async () => {
    const opts = {
        method: "GET",
        headers: {"Content-Type": "application/json",
                  "Authorization": "Bearer " + token }
    }
    try{
        const extra_string = "teacher_id="+teacher_id+"&"+"skill_id="+skill;
        const resp = await fetch(configData.SERVER_URL + "/api/get_teacher_data?" + extra_string, opts)
        if(resp.status !== 200) {
            alert("Error occured while fetching teacher data");
            setTeacherData("");
        }else{
            const data = await resp.json();
            setTeacherData(data.teacher_data);
        }
    }catch(error){
      alert("The API is down");
    }
 }

const fetchSimilarTeachers = async () => {
  const opts = {
      method: "GET",
      headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " + token }
  }
  try{
      const extra_string = "teacher_id="+teacher_id+"&"+"skill_id="+skill;
      const resp = await fetch(configData.SERVER_URL + "/api/recommended_teachers?" + extra_string, opts)
      if(resp.status !== 200) {
          alert("Error occured while fetching recommended_teachers");
          setSimilarTeachers("");
      }else{
          const data = await resp.json();
          setSimilarTeachers(data.similar_teachers);
      }
  }catch(error){
    alert("The API is down");
  }
}

  useEffect(() => {
    fetchTeacher();
    fetchSimilarTeachers();
  }, [teacher_id, skill]);
  

  const startLearning = async () => {
    const opts = {
        method: "POST",
        headers: {"Content-Type": "application/json",
                  "Authorization": "Bearer " + token },
        body: JSON.stringify({
            "teacher_id": teacher_id,
            "skill_id": skill,
            "language_id": teacherData.language_id
        })
    }
    try{
        const resp = await fetch(configData.SERVER_URL + "/api/start_learning", opts)
        if(resp.status !== 200) {
            alert("Error occured while submitting learning request");
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



  function TeachersList(props) {
    const teachers = props.teachers;
    const listTeachers = teachers.map((teacher) =>
    <div className="card"  key={teacher.teacher_id} >
      <div className="card-header" id="headingOne">
        <h5 className="mb-0">
          <button className="btn btn-link" data-toggle="collapse" data-target={"#"+teacher.teacher_id} aria-expanded="true" aria-controls={teacher.teacher_id}>
            { teacher.first_name + " " + teacher.last_name}
          </button>
        </h5>
      </div>

      <div id={teacher.teacher_id} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
        <div className="card-body">
        <div className='row'>
        <div className='col'>
        <div className='ml-5 text-left'>
          <div className='float-left' style={{ width:'8rem' }}>
            Skill 
          </div>
          <div className='float-left'>: { teacher.skill }</div>  
        </div><br/>
        <div className='ml-5 text-left'>
          <div className='float-left' style={{ width:'8rem' }}>
           Language 
          </div>
          <div className='float-left'>: { teacher.preferred_lang1 }</div> 
        </div><br/>
        <div className='ml-5 text-left'>
          <div className='float-left' style={{ width:'8rem' }}>
          State 
          </div>
          <div className='float-left'>: { teacher.state }</div> 
        </div><br/>
        <div className='ml-5 text-left'>
          <div className='float-left' style={{ width:'8rem' }}>
          City 
          </div>
          <div className='float-left'>: { teacher.city }</div> 
        </div><br/>
        <div className='ml-5 text-left'>
          <div className='float-left' style={{ width:'8rem' }}>
          Hourly Charge 
          </div>
          <div className='float-left'>: { teacher.hourly_charge } rs</div>
        </div><br/>
        <div className='ml-5 text-left'>
          <div className='float-left' style={{ width:'8rem' }}>
          Rating 
          </div>
          <div className='float-left'>: { teacher.average_rating }</div>
        </div>
        </div>
        <div className='col'>
          <Button variant="primary" className='col-sm-4' onClick={(e) =>selectTeacher(teacher.teacher_id, teacher.skill_id)}>
              Select
          </Button>
        </div>
        </div>
        </div>
      </div>
    </div>
    );
    return (
      <div id="accordion" style={{ width:'48rem', marginTop:'30px' }}>{listTeachers}</div>
    );
  }

  const selectTeacher = (teacher_id, skill) =>{
    navigate('/teacher_selection/'+teacher_id+"/"+skill);
  }


  function TeacherDetails(props) {
    const teacher = props.teacher;
    const teacherDetails = 
      <div className="card" key={teacher_id}>
        <div className="card-header"><h3>{ teacher.first_name + " " + teacher.last_name}</h3></div>
        <div className="card-body">
          <div className='row'>
            <div className='col'>
              <div className='float-left ml-5' style={{ width:'8rem' }}>Gender</div>
              <div className='float-left'>: { teacher.gender }</div>
            </div>
            <div className='col'>
              <div className='float-left ml-5' style={{ width:'8rem' }}>Sate</div>
              <div className='float-left'>: { teacher.state }</div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='float-left ml-5' style={{ width:'8rem' }}>DOB</div>
              <div className='float-left'>: { teacher.date_of_birth }</div>
            </div>
            <div className='col'>
              <div className='float-left ml-5' style={{ width:'8rem' }}>City</div>
              <div className='float-left'>: { teacher.city }</div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='float-left ml-5' style={{ width:'8rem' }}>Email</div>
              <div className='float-left'>: { teacher.email }</div>
            </div>
            <div className='col'>
              <div className='float-left ml-5' style={{ width:'8rem' }}>Language</div>
              <div className='float-left'>: { teacher.preferred_lang1 }</div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='float-left ml-5' style={{ width:'8rem' }}>Fees</div>
              <div className='float-left'>: { teacher.hourly_charge }</div>
            </div>
            <div className='col'>
              <div className='float-left ml-5' style={{ width:'8rem' }}>Rating</div>
              <div className='float-left'>: { teacher.average_rating }</div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='float-left ml-5' style={{ width:'8rem' }}>Skill</div>
              <div className='float-left'>: { teacher.skill }</div>
            </div>
          </div>
        </div>
        <center>
        <Button variant="primary" className='col-sm-4 mb-2' onClick={startLearning}>
            Finalize Teacher
        </Button></center>
      </div>
    return (
      <div className="container">{teacherDetails}</div>
    );
  }

  return (
    <div className='text-center'>
        <NavbarLogged/><br/>
        <h2>Teacher selection</h2>
        {teacherData && <TeacherDetails teacher={teacherData} />}
        <hr/>
        <br/> 
        <center>
         <h2>Smilar Teachers </h2> 
        {similarTeachers && <TeachersList teachers={similarTeachers}/>}</center>     
     </div>
  );
};

export default TeacherSelection;