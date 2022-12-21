import _ from "lodash";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
// import * as firebase from "firebase/app";
// import "firebase/auth";
// Import firebaseui module.
import * as firebaseui from 'firebaseui'
// Import gcip-iap module.
import * as ciap from 'gcip-iap';
import { auth } from "../../data/firestore/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LogIn = ()=>{
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();
    useEffect(()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(token);
            console.log(user);
            setUser(user);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    },[]);

    return (<div>
        You are logged in as {user? user.email: "null"}
    </div>);
}

export default LogIn;