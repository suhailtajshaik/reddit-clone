import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { useSubreddit } from '../../contexts/SubredditContext';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         maxWidth: '100%',
//         maxHeight: '250px'
//     },
//     media: {
//         height: 0,
//         paddingTop: '56.25%', // 16:9
//     },
//     expand: {
//         transform: 'rotate(0deg)',
//         marginLeft: 'auto',
//         transition: theme.transitions.create('transform', {
//             duration: theme.transitions.duration.shortest,
//         }),
//     },
//     expandOpen: {
//         transform: 'rotate(180deg)',
//     },
//     avatar: {
//         backgroundColor: red[500],
//     },
// }));

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 500,
        maxWidth: '100%',
    },
    voteBlock: {
        width: 60,
        height: 'auto',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    subredditLink: {
        color: '#000000',
        textDecoration: 'unset',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
        },
    },
    timeSencePosted: {
        color: 'gray',
        paddingLeft: '10px',
    }

}));

export default function PostCard(props) {
    const classes = useStyles();
    // const [subreddits, setSubreddits] = useState([]);

    const { getSubreddits } = useSubreddit();
    const { post } = props;
    const [expanded, setExpanded] = React.useState(false);
    let subreddits = getSubreddits();

    const timeSincePosted = (then) => {
        let now = moment(new Date())
        const timeDiff = moment.duration(now.diff(then)).humanize();
        return `${timeDiff} ago`;
    }

    const renderVote = () => {
        return (post.vote <= 0) ? 0 : post.vote;
    }
    const getSubredditDetails = (id, key) => {
        const subreddit = subreddits.filter(subreddit => (subreddit.id === id));
        return (subreddit.length > 0) ? subreddit[0][key] : null;
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="flex-start"
                        >
                            <Button><ArrowUpwardIcon /></Button>
                            <Paper className={classes.paper}>{renderVote()}</Paper>
                            <Button><ArrowDownwardIcon /></Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} sm container>
                        <Grid item xs container direction="column" spacing={1}>
                            <Grid item xs>
                                <Typography variant="subtitle2" gutterBottom>
                                    <Link to={`/r/${getSubredditDetails(post.subreddit_id, 'name')}`} className={classes.subredditLink}>{`r/${getSubredditDetails(post.subreddit_id, 'name')}`}</Link>
                                    <span className={classes.timeSencePosted}>
                                        {timeSincePosted(post.created_at)}
                                    </span>
                                </Typography>

                                <Typography variant="subtitle2" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {post.title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                    Remove
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
