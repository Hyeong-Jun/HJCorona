import React from 'react';
import DeleteUser from './DeleteUser';
import {TableRow, TableCell} from '@mui/material';

class Post extends React.Component {
    constructor(props) {
        super();
    }
    // const toggleEditing = () => setEditing((prev) => !prev);
    render(props) {
        return (
            // <div className='post'>
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><DeleteUser stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>

            </TableRow>

        );
    }
}

export default Post;