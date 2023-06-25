import React from 'react';
import { useParams } from 'react-router-dom';

const User = props => {
    const { id } = useParams();

    return (
        <div>
            <h1>User Details</h1>
            ID: {id}

        </div>
    );
}
export default User;