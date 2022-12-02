import React, {useState} from 'react';
import NavbarLogged from '../Components/navbar_logged'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/Autocomplete';
import configData from "../config.json";

function TeacherSearch(){
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState();
    const getNearbyTeacher = async () => {
      const skill = document.getElementById("skill").value;
      const token = sessionStorage.getItem("token");
      const extra_string = "skill="+skill.replace(/\s+/g, '%20')
      const opts = {
          method: "GET",
          headers: {"Content-Type": "application/json",
                      "Authorization": "Bearer " + token }
      }
      try{
          const resp = await fetch(configData.SERVER_URL + "/api/get_nearby_teachers?"+extra_string, opts)
          if(resp.status !== 200) {
              alert("Error occured while getting a teacher");
              console.log(resp.json());
          }else{
              const data = await resp.json();
              setTeachers(data.nearby_teachers);
              console.log(data)
          }

      }catch(error){
          console.log(error);
          alert("There has been some error getting a teacher");
      }
    }

    const selectTeacher = (teacher_id, skill) =>{
      navigate('/teacher_selection/'+teacher_id+"/"+skill);
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
              Gender 
            </div>
            <div className='float-left'>: { teacher.gender }</div>  
          </div><br/>
          <div className='ml-5 text-left'>
            <div className='float-left' style={{ width:'8rem' }}>
             Language 
            </div>
            <div className='float-left'>: { teacher.language }</div> 
          </div><br/>
          <div className='ml-5 text-left'>
            <div className='float-left' style={{ width:'8rem' }}>
            State 
            </div>
            <div className='float-left'>: { teacher.state }</div> 
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
    const onTagsChange = (event, values) => {
      this.setState({
        tags: values
      }, () => {
        console.log(this.state.tags);
      });
    }

    

    return(
        <div className='text-center'>
            <NavbarLogged/>
            <br/>
            <h2>Find a Teacher Here !!</h2>
            <br/>

            <center>
            <Form  style={{ textAlignL:'center' }}>
              <Form.Group className="mb-3 col-lg-6 align-center" controlId="skill">
                  <Form.Control type="text" name='skill' placeholder="Enter Skill" />
              </Form.Group>
            </Form>
            <br/>
            <Button variant="primary" className='col-lg-4' onClick={ getNearbyTeacher }>
                Search
            </Button>
            <br/>
            {teachers && <TeachersList teachers={teachers}/>}</center>
            
        </div>
    );
}
export default TeacherSearch;

/*const top100Films = [
      { title: 'The Shawshank Redemption', year: 1994 },
      { title: 'The Godfather', year: 1972 },
      { title: 'The Godfather: Part II', year: 1974 },
      { title: 'The Dark Knight', year: 2008 },
      { title: '12 Angry Men', year: 1957 },
      { title: "Schindler's List", year: 1993 },
      { title: 'Pulp Fiction', year: 1994 },
      { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
      { title: 'The Good, the Bad and the Ugly', year: 1966 },
      { title: 'Fight Club', year: 1999 },
      { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
      { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
      { title: 'Forrest Gump', year: 1994 },
      { title: 'Inception', year: 2010 },
    ];
            <Autocomplete
              multiple
              id="searchTeacher"
              options={top100Films}
              getOptionLabel={option => option.title}
              defaultValue={[top100Films[13]]}
              onChange={onTagsChange}
              sx={{ width: 300 }}
              renderInput={(params) => 
                <TextField
                  {...params}
                  variant="standard"
                  label="Multiple values"
                  placeholder="Favorites"
                  margin="normal"
                  fullWidth
                 />}
            />*/