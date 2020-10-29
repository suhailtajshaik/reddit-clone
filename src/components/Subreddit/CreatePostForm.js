import React, { useRef } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { has } from 'lodash';

import { usePosts } from '../../contexts/PostContext';
// import { usePosts } from '../../contexts/PostContext_old';
// import { createPost } from '../../contexts/PostContext';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },

    paper: {
        marginTop: '25px',
        padding: '2px 4px',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
}));



const CreatePostForm = (props) => {
    const classes = useStyles();
    const { createPost } = usePosts();
    const { register, handleSubmit, errors } = useForm();
    const { subreddit, user_id } = props.history.location.state;

    const onSubmit = handleSubmit((data) => {
        data.user_id = user_id;
        data.subreddit_id = subreddit.id;
        data.vote = 1;
        data.created_at = new Date().toISOString();
        data.updated_at = new Date().toISOString();
        data.url = `${window.location.origin}/r/${subreddit.name}/`
        createPost(data, props.history);

    });

    return (
        <Container maxWidth="md">
            <h1>Create post</h1>
            <Paper className={classes.paper, classes.root} elevation={3}>
                <form autoComplete="off" onSubmit={onSubmit} >
                    <TextField
                        id="title"
                        type="text"
                        label="Title"
                        placeholder="Title"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="title"
                        inputRef={register({ required: { value: true, message: "Title is required!" } })}
                        error={errors.title}
                        aria-invalid={has(errors, 'title.name') ? "true" : "false"}
                        helperText={(errors.title) ? errors.title.message : ""}
                    />
                    <TextField
                        id="description"
                        type="text"
                        label="Description"
                        placeholder="Description"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="description"
                        error={errors.description}
                        inputRef={register({ required: { value: true, message: "Title is required!" } })}
                        helperText={(errors.title) ? errors.title.message : ""}
                    />
                    <TextField
                        id="url"
                        label="Image URL"
                        placeholder="Image URL"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="imageURL"
                        inputRef={register}
                    />
                    <div >
                        <Button className={classes.button} variant="contained" color="primary" disableElevation type="submit">
                            POST
                        </Button>
                    </div>

                </form>
            </Paper>

        </Container>
    )
}

export default CreatePostForm;