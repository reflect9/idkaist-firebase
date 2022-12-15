import _ from "lodash";
import React, { Component } from 'react';
import { useTranslation } from "react-i18next";
import Curriculum from "../../data/Curriculum";
import "./Education.scss";


function PhD() {
    // const Curriculum = require("./Curriculum.json");
    const { t, i18n, ready } = useTranslation();
    return (
        <div className="EducationContent">
            <div className="section_summary">
                <h2>Course Overview</h2>
                {t("Education.PhD.summary")}
            </div>
            <div className="section_content">
                <h2>{t("Education.PhD.thesisRequirementTitle")}</h2>
                <div className="year_description">
                    {t("Education.PhD.thesisRequirementContent")}
                </div>
            </div>
            <h2>Admission</h2>
            <div className="section_content">
              TBD (currently available information is same as MSC admission)
            </div>
        </div>
    );
}

export default PhD;
