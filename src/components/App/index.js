import React from 'react'
import Navbar from '../../components/Navbar';
import Subreddits from '../Subreddits';
import Profile from '../Profile';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Subreddit from '../Subreddit';
import CreatePostForm from '../Subreddit/CreatePostForm';


const App = () => {
    return (

        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Subreddits} />
                    <Route exact path="/r/:name" component={Subreddit} />
                    <Route exact path="/r/:name/submit" component={CreatePostForm} />
                    <Route exact path="/u/:id" component={Profile} />
                </Switch>
            </Router>
        </div>

    )
}

export default App;
