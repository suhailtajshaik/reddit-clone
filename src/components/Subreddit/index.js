import React, { useState, useEffect } from 'react'
import { useSubreddit } from '../../contexts/SubredditContext';
import CreatePostCard from './CreatePostCard';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { usePosts } from '../../contexts/PostContext';
import { useAuth } from '../../contexts/AuthContext'
import { get } from 'lodash';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '25px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
}));

const Subreddit = (props) => {
    const classes = useStyles();
    const [subredditDetails, setSubredditDetails] = useState();
    const [subredditId, setSubredditID] = useState();
    const [subredditPosts, setSubredditPosts] = useState();
    const { getPostsForSubredditById, selectedPostsById } = usePosts();
    const { currentUser } = useAuth();
    const { getSubredditDetailsByName } = useSubreddit();
    const subredditName = props.match.params.name;

    useEffect(() => {
        const subreddit = getSubredditDetailsByName(subredditName);
        setSubredditDetails(subreddit)
    })

    useEffect(() => {
        let id = get(subredditDetails, 'id');
        if (id) {
            setSubredditID(id);
        }
    }, [get(subredditDetails, 'id')]);

    useEffect(() => {
        getPostsForSubredditById(subredditId);
    }, [subredditId]);
    return (
        <Container maxWidth="md">
            {(currentUser !== null) ? <CreatePostCard subredditDetails={subredditDetails} history={props.history} />
                : (<div className={classes.root}>
                    <Paper className={classes.paper}>Please login in to create new post!</Paper>
                </div>
                )}
            <h1>{subredditDetails && subredditDetails.name}</h1>
            <p>{subredditDetails && subredditDetails.description}</p>
        </Container>
    )
}

export default Subreddit;