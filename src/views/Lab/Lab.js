import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import _ from "lodash";
import "./Lab.scss";
import Labs from "../../data/Labs";
import LabList from "../../components/LabList/LabList.js";
import { Link } from "react-router-dom";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

function Lab({ labID }) {
    const { t, i18n, ready } = useTranslation();
    const [imageNum, setImageNum] = useState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Checking window size and setMatches true / false
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 1000px)").matches
    )
    useEffect(() => {
        window
        .matchMedia("(min-width: 1000px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);
    const LabData = Labs[labID];
    const getRandomNumber = () => {
        return (Math.floor(Math.random() * 10));
    }
    //
    const Labs_LI = _.map(Labs, (labData, labCode) => {
        const img = require("../../assets/labs/logo/" + labData.lab_logo);
        return <li key={labCode} onClick={()=>{setIsDropdownOpen(!isDropdownOpen); document.querySelector(".App").scrollTo(0,0);}}>
            <Link to={"/research/"+labCode} >
                <div className="thumbnail">
                    <img src={img} />
                </div>
            </Link>
        </li>
    });

    //
    let projectImagesThumbnail; // 클릭하기 전 썸네일 이미지 tag리스트 
    let projectImagesPopup; // 클릭하면 팝업으로 나오는 이미지 tag리스트
    if (LabData.lab_works) {
        projectImagesThumbnail = LabData.lab_works.map((pi, pii) => {
            let tag;
            if (pi.type == "image") {
                tag = (<img className="projectImage" key={pii} onClick={() => { setImageNum(pii); }} src={pi.source} />);
            } else if (pi.type == "YouTube") {
                tag = (<iframe width="1080" className="projectImage" key={pii} src={pi.source + "?vq=hd1080"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>);
            } else if (pi.type == "imageThumbnail") {
                tag = (<img className="projectImage" key={pii} onClick={() => { setImageNum(pii); }} src={pi.thumbnail} />);
            }
            return tag;
        });
        projectImagesPopup = LabData.lab_works.map((pi, pii) => {
            let tag;
            if (pi.type == "image") {
                tag = (<img className="projectImage" key={pii} onClick={() => { setImageNum(pii); }} src={pi.source} />);
            } else if (pi.type == "YouTube") {
                tag = (<iframe width="1080" className="projectImage" key={pii} src={pi.source + "?vq=hd1080"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>);
            } else if (pi.type == "imageThumbnail") {
                tag = (<img className="projectImage" key={pii} onClick={() => { setImageNum(pii); }} src={pi.original} />);
            }
            return tag;
        });
    } else {
        projectImagesThumbnail = [ ];
        projectImagesPopup = [];
    }
    // projectImagesThumbnail.push(
    //     <div className="hidden-flex-item"></div>
    // )

    let labKeywords;
    if (typeof LabData.lab_keywords !== "undefined" && LabData.lab_keywords !== null) {
        labKeywords = LabData.lab_keywords.map((k) => {
            return (<li key={k}>{k}</li>);
        });
    }

    const img = require("../../assets/labs/logo/" + LabData.lab_logo);

    return (
        <div className="Lab stretching">
            <div className="PageContentWrapper">
                <div className="dropdownUI">
                <div className="dd-header" onClick={()=>{setIsDropdownOpen(!isDropdownOpen);}}>
                    <div className="dd-header-title" >
                        {Labs[labID].lab?Labs[labID].lab:Labs[labID].lab_long}
                    </div>
                    <div className="dd-header-arrow">
                        {isDropdownOpen?<AiOutlineUp/>:<AiOutlineDown/>}
                    </div>
                </div>
                {isDropdownOpen
                    && (<ul className="dd-list">
                        {Labs_LI}
                    </ul>)
                }
            </div>  
                <div className="LabInfo">
                    <div className="leftPanel">
                        <div className="LabTitle">
                            {LabData.lab_long}
                        </div>
                        <div className="LabTitleShort">{LabData.lab}</div>
                        <div className="description">{(i18n.language == "kr" && LabData.description_kr) ? LabData.description_kr : LabData.description_en}</div>
                        {/* <div className="LabLogo">
                        <img src={img}/>
                    </div>
                    */}
                    </div>

                    <div className="rightPanel">

                        <label>{t("Research.principal_investigator")}</label>
                        <div className="LabPI">
                            {i18n.language == "kr" ? LabData.name_kr : LabData.name_en}
                        </div>
                        <div className="email">
                            {LabData.email}
                        </div>
                        {(typeof LabData.lab_keywords !== "undefined" && LabData.lab_keywords !== null)
                        && <label>{t("Research.research_areas")}</label>}
                        <div className="LabKeywords">
                            <ul>
                                {labKeywords}
                            </ul>
                        </div>

                        <label>{t("Research.homepage")}</label>
                        <div className="LabLink">
                            <a href={LabData.lab_url} target="IDKAIST_LAB">{LabData.lab_url}</a>&nbsp;&nbsp;
                        </div>
                    </div>

                </div>
                <div className="projects">
                    {projectImagesThumbnail}
                </div>
                {(typeof imageNum !== "undefined") && (imageNum != null) ? (
                    <div className="imagePopup unselectable">
                        <div className="leftArrow changeImageButton" onClick={() => {
                            let newImageNum = imageNum - 1;
                            if (newImageNum < 0) newImageNum = projectImagesThumbnail.length - 1;
                            setImageNum(newImageNum);
                            return false;
                        }}><MdArrowBackIos /></div>
                        <div className="rightArrow changeImageButton" onClick={() => {
                            let newImageNum = imageNum + 1;
                            if (newImageNum == projectImagesThumbnail.length) newImageNum = 0;
                            setImageNum(newImageNum);
                            return false;
                        }}><MdArrowForwardIos /></div>
                        <div className="closeButton" onClick={() => { setImageNum(null); }}>
                            <AiOutlineCloseCircle />
                        </div>
                        <div className="largeImageContainer" onClick={() => { setImageNum(null); }}>
                            {projectImagesPopup[imageNum]}
                        </div>
                        {/* {<img src={projectImages[imageNum]} onClick={()=>{setImageNum(null);}}/>} */}
                    </div>
                ) : <div />}
            </div>
            {matches?<LabList currentLab={labID}/>:null}
        </div>
    );
}

export default Lab;