// import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Section from './components/section';
import Covid from './pages/Covid';
import About from './pages/About';
import Board from './pages/Board';
import WorldCorona from './pages/WorldCorona'
import React, {Component, Fragment} from 'react';
// import {MapContainer as LeafletMap, GeoJSON, Marker, Popup} from
// 'react-leaflet'; import worldGeoJSON from 'geojson-world-map';
import './styles.css';
// import countryCode from './countrycode-latlong';
import "leaflet/dist/leaflet.css";
// import {ChevronDown} from 'react-feather';

import L from "leaflet";

const axios = require('axios');

class App extends Component {
    render() {
        return (
            <div>
                <Router basename="/HJCorona">
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<Covid/>}/>
                        <Route path='/worldCorona' element={<WorldCorona/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/board' element={<Board/>}/>
                        <Route path='/section' element={<Section/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;