import React, { useContext, useState, useEffect } from "react"
import { auth, provider, db } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [auth])

    function addUserToDb(user) {
        if (!user) {
            console.log('Not authorized');
        };

        const newUser = {
            "id": user.uid,
            "name": user.profile.name,
            "imageURL": user.profile.picture,
            "created_at": new Date().toISOString()
        };

        db.collection("users").doc(`${user.uid}`).set(newUser).then(function () {
            console.log("Document successfully written!");
        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });
    }

    function signUpWithGoogle() {


        provider.addScope('profile');
        auth.signInWithPopup(provider).then(function (result) {
            console.log("result : ", result);

            // The signed-in user info.
            let { user } = result;
            user.token = result.credential.accessToken;
            user.profile = result.additionalUserInfo.profile;

            return user;

        }).then(user => {
            addUserToDb(user);
        }).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            return new Error({ ...errorCode, ...errorMessage, ...email, ...credential });
        });

    }

    function loginWithGoogle() {
        return auth.signInWithPopup(provider).then((results) => {
            let { user } = results;
            user.token = results.credential.accessToken;
            user.profile = results.additionalUserInfo.profile;
            setCurrentUser(user);
        });
    }

    function logout() {
        return auth.signOut().then(() => {

            setCurrentUser(null);
        })
    }




    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        loginWithGoogle,
        signUpWithGoogle,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}