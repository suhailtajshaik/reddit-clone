import React, { useRef } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { FormControl, OutlinedInput, InputAdornment, Button, Input, InputLabel, FormHelperText } from '@material-ui/core';


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



const CreatePostForm = () => {
    const classes = useStyles();
    const titleRef = useRef('');
    // const [value, setValue] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const title = titleRef.current.value;
        console.log(title);
    }


    return (
        <Container maxWidth="md">
            <h1>Create post</h1>
            <Paper className={classes.paper, classes.root} elevation={3}>
                <form noValidate autoComplete="off" >
                    <TextField
                        id="standard-full-width"
                        label="Title"
                        placeholder="Title"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="standard-full-width"
                        label="Description"
                        placeholder="Description"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <div >
                        <Button className={classes.button} variant="contained" color="primary" disableElevation>
                            POST
                        </Button>
                    </div>

                </form>
            </Paper>

        </Container>
    )
}

export default CreatePostForm;