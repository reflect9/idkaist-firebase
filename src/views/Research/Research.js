import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import Menu from '../../components/Menu/Menu.js';
import PageHeader from '../../components/Page/PageHeader.js';
import LabList from "../../components/LabList/LabList.js";
import Lab from "../../components/Lab/Lab.js";
import { BsBoxArrowInUpLeft } from "react-icons/bs";

import "./Research.scss";

function Research({labID}) {
  const { t } = useTranslation();
  let pageContent;
  if (typeof labID === "undefined" || labID == "undefined") {
    pageContent = (
      <div className="PageContentWrapper">
        <h2>{t("Research.title")}</h2>
        <div className="overview">
          {t("Research.overview")}
        </div>
        
      </div>
    );
  } else {
    pageContent = (
      <div className="PageContentWrapper">
        {/* <a className="BackToLabs" onClick={()=>{setLabID(undefined)}}>
          <BsBoxArrowInUpLeft/>
        </a> */}
        <Lab labID={labID}/>
      </div>
    );
  }

  return (
    <div className="Research stretching">
      {/* <div className="coverImage">
        <img src="images/department/building.jpg" />
      </div> */}
      {pageContent}
      
      <LabList currentLab={labID}/>
    </div>
  );
}

export default Research;
