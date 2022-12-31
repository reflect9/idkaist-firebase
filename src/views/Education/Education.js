import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import "./Education.scss";

import Undergraduate from './Undergraduate.js';
import Master from './Master.js';
import PhD from './PhD.js';
import International from './International.js';

function Education({course}) {
  const { t } = useTranslation();
  let courseContent;
  if (course == "Undergraduate") {
    courseContent = (<div>
      <Undergraduate />
    </div>);
  } else if (course == "Master") {
    courseContent = (<div>
      <Master />
    </div>);
  } else if (course == "PhD") {
    courseContent = (<div>
      <PhD />
    </div>);
  } else if (course == "International") {
    courseContent = (<div>
      <International />
    </div>);
  }
  return (
    <div className="Education stretching">
      <div className="coverImage">
        <img src="/images/department/students_prototyping.png" />
      </div>
      <div className="tabNav">
          <ul>
            <Link key='a' to="/education/Undergraduate" onClick={()=>{document.querySelector(".App").scrollTo(0,0);}}><li className={course == "Undergraduate" ? 'active' : null} > {t("Menu.Undergraduate")} </li></Link>
            <Link key='b' to="/education/Master" onClick={()=>{document.querySelector(".App").scrollTo(0,0);}}><li className={course == "Master" ? 'active' : null} > {t("Menu.Master")} </li></Link>
            <Link key='c' to="/education/PhD" onClick={()=>{document.querySelector(".App").scrollTo(0,0);}}><li className={course == "PhD" ? 'active' : null} > {t("Menu.PhD")} </li></Link>
            <Link key='d' to="/education/International" onClick={()=>{document.querySelector(".App").scrollTo(0,0);}}><li className={course == "International" ? 'active' : null} > {t("Menu.International")}</li></Link>
          </ul>
      </div>
      <div className="PageContentWrapper">
        <div className="PageContent">
          <div className="tabContent">
            {courseContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
