import React, { useState, useEffect } from 'react'
import { useSubreddit } from '../../contexts/SubredditContext';
import CreatePostCard from './CreatePostCard';
import { Container } from '@material-ui/core';

const Subreddit = (props) => {
    const [subredditDetails, setSubredditDetails] = useState();
    const { getSubredditDetailsFor } = useSubreddit();
    const subredditName = props.match.params.name;
    useEffect(() => {
        const subreddit = getSubredditDetailsFor(subredditName);
        setSubredditDetails(subreddit)
    }, [subredditName])

    return (
        <Container maxWidth="md">
            <CreatePostCard subredditDetails={subredditDetails} history={props.history} />
            <h1>{subredditDetails && subredditDetails.name}</h1>
            <p>{subredditDetails && subredditDetails.description}</p>
        </Container>
    )
}

export default Subreddit;