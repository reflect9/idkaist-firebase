import _ from "lodash";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import "./LogIn.scss";
import { GrClose } from "react-icons/gr";
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from '../../data/firestore/auth';


const LogIn = ({setIsLoginActive})=>{
    // const [user, setUser] = useState(null);
    // const provider = new GoogleAuthProvider();
    // useEffect(()=>{
    //     signInWithPopup(auth, provider)
    //     .then((result) => {
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //         // The signed-in user info.
    //         const user = result.user;
    //         console.log(token);
    //         console.log(user);
    //         setUser(user);
    //     }).catch((error) => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.customData.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         // ...
    //     });
    // },[]);
    const [loginResponse, setLoginResponse] = useState("");

    return (<div className="Login">
        <label className="popup_title">Administrator Log in</label>
        <div className="CloseButton" onClick={()=>{setIsLoginActive(false);}}>
          <GrClose />
        </div>
        <div className="AuthUI">
          {(auth && auth.currentUser) ? (
          <p>
            <span>{auth.currentUser.email}</span>
            &nbsp;
            <button className="signOutLink" onClick={()=>{
              signOut(auth).then(()=>{
                setIsLoginActive(false);
              });
            }}>Sign Out</button>
          </p>
          ) 
            : (<div className="auth">
                <hr/>
                <label>Sign in via Email</label>
                <p>Email: <input type="text" id="email"></input></p>
                <p>Password: <input type="password" id="password"></input></p>
                <p>
                <button className="authEmail" onClick={()=>{
                const email = document.querySelector("#email").value;
                const password = document.querySelector("#password").value;
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential)=>{
                    setLoginResponse(userCredential.toString());
                }).catch((err)=>{
                    setLoginResponse(err.toString());
                });
                }}> 
                via Email
                </button>
                <span className="login_response">{loginResponse}</span>
                </p>
                <hr/>
                <label>Sign in via Google Account</label> <br/>
                <p>
                
                <button className="authGoogle" onClick={()=>{
                    signInWithPopup(auth, provider)
                    .then((result) => {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        setIsLoginActive(false);
                    });
                }}>Google Log In</button>
                </p>
              
            </div>
            )}
      </div>
    </div>);
}

export default LogIn;