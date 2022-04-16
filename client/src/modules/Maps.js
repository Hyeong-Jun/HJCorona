import {render} from '@testing-library/react';
import React, {Component, useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, ZoomControl} from 'react-leaflet';
import '../App.css';
import countryCode from "../countrycode-latlong.json";
import L from "leaflet";

// const mysql = require('mysql');
// const conn = {  // mysql 접속 설정
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: '',
//     database: 'caseinfo'
// };

// var connection = mysql.createConnection(conn);
// connection.connect();

// var findConfirmedCase = "Select * From confirmed_case;";

// connection.query()

function PopupContent({countryCode}) {
    return (
        <div>
            {countryCode.name}
            <br/>
            {countryCode.capital}
        </div>
    );
}



function Maps() {
        const customMarker = new L.Icon({
            iconUrl: require("../resources/images/marker.png"),
            iconSize: [21, 27],
        });

        return (
            <MapContainer
                center={[36, 127.5]} 
                zoom={7}
                maxZoom={15}
                zoomControl={false}
                scrollWheelZoom={true}>
                <ZoomControl position="bottomright"/>
                <TileLayer
                    detectRetina={true}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                
                {countryCode.map(cc => (
                    <Marker key={cc.name} position={[cc.latlng.latitude, cc.latlng.longitude]} icon={customMarker}>
                        <Popup>
                            <PopupContent countryCode={cc}/>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        );
    }


export default Maps;