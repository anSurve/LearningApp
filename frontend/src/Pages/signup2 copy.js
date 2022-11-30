import React, {Component} from 'react';
import Navbar from '../Components/navbar'; 
import GoogleApi from '../Components/google_api';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export default class Signup2 extends Component{
    constructor() {
        super();

        this.state = { 
            latitude: 50,
            longitude: 30,
            zoom: 6,
            location_details : {
                lat:  50,
                lon: 30,
                zoom: 6,
                city:"",
                locality:"",
                state:"",
                postal:""
            }
        };
        this.getLocation = this.getLocation.bind(this);
    }

    delay = ms => new Promise(res => setTimeout(res, ms));
    getLocation = async () => {
        const location_details = this.state.location_details;
        navigator.geolocation.getCurrentPosition(function(position) {
            location_details['lat'] = position.coords.latitude;
            location_details['lon'] = position.coords.longitude;
        });
        this.setState({location_details: location_details }, () => {
            console.log(this.state.location_details, 'location_details');});
            this.setState({location_details: location_details }, () => {
                console.log(this.state.location_details, 'location_details');});
        this.setState({zoom:14});
        await this.delay(2000);

        document.getElementById("formlatitude").value = location_details['lat'];
        document.getElementById("formLongitude").value = location_details['lon'];

        this.getAddress(location_details['lat'], location_details['lon'], "AIzaSyDc5U0P-tTdUaLRLGLCTWVTg1m1Xkwt2qA");
    }

    getAddress = async (lat, lon, key) => {
        const resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`)
        if(resp.status !== 200) {
            alert("There has been some error");
        };
        const address = await resp.json();
        this.setZip(address);
    }

    setZip = async (address) => {
        const location_details = this.state.location_details;
        const location_id = this.state.location_id;
        location_details['locality'] = address.results[0].address_components[2].long_name;
        location_details['city'] = address.results[0].address_components[3].long_name;
        location_details['state'] = address.results[0].address_components[5].long_name;
        location_details['postal'] = address.results[0].address_components[7].long_name;
        this.setState({location_details: location_details});
        this.setState({location_id: location_id + 1});

        await this.delay(2000);
        document.getElementById("formState").value = location_details['state'];
        document.getElementById("formCity").value = location_details['city'];
        document.getElementById("formLocality").value = location_details['locality'];
        document.getElementById("formPostalCode").value = location_details['postal'];
        //console.log(address);
    }
    onClickNext = () => {
        
        const navigate = useNavigate;
        navigate("/signup3");
    }

    render() {return(
        <div>
            <Navbar/>
            <center>
            <h2>Select your location from here</h2></center>
            <div className='d-flex flex-row'>
                <div style={{ maxHeight:'400px', maxWidth:'500px' }}>
                    <GoogleApi
                        lat={this.state.latitude}
                        lon={this.state.longitude}
                        zoom={this.state.zoom}
                    />
                    <br/>
                    <Button variant="primary" className='col-sm-8  mx-100' onClick={this.getLocation}>
                        Get Current Location
                    </Button>
                </div>
                <div className="col ml-5" style={{ height:'400px', width:'500px', marginTop: '20px', verticalAlign:'middle' }}>
                        <Form >
                            <Form.Group controlId="formlatitude">
                            <div className="row">
                                <div className="col-sm-4">
                                    <Form.Label>Latitude</Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" name='latitude' placeholder="Latitude" />
                                </div>
                            </div>
                            </Form.Group>
                            <Form.Group controlId="formLongitude">
                            <div className="row" style={{ marginTop: '10px'}}>
                                <div className="col-sm-4">
                                    <Form.Label>Longitude</Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" name='longitude' placeholder="Longitude" />
                                </div>
                            </div>
                            </Form.Group>
                            <Form.Group controlId="formState">
                                <div className="row" style={{ marginTop: '10px'}}>
                                    <div className="col-sm-4">
                                        <Form.Label>State</Form.Label>
                                    </div>
                                    <div className="col">
                                        <Form.Control type="text" name='state' placeholder="State" />
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formCity">
                                <div className="row" style={{ marginTop: '10px'}}>
                                    <div className="col-sm-4">
                                        <Form.Label>City</Form.Label>
                                    </div>
                                    <div className="col">
                                        <Form.Control type="text" name='city' placeholder="City" />
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formLocality">
                                <div className="row" style={{ marginTop: '10px'}}>
                                    <div className="col-sm-4">
                                        <Form.Label>Locality</Form.Label>
                                    </div>
                                    <div className="col">
                                        <Form.Control type="text" name='locality' placeholder="Locality" />
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formPostalCode">
                                <div className="row" style={{ marginTop: '10px'}}>
                                    <div className="col-sm-4">
                                        <Form.Label>Postal Code</Form.Label>
                                    </div>
                                    <div className="col">
                                        <Form.Control type="text" name='postalcode' placeholder="PostalCode" />
                                    </div>
                                </div>
                            </Form.Group>
                        </Form>
                        <br/>
                        <Button variant="primary" className='col-sm-8  mx-100' onClick={this.onClickNext}>
                            Submit Location
                        </Button>
                    </div>
                </div>
        </div>
    );}
};;