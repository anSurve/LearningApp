import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import configData from "../config.json";

export class GoogleApi extends Component {


    constructor(props) {
        super(props);
        this.state = { 
            lat:  this.props.lat,
            lon: this.props.lon,
            zoom: this.props.zoom
         };
    }
    static getDerivedStateFromProps(nextProps, state) {
        
        console.log(nextProps.lat);
        console.log(nextProps.lon);
    
        return null;
      }
render() {
    return (
        <>
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
                
            </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: configData.GOOGLE_API_KEY
})(GoogleApi);