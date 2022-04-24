import React, {useState, useEffect, useRef} from 'react';
import { Axios } from 'axios';

function AddUser(props) {
    const [file, setFile] = useState(null); // null: byte 형식 초기화
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [job, setJob] = useState('');
    const [filename, setFilename] = useState('');
    const [frmData, setFrmData] = useState({ 
        file: null,
        name: '', 
        birthday: '',
        gender: '',
        job: '',
        filename: '',
    });
    const form = useRef(null)

    useEffect(()=>{
        Axios.get('/api/customers').then((response)=>{
            setFrmData(response.data);
            console.log("useEffect:",response.data);
        })
    })
    const handleFormSubmit = (e) => {
        e.prevenDefault(); // 데이터가 서버로 전달할때 오류 발생 막음
        addUser()
        .then((response)=>{
            console.log(response.data);
            props.stateRefresh();
        });
        console.log("frmData:",frmData);
        setFrmData({
            file: null,
            name: '', 
            birthday: '',
            gender: '',
            job: '',
            filename: ''
        });
        // const data = new FormData(form.current);
        // data.append('image', file);
        // data.append('name', name);
        // data.append('birthday', birthday);
        // data.append('gender', gender);
        // data.append('job', job);
        // console.log(data);
        // const config = { // 파일이 포함된 데이터를 서버에 전송하려면 웹 표준에 맞는 헤더를 추가한다
        //     headers: {
        //         'content-type': 'multipart/form-data' // 전달하려는 데이터에 파일이 포함할때
        //     }
        // }
        // return Axios.post('/api/customers', data, config);
        // Axios.post('/api/customers', ()=>{
        //     const data = new FormData(form.current);
        //     data.append('image', file);
        //     data.append('name', name);
        //     data.append('birthday', birthday);
        //     data.append('gender', gender);
        //     data.append('job', job);
        // }).then(()=>{
        //     console.log("usccessful insert");
        // });
        
    }

    const handleFileChange = (event) => { // 웹에 파일 업로드할때 하나의 파일만 선택 : files[0]
        // var fileIndex = e.target.files[0];
        // var fileNameIndex = e.target.value;

        // setFile(fileIndex);
        // setFilename(fileNameIndex);
        setFile({file: event.target.files[0]});
        // console.log("file:",file);
        setFilename({filename:event.target.value});
    }

    const handleValueChange = (e) => {
        // let nextState = {}; // 사용자가 변경한 값을 비교하여 그에 맞게 변경
        // nextState[e.target.name] = e.target.value;
        setFrmData({
            ...frmData,
            [e.target.name]: e.target.value
            }
        );
        console.log("frmData:", frmData);
    }
    
    const addUser = () => {
        const url = '/api/customers';
        const data = new FormData(form.current);
        data.append('image', file);
        data.append('name', name);
        data.append('birthday', birthday);
        data.append('gender', gender);
        data.append('job', job);
        console.log(data);
        const config = { // 파일이 포함된 데이터를 서버에 전송하려면 웹 표준에 맞는 헤더를 추가한다
            headers: {
                'content-type': 'multipart/form-data' // 전달하려는 데이터에 파일이 포함할때
            }
        }
        return Axios.post(url, data, config);
    }
    return (
        <div>
        <form ref={form} onSubmit={handleFormSubmit}>
            <h1> 이용자 추가 </h1>
            프로필 이미지: <input type="file" name="filename" onChange={handleFileChange}/><br/>
            이름: <input type="text" name="name" onChange={handleValueChange}/><br/>
            생년월일: <input type="text" name="birthday" onChange={handleValueChange}/><br/>
            성별: <input type="text" name="gender" onChange={handleValueChange}/><br/>
            직업 : <input type="text" name="job" onChange={handleValueChange}/><br/>
            <button type="submit">추가하기</button>
        </form>
        </div>
    );
}

export default AddUser;