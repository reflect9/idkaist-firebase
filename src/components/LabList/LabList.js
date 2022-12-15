import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import _ from "lodash";
import "./LabList.scss";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import Labs from "../../data/Labs";

function LabList({ currentLab }) {
    const { t } = useTranslation();
    const listBox = useRef(null);
    const Labs_LI = _.map(Labs, (labData, labCode) => {
        const img = require("../../assets/labs/logo/" + labData.lab_logo);
        return <li className={(currentLab == labCode) ? "active" : ""} key={labCode}>
            <Link to={(currentLab==labCode)?"/research":"/research/"+labCode}>
                <div className="thumbnail">
                    <img src={img} />
                </div>
            </Link>
        </li>
    });
    let listClass = "";
    if (typeof currentLab !== "undefined") {
        listClass = "small";
    }
    
    return <div className={"LabList " + listClass}>
        <div className="leftArrow" onClick={()=>{listBox.current.scrollLeft -= 500;}}> <MdArrowBackIos /> </div>
        <ul ref={listBox}>
            {Labs_LI}
        </ul>
        <div className="rightArrow" onClick={()=>{listBox.current.scrollLeft += 500;}}> <MdArrowForwardIos /> </div>
    </div>
}

export default LabList;