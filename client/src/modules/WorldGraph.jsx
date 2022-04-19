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
    const [currentValue, setCurrentValue] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [updateActive, setUpdateActive] = useState(false);
    const [updateInterval, setUpdateInterval] = useState(200);
    const [countriesStats, setCountriesStats] = useState([]);
    const [countriesSelected, setcountriesSelected] = useState([]);
    const [totalInfections, setTotalInfections] = useState(0);
    const [countryName, setCountryName] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [usePropStats, setUsePropStats] = useState(0);
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

        const selectedAllPrep = apiValue
            .split('\n')
            .slice(0)
            .map(line => (line.split(',')))[firstSelect]
        
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
            
            // 최종적으로 csv 형식의 데이터를 Dictionary 형식으로 데이터 변환
            formatData.push(newRow);
        }
        console.log(formatData);

        // select태그에 넣을 나라 리스트 필터링
        const countriesList = apiValue
            .split('\n')
            .slice(1)
            .map(line => (line.split(',').slice(0, 2)));
        
            console.log(countriesList);
            // console.log(countriesList[i][1]);
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

    const onSliderChangeIndex = (e) => {
        var index = e.target.value;
        setCurrentValue(index);
        setUpdateDate(index);

        // console.log("App onSliderChanged " + index);
        // updateData(index);
    }

    const onClickStart = (e) => {
        toggleAnimation();
    }

    const toggleAnimation = () => {
        setUpdateActive(!updateActive);

        let frameInterval;
        if (this.frameInterval >= 0) {
            window.clearInterval(this.frameInterval);
            this.frameInterval = -1;
            console.log("App animation stopped");
            this.updateQuery();

        } else {
            console.log("App animation starting");
            let index = currentValue;
            if (index >= maxValue) {
                index = 0;
            }
            updateData(index);
            frameInterval = window.setInterval(() => tick(), updateInterval);
        }
    }

    const tick = () => {
        let index = setCurrentValue(currentValue + 1);
        if (index > maxValue) {
            this.toggleAnimation();
        }
        else {
            this.updateData(index);
        }

    }
    // s: ListView, items: string[]
    const onSelectedListInfections = (s, items) => {
        if (this.state.updateActive) { return; }
        if (this.listsUpdating) { return; }

        this.listsUpdating = true;
        console.log("App SelectedList " + items.join(' '));

        this.setState({ countriesSelected: items, },
             () => {
                 this.listDeaths.selectData(items);
                 this.updateRanges(items);
                 this.updateData();  });
    }

    // index?: number, usePropStats?: boolean
    const updateData = (index, usePropStats) => {
        // console.log("on updateData           " + this.state.countriesSelected.join(' '));

        if (index === undefined || index === null) {
            // index = this.state.currentIndex;
            index = currentIndex;
        }

        if (usePropStats === undefined || usePropStats === null) {
            // usePropStats = this.state.usePropStats;
            setUsePropStats(usePropStats);
        }

        let thresholdProp = "totalInfections";
        let thresholdValue = 1;
        if (this.state.xAxisMemberPath === "totalInfections") {
            thresholdProp = "totalInfections";
            thresholdValue = usePropStats ? 1 : 1;
        }  else {
            thresholdProp = "totalDeaths";
            thresholdValue = usePropStats ? 1 : 1;
        }

        let date = "";
        for (let outbreak of this.state.countriesStats) {

            let scale = 1;
            if (usePropStats) {
                scale = outbreak.population / 1000000;
            }

            let last = outbreak.history.length;
            if (last > index) {
                outbreak.totalInfections = outbreak.history[index].totalInfections / scale;
                outbreak.totalRecoveries = outbreak.history[index].totalRecoveries / scale;
                outbreak.totalDeaths     = outbreak.history[index].totalDeaths / scale;

                outbreak.date = outbreak.history[index].date;

                if (date === "" && outbreak.history[index].totalInfections > 1) {
                    date = outbreak.history[index].date;
                }
            }

            outbreak.progress = [];

            // updating history progress only for selected countries
            let isCountrySelected = this.state.countriesSelected.indexOf(outbreak.iso) >= 0;
            if (isCountrySelected) {
                for (let i = 0; i <= index; i++) {

                    if (outbreak.history[i][thresholdProp] >= thresholdValue) {
                        let stats = apiCall();
                        stats.date = outbreak.history[i].date;
                        stats.totalInfections  = outbreak.history[i].totalInfections / scale;
                        stats.totalRecoveries  = outbreak.history[i].totalRecoveries / scale;
                        stats.totalDeaths      = outbreak.history[i].totalDeaths / scale;

                        outbreak.progress.push(stats);
                    }
                }
            }
        }

        // console.log('App updateData ' + index + '  ' + usePropStats + '  ' + date);
        
        this.setState({
            currentIndex: index,
            currentDate: date,
            countriesStats: this.state.countriesStats
            }, this.refreshAll );
    }

    const firstInput = (input) => {
        setFirstSelect(input.value)
    }

    const secondInput = (input) => {
        setSecondSelect(input.value)
    }

    // const slider = (event, itemValue) => {
    //     setUpdateDate(itemValue);
    // }

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
                                    type="button"
                                    onClick={onClickStart}>
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
                                <Slider className="slider" onChange={onSliderChangeIndex} value={currentValue} min={minValue} max={maxValue} />
                                <div className="value">{updateDate}</div>
                            </div>
                            <div className="left-list">
                                        <div className="left-list-header">
                                            <div className="header-name">
                                                Total Cases
                                            </div>
                                            <div className="header-value">
                                                {totalInfections}
                                            </div>
                                        </div>
                                        <div className="left-list-live">
                                            {/* <div className="country-name">{countryName}</div>
                                            <div className="country-cases">{totalInfections}</div> */}
                                            <table border="1">
                                                <tbody>
                                                {options.map((item)=>{
                                                    return (
                                                    <tr>
                                                        <td>
                                                            {/* {countryName} */}
                                                            {item.label}
                                                        </td>
                                                        <td>
                                                            {totalInfections}
                                                            
                                                        </td>
                                                    </tr>
                                                    );
                                                    })}
                                                </tbody>
                                            </table>
                                            
                                        </div>
                                    </div>
                        </div>
            }
        </div>
    );
}
export default WorldGraph;