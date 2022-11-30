import {Component }  from 'react';
import equal from 'fast-deep-equal';
import Form from 'react-bootstrap/Form';

class NonEditableProfile extends Component {
    constructor(props){
        super(props)
        this.state = { user_data: this.props.user_data,
            updateBasic: false,
            updateLocation: false,
            updateLanguage: false,
            role: this.props.user_data.role,
            dob: this.props.user_data.date_of_birth,
            gender: this.props.user_data.gender,
            pref_lang1: this.props.user_data.preferred_lang1,
            pref_lang2: this.props.user_data.preferred_lang2,
            pref_lang3: this.props.user_data.preferred_lang3,
            locality: this.props.user_data.locality,
            city: this.props.user_data.city,
            state: this.props.user_data.state,
        };
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        this.updateUser();
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.user_data, prevProps.user_data)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
          this.updateUser();
        }
    } 

    updateUser(){
        this.setState({ user_data: this.props.user_data,
            updateBasic: false,
            updateLocation: false,
            updateLanguage: false,
            role: this.props.user_data.role,
            dob: this.props.user_data.date_of_birth,
            gender: this.props.user_data.gender,
            pref_lang1: this.props.user_data.preferred_lang1,
            pref_lang2: this.props.user_data.preferred_lang2,
            pref_lang3: this.props.user_data.preferred_lang3,
            locality: this.props.user_data.locality,
            city: this.props.user_data.city,
            state: this.props.user_data.state, })
    }

    editBasic = () => {
        this.setState({ updateBasic: true });
    }

    cancelBasic =() => {
        this.setState({
            role: this.props.user_data.role,
            dob: this.props.user_data.date_of_birth,
            gender: this.props.user_data.gender,
            updateBasic: false
        });
    }

    submitBasic = () => {
        this.setState({ updateBasic: false });
    }

    editLanguage = () => {
        this.setState({ updateLanguage: true });
    }

    cancelLanguage =() => {
        this.setState({
            pref_lang1: this.props.user_data.preferred_lang1,
            pref_lang2: this.props.user_data.preferred_lang2,
            pref_lang3: this.props.user_data.preferred_lang3,
            updateLanguage: false
        });
    }

    submitLanguage = () => {
        this.setState({ updateLanguage: false });
    }

    editLocation = () => {
        this.setState({ updateLocation: true });
    }

    cancelLocation =() => {
        this.setState({
            locality: this.props.user_data.locality,
            city: this.props.user_data.city,
            state: this.props.user_data.state,
            updateLocation: false
        });
    }

    submitLocation = () => {
        this.setState({ updateLocation: false });
    }

    selectGender = (e) => {
        document.getElementById("formGender").value = e.target.value;
    }
    render() { 
        return (
            <>
            <div className="row">
                <div className="col text-left w-40">
                    <div className='clearfix'>
                        <div className='float-left'>
                        <h4>Personal Details</h4></div>
                        { !this.state.updateBasic ? 
                        <div className='float-right'>
                            <button className='btn btn-primary btn-sm' onClick={this.editBasic}>Edit</button>
                        </div> :
                        <div className='float-right'>
                            <button className='btn btn-primary btn-sm' onClick={this.cancelBasic}>Cancel</button>
                            <button className='btn btn-primary btn-sm ml-2' onClick={this.submitBasic}>Submit</button>
                        </div>
                        }
                    </div>
                    <hr/>
                </div>
                
                <div className="col text-left w-40">
                    <div className='clearfix'>
                        <div className='float-left'>
                            <h4>Preferred Languages</h4></div>
                            { !this.state.updateLanguage ? 
                                <div className='float-right'>
                                    <button className='btn btn-primary btn-sm' onClick={this.editLanguage}>Edit</button>
                                </div> :
                                <div className='float-right'>
                                    <button className='btn btn-primary btn-sm' onClick={this.cancelLanguage}>Cancel</button>
                                    <button className='btn btn-primary btn-sm ml-2' onClick={this.submitLanguage}>Submit</button>
                                </div>
                            }
                    </div>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col text-left w-40">
                    { !this.state.updateBasic ? 
                            <div>Your Role : {this.state.user_data.role} </div>:
                            <Form.Group controlId="formRole">
                            <div className="row">
                                <div className="col-sm-4">
                                    <Form.Label>Your Role : </Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" value={this.state.role}
                                    name='role' placeholder="Role" />
                                </div>
                            </div>
                            </Form.Group>
                    }
                </div>
                <div className="col text-left w-40">
                    { !this.state.updateLanguage ? 
                        <div>Preferred Language 1: {this.state.pref_lang1} </div>:
                        <Form.Group controlId="formRole">
                            <div className="row">
                                <div className="col-sm-4">
                                    <Form.Label>Preferred Language 1: </Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" value={this.state.pref_lang1}
                                    onChange={e => this.setState({pref_lang1: e.target.value})}
                                    name='pref_lang1' placeholder="PrefLang1" />
                                </div>
                            </div>
                        </Form.Group>
                    }
                </div>
            </div>
            <div className="row" style={{ marginTop: '10px'}}>   
                <div className="col text-left w-40">
                { !this.state.updateBasic ? 
                        <div>Date of birth : {this.state.dob} </div>:
                        <Form.Group controlId="formDOB">
                        <div className="row">
                            <div className="col-sm-4">
                                <Form.Label>Date of birth : </Form.Label>
                            </div>
                            <div className="col">
                                <Form.Control type="date" value={this.state.dob}
                                    onChange={e => this.setState({dob: e.target.value})}
                                name='dob' placeholder={this.state.dob} />
                            </div>
                        </div>
                        </Form.Group>
                }
                </div>
                <div className="col text-left w-30">
                    { !this.state.updateLanguage ? 
                        <div>Preferred Language 2: {this.state.pref_lang2} </div>:
                        <Form.Group controlId="formRole">
                            <div className="row">
                                <div className="col-sm-4">
                                    <Form.Label>Preferred Language 2: </Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" value={this.state.pref_lang2}
                                    onChange={e => this.setState({pref_lang2: e.target.value})}
                                    name='pref_lang2' placeholder="PrefLang2" />
                                </div>
                            </div>
                        </Form.Group>
                    }
                </div>
            </div>
            <div className="row" style={{ marginTop: '10px'}}>
                <div className="col text-left w-30">
                    { !this.state.updateBasic ? 
                            <div> Gender : {this.state.gender} </div>:
                            <Form.Group controlId="formGender">
                            <div className="row">
                                <div className="col-sm-4">
                                    <Form.Label>Gender : </Form.Label>
                                </div>
                                <div className="col">
                                    <div className='row'>
                                        <div className='col'>
                                            <Form.Select
                                                variant="outline-secondary"
                                                title="Gender"
                                                id="gender-dropdown-1"
                                                className="left_data form-control"
                                                onChange={this.selectGender}
                                                defaultValue="Select">
                                                <option disabled value="Select">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Form.Select></div>
                                        <div className='col'>
                                        <Form.Control type="text" value={this.state.gender}
                                                onChange={e => this.setState({gender: e.target.value})}
                                            name='gender' placeholder="Gender" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Form.Group>
                    }
                </div>
                <div className="col text-left w-30">
                    { !this.state.updateLanguage ? 
                        <div>Preferred Language 3: {this.state.pref_lang3} </div>:
                        <Form.Group controlId="formRole">
                            <div className="row">
                                <div className="col-sm-4">
                                    <Form.Label>Preferred Language 3: </Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" value={this.state.pref_lang3}
                                    onChange={e => this.setState({pref_lang3: e.target.value})}
                                    name='pref_lang3' placeholder="PrefLang3" />
                                </div>
                            </div>
                        </Form.Group>
                    }
                </div>
            </div>
            <br/><br/>
            <div className='w-50'>
                <div className='clearfix'>
                    <div className='float-left'>
                        <h4>Location Details</h4></div>
                        { !this.state.updateLocation ? 
                            <div className='float-right'>
                                <button className='btn btn-primary btn-sm' onClick={this.editLocation}>Edit</button>
                            </div> :
                            <div className='float-right'>
                                <button className='btn btn-primary btn-sm' onClick={this.cancelLocation}>Cancel</button>
                                <button className='btn btn-primary btn-sm ml-2' onClick={this.submitLocation}>Submit</button>
                            </div>
                        }
                </div>
                <hr/>
                <div className="text-left w-50" style={{ marginTop: '10px'}}>
                    { !this.state.updateLocation ? 
                        <div>Locality : {this.state.locality} </div>:
                        <Form.Group controlId="formRole">
                            <div className="row">
                                <div className="col-sm-4">
                                    <Form.Label>Locality : </Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" value={this.state.locality}
                                    onChange={e => this.setState({locality: e.target.value})}
                                    name='locality' placeholder="Locality" />
                                </div>
                            </div>
                        </Form.Group>
                    }
                </div>
                <div className="text-left w-50" style={{ marginTop: '10px'}}>
                    { !this.state.updateLocation ? 
                        <div>City : {this.state.city} </div>:
                        <Form.Group controlId="formRole">
                            <div className="row">
                                <div className="col-sm-4">
                                    <Form.Label>City : </Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" value={this.state.city}
                                    onChange={e => this.setState({city: e.target.value})}
                                    name='city' placeholder="City" />
                                </div>
                            </div>
                        </Form.Group>
                    }
                </div>
                <div className="text-left w-50" style={{ marginTop: '10px'}}>
                    { !this.state.updateLocation ? 
                        <div>State : {this.state.state} </div>:
                        <Form.Group controlId="formRole">
                            <div className="row">
                                <div className="col-sm-4">
                                    <Form.Label>State : </Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" value={this.state.state}
                                    onChange={e => this.setState({state: e.target.value})}
                                    name='state' placeholder="State" />
                                </div>
                            </div>
                        </Form.Group>
                    }
                </div>
            </div>
            </>
        );
    }
}
 
export default NonEditableProfile;