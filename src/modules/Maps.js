import {render} from '@testing-library/react';
import React, {Component, useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import '../App.css';
import countryCode from "../countrycode-latlong.json";
import L from "leaflet";
// import { Bar, Doughnut, Line } from "react-chartjs-2";
// // useState에 데이터 담아서 배열을 관리
// // useEffect 패치api사용
// // axios 라이브러리와 차트를 보여주기 위해 react.js의 차트.js 다운
// // npm install axios react-chartjs-2 --save
import axios from "axios";
// const Contents = () => {
//     const [confirmedData, setConfirmedData] = useState({});
//     const [quarantinedData, setQuarantinedData] = useState({});
//     const [comparedData, setComparedData] = useState({});
//     useEffect(() => {
//         const fetchEvents = async () => {
//             const res = await axios.get(
//                 "https://api.covid19api.com/total/dayone/country/kr"
//             );
//             makeData(res.data);
//         };

//         const makeData = (items) => {
//             const arr = items.reduce((acc, cur) => {
//                 const currentDate = new Date(cur.Date);
//                 const year = currentDate.getFullYear();
//                 const month = currentDate.getMonth();
//                 const date = currentDate.getDate();
//                 //년,월,일을 가져오기
//                 const confirmed = cur.Confirmed;
//                 const active = cur.Active;
//                 const death = cur.Death;
//                 const recovered = cur.Recovered;

//                 const findItem = acc.find((a) => a.year === year && a.month === month);

//                 if (!findItem) {
//                     acc.push({
//                         year,
//                         month,
//                         date,
//                         confirmed,
//                         active,
//                         death,
//                         recovered
//                     });
//                 }
//                 if (findItem && findItem.date < date) {
//                     findItem.active = active;
//                     findItem.death = death;
//                     findItem.year = year;
//                     findItem.month = month;
//                     findItem.recovered = recovered;
//                     findItem.confirmed = confirmed;
//                 }
//                 return acc;
//             }, []);
            // <div>
//             const labels = arr.map((a) => `${a.month + 1}월`);
//             setConfirmedData({
//                 labels,
//                 datasets: [
//                     {
//                         label: "국내 누적 확진자",
//                         backgroundColor: "salmon",
//                         fill: true,
//                         data: arr.map((a) => a.confirmed)
//                     }
//                 ]
//             });
//             setQuarantinedData({
//                 labels,
//                 datasets: [
//                     {
//                         label: "국내 누적 확진자",
//                         borderColor: "salmon",
//                         fill: false,
//                         data: arr.map((a) => a.active)
//                     }
//                 ]
//             });
//             const last = arr[arr.length - 1];
//             setComparedData({
//                 labels: ["확진자", "격리해제", "사망"],
//                 datasets: [
//                     {
//                         label: "누적 확진, 해제, 사망 비율",
//                         backgroundColor: ["#ff3d67", "#059bff", "#ffc233"],
//                         borderColor: ["#ff3d67", "#059bff", "#ffc233"],
//                         fill: false,
//                         data: [last.confirmed, last.recovered, last.death]
//                     }
//                 ]
//             });
            // </div>
//         };

//         fetchEvents();
//     }, []);
// }

function Maps() {
        const customMarker = new L.Icon({
            iconUrl: require("../resources/images/marker.png"),
            iconSize: [21, 27],
        });

        return (
            <MapContainer
                center={[36, 127.5]} 
                zoom={7} 
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                
                {countryCode.map(cc => (
                    <Marker key={cc.name} position={[cc.latlng.latitude, cc.latlng.longitude]} icon={customMarker}>
                        <li>
                            <Popup>
                                {cc.name}
                                <br/>
                                {cc.capital}
                            </Popup>
                        </li>
                    </Marker>
                ))}
            </MapContainer>
        );
    }


export default Maps;