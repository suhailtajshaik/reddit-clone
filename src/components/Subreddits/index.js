import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSubreddit } from '../../contexts/SubredditContext';
import { usePosts } from '../../contexts/PostContext';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PostCard from './postCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    post: {
        paddingTop: '25px',
    }
}));

const Subreddits = () => {
    const classes = useStyles();
    const [subreddits, setsubreddits] = useState([])
    const { getSubreddits } = useSubreddit();
    const { getAllPosts, posts } = usePosts();

    useEffect(() => {
        const allSubreditsList = getSubreddits();
        setsubreddits(allSubreditsList);
    }, [getSubreddits])

    useEffect(() => {
        getAllPosts()
    })

    const renderSubreddits = () => {
        // let subreddits = getSubreddits();
        // let postOptions = {
        //     'orderByKey': 'created_at',
        //     'orderByParam': 'asc',
        //     'limitBy': 10
        // }


        return (<ul>
            {subreddits.map(subredit => {
                return (
                    <Link key={subredit.id} to={`/r/${subredit.name}`}>
                        <li key={subredit.id}>{subredit.name}</li>
                    </Link>
                )
            })}
        </ul>);
    }


    return (
        <Container maxWidth="md">
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {(posts.length > 0) && posts.map((post) => {
                            return (<div key={post.id} className={classes.post}>
                                <PostCard post={post} />
                            </div>)
                        })}
                        <Paper>
                            {renderSubreddits()}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default Subreddits;