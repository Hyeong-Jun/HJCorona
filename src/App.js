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
    constructor() {
        super();
        this.handleChange = this
            .handleChange
            .bind(this); // bind(this)는 function 안에서도 class 컴포넌트의 this를 사용할 수 있게 해줌
        this.state = {
            selected: "cases",
            data: [],
            dataTotal: [],
            center: [
                0, 0
            ],
            zoom: 3
        };
    }

    handleChange(event) {
        this.setState({selected: event.target.value}); //selected에 event.target.value를 덮어쓰기
    }

    getData() {
        // 나라별 Case
        axios
            .get(
                "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
                {
                    "headers": {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": process.env.REACT_APP_API_KEY
                    }
                }
            )
            .then(response => {
                this.setState({data: response.data.countries_stat})
            })
            .catch(err => {
                console.log(err);
            });

        // Stats 창
        axios
            .get(
                "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
                {
                    "headers": {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": process.env.REACT_APP_API_KEY
                    }
                }
            )
            .then(response => {
                this.setState({dataTotal: response.data})
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.getData();
    }

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