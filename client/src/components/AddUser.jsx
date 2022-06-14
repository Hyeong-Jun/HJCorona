import React, {useState, useEffect, useRef} from 'react';
import { post } from 'axios';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions'; 
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import {withStyles} from '@material-ui/core/styles';
import {Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Input} from '@mui/material';
import '../css/addUser.css';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
    }

    addUser = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
    }
    handleFormSubmit = (event) => {
        event.preventDefault()
        this.addUser()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            }) //고객을 추가한 이후에 서버로부터 응답을 받고 나서 상태값을 refresh. 즉, 고객목록을 보여주는 부분만 새로고침이 되어서, 정상적인 고객 데이터를 보여줌
            // 다만, 이런 방식 또한 고객 데이터가 많을 때에는 매번 새로고침을 거치는 과정에서
            // 리소스를 비효율적으로 사용할 수 있다
            // 그래서 상용 서비스에 적용할때는 최근 10개의 고객 목록만 가져오도록 해서
            // 이후의 고객정보에 대해서는 스크롤을 통해서 새롭게 불러오는 식으로 구현 가능
            // 물론 이렇게 만든 고객서비스 데이터를 혼자 사용하는 경우에는
            // 매번 서버와 통신할 필요는 없다. 고객을 추가한 이후에 자신의 화면에서 바로
            // 추가한 고객정보만을 보여주면 되기 때문이다
            // 하지만 일반적인 고객관리시스템은 여러명의 관리자가 동시에 작업가능하다는 점에서
            // 이렇게 고객을 추가할때마다 필수적으로 고객목록을 새로고침하여 다시 보여주는 방식이 더 효율적일것
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })//고객 데이터를 불러오는 과정은 비동기적으로 수행된다는 점에서
        // 항상 고객 데이터를 추가한 이후에 고객 목록 데이터를 불러온다는 것을
        // 순서적으로 보장하지 못한다. 따라서, 고객 목록을 추가한 이후에
        // 서버로부터 응답을 받고나서, 비로소 고객 목록을 다시 불러오도록 설정해야할것

    }

    handleFileChange = (event) => {
        this.setState({
            file: event.target.files[0],
            fileName: event.target.value
        })
    }

    handleValueChange = (event) => {
        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <Button className="add-button" variant="contained" color="primary" onClick={this.handleClickOpen}>
                    추가
                </Button>
                <Dialog style={{textAlign: "center"}} open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>사용자 추가</DialogTitle>
                    <DialogContent style={{left:"35px"}}>
                        <input style={{textAlign: "center"}} id="raised-button-file" accept="image/*" type="file" file={this.state.file} onChange={this.handleFileChange}/><br/>
                        <br/><label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" name="file">
                                {this.state.fileName === "" ? "사진" : this.state.fileName}
                            </Button>
                        </label>
                        <br/><br/>
                        <div style={{textAlign:"center"}}>
                            <TextField style={{textAlign:"center"}} type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/><br/>
                            <TextField style={{textAlign:"center"}} type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/><br/>
                            <TextField style={{textAlign:"center"}} type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/><br/>
                            <TextField style={{textAlign:"center"}} type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/><br/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        //  <form onSubmit={this.handleFormSubmit}>
        //      <h1> 이용자 추가 </h1>
        //      프로필 이미지: <input type="file" name="file" onChange={this.handleFileChange}/><br/>
        //      이름: <input type="text" name="name" onChange={this.handleValueChange}/><br/>
        //      생년월일: <input type="text" name="birthday" onChange={this.handleValueChange}/><br/>
        //      성별: <input type="text" name="gender" onChange={this.handleValueChange}/><br/>
        //      직업 : <input type="text" name="job" onChange={this.handleValueChange}/><br/>
        //      <button type="submit">추가하기</button>
        //  </form>
        )
    }
}

export default AddUser;