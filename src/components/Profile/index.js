import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext';

const Profile = (props) => {
    // const [subredditDetails, setSubredditDetails] = useState();
    const { currentUser } = useAuth();
    // const userUid = props.match.params.id;

    const renderUser = () => {
        if (currentUser) {
            return (<>
                <h2>{currentUser.displayName}</h2>
            </>)
        } else {
            return (<>
                <p>Please login!</p>
            </>)
        }
    }
    return (
        <div>
            <h1>Profile</h1>
            {renderUser()}
        </div>
    )
}

export default Profile;