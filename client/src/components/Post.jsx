import React, {useState, useEffect} from 'react';
import {dbService} from 'fbase';

function Post(postObj, isOwner) {
    const [editing, setEditing] = useState(false);
    const [newPost, setNewPost] = useState(postObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await dbService
                .doc(`post/${postObj.id}`)
                .delete();
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    return (
        <div className='post'>
            {/* <h4>{boardObj.text}</h4>
        {isOwner
        && (
                <>
                    <button onClick={onDeleteClick}>Delete Post</button>
                    <button onClick={toggleEditing}>Edit Post</button>
                </>
            )
        } */
            }
            {
                editing
                    ? <><form><input value={newPost} required/></form>
                    <button onClick={toggleEditing}>Cancel </button>
                    </>
                    : (<> < h4 > {
                        postObj.text
                    }</h4> {
                        isOwner && (<> < button onClick = {
                            onDeleteClick
                        } > Delete Post</button> < button onClick = {
                            toggleEditing
                        } > Edit Post</button> </>
            )
        }
</ >)
                    }
        </div>
    )
}

export default Post;