// import React, {useState, useEffect} from 'react'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

// function Graph() {
//     const [data, setData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const apiCall = async () => {
//             let apiValue = await fetchData();
//             const header = apiValue
//                 .split("\n")
//                 .slice(0)
//                 .map(line => (line.split(',')))[4];

//             var allData= []
//             // const dataLength = apiValue.split('\n').slice(0).map(line=>(line.split(',')))[4].slice(4);
//             // console.log(dataLength);
//             for (let i = 1; i <= 284; i++) {
//                 allData = apiValue.split('\n').slice(0).map(line=>(line.split(',')))[i].slice(4); // [1] : Andora [284] : Zambia
//             }

//             for (let i=0; i<allData.length; i++){
//                 console.log(allData[i]);
//             }
            

//             const chartData = [];
            
//             for (let i = 0; i < header.length; i++){
//                 const newRow = {};
//                 newRow.name = header[i];
//                 newRow.data = parseInt(allData[i]);
//                 chartData.push(newRow);
//             }

//             setData(chartData);
//             setIsLoading(false);

//             console.log(chartData);
//             console.log(header); // date string을 객체의 식별자로서 사용한다
//             console.log(apiValue);

//             return null;
//         }
//         const fetchData = async () => {
//             const requestOption = {
//                 method: "GET",
//                 redirect: "follow"
//             }

//             const apiUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19" +
//                     "_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

//             try {
//                 const response = await fetch(apiUrl, requestOption);

//                 return response.ok
//                     ? response.text()
//                     : null
//             } catch (err) {
//                 console.log(err);
//                 return null;
//             }
//         }
//         apiCall();
//     }, [])
//     return (
//         <div className="chart-wrapper">
//             {isLoading? <div> loading... </div> :
//             <LineChart width={500} height={300} data={data} margin={{top:5, right: 30, left: 20, bottom: 5,}}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis datakey="name"/>
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r:8}}/>
//                 <Line type="monotone" dataKey ="uv" stroke="#82ca9d" />
//             </LineChart>
//             }
//         </div>
//     )
// }

// export default Graph;

import React from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import '../css/WorldCorona.css';

// WorldGraph의 자식 컴포넌트. props를 이용하여 부모 컴포넌트가 전해준 값에 접근한다
function Graph(props) {

    return (
        <div className="chart-wrapper">
            <ResponsiveContainer width='100%'>
                <LineChart
                    data={props.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={props.label_1} stroke="#8884d8"/>
                    <Line type="monotone" dataKey={props.label_2} stroke="#87d110"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}


export default Graph;