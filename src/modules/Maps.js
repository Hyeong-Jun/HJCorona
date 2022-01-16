import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

class Maps extends Component {
    constructor() {
        super();
        this.state = {
            lat: 36.2442,
            lng: 128.0935,
            zoom: 13
        }
    }

    render() {
        const position = [this.state.lat, this.state.lng];

        return (
            <div>
                <MapContainer style={{ width: "100%" }} center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                </MapContainer>

            </div>

        )
    }
}

export default Maps;