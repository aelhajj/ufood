import { Box, Card, CardContent, Container, CssBaseline, Grid, makeStyles, Typography } from "@material-ui/core"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React, { Component } from "react"

import GradeIcon from '@material-ui/icons/Grade';
import RoomIcon from '@material-ui/icons/Room';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export default class DirectionCard extends Component {


    render() {
        const { location, address } = this.props;
        const GoogleMapExample = withGoogleMap((props) => (
            <GoogleMap defaultCenter={location} defaultZoom={17}>
                <Marker position={location} />
            </GoogleMap>
        ));

        return (
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Location
                    </Typography>
                    <Box>
                        <GoogleMapExample
                            containerElement={
                                <div
                                    style={{ height: `300px`, width: "100%", margin: "20px 0px" }}
                                />
                            }
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                        <Button variant="contained" color="secondary">
                            Get Directions
                        </Button>
                    </Box>
                    <Box mt={1}>
                        <Typography variant="body1" className="aligned-box">
                            <RoomIcon aria-label="location"/>{address}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        )
    }
}
