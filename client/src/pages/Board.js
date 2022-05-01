import React, {useState, useEffect} from 'react';
import Post from '../components/Post';
import AddUser from '../components/AddUser';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import InputBase from '@material-ui/core/InputBase';
import { CircularProgress } from '@material-ui/core';

// import Link from 'next/link';
// import AppLayout from '../components/AppLayout';

// import Post from '../components/Post';
// import {dbService} from 'fBase';

// function Board(userObj) {
//     const [post, setPost] = useState('');
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         dbService
//             .collection("posts")
//             .onSnapshot((snapshot) => {
//                 const postArray = snapshot
//                     .docs
//                     .map((doc) => ({
//                         id: doc.id,
//                         ...doc.data()
//                     }));
//                 setPosts(postArray);
//             });
//     }, []);

//     const onSubmit = async (event) => {
//         event.preventDefault();
//         await dbService
//             .collection("posts")
//             .add({text: post, createdAt: Date.now(), creatorId: userObj.uid});
//         setPost('');
//     };

//     const onChange = (event) => {
//         const {target: {
//                 value
//             }} = event;
//         setPost(value);
//     };

//     return (
//         <div className='board'>
//             <form onSubmit={onSubmit}>
//                 <input
//                     value={post}
//                     onChange={onChange}
//                     type="text"
//                     placeholder="What's on your mind?"
//                     maxLength={120}/>
//             </form>
//             <div>
//                 {
//                     posts.map(
//                         (post) => (<Post key={post.id} postObj={post} isOwner={post.creatorId === userObj.uid}/>)
//                     )
//                 }
//             </div>
//         </div>
//     );
// }
class Board extends React.Component {
    // const [customers, setCustomers] = useState('');
    constructor () {
        super();
        this.state = {
            customers: "",
            searchKeyword: '',
        }
    }

    stateRefresh = () => {
        this.setState({
            customers: '',
            searchKeyword: '',
            completed: 0
        });
        this.callApi()
            .then(res=>this.setState({customers: res}))
            .catch(err=>console.log(err));
    }

    handleValueChange = (event) => {
        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }

    componentDidMount() {
        this.callApi()
            .then(res=>this.setState({customers: res}))
            .catch(err=>console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/customers');
        const body = await response.json();
        return body;
    }

    render() {
        const filteredComponents = (data) => {
            data = data.filter((c)=>{
                return c.name.indexOf(this.state.searchKeyword) > -1;
            });
            return data.map((c)=>{
                return <Post stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>
            });
        }
        const {classes} = this.props;

    // const stateRefresh = () => {
    //     setCustomers({customers: ''});
    //     fetchData();
    // }
    // useEffect(() => {
    //     fetchData();

    //     fetchData().catch(console.error);;
    // }, []);

    // const fetchData = async () => {
    //     const request = {
    //         method: "GET",
    //         redirect: "follow"
    //     }
    //     const response = await fetch('/api/customers', request);
    //     const body = await response.json();
    //     setCustomers(body);
    //     console.log("customers : ", body);
    // }

        return (
            <div>
            <Paper>
                <Table>
                    <TableHead>
                        <TableCell>번호</TableCell>
                        <TableCell>이미지</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>생년월일</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>직업</TableCell>
                        <TableCell>설정</TableCell>
                    </TableHead>
                    <TableBody>
                        {/* {this.state.customers? this.state.customers.map((c)=> {
                            return (<Post key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)
                        }): <h1>loading...</h1>} */}
                        {this.state.customers? filteredComponents(this.state.customers):
                        <TableRow>
                            <TableCell colSpan="6" align="center">
                                <CircularProgress variant="determinate" value={this.state.completed}/>
                            </TableCell>
                        </TableRow>
                        }
                    </TableBody>
                </Table>
                
            </Paper>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", padding:"1rem"}}>
                <InputBase style={{padding:"1rem"}} name="searchKeyWord" placeholder="검색" onChange={this.handleValueChange}/>
                <AddUser style={{padding:"1rem"}} stateRefresh={this.stateRefresh}/>
                
                {/* <input placeholder="검색" value={this.state.searchKeyword} onChange={this.handleValueChange}>  </input> */}
            </div>
            </div>
            
        )
    }            
}
export default Board;