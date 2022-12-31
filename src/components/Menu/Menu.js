import _ from "lodash";
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import {v4} from 'uuid';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { VscBook } from "react-icons/vsc";
import { GrClose } from "react-icons/gr";
import { BiSearch } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";

// import { signInWithPopup, GoogleAuthProvider, auth } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from '../../data/firestore/auth';

import "./Menu.scss";

import Labs from "../../data/Labs";

function Menu({ setIsMenuActive }) {
  const { t, i18n, ready } = useTranslation();
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [loginResponse, setLoginResponse] = useState("");
  const changeLanguage = (m) => {
    i18n.changeLanguage(m);
  }

  useEffect(()=>{
    document.querySelector(".Menu").classList.remove("small");
  }, []);
  const closeMenu = ()=> {
    console.log("close!");
    document.querySelector(".Menu").classList.add("small");
    setTimeout(()=>{
      setIsMenuActive(false);
    },300);
  }
  return (
    <div className="Menu small">
      <div className="menuTopBar">
        <div className="MenuCloseButton" onClick={closeMenu}>
          <GrClose />
        </div>
      </div>
      
      <div className="menuToolBar">
        <div className="searchUI">
          <input type="text" className="input" placeholder="Search: Not Implemented Yet"/>
          <button type="submit">
            <BiSearch/>
          </button>
        </div>
        <div className="LanguageSelector" onClick={() => {
          if (i18n.language == "kr") changeLanguage("en");
          else changeLanguage("kr");
        }}>
          <span className={i18n.language == "kr" ? 'active' : null}>한글</span>&nbsp;&nbsp;&nbsp;
          <span className={i18n.language == "en" ? 'active' : null}>ENGLISH</span>
        </div>
      </div>
      <div className="MenuItems">
        <div className="L1">
          <Link to="/home">{t("Menu.Home")}</Link>
        </div>
        <div className="L1">
          <Link to="/ArticleList/All">{t("Menu.ArticleList")}</Link>
        </div>
        <div className="L1">
          <Link to="/education">{t("Menu.Education")}</Link>
          <div className="L2">
            <Link to="/education/Undergraduate">{t("Menu.Undergraduate")}</Link>
            <Link to="/education/Master">{t("Menu.Master")}</Link>
            <Link to="/education/PhD">{t("Menu.PhD")}</Link>
            <Link to="/education/International">{t("Menu.International")}</Link>
          </div>
        </div>
        <div className="L1">
          <Link to="/research">{t("Menu.Research")}</Link>
          {isResearchOpen?
            <AiFillCaretDown onClick={()=>{setIsResearchOpen(false);}}/>:
            <AiFillCaretRight onClick={()=>{setIsResearchOpen(true);}}/>
          }
          <div className="L2">
            {isResearchOpen && _.map(Labs, (labData,labID)=>{
              return (
                <Link to={"/research/"+labID} key={v4()}>{labData.lab_long}</Link> 
              );
            })}
          </div>
        </div>
        <div className="L1">
          <Link to="/people">{t("Menu.People")}</Link>
          <div className="L2">
            <Link to="/people/All">{t("People.role.All")}</Link>
            <Link to="/people/Faculty">{t("People.role.Faculty")}</Link>
            <Link to="/people/OldFaculty">{t("People.role.OldFaculty")}</Link>
            <Link to="/people/Staff">{t("People.role.Staff")}</Link>
            <Link to="/people/OtherFaculty">{t("People.role.OtherFaculty")}</Link>
          </div>
        </div>
        <div className="L1">
          <Link to="/about">{t("Menu.About")}</Link>
        </div>
      </div>
      <div className="AuthUI">
        <label>Admin Login</label>
          {(auth && auth.currentUser) ? (
          <p>
            <span>{auth.currentUser.email}</span>
            <button className="signOutLink" onClick={()=>{
              signOut(auth).then(()=>{
                closeMenu();
              });
            }}>Sign Out</button>
          </p>
          ) 
            : (<div className="auth">
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
              <p>
                <button className="authGoogle" onClick={()=>{
                  signInWithPopup(auth, provider)
                  .then((result) => {
                      // This gives you a Google Access Token. You can use it to access the Google API.
                      const credential = GoogleAuthProvider.credentialFromResult(result);
                      closeMenu();
                  });
                }}>Sign In via Google</button>
              </p>
              
            </div>
            )}
      </div>
    </div>
  );
}

export default Menu;
