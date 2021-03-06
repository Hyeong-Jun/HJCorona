import React, {useState, useEffect} from 'react';
import Post from '../components/Post';
import AddUser from '../components/AddUser';
import { Paper, Table, TableHead, TableCell, TableBody, TableRow, InputBase, CircularProgress} from '@mui/material';
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
    constructor (props) {
        super(props);
        this.state = {
            customers: "",
            searchKeyword: '',
            completed: 0
        }
        this.stateRefresh = this.stateRefresh.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this)
    }

    stateRefresh() {
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

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
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
                        <TableCell>??????</TableCell>
                        <TableCell>?????????</TableCell>
                        <TableCell>??????</TableCell>
                        <TableCell>????????????</TableCell>
                        <TableCell>??????</TableCell>
                        <TableCell>??????</TableCell>
                        <TableCell>??????</TableCell>
                    </TableHead>
                    <TableBody>
                        {this.state.customers ?
                            this.state.customers.map(c => {
                                return <Post stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
                            }):
                            <TableRow>
                                <TableCell colSpan="6" align="center">
                                    <CircularProgress variant="determinate" value={this.state.completed} />
                                </TableCell>
                            </TableRow>
                        }
                        {/* {this.state.customers? filteredComponents(this.state.customers):
                        <TableRow>
                            <TableCell>
                                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                            </TableCell>
                        </TableRow>
                        } */}
                    </TableBody>
                </Table>
                
            </Paper>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", padding:"1rem"}}>
                <InputBase style={{padding:"1rem"}} name="searchKeyWord" placeholder="??????" onChange={this.handleValueChange}/>
                <AddUser style={{padding:"1rem"}} stateRefresh={this.stateRefresh}/>
                
                {/* <input placeholder="??????" value={this.state.searchKeyword} onChange={this.handleValueChange}>  </input> */}
            </div>
            </div>
            
        )
    }            
}
export default Board;