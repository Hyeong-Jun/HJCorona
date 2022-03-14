// import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Covid from './pages/Covid';
import About from './pages/About';
import Board from './pages/Board';
import WorldCorona from './pages/WorldCorona';
import Vaccine from './pages/Vaccine';
import React, {Component, Fragment} from 'react';
// import {MapContainer as LeafletMap, GeoJSON, Marker, Popup} from
// 'react-leaflet'; import worldGeoJSON from 'geojson-world-map';
// import './WorldCorona.css';
// import countryCode from './countrycode-latlong';
// import {ChevronDown} from 'react-feather';

import L from "leaflet";

const axios = require('axios');

class App extends Component {
    render() {
        return (
            <div className="app-root">
                <Router basename="/HJCorona">
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<Covid/>}/>
                        <Route className="app-main" path='/worldCorona' element={<WorldCorona/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/board' element={<Board/>}/>
                        <Route path='/vaccine' element={<Vaccine/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;