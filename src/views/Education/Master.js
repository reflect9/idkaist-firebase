import _ from "lodash";
import React, { Component } from 'react';
import { useTranslation } from "react-i18next";
import AdmissionMasterInternational from "./AdmissionMasterInternational.js";
import AdmissionMasterKorean from "./AdmissionMasterKorean.js";
import Curriculum from "../../data/Curriculum";
import "./Education.scss";
import { FiArrowUpRight } from 'react-icons/fi';


function Master() {
    // const Curriculum = require("/data/Curriculum.json");
    const { t, i18n, ready } = useTranslation();
    let curriculumTable = _.map(Curriculum.Master, (yearData, yearCode) => {
        let rows = [];
        _.forEach(yearData.semesters, (semesterData, semester)=>{
            _.forEach(semesterData, (courseData, courseIdx)=>{
                // Rendering courses
                const row = (
                    <tr key={semester + "_" + courseIdx}>
                        <th>{t("General." + semester)}</th>
                        <td> {courseData.code}  </td>
                        <td className="expandable"> {i18n.language == "en" ? courseData.title_en : courseData.title_kr} </td>
                        <td className="rightAlign"><FiArrowUpRight /></td>
                    </tr>
                );
                rows.push(row);
                // // DEPRECATED
                // return (
                //     <div className="course description_hidden" key={courseIdx} onClick={(event)=>{event.target.classList.toggle("description_hidden");}}>
                //         {courseData.code} {i18n.language=="en"?courseData.title_en:courseData.title_kr}
                //         <span className='req'>
                //           {(courseData.type=="Major Required")?"REQUIRED":""}
                //         </span>
                //         <div className="description">
                //             {i18n.language=="en"?courseData.description_en:courseData.description_kr}
                //         </div>
                //     </div>
                // );
            });
        });
        // Rendering Years
        return (
            <div className="year" key={yearCode}>
                <div className="year_title">
                    <div className="circle_year">{yearCode}</div>
                    <div className="yearTitle">
                        <div className="yearIndex">{(i18n.language == "en") ? yearData.year_en : yearData.year_kr}</div>
                        <div className="yearRole">
                            {(i18n.language == "en") ? yearData.year_role_en : yearData.year_role_kr + "과정"}
                        </div>

                    </div>
                </div>
                <div className="year_description">
                    {(i18n.language == "en") ? yearData.description_en : yearData.description_kr}
                </div>
                <table className="courses">
                    <thead>
                        <th>Semester</th>
                        <td>Course</td>
                        <td>Title</td>
                        <td className="rightAlign">Portfolio</td>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    });
    curriculumTable.push(
        <div className="year" key="GraduationResearch">
            <div className="year_title">
                <div className="circle_year">*</div>
                <div className="yearTitle">
                    <div className="yearRole">
                    <div className="yearIndex">last</div>
                        {t("Education.Master.thesisRequirementTitle")}
                    </div>
                </div>
            </div>
            <div className="year_description">
                <p>{t("Education.Master.thesisRequirementContent")}</p>
            </div>
            {/* <div className="year_title"><em>{t("Education.Undergraduate.graduationRequirements")}</em></div>
            <div className="year_description">
                <div><a href="https://docs.google.com/spreadsheet/ccc?key=0Au6I5L9NWkyBdEo3d1RaNVVBbW01NkZRMkwtdjZuNWc&amp;usp=sharing" target="_blank">{t("Education.Undergraduate.graduationRequirements")}</a></div>
                <div><a href="https://docs.google.com/spreadsheet/ccc?key=0Au6I5L9NWkyBdEo3d1RaNVVBbW01NkZRMkwtdjZuNWc&amp;usp=sharing" target="_blank">{t("Education.Undergraduate.graduationRequirementsReadThis")}</a></div>
            </div> */}
        </div>
    );
    // Assemble Everything
    return (
        <div className="EducationContent">
            <div className="section_summary">
                {t("Education.Master.summary")}
            </div>
            <div className="section_content">
                <h2>Course Overview</h2>
                {curriculumTable}
            </div>
            <div className="section_content">
                {(i18n.language=="en")?<AdmissionMasterInternational/>:<AdmissionMasterKorean/>}
            </div>
        </div>
    );
}

export default Master;
