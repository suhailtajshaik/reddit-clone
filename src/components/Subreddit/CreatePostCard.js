import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

// 
import RedditIcon from '@material-ui/icons/Reddit';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';

import { useSubreddit } from '../../contexts/SubredditContext';
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '25px',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '80%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const CreatePostCard = (props) => {
    const classes = useStyles();
    const { currentUser } = useAuth();
    const [subreddit, setSubreddit] = useState('');
    const { getSubredditDetailsByName } = useSubreddit();

    const { history, subredditDetails } = props;
    useEffect(() => {
        if (!subredditDetails) {
            const searchKey = history.location.pathname.split('/')[2];
            const selectedSubreddit = getSubredditDetailsByName(searchKey);
            setSubreddit(selectedSubreddit);
        } else {
            setSubreddit(subredditDetails);
        }
    })
    return (
        <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
                <RedditIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="Create post"
                inputProps={{ 'aria-label': 'Create post' }}
                onFocus={() => {
                    console.log("currentUser : ", currentUser.refreshToken);
                    if (currentUser.refreshToken && currentUser.uid) {
                        history.push({
                            pathname: `/r/${subreddit.name}/submit`,
                            state: { subreddit, user_id: currentUser.uid }
                        })
                    }
                }}
            />
        </Paper>
    );
}

export default CreatePostCard;
