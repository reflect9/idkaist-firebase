import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { matchPath } from "react-router";
import ReactDOM from 'react-dom';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { t } from '../../../node_modules/i18next/index';
import { checkAdmin, auth } from "../../data/firestore/auth";
import "./Footer.scss";

import KAISTLogo from '../../assets/logo-kaist.png';
import facebook_logo_black from "./facebook-logo-black.png";
import instagram_logo_black from "./instagram-logo-black.png";
import twitter_logo_black from "./twitter-logo-black.png";
import youtube_logo_black from "./youtube-logo-black.png";
import { ReactComponent as Idkaist } from '../Logo/idkaist-notext.svg';

function Footer({ setIsLoginActive }) {
    const { t, i18n, ready } = useTranslation();
    const toggleLanguage = () => {
        console.log(i18n.language);
        if (i18n.language == "en") i18n.changeLanguage("kr");
        else i18n.changeLanguage("en");
    }
    // Checking window size and setMatches true / false
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 1000px)").matches
    )
    useEffect(() => {
        window
            .matchMedia("(min-width: 1000px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    if (matches) {
        return (<div className="Footer" >
            <div className="FooterSection">
                <div className="FooterContent_1" >
                    <div className="department_info">
                        <Idkaist />
                        <p>
                            Department of Industrial Design, KAIST<br />
                            한국과학기술원 산업디자인학과<br />
                            {t("About.Address")}<br />
                            Tel. +82-42-350-4502~3 / Fax +82-42-350-4510
                        </p>
                    </div>
                    <div className="shortcuts">
                        <div className="column">
                            <Link to="/home" className="L1">{t("Menu.Home")}</Link>
                        </div>
                        <div className="column">
                            <Link to="/articleList/All" className="L1">{t("Menu.ArticleList")}</Link>
                        </div>
                        <div className="column">
                            <Link to="/education" className="L1">{t("Menu.Education")}</Link>
                            <Link to="/education/Undergraduate" className="L2">{t("Menu.Undergraduate")}</Link>
                            <Link to="/education/Master" className="L2">{t("Menu.Master")}</Link>
                            <Link to="/education/PhD" className="L2">{t("Menu.PhD")}</Link>
                        </div>
                        <div className="column">
                            <Link to="/research" className="L1">{t("Menu.Research")}</Link>
                        </div>
                        <div className="column">
                            <Link to="/people" className="L1">{t("Menu.People")}</Link>
                            <Link to="/people/Faculty" className="L2">{t("People.role.Faculty")}</Link>
                            <Link to="/people/OldFaculty" className="L2">{t("People.role.OldFaculty")}</Link>
                            <Link to="/people/Staff" className="L2">{t("People.role.Staff")}</Link>
                            <Link to="/people/OtherFaculty" className="L2">{t("People.role.OtherFaculty")}</Link>
                        </div>
                        <div className="column">
                            <Link to="/about" className="L1">{t("Menu.About")}</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="FooterSection">
                <div className="FooterContent_2" >
                    <div className="copyright">
                        {(auth && auth.currentUser) ?
                            <a className="admin_login" onClick={() => { setIsLoginActive(true) }}>
                                {auth.currentUser.email}
                            </a>
                            :
                            <a className="admin_login" onClick={() => { setIsLoginActive(true) }}>Admin Login</a>
                        }
                        © IDKAIST. All Rights Reserved
                    </div>
                    <div className="logos">
                    <a href="https://www.facebook.com/id.kaist" target="_blank"><img src={facebook_logo_black} className="other_logo"/></a>
                        <a href="https://www.instagram.com/idkaist_student/" target="_blank"><img src={instagram_logo_black} className="other_logo"/></a>
                        {/* <a><img src={twitter_logo_black} className="other_logo"/></a> */}
                        <a href="https://www.youtube.com/@kaist6669" target="_blank"><img src={youtube_logo_black} className="other_logo"/></a>
                        <a href='https://kaist.ac.kr'><img src={KAISTLogo} className="KAIST_Logo" /></a>
                    </div>
                    
                </div>

            </div>
        </div>);
    }
    else {
        return (<div className="Footer" >
            <div className="FooterSection">
                <div className="FooterContent_1" >
                    <div className="department_info">
                        <Idkaist />
                        <p>
                            Department of Industrial Design, KAIST<br />
                            한국과학기술원 공과대학 산업디자인학과<br />
                            {t("About.Address")}<br />
                            Tel. +82-42-350-4502~3 / Fax +82-42-350-4510<br /><br />
                            {(auth && auth.currentUser) ?
                            <a className="admin_login" onClick={() => { setIsLoginActive(true) }}>
                                {auth.currentUser.email}
                            </a>
                            :
                            <a className="admin_login" onClick={() => { setIsLoginActive(true) }}>Admin Login</a>
                        }
                            © IDKAIST. All Rights Reserved
                        </p>
                    </div>
                    <div className="kaist_logo_wrapper_mobile">
                        <a href="https://www.facebook.com/id.kaist" target="_blank"><img src={facebook_logo_black} className="other_logo"/></a>
                        <a href="https://www.instagram.com/idkaist_student/" target="_blank"><img src={instagram_logo_black} className="other_logo"/></a>
                        {/* <a><img src={twitter_logo_black} className="other_logo"/></a> */}
                        <a href="https://www.youtube.com/@kaist6669" target="_blank"><img src={youtube_logo_black} className="other_logo"/></a>
                        <a href='https://kaist.ac.kr'><img src={KAISTLogo} className="KAIST_Logo" /></a>
                    </div>
                </div>
            </div>
        </div>);

    }
    
}

export default Footer;

