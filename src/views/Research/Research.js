import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import _ from "lodash";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Menu from '../../components/Menu/Menu.js';
import PageHeader from '../../components/Page/PageHeader.js';
import LabList from "../../components/LabList/LabList.js";
import Labs from "../../data/Labs";
import { BsBoxArrowInUpLeft } from "react-icons/bs";


import "./Research.scss";

function Research() {
  const { t } = useTranslation();
  return (
    <div className="Research stretching">
      <div className="PageContentWrapper">
        <div className="PageContent">
          <h2>{t("Research.title")}</h2>
          <div className="overview">
            {t("Research.overview")}
          </div>
        </div>
      </div>
      <LabList/>
    </div>
  );
}

export default Research;
