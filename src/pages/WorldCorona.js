import React, {Component, Fragment, useState} from 'react';
import {MapContainer as LeafletMap, GeoJSON, Marker, Popup, ZoomControl} from 'react-leaflet';
import worldGeoJSON from 'geojson-world-map';
import '../css/WorldCorona.css';
import Footer from '../components/footer';
import countryCode from '../countrycode-latlong.js';
import {ChevronDown} from 'react-feather';
import L from "leaflet";
import WorldGraph from '../modules/WorldGraph';

const customMarker = (ratio, rgb) => new L.icon({
    iconUrl: "data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' fill='non" +
            "e' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='25' r='24' fill=" +
            "'%23" + rgb + "' fill-opacity='0.6' stroke='%23" + rgb + "' stroke-width='2'/%" +
            "3E%3C/svg%3E%0A",
    iconSize: 2.5 * ratio,
    iconAnchor: [
        2.5 * ratio,
        2.5 * ratio
    ]
});

const axios = require('axios');
// var mql = window.matchMedia('(max-width: 360px)');
class WorldCorona extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.handleChange = this
            .handleChange
            .bind(this);
        this.state = {
            matches: window.matchMedia("(max-width: 360px)").matches,
            selected: "cases",
            data: [],
            dataTotal: [],
            dailyConfirmedData: [],
            updateDay: "",
            center: [
                0, 0
            ],
            zoom: 3
        };
    }

    handleChange = (event) => {
        this.setState({selected: event.target.value});
    }

    getData = () => {
        axios
            .get(
                "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
            )
            .then(response => {
                console.log(response);
                this.setState({dailyConfirmedData: response.dailyConfirmedData});
                console.log(this.state.dailyConfirmedData[0]);
            })
            .catch(err => {
                console.log(err);
            });
            
        axios
            .get(
                "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
                {
                    "params": {
                        country: 'S-Korea'
                    },
                    "headers": {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": "92f2bb5bbamsh9743e5ccf295a2ep1d8c9ajsn5955487eeedc"
                    }
                }
            )
            .then(response => {
                this.setState({data: response.data.countries_stat});
            })
            .catch(err => {
                console.log(err);
            });

        axios
            .get(
                "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
                {
                    "params": {
                        country: 'S-Korea'
                    },
                    "headers": {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.co",
                        "x-rapidapi-key": "92f2bb5bbamsh9743e5ccf295a2ep1d8c9ajsn5955487eeedc"
                    }
                }
            )
            .then(response => {
                this.setState({dataTotal: response.data});
            })
            .catch(err => {
                console.log(err);
            });

        axios
            .get(
                "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
                {
                    "params": {
                        country: 'S-Korea'
                    },
                    "headers": {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.co",
                        "x-rapidapi-key": "92f2bb5bbamsh9743e5ccf295a2ep1d8c9ajsn5955487eeedc"
                    }
                }
            )
            .then(response => {
                console.log(response)
                this.setState({updateDay: response.data.statistic_taken_at});
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate() {
        {this.state.matches? console.log("360px 이하") : console.log("360px 이상")}
    }


    
    render() {
        
        return (
            <Fragment>
                <div className="main">
                    <div className="app-content">
                        <div className="app-right">
                            <div className="status_infoArea">
                                <div>
                                    <h3 className="m_tit_sub">
                                        <span>예방접종실적 현황</span>
                                    </h3>
                                    <div className="today_info_group">
                                        <ul className="today_info_list">
                                            <li>
                                                <div className="tit">
                                                    <span>구분</span>
                                                </div>
                                                <ul className="inner">
                                                    <li>당일누적</li>
                                                    <li>당일실적</li>
                                                    <li>전일누적</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div className="tit">
                                                    <span>1차접종</span>
                                                </div>
                                                <ul className="inner">
                                                    <li>
                                                        <span>44,568,730</span>
                                                    </li>
                                                    <li>
                                                        <span>9,349</span>
                                                    </li>
                                                    <li>
                                                        <span>44,559,381</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div className="tit">
                                                    <span>2차접종</span>
                                                </div>
                                                <ul className="inner">
                                                    <li>
                                                        <span>43,801,851</span>
                                                    </li>
                                                    <li>
                                                        <span>17,952</span>
                                                    </li>
                                                    <li>
                                                        <span>43,783,899</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div className="tit">
                                                    <span>3차접종</span>
                                                </div>
                                                <ul className="inner">
                                                    <li>
                                                        <span>25,232,604</span>
                                                    </li>
                                                    <li>
                                                        <span>258,013</span>
                                                    </li>
                                                    <li>
                                                        <span>24,974,591</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="m_tit_sub">
                                        <span>세계 확진자 현황</span>
                                    </h3>
                                    <div className="leafletMap">
                                        <LeafletMap
                                            center={[0, 0]}
                                            zoom={3}
                                            maxZoom={15}
                                            minZoom={2}
                                            attributionControl={true}
                                            zoomControl={false}
                                            doubleClickZoom={true}
                                            scrollWheelZoom={true}
                                            dragging={true}
                                            animate={true}
                                            easeLinearity={0.35}>
                                            
                                            <GeoJSON
                                                data={worldGeoJSON}
                                                style={() => ({weight: 0.5, color: "#292929", fillColor: "rgb(65, 65, 65)", fillOpacity: 1})}/> {
                                                this
                                                    .state
                                                    .data
                                                    .map((value, index) => {
                                                        let cases = value
                                                            .cases
                                                            .replace(/,/g, "");
                                                        let recovered = value
                                                            .total_recovered
                                                            .replace(/,/g, "");
                                                        let active = value
                                                            .active_cases
                                                            .replace(/,/g, "");
                                                        let deaths = value
                                                            .deaths
                                                            .replace(/,/g, "");
                                                        var cases_ratio = 0;
                                                        var rgb = "";
                                                        if (this.state.selected === "cases") {
                                                            cases_ratio = Math.pow(cases, 0.2);
                                                            rgb = "a9002a";
                                                        } else if (this.state.selected === "active") {
                                                            cases_ratio = Math.pow(active, 0.2);
                                                            rgb = "ffc107";
                                                        } else if (this.state.selected === "recovered") {
                                                            cases_ratio = Math.pow(recovered, 0.2);
                                                            rgb = "28a745";
                                                        } else {
                                                            cases_ratio = Math.pow(deaths, 0.2);
                                                            rgb = "9c9c9c";
                                                        }
                                                        return (
                                                            (countryCode.find((el) => el.name === value.country_name))
                                                                ? (
                                                                    <Marker
                                                                        key={index}
                                                                        position={countryCode.find((el) => el.name === value.country_name) && countryCode
                                                                            .find((el) => el.name === value.country_name)
                                                                            .latlng}
                                                                        icon={customMarker(cases_ratio, rgb)}>
                                                                        <Popup className={'popup'}>
                                                                            <div
                                                                                style={{
                                                                                    fontSize: "1.5em",
                                                                                    fontWeight: "bold"
                                                                                }}>{value.country_name}<span
                                                                                style={{
                                                                            fontSize: "12px"
                                                                        }}></span>
                                                                            </div>

                                                                            <br></br>
                                                                            <p>
                                                                                <b>누적 확진
                                                                                </b>
                                                                                <span
                                                                                    style={{
                                                                                        color: '#A90000',
                                                                                        float: 'right'
                                                                                    }}>{value.cases}</span>
                                                                            </p>
                                                                            <p>
                                                                                <b>일일 확진
                                                                                </b>
                                                                                <span
                                                                                    style={{
                                                                                        color: '#A90000',
                                                                                        float: 'right'
                                                                                    }}>{value.new_cases}</span>
                                                                            </p>
                                                                            <p>
                                                                                <b>격리 해제(회복)
                                                                                </b>
                                                                                <span
                                                                                    style={{
                                                                                        color: '#28a745',
                                                                                        float: 'right'
                                                                                    }}>{value.total_recovered}</span>
                                                                            </p>
                                                                            <p>
                                                                                <b>격리 중
                                                                                </b>
                                                                                <span
                                                                                    style={{
                                                                                        color: '#ffc107',
                                                                                        float: 'right'
                                                                                    }}>{value.active_cases}</span>
                                                                            </p>
                                                                            <p>
                                                                                <b>누적 사망
                                                                                </b>
                                                                                <span
                                                                                    style={{
                                                                                        float: 'right'
                                                                                    }}>{value.deaths}</span>
                                                                            </p>
                                                                            <p>
                                                                                <b>일일 사망
                                                                                </b>
                                                                                <span
                                                                                    style={{
                                                                                        float: 'right'
                                                                                    }}>{value.new_deaths}
                                                                                </span>
                                                                            </p>
                                                                            <p>
                                                                                <b>재원 위중증
                                                                                </b>
                                                                                <span
                                                                                    style={{
                                                                                        float: 'right'
                                                                                    }}>{value.serious_critical}
                                                                                </span>
                                                                            </p>
                                                                            <p>
                                                                                <b>100만명 당 확진
                                                                                </b>
                                                                                <span
                                                                                    style={{
                                                                                        float: 'right'
                                                                                    }}>{value.total_cases_per_1m_population}
                                                                                </span>
                                                                            </p>
                                                                        </Popup>
                                                                    </Marker>
                                                                )
                                                                : (console.log("Lat/Lng - Country not found : " + value.country_name))
                                                        )
                                                    })
                                            }
                                            <div className="info-box" id="choices_desktop">
                                                <ul>
                                                    <li
                                                        className={this.state.selected === "cases"
                                                            ? "active"
                                                            : undefined}
                                                        onClick={() => {
                                                            this.setState({selected: "cases"})
                                                        }}>
                                                        누적 확진
                                                    </li>
                                                    <li
                                                        className={this.state.selected === "active"
                                                            ? "active"
                                                            : undefined}
                                                        onClick={() => {
                                                            this.setState({selected: "active"})
                                                        }}>
                                                        격리 중
                                                    </li>
                                                    <li
                                                        className={this.state.selected === "recovered"
                                                            ? "active"
                                                            : undefined}
                                                        onClick={() => {
                                                            this.setState({selected: "recovered"})
                                                        }}>
                                                        격리 해제(회복)
                                                    </li>
                                                    <li
                                                        className={this.state.selected === "deaths"
                                                            ? "active"
                                                            : undefined}
                                                        onClick={() => {
                                                            this.setState({selected: "deaths"})
                                                        }}>
                                                        누적 사망
                                                    </li>
                                                </ul>
                                            </div>
                                            <div
                                                className="info-box"
                                                id="total"
                                                style={{
                                                    width: "100px"
                                                }}>
                                                <p>
                                                    <b>누적 확진
                                                    </b>
                                                    <span
                                                        style={{
                                                            color: '#A90000'
                                                        }}>{this.state.dataTotal.total_cases}</span>
                                                </p>
                                                <p>
                                                    <b>일일 확진
                                                    </b>
                                                    <span
                                                        style={{
                                                            color: '#A90000'
                                                        }}>{this.state.dataTotal.new_cases}</span>
                                                </p>
                                                <p>
                                                    <b>누적 격리 해제(회복)
                                                    </b>
                                                    <span
                                                        style={{
                                                            color: '#28a745'
                                                        }}>{this.state.dataTotal.total_recovered}</span>
                                                </p>
                                                <p>
                                                    <b>누적 사망
                                                    </b>
                                                    <span>{this.state.dataTotal.total_deaths}</span>
                                                </p>
                                                <p>
                                                    <b>일일 사망
                                                    </b>
                                                    <span>{this.state.dataTotal.new_deaths}</span>
                                                </p>
                                                <div className="select">
                                                    <label htmlFor="select">
                                                        <b>Choose a view</b>
                                                    </label>
                                                    <div id="select">
                                                        <select value={this.state.selected} name="select" onChange={this.handleChange}>
                                                            <option value="cases">누적 확진</option>
                                                            <option value="active">격리 중</option>
                                                            <option value="recovered">격리 해제(회복)</option>
                                                            <option value="deaths">누적 사망</option>
                                                        </select>
                                                        <ChevronDown size={"18px"}/>
                                                    </div>
                                                </div>
                                                <b
                                                    style={{
                                                        fontSize: "10px",
                                                        display: "block",
                                                        paddingRight: "0px",
                                                        textAlign: "right"
                                                    }}>업데이트 날짜 : {this.state.updateDay}</b>
                                            </div>
                                        </LeafletMap>
                                    </div>

                                    <div className="left-list">
                                        <div className="left-list-header">
                                            <div className="header-name">
                                                Total Deaths
                                            </div>
                                            <div className="header-value">
                                                {this.state.dataTotal.total_deaths}
                                            </div>
                                        </div>
                                        <div className="left-list-live">
                                            <div>
                                                <div>
                                                    <div>
                                                        <div>
                                                            <div>
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <td>
                                                                                나라이름
                                                                            </td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                {this.state.data.country_name}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <WorldGraph/>
                    <Footer/>
                </div>
            </Fragment>
        );
    }
}

export default WorldCorona;