// import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import Section from './components/section';
import Covid from './pages/Covid';
import About from './pages/About';
import Board from './pages/Board';
import WorldCorona from './pages/WorldCorona'
// import Contents from './components/Contents'; import Footer from
// './components/footer'; import React from 'react'; function App() {   return (
// <div className="App">       <Router>         <Navbar />         <Routes>
// <Route path='/' element={<Covid/>} />           <Route path='/about'
// element={<About/>} />           <Route path='/board' element={<Board/>} />
// </Routes>       </Router>       {/*<Section />*/}       {/* <Contents /> */}
// {/*<Footer />*/}     </div>   ); } export default App;
import React, {Component, Fragment} from 'react';
// import {MapContainer as LeafletMap, GeoJSON, Marker, Popup} from
// 'react-leaflet'; import worldGeoJSON from 'geojson-world-map';
import './styles.css';
// import countryCode from './countrycode-latlong';
import "leaflet/dist/leaflet.css";
// import {ChevronDown} from 'react-feather';

import L from "leaflet";

// SVG to URL

const customMarker = (ratio, rgb) => new L.icon({
    iconUrl: "data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' fill='non" +
            "e' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='25' r='24' fill=" +
            "'%23" + rgb + "' fill-opacity='0.6' stroke='%23" + rgb + "' stroke-width='2'/%" +
            "3E%3C/svg%3E%0A",
    iconSize: 5 * ratio,
    iconAnchor: [
        2.5 * ratio,
        2.5 * ratio
    ]
});

const axios = require('axios');

class App extends Component {
    constructor() {
        super();
        this.handleChange = this
            .handleChange
            .bind(this);
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
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<Covid/>}/>
                        <Route path='/WorldCorona' element={<WorldCorona/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/board' element={<Board/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;
