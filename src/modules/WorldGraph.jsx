import React, {useState, useEffect} from 'react';
import Graph from './Graph';
import Select from 'react-select';
import {Slider} from '@mui/material';

function WorldGraph() {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [options, setOptions] = useState([])
    const [firstLabel, setFirstLable] = useState('"Korea');
    const [secondLable, setSecondLable] = useState('Japan');
    const [firstSelect, setFirstSelect] = useState(162);
    const [secondSelect, setSecondSelect] = useState(157);
    const [updateDate, setUpdateDate] = useState(100);

    // api fetch
    const fetchData = async () => {
        const request = {
            method: "GET",
            redirect: "follow"
        }

        const apiUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`

        try {
            const response = await fetch(apiUrl, request);
            return response.ok
                ? response.text()
                : console.log(null)
        } catch (err) {
            console.log(err);
        }
    }

    // github에서 csv파일을 api로 불러와서 데이터 가공
    const apiCall = async () => {
        let apiValue = await fetchData();

        console.log(apiValue);
        // 날짜 데이터
        const header = apiValue
            .split('\n')
            .slice(0)
            .map(line => (line.split(',')))[0]
            .slice(4);

        // 선택한 나라의 전체 코로나 데이터
        const firstPrep = apiValue
            .split('\n')
            .slice(0)
            .map(line => (line.split(',')))[firstSelect]
        const secondPrep = apiValue
            .split('\n')
            .slice(0)
            .map(line => (line.split(',')))[secondSelect]

        // 선택한 나라 이름
        const firstLbl = firstPrep[1].toUpperCase();
        const secondLbl = secondPrep[1].toUpperCase();

        const formatData = [];

        // 날짜에 맞는 나라별 확진자 수 필터링 
        for (let i = 4; i < header.length; i++) {
            const newRow = {};
            newRow.name = header[i];
            newRow[firstLbl] = parseInt(firstPrep[i]);
            newRow[secondLbl] = parseInt(secondPrep[i]);
            
            // 최종적으로 csv 형식의 데이터를 json 형식으로 데이터 변환
            formatData.push(newRow);
        }
 
        // select태그에 넣을 나라 리스트 필터링
        const countriesList = apiValue
            .split('\n')
            .slice(1)
            .map(line => (line.split(',').slice(0, 2)));
        
            console.log(countriesList);

        // 나라에 식별 번호 부여 ex) Afghanistan을 1번 Albania를 2번
        const countriesArr = [];
        
        for (let i = 0; i < countriesList.length; i++) {
            countriesArr.push({
                label: countriesList[i]
                    .reverse()
                    .join(' : '),
                value: i + 1
            })
        }

        console.log(countriesArr);

        setFirstLable(firstLbl);
        setSecondLable(secondLbl);
        setOptions(countriesArr)
        setData(formatData);
        setIsLoading(false);

        console.log(header);
        console.log(firstPrep);

        return null;
    }

    // 선택된 값이 변할때마다 api를 불러와서 새로운 값을 저장한다
    useEffect(() => {
        apiCall();
    }, [firstSelect, secondSelect])

    const firstInput = (input) => {
        setFirstSelect(input.value)
    }

    const secondInput = (input) => {
        setSecondSelect(input.value)
    }

    const slider = (event, itemValue) => {
        setUpdateDate(itemValue);
    }

    return (
        <div className="app-wrap">
            {
                isLoading
                    ? <div>loading...</div>
                    : <div className="content-wrap">
                            <Graph data={data} label_1={firstLabel} label_2={secondLable}/>
                            <div className="selector-wrap">
                                <Select options={options} onChange={firstInput} placeholder="Korea"/>
                                <Select options={options} onChange={secondInput} placeholder="Japan"/>
                            </div>
                            <div className="actionbar">
                                <button
                                    className="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeStart"
                                    tabindex="0"
                                    type="button">
                                    <span class="MuiIconButton-label">
                                        <svg
                                            class="MuiSvgIcon-root"
                                            focusable="false"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            role="presentation">
                                            <path d="M8 5v14l11-7z"></path>
                                        </svg>
                                    </span>
                                    <span class="MuiTouchRipple-root"></span>
                                </button>
                                <Slider className="slider" onChange={slider} value={updateDate} max={200}/>
                                <div className="value">{updateDate}</div>
                            </div>
                        </div>
            }
        </div>
    );
}
export default WorldGraph;