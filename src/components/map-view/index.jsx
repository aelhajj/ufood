import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import Rating from "@material-ui/lab/Rating";

import { styles } from "./mapStyle";
import "./Maps.css";

const DEFAULT_MAP_LOCATION = { lat: 46.8119889, lng: -71.2034528 };
const DEFAULT_MAP_ZOOM = 9;

class Map extends Component {
  static defaultProps = {
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCKC_4Y4NwiHHobVhoDzCbuk69cY-QU9lk&v=3.exp&libraries=geometry,drawing,places",
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: [],
      places: this.props.places,
    };
    this.openInfoWindow = this.openInfoWindow.bind(this);
  }

  CMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={DEFAULT_MAP_ZOOM}
        defaultCenter={this.props.currentPos}
        options={{
          styles: styles,
          disableDefaultUI: false,
        }}
      >
        {props.children}
      </GoogleMap>
    ))
  );

  onMarkerClustererClick = () => (markerClusterer) => {
    const clickedMarkers = markerClusterer.getMarkers();
    console.log(`Current clicked markers length: ${clickedMarkers.length}`);
    console.log(clickedMarkers);
  };
  openInfoWindow(e, index) {
    var temp = this.state.isOpen;
    temp[index] = true;
    this.setState({
      isOpen: temp,
    });
  }
  closeInfoWindow(e, index) {
    var temp = this.state.isOpen;
    temp[index] = false;
    this.setState({
      isOpen: temp,
    });
  }

  componentWillReceiveProps(next) {
    //Filter Data
    var places = next.places;

    //Set data
    this.setState({
      places: places,
    });
  }
  render() {
    var places = this.state.places;
    return (
      <Fragment>
        <this.CMap
          googleMapURL={this.props.googleMapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div
              className="mainMap"
              style={this.props.type === "state" ? { height: "450px" } : null}
            />
          }
          mapElement={<div style={{ height: `100%` }} />}
          center={DEFAULT_MAP_LOCATION}
        >
          {places.map((e, index) => (
            <Marker
              key={index}
              position={{
                lat: e.location.coordinates[1],
                lng: e.location.coordinates[0],
              }}
              onClick={(e) => this.openInfoWindow(e, index)}
            >
              {this.state.isOpen[index] && (
                <InfoWindow
                  onCloseClick={(e) => this.closeInfoWindow(e, index)}
                >
                  <div className="infoWindowView">
                    <div>
                      <img
                        className="markerImg"
                        alt="img"
                        src={e.pictures[0]}
                      />
                    </div>
                    <div className="markerText">
                      <p
                        className="text2"
                        style={{
                          fontSize: "15px",
                          color: "white",
                          marginTop: "10px",
                          marginBottom: "10px",
                          textAlign: "center",
                        }}
                      >
                        {e.name}
                      </p>
                      <Rating name="read-only" value={e.rating} readOnly />
                      <Link
                        to={{
                          pathname: "/restaurant/" + e.id + "/view",
                        }}
                      >
                        <p
                          className="textClickable"
                          style={{ fontSize: "15px", color: "white" }}
                        >
                          {" "}
                          View Details{" "}
                        </p>
                      </Link>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </this.CMap>
      </Fragment>
    );
  }
}

export default Map;
