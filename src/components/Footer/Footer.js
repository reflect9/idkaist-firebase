import React, { useEffect, useState } from 'react';
import  {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { matchPath } from "react-router";
import ReactDOM from 'react-dom';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { t } from '../../../node_modules/i18next/index';
import "./Footer.scss";

import KAISTLogo from '../../assets/logo-kaist.png';
import { ReactComponent as Idkaist } from '../Logo/idkaist-notext.svg';

function Footer() {
    const { t, i18n, ready } = useTranslation();
    const toggleLanguage = ()=>{
        console.log(i18n.language);
        if(i18n.language=="en") i18n.changeLanguage("kr");
        else i18n.changeLanguage("en");
    }
    // Checking window size and setMatches true / false
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 1000px)").matches
    )
    useEffect(() => {
        window
        .matchMedia("(min-width: 1000px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    if(matches) {
        return (<div className="Footer" >
            <div className="FooterSection">
                <div className="FooterContent_1" >
                    <div className="department_info">
                        <Idkaist />
                        <p>
                            Department of Industrial Design, KAIST<br/>
                            한국과학기술원 산업디자인학과<br/>
                            {t("About.Address")}<br />
                            Tel. +82-42-350-4502~3 / Fax +82-42-350-4510<br/><br/>
                            © IDKAIST. All Rights Reserved
                        </p>
                    </div>
                    <div className="shortcuts">
                        <div className="column">
                            <Link to="/home" className="L1">{t("Menu.Home")}</Link>
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
                        © IDKAIST. All Rights Reserved
                    </div>
                    <a href='https://kaist.ac.kr'><img src={KAISTLogo} className="KAIST_Logo" /></a>    
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
                            Department of Industrial Design, KAIST<br/>
                            한국과학기술원 산업디자인학과<br/>
                            {t("About.Address")}<br />
                            Tel. +82-42-350-4502~3 / Fax +82-42-350-4510<br/><br/>
                            © IDKAIST. All Rights Reserved
                        </p>
                    </div>
                    <div className="kaist_logo_wrapper_mobile">
                        <a href='https://kaist.ac.kr'><img src={KAISTLogo} className="KAIST_Logo" /></a>    
                    </div>
                </div>
            </div>
        </div>);    

    }
    
}

export default Footer;

