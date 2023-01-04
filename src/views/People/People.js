import _ from "lodash";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Menu from '../../components/Menu/Menu.js';
import PageHeader from '../../components/Page/PageHeader.js';
import PeopleData from "../../data/People.json";
import LabData from "../../data/Labs.json";
import { MdHome } from "react-icons/md";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

import { useTranslation } from 'react-i18next';
import "./People.scss";

function People({filter}) {
  // const [tab, setTab] = useState("All");
  const { t, i18n, ready } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const roles = ["Faculty", "OldFaculty", "Staff", "OtherFaculty"];
  const LabPeopleData = _.merge({}, LabData, PeopleData);
  // console.log(LabPeopleData);
  // method for rendering individual
  const renderPerson = (p)=>{
    return (<div className="person" key={p.name_en}>
        <div className="photo">
          <img src={"/images/people/"+p.thumbnail}/>
        </div>
        <div className="name_and_lab">
          <div className="name">
            {i18n.language=="kr"?p.name_kr:p.name_en}
          </div>
        </div>
        <div className="position">
          {t("People.position."+p.position)}
          {p.lab_url ? (
            <div className="lab" onClick={()=>{window.open(p.lab_url);}}>
              <MdHome/>
          </div>
          ):null}
        </div> 
        <div className="contact">
          {p.email} <br/> {p.phone} <br/> {p.office}
        </div>
      </div>);
  }
  // method for rendering everyone filtered
  let peopleEl = _.map(LabPeopleData,(p)=>{
    if (filter !="All" && p.role != filter) return;
    else {
      return renderPerson(p);
    }
  }).filter(e=>e);
  
  return (
    <div className="People stretching">
      <div className="dropdownUI">
          <div className="dd-header" onClick={()=>{setIsDropdownOpen(!isDropdownOpen);}}>
              <div className="dd-header-title" >
                {isDropdownOpen? t("People.select_filter"):t("People.role."+filter)}
              </div>
              <div className="dd-header-arrow">
                  {isDropdownOpen?<AiOutlineUp/>:<AiOutlineDown/>}
              </div>
          </div>
          {isDropdownOpen
              && (<ul className="dd-list">
                <li className={filter == "All" ? 'active' : null}><Link to={"/people/All"} onClick={()=>{setIsDropdownOpen(false); document.querySelector(".App").scrollTo(0,0);}}>{t("People.role.All")}</Link> </li>
                {roles.map(r => (
                  <li className={filter == r ? 'active' : null}><Link to={"/people/"+r} onClick={()=>{setIsDropdownOpen(false); document.querySelector(".App").scrollTo(0,0);}}>{t("People.role."+r)}</Link> </li>
                ))}
              </ul>)
          }
      </div>
      <div className="tabNav">
          <ul>
            <Link to="/people/All" onClick={()=>{document.querySelector(".App").scrollTo(0,0);}}>
              <li className={filter == "All" ? 'active' : null} > {t("People.role.All")}</li>
            </Link> 
            {roles.map(r => (
              <Link to={"/people/"+r} onClick={()=>{document.querySelector(".App").scrollTo(0,0);}}>
                <li className={filter == r ? 'active' : null} >  
                  {t("People.role."+r)}
                </li>
              </Link> 
            ))}
          </ul>
      </div>
      <div className="PageContentWrapper">
        <div className="PageContent">
          <div className="PeopleViewer">
            {peopleEl}
          </div>
        </div>
      </div>
    </div>
  );
}

export default People;
