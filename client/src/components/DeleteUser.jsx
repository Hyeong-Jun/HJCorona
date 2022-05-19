import React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions'; 
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
// import Typography from '@material-ui/core/Typography';
import {Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography} from '@mui/material';
class DeleteUser extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deleteUser(id) {
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <>
            <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 사용자 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e)=>{this.deleteUser(this.props.id)}}> 삭제 </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}> 닫기 </Button>
                </DialogActions>
            </Dialog>
            </>
        )
    }
}

export default DeleteUser;