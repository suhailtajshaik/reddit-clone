import React, { useContext, useState } from "react"
import { db } from "../firebase";

const SubredditContext = React.createContext()

export function useSubreddit() {
    return useContext(SubredditContext)
}

export function SubredditProvider({ children }) {
    const [subreddits, setSubreddits] = useState([])

    // Get array of doc data from collection
    function getCollectionData(collection) {
        return collection.docs.map((doc) => {
            return getDocData(doc);
        })
    }

    // Get doc data and merge doc.id
    function getDocData(doc) {
        return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
    }

    function getSubreddits() {
        db.collection('subreddits').orderBy('created_at', 'asc').onSnapshot((snapshot) => {
            const subredditsList = getCollectionData(snapshot);
            setSubreddits(subredditsList);
        })
        return subreddits;
    }

    function getSubredditDetailsByName(name) {
        if (subreddits.length > 0) {
            return subreddits.filter(subredit => (subredit.name === name))[0];
        } else {
            let subredditsList = getSubreddits();
            return subredditsList.filter(subredit => (subredit.name === name))[0];
        }
    }


    function getSubredditDetailsById(id) {
        if (subreddits.length > 0) {
            return subreddits.filter(subredit => (subredit.id === id))[0];
        } else {
            let subredditsList = getSubreddits();
            return subredditsList.filter(subredit => (subredit.id === id))[0];
        }
    }


    const value = {
        getSubreddits,
        getSubredditDetailsByName,
        getSubredditDetailsById
    }

    return (
        <SubredditContext.Provider value={value}>
            {children}
        </SubredditContext.Provider>
    )
}