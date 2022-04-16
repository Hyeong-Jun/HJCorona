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
                    <Line type="monotone" dataKey={props.label_1} stroke="#8884d8" dot={false} />
                    <Line type="monotone" dataKey={props.label_2} stroke="#87d110" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}


export default Graph;