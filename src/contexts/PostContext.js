import React, { useContext, useState } from "react"
import { db } from "../firebase";

const PostsContext = React.createContext()

export function usePosts() {
    return useContext(PostsContext)
}

export function PostsProvider({ children }) {
    const [posts, setPosts] = useState([])

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

    function createPost(params) {
        const postData = {
            "id": db.collection("posts").doc(`${post.id}`),
            "image": params.imageUrl || '',
            "title": params.title,
            "description": params.description,
            "user_id": "",
            "subreddit_id": params.subreddit_id,
            "created_at": new Date().toISOString(),
            "updated_at": new Date().toISOString()
        }

        try {
            if (params.title && params.subreddit_id) {
                db.collection("posts").doc(`${post.id}`).set(postData).then((res) => {
                    console.log("RES : ", res);
                });
            } else {
                throw new Error({ "message": 'Error creating post.' })
            }
        } catch (error) {
            return error;
        }



    }
    function getPosts() {
        db.collection('posts').orderBy('created_at', 'asc').onSnapshot((snapshot) => {
            const postsList = getCollectionData(snapshot);
            setPosts(postsList);
        })
        return posts;
    }

    function getPostDetailsFor(id) {
        // if (posts.length > 0) {
        //     return posts.filter(post => (post.id === id))[0];
        // } else {
        //     let subredditsList = getPosts();
        //     return subredditsList.filter(post => (post.id === id))[0];
        // }
    }

    const value = {
        getPosts,
        createPost
    }

    return (
        <PostsContext.Provider value={value}>
            {children}
        </PostsContext.Provider>
    )
}