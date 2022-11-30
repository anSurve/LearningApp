import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export class GoogleApi extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            lat: this.props.location_details["lat"],
            lon: this.props.location_details["lon"],
            zoom: this.props.location_details["zoom"],
            city:"",
            locality:"",
            state:"",
            postal:""
        };
        this.getLocation = this.getLocation.bind(this);
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    getLocation = async () => {
        const setLatLon = (latitude, longitude) => {
            this.setState({lat: latitude})
            this.setState({lon: longitude})
        }
        navigator.geolocation.getCurrentPosition(function(position) { 
            setLatLon(position.coords.latitude, position.coords.longitude);
            //sessionStorage.setItem("latitude", position.coords.latitude);
            //sessionStorage.setItem("longitude", position.coords.longitude);
        });
        //this.setState({lat: sessionStorage.getItem("latitude")}, () => {console.log(this.state.lat, 'latitude');});
        //this.setState({lon: sessionStorage.getItem("longitude")}, () => {console.log(this.state.lon, 'longitude');});
        this.setState({zoom:14});
        
        await this.delay(1000);

        this.getAddress(this.state.lat, this.state.lon, "AIzaSyDc5U0P-tTdUaLRLGLCTWVTg1m1Xkwt2qA");
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
        this.setState({locality: address.results[0].address_components[2].long_name});
        this.setState({city: address.results[0].address_components[3].long_name});
        this.setState({state: address.results[0].address_components[5].long_name});
        this.setState({postal: address.results[0].address_components[7].long_name});
        //console.log(address);
    }


render() {
    return (
        <>
        <div className="container">
            <div className="row  text-center">
                <div className="col" style={{ height:'400px', width:'500px', marginTop: '20px'}}>
                    <Map
                        google={this.props.google}
                        zoom={this.state.zoom}
                        initialCenter={{
                            lat: this.state.lat,
                            lng: this.state.lon
                        }}
                        center={{
                            lat: this.state.lat,
                            lng: this.state.lon
                        }}
                    />
                </div>
                <div className="col ml-5" style={{ height:'400px', width:'500px', marginTop: '20px', verticalAlign:'middle' }}>
                    <Form >
                        <Form.Group controlId="formlatitude">
                        <div className="row">
                            <div className="col-sm-4">
                                <Form.Label>Latitude</Form.Label>
                            </div>
                            <div className="col">
                                <Form.Control type="text" value={this.state.lat}
                                    onChange={e => this.setState({lat: e.target.value})}
                                 name='latitude' placeholder="Latitude" />
                            </div>
                        </div>
                        </Form.Group>
                        <Form.Group controlId="formLongitude">
                        <div className="row" style={{ marginTop: '10px'}}>
                            <div className="col-sm-4">
                                <Form.Label>Longitude</Form.Label>
                            </div>
                            <div className="col">
                                <Form.Control type="text" value={this.state.lon}
                                    onChange={e => this.setState({lon: e.target.value})}
                                    name='longitude' placeholder="Longitude" />
                            </div>
                        </div>
                        </Form.Group>
                        <Form.Group controlId="formState">
                            <div className="row" style={{ marginTop: '10px'}}>
                                <div className="col-sm-4">
                                    <Form.Label>State</Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" value={this.state.state}
                                    onChange={e => this.setState({state: e.target.value})}
                                    name='state' placeholder="State" />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formCity">
                            <div className="row" style={{ marginTop: '10px'}}>
                                <div className="col-sm-4">
                                    <Form.Label>City</Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" value={this.state.city}
                                    onChange={e => this.setState({city: e.target.value})}
                                    name='city' placeholder="City" />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formLocality">
                            <div className="row" style={{ marginTop: '10px'}}>
                                <div className="col-sm-4">
                                    <Form.Label>Locality</Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" value={this.state.locality}
                                    onChange={e => this.setState({locality: e.target.value})}
                                    name='locality' placeholder="Locality" />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formPostalCode">
                            <div className="row" style={{ marginTop: '10px'}}>
                                <div className="col-sm-4">
                                    <Form.Label>Postal Code</Form.Label>
                                </div>
                                <div className="col">
                                    <Form.Control type="text" value={this.state.postal} 
                                    onChange={e => this.setState({postal: e.target.value})}
                                    name='postalcode' placeholder="PostalCode" />
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            
            <div className="row text-center">
                <div className="col mt-10" style={{ marginTop: '20px' }}>
                    <Button variant="primary" className='col-sm-8' 
                        onClick={this.getLocation}>
                        Get Current Location
                    </Button>
                </div>
                <div className="col" style={{ marginTop: '20px' }}>
                    <Button variant="primary" className='col-sm-8  mx-100' 
                    onClick={() => this.props.onClickNext(
                        this.state.lat,
                        this.state.lon,
                        this.state.state,
                        this.state.city,
                        this.state.postal,
                        this.state.locality
                    )}>
                        Next
                    </Button>
                </div>
            </div>
      </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDc5U0P-tTdUaLRLGLCTWVTg1m1Xkwt2qA"
})(GoogleApi);