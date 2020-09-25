import React from "react";

import Rating from "@material-ui/lab/Rating";
import Gallery from 'react-photo-gallery';
import Edit from './edit';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import restaurants from "../../components/restaurant/restaurant.data";

class Detail extends React.Component {
    
    render() {
        const { id, edit } = this.props.match.params;
        const data = restaurants.find(r => r.id === parseInt(id));

        if (edit === 'edit')
            return <Edit data={data} />;

        const GoogleMapExample = withGoogleMap((props) => (
            <GoogleMap
                defaultCenter={data.location}
                defaultZoom={17}
            >
                <Marker position={data.location} />
            </GoogleMap>
        ));

        let IMAGES = [];
        for (let i = 0; i < data.photos.length; i++) {
            const temp = {
                src: data.photos[i],
                width: 500,
                height: 300
            };
            IMAGES.push(temp);
        }
        return (
            <div className="homepage">

                <h1>{data.name}</h1>
                <GoogleMapExample
                    containerElement={<div style={{ height: `300px`, width: "100%", margin: "20px 0px" }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <Rating name="half-rating-read" value={data.rating} precision={0.1} readOnly
                    size="small" />
                <h3>Adresse: <span className='value'>{data.address}</span></h3>
                <h3>Numéro de téléphone:  <span className='value'>{data.phone} </span></h3>

                <Gallery photos={IMAGES} direction={"row"} onClick={(e, photo) => this.openGallery(e, photo)} />

                <h3>Heures d'ouverture:</h3>
                {        data.open_hours.map((d, index) =>
                    <h5 key={index} style={{ marginLeft: '10px' }}> {d.day}: {d.hours}</h5>)}

                <h3>  Genre(s) associé(s) au restaurant: <span className='value'>{data.gender}</span></h3>
                <h3>  Fourchette de prix du restaurant: <span className='value'>CAD {data.price_min} ~ {data.price_max}</span></h3>
            </div>
        );
    }
}

export default Detail;
