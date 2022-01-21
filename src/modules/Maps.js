import {render} from '@testing-library/react';
import React, {Component} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import '../App.css';
import countryCode from "../countrycode-latlong.json";
import L from "leaflet";
function Maps() {
        // this.Coords = { // 초기 좌표값        
        //     lat: 36.2442,
        //     lng: 128.0935,
        //     zoom: 7
        // }
        // const position = [this.Coords.lat, this.Coords.lng];

        const customMarker = new L.Icon({
            iconUrl: require("../resources/images/marker.png"),
            iconSize: [21, 27],
        });

        return (
                <MapContainer
                    // center={position}
                    // zoom={this.Coords.zoom}
                    // scrollWheelZoom={true}>
                    center={[36, 128]} zoom={7} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    {/* {countryCode.map((latlng) => (
                        <Marker coordinate={[latlng.latlng]}>
                            <Popup>
                                <span>
                                    도시이름 popup.
                                    <br/>
                                    데이터 표시</span>
                            </Popup>
                        </Marker>
                    ))} */}
                    {countryCode.map(cc => (
                        <Marker key={cc.name} position={[cc.latlng.latitude, cc.latlng.longitude]} icon={customMarker}>
                            <Popup>
                                    대한민국
                                    <br/>
                                    서울
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
        );
    }


export default Maps;