import React, {useState, useEffect} from 'react';
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
    return (
        <div>Board</div>
    )
}
export default Board;