import React, {useState, useEffect} from 'react';
import Post from '../components/Post';
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
function Board() {
    const [customers, setCustomers] = useState('');

    // const {classes} = this.props;

    useEffect(() => {
        const fetchData = async () => {
            const request = {
                method: "GET",
                redirect: "follow"
            }
            const response = await fetch('/api/custodmers', request);
            const body = await response.json();
            setCustomers(body);
            console.log("customers : ", body);
        }

        fetchData().catch(console.error);;
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>번호</td>
                        <td>이미지</td>
                        <td>이름</td>
                        <td>생년월일</td>
                        <td>성별</td>
                        <td>직업</td>
                    </tr>
                </thead>
                <tbody>
                    {customers? customers.map((c)=> {
                        return (<Post key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)
                    }): ""}
                </tbody>
            </table>
        </div>
    )
}
export default Board;