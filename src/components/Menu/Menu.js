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
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

// import { signInWithPopup, GoogleAuthProvider, auth } from 'firebase/auth';

import "./Menu.scss";

import Labs from "../../data/Labs";

function Menu({ setIsMenuActive, defaultSubMenuOpen }) {
  const { t, i18n, ready } = useTranslation();
  const [isEducationOpen, setIsEducationOpen] = useState(defaultSubMenuOpen);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [isPeopleOpen, setIsPeopleOpen] = useState(defaultSubMenuOpen);
  
  // Checking window size and setMatches true / false
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1000px)").matches
  )
  useEffect(() => {
      window
      .matchMedia("(min-width: 1000px)")
      .addEventListener('change', e => setMatches( e.matches ));
  }, []);
  const changeLanguage = (m) => {
    i18n.changeLanguage(m);
  }
  
  useEffect(()=>{
    document.querySelector(".Menu").classList.remove("small");
  }, []);
  const closeMenu = ()=> {
    console.log("close!");
    document.querySelector(".App").scrollTo(0,0);
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
          <Link onClick={closeMenu} to="/home">{t("Menu.Home")}</Link>
        </div>
        <div className="L1">
          <Link onClick={closeMenu} to="/ArticleList/All">{t("Menu.ArticleList")}</Link>
        </div>
        <div className="L1">
          <Link onClick={closeMenu} to="/education">{t("Menu.Education")}</Link>
          {!matches && 
            (isEducationOpen ?
              <AiFillCaretUp onClick={()=>{setIsEducationOpen(false);}}/>:
              <AiFillCaretDown onClick={()=>{setIsEducationOpen(true);}}/>
            )
          }
          <div className="L2">
            {isEducationOpen && ( 
              <div>
                <Link onClick={closeMenu} to="/education/Undergraduate">{t("Menu.Undergraduate")}</Link>
                <Link onClick={closeMenu} to="/education/Master">{t("Menu.Master")}</Link>
                <Link onClick={closeMenu} to="/education/PhD">{t("Menu.PhD")}</Link>
                <Link onClick={closeMenu} to="/education/International">{t("Menu.International")}</Link>
              </div>
            )}
          </div>
        </div>
        <div className="L1">
          <Link onClick={closeMenu} to="/research">{t("Menu.Research")}</Link>
          {isResearchOpen?
            <AiFillCaretUp onClick={()=>{setIsResearchOpen(false);}}/>:
            <AiFillCaretDown onClick={()=>{setIsResearchOpen(true);}}/>
          }
          <div className="L2">
            {isResearchOpen && _.map(Labs, (labData,labID)=>{
              return (
                <Link onClick={closeMenu} to={"/research/"+labID} key={v4()}>{labData.lab_long}</Link> 
              );
            })}
          </div>
        </div>
        <div className="L1">
          <Link onClick={closeMenu} to="/people">{t("Menu.People")}</Link>
          {!matches &&(isPeopleOpen?
            <AiFillCaretUp onClick={()=>{setIsPeopleOpen(false);}}/>:
            <AiFillCaretDown onClick={()=>{setIsPeopleOpen(true);}}/>
          )}
          <div className="L2">
            {isPeopleOpen && ( 
              <div>
                <Link onClick={closeMenu} to="/people/All">{t("People.role.All")}</Link>
                <Link onClick={closeMenu} to="/people/Faculty">{t("People.role.Faculty")}</Link>
                <Link onClick={closeMenu} to="/people/OldFaculty">{t("People.role.OldFaculty")}</Link>
                <Link onClick={closeMenu} to="/people/Staff">{t("People.role.Staff")}</Link>
                <Link onClick={closeMenu} to="/people/OtherFaculty">{t("People.role.OtherFaculty")}</Link>
              </div>
            )}
          </div>
        </div>
        <div className="L1">
          <Link onClick={closeMenu} to="/about">{t("Menu.About")}</Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
