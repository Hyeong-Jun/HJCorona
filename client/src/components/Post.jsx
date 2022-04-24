import React from 'react';

// function Post(postObj, isOwner, props) {
function Post(props) {
    // const [editing, setEditing] = useState(false);
    // const [newPost, setNewPost] = useState(postObj.text);

    // const onDeleteClick = async () => {
    //     const ok = window.confirm("삭제하시겠습니까?");
    //     if (ok) {
    //         await dbService
    //             .doc(`post/${postObj.id}`)
    //             .delete();
    //     }
    // };

    // const toggleEditing = () => setEditing((prev) => !prev);

    return (
        // <div className='post'>
        
            <tr>
                <td>{props.id}</td>
                <td><img src={props.image} alt="profile"/></td>
                <td>{props.name}</td>
                <td>{props.birthday}</td>
                <td>{props.gender}</td>
                <td>{props.job}</td>
            </tr>
            // <CustomerProfile id={props.id} image={props.image} name={props.name}/> */}
            // <CustomerInfo birthday={props.birthday} gender={props.gender} job={props.job}/> */}
        
    );
            }
//         <h4>{boardObj.text}</h4>
//         {isOwner
//         && (
//                 <>
//                     <button onClick={onDeleteClick}>Delete Post</button>
//                     <button onClick={toggleEditing}>Edit Post</button>
//                 </>
//             )
//         }
        
//                 {editing
//                     ? <><form><input value={newPost} required/></form>
//                     <button onClick={toggleEditing}>Cancel </button>
//                     </>
//                     : (<> < h4 > {
//                         postObj.text
//                     }</h4> {
//                         isOwner && (<> < button onClick = {
//                             onDeleteClick
//                         } > Delete Post</button> < button onClick = {
//                             toggleEditing
//                         } > Edit Post</button> </>
//             )
//         }
// </ >)
//                     }
//         </div>
//     )
// }

export default Post;