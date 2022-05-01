import React from 'react';
import DeleteUser from './DeleteUser';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
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
        <TableRow>
            <TableCell>{props.id}</TableCell>
            <TableCell><img src={props.image} alt="profile"/></TableCell>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.birthday}</TableCell>
            <TableCell>{props.gender}</TableCell>
            <TableCell>{props.job}</TableCell>
            <TableCell><DeleteUser stateRefresh={props.stateRefresh} id={props.id} /></TableCell>
            
        </TableRow>
            // <tr>
            //     <td>{props.id}</td>
            //     <td><img src={props.image} alt="profile"/></td>
            //     <td>{props.name}</td>
            //     <td>{props.birthday}</td>
            //     <td>{props.gender}</td>
            //     <td>{props.job}</td>
            //     <td><DeleteUser stateRefresh={props.stateRefresh} id={props.id} /></td>
            // </tr>
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