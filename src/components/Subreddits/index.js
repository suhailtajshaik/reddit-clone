import React from 'react'
import { Link } from 'react-router-dom';
import { useSubreddit } from '../../contexts/SubredditContext';

const Subreddits = () => {
    const { getSubreddits } = useSubreddit();
    const subreddits = () => {
        let subreddits = getSubreddits();

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
        <div>
            <h3>Subreddits</h3>
            {subreddits()}
        </div>
    )
}

export default Subreddits;