import { Box, Card, CardContent, Container, CssBaseline, Divider, Grid, List, ListItem, makeStyles, Typography } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import React, { Component } from "react"
import "./info-card.styles.css";

import GradeIcon from '@material-ui/icons/Grade';
import PhoneIcon from '@material-ui/icons/Phone';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export default class InfoCard extends Component {


    render() {
        const { rating, phone, price_max, price_min, open_hours } = this.props;

        return (
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Restaurent Info
                    </Typography>
                    <Box>
                        <Typography variant="body1" className="aligned-box">
                            <GradeIcon className="icon" aria-label="rating" />
                            Rating:
                            <Rating
                                name="half-rating-read"
                                value={rating}
                                precision={0.1}
                                readOnly
                                size="small"
                            />
                        </Typography>
                    </Box>
                    <Box mt={1}>
                        <Typography variant="body1" className="aligned-box">
                            <PhoneIcon className="icon" aria-label="phone number" />Phone Number: {phone}
                        </Typography>
                    </Box>
                    <Box mt={1}>
                        <Typography variant="body1" className="aligned-box">
                            <AttachMoneyIcon className="icon" aria-label="price range" />Price Range: CAD {price_min} ~ {price_max}
                        </Typography>
                    </Box>
                    <Box mt={1}>
                        <Typography variant="body1" className="aligned-box">
                            <AccessTimeIcon className="icon" aria-label="service hours" />Service Hours
                        </Typography>
                        <List>
                            {open_hours.map((d, index) => (
                                <ListItem key={index}>
                                    {d.day}: {d.hours}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </CardContent>
            </Card>
        )
    }
}