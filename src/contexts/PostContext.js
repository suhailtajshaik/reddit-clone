import React, { useContext, useState, useEffect } from "react"
import { db } from "../firebase"

const PostContext = React.createContext()

export function usePosts() {
    return useContext(PostContext)
}

export function PostProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [selectedPostsById, setSelectedPostsById] = useState([]);

    useEffect(() => {
        const unSubscribePost = db.collection('posts').orderBy('created_at', 'asc').limit(10).onSnapshot((snapshot) => {
            const allPosts = getCollectionData(snapshot);
            setPosts(allPosts);
        });

        return () => unSubscribePost
    }, [])

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

    async function createPost(params, history) {
        let ref = db.collection("posts").doc();
        const postData = {
            "id": `${ref.id}`,
            ...params,
            "url": `${params.url}${ref.id}`,
        }

        await db.collection("posts")
            .doc(`${ref.id}`).set(postData).then(function () {
                history.push(`/`);
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    function getPostsForSubredditById(id) {
        if (posts.length > 0) {
            const selectedPosts = posts.filter(post => (post.subreddit_id === id));
            setSelectedPostsById(selectedPosts);
            return selectedPosts;
        }

    };

    async function getAllPosts(options) {

        return await posts;

    }

    const value = {
        createPost,
        getAllPosts,
        getPostsForSubredditById,
        posts,
        selectedPostsById
    }

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}